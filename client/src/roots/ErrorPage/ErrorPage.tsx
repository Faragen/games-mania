import s from "./ErrorPage.module.scss";
import { useRouteError } from "react-router-dom";

interface IErrorPage {
	data: string;
	error: {
		message: string;
		stack: string;
	};
	internal: boolean;
	status: number;
	statusText: string;
}

export function ErrorPage() {
	const error = useRouteError();

	if (typeof error !== "object" || error === null || !("statusText" in error)) {
		return (
			<div className={s.error}>
				<h1>Oh, no... Something went wrong :(</h1>
			</div>
		);
	}

	const typedError = error as IErrorPage;
	console.log(error);
	return (
		<div className={s.error}>
			<h1>Oh, no... Something went wrong :(</h1>
			<h2>
				{typedError.status} {typedError.statusText}
			</h2>
			<p>
				<i>{typedError.data}</i>
			</p>
			<p>
				<a href='/'>Just go to the main page</a>
			</p>
		</div>
	);
}
