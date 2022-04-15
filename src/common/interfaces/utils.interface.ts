import mongoose from 'mongoose';

export type THashMap<T = unknown> = {
  [index: string]: T;
};

export type TMongoId = mongoose.ObjectId;
