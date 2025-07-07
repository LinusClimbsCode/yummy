export default async function Delay<T>(fetchFunktion: () => Promise<T>): Promise<T> {
    const delayMs = Math.floor(Math.random() * 5000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delayMs));
    return await fetchFunktion();
}