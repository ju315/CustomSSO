import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  sessionId: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
