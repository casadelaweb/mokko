# Фронтенд для mokko-brand.ru WIP

Тест: https://mokko.ninthtown.ru/

## Общая информация

* node 18+, webpack 5
* mobile-first
* html, typescript, scss
* сборка поддерживает javascript, sass, css. Имейте совесть использовать typescript и scss.

## Важно

* пути для изображений, видео и импортируемых файлов от папки src. Например:

````html
<img src="src/assets/img/placeholder.jpg" loading="lazy" alt="img">
````

````typescript
import 'src/scripts/global-scroll-controller'
````

````scss
@use 'src/styles/shared' as *;
````

## Скрипты

* npm i обновляет node_modules
* npm start запускает node server и открывает проект в браузере
* npm run dev собирает проект в папку dist
* npm run build собирает проект в папку dist и минимизирует стили и скрипты

