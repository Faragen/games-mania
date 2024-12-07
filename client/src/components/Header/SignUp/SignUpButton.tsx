import { createPortal } from "react-dom";
import s from "./SignUpButton.module.scss";
import { SignUpPage } from "./SignUpPage/SignUpPage";
import { useRegistModal } from "../../../hooks/useRegistModal";

const authModal = document.getElementById("auth-modal");

export function SignUpButton() {
	const { setRegistOpenModal, handleOpenSignUp } = useRegistModal();
	return (
		<>
			{authModal && createPortal(<SignUpPage />, authModal)}
			<button
				type='button'
				className={s["sign-up"]}
				onClick={() => handleOpenSignUp(setRegistOpenModal)}
			>
				Sign up
			</button>
		</>
	);
}
