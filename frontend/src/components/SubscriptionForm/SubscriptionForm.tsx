import { useState } from 'react';
import { api } from '../../api/api';
import './SubscriptionForm.scss';


interface ISubscriptionFormProps {
    onSuccess: () => void;
}

const SubscriptionForm = ({onSuccess}: ISubscriptionFormProps) => {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [billingCycle, setBillingCycle] = useState('');
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='entered-data-block'>
                    <label>Name: </label>
                    <input 
                        onChange={(e) => {setName(e.target.value)}}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Price: </label>
                    <input
                        onChange={(e) => {setPrice(Number(e.target.value))}}
                    >
                    </input>                   
                </div>
                <div className='entered-data-block'>
                    <label>Billing cycle: </label>
                    <input
                        onChange={(e) => {setBillingCycle(e.target.value)}}
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
                        onChange={(e) => setIsActive(e.target.checked)}
                        type='checkbox'
                    >
                    </input>                   
                </div>
                {/* <div>
                    <label>Active</label>                   
                </div> */}
                <button type='submit'>
                    Create subscription
                </button>
            </form>
        </div>
    );
};

export default SubscriptionForm;