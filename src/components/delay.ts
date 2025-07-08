/**
 * Adds a random delay before executing a fetch function.
 * 
 * This utility function introduces an artificial delay of 1-6 seconds before
 * executing the provided asynchronous function. Useful for testing loading
 * states or simulating network latency in development.
 * 
 * @template T - The return type of the fetch function
 * @param fetchFunction - An asynchronous function that returns a Promise of type T
 * @returns A Promise that resolves to the same type as the fetch function after the delay
 * 
 * @example
 * ```typescript
 * const delayedData = await Delay(() => fetch('/api/data'));
 * ```
 */
export default async function Delay<Type>(fetchFunction: () => Promise<Type>): Promise<Type> {
    // calculates random number between 1 and 6 seconds
    const delayMs = Math.floor(Math.random() * 2000) + 1000;
    // delay random number
    await new Promise(resolve => setTimeout(resolve, delayMs));
    // return function what is passed through the params
    return await fetchFunction();
}