# Middle Messenger

![NodeJS](https://camo.githubusercontent.com/8477a50d7210f0f3bf15fbe5b44809296b75f2101a2927818599d72c8ea72cef/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465) ![TypeScript](https://camo.githubusercontent.com/d4cfec9550517aa67567e29843e3880ebf50bd7eeceafcd3b82875f17c9f564e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d2532333030374143432e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465) ![Handlebars](https://camo.githubusercontent.com/5a187dd24f5d779493d119892d8a0832249a0b1e5078db2e9bbbbbf1de810e3a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48616e646c65626172732d2532333030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d48616e646c65626172732e6a73266c6f676f436f6c6f723d7768697465) ![Vite](https://camo.githubusercontent.com/e9a836f9365e97788e7bf65da1191113e36b53e1083204680da198b83b4937ee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f766974652d2532333634364346462e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d76697465266c6f676f436f6c6f723d7768697465) 


Middle Messenger — это современный мессенджер. Описание проекта включает в себя основные функции, а также планы на будущее.

## Демо

Демо версия приложения доступна [здесь](https://gorgeous-ganache-d27c11.netlify.app/#navigatePage/). Вы можете ознакомиться с возможностями и функциональностью приложения без необходимости его локальной настройки.

## Используемые технологии

- **TypeScript** ~5.6.2
- **Vite** ^5.4.10
- **Node.js** 16.20.2
- **Handlebars** ^4.7.8

## 📖 Описание

На данном этапе реализованы несколько страниц приложения:
- Авторизация (реализована валидация полей форм)
- Регистрация (реализована валидация полей форм)
- Страница профиля (реализована валидация полей форм, возможность отдельно изменять данные пользователя, пароль и аватар)
- Страничка чатов (просмотр чатов по id контакта, пока с фейковыми данными; возможность отправлдения сообщения, валидация поля сообщения)
- Модальные окна с удалением и добавлением пользователей, загрузкой файла (реализована валидация полей форм)

## 🚀 Запуск проекта

### Требования

- Node.js (https://nodejs.org/) версии 12 или выше
- NPM (https://www.npmjs.com/)

### Установка

1. Клонируйте репозиторий:

    ```git clone git@github.com:mary-an-safronova/middle.messenger.praktikum.yandex.git```
  

2. Перейдите в каталог проекта:

    ```cd middle.messenger.praktikum.yandex```
  

3. Установите зависимости:

    ```npm install```
  

4. Соберите проект:

    ```npm run build```

5. Запустите проект в режиме разработки:

    ```npm run start```

6. Откройте в браузере страницу:

    ```http://localhost:3000/```


### 📄 Описание API

Подробное описание API можно найти по ссылке на документацию [API](https://ya-praktikum.tech/api/v2/swagger/#/).

## 🔮 Планы по улучшению

В будущем планируется добавление следующих функций:

- Просмотр сообщений — пользователи смогут просматривать ранее отправленные и полученные сообщения.
- Отправка сообщений — добавление возможности отправлять сообщения в чаты.
- Добавление и удаление чатов — пользователи смогут создавать новые чаты и удалять их.
- Подключение API — интеграция с API для улучшения функциональности мессенджера.
- Авторизация и регистрация
- Изменение данных пользователя 
