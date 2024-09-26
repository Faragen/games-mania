import styles from "./GameBoard.module.scss";
import { MatchTheSet } from "./MatchTheSet/MatchTheSet";

export function GameBoard() {
	return (
		<div className={styles["game-board"]}>
			<MatchTheSet />
		</div>
	);
}
