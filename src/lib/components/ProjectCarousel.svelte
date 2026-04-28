<script lang="ts">
	import type { ProjectImage } from '$lib/contents';

	let { images }: { images: ProjectImage[] } = $props();

	let activeIndex = $state(0);

	const currentImage = $derived(images[activeIndex]);

	function showImage(index: number) {
		activeIndex = index;
	}

	function showNext() {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	}
</script>

<div class="rounded-[2rem] border border-border bg-card/70 p-4 sm:p-6">
	<button
		type="button"
		class="block w-full overflow-hidden rounded-[1.5rem] bg-muted/30 text-left"
		onclick={showNext}
		aria-label="Show next project image"
	>
		<div class="flex h-[20rem] items-center justify-center sm:h-[24rem] lg:h-[30rem]">
			<img
				src={currentImage.src}
				alt={currentImage.alt}
				class="h-full w-auto max-w-full object-contain"
				loading="eager"
			/>
		</div>
	</button>

	<div class="mt-5">
		<p class="text-sm font-medium text-foreground">{currentImage.label}</p>
		{#if currentImage.caption}
			<p class="mt-1 text-sm leading-6 text-muted-foreground">{currentImage.caption}</p>
		{/if}
	</div>

	{#if images.length > 1}
		<div class="mt-5 flex items-center justify-center gap-2">
			{#each images as image, index}
				<button
					type="button"
					class={`h-2.5 w-2.5 rounded-full transition-colors ${
						index === activeIndex ? 'bg-foreground' : 'bg-border hover:bg-foreground/50'
					}`}
					onclick={() => showImage(index)}
					aria-label={`Show image ${index + 1}: ${image.label}`}
					aria-pressed={index === activeIndex}
				></button>
			{/each}
		</div>
	{/if}
</div>
