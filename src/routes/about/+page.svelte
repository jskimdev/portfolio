<script lang="ts">
	import { aboutIntro } from '$lib/contents';
</script>

<svelte:head>
	<title>Junseo | About</title>
	<meta
		name="description"
		content="A full-page about section for introducing your background, process, and design approach."
	/>
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="max-w-4xl">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">About</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
				A full page for your background, values, and creative approach.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
				{aboutIntro.summary}
			</p>
		</div>

		<div class="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
				<h2 class="text-2xl font-semibold tracking-tight">Short bio</h2>
				<p class="mt-4 text-base leading-8 text-foreground/80">
					Replace this with a concise introduction covering your background, experience, and current
					focus. A few tight paragraphs will usually read better than a long biography.
				</p>
				<p class="mt-4 text-base leading-8 text-foreground/80">
					You can also describe what kinds of products, teams, or visual systems you enjoy building,
					plus the principles that shape your work.
				</p>
			</div>

			<div class="space-y-6">
				<div class="rounded-[2rem] border border-border bg-card p-8">
					<h2 class="text-xl font-semibold tracking-tight">Focus</h2>
					<p class="mt-3 text-sm leading-7 text-muted-foreground">
						Product design, portfolios, landing pages, editorial systems, or whatever best
						represents your practice.
					</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8">
					<h2 class="text-xl font-semibold tracking-tight">Approach</h2>
					<p class="mt-3 text-sm leading-7 text-muted-foreground">
						Explain how you balance clarity, interaction, typography, and visual hierarchy in your
						process.
					</p>
				</div>

				<div class="rounded-[2rem] border border-border bg-card p-8">
					<h2 class="text-xl font-semibold tracking-tight">Availability</h2>
					<p class="mt-3 text-sm leading-7 text-muted-foreground">
						Add a contact summary, collaboration note, or the kind of inquiries you want to receive.
					</p>
				</div>
			</div>
		</div>
	</section>
</main>
