import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';
import ModalWindowSubscriptionForm from '../components/ModalWindow/ModalWindowSubscriptionForm';
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm';
import axios from 'axios';
import toast from 'react-hot-toast';

import './SubscritpionsPage.scss';

const SubscriptionsPage = () => {
    const [subscriptionsList, setSubscriptionsList] = useState<ISubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await api.get('/subscriptions');
            setSubscriptionsList(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)){
                setError('Error has occured: ' + (error.response?.data.message));
            } else {
                toast.error('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSubscriptions();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    if (loading) return <p className="subscriptions-outter-paragraph">Loading...</p>;
    if (error) return <p className="subscriptions-outter-paragraph">{error}</p>;

    return (
        <div className="subscriptions-page-wrapper">
            <h1>
                Subscriptions Page
            </h1>
            {
                subscriptionsList.length > 0 ? (
                    <ul>
                        {subscriptionsList.map(subscription => (
                            <li key={subscription.id}>
                                <Link className="list-link" to={`/subscriptions/${subscription.id}`}>
                                    {subscription.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your have no subscriptions yet</p>
                )
            }

            <button onClick={openModal}>
                Add subscription
            </button>

            <ModalWindowSubscriptionForm
                isOpen={isModalOpen}
                onClose={closeModal}
                mode='create'
            >
                <SubscriptionForm
                    onSuccess={() => {
                        closeModal();
                        getSubscriptions();
                    }}
                    mode='create'
                />
            </ModalWindowSubscriptionForm>
        </div>
        
    )
}

export default SubscriptionsPage