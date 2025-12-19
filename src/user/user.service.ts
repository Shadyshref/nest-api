import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {  
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async craeteUser(registerDto: RegisterDto) {
    const user = await this.userRepo.create({ ...registerDto });
    return this.userRepo.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }
}
