import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { URL } from "../components/Main/GamesField/MatchTheSet/GameBoard/BoardMTS/cardsLoaderMTS";
import { useAuthModal } from "../hooks/useAuthModal";
import { useNavigate } from "react-router-dom";

async function checkauth(user: string | undefined) {
	return await fetch(URL + "/api/authcheck", {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ username: user }),
		headers: {
			"Content-type": "application/json",
		},
	});
}

export function AuthCheck({ children }: PropsWithChildren) {
	const { user } = useAuth();
	const { setOpenModal, handleOpenSignIn } = useAuthModal();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const res = await checkauth(user?.username);
			if (!res.ok) {
				navigate("/");
				handleOpenSignIn(setOpenModal);
			}
		})();
	}, []);

	return children;
}
