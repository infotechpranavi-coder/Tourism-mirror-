const {
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants');

module.exports = (phase) => ({
  // Keep Vercel on the default production output directory while isolating
  // local dev artifacts on Windows.
  ...(phase === PHASE_DEVELOPMENT_SERVER ? { distDir: '.next-dev' } : {}),
  experimental: {
    // Work around Next 15 devtools manifest crashes on Windows.
    devtoolSegmentExplorer: false,
    browserDebugInfoInTerminal: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable filesystem pack caching in dev to avoid missing *.pack.gz errors.
      config.cache = false;
    }

    return config;
  },
});
