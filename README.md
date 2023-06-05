## GoIT Node.js Course Template Homework

Для кожної домашньої роботи створюйте свою гілку.

-   hs01
-   hw02
-   hw03
-   hw04
-   hw05
-   hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Тільки після того, ви можете виконати мердж гілки з домашнім завданням у майстер.
Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github

### Команди Commander:

#getAll - node index.js --action getAll

#get - node index.js --action get --id 10

#add - node index.js --action add --name John --email john@example.com --phone 1234567890

#delete - node index.js --action delete --id 10

### Команди:

-   `npm start` &mdash; старт сервера в режимі production
-   `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
-   `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
-   `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
