# Web Tycoon Tools

Бот для автоматической прокачки в игре [Web Tycoon](https://game.web-tycoon.com).

## Бот умеет

1. Отправлять работников на отдых, когда они устали
2. Ставить правильных работников на задачи
3. Снимать работников с задач
4. Публиковать сайт
5. Публиковать правильный контент (бот читает комментарии пользователей)
6. Подбирать рекламу по тематике
7. Удалять не качественную рекламу
8. Чистить спам на сайтах

## Бот скоро научится

1. Платить зарплату работникам
2. Оплачивать домен сайта
3. Оплачивать хостинг сайта

## Бот не умеет

1. Нанимать работников
2. Создавать сайты
3. Менять хостинг у сайтов

## Установка

1. склонировать репозиторий `git clone git@github.com:voodee/web-tycoon-tools.git`
2. перейти в папку `cd web-tycoon-tools`
3. установить зависимости `npm i`
4. скопировать конфиг `cp .env.default .env`
5. настройить конфиг отредактировав файл .env, и ввести свой логин и пароль

## Запуск бота

`node index`

## Публикация бота на heroku

0. Создайте аккаунт на [heroku](https://heroku.com/) и установите [Heroku cli tool installed](https://devcenter.heroku.com/articles/heroku-cli)
1. создайте приложение `heroku create`
2. задайте ваш логин и пароль от игры `heroku config:set login=*ваша_почта* password=*ваш_пароль*`
3. укажите тип приложения `heroku buildpacks:set heroku/nodejs`
4. добавляем плагин для heroku `heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack`
5. деплой кода `git push heroku master`