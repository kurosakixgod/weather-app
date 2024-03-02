import { useEffect } from "react";
import AddCard from "../addCard/addCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CardWeather from "../CardWeather/CardWeather";
import { WeatherObject } from "../../types/types";
import { weatherDeleted, fetchWeathers } from "../../slices/weatherSlice";
import Spinner from "../../ui/Spinner/Spinner";
import { requestToDB } from "../../service/requests";

import "./CardList.sass";

interface Store {
	weathers: {
		weathers: WeatherObject[];
		weathersLoadingStatus: "idle" | "error" | "loading";
	};
}

const CardList = () => {
	const { weathers, weathersLoadingStatus } = useSelector(
		(state: Store) => state.weathers
	);
	const dispatch = useDispatch<any>();

	const onDelete = (id: string) => {
		requestToDB(`http://localhost:3001/weathers/${id}`, "DELETE")
			.then(() => dispatch(weatherDeleted(id)))
			.catch((err) => console.log(err));
	};

	const renderWeathers = (arr: WeatherObject[]) => {
		const weathersList = arr.map((item: WeatherObject) => {
			return <CardWeather onDelete={onDelete} key={item.id} {...item} />;
		});
		return weathersList;
	};

	useEffect(() => {
		dispatch(fetchWeathers());
	}, []);

	const elements = renderWeathers(weathers);

	if (weathersLoadingStatus === "loading") {
		return <Spinner />;
	} else if (weathersLoadingStatus === "error") return <h2>error</h2>;

	return (
		<div className="cards">
			{elements}
			<AddCard />
		</div>
	);
};

export default CardList;
