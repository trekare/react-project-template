'use strict';

const fs = require('fs');
const path = require('path');

function createDirectory(name, basePath) {
  const dir = path.join(basePath, name);
  fs.mkdirSync(dir);
  return dir;
}

function writeFile(content, fileName, basePath) {
  console.log('Creating', fileName);
  return fs.writeFileSync(path.join(basePath, fileName), content);
}

function createPackageJson(name, basePath) {
  const packageJson = JSON.stringify({ name, version: '0.0.0', main: `./${name}` });
  return writeFile(packageJson, 'package.json', basePath);
}

function createComponent(name, basePath) {
  const component = `/* @${'flow'} */
import React from 'react';

import PureComponent from '@src/components/PureComponent';

import styles from './${name}.css';

type Props = {

};

export default class ${name} extends PureComponent {
  props: Props;
  render() {
    return (
      <div className={styles.root}>

      </div>
    );
  }
}
`;
  const fileName = `${name}.js`;
  return writeFile(component, fileName, basePath);
}

function createStyle(name, basePath) {
  const styleSheet = `.root {

}
`;
  const fileName = `${name}.css`;
  return writeFile(styleSheet, fileName, basePath);
}

function getBasePath(componentPath) {
  if (!componentPath) {
    return path.join(__dirname, '..', 'src/components');
  }
  if (componentPath === 'containers') {
    return path.join(__dirname, '..', 'src/containers');
  }
  if (componentPath.indexOf('/src/') === -1) {
    return path.join(__dirname, '..', 'src/components', componentPath);
  }
  return path.resolve(componentPath);
}

module.exports = (name, componentPath) => {
  const basePath = getBasePath(componentPath);
  const dir = createDirectory(name, basePath);
  createPackageJson(name, dir);
  createComponent(name, dir);
  createStyle(name, dir);
  console.log('Created', dir);
};
