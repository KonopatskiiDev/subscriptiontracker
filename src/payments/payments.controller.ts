import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

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

    @Get() 
    @UseGuards(AuthGuard)
    findAllPayments(@Param('subscriptionId') subscriptionId: string) {
        return this.paymentsService.findAll(parseInt(subscriptionId))
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    removePayment(@Param('id') id: string, @Param('subscriptionId') subscriptionId: string) {
       return this.paymentsService.remove(parseInt(id), parseInt(subscriptionId));
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    updatePayment(@Param('id') id: string, @Body() body: UpdatePaymentDto, @Param('subscriptionId') subscriptionId: string) {
        return this.paymentsService.update(parseInt(id), parseInt(subscriptionId), body);
    }
}
