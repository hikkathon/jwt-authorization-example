# jwt authorization example

На этом проекте я практикую всю теорию связанную с JWT авторизацией и реализую JWT access,
refresh авторизацию на node js и react. Также будет реализовано подтверждение почты. Активация почты на node js.

## 📌 Особенности
TODO:
## 🚀 Быстрый старт

Как быстро начать использовать ваш проект:

1. Клонируйте проект
   ```bash
   https://github.com/hikkathon/jwt-authorization-example.git
   ```
2. Установить зависимости
   ```bash
   npm install
   ```
3. Запустить docker compose
   ```bash
   make docker-up ARGS="--build"
   ```
3. Зайти в контейнер backend_jwt_auth
   ```bash
   make docker-exec ARGS="backend_jwt_auth"
   ```
4. Внутри контейнера backend_jwt_auth произвести генерацию и миграции БД
   ```bash
   npx prisma generate
   ```
   ```bash
   npx prisma migrate dev --name "init"
   ```

Удалить миграции внутри контейнера
   ```bash
   sudo rm -rf migrations
   ```

### Советы по форматированию:
1. Используйте заголовки (`#`, `##`, `###`) для структуры
2. Для кода используйте блоки с тремя backticks (```)
3. Списки делайте через `-` или `*`
4. Для разделов можно использовать эмодзи (но не переусердствуйте)
5. Добавьте badges (значки) для визуального выделения технологий
6. Ссылки оформляйте через `[текст](url)`