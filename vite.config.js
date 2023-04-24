import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import iife from './vite/plugins/iife';

const indexes = Array.from({ length: 114 }, (_, i) => i + 1);
const locales = ["en", "ar"];
const inline = (p, format) => {
  try {
    const extName  = path.extname(p).slice(1, format.length+1)
    const fileName = path.basename(p, path.extname(p))
    const fileBody = fs.readFileSync(path.join("public", p))
    switch(format) {
      case 'json':
        return `<script class='${fileName} ${extName}'`+
               `type='application/${extName}'>` + fileBody + '</script>';
      case 'css':
        return `<style class='${fileName} ${extName}'>${fileBody}</style>`;
      default:
        throw new Error(`unknown format: ${format}`);
    }
  } catch(error) {
    console.error(error)
    process.exit()
  }
}

export default defineConfig({
  mode: 'production',
  watch: true,
  root: path.join(process.cwd(), 'src'),
  publicDir: '../public',
  build: {
    outDir: '../build',
    assetsDir: '',
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: true,
    rollupOptions: {
      input: {
        'index': 'src/js/pages/surah/index.tsx',
        'index/loader': 'src/js/pages/surah/index/loader.ts',
        'index.scss': 'src/css/pages/surah/index.scss',
        'webpackage.scss': 'src/css/webpackage.scss'
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: '[ext]/[name].css',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src', 'js'),
      '~': path.resolve(__dirname, path.join('src', 'css'))
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    react(),
    ...createHtmlPlugin({
      pages: [
        ...locales.map((locale) => {
          return {
            input: 'html/index.ejs',
            output: `${locale}/index.html`,
            injectOptions: {data: { inline, title: 'hello', locale }},
          }
        }),
        ...indexes.flatMap((index) => {
          return locales.map((locale) => {
            return {
              input: 'html/index.ejs',
              output: `${locale}/${index}/index.html`,
              injectOptions: {data: { inline, title: 'foo', locale}}
            }
          })
        })
      ],
    }),
    iife()
  ],
  css: {
    preprocessorOptions: {
      scss: {},
      extract: {},
    },
    modules: false,
  },
});
