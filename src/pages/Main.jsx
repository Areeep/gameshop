import SideMenu from "../components/SideMenu";
import Header from "./Header";
import "./main.css";
import { useState } from "react";

const Main = () => {
	const [active, setActive] = useState(false);

	const handleToggleActive = () => {
		setActive((prev) => !prev);
	};

	return (
		<main>
			<SideMenu active={active} />
			<div className={`banner ${active ? "active" : undefined}`}>
				<Header toggleActive={handleToggleActive} />
			</div>
		</main>
	);
};

export default Main;
