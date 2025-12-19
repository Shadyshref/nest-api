import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authServises: AuthService) {
  }
  @Post('register')
  register(@Body() registerdto: RegisterDto) {
    return this.authServises.register(registerdto);
  }

  @Post('login')
  login(@Body() logindto:LoginDto){
    return this.authServises.login(logindto)
  }
}
