import SideMenu from "../components/SideMenu";
import Categories from "./Categories";
import Header from "./Header";
import Home from "./Home";
import "./main.css";
import { useState, useEffect, useRef } from "react";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";

const Main = () => {
	const [active, setActive] = useState(false);
	const [games, setGames] = useState([]);

	const homeRef = useRef();
	const categoriesRef = useRef();
	const libraryRef = useRef();
	const bagRef = useRef();

	const sections = [
		{
			name: "home",
			ref: homeRef,
			active: true,
		},
		{
			name: "categories",
			ref: categoriesRef,
			active: false,
		},
		{
			name: "library",
			ref: libraryRef,
			active: false,
		},
		{
			name: "bag",
			ref: bagRef,
			active: false,
		},
	];

	const handleToggleActive = () => {
		setActive((prev) => !prev);
	};

	const handleSectionActive = (target) => {
		sections.map((section) => {
			section.ref.current.classList.remove("active");
			if (section.ref.current.id === target) {
				section.ref.current.classList.add("active");
			}
			return section;
		});
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
			<SideMenu
				active={active}
				sectionActive={handleSectionActive}
			/>
			<div className={`banner ${active ? "active" : undefined}`}>
				<Header toggleActive={handleToggleActive} />

				<div className="container-fluid">
					<Home
						games={games}
						reference={homeRef}
					/>
					<Categories
						games={games}
						reference={categoriesRef}
					/>
					<MyLibrary
						games={games}
						reference={libraryRef}
					/>
					<Bag
						games={games}
						reference={bagRef}
					/>
				</div>
			</div>
		</main>
	);
};

export default Main;
