import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOnlyGuard extends AuthGuard('jwt-only') {}
