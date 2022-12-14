import { Stack, Accordion, Text, Anchor, Title } from "@mantine/core";
import { useMemo } from "react";
import { splitLines } from "../../../utils/utils";
import Input1 from "./input1";

enum RPS {
	Rock,
	Paper,
	Scissors,
}

const parseOpponentMove = (move: string): RPS => {
	return move === "A" ? RPS.Rock : move === "B" ? RPS.Paper : RPS.Scissors;
};
const parsePlayerMove = (move: string): RPS => {
	return move === "X" ? RPS.Rock : move === "Y" ? RPS.Paper : RPS.Scissors;
};

/**
 * X : Lose
 * Y : Draw
 * Z : Win
 */
const parsePlayerMovePart2 = (player: string, opponent: RPS): RPS => {
	if (player === "X") {
		return opponent === RPS.Rock
			? RPS.Scissors
			: opponent === RPS.Paper
			? RPS.Rock
			: RPS.Paper;
	}
	if (player === "Y") return opponent;

	return opponent === RPS.Rock
		? RPS.Paper
		: opponent === RPS.Paper
		? RPS.Scissors
		: RPS.Rock;
};

const parseMoves = (moves: string[]): RPS[][] => {
	return moves.map((m) => {
		const parts = m.trim().split(" ");
		const opponent = parseOpponentMove(parts[0]);
		const player = parsePlayerMove(parts[1]);
		return [opponent, player];
	});
};

const parseMovesPart2 = (moves: string[]): RPS[][] => {
	return moves.map((m) => {
		const parts = m.trim().split(" ");
		const opponent = parseOpponentMove(parts[0]);
		const player = parsePlayerMovePart2(parts[1], opponent);
		return [opponent, player];
	});
};

const didWin = (opponent: RPS, player: RPS) => {
	if (opponent === RPS.Rock) {
		return player === RPS.Paper;
	} else if (opponent === RPS.Paper) {
		return player === RPS.Scissors;
	} else {
		return player === RPS.Rock;
	}
};

const calculateMoveValue = (move: RPS) => {
	return move === RPS.Rock ? 1 : move === RPS.Paper ? 2 : 3;
};

const calculateMoveResult = (move: RPS[]) => {
	const opp = move[0];
	const player = move[1];
	const playerMoveValue = calculateMoveValue(player);

	// Draw
	if (opp === player) return playerMoveValue + 3;

	// Win
	if (didWin(opp, player)) return playerMoveValue + 6;

	// Lose
	return playerMoveValue;
};

const calculateMovesTotal = (moves: RPS[][]) => {
	let total = 0;
	moves.forEach((m) => {
		const result = calculateMoveResult(m);
		total += result;
	});
	return total;
};

const Day2 = () => {
	const input1Result = useMemo(() => {
		console.log("a");
		const input1 = parseMoves(splitLines(Input1));
		return calculateMovesTotal(input1);
	}, []);

	const input2Result = useMemo(() => {
		console.log("b");
		const input2 = parseMovesPart2(splitLines(Input1));
		return calculateMovesTotal(input2);
	}, []);

	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/2"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 2</h2>
			</Anchor>
			<Title order={3}>Rock Paper Scissors</Title>
			<Accordion
				defaultValue="part1"
				mr={50}
				mt={30}
				chevronPosition="left"
				variant="separated"
			>
				<Accordion.Item value="part1">
					<Accordion.Control>Part 1</Accordion.Control>
					<Accordion.Panel>
						<Text>The result for part 1 is {input1Result}</Text>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel>
						<Text>The result for part 2 is {input2Result}</Text>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day2;
