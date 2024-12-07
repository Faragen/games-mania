import { createPortal } from "react-dom";
import s from "./SignInButton.module.scss";
import { SignInPage } from "./SignInPage/SignInPage";
import { useAuthModal } from "../../../hooks/useAuthModal";

const authModal = document.getElementById("auth-modal");

export function SignInButton() {
	const { setOpenModal, handleOpenSignIn } = useAuthModal();
	return (
		<>
			{authModal && createPortal(<SignInPage />, authModal)}
			<button
				type='button'
				className={s["sign-in"]}
				onClick={() => handleOpenSignIn(setOpenModal)}
			>
				Sign in
			</button>
		</>
	);
}
