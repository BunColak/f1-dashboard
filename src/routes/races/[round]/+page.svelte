<script lang="ts">
	import Card from '$components/ui/card/Card.svelte';
	import CardHeader from '$components/ui/card/CardHeader.svelte';
	import CardTitle from '$components/ui/card/CardTitle.svelte';
	import type { PageServerData } from './$types';
	import { MapPin, Calendar } from 'lucide-svelte';
	import { format } from 'date-fns';
	import CardContent from '$components/ui/card/CardContent.svelte';
	import DriverStanding from '$components/DriverStanding.svelte';
	import RaceResultsTable from './RaceResultsTable.svelte';

	export let data: PageServerData;

	let roundDetails = data.roundDetails.MRData.RaceTable.Races[0];
</script>

<svelte:head>
	<title>{roundDetails.raceName}</title>
</svelte:head>

<section>
	<div class="space-y-4">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{roundDetails.raceName}
		</h1>
		<h4 class="scroll-m-20 text-lg font-semibold tracking-tight flex items-center space-x-2">
			<MapPin /> <span>{roundDetails.Circuit.circuitName}</span>
		</h4>
		<h4 class="scroll-m-20 text-lg font-semibold tracking-tight flex items-center space-x-2">
			<Calendar /> <span>{format(new Date(roundDetails.date), 'dd MMMM yyyy')}</span>
		</h4>
	</div>
	<div class="grid lg:grid-cols-3 mt-6 gap-6">
		<Card>
			<CardHeader>
				<CardTitle>Winner</CardTitle>
			</CardHeader>
			<CardContent>
				{#await data.deferred.race}
					<div>Loading...</div>
				{:then race}
					<DriverStanding
						constructorName={race.MRData.RaceTable.Races[0].Results[0].Constructor.name}
						nationality={race.MRData.RaceTable.Races[0].Results[0].Driver.nationality}
						sideInfo={`${race.MRData.RaceTable.Races[0].Results[0].points} points`}
						name={`${race.MRData.RaceTable.Races[0].Results[0].Driver.givenName} ${race.MRData.RaceTable.Races[0].Results[0].Driver.familyName}`}
					/>
				{/await}
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Pole Position</CardTitle>
			</CardHeader>
			<CardContent>
				{#await data.deferred.qualiDetails}
					<p>Loading...</p>
				{:then qualiDetails}
					<DriverStanding
						constructorName={qualiDetails.MRData.RaceTable.Races[0].QualifyingResults[0].Constructor
							.name}
						nationality={qualiDetails.MRData.RaceTable.Races[0].QualifyingResults[0].Driver
							.nationality}
						sideInfo={`${qualiDetails.MRData.RaceTable.Races[0].QualifyingResults[0].Q3}`}
						name={`${qualiDetails.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.givenName} ${qualiDetails.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.familyName}`}
					/>
				{/await}
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Fastest Lap</CardTitle>
			</CardHeader>
			<CardContent>
				{#await data.deferred.fastestLapDetails}
					<div>Loading...</div>
				{:then fastestLap}
					<DriverStanding
						constructorName={fastestLap.MRData.RaceTable.Races[data.round].Results[0].Constructor
							.name}
						nationality={fastestLap.MRData.RaceTable.Races[data.round].Results[0].Driver
							.nationality}
						sideInfo={`${
							fastestLap.MRData.RaceTable.Races[data.round].Results[0].FastestLap?.Time?.time
						}`}
						name={`${fastestLap.MRData.RaceTable.Races[data.round].Results[0].Driver.givenName} ${
							fastestLap.MRData.RaceTable.Races[data.round].Results[0].Driver.familyName
						}`}
					/>
				{/await}
			</CardContent>
		</Card>
	</div>
	<div class="mt-6 space-y-4">
		<h2 class="text-2xl font-semibold tracking-tight">Results</h2>
		{#await data.deferred.race}
			<div>Loading...</div>
		{:then race}
			<RaceResultsTable results={race.MRData.RaceTable.Races[0].Results} />
		{/await}
	</div>
</section>
