import stylish from './stylish.js';
import plain from './plain.js';

export default (obj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    default:
      return stylish(obj);
  }
};
