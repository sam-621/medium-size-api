import { THashMap } from '/@/interfaces/utils.interface';

export const configValues = () => ({
  PORT: Number(process.env.PORT),
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
