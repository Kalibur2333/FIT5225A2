import checker from 'vite-plugin-checker';
export default function configEslint() {
  return [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx, jsx}"', // for example, lint .ts & .tsx & .jsx
      },
    }),
  ];
}
