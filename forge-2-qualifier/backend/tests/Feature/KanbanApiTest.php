<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KanbanApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_board_can_be_loaded_with_lists_cards_tags_and_members(): void
    {
        $this->seed();

        $board = Board::firstOrFail();

        $this->getJson("/api/boards/{$board->id}")
            ->assertOk()
            ->assertJsonPath('name', 'Forge 2 Qualifier Board')
            ->assertJsonCount(3, 'lists')
            ->assertJsonCount(3, 'members');
    }

    public function test_card_can_move_and_accept_tag(): void
    {
        $this->seed();

        $board = Board::with('lists.cards')->firstOrFail();
        $card = $board->lists[0]->cards[0];
        $targetList = $board->lists[1];
        $tag = Tag::firstOrFail();

        $this->postJson("/api/cards/{$card->id}/move", [
            'list_id' => $targetList->id,
            'position' => 2,
        ])->assertOk()
            ->assertJsonPath('list_id', $targetList->id);

        $this->postJson("/api/cards/{$card->id}/tags", [
            'tag_id' => $tag->id,
        ])->assertOk()
            ->assertJsonPath('tags.0.label', $tag->label);
    }
}
