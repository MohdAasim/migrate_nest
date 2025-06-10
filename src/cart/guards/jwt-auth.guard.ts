import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtUtilService, JwtPayload } from '../../utils/jwt.service';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtUtilService: JwtUtilService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Malformed token');
    }

    try {
      const decoded = this.jwtUtilService.verifyToken(token);
      request.user = decoded;
      return true;
    } catch {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
