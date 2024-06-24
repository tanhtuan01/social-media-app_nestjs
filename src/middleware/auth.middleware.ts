import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) { }

    async use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized', status: req.method, error: '401' });
        }
        try {
            const { id } = await this.authService.verifyToken(token);
            // Attach the user ID to the request object
            req.userId = id;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}