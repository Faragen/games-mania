import styles from "./GameCard.module.scss";
import React, { useState } from "react";
import { Card } from "../../../../../../store/store";

type props = {
	card: Card;
};

export function GameCard({ card }: props) {
	const [flipped, setFlipped] = useState(false);
	return (
		<button
			key={card.id}
			className={[styles["game-card"], flipped ? styles.flipped : ""].join(" ")}
			onClick={() => setFlipped((prev) => !prev)}
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
