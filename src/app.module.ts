import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { User } from './users/user.entity';
import { Payment } from './payments/payment.entity';
import { Subscription } from './subscriptions/subscription.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Payment, Subscription],
    synchronize: true
  }),
    UsersModule, 
    SubscriptionsModule, 
    PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
