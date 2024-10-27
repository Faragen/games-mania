import { Link } from "react-router-dom";
import s from "./Header.module.scss";

export function Header() {
	return (
		<header className={s.hearder}>
			<div className={s.logo}>
				<Link to='/'>LoGo</Link>
			</div>
			<nav className={s.menu}>
				<ul>
					<li>
						<Link to='match-the-set'>Match The Set</Link>
					</li>
					<li>
						<Link to='#'>Game2</Link>
					</li>
					<li>
						<Link to='#'>Game3</Link>
					</li>
					<li>
						<Link to='#'>Game4</Link>
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
