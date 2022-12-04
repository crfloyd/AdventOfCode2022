import { Stack, Accordion, Text, Anchor, Title } from "@mantine/core";
import { splitLines } from "../../../utils/utils";
import { Input1 } from "./input1";

const TestInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const letterValues: { [key: string]: number } = {
	["a"]: 1,
	["b"]: 2,
	["c"]: 3,
	["d"]: 4,
	["e"]: 5,
	["f"]: 6,
	["g"]: 7,
	["h"]: 8,
	["i"]: 9,
	["j"]: 10,
	["k"]: 11,
	["l"]: 12,
	["m"]: 13,
	["n"]: 14,
	["o"]: 15,
	["p"]: 16,
	["q"]: 17,
	["r"]: 18,
	["s"]: 19,
	["t"]: 20,
	["u"]: 21,
	["v"]: 22,
	["w"]: 23,
	["x"]: 24,
	["y"]: 25,
	["z"]: 26,
};

const splitLine = (line: string): [a: string, b: string] => {
	const len = line.length;
	return [line.slice(0, len / 2), line.slice(len / 2, len)];
};

const findCommonItem = (parts: [a: string, b: string]) => {
	const aLetters = parts[0].split("");
	const bLetters = parts[1].split("");
	const common = aLetters.filter((val) => bLetters.includes(val));
	return common[0];
};

const getItemValue = (letter: string) => {
	const lowerCaseCommonItem = letter.toLowerCase();
	let value = letterValues[lowerCaseCommonItem];
	if (lowerCaseCommonItem !== letter) {
		value += 26;
	}
	return value;
};

const calculatePriorities = (input: string) => {
	let total = 0;
	const lines = splitLines(input);
	lines.forEach((l) => {
		const parts = splitLine(l);
		const commonItem = findCommonItem(parts);
		let value = getItemValue(commonItem);
		total += value;
	});
	return total;
};

// Part 2

const getElfGroups = (input: string[]): [string, string, string][] => {
	const parts: [string, string, string][] = [];
	for (let i = 0; i < input.length; i += 3) {
		parts.push([input[i], input[i + 1], input[i + 2]]);
	}

	return parts;
};

const findCommonItemInGroup = (group: [string, string, string]) => {
	const first = group[0].split("");
	const second = group[1].split("");
	const third = group[2].split("");

	let match = "";
	first.forEach((l) => {
		if (second.includes(l) && third.includes(l)) {
			match = l;
			return;
		}
	});
	return match;
};

const calculatePart2 = (input: string) => {
	const lines = splitLines(input);
	const groups = getElfGroups(lines);

	let total = 0;
	groups.forEach((group) => {
		const commonItem = findCommonItemInGroup(group);
		total += getItemValue(commonItem);
	});

	return total;
};

const Day3 = () => {
	// const testPriority = calculatePriorities(TestInput);
	const part1 = calculatePriorities(Input1);
	// const testPart2 = calculatePart2(TestInput);
	const part2 = calculatePart2(Input1);
	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/3"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 3</h2>
			</Anchor>
			<Title order={3}>Rucksack Reorganization</Title>
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
							<Text>The sum of priorities is: {part1}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel>
						<Stack mt={30}>
							<Text>The sum of priorities for each group is: {part2}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day3;
