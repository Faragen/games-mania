import { GamesField } from "./GamesField/GamesField";
import styles from "./Main.module.scss";

export function Main() {
	return (
		<main className={styles.main}>
			<GamesField />
		</main>
	);
}
