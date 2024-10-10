import { SetStateAction } from "react";
import { optionsMTS } from "../../../../../../modules/MatchTheSet/options/options.slice";
import styles from "../ToolsMTS.module.scss";
import { v4 as uuidv4 } from "uuid";

interface FieldSizeProps {
	setSize: string;
	fieldSize: string;
	setFieldSize: React.Dispatch<SetStateAction<string>>;
	optionsMTS: typeof optionsMTS;
}

export function FieldSize({
	setSize,
	optionsMTS,
	fieldSize,
	setFieldSize,
}: FieldSizeProps) {
	return (
		<>
			<label htmlFor='field-size' className={styles["select-title"]}>
				Field Size
			</label>
			<div className={styles["select-wrapper"]}>
				<select
					className={styles.select}
					name='field-size'
					disabled={setSize === ""}
					value={fieldSize}
					onChange={(e) => setFieldSize(e.target.value)}
				>
					{optionsMTS.reduce(
						(acc, elem) => {
							if (
								elem.setSize.toString() ===
								optionsMTS[Number(setSize)].setSize.toString()
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
								{setSize ? "choose field size" : "set size first!"}
							</option>,
						]
					)}
				</select>
			</div>
		</>
	);
}
