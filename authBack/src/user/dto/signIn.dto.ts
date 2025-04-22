import { IsOptional, IsString } from 'class-validator';
import { SIGN_TYPE } from 'src/common/entity/signInSession.entity';

export class SignInDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  @IsString()
  signType: SIGN_TYPE;

  @IsString()
  @IsOptional()
  sessionId: string;
}
