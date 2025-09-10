import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useMemo } from 'react';
import idl from '../idl/donation_pool.json';

// Program ID'sini .env dosyasından alıyoruz.
const programIdString = import.meta.env.VITE_DONATION_POOL_PROGRAM_ID;
if (!programIdString) {
  throw new Error("VITE_DONATION_POOL_PROGRAM_ID .env dosyasında tanımlı değil!");
}
const programId = new PublicKey(programIdString);

export const useDonationProgram = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    // IDL dosyasını ve program ID'sini kullanarak programı başlatıyoruz.
    return new Program(idl as any, programId, provider);
  }, [provider]);

  const donate = async (amount: number) => {
    if (!program || !wallet) {
      throw new Error("Program veya cüzdan başlatılamadı.");
    }

    // !! KRİTİK ADIM !!
    // Bu adres, `anchor deploy` sonrası oluşan `donation_pool` data account adresidir.
    const donationPoolAddress = "LÜTFEN_KENDİ_DONATION_POOL_HESAP_ADRESİNİZİ_BURAYA_YAZIN";
    if (donationPoolAddress.startsWith("LÜTFEN")) {
      throw new Error("Kritik Hata: `useDonationProgram.ts` dosyasında `donationPoolAddress` tanımlanmamış!");
    }
    const donationPoolAccount = new PublicKey(donationPoolAddress);

    const lamports = new BN(amount * LAMPORTS_PER_SOL);

    const txSignature = await program.methods.donate(lamports).accounts({
      donationPool: donationPoolAccount,
      donor: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).rpc();

    return txSignature;
  };

  return { donate, program };
};