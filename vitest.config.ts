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
			exclude: ['node_modules'],
			include: ['./src/**/*.{spec,test}.ts'],
			globals: true,
			environment: 'happy-dom',
		},
	})
);
