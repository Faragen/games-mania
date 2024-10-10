import styles from "./GameCard.module.scss";
import React, { memo } from "react";
import { Card } from "../../../../../../store/store";

interface IProps {
	card: Card;
	handleFlip: (id: string) => void;
}

function GameCard({ card, handleFlip }: IProps) {
	// console.log("render child");

	return (
		<button
			className={[
				styles["game-card"],
				card.isFlipped ? styles.flipped : "",
			].join(" ")}
			onClick={() => handleFlip(card.id)}
		>
			<div
				className={styles.front}
				style={{ "--cardImg": `url(${card.imageURL})` } as React.CSSProperties}
			></div>
			<div className={styles.back}>
				<span>Match</span>
				<span>The</span>
				<span>Set</span>
			</div>
		</button>
	);
}

export default memo(
	GameCard,
	(prevProps, nextProps) =>
		prevProps.card.isFlipped === nextProps.card.isFlipped
);
