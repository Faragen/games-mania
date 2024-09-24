import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.hearder}>
			<div className={styles.logo}>
				<a href='#'>LoGo</a>
			</div>
			<nav className={styles.menu}>
				<a href='#'>Matching Pairs</a>
				<a href='#'>Game2</a>
				<a href='#'>Game3</a>
				<a href='#'>Game4</a>
			</nav>
			<div className={styles.auth}>
				<button className={styles["sign-up"]}>Sign up</button>
				<button className={styles["sign-in"]}>Sign in</button>
			</div>
		</header>
	);
}
