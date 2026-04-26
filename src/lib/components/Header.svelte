<script lang="ts">
    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
    ];
</script>

<header class="border-b border-border/70">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" class="text-xl font-bold">Junseo</a>

        <nav class="flex items-center gap-6">
            {#each navItems as item}
                <a href={item.href} class="text-sm font-medium">
                    {item.label}
                </a>
            {/each}
        </nav>
    </div>
</header>
