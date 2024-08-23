declare module 'react-native-config' {
  export interface NativeConfig {
    EMULATOR_LOCALHOST: string;
    DEVICE_LOCALHOST: string;
    PRODUCTION: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
