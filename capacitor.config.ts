import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.fliproom.io',
  appName: 'fliproom',
  webDir: 'dist/app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
