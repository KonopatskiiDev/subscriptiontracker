export interface ISubscription {
    id: number;
    name: string;
    price: number;
    billingCycle: string;
    nextPaymentDate: string;
    isActive: boolean;
    userId: number;
}