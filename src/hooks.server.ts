import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAdmin = event.cookies.get('admin_session') === 'authenticated';

	return resolve(event);
};
