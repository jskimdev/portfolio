<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Junseo | Admin Blog</title>
	<meta name="description" content="Admin area for managing blog content." />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl">
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					Blog Admin
				</p>
				<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
					Manage writing in one full workspace.
				</h1>
				<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
					Start a new post, review what is already in the content file, and open any entry for a
					refreshed draft.
				</p>
			</div>

			<a
				href="/admin/blogs/new"
				class="inline-flex rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
			>
				Add new blog post
			</a>
		</div>

		<div class="mt-10 rounded-[2rem] border border-border bg-card p-8">
			<div>
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					Existing Posts
				</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-tight">Edit current blog entries</h2>
			</div>

			<div class="mt-8 space-y-4">
				{#each data.blogPosts as post}
					<div
						class="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"
					>
						<div>
							<div class="flex flex-wrap items-center gap-3">
								<p class="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
									{post.type}
								</p>
								<p class="text-sm text-foreground/60">{post.publishedOn}</p>
								<p class="text-sm text-foreground/60">{post.readTime}</p>
							</div>
							<h3 class="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
							<p class="mt-2 text-sm leading-7 text-foreground/75">{post.description}</p>
							{#if post.relatedProjects.length > 0}
								<p class="mt-2 text-sm text-muted-foreground">
									Related: {post.relatedProjects.join(', ')}
								</p>
							{/if}
						</div>

						<a
							href={`/admin/blogs/${post.slug}/edit`}
							class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
						>
							Edit post
						</a>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
