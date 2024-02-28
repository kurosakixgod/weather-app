import { configureStore, Middleware } from "@reduxjs/toolkit";
import weathers from "../slices/weatherSlice";

const stringMiddleware: Middleware = (store) => (next) => (action) => {
	if (typeof action === "string") {
		return next({
			type: action,
		});
	}
	return next(action);
};

const store = configureStore({
	reducer: {
		weathers,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
