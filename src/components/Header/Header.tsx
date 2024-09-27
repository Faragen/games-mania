import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.hearder}>
			<div className={styles.logo}>
				<a href='#'>LoGo</a>
			</div>
			<nav className={styles.menu}>
				<ul>
					<li>
						<a href='#'>Matching Pairs</a>
					</li>
					<li>
						<a href='#'>Game2</a>
					</li>
					<li>
						<a href='#'>Game3</a>
					</li>
					<li>
						<a href='#'>Game4</a>
					</li>
				</ul>
			</nav>
			<div className={styles.auth}>
				<button className={styles["sign-up"]}>Sign up</button>
				<button className={styles["sign-in"]}>Sign in</button>
			</div>
		</header>
	);
}
