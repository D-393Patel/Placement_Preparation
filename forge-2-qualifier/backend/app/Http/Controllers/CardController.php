<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request)
    {
        return Card::create($request->validate([
            'list_id' => ['required', 'integer', 'exists:lists,id'],
            'member_id' => ['nullable', 'integer', 'exists:members,id'],
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'position' => ['nullable', 'integer'],
        ]));
    }

    public function update(Request $request, Card $card)
    {
        $card->update($request->validate([
            'member_id' => ['nullable', 'integer', 'exists:members,id'],
            'title' => ['sometimes', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'position' => ['nullable', 'integer'],
        ]));

        return $card->load('tags');
    }

    public function move(Request $request, Card $card)
    {
        $card->update($request->validate([
            'list_id' => ['required', 'integer', 'exists:lists,id'],
            'position' => ['required', 'integer'],
        ]));

        return $card;
    }

    public function attachTag(Request $request, Card $card)
    {
        $data = $request->validate([
            'tag_id' => ['required', 'integer', 'exists:tags,id'],
        ]);

        $card->tags()->syncWithoutDetaching([$data['tag_id']]);
        return $card->load('tags');
    }
}
