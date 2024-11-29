import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./roots/Root/Root";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ErrorPage } from "./roots/ErrorPage/ErrorPage";
import { MatchTheSet } from "./components/Main/GamesField/MatchTheSet/MatchTheSet";
import { cardsLoaderMTS } from "./components/Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { AuthProvider } from "./contextProviders/AuthProvider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
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
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</AuthProvider>
	</StrictMode>
);
