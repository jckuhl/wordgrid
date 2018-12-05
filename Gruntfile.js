module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['**/*.ts', '**/*.css', '*.html'],
                tasks: ['jshint', 'cssmin', 'uglify'],
            },
            options: {
                livereload: true
            }
        },
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },
        concat: {
            options: {
                sourceMaps: true
            },
            dist: {
                src: ['dist/script/*.js'],
                dest: 'dist/build/app.bundle.js'
            }
        },
        connect: {
            server: {
                port: 8000,
                host: '127.0.0.1'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['ts', 'concat','connect', 'watch']);

}