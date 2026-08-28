import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import type { ISubscription } from '../types';
import { formatDate } from '../utils/formatDate';
import './SubscriptionPage.scss'
import ModalWindowSubscriptionForm from '../components/ModalWindow/ModalWindowSubscriptionForm';
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm';
import DeleteSubscriptionForm from '../components/SubscriptionForm/DeleteSubscriptionForm';
import axios from 'axios';
import toast from 'react-hot-toast';

type ModalMode = 'edit' | 'delete';

const SubscriptionPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [subscription, setSubscription] = useState<ISubscription | null>(null);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const openModal = (mode: ModalMode) => {
        if (mode === 'edit') {
            setIsModalOpenEdit(true);
        } else {
            setIsOpenModalDelete(true);
        }
    };

    const closeModal = (mode: ModalMode) => {
        if (mode === 'edit') {
            setIsModalOpenEdit(false);
        } else {
            setIsOpenModalDelete(false);
        }
    };

    const getSubscription = async () => {
        try {
            setLoading(true);
            const resposne = await api.get(`/subscriptions/${id}`);
            console.log(resposne.data);
            setSubscription(resposne.data);
        } catch (error) {
            if (axios.isAxiosError(error)){
                setError('Error has occured: ' + error.response?.data.message);
            } else {
                toast.error('Something went wrong');
            }
            //console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSubscription();
    }, [id]);

    if (!subscription) {
        return <p className="subscription-outter-paragraph">{error}</p>
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="subscription-page-wrapper">
            <h1>
                {subscription.name} Subscription Page
            </h1>
            <p>Cycle: {subscription.billingCycle}</p>
            {subscription.isActive ? <p>Active: Yes</p> : <p>Active: No</p>}
            
            <p>Price: {subscription.price}</p>
            <p>Next Payment Date: {formatDate(subscription.nextPaymentDate)}</p>
            <div className='subscription-actions'>
                <button onClick={() => openModal('edit')}>
                    Edit subscription
                </button>
                <button onClick={() => openModal('delete')}>
                    Delete subscription
                </button>
                <Link className="subscription-page-link" to="/subscriptions">
                    Back to Subscriptions
                </Link>
            </div>
            <ModalWindowSubscriptionForm
                isOpen={isModalOpenEdit}
                onClose={() => closeModal('edit')}
                mode='edit'
            >
                <SubscriptionForm 
                    subscription={subscription}
                    mode='edit'
                    onSuccess={() => {
                        closeModal('edit');
                        getSubscription();
                    }}
                />
            </ModalWindowSubscriptionForm>
            <ModalWindowSubscriptionForm
                isOpen={isOpenModalDelete}
                onClose={() => closeModal('delete')}
                mode='delete'
            >
                <DeleteSubscriptionForm 
                    subscription={subscription}
                    onClose={() => closeModal('delete')}
                    onSuccess={() => {
                        closeModal('delete');
                        navigate('/subscriptions')
                    }}
                />
            </ModalWindowSubscriptionForm>
        </div>
        
    )
}

export default SubscriptionPage