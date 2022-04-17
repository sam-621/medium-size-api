import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserAuthController } from './controllers/userAuth.controller';
import { UserRepository } from './repository/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './services/user.service';
import { UserAuthService } from './services/userAuth.service';
import { AuthModule } from '/@/common/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
  providers: [UserRepository, UserAuthService, UserService],
  controllers: [UserController, UserAuthController],
  exports: [UserRepository],
})
export class UserModule {}
