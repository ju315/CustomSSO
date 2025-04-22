import { Column, Entity, OneToOne } from 'typeorm';

import { SignInSessionModel } from './signInSession.entity';
import { BaseModel } from './base.entity';

@Entity()
export class SignHistoryModel extends BaseModel {
  @Column()
  is_success: boolean;

  @Column('text')
  log_msg: string;

  @Column('text')
  client_ip: string;

  @Column('text')
  server_ip: string;

  @OneToOne(() => SignInSessionModel, (session) => session.sessionId)
  session: SignInSessionModel;
}
