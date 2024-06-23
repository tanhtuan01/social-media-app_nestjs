import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

const secret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    signToken(id: number): Promise<string> {
        return this.jwtService.signAsync({ id });
    }

    verifyToken(token: string): Promise<{ id: number }> {
        return this.jwtService.verifyAsync(token) as Promise<{ id: number }>;
    }
}