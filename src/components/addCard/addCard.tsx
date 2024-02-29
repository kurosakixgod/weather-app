import { FC, useState, ChangeEvent } from "react";
import "./addCard.sass";
import Plus from "../../ui/icons/plus";
import { requestToApi, requestToDB } from "../../service/requests";
import { useDispatch } from "react-redux";
import { weatherCreated } from "../../slices/weatherSlice";
import { v4 as idV4} from "uuid";


const AddCard: FC = () => {
	const [location, setLocaiton] = useState("");
	const dispatch = useDispatch();
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocaiton(e.target.value);
	};

	const onSubmit = (): void => {
		requestToApi(location).then((data) => {
			console.log(data);
			const newWeatherObj = {
				temperature: data.main.temp ?? "unknown",
				cityName: data.name ?? "unknown",
				id: idV4(),
				windSpeed: data.wind.speed ?? "unknown",
			};
			requestToDB(
				"http://localhost:3001/weathers",
				"POST",
				JSON.stringify(newWeatherObj)
			).then(() => dispatch(weatherCreated(newWeatherObj)));
		});
	};
	return (
		<div className="card">
			<input
				onChange={onChange}
				className="input"
				type="text"
				placeholder="Enter location name"
			/>
			<button onClick={onSubmit} className="btn">
				<Plus />
			</button>
			<h1>Add new location</h1>
		</div>
	);
};

export default AddCard;
