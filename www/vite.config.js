import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';

export default defineConfig(({ command, mode }) => {
	const envDir = path.resolve(process.cwd(), '..');
	const env = loadEnv(mode, envDir, '')
	return {
		envDir,
		plugins: [sveltekit()],
		server: {
			port: env.FRONTEND_PORT
		}
	}
})
