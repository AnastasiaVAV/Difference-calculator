#!/usr/bin/env node
import { program } from 'commander';
// import app from '../src/index.js';
import parse from '../src/parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const parseFile1 = parse(filepath1);
    const parseFile2 = parse(filepath2);
  })

program.parse(process.argv);