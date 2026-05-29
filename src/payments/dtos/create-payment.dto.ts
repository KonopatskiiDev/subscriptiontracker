import { IsNumber, IsDateString } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    id?: number;

    @IsNumber()
    subscriptionId?: number;

    @IsNumber()
    amount?: number;

    @IsDateString()
    paidAt?: Date;
}