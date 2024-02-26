import { FC } from "react";
import CardList from "../CardList/CardList";

import "./App.sass";

const App: FC = () => {
	return (
		<div className="app">
			<CardList />
		</div>
	);
};

export default App;
