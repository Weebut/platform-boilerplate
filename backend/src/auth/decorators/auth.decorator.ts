import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtOnlyGuard } from '../guards/jwt-only.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from './permissions.decorator';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    Permissions(...permissions),
    UseGuards(JwtOnlyGuard, PermissionsGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
