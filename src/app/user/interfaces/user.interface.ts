import { TMongoId } from '/@/common/interfaces/utils.interface';

export interface IUser {
  id: TMongoId;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
}
