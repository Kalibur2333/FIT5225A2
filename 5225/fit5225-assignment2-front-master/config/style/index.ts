import { CSSOptions } from 'vite';
const cssOption: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
    scss: {
      additionalData: '@import "./src/assets/scss/varible.scss";', //if additional data use @import format, it need to include a ';' at the end
    },
  },
};
export default cssOption;
