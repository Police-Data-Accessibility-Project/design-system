// Utils
import { defineConfig, mergeConfig } from 'vitest/config';

// Base config
import viteConfig from './vite.config';

export default mergeConfig(
	{ ...viteConfig },
	defineConfig({
		test: {
			coverage: {
				provider: 'v8',
				reportsDirectory: './coverage',
			},
			environment: 'happy-dom',
			exclude: ['node_modules'],
			globals: true,
			include: ['**/*.{spec,test}.ts'],
			setupFiles: ['./utils/testing/setup.ts'],
		},
	})
);
