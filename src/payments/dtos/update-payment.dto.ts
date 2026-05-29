import {
  IsDateString,
  IsNumber,
  IsOptional
 } from "class-validator";

export class UpdatePaymentDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    @IsOptional()
    subscriptionId?: number;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsDateString()
    @IsOptional()
    paidAt?: Date;
}