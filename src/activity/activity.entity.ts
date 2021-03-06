import { InventoryEntity } from "src/inventory/inventory.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('activity')
export class ActivityEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToOne(() => InventoryEntity, {cascade: true, eager: true})
    @JoinColumn()
    inventory: InventoryEntity;

    @Column()
    description: string;

    @Column()
    noOfUnits: number;

    @Column()
    user: string;
}