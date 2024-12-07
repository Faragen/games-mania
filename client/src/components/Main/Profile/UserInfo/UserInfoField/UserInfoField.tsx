import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import s from "./UserInfoField.module.scss";
import { IProfileForm } from "../UserInfo";

interface IUserInfoField<T = IProfileForm> {
	field: keyof T;
	register: UseFormRegister<IProfileForm>;
	edit: boolean;
	setEdit: React.Dispatch<React.SetStateAction<Record<keyof T, boolean>>>;
	userData: string | undefined;
	handleSubmit: UseFormHandleSubmit<IProfileForm, undefined>;
	formError: string | undefined;
	errorMessage?: string;
	validatePattern?: RegExp;
}

export function UserInfoField({
	field,
	register,
	edit,
	setEdit,
	userData,
	handleSubmit,
	formError,
	errorMessage,
	validatePattern,
}: IUserInfoField) {
	return (
		<div className={s["profile-field"]}>
			<label htmlFor={`profile-${field}`}>{field}:</label>
			<p className={edit ? s.hide : ""}>{userData}</p>
			<input
				id={`profile-${field}`}
				className={edit ? "" : s.hide}
				{...register(field, {
					required: "This field cannot be empty",
					pattern: validatePattern
						? {
								value: validatePattern,
								message: errorMessage || "",
						  }
						: undefined,
				})}
			/>
			<button
				type='button'
				className={edit ? s.hide : ""}
				onClick={() => setEdit((prev) => ({ ...prev, [field]: true }))}
			>
				edit
			</button>
			<button
				type='submit'
				className={edit ? "" : s.hide}
				onClick={() =>
					handleSubmit(() =>
						setEdit((prev) =>
							Object.keys(prev).reduce((acc, key) => {
								acc[key as keyof IProfileForm] = false;
								return acc;
							}, {} as typeof prev)
						)
					)()
				}
			>
				save
			</button>
			{formError && <p className={s.error}>{formError}</p>}
		</div>
	);
}
