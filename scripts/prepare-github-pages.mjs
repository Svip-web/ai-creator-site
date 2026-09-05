import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/client/', import.meta.url));
const repositoryBasePath = '/ai-creator-site';
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.txt', '.xml']);

async function patchDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      await patchDirectory(path);
      continue;
    }

    if (!textExtensions.has(extname(entry.name))) continue;

    const source = await readFile(path, 'utf8');
    const patched = source
      .replaceAll('/assets/', `${repositoryBasePath}/assets/`)
      .replaceAll('/_next/', `${repositoryBasePath}/_next/`)
      .replaceAll('/favicon.svg', `${repositoryBasePath}/favicon.svg`);
    if (patched !== source) await writeFile(path, patched);
  }
}

await patchDirectory(outputDirectory);
await writeFile(join(outputDirectory, '.nojekyll'), '');
