import './ui-wallet.scss';

export default function UiWallet({ wallet }: {
    wallet: Wallet;
}) {
    const balanceFz = (n: string): string => {
        const l = (+n).toLocaleString().length;

        let fz = '24';

        if (l > 17) {
            fz = '14';
        } else if (l > 15) {
            fz = '16';
        } else if (l > 13) {
            fz = '18';
        } else if (l > 11) {
            fz = '20';
        }

        return `${fz}px`;
    };

    return (
        <div className="panel d-flex flex-column wallet">
            <div className="d-flex align-items-center justify-content-between">
                <span
                    className="wallet-title text-overflow-ellipsis"
                    title={wallet.title}>
                    {wallet.title}
                </span>
                <span className="wallet-cur-sign">{wallet.currency.sign_unicode}</span>
            </div>

            <div
                className="wallet-balance mt-auto"
                style={{
                fontSize: balanceFz(wallet.balance)
            }}>
                {(+wallet.balance).toLocaleString()}
            </div>

            <div className="wallet-currency">
                <span>Валюта:</span>
                <span className="ms-1">{wallet.currency.key.toUpperCase()}</span>
            </div>
        </div>
    );
}
