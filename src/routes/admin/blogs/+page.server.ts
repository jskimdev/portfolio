import { blogPosts } from '$lib/contents';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		blogPosts
	};
};
