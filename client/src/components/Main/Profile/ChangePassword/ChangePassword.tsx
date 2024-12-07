import { SubmitHandler, useForm } from "react-hook-form";
import s from "./ChangePassword.module.scss";
import { useState } from "react";
import { URL } from "../../GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { useAuth } from "../../../../hooks/useAuth";

interface IChangePasswordForm {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export function ChangePassword() {
	const { user } = useAuth();
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const [serverError, setServerError] = useState<string | null>(null);
	const { register, handleSubmit, formState, watch } =
		useForm<IChangePasswordForm>({ mode: "onSubmit" });

	const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
		const res = await fetch(URL + "/api/change-password", {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: user?.username,
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
			}),
		});
		if (!res.ok) {
			setServerMessage(null);
			setServerError(await res.text());
			return;
		}
		setServerError(null);
		setServerMessage(await res.text());
	};

	const currentPassword = formState.errors.currentPassword?.message;
	const newPasswordError = formState.errors.newPassword?.message;
	const confirmPassword = formState.errors.confirmPassword?.message;

	return (
		<div className={s["change-password"]}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{serverMessage && <p className={s["form-message"]}>{serverMessage}</p>}
				{serverError && <p className={s.error}>{serverError}</p>}
				<div className={s.field}>
					<label htmlFor='current-password'>Current password:</label>
					<input
						type='text'
						id='current-password'
						{...register("currentPassword", {
							required: "Enter your current password",
						})}
					/>
					{currentPassword && <p className={s.error}>{currentPassword}</p>}
				</div>
				<div className={s.field}>
					<label htmlFor='new-password'>New password:</label>
					<input
						type='text'
						id='new-password'
						{...register("newPassword", {
							required: "Enter new password",
							pattern: {
								value:
									/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message:
									"Password must be at least 8 characters long and include at least one letter, one number, and one special character",
							},
							validate: (value) =>
								value !== watch("currentPassword") ||
								"Current and new passwords cannot be the same",
						})}
					/>
					{newPasswordError && <p className={s.error}>{newPasswordError}</p>}
				</div>
				<div className={s.field}>
					<label htmlFor='confirm-new-password'>Confirm new password:</label>
					<input
						type='text'
						id='confirm-new-password'
						{...register("confirmPassword", {
							required: "Confirm your new password",
							validate: (value) =>
								value === watch("newPassword") || "Passwords do not match",
						})}
					/>
					{confirmPassword && <p className={s.error}>{confirmPassword}</p>}
				</div>
				<button type='submit'>save</button>
			</form>
		</div>
	);
}
