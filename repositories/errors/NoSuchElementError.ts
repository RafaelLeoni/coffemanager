export default class NoSuchElementError extends Error {
	constructor(public message: string) {
        super(message);
    }
}