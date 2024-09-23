

export interface Weather {
  lat: number,
  long: number,
  date: string,
  units: string,
  temperature: {
    min: number,
    max: number
  }
}
