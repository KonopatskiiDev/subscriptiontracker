import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private subscriptionsService: SubscriptionsService) {}

    @Post()
    createSubscription(@Body() body: CreateSubscriptionDto) {
        console.log("Body for post request in subscription: ", body);
        return this.subscriptionsService.create(body);
    }

    @Get()
    findAllSubscriptions() {
        return this.subscriptionsService.findAll();
    }
}
