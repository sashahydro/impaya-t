import React, {
    useMemo,
    useState
} from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/modal';
import BootstrapForm from 'react-bootstrap/form';
import UiFormGroup from '../ui/ui-form-group';
import store from '../store/store';
import { useDispatch } from '../store/hooks';
import { createWallet } from '../store/features/wallets';

interface AddWalletProps {
    isShown: boolean;
    onHide: () => void;
}



export default function AddWallet({
    isShown,
    onHide
}: AddWalletProps) {
    const dispatch = useDispatch();
    const { currencies } = store.getState();
    const currencyOptions = Object.values(currencies);

    const [title, setTitle] = useState('');
    const [titleTouched, setTitleTouched] = useState(false);
    const [amount, setAmount] = useState(0);
    const [amountTouched, setAmountTouched] = useState(false);
    const defaultCurrency = currencyOptions.find((cur) => cur.key === 'rub')?.id;
    const [selectedCurrency, setCurrency] = useState(defaultCurrency);
    const [selectedCurrencyTouched, setSelectedCurrencyTouched] = useState(false);





    // VALIDATION
    const titleValidState: null | string = useMemo(() => {
        const _title = title.trim();

        if (!_title.length) {
            return 'Наименование должно быть заполнено';
        }

        return null;
    }, [title]);

    const amountValidState: null | string = useMemo(() => {
        if (Number.isNaN(amount)) {
            return 'Невалидное значение';
        } else if (amount <= 0) {
            return 'Сумма должна быть больше 0';
        }

        return null;
    }, [amount]);

    const currencyValidState: null | string = useMemo(() => {
        if (!selectedCurrency || !Object.prototype.hasOwnProperty.call(currencies, selectedCurrency)) {
            return 'Выберите значение из списка';
        }

        return null;
    }, [selectedCurrency, currencies]);

    const isFormValid = useMemo(() => (
        [
            titleValidState,
            currencyValidState,
            amountValidState
        ].every((state) => !state)
    ), [
        titleValidState,
        currencyValidState,
        amountValidState
    ]);




    // Event handlers
    function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
        setTitleTouched(true);
    }

    function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(parseFloat(e.currentTarget.value));
        setAmountTouched(true);
    }

    function onSelectedCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCurrency(e.target.value);
        setSelectedCurrencyTouched(true);
    }

    async function addWallet(e: React.SyntheticEvent) {
        e.preventDefault();

        if (!isFormValid) return;

        // already checked in currencyValidState hook
        const currency = currencies[selectedCurrency!];

        const wallet: Omit<Wallet, 'id'> = {
            title: title.trim(),
            balance: amount.toFixed(2),
            currency
        };

        try {
            await dispatch(createWallet(wallet));

            onHide();
            onFormClose();
        } catch (e) {
            // handle error
        }
    }



    function onFormClose() {
        setTitle('');
        setAmount(0);
        setCurrency(defaultCurrency);

        [setAmountTouched, setSelectedCurrencyTouched, setTitleTouched].forEach((cb) => cb(false));
    }




    /* RENDER */
    return (
        <BootstrapModal
            show={isShown}
            keyboard
            onHide={onHide}>
            <BootstrapModal.Header closeButton>Добавить кошелек</BootstrapModal.Header>

            <BootstrapModal.Body>
                <BootstrapForm onSubmit={addWallet}>
                    <UiFormGroup controlId="walletTitle">
                        <span>Наименование</span>
                        <BootstrapForm.Control
                            value={title}
                            isInvalid={!!titleValidState && titleTouched}
                            onChange={onTitleChange}
                        />

                        {titleValidState}
                    </UiFormGroup>

                    <UiFormGroup
                        controlId="walletCurrency">
                        <span>Валюта</span>
                        <BootstrapForm.Select
                            isInvalid={!!currencyValidState && selectedCurrencyTouched}
                            value={selectedCurrency}
                            onChange={onSelectedCurrencyChange}>
                            {currencyOptions.map((currency) => (
                                <option
                                    key={currency.id}
                                    value={currency.id}>
                                    {currency.key.toUpperCase()}
                                </option>
                            ))}
                        </BootstrapForm.Select>

                        {currencyValidState}
                    </UiFormGroup>

                    <UiFormGroup controlId="">
                        <span>Сумма</span>
                        <BootstrapForm.Control
                            type="number"
                            min={0}
                            isInvalid={!!amountValidState && amountTouched}
                            value={amount}
                            onChange={onAmountChange}
                        />

                        {amountValidState}
                    </UiFormGroup>

                    <div className="mt-5 text-center">
                        <BootstrapButton
                            disabled={!isFormValid}
                            type="submit"
                            variant="info">
                            Сохранить
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
