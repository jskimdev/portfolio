<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Junseo | {data.blogPost.title}</title>
	<meta name="description" content={data.blogPost.description} />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="border-b border-border/70 bg-muted/30">
		<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
			<div class="max-w-3xl">
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					{data.blogPost.type}
				</p>
				<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
					{data.blogPost.title}
				</h1>
				<p class="mt-6 text-base leading-8 text-foreground/80">{data.blogPost.description}</p>
			</div>

			<div class="mt-10 flex flex-wrap items-center gap-3 text-sm text-foreground/65">
				<span class="rounded-full border border-border px-3 py-1">{data.blogPost.publishedOn}</span>
				<span class="rounded-full border border-border px-3 py-1">{data.blogPost.readTime}</span>
				{#if data.blogPost.relatedProjects.length > 0}
					<span class="rounded-full border border-border px-3 py-1">
						Related: {data.blogPost.relatedProjects.join(', ')}
					</span>
				{/if}
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="space-y-10">
			{#each data.blogPost.content as block}
				{#if block.type === 'paragraph'}
					<p class="text-base leading-8 text-foreground/85 sm:text-lg">{block.content}</p>
				{:else}
					<figure class="space-y-4 rounded-[2rem] border border-border bg-card p-4 sm:p-6">
						<div class="overflow-hidden rounded-[1.5rem] bg-muted/30">
							<img
								src={block.src}
								alt={block.alt}
								width={block.width}
								height={block.height}
								class="h-auto w-full object-cover"
							/>
						</div>
						{#if block.caption}
							<figcaption class="text-sm leading-7 text-muted-foreground">
								{block.caption}
							</figcaption>
						{/if}
					</figure>
				{/if}
			{/each}
		</div>

		<a
			href="/blogs"
			class="mt-12 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4"
		>
			Back to all posts
		</a>
	</section>
</main>
