import type { RequestHandler } from '@sveltejs/kit';

// PUT /theme
export const put: RequestHandler = async ({ request }) => {
	const theme = await request.text();

	return {
		headers: {
			'Set-Cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Secure`
		}
	};
};
