<script lang="ts">
	import { onDestroy } from 'svelte';

	export type DraftImage = {
		id: string;
		name: string;
		sizeLabel: string;
		width: number;
		height: number;
		alt: string;
		label: string;
		caption: string;
		storagePath: string;
		previewUrl: string;
	};

	let {
		images = $bindable<DraftImage[]>([])
	}: {
		images?: DraftImage[];
	} = $props();

	let inputElement = $state<HTMLInputElement | null>(null);
	let isDragging = $state(false);

	function formatBytes(bytes: number) {
		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(0)} KB`;
		}

		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function sanitizeFilename(name: string) {
		return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/-+/g, '-');
	}

	function loadImage(file: File) {
		return new Promise<DraftImage>((resolve, reject) => {
			const previewUrl = URL.createObjectURL(file);
			const image = new Image();

			image.onload = () => {
				resolve({
					id: crypto.randomUUID(),
					name: file.name,
					sizeLabel: formatBytes(file.size),
					width: image.naturalWidth,
					height: image.naturalHeight,
					alt: '',
					label: file.name.replace(/\.[^.]+$/, ''),
					caption: '',
					storagePath: `/images/${sanitizeFilename(file.name)}`,
					previewUrl
				});
			};

			image.onerror = () => {
				URL.revokeObjectURL(previewUrl);
				reject(new Error(`Unable to read image: ${file.name}`));
			};

			image.src = previewUrl;
		});
	}

	async function addFiles(fileList: FileList | null) {
		if (!fileList) return;

		const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
		const nextImages = await Promise.all(files.map((file) => loadImage(file)));

		images = [...images, ...nextImages];
	}

	function removeImage(id: string) {
		const image = images.find((entry) => entry.id === id);

		if (image) {
			URL.revokeObjectURL(image.previewUrl);
		}

		images = images.filter((entry) => entry.id !== id);
	}

	function updateImage(id: string, field: 'alt' | 'label' | 'caption', value: string) {
		images = images.map((image) => (image.id === id ? { ...image, [field]: value } : image));
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		void addFiles(event.dataTransfer?.files ?? null);
	}

	function openPicker() {
		inputElement?.click();
	}

	onDestroy(() => {
		for (const image of images) {
			URL.revokeObjectURL(image.previewUrl);
		}
	});
</script>

<div class="space-y-5">
	<button
		type="button"
		class={`flex w-full flex-col items-center justify-center rounded-[2rem] border border-dashed px-6 py-12 text-center transition-colors ${
			isDragging ? 'border-foreground/40 bg-muted/60' : 'border-border bg-background hover:bg-muted/30'
		}`}
		ondragenter={() => (isDragging = true)}
		ondragover={(event) => event.preventDefault()}
		ondragleave={() => (isDragging = false)}
		ondrop={handleDrop}
		onclick={openPicker}
	>
		<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">Project images</p>
		<h3 class="mt-4 text-2xl font-semibold tracking-tight">Drop images here</h3>
		<p class="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
			Add multiple images for this project. For now they stay local to the draft, and later these same
			fields can map to your storage layer.
		</p>
		<p class="mt-6 text-sm font-medium text-foreground">Or click to browse files</p>
	</button>

	<input
		bind:this={inputElement}
		type="file"
		accept="image/*"
		multiple
		class="hidden"
		onchange={(event) => void addFiles(event.currentTarget.files)}
	/>

	{#if images.length > 0}
		<div class="space-y-4">
			{#each images as image}
				<div class="rounded-[2rem] border border-border bg-background p-4">
					<div class="grid gap-5 lg:grid-cols-[14rem_1fr]">
						<div class="overflow-hidden rounded-[1.25rem] bg-muted/30">
							<div class="flex aspect-[4/3] items-center justify-center">
								<img src={image.previewUrl} alt={image.name} class="h-full w-full object-cover" />
							</div>
						</div>

						<div class="space-y-4">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="text-sm font-medium text-foreground">{image.name}</p>
									<p class="mt-1 text-sm text-muted-foreground">
										{image.width} x {image.height} • {image.sizeLabel}
									</p>
								</div>

								<button
									type="button"
									class="rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
									onclick={() => removeImage(image.id)}
								>
									Remove
								</button>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<div>
									<label for={`label-${image.id}`} class="text-sm font-medium text-foreground">
										Label
									</label>
									<input
										id={`label-${image.id}`}
										value={image.label}
										class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
										oninput={(event) => updateImage(image.id, 'label', event.currentTarget.value)}
									/>
								</div>

								<div>
									<label for={`storage-${image.id}`} class="text-sm font-medium text-foreground">
										Storage path
									</label>
									<input
										id={`storage-${image.id}`}
										value={image.storagePath}
										class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
										readonly
									/>
								</div>
							</div>

							<div>
								<label for={`alt-${image.id}`} class="text-sm font-medium text-foreground">
									Alt text
								</label>
								<input
									id={`alt-${image.id}`}
									value={image.alt}
									class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
									placeholder="Describe what this image shows"
									oninput={(event) => updateImage(image.id, 'alt', event.currentTarget.value)}
								/>
							</div>

							<div>
								<label for={`caption-${image.id}`} class="text-sm font-medium text-foreground">
									Caption
								</label>
								<textarea
									id={`caption-${image.id}`}
									rows="3"
									class="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm"
									placeholder="Optional caption or context"
									oninput={(event) => updateImage(image.id, 'caption', event.currentTarget.value)}
								>{image.caption}</textarea>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
