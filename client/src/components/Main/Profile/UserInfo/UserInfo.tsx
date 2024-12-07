import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import s from "./UserInfo.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInfoField } from "./UserInfoField/UserInfoField";
import { URL } from "../../GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";

export interface IProfileForm {
	username: string;
	email: string;
}

//email
const emailErrorMessage = "Incorrect email";
const validateEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailField = "email";
//username
const usernameField = "username";

export function UserInfo() {
	const { user, setUser } = useAuth();
	const { register, handleSubmit, formState, reset } = useForm<IProfileForm>({
		mode: "onSubmit",
		defaultValues: { username: user?.username, email: user?.email },
	});
	const [edit, setEdit] = useState<Record<keyof IProfileForm, boolean>>({
		username: false,
		email: false,
	});
	const [formMessage, setFormMessage] = useState<string | null>(null);
	const [formError, setFormError] = useState<string | null>(null);

	const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
		console.log(data);
		console.log(user);

		for (const key in data) {
			if (
				data[key as keyof IProfileForm] !== user?.[key as keyof IProfileForm]
			) {
				const res = await fetch(URL + "/api/change-user-info", {
					method: "PUT",
					credentials: "include",
					body: JSON.stringify({ user, newUser: data }),
					headers: { "Content-type": "application/json" },
				});

				if (!res.ok) {
					reset();
					setFormMessage(null);
					setFormError(await res.text());
					return;
				}
				const profile = await fetch(URL + "/api/profile", {
					method: "POST",
					credentials: "include",
					body: JSON.stringify({ username: data.username }),
					headers: { "Content-type": "application/json" },
				});
				if (!profile.ok) {
					reset();
					setFormError(await profile.text());
					return;
				}
				setFormError(null);
				setUser(await profile.json());
				setFormMessage(await res.text());
				return;
			}
		}
		setFormError("There are not any changes");
	};

	const emailError = formState.errors.email?.message;
	const usernameError = formState.errors.username?.message;

	return (
		<form className={s["profile-form"]} onSubmit={handleSubmit(onSubmit)}>
			{formMessage && <p className={s["form-message"]}>{formMessage}</p>}
			{formError && <p className={s["form-error"]}>{formError}</p>}
			<UserInfoField
				field={emailField}
				register={register}
				edit={edit.email}
				setEdit={setEdit}
				userData={user?.email}
				handleSubmit={handleSubmit}
				formError={emailError}
				errorMessage={emailErrorMessage}
				validatePattern={validateEmailPattern}
			/>
			<UserInfoField
				field={usernameField}
				register={register}
				edit={edit.username}
				setEdit={setEdit}
				userData={user?.username}
				handleSubmit={handleSubmit}
				formError={usernameError}
			/>
		</form>
	);
}
