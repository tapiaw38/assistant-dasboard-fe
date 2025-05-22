import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      include: ['tests/**/*.spec.ts'],
      exclude: [...configDefaults.exclude, 'e2e/**'],
      setupFiles: ['./tests/setup/vitest.setup.ts'],
    },
  }),
)
