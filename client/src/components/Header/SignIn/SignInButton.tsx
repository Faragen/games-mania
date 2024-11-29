import { createPortal } from "react-dom";
import s from "./SignInButton.module.scss";
import { SignInPage } from "./SignInPage/SignInPage";
import { useState } from "react";

const authModal = document.getElementById("auth-modal");
const root = document.getElementById("root")!;

function handleOpenSignIn(
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
) {
	setOpenModal((prev) => {
		if (!prev) {
			root.style.top = `-${window.scrollY}px`;
			root.style.position = "fixed";
			return !prev;
		}
		root.style.position = "";
		window.scrollTo(0, -parseInt(getComputedStyle(document.body).top));
		root.style.top = "";

		return !prev;
	});
}

export function SignInButton() {
	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<>
			{authModal &&
				createPortal(
					<SignInPage {...{ openModal, setOpenModal, handleOpenSignIn }} />,
					authModal
				)}
			<button
				className={s["sign-in"]}
				onClick={() => handleOpenSignIn(setOpenModal)}
			>
				Sign in
			</button>
		</>
	);
}
