 use anchor_lang::prelude::*;
 
 #[event]
 pub struct DonationReceived {
     pub donor: Pubkey,
     pub amount: u64,
     pub total_donated: u64,
 }
 
 #[event]
 pub struct WithdrawalProposed {
     pub proposer: Pubkey,
     pub proposal_index: u64,
     pub amount: u64,
     pub recipient: Pubkey,
 }
 
 #[event]
 pub struct ProposalApproved {
     pub approver: Pubkey,
     pub proposal_index: u64,
 }
 
 #[event]
 pub struct ProposalExecuted {
     pub executor: Pubkey,
     pub proposal_index: u64,
     pub amount: u64,
     pub recipient: Pubkey,
 }