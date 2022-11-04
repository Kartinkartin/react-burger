# Проект: Космическая бургерная 
Яндекс.Практикум, курс Веб+, 7-9 месяцы обучения. Создание приложения на React

## Описание проекта
Проект, результат работы за 3,5 месяца, выполнен с использованием технологий Redux и DnD(7-8 месяцы учебы на курсе), реализован роутинг, сайт требует авторизацию, подключено соеднение WebSocket через универсальный миддлвар (9 месяц).

[Макет с Фигмы](https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link?node-id=2974%3A2989)

[Проект с булоньками доступен на GitHub Pages](https://kartinkartin.github.io/react-burger/)

Приложение организовано модульной структурой.

Используются хуки, порталы для отображения модальных окон.
Получение ингредиентов, номера заказа и отправка списка заказа реализовано через API.
Для формирования уникального ключа компонентов списка используется библиотека UUID.
Состояние приложения в Redux.

### DnD: 
На главной странице реализована возможность формирования заказа перетаскиванием ингредиентов в раздел справа, есть возможность изменить порядок продуктов в заказе перетаскиванием, удалить компоненты заказа, можно заменить булочку. 

### Роутинг и авторизация: 
Реализовано несколько защищенных маршрутов, оформить заказ может только авторизованный пользователь. Статус пользователя проверяется и обновляется на основании хранящегося в куки токена. Автризованный пользователь не может попасть на страницы аутентификации, регистрации, сброса пароля. Неавторизованный пользователь не может попасть на страницы профиля, ленты заказов пользователя, не может отправить заказ. Сервер предоставляет авторизационный accessToken с временем жизни на сервере 20 минут и refreshToken для обновления данных и accessToken.

### Описание работы.
Приложение позволяет неавторизованному пользователю:
1. пройти аутентификацию;
2. сформировать заказ в разделе "Конструктор". *Попытка оформить заказ переведет на страницу "/login", после прохождения аутентификации пользователь перейдет обратно в раздел конструктора с сохранившимся заказом и сможет его оформить.*
3. получить ленту всех заказов при переходе в разделе "Лента заказов" (по клику на ссылку в шапке).

Приложение позволяет авторизованному пользователю:
1. залогиниться;
2. сформировать заказ в разделе "Конструктор" и отправить его;
3. получить ленту всех заказов при переходе в разделе "Лента заказов" (по клику на ссылку в шапке);
4. выйти в личный кабинет и изменить персональные данные в разделе "Профиль" (по клику на ссылку в шапке);
5. получить ленту собственных заказов при переходе в разделе "Профиль" (по клику на ссылку в шапке) -> "История заказов" (по клику на ссылку слева);
6. выйти из приложения в разделе "Профиль" (по клику на ссылку в шапке) -> "Выход" (по клику на кнопку слева).

Приложение позволяет незарегистрированному пользователю:
1. пройти регистрацию;
2. сформировать заказ в разделе "Конструктор";
*Попытка отправить заказ переведет на страницу "/login"*
3. получить ленту всех заказов при переходе в разделе "Лента заказов" (по клику на ссылку в шапке);

Приложение позволяет зарегистрированному пользователю сбросить пароль (отправка письма с кодом на почту).

Есть возможность просмотреть детали ингредиента в меню раздела "Конструктор", заказа в разделах лент всех заказов и персональных. По клику на элементы будет появляться модальное окно, при использовании ссылки на элемент - отдельная страница с подробностями.  

