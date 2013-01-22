module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> | <%= pkg.license %> License %> */\n',
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['src/*.js'],
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        mocha: {
            index: ['test/index.html'],
            options: {
                run: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('compile', ['test', 'concat', 'uglify']);

};
