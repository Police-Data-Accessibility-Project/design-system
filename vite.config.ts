/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		cssCodeSplit: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			name: 'pdap-design-system',
			fileName: 'index',
		},
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			external: ['vue', 'vue-router', '**/__snapshots__/', '**/*.spec.ts'],
			output: {
				assetFileNames: ({ name }) => {
					if (name === 'style.css') return 'styles.css';
				},
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	optimizeDeps: { include: ['vue-router'] },
	test: {
		coverage: {
			all: true,
			include: ['src/**/*.vue', 'src/utils/**/*.ts'],
			provider: 'v8',
			reportsDirectory: './coverage',
		},
		environment: 'happy-dom',
		exclude: ['node_modules'],
		globals: true,
		include: ['src/**/*.{spec,test}.ts'],
		setupFiles: ['tools/testing/setup.ts'],
		typecheck: {
			include: ['src/**/*.{spec,test}.ts'],
		},
	},
});
