import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { fastestResultsSchema, qualifyingResultsSchema, raceResultsSchema, roundDetailsSchema } from "$lib/schemas";

const fetchRaceDetails = async (round: number) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}/results.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return raceResultsSchema.parse(data);
}

const fetchRoundDetails = async (round: number) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return roundDetailsSchema.parse(data);
}

const fetchQualiDetails = async (round: number) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}/qualifying.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return qualifyingResultsSchema.parse(data);
}

const fetchFastestLapDetails = async (round: number) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}/fastest/1/results.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return fastestResultsSchema.parse(data);
}

export const load: PageServerLoad = async ({ fetch, params }) => {
    const round = z.coerce.number().parse(params.round);

    const roundDetails = await fetchRoundDetails(round)

    const race = fetchRaceDetails(round)

    const qualiDetails = fetchQualiDetails(round)

    const fastestLapDetails = fetchFastestLapDetails(round)

    return {
        roundDetails,
        deferred: {
            race,
            qualiDetails,
            fastestLapDetails
        },
        round
    }
};