import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/contents';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project
	};
};
