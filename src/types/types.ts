export interface WeatherObject {
	temperature: number;
	windSpeed: number;
	cityName: string;
	id: string;
}

export enum Positinos {
	Absolute = "absolute",
	Relative = "relative",
}
