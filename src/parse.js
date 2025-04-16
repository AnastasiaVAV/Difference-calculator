import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const format = path.extname(filepath).slice(1);

  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
    case 'yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};
