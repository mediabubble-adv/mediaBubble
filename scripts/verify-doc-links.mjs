import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ignoreDirs = new Set(['node_modules', '.git', '.next', '.nx', 'tmp', '.agents', '.claude', '.cursor', '.remember', '.kilocode', 'dist']);

function getMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (ignoreDirs.has(file)) continue;
      results = results.concat(getMdFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

function checkLinksInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const brokenLinks = [];

  // Match standard markdown links: [text](path)
  // Negative lookahead to avoid matching web URLs, email, etc.
  const linkRegex = /\[([^\]]+)\]\((?!(?:https?:\/\/|mailto:|tel:|#))([^)]+)\)/g;

  let inCodeBlock = false;
  let codeBlockDelimiter = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for code blocks
    const codeBlockMatch = line.match(/^(\s*)(`{3,4}|~{3,4})/);
    if (codeBlockMatch) {
      const delimiter = codeBlockMatch[2];
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockDelimiter = delimiter;
      } else if (delimiter === codeBlockDelimiter) {
        inCodeBlock = false;
        codeBlockDelimiter = '';
      }
      continue;
    }

    if (inCodeBlock) continue;

    let match;
    // Reset regex state
    linkRegex.lastIndex = 0;
    
    while ((match = linkRegex.exec(line)) !== null) {
      const linkText = match[1];
      let linkTarget = match[2].trim();

      // Strip query params or hash fragments from local file path
      const hashIndex = linkTarget.indexOf('#');
      if (hashIndex !== -1) {
        linkTarget = linkTarget.substring(0, hashIndex);
      }
      const queryIndex = linkTarget.indexOf('?');
      if (queryIndex !== -1) {
        linkTarget = linkTarget.substring(0, queryIndex);
      }

      if (!linkTarget) continue; // Just a hash link, skip

      // Skip file:/// links or resolve them
      let targetPath;
      if (linkTarget.startsWith('file:///')) {
        targetPath = fileURLToPath(linkTarget);
      } else {
        targetPath = path.resolve(path.dirname(filePath), linkTarget);
      }

      // Check existence
      if (!fs.existsSync(targetPath)) {
        brokenLinks.push({
          line: i + 1,
          text: linkText,
          target: linkTarget,
          resolvedPath: targetPath,
        });
      }
    }
  }

  return brokenLinks;
}

function run() {
  console.log(`Scanning Markdown files in: ${rootDir}`);
  const files = getMdFiles(rootDir);
  console.log(`Found ${files.length} markdown files.`);
  
  let totalBroken = 0;
  let filesWithBrokenLinks = 0;

  for (const file of files) {
    const relativeFile = path.relative(rootDir, file);
    const broken = checkLinksInFile(file);
    if (broken.length > 0) {
      console.log(`\n❌ ${relativeFile}:`);
      filesWithBrokenLinks++;
      for (const item of broken) {
        console.log(`  Line ${item.line}: [${item.text}](${item.target}) -> Resolved path doesn't exist: ${item.resolvedPath}`);
        totalBroken++;
      }
    }
  }

  console.log('\n--- Scan Summary ---');
  if (totalBroken === 0) {
    console.log('✅ All local links resolved successfully. No broken links found!');
    process.exit(0);
  } else {
    console.log(`❌ Found ${totalBroken} broken links across ${filesWithBrokenLinks} files.`);
    process.exit(1);
  }
}

run();
