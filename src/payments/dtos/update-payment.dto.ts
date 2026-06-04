import {
  IsDateString,
  IsNumber,
  IsOptional
 } from "class-validator";

export class UpdatePaymentDto {
    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsDateString()
    @IsOptional()
    paidAt?: Date;
}