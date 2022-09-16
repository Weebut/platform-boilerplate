import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Neutral')
@Controller({ version: VERSION_NEUTRAL })
export class NeutralController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('health')
  check(): string {
    return 'ok';
  }

  @Get('health/infra')
  @HealthCheck()
  checkInfra(): Promise<HealthCheckResult> {
    return this.health.check([
      // TODO
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
