import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
	if (!locals.isAdmin && url.pathname !== '/admin/login') {
		const redirectTo = `${url.pathname}${url.search}`;
		throw redirect(303, `/admin/login?redirectTo=${encodeURIComponent(redirectTo)}`);
	}

	if (locals.isAdmin && url.pathname === '/admin/login') {
		throw redirect(303, '/admin');
	}

	return {};
};
