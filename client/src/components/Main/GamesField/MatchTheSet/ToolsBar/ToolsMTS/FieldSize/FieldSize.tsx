import { memo, SetStateAction, useRef } from "react";
import { optionsMTS } from "../../../../../../../modules/MatchTheSet/options/options.slice";
import s from "../ToolsMTS.module.scss";
import { v4 as uuidv4 } from "uuid";

interface IFieldSizeProps {
	setSizeIndex: string;
	fieldSizeIndex: string;
	setFieldSizeIndex: React.Dispatch<SetStateAction<string>>;
	optionsMTS: typeof optionsMTS;
	setIsNewFieldAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}

function FieldSize({
	setSizeIndex,
	optionsMTS,
	fieldSizeIndex,
	setFieldSizeIndex,
	setIsNewFieldAllowed,
}: IFieldSizeProps) {
	const isFirstEvent = useRef(true);

	return (
		<>
			<label htmlFor='field-size' className={s["select-title"]}>
				Field Size
			</label>
			<div className={s["select-wrapper"]}>
				<select
					className={`${s.select} ${setSizeIndex === "" ? s.disabled : ""}`}
					name='field-size'
					id='field-size'
					disabled={setSizeIndex === ""}
					value={fieldSizeIndex}
					onChange={(e) => {
						setFieldSizeIndex(e.target.value);
						if (isFirstEvent.current) {
							isFirstEvent.current = false;
							setIsNewFieldAllowed(true);
						}
					}}
				>
					{optionsMTS.reduce(
						(acc, elem) => {
							if (
								elem.setSize.toString() ===
								optionsMTS[Number(setSizeIndex)].setSize.toString()
							) {
								elem.fieldSizes.forEach((elem, index) => {
									acc.push(
										<option key={uuidv4()} value={index}>
											{elem.rows}x{elem.columns}
										</option>
									);
								});
							}
							return acc;
						},
						[
							<option value='' key={uuidv4()} disabled hidden>
								{setSizeIndex ? "choose field size" : "set size first!"}
							</option>,
						]
					)}
				</select>
			</div>
		</>
	);
}

export default memo(FieldSize);
