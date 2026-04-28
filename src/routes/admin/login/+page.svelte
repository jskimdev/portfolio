<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Junseo | Admin Login</title>
	<meta name="description" content="Admin login for portfolio content management." />
</svelte:head>

<main class="bg-background text-foreground">
	<section class="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
		<div class="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
			<p class="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
				Admin Login
			</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight">Verify before editing content.</h1>
			<p class="mt-4 text-base leading-8 text-muted-foreground">
				Use your admin password to unlock the project tools. After signing in, the header button
				becomes a direct `Add project` shortcut.
			</p>

			<form method="POST" class="mt-8 space-y-5">
				<input type="hidden" name="redirectTo" value={form?.redirectTo ?? data.redirectTo} />

				<div>
					<label for="password" class="text-sm font-medium text-foreground">Admin password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						class="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
						placeholder="Enter your admin password"
					/>
				</div>

				{#if form?.error}
					<p class="text-sm text-destructive">{form.error}</p>
				{/if}

				<button
					type="submit"
					class="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
				>
					Sign in
				</button>
			</form>

			<p class="mt-6 text-sm leading-7 text-muted-foreground">
				Set `ADMIN_PASSWORD` in your environment to control access to this admin area.
			</p>
		</div>
	</section>
</main>
