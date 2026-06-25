import "./categories.css";

export default function Categories({ game, reference }) {
	return (
		<section
			id="categories"
			className="categories"
			ref={reference}
		>
			<h1>Categories</h1>
		</section>
	);
}
