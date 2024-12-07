import { createContext, PropsWithChildren, useState } from "react";

const root = document.getElementById("root")!;

function handleOpenSignUp(
	setRegistOpenModal: React.Dispatch<React.SetStateAction<boolean>>
) {
	setRegistOpenModal(() => {
		root.style.top = `-${window.scrollY}px`;
		root.style.position = "fixed";
		root.style.overflow = "scroll";
		return true;
	});
}

function handleCloseSignUp(
	setRegistOpenModal: React.Dispatch<React.SetStateAction<boolean>>
) {
	setRegistOpenModal(() => {
		root.style.overflow = "hidden";
		root.style.position = "";
		window.scrollTo(0, -parseInt(getComputedStyle(document.body).top));
		root.style.top = "";
		return false;
	});
}

interface IToggleRegistModalContext<
	T = React.Dispatch<React.SetStateAction<boolean>>
> {
	openRegistModal: boolean;
	setRegistOpenModal: T;
	handleOpenSignUp: (setOpenModal: T) => void;
	handleCloseSignUp: (setOpenModal: T) => void;
}

export const ToggleRegistModalContext =
	createContext<IToggleRegistModalContext>({
		openRegistModal: false,
		setRegistOpenModal() {},
		handleOpenSignUp() {},
		handleCloseSignUp() {},
	});

export function RegistModalProvider({ children }: PropsWithChildren) {
	const [openRegistModal, setRegistOpenModal] = useState<boolean>(false);
	return (
		<ToggleRegistModalContext.Provider
			value={{
				openRegistModal,
				setRegistOpenModal,
				handleOpenSignUp,
				handleCloseSignUp,
			}}
		>
			{children}
		</ToggleRegistModalContext.Provider>
	);
}
