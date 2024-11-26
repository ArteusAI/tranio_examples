# Пример использования Webhook

Этот пример демонстрирует, как подписаться на события системы Arteus RAG. Примеры находятся в файлах `subscribeWebhook.js` и `webhookListener.js`.

## Подписка на вебхук

Файл `subscribeWebhook.js` используется для подписки на вебхуки. Он отправляет POST-запрос на API с указанием URL вашего вебхук-слушателя и типов событий, на которые вы хотите подписаться.

### Параметры

- **API_KEY**: Ваш API ключ для аутентификации запросов.

### Запуск

1. Убедитесь, что у вас установлен Node.js.
2. Установите зависимости: `npm install axios`.
3. Запустите скрипт: `node subscribeWebhook.js`.

## Обработка вебхуков

Файл `webhookListener.js` обрабатывает входящие вебхуки. Он использует Express для создания сервера, который принимает POST-запросы с данными вебхука.

### Параметры

- **PORT**: Порт, на котором будет запущен сервер. По умолчанию: `5569`.
- **API_KEY**: Ваш API ключ для аутентификации запросов к API.

### Запуск

1. Убедитесь, что у вас установлен Node.js.
2. Установите зависимости: `npm install express body-parser node-fetch`.
3. Запустите сервер: `node webhookListener.js`.

### Примечание

Убедитесь, что ваш сервер доступен по указанному в `WEBHOOK_URL` адресу, чтобы получать вебхуки.

