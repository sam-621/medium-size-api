import { TMongoId } from '/@/common/interfaces/utils.interface';

export interface IUser {
  id: TMongoId;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
}

export type TUserRegister = Pick<IUser, 'username' | 'email' | 'password'>;
export type TUserLogin = Pick<IUser, 'email' | 'password'>;
