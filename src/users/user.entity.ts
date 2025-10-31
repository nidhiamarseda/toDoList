import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskModel } from "src/todo/entities/task.entity";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => TaskModel, (task) => task.user)
  tasks: TaskModel[];
}