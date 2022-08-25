import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS,
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const grantedPermissions: string[] =
      context.getArgs()[0].user?.permissions ?? [];

    function userHasPermission(required: string) {
      return !!grantedPermissions.find((granted) => granted === required);
    }

    return requiredPermissions.every((required) => userHasPermission(required));
  }
}
