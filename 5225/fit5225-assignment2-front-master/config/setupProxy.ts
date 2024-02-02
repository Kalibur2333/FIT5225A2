import { ProxyOptions } from 'vite';
const proxy: Record<string, string | ProxyOptions> = {
  // string shorthand
  '/foo': 'http://localhost:4567',
  // with options
  '/api': {
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
    /**
     * @reference : https://vitejs.dev/config/#server-proxy
     */
  },
};
export default proxy;
