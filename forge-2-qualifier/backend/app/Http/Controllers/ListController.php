<?php

namespace App\Http\Controllers;

use App\Models\BoardList;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function store(Request $request)
    {
        return BoardList::create($request->validate([
            'board_id' => ['required', 'integer', 'exists:boards,id'],
            'title' => ['required', 'string', 'max:120'],
            'position' => ['nullable', 'integer'],
        ]));
    }

    public function update(Request $request, BoardList $list)
    {
        $list->update($request->validate([
            'title' => ['sometimes', 'string', 'max:120'],
            'position' => ['nullable', 'integer'],
        ]));

        return $list;
    }

    public function destroy(BoardList $list)
    {
        $list->delete();

        return response()->noContent();
    }
}
