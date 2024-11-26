import Web3, { HexString, Numbers } from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';

export const balanceAbi = {
    name: 'balanceOf',
    type: 'function',
    inputs: [
        {
            type: 'address',
            name: '_owner',
        },
    ],
};

export const readBalanceAbi = [
    {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: '_owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
    },
];

export const beautifyBalance = (
    web3: Web3<RegisteredSubscription>,
    balanceResponse: HexString
) => {
    const decoded = web3.eth.abi.decodeParameters(
        readBalanceAbi[0].outputs,
        balanceResponse
    );

    const balance = decoded.balance as Numbers;

    const humanReadableBalance = web3.utils.fromWei(balance, 'ether');
    return humanReadableBalance;
};
