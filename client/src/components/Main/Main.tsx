import { GamesField } from "./GamesField/GamesField";
import s from "./Main.module.scss";

export function Main() {
	return (
		<main className={s.main}>
			<GamesField />
		</main>
	);
}
