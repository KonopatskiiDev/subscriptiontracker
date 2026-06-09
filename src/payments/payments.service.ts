import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import {CreatePaymentDto} from './dtos/create-payment.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private repo: Repository<Payment>,
        private subscriptionsService: SubscriptionsService
    ) {}

    async create(
        createPaymentDto: CreatePaymentDto, 
        subscriptionId: number, 
        userId: number
    ) {
        const subscription = await this.subscriptionsService.findOne(subscriptionId, userId);

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        const payment = this.repo.create({...createPaymentDto, subscriptionId});
        return this.repo.save(payment);
    };

    async findAll(subscriptionId: number, userId: number) {
        const subscription = await this.subscriptionsService.findOne(subscriptionId, userId);

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }
        return this.repo.find({ where: {subscriptionId} });
    };

    async findOne(id: number, subscriptionId: number, userId: number){
        const subscription = await this.subscriptionsService.findOne(subscriptionId, userId);
        
        if (!subscription) {
            throw new NotFoundException("Subscription not found");
        }
        if(!id) {
            return null;
        }
        return this.repo.findOne({where: {id, subscriptionId}});
    };

    async update(id: number, subscriptionId: number, userId: number, attr: Partial<Payment>){
        const subscription = await this.subscriptionsService.findOne(subscriptionId, userId);

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        const payment = await this.findOne(id, subscriptionId, userId);
        if (!payment){
            throw new NotFoundException('payment not found');
        }
        Object.assign(payment, attr);
        return this.repo.save(payment);
    };

    async remove(id: number, subscriptionId: number, userId: number) {
        const subscription = await this.subscriptionsService.findOne(subscriptionId, userId);

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }
        const payment = await this.findOne(id, subscriptionId, userId);
        if (!payment) {
            throw new NotFoundException('payment not found');
        }
        return this.repo.remove(payment);
    }
}
