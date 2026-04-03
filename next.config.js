const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next' : '.next-build',
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
