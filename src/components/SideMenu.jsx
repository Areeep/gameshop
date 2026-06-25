import NavListItem from "./NavListItem";
import "./sideMenu.css";
import navListData from "../data/navListData";
import { useState } from "react";
import socialListData from "../data/socialListData";

export default function SideMenu() {
	const [navData, setNavData] = useState(navListData);
	return (
		<div className="sideMenu">
			<a
				href="#"
				className="logo"
			>
				<i className="bi bi-controller"></i>
				<span className="brand">Play</span>
			</a>
			<ul className="nav">
				{navData.map((item) => {
					return (
						<NavListItem
							key={item._id}
							item={item}
						/>
					);
				})}
			</ul>

			<ul className="social">
				{socialListData.map((social) => (
					<li key={social.id}>
						<a
							href={social.href}
							className={social.className}
						>
							<i className={`bi ${social.icon}`}></i>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
