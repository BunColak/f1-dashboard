import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { fastestResultsSchema, qualifyingResultsSchema, raceResultsSchema, roundDetailsSchema } from "$lib/schemas";

const fetchRaceDetails = async (round: number, svelteFetch: typeof fetch) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}/results.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return raceResultsSchema.parse(data);
}

const fetchRoundDetails = async (round: number, svelteFetch: typeof fetch) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return roundDetailsSchema.parse(data);
}

const fetchQualiDetails = async (round: number, svelteFetch: typeof fetch) => {
    const res = await fetch(`http://ergast.com/api/f1/current/${round}/qualifying.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return qualifyingResultsSchema.parse(data);
}

const fetchFastestLapDetails = async (svelteFetch: typeof fetch) => {
    const res = await svelteFetch(`http://ergast.com/api/f1/current/fastest/1/results.json`, {
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    return fastestResultsSchema.parse(data);
}

export const load: PageServerLoad = async ({ params, fetch }) => {
    const round = z.coerce.number().parse(params.round);

    const roundDetails = await fetchRoundDetails(round, fetch)

    const race = fetchRaceDetails(round, fetch)

    const qualiDetails = fetchQualiDetails(round, fetch)

    const fastestLapDetails = fetchFastestLapDetails(fetch)

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