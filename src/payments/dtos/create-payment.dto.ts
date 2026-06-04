import { IsNumber, IsDateString } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    amount?: number;

    @IsDateString()
    paidAt?: Date;
}