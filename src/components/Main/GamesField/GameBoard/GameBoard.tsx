import styles from "./GameBoard.module.scss";
import { MatchingPairs } from "./MatchingPairs/MatchingPairs";

export function GameBoard() {
	return (
		<div className={styles["game-board"]}>
			<MatchingPairs />
		</div>
	);
}
