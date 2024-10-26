import s from "./GameBoard.module.scss";
import { BoardMTS } from "./BoardMTS/BoardMTS";

export function GameBoard() {
	return (
		<div className={s["game-board"]}>
			<BoardMTS />
		</div>
	);
}
