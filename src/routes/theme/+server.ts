import type { RequestHandler } from '@sveltejs/kit';

// PUT /theme
export const PUT: RequestHandler = async ({ request }) => {
	const theme = await request.text();

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	return {
		headers: {
			'Set-Cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Secure`
		}
	};
};
