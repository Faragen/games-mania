import { createContext, PropsWithChildren, useState } from "react";

type UserAuth = {
	username: string;
} | null;

export const AuthContext = createContext<{
	user: UserAuth;
	setUser: React.Dispatch<React.SetStateAction<UserAuth>>;
}>({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserAuth>(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
