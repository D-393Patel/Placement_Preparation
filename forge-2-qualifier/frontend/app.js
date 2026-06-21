const { useMemo, useState } = React;

const today = new Date("2026-06-21T09:30:00+05:30");

const initialBoard = {
  id: 1,
  name: "Forge 2 Qualifier Board",
  members: [
    { id: 1, name: "Deepa Patel" },
    { id: 2, name: "Hermes" },
    { id: 3, name: "OpenClaw" }
  ],
  lists: [
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: 101,
          title: "Wire Slack channels",
          description: "Create sprint-main, agent-coder, and agent-log evidence channels.",
          tags: [{ label: "setup", color: "#bfdbfe" }],
          memberId: 1,
          dueDate: "2026-06-21"
        }
      ]
    },
    {
      id: "doing",
      title: "Doing",
      cards: [
        {
          id: 201,
          title: "Build Kanban UI",
          description: "Render lists, cards, labels, assignees, and due-date flags.",
          tags: [{ label: "frontend", color: "#bbf7d0" }],
          memberId: 3,
          dueDate: "2026-06-22"
        }
      ]
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: 301,
          title: "Add Hermes status skill",
          description: "Reusable status format for What I Did / What's Left / What Needs Your Call.",
          tags: [{ label: "agent", color: "#fde68a" }],
          memberId: 2,
          dueDate: "2026-06-20"
        }
      ]
    }
  ]
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    listId: "todo",
    tag: "feature",
    color: "#ddd6fe",
    memberId: 1,
    dueDate: "2026-06-23"
  });

  const membersById = useMemo(
    () => Object.fromEntries(board.members.map((member) => [member.id, member])),
    [board.members]
  );

  function moveCard(cardId, fromListId, direction) {
    const fromIndex = board.lists.findIndex((list) => list.id === fromListId);
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= board.lists.length) return;

    const nextLists = board.lists.map((list) => ({ ...list, cards: [...list.cards] }));
    const cardIndex = nextLists[fromIndex].cards.findIndex((card) => card.id === cardId);
    const [card] = nextLists[fromIndex].cards.splice(cardIndex, 1);
    nextLists[toIndex].cards.push(card);
    setBoard({ ...board, lists: nextLists });
  }

  function addCard(event) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    const card = {
      id: Date.now(),
      title: draft.title.trim(),
      description: draft.description.trim() || "No description yet.",
      tags: [{ label: draft.tag.trim() || "feature", color: draft.color }],
      memberId: Number(draft.memberId),
      dueDate: draft.dueDate
    };
    setBoard({
      ...board,
      lists: board.lists.map((list) =>
        list.id === draft.listId ? { ...list, cards: [...list.cards, card] } : list
      )
    });
    setDraft({ ...draft, title: "", description: "" });
  }

  function updateCardTitle(cardId) {
    const title = window.prompt("Edit card title");
    if (!title) return;
    setBoard({
      ...board,
      lists: board.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) => (card.id === cardId ? { ...card, title } : card))
      }))
    });
  }

  return React.createElement(
    "main",
    { className: "app-shell" },
    React.createElement(Sidebar, { members: board.members }),
    React.createElement(
      "section",
      { className: "workspace" },
      React.createElement(
        "div",
        { className: "toolbar" },
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, board.name),
          React.createElement("span", { className: "due-date" }, "Boards -> Lists -> Cards")
        ),
        React.createElement(
          "div",
          { className: "toolbar-actions" },
          React.createElement("input", {
            className: "control",
            value: board.name,
            onChange: (event) => setBoard({ ...board, name: event.target.value }),
            "aria-label": "Board name"
          })
        )
      ),
      React.createElement(
        "div",
        { className: "board" },
        board.lists.map((list, index) =>
          React.createElement(KanbanList, {
            key: list.id,
            list,
            index,
            isFirst: index === 0,
            isLast: index === board.lists.length - 1,
            membersById,
            onMove: moveCard,
            onEdit: updateCardTitle
          })
        )
      ),
      React.createElement(CardEditor, { draft, setDraft, board, onSubmit: addCard })
    )
  );
}

function Sidebar({ members }) {
  return React.createElement(
    "aside",
    { className: "sidebar" },
    React.createElement("h1", null, "Forge Kanban"),
    React.createElement("p", null, "Tiny Trello-style board with cards, labels, assignees, due dates, and movement between lists."),
    React.createElement(
      "div",
      { className: "member-list" },
      members.map((member) =>
        React.createElement(
          "div",
          { className: "member", key: member.id },
          React.createElement("span", { className: "avatar" }, member.name[0]),
          React.createElement("span", null, member.name)
        )
      )
    )
  );
}

function KanbanList({ list, isFirst, isLast, membersById, onMove, onEdit }) {
  return React.createElement(
    "section",
    { className: "list" },
    React.createElement(
      "div",
      { className: "list-header" },
      React.createElement("h3", null, list.title),
      React.createElement("span", { className: "count" }, `${list.cards.length} cards`)
    ),
    React.createElement(
      "div",
      { className: "cards" },
      list.cards.map((card) =>
        React.createElement(KanbanCard, {
          key: card.id,
          card,
          listId: list.id,
          member: membersById[card.memberId],
          isFirst,
          isLast,
          onMove,
          onEdit
        })
      )
    )
  );
}

function KanbanCard({ card, listId, member, isFirst, isLast, onMove, onEdit }) {
  const overdue = new Date(`${card.dueDate}T23:59:00+05:30`) < today;
  return React.createElement(
    "article",
    { className: `card ${overdue ? "overdue" : ""}` },
    React.createElement("h4", null, card.title),
    React.createElement("p", null, card.description),
    React.createElement(
      "div",
      { className: "meta-row" },
      card.tags.map((tag) =>
        React.createElement("span", { className: "tag", style: { background: tag.color }, key: tag.label }, tag.label)
      ),
      React.createElement("span", { className: "assignee" }, `Assigned: ${member?.name ?? "Unassigned"}`),
      React.createElement("span", { className: "due-date" }, `${overdue ? "Overdue" : "Due"}: ${card.dueDate}`)
    ),
    React.createElement(
      "div",
      { className: "card-actions" },
      React.createElement("button", { onClick: () => onMove(card.id, listId, -1), disabled: isFirst }, "Move left"),
      React.createElement("button", { onClick: () => onMove(card.id, listId, 1), disabled: isLast }, "Move right"),
      React.createElement("button", { onClick: () => onEdit(card.id) }, "Edit title")
    )
  );
}

function CardEditor({ draft, setDraft, board, onSubmit }) {
  return React.createElement(
    "form",
    { className: "editor", onSubmit },
    React.createElement("strong", null, "Add card"),
    React.createElement(
      "div",
      { className: "editor-row" },
      React.createElement("input", {
        className: "control",
        placeholder: "Card title",
        value: draft.title,
        onChange: (event) => setDraft({ ...draft, title: event.target.value })
      }),
      React.createElement("select", {
        className: "control",
        value: draft.listId,
        onChange: (event) => setDraft({ ...draft, listId: event.target.value })
      }, board.lists.map((list) => React.createElement("option", { value: list.id, key: list.id }, list.title)))
    ),
    React.createElement("textarea", {
      className: "control",
      placeholder: "Description",
      value: draft.description,
      onChange: (event) => setDraft({ ...draft, description: event.target.value })
    }),
    React.createElement(
      "div",
      { className: "editor-row" },
      React.createElement("input", {
        className: "control",
        placeholder: "Tag",
        value: draft.tag,
        onChange: (event) => setDraft({ ...draft, tag: event.target.value })
      }),
      React.createElement("select", {
        className: "control",
        value: draft.memberId,
        onChange: (event) => setDraft({ ...draft, memberId: event.target.value })
      }, board.members.map((member) => React.createElement("option", { value: member.id, key: member.id }, member.name)))
    ),
    React.createElement(
      "div",
      { className: "editor-row" },
      React.createElement("input", {
        className: "control",
        type: "date",
        value: draft.dueDate,
        onChange: (event) => setDraft({ ...draft, dueDate: event.target.value })
      }),
      React.createElement("button", { className: "primary-button", type: "submit" }, "Add card")
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
