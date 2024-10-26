import s from "./ToolsBar.module.scss";
import { ToolsMTS } from "./ToolsMTS/ToolsMTS";

export function ToolsBar() {
	return (
		<aside className={s["tools-bar"]}>
			<h2 className={s["tools-title"]}>Match The Set</h2>
			<ToolsMTS />
		</aside>
	);
}
