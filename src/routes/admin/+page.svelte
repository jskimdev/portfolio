<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Junseo | Admin</title>
	<meta name="description" content="Admin area for managing portfolio content." />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Admin</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
				Content tools for projects and publishing.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
				Keep the header as a simple admin entry point, then use this dashboard for content actions
				like adding projects and, next, blog posts.
			</p>
		</div>

		<div class="mt-12 flex justify-end">
			<form method="POST" action="?/logout" class="self-start">
				<button
					type="submit"
					class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
				>
					Log out
				</button>
			</form>
		</div>

		<div class="mt-8 grid gap-6 md:grid-cols-2">
			<a
				href="/admin/projects/new"
				class="rounded-[2rem] border border-border bg-card p-8 transition-colors hover:border-foreground/30"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					Projects
				</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-tight">Add a new project</h2>
				<p class="mt-4 text-base leading-8 text-foreground/80">
					Start a new project entry, generate the content structure, and prepare image metadata for
					the project page.
				</p>
			</a>

			<a
				href="/admin/blogs"
				class="rounded-[2rem] border border-border bg-card p-8 transition-colors hover:border-foreground/30"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Blog</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-tight">Open blog workspace</h2>
				<p class="mt-4 text-base leading-8 text-foreground/80">
					Review existing posts, start a new draft, and open the edit flow for any current entry.
				</p>
			</a>
		</div>

		<div class="mt-8 rounded-[2rem] border border-border bg-card p-8">
			<div class="flex items-end justify-between gap-6">
				<div>
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Existing Projects
					</p>
					<h2 class="mt-4 text-3xl font-semibold tracking-tight">Edit current project entries</h2>
				</div>
			</div>

			<div class="mt-8 space-y-4">
				{#each data.projects as project}
					<div
						class="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"
					>
						<div>
							<p class="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
								{project.kicker}
							</p>
							<h3 class="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
							<p class="mt-2 text-sm leading-7 text-foreground/75">{project.description}</p>
						</div>

						<a
							href={`/admin/projects/${project.slug}/edit`}
							class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
						>
							Edit project
						</a>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-8 rounded-[2rem] border border-border bg-card p-8">
			<div class="flex items-end justify-between gap-6">
				<div>
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Existing Blog Posts
					</p>
					<h2 class="mt-4 text-3xl font-semibold tracking-tight">Edit current writing entries</h2>
				</div>
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
							</div>
							<h3 class="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
							<p class="mt-2 text-sm leading-7 text-foreground/75">{post.description}</p>
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
