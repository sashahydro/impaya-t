import React, {
    useMemo,
    useState
} from 'react';
import debounce from 'lodash.debounce';
import BootstrapButton from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/modal';
import BootstrapForm from 'react-bootstrap/form';
import UiFormGroup from '../ui/ui-form-group';
import store from '../store/store';
import { useDispatch } from '../store/hooks';
import UiPaymentLogo from '../ui/ui-payment-logo';
import getCardSystemByINN from '../utils/get-card-system';

interface AddCardProps {
    isShown: boolean;
    onHide: () => void;
}

const HOLDER_REGEXP = /[a-zA-Z\s-~'`.]{3,48}/;

export default function AddCard({
    isShown,
    onHide
}: AddCardProps) {
    const [holder, setHolder] = useState('');
    const [holderTouched, setHolderTouched] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');




    const cardSystem = useMemo(() => {
        return getCardSystemByINN(cardNumber);
    }, [cardNumber])




    /* VALIDATORS */
    const isHolderValid = useMemo(debounce(() => {
        return HOLDER_REGEXP.test(holder);
    }, [holder]), 1000);



    /* EVENT HANDLERS */
    function updateHolder(e: React.ChangeEvent<HTMLInputElement>) {
        setHolder(e.currentTarget.value);
    }



    function addCard(e: React.SyntheticEvent) {

    }


    /* RENDER */
    return (
        <BootstrapModal
            show={isShown}
            keyboard
            onHide={onHide}>
            <BootstrapModal.Header closeButton>
                Добавить карту
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                <BootstrapForm onSubmit={addCard}>
                    <div className="mb-4">
                        {cardSystem && <UiPaymentLogo paymentSystem={cardSystem} />}
                    </div>

                    <UiFormGroup controlId="holder">
                        <span>Владелец</span>
                        <BootstrapForm.Control
                            isInvalid={}
                            placeholder="ИМЯ ФАМИЛИЯ"
                            value={holder}
                            onChange={updateHolder}
                        />
                    </UiFormGroup>
                </BootstrapForm>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
}
function debounce(arg0: () => boolean, arg1: string[]): () => unknown {
    throw new Error('Function not implemented.');
}

