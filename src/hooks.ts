import type { GetSession, Handle } from '@sveltejs/kit';

const getCookieValue = (cookie: string, name: string): string | null =>
	cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;

export const handle: Handle = async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie');

	event.locals.theme = getCookieValue(cookie, 'theme');

	return resolve(event);
};

export const getSession: GetSession = ({ locals }) => {
	const theme = locals.theme;
	return { theme };
};
