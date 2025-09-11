const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promise-based exec for async/await
const execPromise = util.promisify(exec);

function commandExists(command) {
  try {
    // execSync, komut bulunamazsa bir hata fırlatır.
    // 'where' Windows için, 'which' ise Linux/macOS için kullanılır.
    const checkCmd = process.platform === 'win32' ? 'where' : 'which';
    require('child_process').execSync(`${checkCmd} ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

if (!commandExists('anchor')) {
    console.error('❌ Hata: `anchor` komutu bulunamadı.');
    console.error('Lütfen Anchor Framework\'ün kurulu ve sistem PATH\'ine ekli olduğundan emin olun.');
    console.error('Detaylı bilgi için: https://www.anchor-lang.com/docs/installation');
    console.error('Kurulum sonrası terminalinizi yeniden başlatmanız veya `source "$HOME/.cargo/env"` komutunu çalıştırmanız gerekebilir (Linux/macOS).');
    process.exit(1);
}

async function main() {
  console.log('🚀 Akıllı kontratların dağıtım süreci başlatılıyor...');

  const projectRoot = path.join(__dirname, '..');
  const contractsDir = path.join(projectRoot, 'contracts');

  // Komutu daha sağlam ve yapılandırmadan bağımsız hale getiriyoruz.
  // Cluster ve cüzdan yolunu açıkça belirtmek, "benim makinemde çalışıyordu" sorunlarını önler.
  const deployCommand = 'anchor deploy --provider.cluster devnet --provider.wallet ~/.config/solana/id.json';

  try {
    console.log(`\n▶️  Komut çalıştırılıyor: ${deployCommand}\n`);
    const { stdout, stderr } = await execPromise(deployCommand, { cwd: contractsDir });

    if (stderr && !stdout.includes('Deploying program')) {
      console.error('Dağıtım sırasında bir hata oluştu:', stderr);
      process.exit(1);
    }

    console.log(stdout);
    console.log('✅ Dağıtım başarılı. Program ID\'leri ayrıştırılıyor...');

    const programIdRegex = /Program Id: (\w+)/g;
    const programNameRegex = /Deploying program "(\w+)"/g;

    const programNames = [...stdout.matchAll(programNameRegex)].map(m => m[1]);
    const programIds = [...stdout.matchAll(programIdRegex)].map(m => m[1]);

    if (programNames.length === 0 || programIds.length === 0) {
      console.error('❌ Hata: Dağıtım çıktısından Program ID\'leri ayrıştırılamadı.');
      return;
    }

    const idMap = {};
    programNames.forEach((name, index) => {
      idMap[name] = programIds[index];
    });

    console.log('\n✍️  .env ve .env.example dosyaları güncelleniyor...');

    const envFilePaths = [
      'frontend/.env.example', 'backend/.env.example',
      'frontend/.env', 'backend/.env',
    ];

    envFilePaths.forEach(envFile => {
      const filePath = path.join(projectRoot, envFile);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        if (idMap.donation_pool) {
          content = content.replace(/(VITE_DONATION_POOL_PROGRAM_ID|DONATION_POOL_PROGRAM_ID)=.*/g, `$1=${idMap.donation_pool}`);
        }
        if (idMap.nft_tracker) {
          content = content.replace(/(VITE_NFT_TRACKER_PROGRAM_ID|NFT_TRACKER_PROGRAM_ID)=.*/g, `$1=${idMap.nft_tracker}`);
        }

        fs.writeFileSync(filePath, content);
        console.log(`   - ✅ Güncellendi: ${envFile}`);
      }
    });

    console.log('\n🎉 Tüm işlemler tamamlandı! Ortam dosyalarınız yeni program ID\'leri ile güncel.');

  } catch (error) {
    console.error('❌ Dağıtım scriptinde beklenmedik bir hata oluştu:');
    console.error(error.stderr || error.message);
    process.exit(1);
  }
}

main();