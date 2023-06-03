<script lang="ts">
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { Result, resultSchema } from '$lib/schemas';
	import { flexRender } from '$lib/utils';
	import {
		createColumnHelper,
		createSvelteTable,
		getCoreRowModel,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	export let results: Result[] = [];

	const columnHelper = createColumnHelper<Result>();

	const columns = [
		columnHelper.accessor('position', {
			id: 'position',
			cell: ({ getValue }) => getValue(),
			header: 'Position'
		}),
		columnHelper.accessor('Driver.code', {
			id: 'code',
			cell: ({ getValue }) => getValue(),
			header: 'Code'
		}),
		columnHelper.accessor((result) => `${result.Driver.givenName} ${result.Driver.familyName}`, {
			id: 'name',
			cell: ({ getValue }) => getValue(),
			header: 'Name'
		}),
		columnHelper.accessor('Constructor.name', {
			id: 'constructor',
			cell: ({ getValue }) => getValue(),
			header: 'Constructor'
		}),
		columnHelper.accessor('laps', {
			id: 'laps',
			cell: ({ getValue }) => getValue(),
			header: 'Laps'
		}),
		columnHelper.accessor('grid', {
			id: 'grid',
			cell: ({ getValue }) => getValue(),
			header: 'Starting Position'
		}),
		columnHelper.accessor('status', {
			id: 'status',
			cell: ({ getValue }) => getValue(),
			header: 'Status'
		}),
		columnHelper.accessor('points', {
			id: 'points',
			cell: ({ getValue }) => getValue(),
			header: 'Points'
		})

	];

	const options = writable<TableOptions<Result>>({
		data: results,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	const table = createSvelteTable(options);
</script>

<Table>
	<TableHeader>
		{#each $table.getHeaderGroups() as headerGroup}
			<TableRow>
				{#each headerGroup.headers as header}
					<TableHead>
						<svelte:component
							this={flexRender(header.column.columnDef.header, header.getContext())}
						/>
					</TableHead>
				{/each}
			</TableRow>
		{/each}
	</TableHeader>
	<TableBody>
		{#each $table.getRowModel().rows as row}
			<TableRow>
				{#each row.getVisibleCells() as cell}
					<TableCell>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</TableCell>
				{/each}
			</TableRow>
		{/each}
	</TableBody>
</Table>
