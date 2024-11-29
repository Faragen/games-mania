import { useContext } from "react";
import { AuthContext } from "../contextProviders/AuthProvider";

export function useAuth() {
	return useContext(AuthContext);
}
