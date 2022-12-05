export const splitLines = (input: string): string[] => {
	return input.split("\n");
};

export class TowerColumn {
	private items: string[];

	/**
	 *
	 */
	constructor() {
		this.items = [];
	}

	getItems(): string[] {
		return [...this.items];
	}

	addToBottom(item: string): void {
		this.items.unshift(item);
	}

	peekTop(): string | undefined {
		if (this.items.length == 0) return undefined;

		return this.items.reverse().find((i) => i !== " " && i !== "");
	}

	push(item: string): void {
		this.items.push(item);
	}

	pop(): string {
		if (this.items.length === 0) throw new Error("No items to remove");
		return this.items.pop() ?? "";
	}
}

export class TowerArrangement {
	private towers: TowerColumn[];

	private parseLineToColumns(line: string) {
		if (!line.includes("[")) return;

		let towerNum = 0;
		for (let j = 0; j < line.length; j += 4) {
			// Add a column if on doesnt already exist for this index
			if (this.towers.length < towerNum + 1) {
				this.towers.push(new TowerColumn());
			}

			// Check for a value in this column and add if found
			const colVal = line.slice(j + 1, j + 2);
			if (colVal === " ") {
				towerNum++;
				continue;
			}
			this.towers[towerNum].addToBottom(colVal);

			towerNum++;
		}
	}

	constructor(towersDefinition: string) {
		this.towers = [];
		const lines = splitLines(towersDefinition);
		lines.forEach((line) => this.parseLineToColumns(line));
	}

	handleInstruction(instruction: TowerInstruction) {
		if (instruction.command === "MOVE") {
			if (instruction.maintainOrder) {
				this.move(
					instruction.sourceColumn,
					instruction.destColumn,
					instruction.quantity
				);
			} else {
				for (let i = 0; i < instruction.quantity; i++) {
					this.move(instruction.sourceColumn, instruction.destColumn);
				}
			}
		}
	}

	getTopItemString() {
		let topItemsString = "";
		this.towers.forEach((tower) => {
			const topItem = tower.peekTop();
			if (topItem) {
				topItemsString += topItem;
			}
		});
		return topItemsString;
	}

	private move(from: number, to: number, amount = 1) {
		const sourceTower = this.towers[from - 1];
		const destTower = this.towers[to - 1];
		const result = [];
		for (let i = 0; i < amount; i++) {
			result.unshift(sourceTower.pop());
		}
		result.forEach((i) => destTower.push(i));
	}
}

export class TowerInstruction {
	command: "MOVE" = "MOVE";

	quantity: number;
	sourceColumn: number;
	destColumn: number;
	maintainOrder = false;

	constructor(text: string) {
		const parts = text.split(" ");

		if (parts[0] == "move") {
			this.command = "MOVE";
		}

		this.quantity = +parts[1];
		this.sourceColumn = +parts[3];
		this.destColumn = +parts[5];
	}
}
