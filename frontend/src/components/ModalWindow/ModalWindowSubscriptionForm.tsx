import type { ReactNode } from "react";
import './ModalWindowSubscritpionForm.scss';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ModalWindowSubscriptionForm = ({isOpen, onClose, children}: IModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h1>Insert data for the subscription</h1>
                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                
                {children}
            </div>
        </div>
    )
};

export default ModalWindowSubscriptionForm;