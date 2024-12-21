import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import s from "./SignInPage.module.scss";
import { URL } from "../../../Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { useCallback, useRef, useState } from "react";
import { useAuthModal } from "../../../../hooks/useAuthModal";

interface ISignInForm {
	username: string;
	password: string;
}

export function SignInPage() {
	const [serverError, setServerError] = useState<string | null>(null);
	const { register, handleSubmit, formState } = useForm<ISignInForm>({
		mode: "onSubmit",
	});
	const backdropRef = useRef<HTMLDialogElement | null>(null);
	const { setUser } = useAuth();
	const { openModal, setOpenModal, handleCloseSignIn } = useAuthModal();

	const onSubmit: SubmitHandler<ISignInForm> = useCallback(async (data) => {
		const res = await fetch(URL + "/api/login", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			console.log(await res.text());

			setServerError(null);
			const profile = await fetch(URL + "/api/profile", {
				method: "POST",
				credentials: "include",
				body: JSON.stringify({ username: data.username }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (profile.ok) {
				const { username, userId, userAvatar, email } = await profile.json();
				setUser({
					username,
					userId,
					userAvatar,
					email,
				});
				return handleCloseSignIn(setOpenModal);
			}
			setUser(null);
			return setServerError(await profile.text());
		}
		setUser(null);
		setServerError(await res.text());
	}, []);

	const usernameError = formState.errors.username?.message;
	const passwordError = formState.errors.password?.message;

	return (
		<dialog
			open={openModal}
			className={s["backdrop"]}
			ref={backdropRef}
			onClick={(e) => {
				e.target === backdropRef.current && handleCloseSignIn(setOpenModal);
			}}
		>
			<form className={s["signin-window"]} onSubmit={handleSubmit(onSubmit)}>
				<h3 className={s.title}>Sign In</h3>
				{serverError && <p className={s.error}>{serverError}</p>}
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					{...register("username", { required: "This field is required" })}
				/>
				{usernameError && <p className={s.error}>{usernameError}</p>}
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					{...register("password", { required: "Enter the password" })}
				/>
				{passwordError && <p className={s.error}>{passwordError}</p>}
				<button type='submit' className={s.submit}>
					Log In
				</button>
				<button
					type='button'
					className={s["close-window"]}
					onClick={() => handleCloseSignIn(setOpenModal)}
				>
					X
				</button>
			</form>
		</dialog>
	);
}
