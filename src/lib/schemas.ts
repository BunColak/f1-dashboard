import { z } from 'zod';

export const seasonSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		RaceTable: z.object({
			season: z.string(),
			Races: z.array(
				z.union([
					z.object({
						season: z.string(),
						round: z.string(),
						url: z.string(),
						raceName: z.string(),
						Circuit: z.object({
							circuitId: z.string(),
							url: z.string(),
							circuitName: z.string(),
							Location: z.object({
								lat: z.string(),
								long: z.string(),
								locality: z.string(),
								country: z.string()
							})
						}),
						date: z.string(),
						time: z.string(),
						FirstPractice: z.object({ date: z.string(), time: z.string() }),
						SecondPractice: z.object({ date: z.string(), time: z.string() }),
						ThirdPractice: z.object({ date: z.string(), time: z.string() }),
						Qualifying: z.object({ date: z.string(), time: z.string() })
					}),
					z.object({
						season: z.string(),
						round: z.string(),
						url: z.string(),
						raceName: z.string(),
						Circuit: z.object({
							circuitId: z.string(),
							url: z.string(),
							circuitName: z.string(),
							Location: z.object({
								lat: z.string(),
								long: z.string(),
								locality: z.string(),
								country: z.string()
							})
						}),
						date: z.string(),
						time: z.string(),
						FirstPractice: z.object({ date: z.string(), time: z.string() }),
						Qualifying: z.object({ date: z.string(), time: z.string() }),
						SecondPractice: z.object({ date: z.string(), time: z.string() }),
						Sprint: z.object({ date: z.string(), time: z.string() })
					})
				])
			)
		})
	})
});

export const driverStandingsSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		StandingsTable: z.object({
			season: z.string(),
			round: z.string().optional(),
			StandingsLists: z.array(
				z.object({
					season: z.string(),
					round: z.string().optional(),
					DriverStandings: z.array(
						z.union([
							z.object({
								position: z.string(),
								positionText: z.string(),
								points: z.string(),
								wins: z.string(),
								Driver: z.object({
									driverId: z.string(),
									permanentNumber: z.string(),
									code: z.string(),
									url: z.string(),
									givenName: z.string(),
									familyName: z.string(),
									dateOfBirth: z.string(),
									nationality: z.string()
								}),
								Constructors: z.array(
									z.object({
										constructorId: z.string(),
										url: z.string(),
										name: z.string(),
										nationality: z.string()
									})
								)
							}),
							z.object({
								position: z.string(),
								positionText: z.string(),
								points: z.string(),
								wins: z.string(),
								Driver: z.object({
									driverId: z.string(),
									code: z.string(),
									url: z.string(),
									givenName: z.string(),
									familyName: z.string(),
									dateOfBirth: z.string(),
									nationality: z.string()
								}),
								Constructors: z.array(
									z.object({
										constructorId: z.string(),
										url: z.string(),
										name: z.string(),
										nationality: z.string()
									})
								)
							})
						])
					)
				})
			)
		})
	})
});

export const constructorInStandingSchema = z.object({
	position: z.string(),
	positionText: z.string(),
	points: z.string(),
	wins: z.string(),
	Constructor: z.object({
		constructorId: z.string(),
		url: z.string(),
		name: z.string(),
		nationality: z.string()
	})
});

export type ConstructorInStanding = z.infer<typeof constructorInStandingSchema>;

export const constructorSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		StandingsTable: z.object({
			season: z.string(),
			round: z.string().optional(),
			StandingsLists: z.array(
				z.object({
					season: z.string(),
					round: z.string().optional(),
					ConstructorStandings: z.array(constructorInStandingSchema)
				})
			)
		})
	})
});

export const fastestResultsSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		RaceTable: z.object({
			season: z.string(),
			fastest: z.string(),
			Races: z.array(
				z.union([
					z.object({
						season: z.string(),
						round: z.string(),
						url: z.string(),
						raceName: z.string(),
						Circuit: z.object({
							circuitId: z.string(),
							url: z.string(),
							circuitName: z.string(),
							Location: z.object({
								lat: z.string(),
								long: z.string(),
								locality: z.string(),
								country: z.string()
							})
						}),
						date: z.string(),
						time: z.string(),
						Results: z.array(
							z.object({
								number: z.string(),
								position: z.string(),
								positionText: z.string(),
								points: z.string(),
								Driver: z.object({
									driverId: z.string(),
									permanentNumber: z.string(),
									code: z.string(),
									url: z.string(),
									givenName: z.string(),
									familyName: z.string(),
									dateOfBirth: z.string(),
									nationality: z.string()
								}),
								Constructor: z.object({
									constructorId: z.string(),
									url: z.string(),
									name: z.string(),
									nationality: z.string()
								}),
								grid: z.string(),
								laps: z.string(),
								status: z.string(),
								FastestLap: z.object({
									rank: z.string(),
									lap: z.string(),
									Time: z.object({ time: z.string() }).optional(),
									AverageSpeed: z.object({
										units: z.string(),
										speed: z.string()
									})
								})
							})
						)
					}),
					z.object({
						season: z.string(),
						round: z.string(),
						url: z.string(),
						raceName: z.string(),
						Circuit: z.object({
							circuitId: z.string(),
							url: z.string(),
							circuitName: z.string(),
							Location: z.object({
								lat: z.string(),
								long: z.string(),
								locality: z.string(),
								country: z.string()
							})
						}),
						date: z.string(),
						time: z.string(),
						Results: z.array(
							z.object({
								number: z.string(),
								position: z.string(),
								positionText: z.string(),
								points: z.string(),
								Driver: z.object({
									driverId: z.string(),
									permanentNumber: z.string(),
									code: z.string(),
									url: z.string(),
									givenName: z.string(),
									familyName: z.string(),
									dateOfBirth: z.string(),
									nationality: z.string()
								}),
								Constructor: z.object({
									constructorId: z.string(),
									url: z.string(),
									name: z.string(),
									nationality: z.string()
								}),
								grid: z.string(),
								laps: z.string(),
								status: z.string(),
								Time: z.object({ millis: z.string(), time: z.string() }),
								FastestLap: z.object({
									rank: z.string(),
									lap: z.string(),
									Time: z.object({ time: z.string() }),
									AverageSpeed: z.object({
										units: z.string(),
										speed: z.string()
									})
								}).optional()
							})
						)
					})
				])
			)
		})
	})
});

export const resultSchema = z.union([
	z.object({
		number: z.string(),
		position: z.string(),
		positionText: z.string(),
		points: z.string(),
		Driver: z.object({
			driverId: z.string(),
			permanentNumber: z.string(),
			code: z.string(),
			url: z.string(),
			givenName: z.string(),
			familyName: z.string(),
			dateOfBirth: z.string(),
			nationality: z.string()
		}),
		Constructor: z.object({
			constructorId: z.string(),
			url: z.string(),
			name: z.string(),
			nationality: z.string()
		}),
		grid: z.string(),
		laps: z.string(),
		status: z.string(),
		Time: z.object({ millis: z.string(), time: z.string() }),
		FastestLap: z.object({
			rank: z.string(),
			lap: z.string(),
			Time: z.object({ time: z.string() }),
			AverageSpeed: z.object({
				units: z.string(),
				speed: z.string()
			})
		}).optional()
	}),
	z.object({
		number: z.string(),
		position: z.string(),
		positionText: z.string(),
		points: z.string(),
		Driver: z.object({
			driverId: z.string(),
			permanentNumber: z.string(),
			code: z.string(),
			url: z.string(),
			givenName: z.string(),
			familyName: z.string(),
			dateOfBirth: z.string(),
			nationality: z.string()
		}),
		Constructor: z.object({
			constructorId: z.string(),
			url: z.string(),
			name: z.string(),
			nationality: z.string()
		}),
		grid: z.string(),
		laps: z.string(),
		status: z.string(),
		FastestLap: z.object({
			rank: z.string(),
			lap: z.string(),
			Time: z.object({ time: z.string() }),
			AverageSpeed: z.object({
				units: z.string(),
				speed: z.string()
			})
		}).optional()
	})
])

export type Result = z.infer<typeof resultSchema>;

export const raceResultsSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		RaceTable: z.object({
			season: z.string(),
			round: z.string(),
			Races: z.array(
				z.object({
					season: z.string(),
					round: z.string(),
					url: z.string(),
					raceName: z.string(),
					Circuit: z.object({
						circuitId: z.string(),
						url: z.string(),
						circuitName: z.string(),
						Location: z.object({
							lat: z.string(),
							long: z.string(),
							locality: z.string(),
							country: z.string()
						})
					}),
					date: z.string(),
					time: z.string(),
					Results: z.array(
						resultSchema
					)
				})
			)
		})
	})
});

export const qualifyingResultsSchema = z.object({
	MRData: z.object({
		xmlns: z.string(),
		series: z.string(),
		url: z.string(),
		limit: z.string(),
		offset: z.string(),
		total: z.string(),
		RaceTable: z.object({
			season: z.string(),
			round: z.string(),
			Races: z.array(
				z.object({
					season: z.string(),
					round: z.string(),
					url: z.string(),
					raceName: z.string(),
					Circuit: z.object({
						circuitId: z.string(),
						url: z.string(),
						circuitName: z.string(),
						Location: z.object({
							lat: z.string(),
							long: z.string(),
							locality: z.string(),
							country: z.string()
						})
					}),
					date: z.string(),
					time: z.string(),
					QualifyingResults: z.array(
							z.object({
								number: z.string(),
								position: z.string(),
								Driver: z.object({
									driverId: z.string(),
									permanentNumber: z.string(),
									code: z.string(),
									url: z.string(),
									givenName: z.string(),
									familyName: z.string(),
									dateOfBirth: z.string(),
									nationality: z.string()
								}),
								Constructor: z.object({
									constructorId: z.string(),
									url: z.string(),
									name: z.string(),
									nationality: z.string()
								}),
								Q1: z.string(),
								Q2: z.string().optional(),
								Q3: z.string().optional()
							}),
					)
				})
			)
		})
	})
});

export const roundDetailsSchema = z.object({
  MRData: z.object({
    xmlns: z.string(),
    series: z.string(),
    url: z.string(),
    limit: z.string(),
    offset: z.string(),
    total: z.string(),
    RaceTable: z.object({
      season: z.string(),
      round: z.string(),
      Races: z.array(
        z.object({
          season: z.string(),
          round: z.string(),
          url: z.string(),
          raceName: z.string(),
          Circuit: z.object({
            circuitId: z.string(),
            url: z.string(),
            circuitName: z.string(),
            Location: z.object({
              lat: z.string(),
              long: z.string(),
              locality: z.string(),
              country: z.string()
            })
          }),
          date: z.string(),
          time: z.string(),
          FirstPractice: z.object({ date: z.string(), time: z.string() }),
          SecondPractice: z.object({ date: z.string(), time: z.string() }),
          ThirdPractice: z.object({ date: z.string(), time: z.string() }).optional(),
          Qualifying: z.object({ date: z.string(), time: z.string() })
        })
      )
    })
  })
})
