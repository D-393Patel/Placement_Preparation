<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class KanbanSeeder extends Seeder
{
    public function run(): void
    {
        $board = Board::create(['name' => 'Forge 2 Qualifier Board']);

        $deepa = $board->members()->create(['name' => 'Deepa Patel']);
        $hermes = $board->members()->create(['name' => 'Hermes']);
        $openClaw = $board->members()->create(['name' => 'OpenClaw']);

        $todo = $board->lists()->create(['title' => 'To Do', 'position' => 1]);
        $doing = $board->lists()->create(['title' => 'Doing', 'position' => 2]);
        $done = $board->lists()->create(['title' => 'Done', 'position' => 3]);

        $setup = Tag::create(['label' => 'setup', 'color' => '#bfdbfe']);
        $frontend = Tag::create(['label' => 'frontend', 'color' => '#bbf7d0']);
        $agent = Tag::create(['label' => 'agent', 'color' => '#fde68a']);

        $this->card($todo->id, $deepa->id, 'Wire Slack channels', 'Create sprint-main, agent-coder, and agent-log evidence channels.', '2026-06-21', 1, $setup);
        $this->card($doing->id, $openClaw->id, 'Build Kanban UI', 'Render lists, cards, labels, assignees, and due-date flags.', '2026-06-22', 1, $frontend);
        $this->card($done->id, $hermes->id, 'Add Hermes status skill', 'Reusable status format for What I Did / What\'s Left / What Needs Your Call.', '2026-06-20', 1, $agent);
    }

    private function card(int $listId, int $memberId, string $title, string $description, string $dueDate, int $position, Tag $tag): void
    {
        $card = Card::create([
            'list_id' => $listId,
            'member_id' => $memberId,
            'title' => $title,
            'description' => $description,
            'due_date' => $dueDate,
            'position' => $position,
        ]);

        $card->tags()->attach($tag);
    }
}
