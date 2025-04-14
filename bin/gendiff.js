#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../index.js';
import formatter from '../src/formatters/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'formatter')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const format = options.format;
    const diff = gendiff(filepath1, filepath2);
    console.log(formatter(diff, format));
  });

program.parse(process.argv);
