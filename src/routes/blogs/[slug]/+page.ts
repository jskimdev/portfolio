import { error } from '@sveltejs/kit';
import { getBlogPostBySlug } from '$lib/contents';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const blogPost = getBlogPostBySlug(params.slug);

	if (!blogPost) {
		throw error(404, 'Blog post not found');
	}

	return {
		blogPost
	};
};
