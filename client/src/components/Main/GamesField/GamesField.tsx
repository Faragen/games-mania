import s from "./GamesField.module.scss";
import { Outlet } from "react-router-dom";

export function GamesField() {
	return (
		<section className={s["game-field"]}>
			<Outlet />
		</section>
	);
}
