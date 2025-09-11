import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';

// Kontratlarınızın IDL ve Type dosyalarını import edin
import { DonationPool } from '../../../contracts/target/types/donation_pool';
import idlDonation from '../../../contracts/target/idl/donation_pool.json';
import { NftTracker } from '../../../contracts/target/types/nft_tracker';
import idlTracker from '../../../contracts/target/idl/nft_tracker.json';

// Program ID'lerini .env dosyasından alın (Vite için import.meta.env kullanılır)
const DONATION_POOL_PROGRAM_ID = new PublicKey(import.meta.env.VITE_DONATION_POOL_PROGRAM_ID!);
const NFT_TRACKER_PROGRAM_ID = new PublicKey(import.meta.env.VITE_NFT_TRACKER_PROGRAM_ID!);

export const useAnchor = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const provider = useMemo(() => {
        if (!wallet) {
            return undefined;
        }
        // Kullanıcının cüzdanından bir provider oluşturuluyor
        return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    }, [connection, wallet]);

    const donationPoolProgram = useMemo(() => {
        if (!provider) return undefined;
        return new Program<DonationPool>(idlDonation as any, DONATION_POOL_PROGRAM_ID, provider);
    }, [provider]);

    const nftTrackerProgram = useMemo(() => {
        if (!provider) return undefined;
        return new Program<NftTracker>(idlTracker as any, NFT_TRACKER_PROGRAM_ID, provider);
    }, [provider]);

    return { provider, donationPoolProgram, nftTrackerProgram, wallet };
};