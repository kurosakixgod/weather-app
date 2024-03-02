import { FC, useState, ChangeEvent, useRef } from "react";
import "./addCard.sass";
import PlusIcon from "../../ui/icons/PlusIcon";
import { requestToApi, requestToDB } from "../../service/requests";
import { useDispatch } from "react-redux";
import { weatherCreated } from "../../slices/weatherSlice";
import { v4 as idV4 } from "uuid";
import TrashIcon from "../../ui/icons/TrashIcon";

const AddCard: FC = () => {
	const [location, setLocaiton] = useState("");
	const inputCityName = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocaiton(e.target.value);
	};

	const clearInput = () => {
		setLocaiton("");
		inputCityName.current?.classList.remove("error");
	};

	const onSubmit = (): void => {
		if (location.trim()) {
			requestToApi(location)
				.then((data) => {
					const newWeatherObj = {
						temperature: data.main.temp ?? "unknown",
						cityName: location,
						id: idV4(),
						windSpeed: data.wind.speed ?? "unknown",
					};
					requestToDB(
						"http://localhost:3001/weathers",
						"POST",
						JSON.stringify(newWeatherObj)
					)
						.then(() => dispatch(weatherCreated(newWeatherObj)))
						.then(clearInput);
				})
				.catch(() => {
					inputCityName.current?.classList.add("error");
					setLocaiton(`City not found`);
				});
			setLocaiton("");
		} else clearInput();
	};
	return (
		<div className="card">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
			>
				<input
					style={{ width: "85%" }}
					ref={inputCityName}
					value={location}
					onChange={onChange}
					className="input"
					type="text"
					placeholder="Enter location"
				/>
				<TrashIcon onCLearInput={clearInput} className="trash" />
			</div>
			<button onClick={onSubmit} className="btn">
				<PlusIcon />
			</button>
			<h1>Add new location</h1>
		</div>
	);
};

export default AddCard;
