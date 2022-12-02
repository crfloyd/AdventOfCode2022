import { Stack, Accordion, Text } from "@mantine/core";
import Input1 from "./input1";

enum RPS {
	Rock,
	Paper,
	Scissors,
}

const splitInput = (input: string): string[] => {
	return input.split("\n");
};

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
	const testInput = `A Y
	B X
	C Z`;
	const input1 = parseMoves(splitInput(Input1));
	const input1Result = calculateMovesTotal(input1);

	const input2 = parseMovesPart2(splitInput(Input1));
	const input2Result = calculateMovesTotal(input2);

	return (
		<Stack ml={20}>
			<h1>Day 2</h1>
			<Text size="md">Rock Paper Scissors</Text>
			<Accordion
				defaultValue="part1"
				mr={50}
				mt={30}
				chevronPosition="left"
				variant="contained"
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
