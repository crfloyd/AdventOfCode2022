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

const CURRENT_DAY = new Date().getDate();

const Days = [...Array(25).keys()].map((k) => k + 1);

const DayList = ({ setDay }: Props) => {
	return (
		<SimpleGrid cols={4}>
			{Days.map((d) => (
				<Button disabled={d > CURRENT_DAY} onClick={() => setDay(d)} key={d}>
					{d}
				</Button>
			))}
		</SimpleGrid>
	);
};
export default DayList;
