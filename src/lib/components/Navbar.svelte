<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	console.log($page.route.id);

	const routes = [
		{ href: '/', label: 'Overview' },
		{ href: '/races', label: 'Races' },
		{ href: '/drivers', label: 'Drivers' },
		{ href: '/constructors', label: 'Constructors' }
	];
</script>

<div>
	<ul class="flex space-x-8 text-lg font-medium">
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
