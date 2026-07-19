import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';
import { formatDate } from '../utils/formatDate';
import './SubscriptionPage.scss'
import ModalWindowSubscriptionForm from '../components/ModalWindow/ModalWindowSubscriptionForm';
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm';


const SubscriptionPage = () => {
    const { id } = useParams();
    const [subscription, setSubscription] = useState<ISubscription | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

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
                <button onClick={openModal}>
                    Edit subscription
                </button>
                <Link to="/subscriptions">
                    Back to Subscriptions
                </Link>
            </div>
            <ModalWindowSubscriptionForm
                isOpen={isModalOpen}
                onClose={closeModal}
                mode='edit'
            >
                <SubscriptionForm 
                    // subscriptonName={subscription.name}
                    // subscriptonPrice={subscription.price}
                    // subscriptonBillingCycle={subscription.billingCycle}
                    // subscriptonNextPaymentDate={formatDate(subscription.nextPaymentDate)}
                    // subscriptonIsActive={subscription.isActive}
                    subscription={subscription}
                    mode='edit'
                    onSuccess={() => {
                        closeModal();
                        //getSubscriptions();
                    }}
                />
            </ModalWindowSubscriptionForm>
        </>
        
    )
}

export default SubscriptionPage