import {
	NavLink,
	NavLinkRenderProps,
	useMatch,
	useNavigate,
} from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import s from "./ProfileMenu.module.scss";
import { URL } from "../../GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";

const setActive = ({ isActive }: NavLinkRenderProps) =>
	isActive ? s.active : "";

export function ProfileMenu() {
	const { user, setUser } = useAuth();
	const isProfilePage = useMatch("/profile/*");
	const navigate = useNavigate();

	async function handleLogout() {
		const res = await fetch(URL + "/api/logout", {
			method: "POST",
			credentials: "include",
		});
		if (res.ok) {
			setUser(null);
			console.log(await res.text());
		} else {
			throw Error("logout has failed");
		}
		if (isProfilePage) {
			navigate("/", { replace: true });
		}
	}

	return (
		<>
			<div className={s.portrait}>
				<img src={user?.userAvatar} alt='user avatar' />
			</div>
			<hr className={s.line} />
			<div className={s["profile-routes"]}>
				<ul>
					<li>
						<NavLink to='user-info' className={setActive}>
							user info
						</NavLink>
						<span>{">"}</span>
					</li>
					<li>
						<NavLink to='change-password' className={setActive}>
							change password
						</NavLink>
						<span>{">"}</span>
					</li>
					<li>
						<button type='button' onClick={() => handleLogout()}>
							logout
						</button>
						<span>{">"}</span>
					</li>
				</ul>
			</div>
		</>
	);
}
