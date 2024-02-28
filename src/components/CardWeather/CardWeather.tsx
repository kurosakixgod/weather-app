import { FC } from "react";
import Cross from "../../ui/icons/Cross";
import { WeatherObject } from "../types/types";

interface DataFromProps extends WeatherObject {
	onDelete: (id: number) => void;
}

const CardWeather: FC<DataFromProps> = ({
	cityName,
	temperature,
	windSpeed,
	id,
	onDelete,
}) => {
	return (
		<div className="card">
			<h1>Add new location</h1>
			<Cross onDelete={onDelete} id={id} />
		</div>
	);
};

export default CardWeather;
