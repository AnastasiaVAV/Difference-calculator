# Вычислитель отличий
[![Actions Status](https://github.com/AnastasiaVAV/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AnastasiaVAV/frontend-project-46/actions)
[![Maintainability](https://qlty.sh/badges/d4da5c3d-049b-4a86-8494-59c54013eeab/maintainability.svg)](https://qlty.sh/gh/AnastasiaVAV/projects/frontend-project-46)
[![test-lint-check](https://github.com/AnastasiaVAV/frontend-project-46/actions/workflows/test-lint-check.yml/badge.svg)](https://github.com/AnastasiaVAV/frontend-project-46/actions/workflows/test-lint-check.yml)

Утилита командной строки, определяющая разницу между двумя структурами данных

## Особенности проекта
- Поддержка разных входных форматов: JSON, YAML, YML
- Форматы вывода: stylish, plain, JSON
- Рекурсивное сравнение структур данных
- Работа через командную строку
- Обработка ошибок и валидация входных данных

## Технологии
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

**Библиотеки:**
- `commander.js` – создания интерфейсов командной строки (CLI)
- `js-yaml` – парсинг YAML файлов
- `lodash` – работа с данными

## Установка и использование
Установка
```bash
git clone git@github.com:AnastasiaVAV/Difference-calculator.git
make install
```

## Демонстрация работы
Использование
```bash
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format: stylish, plain, json (default: "stylish")
  -h, --help           display help for command
```
Примеры
```bash
# Сравнение JSON файлов
gendiff file1.json file2.json

# Сравнение YAML файлов с plain выводом
gendiff --format plain file1.yaml file2.yaml

# Сравнение JSON файлов с json выводом
gendiff --format json file1.json file2.json
```
### Сравнение файлов JSON/yaml
[![asciicast](https://asciinema.org/a/vuTmXCQGBH7EcjWxdXpVBMn4q.svg)](https://asciinema.org/a/vuTmXCQGBH7EcjWxdXpVBMn4q)

### Плоский формат вывода
[![asciicast](https://asciinema.org/a/d2GGJhP3JmfivMyBXgVha8pjb.svg)](https://asciinema.org/a/d2GGJhP3JmfivMyBXgVha8pjb)

### Вывод в формате json
[![asciicast](https://asciinema.org/a/A6IpuQqlKui36qDCw9k4I0Fx8.svg)](https://asciinema.org/a/A6IpuQqlKui36qDCw9k4I0Fx8)
