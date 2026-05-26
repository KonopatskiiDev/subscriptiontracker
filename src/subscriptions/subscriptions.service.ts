import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
@Injectable()
export class SubscriptionsService {
    constructor(@InjectRepository(Subscription) private repo: Repository<Subscription>) {}

    create(createSubscriptionDto: CreateSubscriptionDto) {
        const subscription = this.repo.create(createSubscriptionDto);
        return this.repo.save(subscription);
    }

    findAll(){
        return this.repo.find();
    }

    findOne() {

    }

    update() {

    }

    remove() {

    }
}
