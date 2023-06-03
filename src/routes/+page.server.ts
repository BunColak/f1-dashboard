import {
	constructorSchema,
	driverStandingsSchema,
	seasonSchema,
	fastestResultsSchema,
	raceResultsSchema,
	qualifyingResultsSchema
} from '$lib/schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const season = await fetch('http://ergast.com/api/f1/current.json', {
		headers: { 'Content-Type': 'application/json' }
	}).then((r) => r.json());
	const driverStandings = await fetch('http://ergast.com/api/f1/current/driverStandings.json', {
		headers: { 'Content-Type': 'application/json' }
	}).then((r) => r.json());
	const constructorStandings = await fetch(
		'http://ergast.com/api/f1/current/constructorStandings.json',
		{ headers: { 'Content-Type': 'application/json' } }
	).then((r) => r.json());

	const raceFastestLaps = await fetch('http://ergast.com/api/f1/current/fastest/1/results.json', {
		headers: { 'Content-Type': 'application/json' }
	}).then((r) => r.json());

	const raceResults = await fetch('http://ergast.com/api/f1/current/last/results.json', {
		headers: { 'Content-Type': 'application/json' }
	}).then((r) => r.json());

	const raceQualifying = await fetch('http://ergast.com/api/f1/current/last/qualifying.json', {
		headers: { 'Content-Type': 'application/json' }
	}).then((r) => r.json());

	return {
		currentSeason: seasonSchema.parse(season),
		driverStandings: driverStandingsSchema.parse(driverStandings),
		constructorStandings: constructorSchema.parse(constructorStandings),
		raceFastestLaps: fastestResultsSchema.parse(raceFastestLaps),
		raceResults: raceResultsSchema.parse(raceResults),
		raceQualifying: qualifyingResultsSchema.parse(raceQualifying)
	};
};
