import path from 'path';
import fs, { readFileSync } from 'fs';
import { defineConfig } from 'vite';
import ejs from 'vite-plugin-ejs';

import react from '@vitejs/plugin-react';
import iife from './src/js/compiler/plugins/iife';
import TFunction from "./src/js/compiler/lib/tfunction";

const indexes = Array.from({ length: 114 }, (_, i) => i + 1);
const locales = ["en", "ar"];
const publicDir = path.join(process.cwd(), "public");
const outDir = path.join(process.cwd(), "build");

export default defineConfig({
  mode: 'production',
  watch: true,
  root: path.join(process.cwd(), 'src'),
  publicDir,
  build: {
    outDir,
    assetsDir: '',
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: true,
    rollupOptions: {
      input: {
        'index': 'src/js/pages/surah/index.tsx',
        'loaders/SurahIndex': 'src/js/runtime/loaders/SurahIndex.ts',
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
    ejs({
      targets: [
        ...locales.map((locale) => {
          return {
            src: 'html/SurahIndex.html.ejs',
            dest: `${locale}/index.html`,
            variables: {
              locale, path, publicDir,
              read: (path) => readFileSync(path).toString(),
              t: TFunction(locale)
            },
          }
        }),
        ...indexes.flatMap((index) => {
          return locales.map((locale) => {
            return {
              src: 'html/SurahIndex.html.ejs',
              dest: `${locale}/${index}/index.html`,
              variables: {
                locale, path, publicDir,
                read: (path) => readFileSync(path).toString(),
                t: TFunction(locale)
              },
            }
          })
        })
      ],
    }),
    iife(),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
      extract: {},
    },
    modules: false,
  },
});
