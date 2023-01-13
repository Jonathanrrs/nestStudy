import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  /* typeormmodule para que se cree nuestar tabla */
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
})
export class AuthModule {}
