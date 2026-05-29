import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';

@Controller('subscriptions/:subscriptionId/payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService){}

    @Post()
    @UseGuards(AuthGuard)
    createPayment(
        @Body() body: CreatePaymentDto,
        @Param('subscriptionId') subscriptionId: string,
        @CurrentUser() user: User
    ){
        console.log("Body for post when creating payment:", body);
        return this.paymentsService.create(
            body, 
            parseInt(subscriptionId)
        );
    }

    
}
