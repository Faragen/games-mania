import { GameBoard } from "./GameBoard/GameBoard";
import styles from "./GamesField.module.scss";
import { RatingBar } from "./RatingBar/RatingBar";
import { ToolsBar } from "./ToolsBar/ToolsBar";

export function GamesField() {
	return (
		<section className={styles["game-field"]}>
			<RatingBar />
			<GameBoard />
			<ToolsBar />
		</section>
	);
}
