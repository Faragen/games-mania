import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import s from "./SignInPage.module.scss";
import { URL } from "../../../Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { useState } from "react";

interface ISignInForm {
	username: "string";
	password: "string";
}

export function SignInPage<T = React.Dispatch<React.SetStateAction<boolean>>>({
	openModal,
	setOpenModal,
	handleOpenSignIn,
}: {
	openModal: boolean;
	setOpenModal: T;
	handleOpenSignIn: (setOpenModal: T) => void;
}) {
	const [serverError, setServerError] = useState<string | null>(null);
	const { register, handleSubmit, formState } = useForm<ISignInForm>({
		mode: "onSubmit",
	});
	const { setUser } = useAuth();
	const onSubmit: SubmitHandler<ISignInForm> = async (data: any) => {
		const res = await fetch(URL + "/api/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			setServerError(null);
			return setUser({ username: data.username && null });
		}
		setUser(null);
		setServerError(await res.text());
	};

	const usernameError = formState.errors.username?.message;
	const passwordError = formState.errors.password?.message;

	return (
		<dialog open={openModal} className={s["backdrop"]}>
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
					onClick={() => handleOpenSignIn(setOpenModal)}
				>
					X
				</button>
			</form>
		</dialog>
	);
}
