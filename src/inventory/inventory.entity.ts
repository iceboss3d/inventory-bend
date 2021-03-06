import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventory')
export class InventoryEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    noOfUnits: number;

    @Column()
    warningUnits: number;
}