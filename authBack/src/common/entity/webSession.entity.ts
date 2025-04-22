import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { SignInSessionModel } from './signInSession.entity';

@Entity()
export class WebSignInSessionModel extends BaseModel {
  @Column('text')
  sessionId: string;

  @Column('text')
  server_ip: string;

  @Column()
  is_sign_in: boolean;

  @ManyToOne(
    () => SignInSessionModel,
    (signInSession) => signInSession.web_session,
  )
  sign_session: SignInSessionModel;
}
