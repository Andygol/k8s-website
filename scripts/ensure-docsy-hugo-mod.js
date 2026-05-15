#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const docsyDir = path.join(rootDir, 'node_modules', 'docsy');
const mkdirScript = path.join(docsyDir, 'scripts', 'mkdirp-hugo-mod.js');

if (!fs.existsSync(mkdirScript)) {
  console.log('[docsy] Skipping Hugo module directory setup: Docsy helper script not found.');
  process.exit(0);
}

console.log('[docsy] Ensuring Hugo module placeholder directories exist...');

const result = spawnSync(process.execPath, [mkdirScript, '..'], {
  cwd: docsyDir,
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status || 1);
}
