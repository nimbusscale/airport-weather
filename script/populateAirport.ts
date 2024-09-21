import Papa from "papaparse"

interface RawAirport {
    iata_code: string,
    coordinates: string
}


interface Airport {
    code: string,
    lat: string,
    long: string
}



async function fetchCSVData(url: string): Promise<string> {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
}

function parseCSVtoJSON(csvData: string): Promise<any> {
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                resolve(result.data)
            },
            error: (error: Error) => {
                reject(error)
            }
        })
    })
}

async function fetchAndConvertCSVToJSON(url: string): Promise<RawAirport[]> {
    const csvData = await fetchCSVData(url)
    return await parseCSVtoJSON(csvData)
}

function buildAirportObjectsFromJSON(rawAirports: RawAirport[]): Airport[] {
    return rawAirports.filter((rawAirport) => rawAirport.iata_code
        ).map((rawAirport): Airport => {
            return {
                code: rawAirport.iata_code,
                lat: rawAirport.coordinates.split(',')[0].trim(),
                long: rawAirport.coordinates.split(',')[1].trim()
            }
    })
}

const url = 'https://datahub.io/@olayway/airport-codes/_r/-/data/airport-codes.csv'
fetchAndConvertCSVToJSON(url).then(jsonData => {
    let airports = buildAirportObjectsFromJSON(jsonData)
    console.log(airports)
})


