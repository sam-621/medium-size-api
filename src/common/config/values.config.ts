import { THashMap } from '/@/interfaces/utils.interface';

export const configValues = () => ({
  PORT: Number(process.env.PORT),
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
});

export const getEnvPath = (env: string): string => {
  const envPaths: THashMap<string> = {
    local: '.env.local',
    dev: '.env.dev',
    prod: '.env.prod',
    test: '.env.test',
  };

  return envPaths[env] || envPaths.local;
};
