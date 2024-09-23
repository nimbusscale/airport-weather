import { Injectable } from '@angular/core';
import { Airport, RawAirport } from "./airport";
import { HttpClient } from "@angular/common/http";
import Papa, { ParseResult } from "papaparse";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AirportDataService {
  private url = '/api/@olayway/airport-codes/_r/-/data/airport-codes.csv';
  private rawAirportData: RawAirport[] = [];
  private airports: Airport[] = [];
  private isDataLoaded: boolean = false; // Flag to track if data is loaded
  private dataLoadingPromise: Promise<void> | null = null; // Promise to track data loading

  constructor(private http: HttpClient) {}

  private fetchCSVData(url: string): Promise<string> {
    return lastValueFrom(this.http.get(url, { responseType: 'blob' })).then(
      (blob) => {
        if (!blob) {
          throw new Error(`Failed to download file: ${url}`);
        } else {
          return this.convertBlobToText(blob);
        }
      }
    );
  }

  private convertBlobToText(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  private fetchAndConvertCSVToJSON(url: string): Promise<void> {
    return this.fetchCSVData(url).then((csvData) => {
      return new Promise<void>((resolve, reject) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result: ParseResult<RawAirport>) => {
            this.rawAirportData = result.data;
            resolve();
          },
          error: (error: Error) => {
            reject(new Error(`Unable to parse Raw Airport Data from: ${url}`));
          },
        });
      });
    });
  }

  private async buildAirportObjectsFromJSON(url: string): Promise<void> {
    await this.fetchAndConvertCSVToJSON(url);
    this.rawAirportData
      .filter((rawAirport) => rawAirport.iata_code)
      .map((rawAirport) =>
        this.airports.push({
          code: rawAirport.iata_code,
          lat: rawAirport.coordinates.split(',')[0].trim(),
          long: rawAirport.coordinates.split(',')[1].trim(),
        })
      );
    this.isDataLoaded = true; // Mark data as loaded
  }

  // Ensure data is loaded before executing the callback
  private ensureDataIsLoaded(): Promise<void> {
    if (this.isDataLoaded) {
      return Promise.resolve(); // Data is already loaded
    }

    // If data is not loaded yet, start loading or return the ongoing loading promise
    if (!this.dataLoadingPromise) {
      this.dataLoadingPromise = this.buildAirportObjectsFromJSON(this.url);
    }

    return this.dataLoadingPromise;
  }

  getAirportData(airport_code: string): void {
    this.ensureDataIsLoaded().then(() => {
      const airport_data = this.airports.find(
        (airport) => airport.code === airport_code
      );
      if (!airport_data) {
        throw new Error(`Unable to find airport code ${airport_code}`);
      }
      console.log(airport_data);
    });
  }
}
