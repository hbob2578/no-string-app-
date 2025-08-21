module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Clean task - remove build directories
    clean: {
      build: ['build/'],
      target: ['target/']
    },
    
    // ESLint task - lint JavaScript files (optional, won't fail build)
    eslint: {
      options: {
        force: true
      },
      source: ['public/*.js', 'server.js', 'index.js']
    },
    
    // Copy task - copy files to build directory
    copy: {
      build: {
        files: [{
          expand: true,
          src: ['public/**', 'server.js', 'index.js', 'package.json'],
          dest: 'build/'
        }]
      }
    },
    
    // Run npm install in build directory
    run: {
      npmInstallInBuild: {
        cmd: 'npm',
        args: ['install'],
        opts: {
          cwd: 'build'
        }
      }
    },
    
    // Get git info
    gitinfo: {},
    
    // Replace tokens in files
    replace: {
      build: {
        src: ['build/**/*.js'],
        overwrite: true,
        replacements: [{
          from: '{{VERSION}}',
          to: '<%= pkg.version %>'
        }]
      }
    },
    
    // Compress build directory
    compress: {
      build: {
        options: {
          archive: 'target/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**']
        }]
      }
    }
  });

  // Load required Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Load the build task from build.js
  require('./build.js')(grunt);

  // Default task
  grunt.registerTask('default', ['build']);

};