import { Link, useMatch, useNavigate } from "react-router-dom";
import s from "./ProfileMenuBtn.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { URL } from "../../Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";

export function ProfileMenuBtn() {
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
			<div className={s.profile}>
				<div className={s["profile-icon"]}>
					<Link to='/profile'>
						<img src={user?.userAvatar} alt='Avatar' />
					</Link>
				</div>
				<div className={s["sub-menu"]}>
					<div className={s.container}>
						<div className={s.avatar}>
							<img src={user?.userAvatar} alt='Avatar' />{" "}
							<p>{user?.username}</p>
						</div>
						<hr />
						<ul>
							<li>
								<Link to='/profile' className={s["sub-menu-option"]}>
									<p>profile</p> <span>{">"}</span>
								</Link>
							</li>
							<li>
								<button
									type='button'
									className={s["sub-menu-option"]}
									onClick={() => handleLogout()}
								>
									<p>logout</p> <span>{">"}</span>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
