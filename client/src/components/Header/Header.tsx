import s from "./Header.module.scss";

export function Header() {
	return (
		<header className={s.hearder}>
			<div className={s.logo}>
				<a href='#'>LoGo</a>
			</div>
			<nav className={s.menu}>
				<ul>
					<li>
						<a href='#'>Match The Set</a>
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
			<div className={s.auth}>
				<button className={s["sign-up"]}>Sign up</button>
				<button className={s["sign-in"]}>Sign in</button>
			</div>
		</header>
	);
}
