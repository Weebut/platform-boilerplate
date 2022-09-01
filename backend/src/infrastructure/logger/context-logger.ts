import { LoggerPort as LoggerInterface } from '@libs/structure/domain/ports/logger.port';
import { Logger } from '@nestjs/common';

export class ContextLogger implements LoggerInterface {
  constructor(context?: string) {
    this.context = context;
  }

  private context: string;

  log(message: string, ...meta: unknown[]): void {
    this.getLogger().log(message, ...meta);
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    this.getLogger().error(message, trace, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.getLogger().error(message, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    this.getLogger().debug(message, ...meta);
  }

  setContext(context: string): void {
    this.context = context;
  }

  private getLogger(): Logger {
    return new Logger(this.context);
  }
}
