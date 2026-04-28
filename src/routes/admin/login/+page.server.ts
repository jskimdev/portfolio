import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	return {
		redirectTo: url.searchParams.get('redirectTo') ?? '/admin'
	};
};

export const actions: Actions = {
	default: async ({ cookies, request, url, locals }) => {
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '').trim();
		const redirectTo = String(formData.get('redirectTo') ?? '/admin');
		const adminPassword = env.ADMIN_PASSWORD;

		if (!adminPassword) {
			return fail(500, {
				error: 'Set ADMIN_PASSWORD in your environment before using admin login.',
				redirectTo
			});
		}

		if (!password) {
			return fail(400, {
				error: 'Enter your admin password.',
				redirectTo
			});
		}

		if (password !== adminPassword) {
			return fail(401, {
				error: 'That password did not match the admin account.',
				redirectTo
			});
		}

		cookies.set('admin_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 8
		});
		locals.isAdmin = true;

		throw redirect(303, redirectTo || '/admin');
	}
};
