#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const { format } = options;
    console.log(gendiff(filepath1, filepath2, format));
  });

program.parse(process.argv);
