import path from 'path';
import fs from 'fs';

export default (filepath) => {
  const fileContent =fs.readFileSync(path.resolve(filepath));
  return JSON.parse(fileContent);
};
