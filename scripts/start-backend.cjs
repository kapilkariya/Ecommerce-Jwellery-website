const { spawnSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'Backend');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

for (const args of [['install'], ['start']]) {
  const result = spawnSync(npmCmd, args, {
    cwd: backendDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
