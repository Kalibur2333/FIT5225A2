import { BuildOptions } from 'vite';
import {
  VITE_APP_CONSOLE,
  VITE_APP_DEBUGGER,
  VITE_APP_SOURCEMAP,
} from '../config';
const build: BuildOptions = {
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: VITE_APP_CONSOLE,
      drop_debugger: VITE_APP_DEBUGGER,
    },
  },
  outDir: 'dist', // Specify the output path directory
  assetsDir: 'assets', // Specify the path directory where the packaged static resources will be stored
  sourcemap: VITE_APP_SOURCEMAP, // Whether to generate a source map file after the build
};

export default build;
