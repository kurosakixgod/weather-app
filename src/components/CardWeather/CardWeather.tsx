import { FC } from "react";
import CrossIcon from "../../ui/icons/CrossIcon";
import { WeatherObject } from "../../types/types";
import CelsiumIcon from "../../ui/icons/Celsium";
import { Positinos } from "../../types/types";
import WindIcon from "../../ui/icons/WindIcon";
import "./CardWeather.sass";

interface DataFromProps extends WeatherObject {
	onDelete: (id: string) => void;
}

const CardWeather: FC<DataFromProps> = ({
	cityName,
	temperature,
	windSpeed,
	id,
	onDelete,
}) => {
	const visibleTempetature = Math.floor(temperature - 273);
	const date = new Date();
	const timeObj = {
		hours: date.getHours(),
		minutes: date.getMinutes(),
	};
	return (
		<div className="card">
			<h1 style={{ fontSize: "30px" }}>{cityName}</h1>
			<h2
				style={{
					position: Positinos.Absolute,
					left: "15px",
					top: "0px",
					color: "aliceblue",
				}}
			>
				{timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours}:
				{timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes}
			</h2>
			<div
				style={{
					color: "white",
					fontSize: "80px",
					position: "relative",
				}}
			>
				{visibleTempetature}
				<CelsiumIcon
					style={{
						position: Positinos.Absolute,
						top: 0,
						right: "-40px",
					}}
				/>
			</div>
			<div style={{ display: "flex", gap: "20px" }}>
				<WindIcon />
				<div
					style={{
						fontSize: "30px",
						color: "white",
						textAlign: "center",
					}}
				>{`${windSpeed} km/h`}</div>
			</div>
			<CrossIcon onDelete={onDelete} id={id} className="cross" />
		</div>
	);
};

export default CardWeather;
