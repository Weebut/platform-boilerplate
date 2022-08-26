import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtOnlyGuard } from '../guards/jwt-only.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from './permissions.decorator';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    Permissions(...permissions),
    UseGuards(JwtOnlyGuard, PermissionsGuard),
  );
}
