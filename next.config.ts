import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 *
 * The configuration for the Next.js application.
 * Next.js 15 supports using a TypeScript file for configuration, providing type safety.
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  // React's Strict Mode is a development-only feature that helps identify potential problems
  // in an application. It activates additional checks and warnings for its descendants.
  // It is highly recommended to keep this enabled.
  reactStrictMode: true,

  // Output mode for Docker deployment
  // Generates a standalone build that includes only necessary files
  output: 'standalone',

  // Configuration for the ESLint linter.
  eslint: {
    // By default, Next.js lints the `pages`, `app`, `components`, `lib`, and `src` directories.
    // This configuration extends linting to our custom `/tests` directory during `next build`.
    dirs: ['src', 'tests'],
  },

  // Experimental features that can be opted into. Use with caution as APIs may change.
  experimental: {
    // Enables the `after()` API, which allows scheduling work to be processed *after* a response
    // has finished streaming. Useful for tasks like logging or analytics that shouldn't block
    // the main response.
    // The React Compiler is an experimental compiler from Meta that automatically optimizes
    // React code, reducing the need for manual memoization with `useMemo` and `useCallback`.
    // Enabling this can lead to performance improvements and simpler code.
    // compiler: true, // Uncomment when the compiler is stable and widely adopted.
  },

  // In Next.js 15, GET Route Handlers are uncached by default. This configuration is an example
  // of how you could opt back into the previous caching behavior if needed, though the
  // recommended approach is to be explicit with `fetch` caching options.
  // experimental: {
  // staleTimes: {
  // dynamic: 30, // Cache dynamic pages for 30 seconds
  // static: 180, // Cache static pages for 180 seconds
  // },
  // },
};

export default nextConfig;
