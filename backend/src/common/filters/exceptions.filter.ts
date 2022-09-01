import { LoggerService } from '@common/logger/logger.service';
import { ConflictException, NotFoundException } from '@libs/exceptions';
import { BaseException } from '@libs/exceptions/base-classes/base-exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

interface ErrorInterface {
  message: string;
  error: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const { status, message } = this.parseException(exception);

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...message,
    };

    this.logMessage(request, message, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: ErrorInterface,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} codeError=${
          message.error ? message.error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} codeError=${
          message.error ? message.error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }

  private parseException(exception: HttpException | BaseException): {
    status: number;
    message: ErrorInterface;
  } {
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception.getResponse() as ErrorInterface,
      };
    } else if (exception instanceof BaseException) {
      return {
        status: exception.httpStatusCode,
        message: {
          message: exception.message,
          error: exception.code,
        },
      };
    }

    return {
      status: 500,
      message: {
        message: null,
        error: null,
      },
    };
  }
}
