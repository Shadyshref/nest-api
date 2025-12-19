import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSirvice: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const existingUser = await this.userSirvice.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already taken!');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
    console.log(`hashed password is-${hashedPassword}`);
    const newUser = this.userSirvice.craeteUser({
      ...registerDto,
      password: hashedPassword,
    });

    const payload = { sub: (await newUser).id, username: (await newUser).name };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async login(logindto: LoginDto) {
    const loginUser = await this.userSirvice.findByEmail(logindto.email);
    if (!loginUser) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const match = await bcrypt.compare(logindto.password, loginUser.password);
    if (!match) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const payload = { sub: loginUser.id, username: loginUser.name };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
