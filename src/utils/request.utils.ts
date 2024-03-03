export interface IAsyncResult<T, K> {
    data?: T;
    error?: K
}

export async function asyncResult<T, K = unknown>(
    promise: Promise<T>
): Promise<IAsyncResult<T, K>> {
    const result: IAsyncResult<T, K> = {
        data: undefined,
        error: undefined,
    };

    try {
        result.data = await promise;
    } catch (err: unknown) {
        result.error = err as K;
    }

    return result;
}
