<script lang="ts">
	import { blogPosts } from '$lib/contents';
</script>

<svelte:head>
	<title>Junseo | Blog</title>
	<meta
		name="description"
		content="A full-page blog section for project-related writing and general design posts."
	/>
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-4xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Blog</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
				Writing that can support specific projects or stand on its own.
			</h1>
			<p class="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
				This page is designed to handle both kinds of posts: articles tied to particular projects
				and broader general writing about design, process, or ideas.
			</p>
		</div>

		<div class="mt-14 divide-y divide-border rounded-[2rem] border border-border bg-card">
			{#each blogPosts as post}
				<article class="grid gap-4 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-start">
					<div>
						<div class="flex flex-wrap items-center gap-3">
							<p class="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
								{post.type}
							</p>
							{#if post.relatedProjects.length > 0}
								<p class="text-xs text-foreground/60">
									Related:
									{post.relatedProjects.join(', ')}
								</p>
							{/if}
						</div>
						<h2 class="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2>
						<p class="mt-3 max-w-3xl text-sm leading-7 text-foreground/80">{post.description}</p>
					</div>
					<div class="text-sm font-medium text-foreground/60">Read article</div>
				</article>
			{/each}
		</div>
	</section>
</main>
