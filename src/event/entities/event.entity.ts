import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index(['type', 'name'])
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;

}
