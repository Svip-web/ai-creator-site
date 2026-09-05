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
      .replaceAll(/(?<!\/ai-creator-site)\/assets\//g, `${repositoryBasePath}/assets/`)
      .replaceAll(/(?<!\/ai-creator-site)\/_next\//g, `${repositoryBasePath}/_next/`)
      .replaceAll(/(?<!\/ai-creator-site)\/favicon\.svg/g, `${repositoryBasePath}/favicon.svg`);
    if (patched !== source) await writeFile(path, patched);
  }
}

await patchDirectory(outputDirectory);
await writeFile(join(outputDirectory, '.nojekyll'), '');
