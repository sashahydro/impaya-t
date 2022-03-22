import { useState } from "react";
import UiCard from "../ui/ui-card";
import UiWallet from "../ui/ui-wallet";
import AddWallet from "./add-wallet";
import AddCard from './add-card';
import './home-view.scss';
import { useSelector } from "../store/hooks";

export default function HomeView() {
    const [isAddCardShown, showAddCard] = useState(false);
    const [isAddWalletShown, showAddWallet] = useState(false);


    const wallets = useSelector(state => state.wallets);
    const cards = useSelector(state => state.cards);

    const walletsArr = Object.values(wallets);
    const cardsArr = Object.values(cards);

    const ADD_WALLET_TEXT = 'Добавить кошелек';


    const renderAddBtn = (text: string, ti: number, showFn: typeof showAddCard) => (
        <div
            className="panel add-tender-btn"
            tabIndex={ti}
            role="button"
            onClick={() => {
                showFn(true);
            }}>
            <div className="add-tender-btn_plus">+</div>
            <div className="add-tender-btn_text">{text}</div>
        </div>
    );

    console.log(cards)

    return (
        <section>
            <h3 className="mt-0">Мои кошельки</h3>
            <div className="row d-flex flex-wrap gy-4">
                {walletsArr.map((wallet) => (
                    <div
                        className="col-auto"
                        key={wallet.id}>
                        <UiWallet wallet={wallet} />
                    </div>
                ))}

                <div className="col-auto d-flex">
                    {renderAddBtn(ADD_WALLET_TEXT, 1, showAddWallet)}
                </div>
            </div>


            <AddWallet
                isShown={isAddWalletShown}
                onHide={() => { showAddWallet(false); }}
            />







            <h3 className="home-view-sections-gap">Мои карты</h3>
            <div className="row d-flex flex-wrap gy-4">
                {cardsArr.map((card) => (
                    <div
                        className="col-auto"
                        key={card.id}>
                        <UiCard card={card} />
                    </div>
                ))}

                <div className="col-auto d-flex">
                    {renderAddBtn('Добавить карту', 2, showAddCard)}
                </div>
            </div>

            <AddCard
                isShown={isAddCardShown}
                onHide={() => { showAddCard(false); }}
            />
        </section>
    );
}
