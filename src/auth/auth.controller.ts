import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class AuthController {
  // constructor(private readonly authServises: AuthService) {}

  // @Post('register')
  // async register(
  //   @Body() registerdto: RegisterDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { access_token } = await this.authServises.register(registerdto);
  //   res.cookie('access_token', access_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });
  //   return { message: 'registration success' };
  // }

  // @Post('login')
  // async login(
  //   @Body() loginDto: LoginDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const token = await this.authServises.login(loginDto);

  //   res.cookie('access_token', token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   return { message: 'login success' };
  }

