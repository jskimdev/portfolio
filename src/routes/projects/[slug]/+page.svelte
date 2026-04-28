<script lang="ts">
	import ProjectCarousel from '$lib/components/ProjectCarousel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const roadmapGroups = $derived.by(() => {
		const groups = new Map<
			string,
			{
				majorVersion: string;
				items: PageData['project']['roadmap'];
			}
		>();

		for (const item of data.project.roadmap) {
			const existingGroup = groups.get(item.majorVersion);

			if (existingGroup) {
				existingGroup.items.push(item);
				continue;
			}

			groups.set(item.majorVersion, {
				majorVersion: item.majorVersion,
				items: [item]
			});
		}

		return Array.from(groups.values());
	});
</script>

<svelte:head>
	<title>Junseo | {data.project.title}</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="border-b border-border/70 bg-muted/30">
		<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
			<div class="max-w-4xl">
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					{data.project.kicker}
				</p>
				<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
					{data.project.title}
				</h1>
				<p class="mt-6 max-w-3xl text-base leading-8 text-foreground/80">
					{data.project.hero}
				</p>
			</div>

			<div class="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
				<ProjectCarousel images={data.project.images} />

				<aside class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Project Stack
					</p>
					<div class="mt-5 flex flex-wrap gap-2">
						{#each data.project.stack as item}
							<span class="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/75">
								{item}
							</span>
						{/each}
					</div>
					<a
						href="/projects"
						class="mt-8 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4"
					>
						Back to all projects
					</a>
				</aside>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
			<div>
				<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
					Case Study
				</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
					Context, process, and outcome in one place.
				</h2>
			</div>

			<div class="space-y-6">
				<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
					<h3 class="text-2xl font-semibold tracking-tight">Overview</h3>
					<p class="mt-4 text-base leading-8 text-foreground/80">{data.project.overview}</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
					<h3 class="text-2xl font-semibold tracking-tight">Challenge</h3>
					<p class="mt-4 text-base leading-8 text-foreground/80">{data.project.challenge}</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
					<h3 class="text-2xl font-semibold tracking-tight">Approach</h3>
					<p class="mt-4 text-base leading-8 text-foreground/80">{data.project.approach}</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
					<h3 class="text-2xl font-semibold tracking-tight">Outcome</h3>
					<p class="mt-4 text-base leading-8 text-foreground/80">{data.project.outcome}</p>
				</div>
			</div>
		</div>
	</section>

	<section class="border-t border-border/70">
		<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
			<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
				<div>
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Roadmap
					</p>
					<h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
						Features and progress in order.
					</h2>
				</div>

				<div class="space-y-6">
					{#each roadmapGroups as group}
						<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
							<div class="flex items-center gap-3">
								<span class="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground/70">
									Major v{group.majorVersion}
								</span>
							</div>

							<div class="mt-6 space-y-5">
								{#each group.items as item}
									<div class="flex items-start gap-4">
										<span
											class="mt-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground/70"
										>
											v{item.version}
										</span>
										<div>
											<h3 class="text-2xl font-semibold tracking-tight">{item.title}</h3>
											<p class="mt-3 text-base leading-8 text-foreground/80">{item.description}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>
