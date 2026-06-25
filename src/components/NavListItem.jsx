export default function NavListItem({ item, navOnClick }) {
	return (
		<li>
			<a
				href="#"
				onClick={() => navOnClick(item._id)}
				className={`${item.active ? "active" : ""}`}
			>
				<i className={`bi ${item.icon}`}></i>
				<span className="navName">{item.name}</span>
			</a>
		</li>
	);
}
