import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private subscriptionsService: SubscriptionsService) {}

    @Post()
    @UseGuards(AuthGuard)
    createSubscription(
        @Body() body: CreateSubscriptionDto, 
        @CurrentUser() user: User
    ) {
        console.log("Body for post request in subscription: ", body);
        return this.subscriptionsService.create(body, user.id );
    }

    @Get()
    @UseGuards(AuthGuard)
    findAllSubscriptions(@CurrentUser() user: User) {
        return this.subscriptionsService.findAll(user.id);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    removeSubscription(@Param('id') id: number, @CurrentUser() user: User) {
        return this.subscriptionsService.remove(id, user.id);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    updateSubscription(@Param('id') id: number, @CurrentUser() user: User, @Body() body: UpdateSubscriptionDto) {
        return this.subscriptionsService.update(id, user.id, body);
    }
}
