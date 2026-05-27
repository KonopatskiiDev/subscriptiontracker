import { 
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString
 } from "class-validator";
export class UpdateSubscriptionDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    billingCycle?: string;

    @IsOptional()
    @IsDateString()
    nextPaymentDate?: Date;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}