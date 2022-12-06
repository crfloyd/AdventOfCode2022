import { Stack, Anchor, Title, Accordion, Text, Card } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { splitLines } from "../../../utils/utils";

import { Input1 } from "./input";
import { TowerArrangement, TowerInstruction } from "./models";

const TestInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const parseInputInstructions = (data: string): [string, string] => {
	const parts = data.split("\n\n");
	return [parts[0], parts[1]];
};

const parseTowers = (configuration: string) => {
	const towers = new TowerArrangement(configuration);
	return towers;
};

const parseInstructions = (instructionText: string): TowerInstruction[] => {
	const instructionLines = splitLines(instructionText);
	const instructions: TowerInstruction[] = instructionLines.map(
		(l) => new TowerInstruction(l)
	);
	return instructions;
};

const processInstructions = (
	instructions: TowerInstruction[],
	towers: TowerArrangement
) => {
	instructions.forEach((instruction) => {
		towers.handleInstruction(instruction);
	});
};

const processInputPart1 = (input: string) => {
	const [configuration, instructionText] = parseInputInstructions(input);
	const towers = parseTowers(configuration);
	const instructions = parseInstructions(instructionText);
	processInstructions(instructions, towers);
	return towers;
};

const processInputPart2 = (input: string) => {
	const [configuration, instructionText] = parseInputInstructions(input);
	const towers = parseTowers(configuration);
	const instructions = parseInstructions(instructionText);
	instructions.forEach((ins) => (ins.maintainOrder = true));
	processInstructions(instructions, towers);
	return towers;
};

const Day5 = () => {
	const part1Answer = useMemo(
		() => processInputPart1(Input1).getTopItemString(),
		[]
	);
	const part2Answer = useMemo(
		() => processInputPart2(Input1).getTopItemString(),
		[]
	);

	const [part1Towers, setPart1Towers] = useState<TowerArrangement>();
	const [part1Instructions, setPart1Instructions] =
		useState<TowerInstruction[]>();

	const [part2Towers, setPart2Towers] = useState<TowerArrangement>();
	const [part2Instructions, setPart2Instructions] =
		useState<TowerInstruction[]>();

	useEffect(() => {
		const [configuration, instructionText] = parseInputInstructions(Input1);
		setPart1Towers(parseTowers(configuration));
		setPart1Instructions(parseInstructions(instructionText));

		setPart2Towers(parseTowers(configuration));
		const part2Ins = parseInstructions(instructionText);
		part2Ins.forEach((ins) => (ins.maintainOrder = true));
		setPart2Instructions(part2Ins);
	}, []);

	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/5"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 5</h2>
			</Anchor>
			<Title order={3}>Supply Stacks</Title>
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
						<Stack mt={30}>
							<Text>The answer for part 1 is: {part1Answer}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel>
						<Stack mt={30}>
							<Text>The answer for part 2 is: {part2Answer}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day5;
