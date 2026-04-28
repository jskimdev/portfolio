<script lang="ts">
	import MultiImageDropzone from '$lib/components/MultiImageDropzone.svelte';
	import type { DraftImage } from '$lib/components/MultiImageDropzone.svelte';
	import type { Project } from '$lib/contents';

	type DraftRoadmapItem = {
		id: string;
		majorVersion: string;
		version: string;
		title: string;
		description: string;
	};

	type InitialProject = Project | null;

	let {
		mode,
		initialProject = null
	}: {
		mode: 'new' | 'edit';
		initialProject?: InitialProject;
	} = $props();

	function slugify(value: string) {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function escapeValue(value: string) {
		return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', ' ');
	}

	function createRoadmapItem(
		majorVersion = '',
		version = '',
		title = '',
		description = ''
	): DraftRoadmapItem {
		return {
			id: crypto.randomUUID(),
			majorVersion,
			version,
			title,
			description
		};
	}

	function createDefaultRoadmapItems() {
		return [
			createRoadmapItem('1', '1.0.0', 'Foundation', 'Describe the first major milestone or feature set'),
			createRoadmapItem('1', '1.1.0', 'Feature release', 'Describe the next meaningful improvement in order'),
			createRoadmapItem(
				'2',
				'2.0.0',
				'Refinement',
				'Describe the latest polish, expansion, or outcome-driven update'
			)
		];
	}

	function createDraftImage(image: Project['images'][number]): DraftImage {
		return {
			id: crypto.randomUUID(),
			name: image.src.split('/').pop() ?? image.label,
			sizeLabel: 'Existing asset',
			width: image.width,
			height: image.height,
			alt: image.alt,
			label: image.label,
			caption: image.caption,
			storagePath: image.src,
			previewUrl: image.src
		};
	}

	const pageTitle = $derived(mode === 'edit' ? 'Edit Project' : 'Add Project');
	const pageHeading = $derived(
		mode === 'edit' ? 'Update an existing project.' : 'Create the next project entry.'
	);
	const actionLabel = $derived(
		mode === 'edit' ? 'Generate updated project draft' : 'Add project draft'
	);
	const actionReadyText = $derived(
		mode === 'edit'
			? 'The updated project draft is ready. You can use this refreshed object for the current content-based setup, and later this same action can become the real database save.'
			: 'The project draft is ready. You can use this generated object for the current content-based setup, and later this same action can become the real database save.'
	);

	let title = $state('');
	let slug = $state('');
	let description = $state('');
	let stack = $state('');
	let selected = $state(true);
	let kicker = $state('');
	let hero = $state('');
	let overview = $state('');
	let challenge = $state('');
	let approach = $state('');
	let outcome = $state('');
	let images = $state<DraftImage[]>([]);
	let roadmapItems = $state<DraftRoadmapItem[]>([]);
	let draftRequested = $state(false);
	let initialized = $state(false);

	$effect(() => {
		if (initialized) return;

		title = initialProject?.title ?? '';
		slug = initialProject?.slug ?? '';
		description = initialProject?.description ?? '';
		stack = initialProject?.stack.join(', ') ?? '';
		selected = initialProject?.selected ?? true;
		kicker = initialProject?.kicker ?? '';
		hero = initialProject?.hero ?? '';
		overview = initialProject?.overview ?? '';
		challenge = initialProject?.challenge ?? '';
		approach = initialProject?.approach ?? '';
		outcome = initialProject?.outcome ?? '';
		images = initialProject ? initialProject.images.map((image) => createDraftImage(image)) : [];
		roadmapItems = initialProject
			? initialProject.roadmap.map((item) =>
					createRoadmapItem(item.majorVersion, item.version, item.title, item.description)
				)
			: createDefaultRoadmapItems();
		initialized = true;
	});

	const resolvedSlug = $derived(slug || slugify(title));
	const stackItems = $derived(
		stack
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean)
	);
	const completedRoadmapItems = $derived(
		roadmapItems
			.map((item) => ({
				majorVersion: item.majorVersion.trim(),
				version: item.version.trim(),
				title: item.title.trim(),
				description: item.description.trim()
			}))
			.filter((item) => item.majorVersion && item.version && item.title && item.description)
	);
	const canGenerateDraft = $derived(
		Boolean(
			title.trim() &&
				description.trim() &&
				kicker.trim() &&
				hero.trim() &&
				overview.trim() &&
				challenge.trim() &&
				approach.trim() &&
				outcome.trim() &&
				images.length > 0 &&
				completedRoadmapItems.length > 0
		)
	);

	const snippet = $derived(`{
	slug: '${escapeValue(resolvedSlug)}',
	title: '${escapeValue(title)}',
	description: '${escapeValue(description)}',
	stack: [${stackItems.map((item) => `'${escapeValue(item)}'`).join(', ')}],
	selected: ${selected},
	kicker: '${escapeValue(kicker)}',
	hero: '${escapeValue(hero)}',
	overview: '${escapeValue(overview)}',
	challenge: '${escapeValue(challenge)}',
	approach: '${escapeValue(approach)}',
	outcome: '${escapeValue(outcome)}',
	images: [
${images
	.map(
		(image) => `		{
			src: '${escapeValue(image.storagePath)}',
			alt: '${escapeValue(image.alt)}',
			label: '${escapeValue(image.label)}',
			caption: '${escapeValue(image.caption)}',
			width: ${image.width},
			height: ${image.height}
		}`
	)
	.join(',\n')}
	],
	roadmap: [
${completedRoadmapItems
	.map(
		(item) => `		{
			majorVersion: '${escapeValue(item.majorVersion)}',
			version: '${escapeValue(item.version)}',
			title: '${escapeValue(item.title)}',
			description: '${escapeValue(item.description)}'
		}`
	)
	.join(',\n')}
	]
}`);

	function addRoadmapItem() {
		roadmapItems = [...roadmapItems, createRoadmapItem()];
	}

	function updateRoadmapItem(
		id: string,
		field: 'majorVersion' | 'version' | 'title' | 'description',
		value: string
	) {
		roadmapItems = roadmapItems.map((item) => (item.id === id ? { ...item, [field]: value } : item));
	}

	function removeRoadmapItem(id: string) {
		roadmapItems = roadmapItems.filter((item) => item.id !== id);
	}

	function generateDraft() {
		draftRequested = true;
	}
</script>

<svelte:head>
	<title>Junseo | {pageTitle}</title>
	<meta name="description" content="Admin page for drafting a portfolio project." />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">{pageTitle}</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{pageHeading}</h1>
			<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
				This version gives you a draft-first admin flow. It can collect multiple dropped images,
				extract dimensions, and prepare a project object now, even before the database and storage
				layer are added.
			</p>
		</div>

		<div class="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="space-y-5 rounded-[2rem] border border-border bg-card p-8 sm:p-10">
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="title" class="text-sm font-medium text-foreground">Title</label>
						<input
							id="title"
							bind:value={title}
							class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						/>
					</div>
					<div>
						<label for="slug" class="text-sm font-medium text-foreground">Slug</label>
						<input
							id="slug"
							bind:value={slug}
							placeholder="auto-generated if left blank"
							class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="description" class="text-sm font-medium text-foreground">Description</label>
					<textarea id="description" bind:value={description} rows="3" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="stack" class="text-sm font-medium text-foreground">Stack</label>
						<input
							id="stack"
							bind:value={stack}
							placeholder="SvelteKit, Tailwind CSS, TypeScript"
							class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						/>
					</div>
					<div>
						<label for="kicker" class="text-sm font-medium text-foreground">Kicker</label>
						<input id="kicker" bind:value={kicker} class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" />
					</div>
				</div>

				<div>
					<label for="hero" class="text-sm font-medium text-foreground">Hero summary</label>
					<textarea id="hero" bind:value={hero} rows="3" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div>
					<label for="overview" class="text-sm font-medium text-foreground">Overview</label>
					<textarea id="overview" bind:value={overview} rows="4" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div>
					<label for="challenge" class="text-sm font-medium text-foreground">Challenge</label>
					<textarea id="challenge" bind:value={challenge} rows="4" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div>
					<label for="approach" class="text-sm font-medium text-foreground">Approach</label>
					<textarea id="approach" bind:value={approach} rows="4" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div>
					<label for="outcome" class="text-sm font-medium text-foreground">Outcome</label>
					<textarea id="outcome" bind:value={outcome} rows="4" class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"></textarea>
				</div>

				<div class="space-y-4">
					<div class="flex items-center justify-between gap-4">
						<div>
							<p class="text-sm font-medium text-foreground">Roadmap</p>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								Add features or milestones in the order they were shipped.
							</p>
						</div>
						<button type="button" class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted" onclick={addRoadmapItem}>
							Add feature
						</button>
					</div>

					<div class="space-y-4">
						{#each roadmapItems as item, index (item.id)}
							<div class="rounded-[1.5rem] border border-border bg-background p-4">
								<div class="flex items-start justify-between gap-4">
									<p class="text-sm font-semibold text-muted-foreground">Step {index + 1}</p>
									{#if roadmapItems.length > 1}
										<button type="button" class="rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted" onclick={() => removeRoadmapItem(item.id)}>
											Remove
										</button>
									{/if}
								</div>

								<div class="mt-4 grid gap-4">
									<div class="grid gap-4 sm:grid-cols-2">
										<div>
											<label for={`roadmap-major-version-${item.id}`} class="text-sm font-medium text-foreground">Major version</label>
											<input
												id={`roadmap-major-version-${item.id}`}
												value={item.majorVersion}
												placeholder="1"
												class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
												oninput={(event) => updateRoadmapItem(item.id, 'majorVersion', event.currentTarget.value)}
											/>
										</div>

										<div>
											<label for={`roadmap-version-${item.id}`} class="text-sm font-medium text-foreground">Version</label>
											<input
												id={`roadmap-version-${item.id}`}
												value={item.version}
												placeholder="1.0.0"
												class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
												oninput={(event) => updateRoadmapItem(item.id, 'version', event.currentTarget.value)}
											/>
										</div>
									</div>

									<div>
										<label for={`roadmap-title-${item.id}`} class="text-sm font-medium text-foreground">Feature title</label>
										<input
											id={`roadmap-title-${item.id}`}
											value={item.title}
											class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
											oninput={(event) => updateRoadmapItem(item.id, 'title', event.currentTarget.value)}
										/>
									</div>

									<div>
										<label for={`roadmap-description-${item.id}`} class="text-sm font-medium text-foreground">Description</label>
										<textarea
											id={`roadmap-description-${item.id}`}
											rows="3"
											class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
											oninput={(event) => updateRoadmapItem(item.id, 'description', event.currentTarget.value)}
										>{item.description}</textarea>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<MultiImageDropzone bind:images />

				<label class="flex items-center gap-3 text-sm font-medium text-foreground">
					<input type="checkbox" bind:checked={selected} />
					Show this in selected projects
				</label>

				<div class="rounded-[1.5rem] border border-border bg-background p-4">
					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p class="text-sm leading-6 text-muted-foreground">
							When everything is filled in, use this button to add the project draft below.
						</p>
						<button
							type="button"
							class="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors enabled:hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!canGenerateDraft}
							onclick={generateDraft}
						>
							{actionLabel}
						</button>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div class="rounded-[2rem] border border-border bg-card p-8">
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Workflow</p>
					<p class="mt-4 text-base leading-8 text-foreground/80">
						Right now this page is the admin drafting tool. The dropped files stay local to this
						session, but the generated image objects are already shaped for a future database plus
						storage upload flow, and the roadmap field already matches the project detail layout.
					</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8">
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Generated Output</p>
					{#if draftRequested && canGenerateDraft}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">{actionReadyText}</p>
						<pre class="mt-4 overflow-x-auto rounded-2xl bg-muted/50 p-4 text-xs leading-6 text-foreground/85">{snippet}</pre>
					{:else if !canGenerateDraft}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">
							Fill in all project sections, add at least one image, and add one roadmap feature to
							enable the add button.
						</p>
					{:else}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">
							Press `{actionLabel}` to generate the ready-to-paste project object here.
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>
