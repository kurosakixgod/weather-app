import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum FetchingStatuses {
	Fetching = "loading",
	FetchingError = "error",
	Fetched = "idle",
}

interface WeatherObject {
	temperature: number;
	windSpeed: number;
	cityName: string;
	id: string | number;
}

interface InitialState {
	weathers: WeatherObject[];
	weathersLoadingStatus: FetchingStatuses;
}

const initialState: InitialState = {
	weathers: [],
	weathersLoadingStatus: FetchingStatuses.Fetched,
};

const weatherSlice = createSlice({
	name: "weathers",
	initialState,
	reducers: {
		weathersFetching: (state): void => {
			state.weathersLoadingStatus = FetchingStatuses.Fetching;
		},
		weathersFethingError: (state): void => {
			state.weathersLoadingStatus = FetchingStatuses.FetchingError;
		},
		weathersFetched: (state, action): void => {
			state.weathersLoadingStatus = FetchingStatuses.Fetched;
			state.weathers = action.payload;
		},
		weatherCreated: (state, action: PayloadAction<WeatherObject>): void => {
			state.weathers.push(action.payload);
		},
		weatherDeleted: (state, action) => {
			state.weathers = state.weathers.filter((weather) => weather.id !== action.payload);
		},
	},
});

const { actions, reducer } = weatherSlice;

export const {
	weatherCreated,
	weatherDeleted,
	weathersFetched,
	weathersFetching,
	weathersFethingError,
} = actions;

export default reducer;
