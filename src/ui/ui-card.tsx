import './ui-card.scss';
import UiPaymentLogo from './ui-payment-logo';

export default function UiCard({ card }: {
    card: Card;
}) {
    return (
        <div className="panel ui-card bg-white shadow d-flex flex-column justify-content-between">
            <div className="ui-card-logo d-flex align-items-start justify-content-end">
                <UiPaymentLogo paymentSystem={card.system} />
            </div>

            <div className="ui-card-ps-text mt-auto">{card.system}</div>
            <div className="ui-card-number">{`**** **** **** ${card.card_number}`}</div>
        </div>
    );
}