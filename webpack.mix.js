let mix = require('laravel-mix');
const path = require('path');

mix.ts('src/index.ts', 'dist/')
    .copy('src/index.html', 'dist/')
    .copy('assets', 'dist/assets')
    .setPublicPath('dist/')
    .sourceMaps()
    .version()
    .webpackConfig(() => {
        return {
            resolve: {
                alias: {
                  '@': path.resolve(__dirname, 'src')
                }
            }
        };
    });
