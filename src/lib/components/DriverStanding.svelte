<script lang="ts">
	import { cn } from '$lib/utils';
	import { findFlagUrlByNationality } from 'country-flags-svg';

	export let small = false;
	export let name: string;
	export let nationality: string;
	export let constructorName: string;
	export let sideInfo: string;
</script>

<div class="space-y-2 w-full">
	<div class={cn('flex space-x-2 text-sm font-medium leading-none', { 'text-xs': small })}>
		<img
			class={cn('w-5', { 'w-4': small })}
			src={findFlagUrlByNationality(nationality)}
			alt={nationality}
		/>
		<span class="">{constructorName}</span>
	</div>
	<div class="flex items-center justify-between">
		<span class={cn('scroll-m-20 text-xl font-semibold tracking-tight', { 'text-lg': small })}>
			{name}
		</span>
		<span class={cn('scroll-m-20 text-2xl font-semibold tracking-tight', { 'text-xl': small })}
			>{sideInfo}</span
		>
	</div>
</div>
