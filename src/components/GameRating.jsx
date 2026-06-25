
import "./gameRating.css";

export default function GameRating({ rating }) {
	const stars = Array.from(
		{ length: Math.max(0, Math.min(rating, 5)) },
		(_, i) => i,
	);

  return (
		<div className="gameRating">
			{stars.map((star) => (
				<i
					key={star}
					className="bi bi-star-fill"
				/>
			))}
		</div>
	);
}
