export interface File {
	size: number;
	name: string;
}

export interface Directory {
	name: string;
	files: File[];
	parent: Directory | null;
	children: Directory[];
	size: number;
}
