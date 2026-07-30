import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import './SubscriptionForm.scss';
import type { ISubscription } from '../../types';


interface ISubscriptionFormProps {
    subscription?: ISubscription;
    mode: 'create' | 'edit';
    onSuccess: () => void;
}

const SubscriptionForm = ({
    subscription,
    mode,
    onSuccess
}: ISubscriptionFormProps) => {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [billingCycle, setBillingCycle] = useState('');
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const onChangeIsActive = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {
        if (!subscription) return;

        setName(subscription?.name ?? "");
        setPrice(subscription?.price ?? 0);
        setBillingCycle(subscription?.billingCycle ?? "");
        setNextPaymentDate(subscription ? new Date(subscription.nextPaymentDate).toISOString().slice(0, 10) : "");
        setIsActive(subscription?.isActive ?? false);
    }, [subscription]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "create") {
            try {
                await api.post('/subscriptions', {
                    name,
                    price,
                    billingCycle,
                    nextPaymentDate,
                    isActive
                });
                onSuccess();
            } catch(error) {
                console.error(error);
            }
        } else {
            if(!subscription) return; // or add error message

            try {
                await api.patch(`/subscriptions/${subscription?.id}`, {
                    name,
                    price,
                    billingCycle,
                    nextPaymentDate,
                    isActive
                });
                onSuccess();
            } catch(error) {
                console.error(error);
            }
        }
    }

    console.log("subscription: ", subscription)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='entered-data-block'>
                    <label>Name: </label>
                    <input
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Price: </label>
                    <input
                        onChange={(e) => {setPrice(Number(e.target.value))}}
                        value={price}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Billing cycle: </label>
                    <input
                        onChange={(e) => {setBillingCycle(e.target.value)}}
                        value={billingCycle}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Next Payment Date: </label>
                    <input
                        onChange={(e) => {setNextPaymentDate(e.target.value)}}
                        type='date'
                        value={nextPaymentDate}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Is active: </label>
                    <input
                        checked={isActive}
                        onChange={onChangeIsActive}
                        type='checkbox'
                    >
                    </input>                   
                </div>
                <button type='submit'>
                    {mode === 'create' ? `Create subscription` : `Edit subscription`}
                </button>
            </form>
        </div>
    );
};

export default SubscriptionForm;