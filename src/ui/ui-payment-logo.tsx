import './ui-payment-logo.scss';

export default function UiPaymentLogo(props: {
    paymentSystem: string;
    size?: string
}) {
    return (
        <div
            className={`ps-logo ps-logo-brand_${props.paymentSystem.toLowerCase()} ps-logo-size_${props.size || 'regular'}`}
            title={props.paymentSystem}>
        </div>
    );
}
