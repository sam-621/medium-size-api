import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './controllers/profile.controller';
import { UserAuthController } from './controllers/userAuth.controller';
import { UserRepository } from './repository/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { ProfileService } from './services/profile.service';
import { UserAuthService } from './services/userAuth.service';
import { AuthModule } from '/@/common/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
  providers: [UserRepository, UserAuthService, ProfileService],
  controllers: [ProfileController, UserAuthController],
  exports: [UserRepository],
})
export class UserModule {}
