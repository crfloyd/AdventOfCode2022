import {
	Button,
	Grid,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";

interface Props {
	setDay: (day: number) => void;
}

const Days = [...Array(25).keys()].map((k) => k + 1);

const DayList = ({ setDay }: Props) => {
	return (
		<SimpleGrid cols={4}>
			{Days.map((d) => (
				<Button onClick={() => setDay(d)} key={d}>
					{d}
				</Button>
			))}
		</SimpleGrid>
	);
};
export default DayList;
