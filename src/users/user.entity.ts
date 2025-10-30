import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskModel } from "src/todo/entities/task.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => TaskModel, (task) => task.user)
  tasks: TaskModel[];
}