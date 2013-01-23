module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> | <%= pkg.license %> License */\n',
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
        },
        jquerymanifest: {
            options: {
                source: 'package.json',
                overrides: {
                    name: "optgrouper",
                    title: "jquery.optgrouper",
                    author: {
                        name: "Andrew Duthie",
                        email: "andrew@andrewduthie.com",
                        url: "http://www.andrewduthie.com"
                    },
                    homepage: "http://aduth.github.com/jquery.optgrouper",
                    demo: "http://aduth.github.com/jquery.optgrouper",
                    dependencies: {
                        jquery: ">=1.2.3"
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-jquerymanifest')

    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('compile', ['test', 'concat', 'uglify', 'jquerymanifest']);

};
