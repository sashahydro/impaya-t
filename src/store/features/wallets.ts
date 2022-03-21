import createFeature from './create-feature';


const walletFtr = createFeature<Wallet>('wallets');


export const {
    createFn: createWallet,
    readFn: getWallets
} = walletFtr;


export default walletFtr.slice.reducer;