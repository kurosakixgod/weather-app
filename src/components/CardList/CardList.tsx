import { useEffect } from "react";
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

	const onDelete = (id: string) => {
	
		requestToDB(`http://localhost:3001/weathers/${id}`, "DELETE")
			.then(() => console.log("deleted"))
			.then(() => dispatch(weatherDeleted(id)))
			.catch((err) => console.log(`Привет ${err}`));
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

	if (weathersLoadingStatus === 'loading') {
		return <h2>loading...</h2>
	} else if(weathersLoadingStatus === 'error') return <h2>error</h2>



	return (
		<div className="cards">
			{elements}
			<AddCard />
		</div>
	);
};

export default CardList;
