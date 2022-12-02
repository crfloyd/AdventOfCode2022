import {
	Anchor,
	AppShell,
	Header,
	MantineProvider,
	Navbar,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import DayList from "./components/DayList";
import Day1 from "./components/Days/Day1/Day1";
import Day2 from "./components/Days/Day2/Day2";
import Day3 from "./components/Days/Day3/Day3";

export default function App() {
	const theme = useMantineTheme();
	theme.colorScheme = "dark";

	const [day, setDay] = useState(0);

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<AppShell
				padding="md"
				navbar={
					<Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
						<DayList setDay={setDay} />
					</Navbar>
				}
				header={
					<Header height={75} p="xs">
						<Anchor
							href="https://adventofcode.com/"
							style={{
								textDecoration: "none",
							}}
						>
							<Title order={1}>Advent of Code 2022</Title>
						</Anchor>
					</Header>
				}
				styles={{
					main: {
						background:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				}}
			>
				{day === 0 && <Text>Select a day</Text>}
				{day === 1 && <Day1 />}
				{day === 2 && <Day2 />}
				{day === 3 && <Day3 />}
			</AppShell>
		</MantineProvider>
	);
}
