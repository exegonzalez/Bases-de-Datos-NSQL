cryptocoin  = { 
    "data": [
        {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "num_market_pairs": 7849,
            "date_added": "2013-04-28T00:00:00.000Z",
            "tags": [
                "mineable"
            ],
            "max_supply": 21000000,
            "circulating_supply": 18336037,
            "total_supply": 18336037,
            "platform": null,
            "cmc_rank": 1,
            "last_updated": "2020-04-20T16:52:54.000Z",
            "quote": {
                "USD": {
                    "price": 7084.48956946,
                    "volume_24h": 33717990381.2601,
                    "percent_change_1h": -0.0883069,
                    "percent_change_24h": -1.52681,
                    "percent_change_7d": 4.78194,
                    "market_cap": 129901462871.73264,
                    "last_updated": "2020-04-20T16:52:54.000Z"
                }
            }
        }
    ]
}

console.log(`keys: ${Object.keys(cryptocoin)}`)
console.log(`values: ${Object.values(cryptocoin)}`)
