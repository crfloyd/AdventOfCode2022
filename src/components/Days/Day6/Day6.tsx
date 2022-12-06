import { Stack, Anchor, Title, Accordion, Text, Group } from "@mantine/core";
import { useEffect, useState } from "react";

import { Input1 } from "./input";

const testInputs = [
	"mjqjpqmgbljsphdztnvjfqwrcgsmlb",
	"bvwbjplbgvbhsrlpgdmjqwftvncz",
	"nppdvjthqldpwncqszvftbrmjlhg",
	"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
	"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

class Buffer {
	items: string[];
	constructor(init: string[]) {
		this.items = [...init];
	}

	push(item: string): void {
		const sliced = this.items.slice(1);
		this.items = [...sliced, item];
	}

	areItemsUnique(): boolean {
		return this.items.length === new Set(this.items).size;
	}
}

const findMarker = (input: string, bufferLength: number): number => {
	const chars = input.split("");
	const buffer = new Buffer(chars.slice(0, bufferLength));
	if (buffer.areItemsUnique()) return bufferLength;
	for (let i = bufferLength; i < chars.length; i++) {
		buffer.push(chars[i]);
		if (buffer.areItemsUnique()) return i + 1;
	}
	return -1;
};

const Day6 = () => {
	const [part1Answer, setPart1Answer] = useState<number>();
	const [part2Answer, setPart2Answer] = useState<number>();

	useEffect(() => {
		setPart1Answer(findMarker(Input1, 4));
		setPart2Answer(findMarker(Input1, 14));
	}, []);

	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/6"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 6</h2>
			</Anchor>
			<Title order={3}>Tuning Trouble</Title>
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
export default Day6;
