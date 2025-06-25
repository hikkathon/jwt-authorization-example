import { UserTokenData } from './UserTokenData';

export interface JwtPayload extends UserTokenData {
	iat?: number;
	exp?: number;
}
