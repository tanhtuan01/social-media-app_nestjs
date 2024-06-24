import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
    id: string;
}

@Injectable()
export class AuthService {
    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService({
            secret: 'secret12356789',
            signOptions: { expiresIn: '1h' },
        });
    }

    async signToken(id: string): Promise<string> {
        return await this.jwtService.sign({ id });
    }

    async verifyToken(token: string): Promise<{ id: string } | null> {
        try {
            console.log('verifyToken', token);
            const payload = await this.jwtService.verifyAsync<TokenPayload>(token);
            console.log('Verified payload:', payload);
            return { id: payload.id };
        } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
}