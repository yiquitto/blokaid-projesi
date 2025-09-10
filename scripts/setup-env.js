const fs = require('fs');
const path = require('path');

const filesToCopy = [
  {
    source: 'frontend/.env.example',
    dest: 'frontend/.env',
  },
  {
    source: 'backend/.env.example',
    dest: 'backend/.env',
  },
];

filesToCopy.forEach(({ source, dest }) => {
  const sourcePath = path.join(__dirname, '..', source);
  const destPath = path.join(__dirname, '..', dest);

  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Created ${dest}`);
  } else {
    console.log(`🟡 ${dest} already exists. Skipping.`);
  }
});

console.log('\nEnvironment setup complete.');