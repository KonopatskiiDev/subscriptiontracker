import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import {CreatePaymentDto} from './dtos/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

    create(createPaymentDto: CreatePaymentDto, subscriptionId: number) {
        const payment = this.repo.create({...createPaymentDto, subscriptionId});
        return this.repo.save(payment);
    };

    findAll(subscriptionId: number) {
        return this.repo.find({ where: {subscriptionId} });
    };

    findOne(id: number, subscriptionId: number){
        if(!id) {
            return null;
        }
        return this.repo.findOne({where: {id, subscriptionId}});
    };

    async update(id: number, subscriptionId: number, attr: Partial<Payment>){
        const payment = await this.findOne(id, subscriptionId);
        if (!payment){
            throw new NotFoundException('payment not found');
        }
        Object.assign(payment, attr);
        return this.repo.save(payment);
    };

    async remove(id: number, subscriptionId: number) {
        const payment = await this.findOne(id, subscriptionId);
        if (!payment) {
            throw new NotFoundException('payment not found');
        }
        return this.repo.remove(payment);
    }
}
