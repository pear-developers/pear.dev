import adapter from 'svelte-adapter-deno';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: true,
		postcss: true
	}),
	kit: {
		adapter: adapter({
			out: '../build'
		})
	}
};

export default config;
