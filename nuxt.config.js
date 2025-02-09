// register env before other imports @see https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-
import 'dotenv/config';
import dotenv from 'dotenv';
import webpack from 'webpack';
const path = require('path');
const fs = require('fs');

const dotEnvConfig = dotenv.config();
const dotEnv = dotEnvConfig.error ? {} : dotEnvConfig.parsed;
const dotEnvExample = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env.master')));
const processEnv = {};
// copy process.env values by .env.master keys
Object.keys(dotEnvExample).forEach((key) => {
    processEnv[key] = process.env[key];
});

import {BASE_TITLE, BASE_DESCRIPTION} from "./assets/variables";

module.exports = {
    ssr: false,
    telemetry: false,
    /*
    ** Headers of the page
    */
    head: {
        title: BASE_TITLE,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: BASE_DESCRIPTION },
            { hid: 'og-title', name: 'og:title', content: BASE_TITLE },
            { hid: 'og-description', name: 'og:description', content: BASE_DESCRIPTION },
            { hid: 'og-image', name: 'og:image', content: '/social-share.png' },
        ],
        link: [
            { rel: 'icon', href: '/favicon.png' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        ],
    },
    css: [
        './static/css/style.min.css',
    ],
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#cf5c2c' },
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'is-active',
        middleware: [
            'hash-lowercase',
            'validator-meta',
            'explorer',
        ],
    },
    plugins: [
        { src: '~/plugins/click-blur.js', ssr: false },
        { src: '~/plugins/seo-gtm.js', ssr: false },
        { src: '~/plugins/history.js', ssr: false },
    ],
    env: Object.assign({}, processEnv, dotEnv),
    modern: 'client',
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        optimizeCSS: false,
        // postcss: false,
        // optimization: {
        //     splitChunks: {
        //         name: true
        //     }
        // },
        watch: [
            './api/',
            // `./lang/`, // this watcher dont-work yet
        ],
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient, isServer }) {
            /*
            ** Run ESLint on save
            */
            // if (isDev && isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/,
            //     });
            // }
            config.resolve = config.resolve || {};
            config.resolve.mainFields =  ['module', 'browser', 'main'];

            config.resolve.alias = config.resolve.alias || {};
            config.resolve.alias['lodash'] = path.resolve(__dirname, "node_modules/lodash-es");
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[/]locale$/, /^\.\/(en|ru)$/),
        ],
        babel: {
            presets: ['@nuxt/babel-preset-app'],
            // prevent @babel/plugin-transform-runtime from inserting `import` statement into commonjs files (bc. it breaks webpack)
            sourceType: 'unambiguous',
        },
        transpile: [
            /es6-promise|\.(?!(?:js|json)$).{1,5}$/i,
            '/base-x/',
            '@material/',
            'date-fns/esm',
            'lodash-es',
            'centrifuge/src',
            'v-tooltip/src',
            // 'autonumeric/src',
            // 'vue-autonumeric/src',
            // 'nuxt-i18n/src',
            'clipbrd/src',
            'pretty-num/src',
            'from-exponential/src',
            'minterjs-util/src',
            'minterjs-tx/src',
            'minterjs-wallet/src',
            'minter-js-sdk/src',
        ],
    },
};
