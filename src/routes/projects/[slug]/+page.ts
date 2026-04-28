import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '$lib/contents';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project
	};
};
