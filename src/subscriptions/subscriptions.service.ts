import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
    constructor(@InjectRepository(Subscription) private repo: Repository<Subscription>) {}

    create(createSubscriptionDto: CreateSubscriptionDto, userId: number) {
        const subscription = this.repo.create({ ...createSubscriptionDto, userId });
        return this.repo.save(subscription);
    }

    findAll(userId: number) {
        return this.repo.find({ where: { userId } });
    }

    findOne(id: number, userId: number) {
        if(!id) {
            return null;
        }
        return this.repo.findOne({ where: { id, userId } });
    }

    async update(id: number, userId: number, attr: Partial<Subscription>) {
        const subscription = await this.findOne(id, userId);
        if (!subscription) {
            throw new NotFoundException('subscription not found');
        }
        Object.assign(subscription, attr);
        return this.repo.save(subscription);
    }

    async remove(id: number, userId: number) {
        const subscription = await this.findOne(id, userId);
        if (!subscription) {
            throw new NotFoundException('subscription not found');
        }
        return this.repo.remove(subscription);
    }
}
