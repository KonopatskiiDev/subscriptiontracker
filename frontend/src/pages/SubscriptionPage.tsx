import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';
import { formatDate } from '../utils/formatDate';
import './SubscriptionPage.scss'


const SubscriptionPage = () => {
    const { id } = useParams();
    const [subscription, setSubscription] = useState<ISubscription | null>(null);

    useEffect(() => {
        const getSubscription = async () => {
            const resposne = await api.get(`/subscriptions/${id}`);
            console.log(resposne.data);
            setSubscription(resposne.data);
        };

        getSubscription();
    }, [id]);

    if (!subscription) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>
                {subscription.name} Subscription Page
            </h1>
            <p>Cycle: {subscription.billingCycle}</p>
            {subscription.isActive ? <p>Active: Yes</p> : <p>Active: No</p>}
            
            <p>Price: {subscription.price}</p>
            <p>Next Payment Date: {formatDate(subscription.nextPaymentDate)}</p>
            <div className='subscription-actions'>
                <button>Edit subscription</button>
                <Link to="/subscriptions">
                    Back to Subscriptions
                </Link>
            </div>
        </>
        
    )
}

export default SubscriptionPage