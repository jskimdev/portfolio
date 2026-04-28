<script lang="ts">
	import AdminProjectEditor from '$lib/components/AdminProjectEditor.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<AdminProjectEditor mode="edit" initialProject={data.project} />
