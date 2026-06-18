export interface ISubscription {
    id: number;
    name: string;
    price: number;
    billingCycle: string;
    nextPaymentDate: Date;
    isActive: boolean;
    userId: number;
}