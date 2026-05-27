import { IsString, IsNumber, IsBoolean, IsDateString } from "class-validator";

export class CreateSubscriptionDto {
    @IsString()
    name?: string;

    @IsNumber()
    price?: number;

    @IsString()
    billingCycle?: string;
    
    @IsDateString()
    nextPaymentDate?: Date;
    
    @IsBoolean()
    isActive?: boolean;
}