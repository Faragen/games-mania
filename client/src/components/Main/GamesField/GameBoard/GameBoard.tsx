import s from "./GameBoard.module.scss";
import { MatchTheSet } from "./MatchTheSet/MatchTheSet";

export function GameBoard() {
	return (
		<div className={s["game-board"]}>
			<MatchTheSet />
		</div>
	);
}
