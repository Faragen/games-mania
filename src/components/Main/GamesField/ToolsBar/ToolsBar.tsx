import styles from "./ToolsBar.module.scss";
import { ToolsMTS } from "./MatchTheSet/ToolsMTS";

export function ToolsBar() {
	return (
		<aside className={styles["tools-bar"]}>
			<h2 className={styles["tools-title"]}>Match The Set</h2>
			<ToolsMTS />
		</aside>
	);
}
