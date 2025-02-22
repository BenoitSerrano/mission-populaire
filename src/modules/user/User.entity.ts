import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { skillType } from './types';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    actionPopulaireId: string;

    @Column()
    displayName: string;

    @Column('simple-array', { default: '' })
    skills: skillType[];
}
