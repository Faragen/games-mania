import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./roots/Root/Root";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([{ path: "/", element: <Root /> }]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
