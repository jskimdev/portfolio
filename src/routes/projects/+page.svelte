<script lang="ts">
	import { projects } from '$lib/contents';
</script>

<svelte:head>
	<title>Junseo | Projects</title>
	<meta
		name="description"
		content="A full-page projects section for showcasing selected work in a clean card layout."
	/>
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-4xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
				Projects
			</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
				Selected work with space for images, context, and outcomes.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
				This page is meant to hold your featured projects in a more complete format than the landing
				page. Replace the placeholders with real covers, summaries, and links later.
			</p>
		</div>

		<div class="mt-14 grid gap-8">
			{#each projects as project}
				<article
					class="grid gap-8 rounded-[2rem] border border-border bg-card p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10"
				>
					<div
						class="flex min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-muted/40"
					>
						<span class="text-sm font-medium text-muted-foreground">Project image placeholder</span>
					</div>

					<div class="flex flex-col justify-center">
						<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
							Featured Project
						</p>
						<h2 class="mt-3 text-3xl font-semibold tracking-tight">{project.title}</h2>
						<p class="mt-4 text-base leading-8 text-foreground/80">{project.description}</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each project.stack as item}
								<span
									class="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/75"
								>
									{item}
								</span>
							{/each}
						</div>
						<p class="mt-4 text-sm leading-7 text-muted-foreground">
							Add a short case-study lead here: problem, direction, and what makes the project worth
							highlighting.
						</p>
					</div>
				</article>
			{/each}
		</div>
	</section>
</main>
