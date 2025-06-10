import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  id: number;
  email: string;
}

@Injectable()
export class JwtUtilService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: JwtPayload, expiresIn: string = '2d'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }
}
