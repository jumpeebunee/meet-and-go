<!-- center code math uml theme:white -->

# Event Map Application

<image src="./public/meetandgo-logo-green.png" alt="intro-img" width="100px">

## Meet And Go!

<image src="./public/intro.jpg" alt="intro-img" width="600px">

[Live demo](https://meet-and-go.netlify.app). The application allows you to search for events by interests. Create events. Meet and search for public companies.

## Done 28.02.23 / deadline 28.02.23
1. Score UI - 95 баллов
 * [20] Реализован поиск по карте
 * [20] Реализован выбор шаблонных мероприятий (basketball, volleyball, tennis, etc...)
 * [40] Приложение адаптировано для телефона (на некоторых смартфонах инпут дата не дает создать event, просьба проверять с компьютера! Если проверите со смартфона отпишите нам с какого проверяли и работает ли создание eventa, будем благодарны)
 * [15] Уникальные разноцветные маркеры для событий
2. Frontend features - 325 баллов
 * [35] Реализована регистрация и логин
 * [30] Пользователь может установить/сменить свою аватарку
 * [35] Пользователь может редактировать свой город и номер телефона
 * [40] Пользователь может создать event, нажав на карту
 * [60] Пользователь видит свои активные события (зеленая кнопка сверху слева)
 * [30] Пользователь видит участников созданного события
 * [45] Пользователь имеет репутацию, которая накапливается с проведенными эвентами
 * [25] Пользователь может просматривать страницы других пользователей
 * [25] Пользователь может указать количество участников события и взнос
3. Backend features - 200 баллов
 * [100] Использование Yandex Map API
 * [100] Использование Firebase для хранения данных
## Всего - 620 баллов

## Opportunities

In the application, you can create an account, add contacts for communication, get reputation for organized events, change your profile photo. Create events and invite friends there.

The main purpose of the application is public access to events for everyone. Every event contain a list of participants, number of people, it is possible to go to the profile and look at the participant and his reputation.

<image src="./public/examples.jpg" alt="example" width="600px">

## Stack

The application is based on React JS, Redux and TypeScript.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
