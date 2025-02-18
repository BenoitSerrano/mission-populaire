import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';
import { MISSION_STATUSES, missionStatusType } from './types';

@Entity()
export class Mission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamptz' })
    deadline: string;

    @Column('enum', { enum: MISSION_STATUSES })
    status: missionStatusType;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    publishedAt: string;
}
