import { useContext } from "react";
import { ToggleRegistModalContext } from "../contextProviders/RegistModalProvider";

export function useRegistModal() {
	return useContext(ToggleRegistModalContext);
}
