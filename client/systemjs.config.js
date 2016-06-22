(function(global) {
    System.config({
        map: {
            'app': 'scripts',
            '@angular': 'scripts/@angular',
            'rxjs': 'scripts/vendor/rxjs',
            'bootstrap': 'scripts/vendor'
        },
        packages: {
            'app': {
                main: 'main.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'bootstrap': {
                main: 'bootstrap.js',
                defaultExtension: 'js'
            },
            '@angular': {
                defaultExtension: 'umd.js'
            }
        }
    });

    System.import('app')
        .catch(function(err) {
            console.error(err);
        });
})(this);
