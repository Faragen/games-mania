import { GameStatus } from "../../../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";
import s from "./ResultInfo.module.scss";

interface IResultInfoProps {
	isResultOpen: boolean;
	setIsResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
	gameStatus: GameStatus;
}

const root = document.getElementById("root")!;

function handleCloseModal({
	setIsResultOpen,
}: {
	setIsResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	root.style.position = "";
	window.scrollTo(0, -parseInt(getComputedStyle(root).top));
	root.style.top = "";
	setIsResultOpen(false);
}

export function ResultInfo({
	isResultOpen,
	setIsResultOpen,
	gameStatus,
}: IResultInfoProps) {
	isResultOpen;

	const resultTitle = (() => {
		switch (gameStatus.gameState) {
			case "won":
				return "You have won!";
			case "cancelled":
				return "Game is cancelled";
			case "timerFailed":
				return "Timer is failed:(";
			default:
				return "There's something wrong";
		}
	})();

	return (
		<dialog open={isResultOpen} className={s.backdrop}>
			<div className={s["result-info"]}>
				<h3 className={s.title}>{resultTitle}</h3>
				<div
					className={s.result}
				>{`Opened: ${gameStatus.progress.opened} / ${gameStatus.progress.all}`}</div>
				<button
					className={s.button}
					onClick={() => handleCloseModal({ setIsResultOpen })}
				>
					close
				</button>
			</div>
		</dialog>
	);
}
