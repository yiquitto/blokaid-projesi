const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting smart contract deployment...');

const deployCommand = 'pnpm --filter contracts exec anchor deploy';

exec(deployCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Deployment Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Deployment Stderr: ${stderr}`);
  }

  console.log('✅ Deployment successful. Parsing program IDs...');
  console.log(stdout);

  const programIdRegex = /Program Id: (\w+)/g;
  const programNameRegex = /Deploying program "(\w+)"/g;

  const programNames = [...stdout.matchAll(programNameRegex)].map(m => m[1]);
  const programIds = [...stdout.matchAll(programIdRegex)].map(m => m[1]);

  if (programNames.length === 0 || programIds.length === 0 || programNames.length !== programIds.length) {
    console.error('Could not parse program IDs from deployment output.');
    return;
  }

  const idMap = {};
  programNames.forEach((name, index) => {
    idMap[name] = programIds[index];
  });

  console.log('Updating .env and .env.example files...');

  const envFilePaths = [
    'frontend/.env.example',
    'backend/.env.example',
    'frontend/.env',
    'backend/.env',
  ];

  envFilePaths.forEach(envFile => {
    const filePath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      if (idMap.donation_pool) {
        content = content.replace(/(VITE_DONATION_POOL_PROGRAM_ID|DONATION_POOL_PROGRAM_ID)=.*/g, `$1=${idMap.donation_pool}`);
      }
      if (idMap.nft_tracker) {
        content = content.replace(/(VITE_NFT_TRACKER_PROGRAM_ID|NFT_TRACKER_PROGRAM_ID)=.*/g, `$1=${idMap.nft_tracker}`);
      }

      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${envFile}`);
    }
  });

  console.log('\n🎉 All done! Your environment files are now up-to-date with the new program IDs.');
});