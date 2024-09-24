import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.hearder}>
			<div className={styles.logo}>
				<a href='#'>LoGo</a>
			</div>
			<nav className={styles.menu}>
				<a href='#'>MENU1</a>
				<a href='#'>MENU2</a>
				<a href='#'>MENU3</a>
				<a href='#'>MENU4</a>
			</nav>
			<div className={styles.playBtn}>
				<button>Play!</button>
			</div>
		</header>
	);
}
