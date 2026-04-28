import { projects } from '$lib/contents';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		projects
	};
};

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete('admin_session', { path: '/' });
		locals.isAdmin = false;

		return { loggedOut: true };
	}
};
