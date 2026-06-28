# JTG Technical Interview Coaching — Batch 02

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 11–20

## Questions in This Batch

11. ⚡ What is the difference between a stack implemented with an array versus a linked list?
12. ⚡ In which scenario is a linked list preferred over an array?
13. ⚡⚠️ What is the time complexity of deleting a node from a doubly linked list given a pointer to it?
14. ⚡ What is a trie, and what is its primary application?
15. ⚡⚠️ What is the difference between dynamic programming and memoization?
16. ⚡⚠️ What is the Bellman–Ford algorithm used for?
17. ⚡⚠️ What is Dijkstra's algorithm, and what is its time complexity with a min-heap?
18. ⚡ What is the difference between a tree and a graph?
19. What is a spanning tree?
20. ⚡ What is Kruskal's algorithm used for?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Array and linked-list trade-offs | 11, 12, 13 | These test how representation changes access, insertion, deletion, memory, and practical performance. |
| B | Prefix search with tries | 14 | A trie has a distinct structural guarantee and application set, so it deserves its own answer. |
| C | Dynamic programming styles | 15 | The central trap is that memoization is not separate from DP; it is one way to implement DP. |
| D | Single-source shortest paths | 16, 17 | Bellman–Ford and Dijkstra solve related problems under different edge-weight assumptions. |
| E | Trees, spanning trees, and MSTs | 18, 19, 20 | These move from the graph/tree relationship to a spanning tree and then to Kruskal's minimum spanning tree algorithm. |

---

### ARRAYS, LINKED LISTS, AND STACK REPRESENTATION ⚡⚠️
**Covers questions: 11, 12, 13**

#### CORE CONCEPT (30 seconds)
An array-backed stack stores elements contiguously, giving good cache locality and `O(1)` amortized push/pop, but it may resize. A linked-list stack uses separate nodes, giving `O(1)` worst-case push/pop without resizing but adding allocation and pointer overhead. Prefer a linked list when frequent insertions or deletions occur at known node positions and random indexing is not needed. Deleting a doubly linked-list node when its pointer is already given is `O(1)`.

#### WHY IT EXISTS
Arrays optimise indexing and memory locality; linked lists optimise structural changes without shifting elements. The right choice follows the dominant operation, not a blanket claim that one structure is faster. Interviewers are checking whether you include the cost of finding a position separately from the cost of changing links.

#### MENTAL MODEL
An array is a row of numbered lockers: jumping to locker 50 is instant, but inserting a new locker in the middle requires moving others. A linked list is a chain of train coaches: reaching coach 50 requires walking through the chain, but a known coach can be detached by reconnecting its neighbours.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Array access by index is `O(1)`; linked-list access is `O(n)`. Stack push/pop is `O(1)` at the chosen end for a linked list and amortized `O(1)` for a dynamic array. Given a node pointer, doubly linked-list deletion is `O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Arrays have compact storage and good cache locality, but dynamic growth occasionally costs `O(n)`. Linked lists grow node by node and splice known positions in `O(1)`, but each node has pointer overhead and usually causes more allocations and cache misses.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Linked-list deletion is `O(1)`” is true only when the node/reference is already available; searching for a value is `O(n)`. Deleting the head or tail requires updating external pointers. In a doubly linked list, reconnect both neighbours and define empty/single-node behavior. In managed languages, unlinking stale references can help objects become collectible; in manual-memory languages, ownership and deallocation matter.

#### ALL VARIATIONS COVERED
- **Q11:** Both stack implementations support constant-time end operations; arrays favour locality and low overhead, while linked lists avoid resizing but pay per-node memory and allocation costs.
- **Q12:** Prefer a linked list for frequent insertion/deletion at already-known positions, unpredictable growth, or when contiguous memory is undesirable—and only when random indexing is unimportant.
- **Q13:** Given the node pointer, deleting from a doubly linked list is `O(1)` because only neighbouring links change. ⚠️ If the node must first be found, the full operation is `O(n)`.

#### CONNECTIONS TO OTHER TOPICS
Amortized analysis, dynamic arrays, cache locality, memory fragmentation, pointer manipulation, sentinel nodes, LRU caches, stacks and queues, and singly versus doubly linked lists.

#### CODE / EXAMPLE (if applicable)
```text
delete(node):
    if node.prev != null: node.prev.next = node.next
    else:                 head = node.next

    if node.next != null: node.next.prev = node.prev
    else:                 tail = node.prev

    node.prev = node.next = null
```

The number of pointer updates is constant, independent of list length.

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the shared operation complexity first, then compare practical trade-offs. Separate “locate the node” from “delete the known node.” While coding, narrate head, tail, empty-list, and one-node cases. Avoid saying linked lists are automatically better for every insertion—finding the insertion point may dominate, and arrays are often faster in practice due to locality.

#### ONE-LINE SUMMARY
Arrays give locality and indexing; linked lists give constant-time splicing at known nodes, so a given doubly linked-list node can be deleted in `O(1)`.

---

### TRIES AND PREFIX SEARCH ⚡
**Covers questions: 14**

#### CORE CONCEPT (30 seconds)
A trie is a tree where each edge represents a character and each root-to-node path represents a prefix. Inserting or searching a word of length `L` takes `O(L)`, making tries especially useful for prefix lookup such as autocomplete and dictionary suggestions.

#### WHY IT EXISTS
A hash table answers exact-key queries well but does not naturally enumerate all keys sharing a prefix. A trie shares common prefixes, so prefix existence and prefix-based traversal depend on query length rather than the number of stored words.

#### MENTAL MODEL
Picture a dictionary as branching signposts: choose the first letter, then the second, and so on. Words such as `car`, `card`, and `care` share the same `c → a → r` road before branching.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Trie = prefix tree. Primary applications: prefix search, autocomplete, spell checking, and dictionary lookup. Search/insert is `O(L)` for word length `L`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Each node stores child links and an end-of-word flag. A prefix can exist without being a complete word. Fixed child arrays are fast for small alphabets but memory-heavy; maps save sparse space but add lookup overhead.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Complexity is often written `O(L)`, but constants depend on child representation and alphabet. Tries can consume far more memory than hash sets because of nodes and pointers. Compressed/radix tries merge single-child chains. Deletion must preserve nodes still shared by other words.

#### ALL VARIATIONS COVERED
- **Q14:** Define the path-as-prefix structure, give `O(L)` search/insert, and name prefix search or autocomplete as the primary application.

#### CONNECTIONS TO OTHER TOPICS
String algorithms, dictionaries, autocomplete ranking, prefix matching, radix trees, ternary search trees, DNS/IP routing, word search, and memory-versus-speed trade-offs.

#### CODE / EXAMPLE (if applicable)
```text
insert(word):
    node = root
    for ch in word:
        if ch not in node.children:
            node.children[ch] = new Node()
        node = node.children[ch]
    node.isWord = true
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why the structure is better for prefix queries, not merely what its nodes contain. Distinguish a complete word from a prefix and mention the memory cost. If coding, choose the child representation explicitly based on the alphabet instead of silently assuming 26 lowercase letters.

#### ONE-LINE SUMMARY
A trie stores strings by shared prefixes, giving `O(L)` lookup and making autocomplete its signature use case.

---

### DYNAMIC PROGRAMMING, MEMOIZATION, AND TABULATION ⚡⚠️
**Covers questions: 15**

#### CORE CONCEPT (30 seconds)
Dynamic programming solves problems with overlapping subproblems and reusable optimal results. Memoization is a top-down DP technique: recurse normally but cache each state. Tabulation is the common bottom-up alternative: compute states iteratively in dependency order.

#### WHY IT EXISTS
Plain recursion may solve the same subproblem exponentially many times. DP computes each distinct state once and reuses it, often reducing exponential time to polynomial time. Memoization makes that optimisation easy to add; tabulation gives more control over order and memory.

#### MENTAL MODEL
Imagine answering repeated customer questions. Plain recursion recomputes every answer. Memoization writes an answer on a sticky note when first asked. Tabulation prepares an organised answer sheet from the simplest question upward before anyone asks.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Memoization is top-down recursion plus caching. Tabulation is bottom-up iteration. Both are DP approaches.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Identify state, transition, base cases, and evaluation order. Memoization visits only reachable states and mirrors the recurrence; tabulation avoids recursion overhead and can make space optimisation easier.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  DP is justified by overlapping subproblems and optimal substructure, not by the presence of an array. Cache failures as well as successes when needed. Watch for stack overflow in deep top-down solutions, invalid sentinel values, state explosion, and cycles in state dependencies.

#### ALL VARIATIONS COVERED
- **Q15:** ⚠️ Memoization is not a competing concept separate from DP; it is a top-down implementation of DP. The useful comparison is memoization versus bottom-up tabulation.

#### CONNECTIONS TO OTHER TOPICS
Recursion, recurrence relations, optimal substructure, overlapping subproblems, DAG evaluation, knapsack, Fibonacci, longest common subsequence, coin change, and space optimisation.

#### CODE / EXAMPLE (if applicable)
```text
fib(n):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]
```

There are only `n + 1` distinct states, so time becomes `O(n)` and cache space is `O(n)`.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Correct the question's loose wording politely: “Memoization is one form of DP; I would compare it with tabulation.” Derive the state and recurrence aloud before coding. Avoid labelling every cached function as DP without explaining overlapping subproblems and state reuse.

#### ONE-LINE SUMMARY
DP reuses subproblem results; memoization does it top-down with a cache, while tabulation builds the same states bottom-up.

---

### BELLMAN–FORD AND DIJKSTRA SHORTEST PATHS ⚡⚠️
**Covers questions: 16, 17**

#### CORE CONCEPT (30 seconds)
Both algorithms find single-source shortest paths. Dijkstra is faster when all edge weights are non-negative: with an adjacency list and min-heap it runs in `O((V + E) log V)`, commonly simplified to `O(E log V)` for a connected graph. Bellman–Ford handles negative edges and detects reachable negative-weight cycles, but costs `O(VE)`.

#### WHY IT EXISTS
Shortest-path algorithms repeatedly relax edges—replace a known distance when a cheaper route is found. Dijkstra greedily finalises the currently closest vertex, which is safe only with non-negative weights. Bellman–Ford gives up that greedy assumption and relaxes every edge enough times for paths of increasing edge count to settle.

#### MENTAL MODEL
Dijkstra spreads a wave through terrain where every step costs zero or more; once the nearest unsettled point is reached, no later route can undercut it. Bellman–Ford repeatedly audits every road, allowing discounts (negative edges), then performs one extra audit to detect a discount loop that makes cost fall forever.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Dijkstra: non-negative weights, min-heap complexity `O((V + E) log V)`. Bellman–Ford: negative weights and negative-cycle detection, `O(VE)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Relax an edge `(u, v, w)` when `dist[u] + w < dist[v]`. Bellman–Ford performs up to `V - 1` full edge passes, then a final pass for a reachable negative cycle. Heap-based Dijkstra pushes updated distances and ignores stale heap entries, or uses decrease-key when supported.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Bellman–Ford can stop early if a full pass makes no update. Its negative-cycle claim applies to cycles reachable from the source unless a super-source is added. Dijkstra can tolerate zero-weight edges but not arbitrary negative edges. With lazy duplicate heap entries, complexity is typically stated `O((V + E) log V)` or `O(E log V)` under standard assumptions.

#### ALL VARIATIONS COVERED
- **Q16:** Bellman–Ford finds single-source shortest paths with negative edge weights and detects reachable negative-weight cycles; its time is `O(VE)`.
- **Q17:** Dijkstra repeatedly extracts the closest unsettled vertex and relaxes its edges; with a min-heap and adjacency list, time is `O((V + E) log V)`, often written `O(E log V)`. ⚠️ It requires non-negative weights.

#### CONNECTIONS TO OTHER TOPICS
Edge relaxation, priority queues, BFS for unit weights, `0-1 BFS`, shortest-path trees, DAG shortest paths, Floyd–Warshall, negative cycles, adjacency representations, and greedy correctness proofs.

#### CODE / EXAMPLE (if applicable)
```text
dist[source] = 0
heap.push((0, source))
while heap not empty:
    (d, u) = heap.popMin()
    if d != dist[u]: continue          // stale entry
    for (v, w) in graph[u]:
        if d + w < dist[v]:
            dist[v] = d + w
            heap.push((dist[v], v))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State edge assumptions before choosing the algorithm. Explain relaxation and why Dijkstra fails with negative edges rather than merely repeating the restriction. State graph representation alongside complexity. Avoid confusing a negative edge with a negative cycle: Bellman–Ford supports the former and reports the latter.

#### ONE-LINE SUMMARY
Use heap-based Dijkstra for non-negative edges in `O((V + E) log V)`; use `O(VE)` Bellman–Ford when negative edges or negative-cycle detection matter.

---

### TREES, SPANNING TREES, AND KRUSKAL'S MST ⚡
**Covers questions: 18, 19, 20**

#### CORE CONCEPT (30 seconds)
A graph is the general structure of vertices and edges; a tree is a connected, acyclic undirected graph with exactly `V - 1` edges. A spanning tree selects edges that connect every vertex of a connected undirected graph without cycles. Kruskal's algorithm builds a minimum spanning tree by taking edges from lowest weight upward whenever they connect two different components.

#### WHY IT EXISTS
General graphs may contain redundant routes and cycles. A spanning tree keeps just enough edges to preserve connectivity, and a minimum spanning tree minimises their total cost. Kruskal turns this into a greedy choice and uses disjoint sets to reject edges that would form cycles.

#### MENTAL MODEL
A graph is a city's full road network. A spanning tree closes redundant roads but keeps every neighbourhood connected. Kruskal opens the cheapest road available unless its endpoints are already connected, preventing a loop while building the cheapest network.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  A tree is connected and acyclic and has `V - 1` edges. A spanning tree contains all vertices, is connected, and has no cycle. Kruskal finds a minimum spanning tree.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Sort edges by weight; use union–find to test whether endpoints belong to different components; add accepted edges until `V - 1` have been selected. Sorting dominates, so time is `O(E log E)` with near-constant amortized union/find.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A connected graph always has a spanning tree; a disconnected graph has a spanning forest. Equal weights may produce multiple valid MSTs with the same total cost. Negative edge weights do not break Kruskal. An MST minimises total network cost; it is not the same as a shortest-path tree from one source.

#### ALL VARIATIONS COVERED
- **Q18:** A graph may be directed or undirected, cyclic or acyclic, connected or disconnected; a tree is the connected, acyclic special case with a unique simple path between every vertex pair.
- **Q19:** A spanning tree includes every vertex of a connected undirected graph using exactly `V - 1` edges and no cycle.
- **Q20:** Kruskal finds a minimum spanning tree by sorting edges and accepting only those that join different union–find components.

#### CONNECTIONS TO OTHER TOPICS
Union–find, path compression, union by rank/size, Prim's algorithm, cycle detection, cut property, greedy algorithms, connected components, network design, and shortest paths versus minimum spanning trees.

#### CODE / EXAMPLE (if applicable)
```text
sort edges by increasing weight
mst = []
for (u, v, w) in edges:
    if find(u) != find(v):
        union(u, v)
        mst.append((u, v, w))
        if length(mst) == V - 1: break
```

If fewer than `V - 1` edges are accepted, the graph was disconnected.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Build the explanation as a chain: graph → tree → spanning tree → minimum spanning tree. For Kruskal, justify both the sort and the cycle test, and name union–find. Avoid confusing MST with shortest paths or saying every graph has a spanning tree without requiring connectedness.

#### ONE-LINE SUMMARY
A tree is a connected acyclic graph; a spanning tree connects all vertices with `V - 1` edges, and Kruskal greedily finds the minimum-cost one using sorted edges and union–find.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q11–Q13 (arrays and linked lists)** connect to circular linked lists, reversing a linked list, Floyd cycle detection, implementing queues/stacks, and building an LRU cache.
- **Q14 (trie)** prepares for later prefix problems and Word Search II, where a trie prunes many impossible string paths.
- **Q15 (DP/memoization)** is foundational for knapsack, Fibonacci, coin change, longest common subsequence, grid paths, subset sum, and matrix-chain multiplication.
- **Q16–Q17 (shortest paths)** connect to Floyd–Warshall, negative-cycle detection, unweighted shortest paths with BFS, `0-1 BFS`, and longest paths in DAGs.
- **Q18–Q20 (tree/MST)** prepare for tree traversals, complete/full/balanced trees, topological sorting, union–find, Prim versus Kruskal, and connected-component questions.
- **Q20 (Kruskal)** directly depends on the upcoming union–find topics: disjoint sets, path compression, and union by rank.

### Be Comfortable With Before Batch 03 (Questions 21–30)

- Heap array indexing and the difference between one `heapify` call and building an entire heap.
- Tree height, levels, and the meanings of complete, full, perfect, and balanced.
- Recursive traversal order: preorder, inorder, and postorder.
- Range-query motivation: why repeatedly scanning an array can be too slow.
- DP formulation for knapsack-style include/exclude choices.
- All-pairs versus single-source shortest paths.
- Stability in sorting and when preserving equal-key order matters.

### Batch 02 Rapid Recall

11. Array stack: locality and amortized growth; linked stack: node overhead and no resizing.
12. Prefer linked lists for frequent splicing at known positions without random access.
13. Delete a given doubly linked-list node: `O(1)`.
14. Trie: shared-prefix tree with `O(L)` word operations.
15. Memoization is top-down DP; tabulation is bottom-up DP.
16. Bellman–Ford: negative edges/cycle detection in `O(VE)`.
17. Dijkstra with min-heap: `O((V + E) log V)` for non-negative weights.
18. Tree: connected, acyclic graph with a unique simple path between pairs.
19. Spanning tree: all vertices, connected, no cycles, `V - 1` edges.
20. Kruskal: sort edges and join components to obtain an MST.
