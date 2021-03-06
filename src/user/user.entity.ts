import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false})
    role: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject() {
        const {username, role} = this
        return {username, role};
    }
}