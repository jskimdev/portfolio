<script lang="ts">
	import { projects, type BlogContentBlock, type BlogPost, type BlogPostType } from '$lib/contents';

	type InitialBlogPost = BlogPost | null;
	type DraftParagraphBlock = {
		id: string;
		type: 'paragraph';
		content: string;
	};
	type DraftImageBlock = {
		id: string;
		type: 'image';
		src: string;
		alt: string;
		caption: string;
		width: string;
		height: string;
	};
	type DraftContentBlock = DraftParagraphBlock | DraftImageBlock;
	type CompletedParagraphBlock = {
		type: 'paragraph';
		content: string;
	};
	type CompletedImageBlock = {
		type: 'image';
		src: string;
		alt: string;
		caption: string;
		width: number;
		height: number;
	};
	type CompletedContentBlock = CompletedParagraphBlock | CompletedImageBlock;

	let {
		mode,
		initialBlogPost = null
	}: {
		mode: 'new' | 'edit';
		initialBlogPost?: InitialBlogPost;
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

	function createParagraphBlock(content = ''): DraftParagraphBlock {
		return {
			id: crypto.randomUUID(),
			type: 'paragraph',
			content
		};
	}

	function createImageBlock(
		src = '',
		alt = '',
		caption = '',
		width = '',
		height = ''
	): DraftImageBlock {
		return {
			id: crypto.randomUUID(),
			type: 'image',
			src,
			alt,
			caption,
			width,
			height
		};
	}

	function createDraftContentBlock(block: BlogContentBlock): DraftContentBlock {
		if (block.type === 'paragraph') {
			return createParagraphBlock(block.content);
		}

		return createImageBlock(
			block.src,
			block.alt,
			block.caption,
			String(block.width),
			String(block.height)
		);
	}

	const blogTypes: BlogPostType[] = ['Project-related', 'General'];
	const projectOptions = projects.map((project) => project.title);

	const pageTitle = $derived(mode === 'edit' ? 'Edit Blog Post' : 'Add Blog Post');
	const pageHeading = $derived(
		mode === 'edit' ? 'Refine an existing post draft.' : 'Draft the next blog entry.'
	);
	const actionLabel = $derived(mode === 'edit' ? 'Generate updated blog draft' : 'Add blog draft');
	const actionReadyText = $derived(
		mode === 'edit'
			? 'The updated blog draft is ready. You can paste this object into the current content file now, and later this same action can become the real save flow.'
			: 'The blog draft is ready. You can paste this object into the current content file now, and later this same action can become the real save flow.'
	);

	let title = $state('');
	let slug = $state('');
	let type = $state<BlogPostType>('Project-related');
	let description = $state('');
	let publishedOn = $state('');
	let readTime = $state('');
	let selected = $state(true);
	let relatedProjects = $state<string[]>([]);
	let contentBlocks = $state<DraftContentBlock[]>([]);
	let draftRequested = $state(false);
	let initialized = $state(false);

	$effect(() => {
		if (initialized) return;

		title = initialBlogPost?.title ?? '';
		slug = initialBlogPost?.slug ?? '';
		type = initialBlogPost?.type ?? 'Project-related';
		description = initialBlogPost?.description ?? '';
		publishedOn = initialBlogPost?.publishedOn ?? '';
		readTime = initialBlogPost?.readTime ?? '';
		selected = initialBlogPost?.selected ?? true;
		relatedProjects = initialBlogPost?.relatedProjects ?? [];
		contentBlocks = initialBlogPost?.content?.length
			? initialBlogPost.content.map((block) => createDraftContentBlock(block))
			: [createParagraphBlock()];
		initialized = true;
	});

	const resolvedSlug = $derived(slug || slugify(title));
	const trimmedRelatedProjects = $derived(
		relatedProjects.map((item) => item.trim()).filter(Boolean)
	);
	const completedContentBlocks = $derived.by<CompletedContentBlock[]>(() => {
		const completedBlocks: CompletedContentBlock[] = [];

		for (const block of contentBlocks) {
			if (block.type === 'paragraph') {
				const content = block.content.trim();

				if (content) {
					completedBlocks.push({ type: 'paragraph', content });
				}

				continue;
			}

			const src = block.src.trim();
			const alt = block.alt.trim();
			const caption = block.caption.trim();
			const width = Number(block.width);
			const height = Number(block.height);

			if (
				!src ||
				!alt ||
				!Number.isFinite(width) ||
				!Number.isFinite(height) ||
				width <= 0 ||
				height <= 0
			) {
				continue;
			}

			completedBlocks.push({
				type: 'image',
				src,
				alt,
				caption,
				width,
				height
			});
		}

		return completedBlocks;
	});
	const canGenerateDraft = $derived(
		Boolean(
			title.trim() &&
			description.trim() &&
			publishedOn.trim() &&
			readTime.trim() &&
			completedContentBlocks.length > 0
		)
	);
	const snippet = $derived(`{
	slug: '${escapeValue(resolvedSlug)}',
	title: '${escapeValue(title)}',
	type: '${escapeValue(type)}',
	description: '${escapeValue(description)}',
	content: [
${completedContentBlocks
	.map((block) =>
		block.type === 'paragraph'
			? `		{
			type: 'paragraph',
			content: '${escapeValue(block.content)}'
		}`
			: `		{
			type: 'image',
			src: '${escapeValue(block.src)}',
			alt: '${escapeValue(block.alt)}',
			caption: '${escapeValue(block.caption)}',
			width: ${block.width},
			height: ${block.height}
		}`
	)
	.join(',\n')}
	],
	relatedProjects: [${trimmedRelatedProjects.map((item) => `'${escapeValue(item)}'`).join(', ')}],
	selected: ${selected},
	publishedOn: '${escapeValue(publishedOn)}',
	readTime: '${escapeValue(readTime)}'
}`);

	function toggleRelatedProject(projectTitle: string) {
		relatedProjects = relatedProjects.includes(projectTitle)
			? relatedProjects.filter((item) => item !== projectTitle)
			: [...relatedProjects, projectTitle];
	}

	function addParagraphBlock() {
		contentBlocks = [...contentBlocks, createParagraphBlock()];
	}

	function addImageBlock() {
		contentBlocks = [...contentBlocks, createImageBlock()];
	}

	function updateParagraphBlock(id: string, value: string) {
		contentBlocks = contentBlocks.map((block) =>
			block.id === id && block.type === 'paragraph' ? { ...block, content: value } : block
		);
	}

	function updateImageBlock(
		id: string,
		field: 'src' | 'alt' | 'caption' | 'width' | 'height',
		value: string
	) {
		contentBlocks = contentBlocks.map((block) =>
			block.id === id && block.type === 'image' ? { ...block, [field]: value } : block
		);
	}

	function removeContentBlock(id: string) {
		contentBlocks = contentBlocks.filter((block) => block.id !== id);
	}

	function moveContentBlock(id: string, direction: -1 | 1) {
		const index = contentBlocks.findIndex((block) => block.id === id);
		const nextIndex = index + direction;

		if (index < 0 || nextIndex < 0 || nextIndex >= contentBlocks.length) return;

		const nextBlocks = [...contentBlocks];
		const [block] = nextBlocks.splice(index, 1);
		nextBlocks.splice(nextIndex, 0, block);
		contentBlocks = nextBlocks;
	}

	function generateDraft() {
		draftRequested = true;
	}
</script>

<svelte:head>
	<title>Junseo | {pageTitle}</title>
	<meta name="description" content="Admin page for drafting a portfolio blog post." />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
				{pageTitle}
			</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{pageHeading}</h1>
			<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
				This follows the same draft-first admin approach as projects, but tailored for writing,
				related project links, inline image sections, and lightweight publishing metadata.
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

				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="type" class="text-sm font-medium text-foreground">Post type</label>
						<select
							id="type"
							bind:value={type}
							class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						>
							{#each blogTypes as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="readTime" class="text-sm font-medium text-foreground">Read time</label>
						<input
							id="readTime"
							bind:value={readTime}
							placeholder="5 min read"
							class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="publishedOn" class="text-sm font-medium text-foreground">Published on</label>
					<input
						id="publishedOn"
						bind:value={publishedOn}
						placeholder="April 28, 2026"
						class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
					/>
				</div>

				<div>
					<label for="description" class="text-sm font-medium text-foreground">Description</label>
					<textarea
						id="description"
						bind:value={description}
						rows="5"
						class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
					></textarea>
				</div>

				<div class="space-y-4 rounded-[1.5rem] border border-border bg-background p-5">
					<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<p class="text-sm font-medium text-foreground">Post content</p>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								Build the article in order. Add paragraphs and insert image blocks wherever they
								should appear in the reading flow.
							</p>
						</div>
						<div class="flex flex-wrap gap-2">
							<button
								type="button"
								class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
								onclick={addParagraphBlock}
							>
								Add paragraph
							</button>
							<button
								type="button"
								class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
								onclick={addImageBlock}
							>
								Add image
							</button>
						</div>
					</div>

					<div class="space-y-4">
						{#each contentBlocks as block, index (block.id)}
							<div class="rounded-[1.5rem] border border-border bg-card p-4">
								<div class="flex items-start justify-between gap-4">
									<div>
										<p class="text-sm font-semibold text-muted-foreground">
											Block {index + 1}
										</p>
										<p class="mt-1 text-sm text-foreground/70">
											{block.type === 'paragraph' ? 'Paragraph' : 'Image'}
										</p>
									</div>

									<div class="flex flex-wrap gap-2">
										<button
											type="button"
											class="rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
											onclick={() => moveContentBlock(block.id, -1)}
											disabled={index === 0}
										>
											Up
										</button>
										<button
											type="button"
											class="rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
											onclick={() => moveContentBlock(block.id, 1)}
											disabled={index === contentBlocks.length - 1}
										>
											Down
										</button>
										<button
											type="button"
											class="rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
											onclick={() => removeContentBlock(block.id)}
										>
											Remove
										</button>
									</div>
								</div>

								{#if block.type === 'paragraph'}
									<div class="mt-4">
										<label
											for={`paragraph-${block.id}`}
											class="text-sm font-medium text-foreground"
										>
											Paragraph
										</label>
										<textarea
											id={`paragraph-${block.id}`}
											rows="5"
											class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
											placeholder="Write the paragraph that should appear at this point in the article"
											oninput={(event) => updateParagraphBlock(block.id, event.currentTarget.value)}
											>{block.content}</textarea
										>
									</div>
								{:else}
									<div class="mt-4 grid gap-4">
										<div>
											<label
												for={`image-src-${block.id}`}
												class="text-sm font-medium text-foreground"
											>
												Image path
											</label>
											<input
												id={`image-src-${block.id}`}
												value={block.src}
												class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
												placeholder="/images/blog/example.jpg"
												oninput={(event) =>
													updateImageBlock(block.id, 'src', event.currentTarget.value)}
											/>
										</div>

										<div class="grid gap-4 sm:grid-cols-2">
											<div>
												<label
													for={`image-width-${block.id}`}
													class="text-sm font-medium text-foreground"
												>
													Width
												</label>
												<input
													id={`image-width-${block.id}`}
													value={block.width}
													class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
													placeholder="1600"
													oninput={(event) =>
														updateImageBlock(block.id, 'width', event.currentTarget.value)}
												/>
											</div>
											<div>
												<label
													for={`image-height-${block.id}`}
													class="text-sm font-medium text-foreground"
												>
													Height
												</label>
												<input
													id={`image-height-${block.id}`}
													value={block.height}
													class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
													placeholder="1000"
													oninput={(event) =>
														updateImageBlock(block.id, 'height', event.currentTarget.value)}
												/>
											</div>
										</div>

										<div>
											<label
												for={`image-alt-${block.id}`}
												class="text-sm font-medium text-foreground"
											>
												Alt text
											</label>
											<input
												id={`image-alt-${block.id}`}
												value={block.alt}
												class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
												placeholder="Describe what this inline image shows"
												oninput={(event) =>
													updateImageBlock(block.id, 'alt', event.currentTarget.value)}
											/>
										</div>

										<div>
											<label
												for={`image-caption-${block.id}`}
												class="text-sm font-medium text-foreground"
											>
												Caption
											</label>
											<textarea
												id={`image-caption-${block.id}`}
												rows="3"
												class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
												placeholder="Optional caption or context for this image"
												oninput={(event) =>
													updateImageBlock(block.id, 'caption', event.currentTarget.value)}
												>{block.caption}</textarea
											>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<div class="rounded-[1.5rem] border border-border bg-background p-5">
					<div class="flex items-start justify-between gap-4">
						<div>
							<p class="text-sm font-medium text-foreground">Related projects</p>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								Connect this post to one or more case studies when it supports project work.
							</p>
						</div>
					</div>

					<div class="mt-5 flex flex-wrap gap-3">
						{#each projectOptions as projectTitle}
							<label
								class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
							>
								<input
									type="checkbox"
									checked={relatedProjects.includes(projectTitle)}
									onchange={() => toggleRelatedProject(projectTitle)}
								/>
								<span>{projectTitle}</span>
							</label>
						{/each}
					</div>
				</div>

				<label class="flex items-center gap-3 text-sm font-medium text-foreground">
					<input type="checkbox" bind:checked={selected} />
					Show this in selected blog sections
				</label>

				<div class="rounded-[1.5rem] border border-border bg-background p-4">
					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p class="text-sm leading-6 text-muted-foreground">
							When the fields are ready, generate the blog object below.
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
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Workflow
					</p>
					<p class="mt-4 text-base leading-8 text-foreground/80">
						Use this to shape blog metadata and body structure consistently before a database
						exists. The generated content array preserves paragraph and image order for eventual
						full article rendering.
					</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8">
					<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
						Generated Output
					</p>
					{#if draftRequested && canGenerateDraft}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">{actionReadyText}</p>
						<pre
							class="mt-4 overflow-x-auto rounded-2xl bg-muted/50 p-4 text-xs leading-6 text-foreground/85">{snippet}</pre>
					{:else if !canGenerateDraft}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">
							Fill in the title, description, publish date, read time, and at least one valid
							content block to enable the add button.
						</p>
					{:else}
						<p class="mt-4 text-sm leading-7 text-muted-foreground">
							Press `{actionLabel}` to generate the ready-to-paste blog object here.
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>
