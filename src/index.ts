async function timeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type AwaitedReturnType<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

/**
 *
 * @param fn Function to execute
 * @param ms Minimum time to wait before returning
 * @returns A promise resolving to the awaited return value of the function you pass in.
 * @description Executes the function you pass in, but will wait at least the specified number of milliseconds before returning.
 */
export async function withMinTime<Ret>(
  fn: () => Ret,
  ms: number
): Promise<Awaited<Ret>> {
  const [ret] = await Promise.all([fn(), timeout(ms)]);

  return ret;
}

/**
 *
 * @param fn Function to execute
 * @param ms Minimum time to wait before returning
 * @returns A function that will execute the function you pass in, but will wait at least the specified number of milliseconds before returning.
 */
export function createWithMinTime<Ret, Args extends unknown[]>(
  fn: (...args: Args) => Ret,
  ms: number
) {
  return (...args: Args): Promise<Awaited<Ret>> => {
    return withMinTime(() => fn(...args), ms);
  };
}
