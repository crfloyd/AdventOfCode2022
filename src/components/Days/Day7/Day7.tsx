import { Stack, Anchor, Title, Accordion, Text, Divider } from "@mantine/core";
import { useState, useEffect } from "react";
import { splitLines } from "../../../utils/utils";
import { Input1 } from "./input";
import { File, Directory } from "./models";

const TestInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const parseFolderStructure = (input: string): Directory => {
	const root: Directory = {
		name: "/",
		children: [],
		files: [],
		parent: null,
		size: 0,
	};
	let currentDir = root;

	let lastCommand: "ls" | "cd" | null = null;

	const lines = splitLines(input);
	lines.forEach((line) => {
		// handle command
		const parts = line.split(" ");
		if (line.startsWith("$")) {
			const command = parts[1];

			if (command === "ls") {
				lastCommand = "ls";
				return;
			} else if (command === "cd") {
				lastCommand = "cd";
				const changeToDir = parts[2];
				if (changeToDir === "/") {
					currentDir = root;
				} else if (changeToDir === "..") {
					if (currentDir.parent == null) {
						console.warn(
							"tried changing directory to parent but no parent exists. changeing to root"
						);
					}
					currentDir = currentDir.parent ?? root;
				} else {
					const changeTo = currentDir.children.find(
						(d) => d.name === changeToDir
					);
					if (!changeTo) {
						throw new Error(
							"could not find a child directory to change to named: " +
								changeToDir
						);
					}
					currentDir = changeTo;
				}
				return;
			}
		} else {
			if (parts[0] === "dir") {
				const dirName = parts[1];
				if (!currentDir.children.find((d) => d.name === dirName)) {
					currentDir.children.push({
						name: dirName,
						children: [],
						files: [],
						parent: currentDir,
						size: 0,
					});
				}
			} else {
				const size = +parts[0];
				const name = parts[1];
				if (!currentDir.files.find((f) => f.name === name)) {
					currentDir.files.push({ name, size });
				}
			}
		}
	});

	return root;
};

const getDirectorySize = (dir: Directory): number => {
	// sum files in dir
	let size = dir.files.reduce((accumulator, f) => {
		return accumulator + f.size;
	}, 0);

	// if (dir.children.length == 0) return size;

	// recursively sum up child directory sizes
	dir.children.forEach((child) => {
		size += getDirectorySize(child);
	});

	dir.size = size;
	return size;
};

const getDirectorySizesWithMaxSize = (
	maxSize: number,
	root: Directory,
	matches: number[]
): number[] => {
	const rootSize = getDirectorySize(root);
	if (rootSize <= maxSize) {
		matches.push(rootSize);
	}

	if (root.children.length == 0) return [...matches];

	root.children.forEach((child) => {
		matches = getDirectorySizesWithMaxSize(maxSize, child, matches);
	});

	return [...matches];
};

const part1 = (input: string) => {
	const root = parseFolderStructure(input);
	const dirs = getDirectorySizesWithMaxSize(100000, root, []);
	const result = dirs.reduce((accumulator, current) => {
		return accumulator + current;
	}, 0);
	return result;
};

const getDirectoriesAtLeastSize = (
	root: Directory,
	minSize: number,
	matches: Directory[]
): Directory[] => {
	if (root.size >= minSize) {
		matches.push(root);
	}

	root.children.forEach((child) => {
		matches = getDirectoriesAtLeastSize(child, minSize, matches);
	});

	return [...matches];
};

const part2 = (input: string) => {
	const totalDiskSpace = 70000000;
	const minSpaceNeeded = 30000000;
	const root = parseFolderStructure(input);
	const rootSize = getDirectorySize(root);
	const remainingSpace = totalDiskSpace - rootSize;
	const extraSpaceNeeded = minSpaceNeeded - remainingSpace;

	const candidateDirs = getDirectoriesAtLeastSize(root, extraSpaceNeeded, []);
	// const sorted = candidateDirs.sort((d) => d.size).reverse();

	// return sorted[0].size;

	let smallest = totalDiskSpace;
	candidateDirs.forEach((d) => {
		if (d.size < smallest) {
			smallest = d.size;
		}
	});
	return smallest;
};

const Day7 = () => {
	const [part1Answer, setPart1Answer] = useState<number>();
	const [part2Answer, setPart2Answer] = useState<number>();

	useEffect(() => {
		setPart1Answer(part1(Input1));
		setPart2Answer(part2(Input1));
	}, []);

	return (
		<Stack ml={20}>
			<Anchor
				href="https://adventofcode.com/2022/day/7"
				style={{ textDecoration: "none" }}
			>
				<h2>Day 7</h2>
			</Anchor>
			<Title order={3}>No Space Left On Device</Title>
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
export default Day7;
