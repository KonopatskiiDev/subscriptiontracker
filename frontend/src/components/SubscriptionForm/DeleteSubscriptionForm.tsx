//import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import './DeleteSubscriptionForm.scss';
import type { ISubscription } from '../../types';
import toast from 'react-hot-toast';

interface ISubscriptionFormProps {
    subscription?: ISubscription;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteSubscriptionForm = ({
    subscription,
    onClose,
    onSuccess
}: ISubscriptionFormProps) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await api.delete(`/subscriptions/${subscription?.id}`, {
                
            });
            toast.success('Subscription has been successfully deleted');
            onSuccess();
        } catch(error) {
            console.error(error)
        }

    }

    return (
        <form className="delete-form-wrapper" onSubmit={handleSubmit}>
            <div className="base-information">
                <h3>Are you sure that you want to delete subscription: {`"${subscription?.name}"`} with following data: </h3>
                <p>Price: {subscription?.price}</p>
                <p>Next payment date: {subscription ? new Date(subscription.nextPaymentDate).toISOString().slice(0, 10) : ""}</p>
                <p></p>
            </div>
            <div className="button-wrapper">
                <button 
                    className="cancel-button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    className="delete-button"
                    type="submit"
                >
                    Delete
                </button>
            </div>
        </form>
    )
}

export default DeleteSubscriptionForm;