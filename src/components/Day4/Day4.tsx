import { Stack, Anchor, Title, Accordion, Text, Input } from "@mantine/core";
import { useMemo } from "react";
import { splitLines } from "../../utils/utils";
import { Input1 } from "./input";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

type Range = {
	start: number;
	end: number;
};

const splitParts = (line: string): [Range, Range] => {
	const parts = line.split(",");
	const first = parts[0].split("-");
	const second = parts[1].split("-");
	return [
		{ start: +first[0], end: +first[1] },
		{ start: +second[0], end: +second[1] },
	];
};

// 6-11, 6-22

const orderRanges = (parts: [Range, Range]): [Range, Range] => {
	const [first, second] = parts;
	let from = first;
	let to = second;

	// if they are the same range, increase total and continue
	if (first.start === second.start && first.end === second.end) {
		return [from, to];
	}

	// if the second is the larger range, swap it to the from
	if (first.start === second.start && second.end > first.end) {
		from = second;
		to = first;
	} else if (first.start > second.start) {
		from = second;
		to = first;
	}
	return [from, to];
};

const part1 = (input: string) => {
	const lines = splitLines(input);
	let total = 0;
	lines.forEach((line) => {
		const [from, to] = orderRanges(splitParts(line));
		if (to.start >= from.start && to.end <= from.end) {
			total++;
		}
	});
	return total;
};

const part2 = (input: string) => {
	const lines = splitLines(input);
	let total = 0;
	lines.forEach((line) => {
		const [from, to] = orderRanges(splitParts(line));
		if (from.end >= to.start) {
			total++;
		}
	});
	return total;
};

const Day4 = () => {
	// const test = part1(testInput);
	// console.log(test);
	const part1Result = useMemo(() => {
		part1(Input1);
	}, []);
	const part2Result = useMemo(() => {
		part2(Input1);
	}, []);
	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/4"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 4</h2>
			</Anchor>
			<Title order={3}>Camp Cleanup</Title>
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
							<Text>The answer for part 1 is: {part1Result}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel>
						<Stack mt={30}>
							<Text>The answer for part 2 is: {part2Result}</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day4;
