<script lang="ts">
    import { aboutIntro, blogPosts, projects } from "$lib/contents";

    const selectedProjects = projects.filter((project) => project.selected);
    const selectedBlogPosts = blogPosts.filter((blog) => blog.selected);
</script>

<svelte:head>
    <title>Junseo</title>
    <meta
        name="description"
        content="My portfolio website" 
    />
</svelte:head>

<main id="top" class="bg-background text-foreground">
    <section class="mx-auto max-w-6xl px-6 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24">
        <div class="flex min-h-96 items-center justify-center rounded-4xl border border-dashed bg-muted/40 px-6 py-12 sm:min-h-136 lg:min-h-168">
            <div class="text-center">
                <p class="text-xs font-semibold tracking-[0.35em] text-muted-foreground uppercase">
                    Hero Image Placeholder
                </p>
                <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                    Your image goes here
                </h1>
                <p class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Swap this block with a full-width portrait, project still, or brand image when you are
					ready.
                </p>
            </div>
        </div>

        <div class="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
            <p class="text-lg leading-8 text-balance text-foreground/85 sm:text-xl">
                I design simple digital experiences with clear structure, strong typography, and space for
				the work to speak first.
            </p>
        </div>
    </section>

    <section class="border-t border-border/70">
        <div class="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
                <p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                    {aboutIntro.kicker}
                </p>
                <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {aboutIntro.title}
                </h2>
            </div>
            
            <div class="space-y-6 text-base leading-8 text-foreground/80">
                <p>{aboutIntro.summary}</p>
                {#each aboutIntro.details as detail}
                    <p>{detail}</p>
                {/each}
                <a href="/about" class="inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4">
                    Read full about page
                </a>
            </div>
        </div>
    </section>

    <section class="border-t border-border/70">
        <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div class="flex items-end justify-between gap-6">
                <div class="max-w-2xl">
                    <p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                        Selected Projects
                    </p>
                    <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        A few featured projects with the stack visible up front.
                    </h2>
                </div>
                <a href="/projects" class="hidden text-sm font-medium underline underline-offset-4 sm:inline">
                    View all projects
                </a>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-3">
                {#each selectedProjects as project}
                    <article class="rounded-[1.75rem] border border-border bg-card p-6">
                        <div class="flex min-h-52 items-center justify-center rounded-[1.25rem] border border-dashed border-border bg-muted/40">
                            <span class="text-sm font-medium text-muted-foreground">
                                Project preview
                            </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold tracking-tight">{project.title}</h3>
                        <p class="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                        <div class="mt-5 flex flex-wrap gap-2">
                            {#each project.stack as item}
                                <span class="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/75">
                                    {item}
                                </span>
                            {/each}
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <section class="border-t border-border/70">
        <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div class="flex items-end justify-between gap-6">
                <div class="max-w-2xl">
                    <p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                        Selected Blog
                    </p>
                    <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        A mix of general writing and posts tied to specific projects
                    </h2>
                </div>
                <a href="/blogs" class="hidden text-sm font-medium underline underline-offset-4 sm:inline">
                    View all posts
                </a>
            </div>

            <div class="mt-10 divide-y divide-border rounded-[1.75rem] border border-border bg-card">
				{#each selectedBlogPosts as post}
					<article class="grid gap-4 px-6 py-6 sm:px-8">
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
							<h3 class="mt-3 text-xl font-semibold tracking-tight">{post.title}</h3>
							<p class="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
								{post.description}
							</p>
						</div>
					</article>
				{/each}
			</div>
        </div>
    </section>
</main>