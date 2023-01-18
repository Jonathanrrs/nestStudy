import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RawHeaders, GetUser } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities';
import { UserRoleGuard } from './guards/user-role/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard()) /* para ruta privada se ocupa el token */
  testingPrivateRoute(
    /* @Req() request: Express.Request */ @GetUser() user: User,
    /* esto es un decorador de parametro, se realizo para extraer la info del usuario de esta manera en lugar de extrearlo de la propia request */
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return { user, userEmail, rawHeaders };
  }

  @Get('private2')
  @SetMetadata('roles', ['admin', 'super-user'])
  /* el que viene generado por nest passaport regresa una instancia por eso lleva (), los personalizados no suelen llevar */
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return user;
  }
}
