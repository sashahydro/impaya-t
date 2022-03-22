import debounce from 'lodash.debounce';
import React, {
    useMemo,
    useState
} from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/modal';
import BootstrapForm from 'react-bootstrap/form';
import UiFormGroup from '../ui/ui-form-group';
import { useDispatch } from '../store/hooks';
import UiPaymentLogo from '../ui/ui-payment-logo';
import UiMaskedInput from '../ui/ui-masked-input';
import getCardSystemByINN from '../utils/get-card-system';
import isValidCardLuhn from '../utils/is-valid-card-luhn';
import isValidCardExpiresDate from '../utils/is-valid-card-expires';
import { createCard } from '../store/features/cards';
import { Props } from 'react-input-mask';
import useFocus from '../utils/use-focus';

interface AddCardProps {
    isShown: boolean;
    onHide: () => void;
}

const HOLDER_REGEXP = /[a-zA-Z\s-~'`.]{3,48}/;
const CLEAN_CARD_NUM_REGEXP = /[^\d]/g;
const FIXED_CARD_NUM_LENGTH = 16;

const EXPIRES_MONTH_MASK = [/0|1/, /[0-9]/];
const EXPIRES_YEAR_MASK = [/[2-9]/, /[0-9]/];
const CARD_NUMBER_MASK = '9999 9999 9999 9999';


const beforeMonthMaskChange: Props['beforeMaskedStateChange'] = function({ previousState, currentState, nextState }) {
    let { value } = nextState;
    const f = value[0];
    const s = value[1];

    if (
        (f === '0' && s === '0') ||
        (f === '1' && s !== '0' && s !== '1' && s !== '2')
    ) {
        value = value.slice(0, -1) + '_';
    }

    return {
        ...nextState,
        value
    };
}




export default function AddCard({
    isShown,
    onHide
}: AddCardProps) {
    const dispatch = useDispatch();

    const [inProgress, setInProgress] = useState(false);
    const [holder, setHolder] = useState('');
    const [isHolderValid, setIsHolderValid] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [expiresMonth, setExpiresMonth] = useState('');
    const [expiresYear, setExpiresYear] = useState('');
    const [isExpiresValid, setIsExpiresValid] = useState(false);


    

    // for auto-focus on date inputs
    const [expiresMonthInput, focusMonth] = useFocus();
    const [expiresYearInput, focusYear] = useFocus();




    /* card system */
    const cardSystem = useMemo(() => {
        return getCardSystemByINN(cardNumber);
    }, [cardNumber])



    /* VALIDATORS */
    const validateHolder = (h: string): void => {
        setIsHolderValid(HOLDER_REGEXP.test(h.trim()));
    };

    const validateHolderDebounced = useMemo(() => debounce(validateHolder, 500), []);



    const validateCardNumber = (n: string): void => {
        let _n = n.replace(CLEAN_CARD_NUM_REGEXP, '');

        setIsCardNumberValid(_n.length === FIXED_CARD_NUM_LENGTH && isValidCardLuhn(_n));
    };

    const validateCardNumberDebounced = useMemo(() => debounce(validateCardNumber, 1000), []);



    const validateCardExpires = (mm: string, yy: string): void => {
        setIsExpiresValid(isValidCardExpiresDate(mm, yy));
    };


    const isFormValid = useMemo(() => (
        isHolderValid && isCardNumberValid && isExpiresValid && (cardSystem !== null)
    ), [
        isHolderValid,
        isCardNumberValid,
        isExpiresValid,
        cardSystem
    ]);








    /* EVENT HANDLERS */
    function trySwitchToNext(maxL: number, currentVal: string, focusFn: () => void) {
        if (currentVal.replace(/_/g, '').length === maxL) {
            focusFn();
        }
    }


    function updateHolder(e: InputChangeEvent): void {
        const val = e.target.value;

        setHolder(val.toUpperCase());

        validateHolderDebounced(val);
    }

    function updateCardNumber(e: InputChangeEvent): void {
        const val = e.target.value;

        setCardNumber(val);

        validateCardNumberDebounced(val);

        trySwitchToNext(CARD_NUMBER_MASK.length, val, focusMonth);
    }

    function updateExpiresMonth(e: InputChangeEvent): void {
        const val = e.target.value;

        setExpiresMonth(val);

        validateCardExpires(val, expiresYear);

        trySwitchToNext(2, val, focusYear);
    }

    function updateExpiresYear(e: InputChangeEvent): void {
        const val = e.target.value;

        setExpiresYear(val);

        validateCardExpires(expiresMonth, val);
    }



    function clearData(): void {
        setHolder('');
        setCardNumber('');
        setExpiresMonth('');
        setExpiresYear('');

        [
            setIsHolderValid,
            setIsCardNumberValid,
            setIsExpiresValid
        ].forEach((cb) => cb(false));
    }

    async function addCard(e: React.SyntheticEvent): Promise<void> {
        e.preventDefault();


        if (inProgress || !isFormValid) return;

        setInProgress(true);

        const card: Omit<Card, 'id'> = {
            system: cardSystem!,
            card_expire: `${expiresMonth}/${expiresYear}`,
            card_holder: holder,
            card_number: cardNumber.slice(-4)
        };

        try {
            dispatch(createCard(card));

            onHide();
            clearData();
        } catch (e) {
            // handle error
            console.error(e);
        }

        setInProgress(false);
    }

    /* RENDER */
    return (
        <BootstrapModal
            show={isShown}
            keyboard
            onHide={onHide}>
            <BootstrapModal.Header closeButton>
                <div className="modal-h-custom">Добавить карту</div>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                <BootstrapForm onSubmit={addCard}>
                    <div className="row mb-4">
                        <div className="col-12 offset-md-4 col-md-6">
                            {cardSystem && <UiPaymentLogo paymentSystem={cardSystem.toLowerCase()} />}
                        </div>
                    </div>

                    <UiFormGroup controlId="name">
                        <span>Владелец</span>
                        <BootstrapForm.Control
                            autoFocus
                            isValid={isHolderValid}
                            placeholder="ИМЯ ФАМИЛИЯ"
                            value={holder}
                            onChange={updateHolder}
                        />
                    </UiFormGroup>

                    <UiFormGroup controlId="cardnumber">
                        <span>Номер карты</span>

                        <UiMaskedInput
                            inputMode="numeric"
                            isValid={isCardNumberValid}
                            mask={CARD_NUMBER_MASK}
                            value={cardNumber}
                            onChange={updateCardNumber}
                        />
                    </UiFormGroup>

                    <UiFormGroup controlId="cardExpires">
                        <span>Дата (ММ/ГГ)</span>

                        <div className="row">
                            <div className="col">
                                <UiMaskedInput
                                    ref={expiresMonthInput}
                                    inputMode="numeric"
                                    isValid={isExpiresValid}
                                    mask={EXPIRES_MONTH_MASK}
                                    placeholder="ММ"
                                    value={expiresMonth}
                                    onChange={updateExpiresMonth}
                                    beforeMaskedStateChange={beforeMonthMaskChange}
                                />
                            </div>
                            <div className="col">
                                <UiMaskedInput
                                    ref={expiresYearInput}
                                    inputMode="numeric"
                                    isValid={isExpiresValid}
                                    mask={EXPIRES_YEAR_MASK}
                                    placeholder="ГГ"
                                    value={expiresYear}
                                    onChange={updateExpiresYear}
                                />
                            </div>
                        </div>
                    </UiFormGroup>


                    <div className="mt-5 text-center">
                        <BootstrapButton
                            disabled={!isFormValid}
                            type="submit"
                            variant="info">
                            Добавить
                        </BootstrapButton>

                        <BootstrapButton
                            className="ms-3"
                            type="button"
                            variant="light">
                            Отмена
                        </BootstrapButton>
                    </div>
                </BootstrapForm>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
}
