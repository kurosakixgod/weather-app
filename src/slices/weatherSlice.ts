import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestToDB } from "../service/requests";
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

export const fetchWeathers = createAsyncThunk("weathers/fetchWeathers", () => {
	return requestToDB("http://localhost:3001/weathers");
});

const initialState: InitialState = {
	weathers: [],
	weathersLoadingStatus: FetchingStatuses.Fetched,
};

const weatherSlice = createSlice({
	name: "weathers",
	initialState,
	reducers: {
		weatherCreated: (state, action: PayloadAction<WeatherObject>): void => {
			state.weathers.push(action.payload);
		},
		weatherDeleted: (state, action) => {
			state.weathers = state.weathers.filter(
				(weather) => weather.id !== action.payload
			);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchWeathers.pending, (state): void => {
				state.weathersLoadingStatus = FetchingStatuses.Fetching;
			})
			.addCase(fetchWeathers.rejected, (state): void => {
				state.weathersLoadingStatus = FetchingStatuses.FetchingError;
			})
			.addCase(fetchWeathers.fulfilled, (state, action): void => {
				state.weathersLoadingStatus = FetchingStatuses.Fetched;
				state.weathers = action.payload;
			});
	},
});

const { actions, reducer } = weatherSlice;

export const { weatherCreated, weatherDeleted } = actions;
export default reducer;
