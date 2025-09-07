 use anchor_lang::prelude::*;
 
 #[error_code]
 pub enum TrackerError {
     #[msg("The package has already been marked as delivered and cannot be updated.")]
     PackageAlreadyDelivered,
 }