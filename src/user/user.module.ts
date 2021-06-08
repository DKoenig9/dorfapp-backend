import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
  }),],
  providers: [UserService, UserResolver],
})
export class UserModule {}
