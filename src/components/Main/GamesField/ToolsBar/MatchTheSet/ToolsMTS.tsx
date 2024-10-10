import { useState } from "react";
import {
	optionMTSSlice,
	optionsMTS,
	PlayOption,
} from "../../../../../modules/MatchTheSet/options/options.slice";
import styles from "./ToolsMTS.module.scss";
import { SetSize } from "./SetSize/SetSize";
import { FieldSize } from "./FieldSize/FieldSize";
import { useAppDispatch } from "../../../../../store/store";

export function ToolsMTS() {
	const [setSize, setSetSize] = useState("");
	const [fieldSize, setFieldSize] = useState("");
	const [isStartAllowed, setIsStartAllowed] = useState(false);
	const dispatch = useAppDispatch();

	function handleGetOptions() {
		const option: PlayOption = {
			setSize: optionsMTS[Number(setSize)].setSize,
			fieldSize: optionsMTS[Number(setSize)].fieldSizes[Number(fieldSize)],
		};
		dispatch(optionMTSSlice.actions.getOptions(option));
		setIsStartAllowed((prev) => !prev && (prev = !prev));
	}

	return (
		<div className={styles["tools-match-the-set"]}>
			<div className={styles["form-block"]}>
				<SetSize
					setSize={setSize}
					setSetSize={setSetSize}
					optionsMTS={optionsMTS}
				/>
				<FieldSize
					setSize={setSize}
					optionsMTS={optionsMTS}
					fieldSize={fieldSize}
					setFieldSize={setFieldSize}
				/>

				<button
					type='button'
					className={`${styles["new-field"]} ${
						fieldSize === "" ? styles.disabled : ""
					}`}
					onClick={() => handleGetOptions()}
					disabled={fieldSize === ""}
				>
					new field
				</button>
				<button
					type='button'
					className={`${styles.start} ${
						!isStartAllowed ? styles.disabled : ""
					}`}
					disabled={!isStartAllowed}
					onClick={() => console.log("sadf")}
				>
					Start!
				</button>
			</div>
		</div>
	);
}
