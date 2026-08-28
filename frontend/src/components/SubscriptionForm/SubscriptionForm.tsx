import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import './SubscriptionForm.scss';
import type { ISubscription } from '../../types';
import toast from 'react-hot-toast';


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
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        billingCycle: '',
        nextPaymentDate: ''
    });

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

        const newErrors = {
            name: '',
            price: '',
            billingCycle: '',
            nextPaymentDate: ''
        }

        if(name.trim() === '') {
            newErrors.name = 'Name field could not be empty';
        };

        if(price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        };

        if(billingCycle.trim() === '') {
            newErrors.billingCycle = 'Billing cycle could not be empty';
        };

        if (nextPaymentDate === '') {
            newErrors.nextPaymentDate = 'Next payment date could not be empty';
        };

        setErrors(newErrors);

        if (
            newErrors.name ||
            newErrors.price ||
            newErrors.billingCycle ||
            newErrors.nextPaymentDate
        ) return;

        if (mode === "create") {
            try {
                await api.post('/subscriptions', {
                    name,
                    price,
                    billingCycle,
                    nextPaymentDate,
                    isActive
                });
                toast.success('Subscription created');
                onSuccess();
            } catch(error) {
                toast.error('Failed to create subscription')
                console.error(error);
            }
        } else {
            if(!subscription) return;
            try {
                await api.patch(`/subscriptions/${subscription?.id}`, {
                    name,
                    price,
                    billingCycle,
                    nextPaymentDate,
                    isActive
                });
                toast.success('Subscription successfully editted');
                onSuccess();
            } catch(error) {
                console.error(error);
            }
        }
    }

    console.log("subscription: ", subscription)

    return (
        <div className="subscription-form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className='entered-data-block'>
                    <label>Name<span className='red-star'>*</span>: </label>
                    <input 
                        className='entered-data-input'
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                    >
                    </input>
                    {errors.name && <p className='error-message'>{errors.name}</p>}              
                </div>
                <div className='entered-data-block'>
                    <label>Price<span className='red-star'>*</span>: </label>
                    <input
                        className='entered-data-input'
                        onChange={(e) => {setPrice(Number(e.target.value))}}
                        value={price}
                    >
                    </input>
                    {errors.price && <p className='error-message'>{errors.price}</p>}                
                </div>
                <div className='entered-data-block'>
                    <label>Billing cycle<span className='red-star'>*</span>: </label>
                    <input
                        className='entered-data-input'
                        onChange={(e) => {setBillingCycle(e.target.value)}}
                        value={billingCycle}
                    >
                    </input>
                    {errors.billingCycle && <p className='error-message'>{errors.billingCycle}</p>}                 
                </div>
                <div className='entered-data-block'>
                    <label>Next Payment Date<span className='red-star'>*</span>: </label>
                    <input
                        className='entered-data-input'
                        onChange={(e) => {setNextPaymentDate(e.target.value)}}
                        type='date'
                        value={nextPaymentDate}
                    >
                    </input>
                    {errors.nextPaymentDate && <p className='error-message'>{errors.nextPaymentDate}</p>}                
                </div>
                <div className='entered-data-block'>
                    <label>Is active: </label>
                    <input
                        className='entered-data-input'
                        checked={isActive}
                        onChange={onChangeIsActive}
                        type='checkbox'
                    >
                    </input>                   
                </div>
                <button className="subscription-form-button" type='submit'>
                    {mode === 'create' ? `Create subscription` : `Edit subscription`}
                </button>
            </form>
        </div>
    );
};

export default SubscriptionForm;