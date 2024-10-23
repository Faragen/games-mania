import { memo } from "react";
import { gameStatusSlice } from "../../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";
import { PlayOption } from "../../../../../../modules/MatchTheSet/options/options.slice";
import { useAppDispatch } from "../../../../../../store/store";
import s from "../ToolsMTS.module.scss";

interface IStartButtonProps {
	isStartAllowed: boolean;
	setIsNewFieldAllowed: React.Dispatch<React.SetStateAction<boolean>>;
	option: PlayOption;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
	setTimer: React.Dispatch<React.SetStateAction<number>>;
}

function StartButton({
	isStartAllowed,
	setIsNewFieldAllowed,
	option,
	setIsRunning,
	setTimer,
}: IStartButtonProps) {
	const dispatch = useAppDispatch();

	function handleStart() {
		dispatch(
			gameStatusSlice.actions.changeStatus({
				gameState: "started",
				progress: {
					opened: 0,
					all: option.fieldSize.fieldSize,
				},
			})
		);
		setIsNewFieldAllowed(false);
		setTimer(0);
		setIsRunning(true);
	}

	return (
		<button
			type='button'
			className={`${s.button} ${s.start} ${!isStartAllowed ? s.disabled : ""}`}
			disabled={!isStartAllowed}
			onClick={() => handleStart()}
		>
			Start!
		</button>
	);
}

export default memo(StartButton);
