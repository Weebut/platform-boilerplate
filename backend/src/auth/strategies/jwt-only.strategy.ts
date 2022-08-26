import { jwtExtractor } from '@libs/utils/jwt/extract-jwt-token.util';
import {
  parseJwtToken,
  validateJwtToken,
} from '@libs/utils/jwt/validate-jwt-token.util';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { CustomJwtStrategy } from './custom-jwt.strategy';

dotenv.config();

@Injectable()
export class JwtOnlyStrategy extends PassportStrategy(
  CustomJwtStrategy,
  'jwt-only',
) {
  constructor() {
    super({
      jwtFromRequest: jwtExtractor,
    });
  }

  async validate(token: string): Promise<string | null> {
    if (!token) {
      return null;
    }

    const { payload } =
      process.env.NODE_ENV === 'production'
        ? await validateJwtToken(token)
        : await parseJwtToken(token);

    return payload ? payload.sub : null;
  }
}
