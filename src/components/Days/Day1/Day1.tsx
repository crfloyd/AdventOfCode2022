import {
	Accordion,
	Anchor,
	Code,
	Space,
	Spoiler,
	Stack,
	Text,
	Title,
} from "@mantine/core";

import Input1 from "./input1";
import Input2 from "./input2";
import TestInput from "./testInput";

const parseInput = (inputStr: string): string[][] => {
	return inputStr.split("\n\n").map((l) => l.split("\n"));
};

const sumInputs = (input: string[]) => {
	let total = 0;
	input.forEach((i) => {
		total += +i;
	});
	return total;
};

const calcLargestGroup = (input: string[][]) => {
	let largest = 0;
	let largestIndex = 0;

	for (let i = 0; i < input.length; i++) {
		const inputGroup = input[i];
		const sum = sumInputs(inputGroup);
		if (sum > largest) {
			largest = sum;
			largestIndex = i;
		}
	}
	return [largestIndex + 1, largest];
};

const calcTop3Groups = (
	input: string[][]
): [
	{ largest: number; largestIndex: number },
	{ secondLargest: number; secondLargestIndex: number },
	{ thirdLargest: number; thirdLargestIndex: number }
] => {
	let largest = 0;
	let secondLargest = 0;
	let thirdLargest = 0;

	let largestIndex = 0;
	let secondLargestIndex = 0;
	let thirdLargestIndex = 0;

	for (let i = 0; i < input.length; i++) {
		const inputGroup = input[i];
		const sum = sumInputs(inputGroup);
		if (sum > largest) {
			thirdLargest = secondLargest;
			thirdLargestIndex = secondLargestIndex;
			secondLargest = largest;
			secondLargestIndex = largestIndex;
			largest = sum;
			largestIndex = i;
		} else if (sum > secondLargest) {
			thirdLargest = secondLargest;
			thirdLargestIndex = secondLargestIndex;
			secondLargest = sum;
			secondLargestIndex = i;
		} else if (sum > thirdLargest) {
			thirdLargest = sum;
			thirdLargestIndex = i;
		}
	}
	return [
		{ largest, largestIndex },
		{ secondLargest, secondLargestIndex },
		{ thirdLargest, thirdLargestIndex },
	];
};

const Day1 = () => {
	const input1 = parseInput(Input1);
	const input1Largest = calcLargestGroup(input1);

	const input2 = parseInput(Input2);
	const input2Top3 = calcTop3Groups(input2);

	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/1"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 1</h2>
			</Anchor>
			<Title order={3}>Calorie Counting</Title>
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
						<Text>
							The elf with the most calories is elf number: {input1Largest[0]}{" "}
							carring a total of {input1Largest[1]} calories
						</Text>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel>
						<Text>
							The top 3 elves with the most calories are elf numbers:{" "}
							{input2Top3[0].largestIndex}, {input2Top3[1].secondLargestIndex},
							and {input2Top3[2].thirdLargestIndex} carrying a total of{" "}
							{input2Top3[0].largest +
								input2Top3[1].secondLargest +
								input2Top3[2].thirdLargest}{" "}
							calories
						</Text>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day1;
