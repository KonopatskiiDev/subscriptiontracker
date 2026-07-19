import type { ReactNode } from "react";
import './ModalWindowSubscritpionForm.scss';

interface IModalProps {
    children: ReactNode;
    isOpen: boolean;
    mode: string;
    onClose: () => void;
}

const ModalWindowSubscriptionForm = ({isOpen, onClose, children, mode}: IModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    {mode === 'create' ? <h1>Create subscription</h1> : <h1>Edit subscription</h1>}
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