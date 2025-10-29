import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    description: string;

    @Column({ default: false })
    completed: boolean;
}