import { readdir, stat, rename } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function normalizeDirectoryNames(dir) {
  try {
    const items = await readdir(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        // Convert to kebab-case
        const normalizedName = item
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase();
        
        if (item !== normalizedName) {
          await rename(fullPath, join(dir, normalizedName));
        }
        
        await normalizeDirectoryNames(join(dir, normalizedName));
      }
    }
  } catch (error) {
    console.error(`Error normalizing directory names: ${error.message}`);
  }
}

export { normalizeDirectoryNames }; 