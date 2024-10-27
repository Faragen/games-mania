import s from "./GamesField.module.scss";
import { useOutlet } from "react-router-dom";

export function GamesField() {
	return (
		<section className={s["game-field"]}>
			{useOutlet() || (
				<h2 className={s["choose-game"]}>choose your game above</h2>
			)}
		</section>
	);
}
