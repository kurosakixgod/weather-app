import { FC } from "react";
import Cross from "../../ui/icons/Cross";
import { WeatherObject } from "../types/types";
import CelsiumIcon from "../../ui/icons/Celsium";
import WindIcon from "../../ui/icons/WindIcon";


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

	const visibleTempetature = Math.floor(temperature - 273)


	return (
		<div className="card">
			<h1 style={{fontSize: '30px'}}>{cityName}</h1>
			<div style={{color: 'white', fontSize: '80px', position: 'relative'}}>{visibleTempetature} <CelsiumIcon/></div>
			<div style={{display: 'flex', justifyContent: 'center'}}> 
				<CelsiumIcon/>
				<div style={{fontSize:'24px', color: 'white'}}>{`${windSpeed} km/h`}</div>
			</div>
			<Cross onDelete={onDelete} id={id} />
		</div>
	);
};

export default CardWeather;
