import { Stack, Accordion, Text, Anchor, Title } from "@mantine/core";

const Day3 = () => {
	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/3"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 3</h2>
			</Anchor>
			<Title order={3}>??</Title>
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
						<Stack mt={30}>
							<Text>Input:</Text>
							<Text>??</Text>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="part2">
					<Accordion.Control>Part 2</Accordion.Control>
					<Accordion.Panel></Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};
export default Day3;
