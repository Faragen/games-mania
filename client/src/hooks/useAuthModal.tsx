import { useContext } from "react";
import { ToggleModalContext } from "../contextProviders/AuthModalProvider";

export function useAuthModal() {
	return useContext(ToggleModalContext);
}
