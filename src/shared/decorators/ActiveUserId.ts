import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

interface RequestWithUserId extends Request {
  userId: string;
}

export const ActiveUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUserId>();

    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
