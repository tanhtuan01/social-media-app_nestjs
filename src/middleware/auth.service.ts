import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


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