import { Outlet } from "react-router-dom";
import s from "./Profile.module.scss";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu";

export function Profile() {
	return (
		<div className={s.profile}>
			<div className={s["profile-menu"]}>
				<div className={s["profile-menu-container"]}>
					<ProfileMenu />
				</div>
			</div>
			<div className={s["main-section"]}>
				<div className={s["main-section-container"]}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
