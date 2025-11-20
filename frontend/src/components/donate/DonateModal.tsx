import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog.js';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
    NetworkBitcoin,
    NetworkEthereum,
    NetworkTron,
    NetworkBinanceSmartChain,
    NetworkSolana
} from '@web3icons/react';

interface DonateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
    const cryptoGroups = [
        {
            network: 'Bitcoin',
            icon: <NetworkBitcoin className="w-6 h-6" />,
            addresses: [
                { label: 'BTC', address: 'bc1qv3jlaq8u5jvcfd3ur9ew4dr98eg7f6lqpaag03' }
            ]
        },
        {
            network: 'Ethereum',
            icon: <NetworkEthereum className="w-6 h-6" />,
            addresses: [
                { label: 'ETH / USDT (ERC-20)', address: '0x4ef10f4a369d5d85ea3e64ec5acbf5fd6b3cedaf' }
            ]
        },
        {
            network: 'Binance Smart Chain',
            icon: <NetworkBinanceSmartChain className="w-6 h-6" />,
            addresses: [
                { label: 'BNB / USDT (BEP-20)', address: '0x4eF10F4a369d5d85Ea3E64Ec5ACbF5Fd6B3CEdaF' }
            ]
        },
        {
            network: 'Tron',
            icon: <NetworkTron className="w-6 h-6" />,
            addresses: [
                { label: 'TRX', address: 'TX88qET5JLUd7WmbAF6S4NJoZmdXHeKQVd' }
            ]
        },
        {
            network: 'Solana',
            icon: <NetworkSolana className="w-6 h-6" />,
            addresses: [
                { label: 'SOL', address: '9Dpbj7RGWbLXdwX7nyfHDcUr6p7GAoffbzVkDjYzdyC9' }
            ]
        }
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Address copied to clipboard!");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md z-[99999] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Support the Project</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <p className="text-center text-muted-foreground">
                        If you find this tool useful, please consider supporting us with a cryptocurrency donation.
                    </p>

                    <div className="space-y-6">
                        {cryptoGroups.map((group) => (
                            <div key={group.network} className="space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    {group.icon}
                                    <h4 className="font-semibold text-primary">{group.network}</h4>
                                </div>
                                {group.addresses.map((crypto) => (
                                    <div key={crypto.label} className="space-y-1 ml-2">
                                        <label className="text-xs font-medium text-muted-foreground">{crypto.label}</label>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 p-2 bg-secondary rounded-md font-mono text-xs break-all border border-border">
                                                {crypto.address}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(crypto.address)}
                                                className="p-2 hover:bg-secondary rounded-md transition-colors"
                                                title="Copy Address"
                                            >
                                                <Copy className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
                        <p className="text-sm text-center text-primary font-medium">
                            Please include your name in the transaction notes if you'd like to be recognized!
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
