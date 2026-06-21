# Forge Kanban Backend

Real Laravel API for the Forge 2 qualifier Kanban board.

## Requirements

- PHP 8.2+
- Composer
- SQLite

## Run

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

API base URL:

```text
http://127.0.0.1:8000/api
```

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/boards` | list boards |
| POST | `/api/boards` | create board |
| GET | `/api/boards/{board}` | board with lists/cards/tags/members |
| POST | `/api/lists` | create list |
| PATCH | `/api/lists/{list}` | edit list |
| POST | `/api/cards` | create card |
| PATCH | `/api/cards/{card}` | edit title, description, assignee, due date |
| POST | `/api/cards/{card}/move` | move card between lists |
| POST | `/api/cards/{card}/tags` | attach a colored tag |
