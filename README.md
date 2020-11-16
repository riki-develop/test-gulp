# Gulp環境構築





## Sass コンパイルプラグイン「global」インストール  
yarn global add node-sass  

## gulp-sass インストール  
yarn add gulp-sass --dev  





## ESlint インストール  
yarn add babel-eslint gulp-eslint eslint-config-airbnb-base eslint-plugin-import --dev  
※Airbnb のコンフィグが主流の為、合わせてインストール  

.eslintrc  
※リント用ファイル作成  

## series, parallel インストール  
const {src, dest, watch, series, parallel} = require('gulp');  
※gulpfile.js に読み込み

## 商用・開発　環境切り替えについて  
yarn add gulp-if cross-env --dev