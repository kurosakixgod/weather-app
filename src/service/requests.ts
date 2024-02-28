export const requestToApi = async (cityName: string) => {
	const _apiKey: string = "7a9c18f8fe80f1e481851b70f41615be";
	const mainUrl: string = "https://api.openweathermap.org/data/2.5/weather";
	const url: string = `${mainUrl}?q=${cityName}&appid=${_apiKey}`;
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

export const requestToDB = async (
	url: string,
	method: string = "GET",
	body: null | string = null,
	headers = { "Content-Type": "application/json" }
) => {
	try {
		const respose = await fetch(url, { method, body, headers });

		if (!respose.ok) {
			throw new Error(
				`Could not fetch ${url}, status: ${respose.status}`
			);
		}

		const data = await respose.json();
		return data;
	} catch (e) {
		throw e;
	}
};
