import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from '../user';
import { Mission } from '../mission';
import { APPLICATION_STATUSES, applicationStatusType } from './types';

@Entity()
@Unique('A militant can only apply once for a mission', ['user', 'mission'])
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    @Column('enum', { enum: APPLICATION_STATUSES })
    status: applicationStatusType;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    user: User;

    @ManyToOne(() => Mission, { onDelete: 'CASCADE', nullable: false })
    mission: Mission;

    @CreateDateColumn({ type: 'timestamptz' })
    appliedAt: string;
}
