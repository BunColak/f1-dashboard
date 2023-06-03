<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	const routes = [
		{ href: '/', label: 'Overview' },
		{ href: '/races', label: 'Races' },
		{ href: '/drivers', label: 'Drivers' },
		{ href: '/constructors', label: 'Constructors' }
	];
</script>

<div>
	<ul class="flex lg:space-x-8 space-x-4 text-lg font-medium">
		{#each routes as route}
			<li>
				<a
					class={cn({ 'text-cyan-500': route.href.substring(1) == $page.route.id?.split('/')[1] })}
					href={route.href}>{route.label}</a
				>
			</li>
		{/each}
	</ul>
</div>
