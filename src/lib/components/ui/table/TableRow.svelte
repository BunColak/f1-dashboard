<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	let onClick: (event: MouseEvent) => void = () => {};
	export { className as class, onClick };
</script>

<tr
	class={cn(
		'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
		className
	)}
	on:click={onClick}
	{...$$restProps}
>
	<slot />
</tr>
