import { GameBoard } from "./GameBoard/GameBoard";
import s from "./GamesField.module.scss";
import { RatingBar } from "./RatingBar/RatingBar";
import { ToolsBar } from "./ToolsBar/ToolsBar";

export function GamesField() {
	return (
		<section className={s["game-field"]}>
			<RatingBar />
			<GameBoard />
			<ToolsBar />
		</section>
	);
}
