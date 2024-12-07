import { createContext, PropsWithChildren, useState } from "react";

const root = document.getElementById("root")!;

function handleOpenSignIn(
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
) {
	setOpenModal(() => {
		root.style.top = `-${window.scrollY}px`;
		root.style.position = "fixed";
		root.style.overflow = "scroll";
		return true;
	});
}

function handleCloseSignIn(
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
) {
	setOpenModal(() => {
		root.style.overflow = "hidden";
		root.style.position = "";
		window.scrollTo(0, -parseInt(getComputedStyle(document.body).top));
		root.style.top = "";
		return false;
	});
}

interface IToggleModalContext<
	T = React.Dispatch<React.SetStateAction<boolean>>
> {
	openModal: boolean;
	setOpenModal: T;
	handleOpenSignIn: (setOpenModal: T) => void;
	handleCloseSignIn: (setOpenModal: T) => void;
}

export const ToggleModalContext = createContext<IToggleModalContext>({
	openModal: false,
	setOpenModal() {},
	handleOpenSignIn() {},
	handleCloseSignIn() {},
});

export function AuthModalProvider({ children }: PropsWithChildren) {
	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<ToggleModalContext.Provider
			value={{ openModal, setOpenModal, handleOpenSignIn, handleCloseSignIn }}
		>
			{children}
		</ToggleModalContext.Provider>
	);
}
