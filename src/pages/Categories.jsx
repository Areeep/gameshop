import "./categories.css";
import filterListData from "../data/filterListData";
import { useState } from "react";
import GameCard from "./../components/GameCard";
import {
	SORT_OPTIONS,
	chunkGames,
	countByCategory,
	sortGames,
} from "../utils/gameUtils";

export default function Categories({ games, reference }) {
	const [data, setData] = useState(games);

	const [filters, setFilters] = useState(filterListData);

	const handleFilterGames = (category) => {
		setFilters(
			filters.map((filter) => {
				filter.active = false;
				if (filter.name === category) filter.active = true;

				return filter;
			}),
		);

		if (category === "All") {
			setData(games);
			return;
		}

		setData(games.filter((game) => game.category === category));
	};

	const [text, setText] = useState("");
	const [sortKey, setSortKey] = useState("default");

	const categoryCounts = countByCategory(games);
	const gameRows = chunkGames(sortGames(data, sortKey));

	const handleSearchGames = (e) => {
		setData(
			games.filter((game) =>
				game.title.toLowerCase().includes(e.target.value.toLowerCase()),
			),
		);
		setText(e.target.value);
	};

	return (
		<section
			id="categories"
			className="categories"
			ref={reference}
		>
			<div className="container-fluid mt-2">
				<div className="row">
					<div className="col-lg-8 d-flex align-items-center justify-content-start">
						<ul className="filters">
							{filters.map((filter) => (
								<li
									key={filter._id}
									filter={`${filter.active ? "active" : ""}`}
									onClick={() => handleFilterGames(filter.name)}
								>
									{filter.name}
									{filter.name !== "All" && (
										<small> ({categoryCounts[filter.name] ?? 0})</small>
									)}
								</li>
							))}
						</ul>
					</div>
					<div className="col-lg-4 d-flex align-items-center justify-content-end">
						<select
							className="form-select sortSelect me-3"
							value={sortKey}
							onChange={(e) => setSortKey(e.target.value)}
							aria-label="Sort games"
						>
							{SORT_OPTIONS.map((option) => (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							))}
						</select>
						<div className="search">
							<i className="bi bi-search"></i>
							<input
								type="text"
								name="search"
								value={text}
								placeholder="Search"
								onChange={handleSearchGames}
							/>
						</div>
					</div>
				</div>

				{gameRows.map((row, rowIndex) => (
					<div
						className="row"
						key={rowIndex}
					>
						{row.map((game) => (
							<GameCard
								key={game._id}
								game={game}
							/>
						))}
					</div>
				))}
			</div>
		</section>
	);
}
