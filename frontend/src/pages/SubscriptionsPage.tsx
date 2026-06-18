import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';

const SubscriptionsPage = () => {
    const [subscriptionsList, setSubscriptionsList] = useState<ISubscription[]>([]);

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const response = await api.get('/subscriptions');
                setSubscriptionsList(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getSubscriptions();
    }, [])

    return (
        <>
            <h1>
                Subscriptions Page
            </h1>
            {
                subscriptionsList.length > 0 ? (
                    <ul>
                        {subscriptionsList.map(subscription => (
                            <Link to={`/subscriptions/${subscription.id}`}>
                                <li key={subscription.id}>{subscription.name}</li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>Your have no subscriptions yet</p>
                )
            }

            
            {/* <Link to="/subscriptions">
                Railway
            </Link> */}
        </>
        
    )
}

export default SubscriptionsPage