# JTG Technical Interview Coaching — Batch 17

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 161–170

## Questions in This Batch

161. ⚡ Explain merge sort and write pseudocode.
162. ⚡⚠️ Explain QuickSort and its best, average, and worst-case complexity.
163. ⚡⚠️ Rotate a matrix 90° clockwise in place.
164. ⚡⚠️ Find all permutations of a string.
165. ⚡⚠️ Implement a queue using two stacks.
166. ⚡ Explain backtracking using N-Queens.
167. ⚡⚠️ Describe Dijkstra's algorithm step by step.
168. ⚡⚠️ Find the number of connected components in a graph.
169. ⚡⚠️ Serialize and deserialize a binary tree.
170. ⚡⚠️ Explain memoization and implement it for coin change.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Divide-and-conquer sorting | 161, 162 | Both recursively split work, but merge sort guarantees balanced halves while QuickSort depends on pivot partitions. |
| B | In-place matrix transformation | 163 | Rotation is a geometric index transformation with a strict square-matrix assumption. |
| C | Backtracking search | 164, 166 | Permutations and N-Queens use choose → explore → undo over a decision tree. |
| D | Queue semantics from stacks | 165 | Two stacks reverse order twice and expose amortized FIFO behavior. |
| E | Graph traversal and shortest paths | 167, 168 | Dijkstra expands weighted reachability; component counting repeatedly starts ordinary traversal. |
| F | Unambiguous tree encoding | 169 | Serialization needs traversal order plus null structure so decoding is deterministic. |
| G | Memoized state search | 170 | Coin change turns recursive repeated amounts into cached DP states. |

---

### MERGE SORT AND QUICKSORT ⚡⚠️
**Covers questions: 161, 162**

#### CORE CONCEPT (30 seconds)
Merge sort splits the array into equal halves, recursively sorts them, then linearly merges two sorted halves; it is stable and always `O(n log n)` time with `O(n)` auxiliary array space. QuickSort partitions around a pivot so smaller values precede it and larger values follow, then recursively sorts partitions; it averages `O(n log n)` and is commonly in-place, but repeated `0`/`n-1` splits cause `O(n²)` worst-case time.

#### WHY IT EXISTS
Both avoid quadratic pairwise insertion by reducing one large order problem into smaller independent ones. Merge sort buys predictable performance/stability with extra memory. QuickSort buys locality and low auxiliary storage but its performance depends on partition balance.

#### MENTAL MODEL
Merge sort divides cards into equal piles and merges sorted piles using a spare table. QuickSort chooses a divider card, moves smaller cards left and larger cards right, and repeats; bad divider choices leave nearly the whole deck on one side.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Merge sort: best/average/worst `O(n log n)`, array space `O(n)`, stable. QuickSort: best/average `O(n log n)`, worst `O(n²)`, generally unstable and in-place apart from recursion.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Merge two sorted ranges with two pointers. QuickSort must state a partition scheme (Lomuto/Hoare), pivot rule, and inclusive/exclusive boundaries. Randomised/median-of-three pivots reduce likely imbalance; recurse on the smaller partition first to constrain stack depth in an optimised implementation.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Merge sort's recursion stack is `O(log n)` but its merge buffer dominates at `O(n)` for arrays; linked-list merge sort can relink with low auxiliary merge space. QuickSort stack is average `O(log n)`, worst `O(n)`. Many equal keys benefit from three-way partitioning. Best-case QuickSort still performs linear partition work across logarithmic levels.

#### ALL VARIATIONS COVERED
- **Q161:** Split until size ≤ 1, recursively sort both halves, then merge in `O(n)` per level; total `O(n log n)` and array auxiliary space `O(n)`.
- **Q162:** Partition around a pivot and recurse; best/average `O(n log n)`, worst `O(n²)`. ⚠️ Randomisation lowers worst-case probability but does not remove the theoretical bound.

#### CONNECTIONS TO OTHER TOPICS
Recurrences, Master Theorem, stability, inversion counting, external sorting, linked-list sorting, Quickselect, three-way partitioning, randomisation, and tail-recursion elimination.

#### CODE / EXAMPLE (if applicable)
```text
mergeSort(a, lo, hi):               // [lo, hi)
    if hi - lo <= 1: return
    mid = lo + (hi - lo) / 2
    mergeSort(a, lo, mid)
    mergeSort(a, mid, hi)
    mergeSortedRanges(a, lo, mid, hi)

quickSort(a, lo, hi):
    if lo >= hi: return
    p = partition(a, lo, hi)
    quickSort(a, lo, p - 1)
    quickSort(a, p + 1, hi)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State interval conventions before pseudocode and dry-run duplicates. Derive complexity from levels × work per level or partition balance. Compare stability, memory, and worst-case guarantees. Avoid mixing Hoare return boundaries with Lomuto recursive ranges.

#### ONE-LINE SUMMARY
Merge sort guarantees stable `O(n log n)` by merging balanced halves with extra space; QuickSort partitions in place and is fast on average but degrades to `O(n²)` on repeated bad splits.

---

### IN-PLACE 90° MATRIX ROTATION ⚡⚠️
**Covers questions: 163**

#### CORE CONCEPT (30 seconds)
For an `n × n` matrix, rotate 90° clockwise in place by transposing across the main diagonal and then reversing every row. This touches `n²` cells, so time is `O(n²)` and auxiliary space is `O(1)`.

#### WHY IT EXISTS
The coordinate mapping `(row, col) → (col, n-1-row)` can be implemented as two simple, verifiable transformations rather than error-prone four-way cycles. In-place transformation avoids allocating another matrix.

#### MENTAL MODEL
Transpose flips the image across its top-left-to-bottom-right diagonal; reversing each row then swings the reflected image clockwise into place.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Clockwise = transpose then reverse rows. Counter-clockwise = transpose then reverse columns. Complexity `O(n²)`/`O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  During transpose, swap only above/below the diagonal (`j > i`) so each pair changes once. Then use two pointers per row. Empty, `1×1`, odd/even dimensions naturally work.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A rectangular `m × n` matrix becomes `n × m`, so strict in-place rotation within a conventional fixed row layout is not the same problem; clarify square input. An alternative rotates four cells layer by layer. Jagged arrays are not matrices for this invariant.

#### ALL VARIATIONS COVERED
- **Q163:** Assuming a square matrix, transpose then reverse each row for `O(n²)` time and `O(1)` auxiliary space. ⚠️ Ask whether the matrix is square before claiming in-place rotation.

#### CONNECTIONS TO OTHER TOPICS
Matrix transpose, coordinate transforms, image processing, array indexing, layer traversal, reflection, and cache locality.

#### CODE / EXAMPLE (if applicable)
```text
rotateClockwise(matrix):
    n = rows(matrix)
    for i in 0..n-1:
        for j in i+1..n-1:
            swap(matrix[i][j], matrix[j][i])
    for each row:
        reverse(row)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Write the coordinate mapping first and use it to justify both transformations. State square-matrix assumption and test `2×2`/`3×3`. Avoid transposing every `(i,j)` pair, which swaps twice and restores the original matrix.

#### ONE-LINE SUMMARY
For a square matrix, transpose then reverse every row to rotate clockwise in `O(n²)` time and `O(1)` space.

---

### BACKTRACKING: PERMUTATIONS AND N-QUEENS ⚡⚠️
**Covers questions: 164, 166**

#### CORE CONCEPT (30 seconds)
Backtracking builds a candidate one choice at a time, abandons it as soon as it violates a constraint, and undoes the choice before trying the next. For permutations, choose each unused character for the next position. For N-Queens, place one queen per row only in an unused column and diagonals `row-col` and `row+col`.

#### WHY IT EXISTS
These problems require enumerating combinations but allow partial candidates to be rejected early. Backtracking systematically explores every valid branch while pruning impossible ones and restoring shared state correctly.

#### MENTAL MODEL
Explore a maze with chalk: choose a corridor, stop immediately at a dead end, erase the chalk mark while backing up, and try the next corridor.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Pattern: choose → mark → recurse → unmark. Permutations produce `n!` outputs in the distinct-character case. N-Queens places row by row and rejects same column/diagonal.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Permutations can use `used[]` plus a path or swap the current index with each remaining index. N-Queens uses sets/boolean arrays for columns and diagonals, making safety checks `O(1)`. Copy a complete path/board when recording it; do not store one mutable reference.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicate characters create duplicate permutations; sort and skip equal unused choices at the same depth, or use frequency counts. Backtracking time is output/exponential—permutation generation is at least `Ω(n·n!)` if each string is copied. N-Queens is commonly bounded around `O(n!)` search, with pruning greatly reducing actual nodes; bitmasks optimise columns/diagonals.

#### ALL VARIATIONS COVERED
- **Q164:** At position `i`, choose each remaining character, recurse, then undo; handle duplicate characters explicitly. ⚠️ Output size itself is factorial.
- **Q166:** N-Queens demonstrates backtracking by placing one valid queen per row, pruning attacked columns/diagonals, and removing the queen on return.

#### CONNECTIONS TO OTHER TOPICS
Subsets/combinations, recursion trees, branch-and-bound, constraint satisfaction, Sudoku, word search, graph colouring, Hamiltonian paths, and bitmasking.

#### CODE / EXAMPLE (if applicable)
```text
solve(row):
    if row == n: record board; return
    for col in 0..n-1:
        if col in columns or row-col in diag1 or row+col in diag2: continue
        add col, row-col, row+col
        place queen; solve(row + 1)
        remove queen; remove col, row-col, row+col
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the decision, validity test, base case, and undo step before coding. Explain pruning and output complexity. Dry-run the shared sets after returning. Avoid forgetting to unmark state or claiming exponential enumeration is `O(n)` because each recursion level loops once.

#### ONE-LINE SUMMARY
Backtracking explores a decision tree with choose–recurse–undo, pruning invalid permutation/queen placements as early as possible.

---

### QUEUE USING TWO STACKS ⚡⚠️
**Covers questions: 165**

#### CORE CONCEPT (30 seconds)
Use an `in` stack for enqueue and an `out` stack for dequeue/front. Push new items onto `in`; when `out` is empty, move every item from `in` to `out`, reversing order so the oldest item is on top. Each item moves at most once between stacks, so operations are `O(1)` amortized, though one dequeue can cost `O(n)`.

#### WHY IT EXISTS
A stack reverses order. Applying that reversal twice—arrival into `in`, then transfer into `out`—creates FIFO behavior while delaying work until it is necessary.

#### MENTAL MODEL
New plates stack at an entrance. When the serving stack is empty, move the whole pile across; the oldest plate becomes the top plate served first.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Enqueue pushes to `in`. Dequeue/peek transfers only if `out` is empty, then reads/pops `out`. Amortized `O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Never transfer while `out` still has items, or FIFO order breaks. Empty queue means both stacks empty. Provide a clear exception/sentinel contract for dequeue/peek on empty.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Aggregate proof: each element is pushed to `in`, popped once, pushed to `out`, and popped once—constant total stack operations per item. A real-time queue can achieve worst-case bounds with more complex incremental rotation, but the lazy two-stack solution is the interview default.

#### ALL VARIATIONS COVERED
- **Q165:** Maintain input/output stacks and transfer lazily only when output is empty; enqueue is `O(1)`, dequeue/peek `O(1)` amortized and `O(n)` worst for a transfer. ⚠️ State amortized, not worst-case `O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Amortized analysis, stack/queue ADTs, lazy evaluation, producer–consumer queues, persistent/real-time queues, and recursion reversal.

#### CODE / EXAMPLE (if applicable)
```text
enqueue(x): in.push(x)

prepareOut():
    if out.empty():
        while not in.empty(): out.push(in.pop())

dequeue():
    prepareOut()
    if out.empty(): error
    return out.pop()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why transfer occurs only on demand and prove amortized cost by counting each element's moves. Demonstrate `enqueue 1,2; dequeue; enqueue 3; dequeue`. Avoid transferring on every dequeue or every enqueue.

#### ONE-LINE SUMMARY
Two stacks implement FIFO by lazily reversing the input stack into an output stack, giving `O(1)` amortized operations.

---

### DIJKSTRA AND CONNECTED COMPONENTS ⚡⚠️
**Covers questions: 167, 168**

#### CORE CONCEPT (30 seconds)
Dijkstra finds single-source shortest paths with non-negative weights: initialise source distance `0`, repeatedly pop the smallest tentative distance, skip stale entries, and relax outgoing edges. With an adjacency list/min-heap it runs in `O((V+E) log V)`. To count connected components in an undirected graph, scan every vertex; whenever one is unvisited, increment the count and run DFS/BFS to mark that entire component, taking `O(V+E)`.

#### WHY IT EXISTS
Dijkstra expands reachable vertices in provably final distance order when weights cannot reduce a path later. Component counting asks how many independent traversal starts are needed to cover a graph.

#### MENTAL MODEL
Dijkstra is a wave spreading through roads at weighted travel times; the next closest unsettled location becomes final. Components are islands: start one flood-fill per still-dry island and count how many floods were needed.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Dijkstra needs non-negative weights and uses relaxation/min-heap. Components use repeated DFS/BFS from every unvisited vertex.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Relax `(u,v,w)` when `dist[u]+w < dist[v]`, update parent, and push the new pair. Lazy heaps may contain duplicate stale entries; ignore a popped distance unequal to `dist[u]`. Isolated vertices each form a component.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zero weights are valid; negative weights invalidate Dijkstra's greedy finalisation. Early exit is safe when the target is popped with its current shortest distance. For directed graphs, “component” is ambiguous: weak components ignore direction; strongly connected components require Kosaraju/Tarjan. Recursion depth may require iterative traversal.

#### ALL VARIATIONS COVERED
- **Q167:** Initialise, extract minimum, skip stale, relax every outgoing edge, and optionally reconstruct via parent pointers. ⚠️ State the non-negative-weight requirement.
- **Q168:** For an undirected graph, start DFS/BFS at each unvisited vertex and count starts in `O(V+E)`. ⚠️ Clarify weak versus strong components if the graph is directed.

#### CONNECTIONS TO OTHER TOPICS
BFS, Bellman–Ford, priority queues, shortest-path trees, relaxation, Prim, union–find, flood fill, SCC algorithms, and adjacency representations.

#### CODE / EXAMPLE (if applicable)
```text
dist[source] = 0; heap.push((0, source))
while heap not empty:
    (d, u) = heap.popMin()
    if d != dist[u]: continue
    for (v, w) in graph[u]:
        if d + w < dist[v]:
            dist[v] = d + w
            parent[v] = u
            heap.push((dist[v], v))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State assumptions and representation before complexity. Narrate relaxation and why popped current minima are final. For components, handle disconnected/isolated vertices and directed ambiguity. Avoid using Dijkstra on negative weights.

#### ONE-LINE SUMMARY
Dijkstra greedily expands minimum non-negative distance; component counting repeatedly flood-fills each still-unvisited region.

---

### BINARY-TREE SERIALIZATION AND DESERIALIZATION ⚡⚠️
**Covers questions: 169**

#### CORE CONCEPT (30 seconds)
Serialize a binary tree with preorder traversal and explicit null markers; deserialize by reading tokens in the same order—null returns no node, otherwise create a node and recursively decode its left and right children. Null markers preserve shape, giving `O(n)` time and `O(n)` output plus `O(h)` recursion space.

#### WHY IT EXISTS
Values and traversal order alone may not uniquely identify an arbitrary binary tree. Null markers make structure explicit so storage/network transport can reproduce exactly the same tree.

#### MENTAL MODEL
A preorder blueprint says “node, then left room, then right room,” and writes `#` wherever a room is absent. The decoder follows the blueprint in the same sequence.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use preorder/BFS with null markers and delimiters. Encode/decode visits each node/marker once.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Serialization: append value, serialize left, serialize right; append `#` for null. Deserialization consumes one token via a shared index/iterator, then recursively builds left/right. Handle empty tree, negative/multi-digit values, and malformed input contract.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Delimiter escaping or length-prefix/binary encoding is necessary for arbitrary string values. Recursive depth can overflow on a skewed tree; BFS/iterative formats trade queue width. For BSTs, preorder plus bounds may omit null markers, but that relies on BST/duplicate policy and is not a general tree solution. Versioning/checksums matter in production serialization.

#### ALL VARIATIONS COVERED
- **Q169:** Use the same deterministic traversal and explicit null representation in both directions; preorder with `#` is the simplest `O(n)` whiteboard solution. ⚠️ Values without nulls do not preserve arbitrary tree shape.

#### CONNECTIONS TO OTHER TOPICS
Tree traversals, recursion, BFS, parsing, binary formats, BST bounds, network protocols, persistence, versioning, and malformed-input validation.

#### CODE / EXAMPLE (if applicable)
```text
serialize(node):
    if node == null: output "#"; return
    output node.value
    serialize(node.left); serialize(node.right)

deserialize(tokens):
    token = next()
    if token == "#": return null
    node = Node(parse(token))
    node.left = deserialize(tokens)
    node.right = deserialize(tokens)
    return node
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why null markers are required and show round-trip consistency. State token grammar and use an iterator/index cleanly. Dry-run a tree with one missing child. Avoid relying on inorder/preorder uniqueness unless values and additional traversal assumptions are guaranteed.

#### ONE-LINE SUMMARY
Encode traversal plus null structure and consume the same token grammar to reconstruct an arbitrary tree exactly in linear time.

---

### MEMOIZED COIN CHANGE ⚡⚠️
**Covers questions: 170**

#### CORE CONCEPT (30 seconds)
First clarify the variant. For minimum coins with unlimited denominations, define `solve(amount)` as the fewest coins needed: `solve(0)=0`, and for positive amounts take `1 + min(solve(amount-coin))` over valid coins. Cache each amount so it is computed once, giving `O(amount × numberOfCoins)` time and `O(amount)` cache/stack space.

#### WHY IT EXISTS
Plain recursion tries the same remaining amount through many coin orders and grows exponentially. Memoization preserves the natural top-down recurrence while reusing every remaining-amount answer.

#### MENTAL MODEL
For each remaining bill amount, write down the cheapest answer the first time it is solved. Any later route reaching that amount reads the note instead of recomputing all choices.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Memoization = recursion plus cache. Minimum-coin state can be remaining amount; impossible states return infinity/sentinel.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Check cache before recursion, avoid negative amounts, and cache impossible results too. Return `-1` only at the public boundary; internally use `INF` to avoid mixing impossible with valid counts. Deduplicate/validate positive coin values.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Coin change” may instead ask number of combinations; then state often needs `(coinIndex, amount)` to avoid counting different orders as distinct, or bottom-up coin-first iteration. Minimum coin and number-of-ways recurrences are not interchangeable. Top-down recursion depth can reach `amount/minCoin`; bottom-up avoids stack risk.

#### ALL VARIATIONS COVERED
- **Q170:** For minimum unlimited coins, memoise remaining amount and minimise `1 + solve(remainder)` in `O(A·C)`. ⚠️ Clarify minimum coins versus combinations/permutations before defining state.

#### CONNECTIONS TO OTHER TOPICS
Unbounded knapsack, tabulation, shortest path on an implicit graph, target sum, combinations versus permutations, sentinel design, state selection, and recursion depth.

#### CODE / EXAMPLE (if applicable)
```text
solve(amount):
    if amount == 0: return 0
    if amount < 0: return INF
    if amount in memo: return memo[amount]
    best = INF
    for coin in coins:
        sub = solve(amount - coin)
        if sub != INF: best = min(best, 1 + sub)
    memo[amount] = best
    return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify the variant, define state/base/impossible result, then write recurrence and cache. Prove complexity by number of states × transitions. Avoid returning zero for impossible states or using zero-valued/negative coins that create cycles.

#### ONE-LINE SUMMARY
Memoized coin change caches each remaining amount, turning repeated exponential recursion into `O(amount × coinTypes)` for the minimum-coin variant.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q161–Q162 (sorting)** connect to Quickselect, inversion counting, external sort, stable sorting, and divide-and-conquer analysis.
- **Q163 (matrix rotation)** prepares matrix traversal, transpose, layer processing, and in-place coordinate transformations.
- **Q164 and Q166 (backtracking)** lead to subsets, combinations, word search, Hamiltonian paths, graph colouring, and constrained generation.
- **Q165 (two-stack queue)** reinforces amortized analysis and prepares stack-using-queue/queue-using-stack variants.
- **Q167–Q168 (graphs)** connect to negative-cycle detection, unweighted shortest paths, MSTs, bipartite checks, and SCCs.
- **Q169 (tree encoding)** prepares BST serialization, tree flattening, persistence, and parser-style recursion.
- **Q170 (coin change)** connects to knapsack, number-of-ways DP, target sum, and minimum-cost state graphs.

### Be Comfortable With Before Batch 18 (Questions 171–180)

- LIS `O(n²)` DP and `O(n log n)` tails/binary-search method.
- Two-heap invariants for median from a stream.
- Topological sorting and DAG applications.
- Bellman–Ford negative-cycle detection.
- BFS shortest paths in unweighted graphs.
- Greedy-choice property and exchange arguments.
- Activity selection by earliest finishing time.
- Subset generation with backtracking/bit masks.
- Hash-map buckets, collisions, load factor, and resizing.
- Binary search in a rotated sorted array.

### Batch 17 Rapid Recall

161. Merge sort: split/merge, stable guaranteed `O(n log n)`, `O(n)` array space.
162. QuickSort: partition/recurse, average `O(n log n)`, worst `O(n²)`.
163. Clockwise square rotation: transpose then reverse rows.
164. Permutations: choose each unused item, recurse, undo; handle duplicates.
165. Two-stack queue: lazy transfer gives `O(1)` amortized operations.
166. N-Queens: row-wise backtracking with column/diagonal pruning.
167. Dijkstra: min-heap relaxation for non-negative weights.
168. Components: count DFS/BFS starts from unvisited vertices.
169. Tree serialization: traversal plus null markers.
170. Memoized minimum coin change: remaining-amount state in `O(A·C)`.
