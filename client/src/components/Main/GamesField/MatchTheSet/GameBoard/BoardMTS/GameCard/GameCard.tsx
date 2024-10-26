import s from "./GameCard.module.scss";
import React, { memo } from "react";
import { Card } from "../../../../../../../store/fetchRequests/getGames";
import { CurrentSet } from "../BoardMTS";
import { PlayOption } from "../../../../../../../modules/MatchTheSet/options/options.slice";

interface IGameCard {
	card: Card;
	playOption: PlayOption;
	setFlippedState: React.Dispatch<React.SetStateAction<Card[]>>;
	setCurrentSet: React.Dispatch<React.SetStateAction<CurrentSet[]>>;
	setOpensCount: React.Dispatch<React.SetStateAction<number>>;
}

function handleFlip(
	id: string,
	setFlippedState: React.Dispatch<React.SetStateAction<Card[]>>
): void {
	setFlippedState((prevFlippedState) =>
		prevFlippedState.map((set) => {
			if (set.id === id) {
				return { ...set, isFlipped: !set.isFlipped, disabled: true };
			}
			return set;
		})
	);
}

function handleCheckSet({
	card,
	setFlippedState,
	setCurrentSet,
	playOption,
	setOpensCount,
}: IGameCard) {
	let opensDelta = 0;
	setCurrentSet((prevSet) => {
		if (prevSet[0] !== undefined && card.title !== prevSet[0].title) {
			opensDelta -= prevSet.length;
			setFlippedState((prevFlippedState) =>
				prevFlippedState.map((set) => {
					for (const elem of prevSet) {
						if (set.id === elem.id || set.id === card.id)
							return { ...set, wrong: true };
					}
					return set;
				})
			);
			setTimeout(() => {
				setFlippedState((prevFlippedState) =>
					prevFlippedState.map((set) => {
						for (const elem of prevSet) {
							if (set.id === elem.id || set.id === card.id)
								return {
									...set,
									isFlipped: true,
									disabled: false,
									wrong: false,
								};
						}
						return set;
					})
				);
			}, 1500);
			return [];
		} else if (prevSet.length === playOption.setSize - 1) {
			opensDelta++;
			return [];
		} else {
			opensDelta++;
			return [...prevSet, { id: card.id, title: card.title }];
		}
	});
	setOpensCount((prev) => {
		prev += opensDelta;
		opensDelta = 0;
		return prev;
	});
}

function GameCard({
	card,
	setFlippedState,
	setCurrentSet,
	playOption,
	setOpensCount,
}: IGameCard) {
	return (
		<button
			className={[s["game-card"], card.isFlipped ? s.flipped : ""].join(" ")}
			onClick={() => {
				handleFlip(card.id, setFlippedState);
				handleCheckSet({
					card,
					setFlippedState,
					setCurrentSet,
					playOption,
					setOpensCount,
				});
			}}
			disabled={card.disabled}
		>
			<div
				className={`${s.front} ${card.wrong ? s.wrong : ""} ${
					card.right ? s.right : ""
				}`}
				style={{ "--cardImg": `url(${card.imageURL})` } as React.CSSProperties}
			></div>
			<div className={s.back}>
				<span>Match</span>
				<span>The</span>
				<span>Set</span>
			</div>
		</button>
	);
}

export default memo(
	GameCard,
	(prevProps, nextProps) =>
		prevProps.card.isFlipped === nextProps.card.isFlipped &&
		prevProps.card.wrong === nextProps.card.wrong &&
		prevProps.card.right === nextProps.card.right
);
