<script lang="ts">
	import AdminBlogEditor from '$lib/components/AdminBlogEditor.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<AdminBlogEditor mode="edit" initialBlogPost={data.blogPost} />
