<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import ConstructorStanding from '$lib/components/ConstructorStanding.svelte';

	import type { PageServerData } from './$types';
	import DriverStanding from '$components/DriverStanding.svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	let leadingDriver =
		data.driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
	let secondDriver =
		data.driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[1];
	let thirdDriver = data.driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[2];

	let leadingConstructor =
		data.constructorStandings.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
	let secondConstructor =
		data.constructorStandings.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[1];
	let thirdConstructor =
		data.constructorStandings.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[2];

	let raceWinner = data.raceResults.MRData.RaceTable.Races[0].Results[0];
	let fastestLap =
		data.raceFastestLaps.MRData.RaceTable.Races[
			data.raceFastestLaps.MRData.RaceTable.Races.length - 1
		].Results[0];
	let poleWinner = data.raceQualifying.MRData.RaceTable.Races[0].QualifyingResults[0] as any;
</script>

<svelte:head>
	<title>F1 Dashboard - Overview</title>
</svelte:head>

<div class="grid lg:grid-cols-3 gap-6">
	<Card.Card>
		<Card.CardHeader>
			<Card.CardTitle>Drivers Championship</Card.CardTitle>
		</Card.CardHeader>
		<Card.CardContent>
			<div>
				<DriverStanding
					constructorName={leadingDriver.Constructors[0].name}
					name={`${leadingDriver.Driver.givenName} ${leadingDriver.Driver.familyName}`}
					nationality={leadingDriver.Driver.nationality}
					sideInfo={leadingDriver.points}
				/>
				<Separator class="my-6" />
				<div class="flex justify-between items-stretch">
					<DriverStanding
						small={true}
						constructorName={secondDriver.Constructors[0].name}
						name={`${secondDriver.Driver.givenName} ${secondDriver.Driver.familyName}`}
						nationality={secondDriver.Driver.nationality}
						sideInfo={secondDriver.points}
					/>
					<Separator class="mx-4" orientation="vertical" />
					<DriverStanding
						small={true}
						constructorName={thirdDriver.Constructors[0].name}
						name={`${thirdDriver.Driver.givenName} ${thirdDriver.Driver.familyName}`}
						nationality={thirdDriver.Driver.nationality}
						sideInfo={thirdDriver.points}
					/>
				</div>
			</div>
		</Card.CardContent>
	</Card.Card>
	<Card.Card>
		<Card.CardHeader>
			<Card.CardTitle>Constructors Championship</Card.CardTitle>
		</Card.CardHeader>
		<Card.CardContent>
			<div>
				<ConstructorStanding
					name={leadingConstructor.Constructor.name}
					nationality={leadingConstructor.Constructor.nationality}
					points={leadingConstructor.points}
					wins={leadingConstructor.wins}
				/>
				<Separator class="my-6" />
				<div class="flex justify-between items-stretch">
					<ConstructorStanding
						small
						name={secondConstructor.Constructor.name}
						nationality={secondConstructor.Constructor.nationality}
						points={secondConstructor.points}
						wins={secondConstructor.wins}
					/>
					<Separator class="mx-4" orientation="vertical" />
					<ConstructorStanding
						small
						name={thirdConstructor.Constructor.name}
						nationality={thirdConstructor.Constructor.nationality}
						points={thirdConstructor.points}
						wins={thirdConstructor.wins}
					/>
				</div>
			</div>
		</Card.CardContent>
	</Card.Card>
	<Card.Card>
		<Card.CardHeader>
			<Card.CardTitle
				>Last Race: {data.raceResults.MRData.RaceTable.Races[0].raceName}</Card.CardTitle
			>
		</Card.CardHeader>
		<Card.CardContent>
			<div class="space-y-2">
				<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
					Winner: {raceWinner.Driver.givenName}
					{raceWinner.Driver.familyName}
				</h3>
				<h3 class="scroll-m-20 text-lg font-semibold tracking-tight">
					Pole: {poleWinner.Driver.givenName}
					{poleWinner.Driver.familyName} - {poleWinner.Q3}
				</h3>
				<h3 class="scroll-m-20 text-lg font-semibold tracking-tight">
					FL: {fastestLap.Driver.givenName}
					{fastestLap.Driver.familyName} - {fastestLap.FastestLap.Time.time}
				</h3>
			</div></Card.CardContent
		>
	</Card.Card>
</div>

<h2
	class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-8 mb-4"
>
	Season Calendar
</h2>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Race</TableHead>
			<TableHead>Date</TableHead>
			<TableHead>Curcuit</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each data.currentSeason.MRData.RaceTable.Races as race}
			<TableRow onClick={() => goto(`/race/${race.round}`)} class='cursor-pointer'>
				<TableCell>
					{race.raceName}
				</TableCell>
				<TableCell>
					{race.date}
				</TableCell>
				<TableCell>
					{race.Circuit.circuitName}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
