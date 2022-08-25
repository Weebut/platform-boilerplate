export interface BaseUnitOfWork {
  execute<T>(
    correlationId: string,
    callback: () => Promise<T>,
    options?: unknown,
  ): Promise<T>;
}
