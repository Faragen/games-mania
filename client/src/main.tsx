import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import Root from "./roots/Root/Root";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ErrorPage } from "./roots/ErrorPage/ErrorPage";
import { MatchTheSet } from "./components/Main/GamesField/MatchTheSet/MatchTheSet";
import { cardsLoaderMTS } from "./components/Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { AuthProvider } from "./contextProviders/AuthProvider";
import { Profile } from "./components/Main/Profile/Profile";
import { AuthCheck } from "./hoc/AuthCheck";
import { AuthModalProvider } from "./contextProviders/AuthModalProvider";
import { RegistModalProvider } from "./contextProviders/RegistModalProvider";
import { UserInfo } from "./components/Main/Profile/UserInfo/UserInfo";
import { ChangePassword } from "./components/Main/Profile/ChangePassword/ChangePassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "profile",
				element: (
					<AuthCheck>
						<Profile />
					</AuthCheck>
				),
				children: [
					{ index: true, element: <Navigate to='user-info' replace /> },
					{ path: "user-info", element: <UserInfo /> },
					{ path: "change-password", element: <ChangePassword /> },
				],
			},
			{
				path: "match-the-set",
				element: <MatchTheSet />,
				loader: cardsLoaderMTS,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<AuthModalProvider>
				<RegistModalProvider>
					<Provider store={store}>
						<RouterProvider router={router} />
					</Provider>
				</RegistModalProvider>
			</AuthModalProvider>
		</AuthProvider>
	</StrictMode>
);
