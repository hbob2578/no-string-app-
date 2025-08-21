module.exports = function (grunt) {

  grunt.registerTask('build', [
    'clean:build',
    'clean:target',
    'copy:build',
    'run:npmInstallInBuild',
    'gitinfo',
    'replace:build',
    'compress:build'
  ]);

};
