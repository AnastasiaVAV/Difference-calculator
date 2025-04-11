import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

// export default (filepath) => {
//   const fileContent = fs.readFileSync(path.resolve(filepath));
//   return JSON.parse(fileContent);
// };

export default (filepath) => {
  const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const format = path.extname(filepath).slice(1);
  let parse;

  switch (format) {
    case 'json':
      parse = JSON.parse(fileContent);
      break;
    case 'yml':
    case 'yaml':
      parse = yaml.load(fileContent);
      break;
    default:
      break;
  }
  return parse;
};
