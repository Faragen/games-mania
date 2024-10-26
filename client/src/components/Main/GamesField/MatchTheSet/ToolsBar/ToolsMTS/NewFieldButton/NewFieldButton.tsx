import { memo } from "react";
import { gameStatusSlice } from "../../../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";
import {
	optionMTSSlice,
	PlayOption,
} from "../../../../../../../modules/MatchTheSet/options/options.slice";
import { useAppDispatch } from "../../../../../../../store/store";
import s from "../ToolsMTS.module.scss";

interface INewFieldButtonProps {
	option: PlayOption;
	setIsStartAllowed: React.Dispatch<React.SetStateAction<boolean>>;
	isNewFieldAllowed: boolean;
}

const NewFieldButton = ({
	option,
	setIsStartAllowed,
	isNewFieldAllowed,
}: INewFieldButtonProps) => {
	const dispatch = useAppDispatch();

	const handleGetOptions = () => {
		dispatch(optionMTSSlice.actions.getOptions(option));
		dispatch(
			gameStatusSlice.actions.changeStatus({
				gameState: "fieldIsSetUp",
				progress: {
					opened: 0,
					all: option.fieldSize.fieldSize,
				},
			})
		);
		setIsStartAllowed(true);
	};

	return (
		<button
			type='button'
			className={`${s.button} ${s["new-field"]} ${
				!isNewFieldAllowed ? s.disabled : ""
			}`}
			onClick={() => handleGetOptions()}
			disabled={!isNewFieldAllowed}
		>
			new field
		</button>
	);
};

export default memo(NewFieldButton);
