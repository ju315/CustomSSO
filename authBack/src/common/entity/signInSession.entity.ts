import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { SignHistoryModel } from './signInHistory.entity';
import { BaseModel } from './base.entity';
import { WebSignInSessionModel } from './webSession.entity';

export enum SIGN_TYPE {
  NORMAL = 'NORMAL',
  SSO = 'SSO',
}

@Entity()
export class SignInSessionModel extends BaseModel {
  @Column('text')
  user_id: string;

  @Column('text')
  sessionId: string;

  @Column('text')
  client_ip: string;

  @Column()
  is_sign_in: boolean;

  @Column({ type: 'enum', enum: SIGN_TYPE })
  type: SIGN_TYPE;

  @OneToOne(() => SignHistoryModel, (signHistory) => signHistory.session)
  @JoinColumn()
  sign_history: SignHistoryModel;

  @OneToMany(
    () => WebSignInSessionModel,
    (webSession) => webSession.sign_session,
  )
  web_session: WebSignInSessionModel[];
}
