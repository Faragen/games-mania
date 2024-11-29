import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import { SignInButton } from "./SignIn/SignInButton";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
	const { user } = useAuth();
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
				{user ? (
					<div>Profile</div>
				) : (
					<>
						<button className={s["sign-up"]}>Sign up</button>
						<SignInButton />
					</>
				)}
			</div>
		</header>
	);
}
