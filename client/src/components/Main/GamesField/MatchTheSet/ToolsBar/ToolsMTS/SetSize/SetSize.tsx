import { memo } from "react";
import { optionsMTS } from "../../../../../../../modules/MatchTheSet/options/options.slice";
import s from "../ToolsMTS.module.scss";
import { v4 as uuidv4 } from "uuid";

interface ISetSizeProps {
	setSizeIndex: string;
	setSetSizeIndex: React.Dispatch<React.SetStateAction<string>>;
	optionsMTS: typeof optionsMTS;
}

function SetSize({ setSizeIndex, setSetSizeIndex, optionsMTS }: ISetSizeProps) {
	return (
		<>
			<label htmlFor='set-size' className={s["select-title"]}>
				Set Size
			</label>
			<div className={s["select-wrapper"]}>
				<select
					className={s.select}
					name='set-size'
					value={setSizeIndex}
					onChange={(e) => setSetSizeIndex(e.target.value)}
					id='set-size'
				>
					{optionsMTS.reduce(
						(acc, elem, index) => {
							acc.push(
								<option key={uuidv4()} value={index}>
									{elem.setSize}
								</option>
							);
							return acc;
						},
						[
							<option key={uuidv4()} value='' disabled hidden>
								choose set size
							</option>,
						]
					)}
				</select>
			</div>
		</>
	);
}

export default memo(SetSize);
