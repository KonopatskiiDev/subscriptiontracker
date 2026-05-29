import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    subscriptionId?: number;

    @Column()
    amount?: number;

    @Column()
    paidAt?: Date;
}