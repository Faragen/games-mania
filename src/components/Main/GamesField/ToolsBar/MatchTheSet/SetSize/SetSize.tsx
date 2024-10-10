import { optionsMTS } from "../../../../../../modules/MatchTheSet/options/options.slice";
import styles from "../ToolsMTS.module.scss";
import { v4 as uuidv4 } from "uuid";

interface SetSizeProps {
	setSize: string;
	setSetSize: React.Dispatch<React.SetStateAction<string>>;
	optionsMTS: typeof optionsMTS;
}

export function SetSize({ setSize, setSetSize, optionsMTS }: SetSizeProps) {
	return (
		<>
			<label htmlFor='set-size' className={styles["select-title"]}>
				Set Size
			</label>
			<div className={styles["select-wrapper"]}>
				<select
					className={styles.select}
					name='set-size'
					value={setSize}
					onChange={(e) => setSetSize(e.target.value)}
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
