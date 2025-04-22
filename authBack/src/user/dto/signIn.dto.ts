import { IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  @IsString()
  signType: string;

  @IsString()
  @IsOptional()
  sessionId: string;
}
