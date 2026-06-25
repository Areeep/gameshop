import SideMenu from "../components/SideMenu";
import Header from "./Header";
import Home from "./Home";
import "./main.css";
import { useState, useEffect } from "react";

const Main = () => {
	const [active, setActive] = useState(false);
	const [games, setGames] = useState([]);

	const handleToggleActive = () => {
		setActive((prev) => !prev);
	};

	const fetchData = () => {
		fetch("/api/gamesData.json")
			.then((res) => res.json())
			.then((data) => {
				setGames(data);
			})
			.catch((e) => console.log(e.message));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<SideMenu active={active} />
			<div className={`banner ${active ? "active" : undefined}`}>
				<Header toggleActive={handleToggleActive} />

				<div className="container-fluid">
					<Home games={games} />
				</div>
			</div>
		</main>
	);
};

export default Main;
