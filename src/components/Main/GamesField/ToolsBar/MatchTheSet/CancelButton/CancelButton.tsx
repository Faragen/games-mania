import { memo } from "react";
import { gameStatusSlice } from "../../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";
import { useAppDispatch } from "../../../../../../store/store";
import s from "../ToolsMTS.module.scss";

interface ICancelButton {
	setIsNewFieldAllowed: React.Dispatch<React.SetStateAction<boolean>>;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
	setIsStartAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}

function CancelButton({
	setIsNewFieldAllowed,
	setIsRunning,
	setIsStartAllowed,
}: ICancelButton) {
	const dispatch = useAppDispatch();
	function handleStop() {
		setIsRunning(false);
		setIsStartAllowed(false);
		setIsNewFieldAllowed(true);
		dispatch(gameStatusSlice.actions.changeStatusHelper("cancelledHelper"));
	}
	return (
		<button
			type='button'
			className={`${s.button} ${s.stop}`}
			onClick={() => handleStop()}
		>
			cancel
		</button>
	);
}

export default memo(CancelButton);
