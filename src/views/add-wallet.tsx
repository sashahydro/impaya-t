import { useState } from 'react';
import BootstrapModal from 'react-bootstrap/modal';
import BootstrapForm from 'react-bootstrap/form';

interface AddWalletProps {
    isShown: boolean;
    onHide: () => void;
}

export default function AddWallet({
    isShown,
    onHide
}: AddWalletProps) {
    const [title, setTitle] = useState('');

    return (
        <BootstrapModal
            show={isShown}
            keyboard
            onHide={onHide}>
            <BootstrapModal.Header closeButton>Добавить кошелек</BootstrapModal.Header>
            <BootstrapModal.Body>
                <BootstrapForm.Group controlId="walletTitle">
                    <div className="row">
                        <div className="col-12 col-md-5 text-align-end">
                            <BootstrapForm.Label>Наименование</BootstrapForm.Label>
                        </div>
                        <div className="col-12 col-md-7">
                            <BootstrapForm.Control
                                value={title}
                                onChange={(e) => { setTitle(e.currentTarget.value) }}
                            />
                        </div>
                    </div>
                </BootstrapForm.Group>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
}
