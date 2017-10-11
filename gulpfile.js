const gulp = require('gulp');
const initGulpTasks = require('react-component-gulp-tasks');
// Read the package.json to detect the package name and dependencies
const pkg = JSON.parse(require('fs').readFileSync('./package.json'));

const taskConfig = {

  component: {
    file: 'ReactTelephoneInput.js',
    // The component name controls the standalone module name
    name: 'ReactTelephoneInput',
    src: 'src',
    dist: 'dist',
    lib: 'lib',
    // This is the name of the package that will be exported
    // by the component file. It must match the name of your
    // package on npm
    pkgName: pkg.name,
    less: {
      path: 'less',
      entry: 'default.less'
    }
  },

  example: {
    src: 'example/src',
    dist: 'example/dist',
    files: [
      'index.html',
      'flags.png',
      '.gitignore'
    ],
    scripts: [
      'example.js'
    ],
    less: [
      'example.less'
    ]
  }

};

initGulpTasks(gulp, taskConfig);
