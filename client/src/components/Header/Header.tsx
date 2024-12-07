import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";
import s from "./Header.module.scss";
import { SignInButton } from "./SignIn/SignInButton";
import { useAuth } from "../../hooks/useAuth";
import { ProfileMenuBtn } from "./ProfileMenuBtn/ProfileMenuBtn";
import { SignUpButton } from "./SignUp/SignUpButton";

const setActive = ({ isActive }: NavLinkRenderProps) =>
	isActive ? s.active : "";

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
						<NavLink to='match-the-set' className={setActive}>
							Match The Set
						</NavLink>
					</li>
					<li>
						<NavLink to='placeholder#' className={setActive}>
							Game2
						</NavLink>
					</li>
					<li>
						<NavLink to='placeholder#' className={setActive}>
							Game3
						</NavLink>
					</li>
					<li>
						<NavLink to='placeholder#' className={setActive}>
							Game4
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className={s.auth}>
				{user ? (
					<ProfileMenuBtn />
				) : (
					<>
						<SignUpButton />
						<SignInButton />
					</>
				)}
			</div>
		</header>
	);
}
