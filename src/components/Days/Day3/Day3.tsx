import { Stack, Accordion, Text } from "@mantine/core";

const Day3 = () => {
	return (
		<Stack ml={20}>
			<h1>Day 3</h1>
			<Text size="md">??</Text>
			<Accordion defaultValue="part1" mr={50}>
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
