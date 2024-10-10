type Status = "WON" | "LOST" | "Not Started" | "Started" | "Timer Failed";

export type GameStatus = {
	status: Status;
	progress: {
		opened: number;
		close: number;
	};
};
