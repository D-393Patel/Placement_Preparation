# Backend - Laravel API Scaffold

The official qualifier asks for a Laravel API with SQLite. PHP and Composer were not available on the current Windows machine, so this folder contains the Laravel-style implementation plan and source scaffold needed for the API.

Expected endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/boards` | list boards |
| POST | `/api/boards` | create board |
| GET | `/api/boards/{board}` | board with lists/cards/tags/members |
| POST | `/api/lists` | create list |
| POST | `/api/cards` | create card |
| PATCH | `/api/cards/{card}` | edit title, description, assignee, due date |
| POST | `/api/cards/{card}/move` | move card between lists |
| POST | `/api/cards/{card}/tags` | attach a colored tag |

## Intended local run

```bash
composer create-project laravel/laravel backend
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Use SQLite:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```
