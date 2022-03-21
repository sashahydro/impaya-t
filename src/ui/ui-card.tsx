import './ui-card.scss';
import UiPaymentLogo from './ui-payment-logo';

export default function UiCard({ card }: {
    card: Card;
}) {
    return (
        <div className="panel card bg-white shadow d-flex flex-column justify-content-between">
            <div className="card-logo d-flex align-items-start justify-content-end">
                <UiPaymentLogo paymentSystem={card.system} />
            </div>

            <div className="card-ps-text mt-auto">{card.system}</div>
            <div className="card-number">{`**** **** **** ${card.card_number}`}</div>
        </div>
    );
}