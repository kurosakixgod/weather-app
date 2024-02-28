import { MouseEvent, useEffect } from "react";
import AddCard from "../addCard/addCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CardWeather from "../CardWeather/CardWeather";
import { WeatherObject } from "../types/types";
import {
	weatherDeleted,
	weathersFetched,
	weathersFetching,
	weathersFethingError,
} from "../../slices/weatherSlice";
import { requestToDB } from "../../service/requests";
import "./CardList.sass";

const CardList = () => {
	const { weathers, weathersLoadingStatus } = useSelector(
		(state: any) => state.weathers
	);
	const dispatch = useDispatch();

	const onDelete = (id: number) => {
		console.log("deleted");

		requestToDB(`http://localhost:3001/weathers/${id}`, "DELETE")
			.then(() => dispatch(weatherDeleted(id)))
			.catch((err) => console.log(err));
	};

	const renderWeathers = (arr: []) => {
		const weathersList = arr.map((item: WeatherObject) => {
			return <CardWeather onDelete={onDelete} key={item.id} {...item} />;
		});
		return weathersList;
	};

	useEffect(() => {
		dispatch(weathersFetching());
		requestToDB("http://localhost:3001/weathers")
			.then((data) => dispatch(weathersFetched(data)))
			.catch(() => dispatch(weathersFethingError()));
	}, []);

	const elements = renderWeathers(weathers);

	return (
		<div className="cards">
			{elements}
			<AddCard />
		</div>
	);
};

export default CardList;
