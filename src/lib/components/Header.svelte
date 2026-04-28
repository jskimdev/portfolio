<script lang="ts">
	let { isAdmin = false }: { isAdmin?: boolean } = $props();

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blogs', label: 'Blog' }
	];
</script>

<header class="border-b border-border/70">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
		<a href="/" class="text-xl font-bold">Junseo</a>

		<div class="flex items-center gap-6">
			<nav class="flex items-center gap-6">
				{#each navItems as item}
					<a href={item.href} class="text-sm font-medium">
						{item.label}
					</a>
				{/each}
			</nav>

			<a
				href={isAdmin ? '/admin' : '/admin/login'}
				class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
			>
				Admin
			</a>
		</div>
	</div>
</header>
