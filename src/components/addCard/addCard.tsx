import { FC, useState, ChangeEvent } from "react";
import "./addCard.sass";
import Plus from "../../ui/icons/plus";
const AddCard: FC = () => {
	const [location, setLocaiton] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setLocaiton(e.target.value);
	};

	const onSubmit = (): void => {
		console.log(location);
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
