import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class SignHistoryModel extends BaseModel {
  @Column({ type: 'text', unique: true })
  sessionId: string;

  @Column()
  isSignIn: boolean;

  @Column('text')
  originIp: string;
}
