<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        return Board::with(['lists.cards.tags', 'lists.cards.member', 'members'])->get();
    }

    public function store(Request $request)
    {
        return Board::create($request->validate([
            'name' => ['required', 'string', 'max:120'],
        ]));
    }

    public function show(Board $board)
    {
        return $board->load(['lists.cards.tags', 'lists.cards.member', 'members']);
    }
}
