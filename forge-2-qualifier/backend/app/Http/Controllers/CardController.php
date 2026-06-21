<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request)
    {
        return Card::create($request->validate([
            'list_id' => ['required', 'integer', 'exists:board_lists,id'],
            'member_id' => ['nullable', 'integer', 'exists:members,id'],
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'position' => ['nullable', 'integer'],
        ]))->load(['tags', 'member']);
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

        return $card->load(['tags', 'member']);
    }

    public function destroy(Card $card)
    {
        $card->delete();

        return response()->noContent();
    }

    public function move(Request $request, Card $card)
    {
        $card->update($request->validate([
            'list_id' => ['required', 'integer', 'exists:board_lists,id'],
            'position' => ['required', 'integer'],
        ]));

        return $card->load(['tags', 'member']);
    }

    public function attachTag(Request $request, Card $card)
    {
        $data = $request->validate([
            'tag_id' => ['required', 'integer', 'exists:tags,id'],
        ]);

        $card->tags()->syncWithoutDetaching([$data['tag_id']]);

        return $card->load(['tags', 'member']);
    }
}
