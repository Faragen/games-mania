import { useEffect } from "react";
import s from "../ToolsMTS.module.scss";

interface IGameTimerProps {
	timer: number;
	isRunning: boolean;
	setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export function GameTimer({ timer, isRunning, setTimer }: IGameTimerProps) {
	useEffect(() => {
		let intervalId: number;
		if (isRunning) {
			intervalId = window.setInterval(() => setTimer((prev) => prev + 1), 1000);
		}
		return () => window.clearInterval(intervalId);
	}, [isRunning]);

	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	return (
		<>
			<div className={s.timer}>{`${formattedMinutes}:${formattedSeconds}`}</div>
			<div className={s["timer-note"]}>(3 min limit)</div>
		</>
	);
}
