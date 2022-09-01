import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  JwtFromRequestFunction,
  StrategyOptions,
  VerifiedCallback,
  VerifyCallback,
} from 'passport-jwt';
import { Strategy as PassportStrategy } from 'passport-strategy';
import { ParsedQs } from 'qs';

export class CustomJwtStrategy extends PassportStrategy {
  constructor(opt: StrategyOptions, verify: VerifyCallback) {
    super();
    this.jwtFromRequest = opt.jwtFromRequest;
    this.verify = verify;
  }

  readonly name: string;
  readonly jwtFromRequest: JwtFromRequestFunction;
  readonly verify: VerifyCallback;

  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ): void {
    const token = this.jwtFromRequest(req);

    if (!token) {
      return this.fail('No auth token', 401);
    }

    const verified: VerifiedCallback = (err, user, info) => {
      if (err) {
        return this.error(err);
      } else if (!user) {
        return this.fail(info);
      } else {
        return this.success(user, info);
      }
    };

    this.verify(token, verified);
  }
}
