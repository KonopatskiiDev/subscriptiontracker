import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';

const SubscriptionsPage = () => {
    const [subscriptionsList, setSubscriptionsList] = useState<ISubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                setLoading(true);
                const response = await api.get('/subscriptions');
                setSubscriptionsList(response.data);
            } catch (error) {
                setError('Error has occured: ' + error);
            } finally {
                setLoading(false);
            }
        }

        getSubscriptions();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>
                Subscriptions Page
            </h1>
            {
                subscriptionsList.length > 0 ? (
                    <ul>
                        {subscriptionsList.map(subscription => (
                            <li key={subscription.id}>
                                <Link to={`/subscriptions/${subscription.id}`}>
                                    {subscription.name}
                                </Link>
                            </li>
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