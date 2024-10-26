import { useState, useEffect } from "react";
import {
	optionsMTS,
	PlayOption,
} from "../../../../../../modules/MatchTheSet/options/options.slice";
import s from "./ToolsMTS.module.scss";
import SetSize from "./SetSize/SetSize";
import FieldSize from "./FieldSize/FieldSize";
import StartButton from "./StartButton/StartButton";
import NewFieldButton from "./NewFieldButton/NewFieldButton";
import CancelButton from "./CancelButton/CancelButton";
import { GameTimer } from "./GameTimer/GameTimer";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { gameStatusSlice } from "../../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";

export function ToolsMTS() {
	const dispatch = useAppDispatch();
	const gameStatus = useAppSelector((state) =>
		gameStatusSlice.selectors.selectGameStatus(state)
	);
	const [setSizeIndex, setSetSizeIndex] = useState("");
	const [fieldSizeIndex, setFieldSizeIndex] = useState("");
	const [isStartAllowed, setIsStartAllowed] = useState(false);
	const [isNewFieldAllowed, setIsNewFieldAllowed] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		if (timer === 180) {
			dispatch(gameStatusSlice.actions.changeStatusHelper("timerFailedHelper"));
		}
	}, [timer]);

	useEffect(() => {
		if (
			gameStatus.gameState === "won" ||
			gameStatus.gameState === "timerFailed"
		) {
			setIsRunning(false);
			setIsStartAllowed(false);
			setIsNewFieldAllowed(true);
		}
	}, [gameStatus.gameState]);

	const option: PlayOption = {
		setSize: optionsMTS[Number(setSizeIndex)].setSize,
		fieldSize:
			optionsMTS[Number(setSizeIndex)].fieldSizes[Number(fieldSizeIndex)],
	};

	return (
		<div className={s["tools-match-the-set"]}>
			<div className={s["form-block"]}>
				<SetSize
					setSizeIndex={setSizeIndex}
					setSetSizeIndex={setSetSizeIndex}
					optionsMTS={optionsMTS}
				/>
				<FieldSize
					{...{
						setSizeIndex,
						optionsMTS,
						fieldSizeIndex,
						setFieldSizeIndex,
						setIsNewFieldAllowed,
					}}
				/>
				<NewFieldButton
					{...{
						option,
						setIsStartAllowed,
						isNewFieldAllowed,
					}}
				/>
				{isRunning ? (
					<CancelButton
						{...{ setIsNewFieldAllowed, setIsRunning, setIsStartAllowed }}
					/>
				) : (
					<StartButton
						{...{
							isStartAllowed,
							setIsNewFieldAllowed,
							option,
							setIsRunning,
							setTimer,
						}}
					/>
				)}
				<GameTimer {...{ timer, isRunning, setTimer }} />
			</div>
		</div>
	);
}
