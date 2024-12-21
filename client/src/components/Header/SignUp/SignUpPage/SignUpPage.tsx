import { type SubmitHandler, useForm } from "react-hook-form";
import s from "./SignUpPage.module.scss";
import { URL } from "../../../Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { useCallback, useRef, useState } from "react";
import { useRegistModal } from "../../../../hooks/useRegistModal";

interface ISignInForm {
	email: string;
	username: string;
	password: string;
	passwordConfirm: string;
}

export function SignUpPage() {
	const [serverError, setServerError] = useState<string | null>(null);
	const { register, handleSubmit, formState, watch } = useForm<ISignInForm>({
		mode: "onSubmit",
	});
	const { openRegistModal, setRegistOpenModal, handleCloseSignUp } =
		useRegistModal();

	const backdropRef = useRef<HTMLDialogElement | null>(null);

	const onSubmit: SubmitHandler<ISignInForm> = useCallback(async (data) => {
		const registData = {
			username: data.username,
			email: data.email,
			password: data.password,
		};
		const res = await fetch(URL + "/api/registration", {
			method: "POST",
			body: JSON.stringify(registData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			console.log(await res.text());
			setServerError(null);
			return;
		}
		setServerError(await res.text());
	}, []);

	const usernameError = formState.errors.username?.message;
	const passwordError = formState.errors.password?.message;
	const emailError = formState.errors.email?.message;
	const confirmPasswordsError = formState.errors.passwordConfirm?.message;

	return (
		<dialog
			open={openRegistModal}
			className={s["backdrop"]}
			ref={backdropRef}
			onClick={(e) =>
				e.target === backdropRef.current &&
				handleCloseSignUp(setRegistOpenModal)
			}
		>
			<form className={s["signin-window"]} onSubmit={handleSubmit(onSubmit)}>
				<h3 className={s.title}>Sign Up</h3>
				{serverError && <p className={s.error}>{serverError}</p>}
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Incorrect email",
						},
					})}
				/>
				{emailError && <p className={s.error}>{emailError}</p>}
				<label htmlFor='register-username'>Username</label>
				<input
					type='text'
					id='register-username'
					{...register("username", { required: "This field is required" })}
				/>
				{usernameError && <p className={s.error}>{usernameError}</p>}
				<label htmlFor='register-password'>Password</label>
				<input
					type='password'
					id='register-password'
					{...register("password", {
						required: "This field is required",
						pattern: {
							value:
								/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								"Password must be at least 8 characters long and include at least one letter, one number, and one special character",
						},
					})}
				/>
				{passwordError && <p className={s.error}>{passwordError}</p>}
				<label htmlFor='register-password-confirm'>Confirm password</label>
				<input
					type='password'
					id='register-password-confirm'
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === watch("password") || "Passwords do not match",
					})}
				/>
				{confirmPasswordsError && (
					<p className={s.error}>{confirmPasswordsError}</p>
				)}
				<button type='submit' className={s.submit}>
					Sign In
				</button>
				<button
					type='button'
					className={s["close-window"]}
					onClick={() => handleCloseSignUp(setRegistOpenModal)}
				>
					X
				</button>
			</form>
		</dialog>
	);
}
