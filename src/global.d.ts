declare global {
	interface Array<T> {
		sortArrayOfObjects(asc: boolean, sortBy: string): T[];
	}
}
export {};
