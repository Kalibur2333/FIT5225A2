import visualizer from 'rollup-plugin-visualizer';
export default function configVisualizerConfig() {
  return visualizer({
    // Write the packaged dependency analysis visualization page to node_modules so that it doesn't take up space
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  });
}
