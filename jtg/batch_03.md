# JTG Technical Interview Coaching — Batch 03

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 21–30

## Questions in This Batch

21. ⚡⚠️ What is the time complexity of heapify?
22. ⚡ What is an AVL tree?
23. ⚡⚠️ What is the maximum number of nodes in a binary tree of height `h`?
24. What is a segment tree used for?
25. ⚡ What is the difference between inorder, preorder, and postorder traversal?
26. What is a circular linked list?
27. ⚡ What is the knapsack problem?
28. ⚡⚠️ What is the purpose of the Floyd–Warshall algorithm?
29. ⚡ What is the difference between stable and unstable sorting algorithms?
30. ⚡⚠️ What is counting sort, and when is it more efficient than comparison-based sorts?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Restoring the heap invariant | 21 | The key distinction is one-node heapify versus building an entire heap. |
| B | Binary-tree shape, balance, and traversal | 22, 23, 25 | These ask how tree height is controlled, how capacity depends on height, and how traversal order changes meaning. |
| C | Range-query trees | 24 | Segment trees solve a specialised update/query problem and deserve a focused answer. |
| D | Cyclic linked structures | 26 | Circular linking changes traversal termination and enables repeated rotation. |
| E | Knapsack and DP state design | 27 | Knapsack is the canonical include/exclude dynamic-programming problem. |
| F | All-pairs shortest paths | 28 | Floyd–Warshall differs from the single-source algorithms in Batch 2. |
| G | Sorting guarantees and key-range algorithms | 29, 30 | Stability is a sorting guarantee; counting sort shows how non-comparison sorting can exploit a bounded key range. |

---

### HEAPIFY AND THE HEAP INVARIANT ⚡⚠️
**Covers questions: 21**

#### CORE CONCEPT (30 seconds)
Heapify, meaning sift-down from one node whose children are already heaps, takes `O(log n)` in the worst case because the element can move down at most the heap height. Building a heap by calling heapify bottom-up on all internal nodes is a different operation and takes `O(n)`.

#### WHY IT EXISTS
After removing or replacing a heap root, the parent–child priority rule may be broken at one location. Heapify restores that rule efficiently without sorting the structure. This is the operation behind priority-queue extraction and part of heap sort.

#### MENTAL MODEL
A manager is placed too high in an organisation chart. Compare them with their children, swap with the better-qualified child, and continue downward until reporting order is valid. The journey crosses at most the tree height.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  One-node heapify is `O(log n)` worst case. Heap height is `O(log n)` because a binary heap is complete.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For a min-heap, compare the node with both children, swap with the smaller child, and repeat. The best case is `O(1)` when no swap is needed. Inserting usually uses sift-up; removing the root uses sift-down.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Heapify” is overloaded: some libraries call whole-array heap construction `heapify`, which is `O(n)`. Clarify the definition. Bottom-up build-heap is linear because most nodes sit near the leaves and move only a few levels—not `n` independent full-height moves.

#### ALL VARIATIONS COVERED
- **Q21:** Standard sift-down heapify on one node is `O(log n)` worst case and `O(1)` best case. ⚠️ Whole-array build-heap is `O(n)`, so state which operation you mean.

#### CONNECTIONS TO OTHER TOPICS
Binary heaps, priority queues, heap sort, build-heap analysis, complete binary trees, top-`k` problems, and array representation of trees.

#### CODE / EXAMPLE (if applicable)
```text
heapifyDown(a, i, n):              // min-heap
    while true:
        smallest = i
        left = 2*i + 1; right = 2*i + 2
        if left  < n and a[left]  < a[smallest]: smallest = left
        if right < n and a[right] < a[smallest]: smallest = right
        if smallest == i: return
        swap(a[i], a[smallest])
        i = smallest
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Answer `O(log n)` immediately, then disambiguate it from `O(n)` build-heap. Explain the bound through heap height, not memorisation. When coding, compare both children before swapping and handle missing children cleanly.

#### ONE-LINE SUMMARY
One-node heapify moves through at most the heap height, so it is `O(log n)`; building the full heap bottom-up is `O(n)`.

---

### BINARY-TREE BALANCE, CAPACITY, AND TRAVERSAL ⚡⚠️
**Covers questions: 22, 23, 25**

#### CORE CONCEPT (30 seconds)
An AVL tree is a self-balancing BST where every node's left and right subtree heights differ by at most one, keeping operations `O(log n)`. A binary tree of edge-height `h` contains at most `2^(h+1) - 1` nodes. Traversal order describes when the root is visited: inorder is left–root–right, preorder is root–left–right, and postorder is left–right–root.

#### WHY IT EXISTS
BSTs become slow if their shape degenerates into a chain, so AVL rotations keep height logarithmic. Height formulas quantify the maximum shape. Traversal orders expose different information: sorted keys, parent-before-child processing, or child-before-parent processing.

#### MENTAL MODEL
Treat every subtree as a family: preorder meets the parent before the children, inorder meets the parent between the two children, and postorder meets the parent after both children. AVL rules stop either side of the family tree from growing much taller than the other.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  AVL balance factor is `height(left) - height(right)` and must be `-1`, `0`, or `1`. Maximum nodes at edge-height `h` are `2^(h+1) - 1`. Memorise LNR, NLR, and LRN for inorder, preorder, and postorder.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  AVL insertion follows BST insertion, updates heights, then applies LL, RR, LR, or RL rotations. Inorder traversal of a BST yields nondecreasing keys. Preorder helps serialise/copy structure; postorder helps delete/free children before parents.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Height conventions differ: if a single root has height `0`, use `2^(h+1)-1`; if `h` means number of levels and the root is level `1`, use `2^h-1`. AVL trees are more strictly balanced than Red–Black trees, often improving lookup height but potentially causing more rebalancing on updates. Traversal is `O(n)` time and uses `O(h)` recursion/stack space.

#### ALL VARIATIONS COVERED
- **Q22:** An AVL tree is a BST that maintains balance factor `-1`, `0`, or `1` using rotations, guaranteeing `O(log n)` search, insertion, and deletion.
- **Q23:** With root height `0`, the maximum node count is `2^(h+1) - 1`. ⚠️ If height means levels, the formula is `2^h - 1`; state the convention.
- **Q25:** Inorder = left–root–right, preorder = root–left–right, and postorder = left–right–root; the difference is when the root is processed.

#### CONNECTIONS TO OTHER TOPICS
Balanced BSTs, Red–Black trees, rotations, recursion, tree height, complete/full/perfect trees, expression trees, tree serialisation, DFS, and recursion-stack limits.

#### CODE / EXAMPLE (if applicable)
```text
traverse(node):
    if node == null: return
    // preorder action here
    traverse(node.left)
    // inorder action here
    traverse(node.right)
    // postorder action here
```

One skeleton produces all three traversals by moving the action point.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Tie AVL balance to guaranteed height and name rotations. For the formula, state your height convention before calculating. For traversal, give both order and one practical use; avoid claiming inorder sorts an arbitrary binary tree—it produces sorted order only when the tree satisfies the BST property.

#### ONE-LINE SUMMARY
AVL rotations preserve logarithmic height; a height-`h` binary tree holds at most `2^(h+1)-1` nodes under edge-height convention, and traversal order is determined by where the root is processed.

---

### SEGMENT TREES FOR RANGE QUERIES
**Covers questions: 24**

#### CORE CONCEPT (30 seconds)
A segment tree stores aggregate information for array intervals, allowing range queries and point updates—such as sum, minimum, or maximum—in `O(log n)` after `O(n)` construction.

#### WHY IT EXISTS
Recomputing every range answer by scanning costs `O(n)` per query, while a prefix sum handles static sums but not frequent updates well. A segment tree decomposes any query range into a small number of precomputed segments and updates only the root-to-leaf path.

#### MENTAL MODEL
Imagine a manager hierarchy over an array: each leaf knows one value, each manager summarises the values below, and the root summarises everything. A changed employee updates only their chain of managers.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Used for range aggregate queries with updates. Build `O(n)`; query `O(log n)`; point update `O(log n)`; storage `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Each node represents `[left, right]` and combines two child aggregates. A query has three cases: no overlap, total overlap, and partial overlap. The identity value depends on the operation: `0` for sum, `+∞` for minimum.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Lazy propagation extends the structure to range updates while retaining logarithmic operations. The combine operation should be associative. Fenwick trees are simpler and smaller for prefix-friendly sum operations; sparse tables are excellent for immutable idempotent queries.

#### ALL VARIATIONS COVERED
- **Q24:** A segment tree supports efficient range aggregates plus updates, typically `O(log n)` per query or point update after `O(n)` build time.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, Fenwick trees, sparse tables, lazy propagation, divide-and-conquer, associative operations, coordinate compression, and interval queries.

#### CODE / EXAMPLE (if applicable)
```text
query(node, lo, hi, ql, qr):
    if qr < lo or hi < ql: return IDENTITY
    if ql <= lo and hi <= qr: return tree[node]
    mid = (lo + hi) / 2
    return combine(query(left, lo, mid, ql, qr),
                   query(right, mid+1, hi, ql, qr))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with the exact workload it solves: repeated range queries with updates. Compare it briefly with a simple scan or prefix sum. While coding, make overlap cases and the identity element explicit; those are common bug locations.

#### ONE-LINE SUMMARY
A segment tree precomputes interval aggregates so range queries and point updates both take `O(log n)`.

---

### CIRCULAR LINKED LISTS
**Covers questions: 26**

#### CORE CONCEPT (30 seconds)
A circular linked list is a linked list whose last node points back to the first instead of `null`. It supports repeated cyclic traversal and is useful for round-robin scheduling, circular queues, playlists, and turn-based systems.

#### WHY IT EXISTS
Some processes have no natural end: after the last participant, work returns to the first. Circular linking models that rotation directly and can represent a queue efficiently with only a tail pointer, because the head is `tail.next`.

#### MENTAL MODEL
People sit around a round table: every person has a next neighbour, and the last person points back to the first.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  The tail links to the head. Traversal stops when the starting node is reached again, not when a `null` link appears.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With a tail pointer, inserting at the front or rear can be `O(1)`. Empty and one-node cases need explicit handling. Circular lists may be singly or doubly linked.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A normal `while node != null` loop never terminates on a nonempty circular list. Preserve a start/sentinel node or a node count. Circular structure simplifies rotation but does not provide random access and retains linked-list cache/memory costs.

#### ALL VARIATIONS COVERED
- **Q26:** Define `tail.next = head`, explain termination by returning to the start, and give round-robin scheduling as the signature use.

#### CONNECTIONS TO OTHER TOPICS
Round-robin CPU scheduling, circular queues, Josephus problem, sentinel nodes, linked-list cycle detection, ring buffers, and turn rotation.

#### CODE / EXAMPLE (if applicable)
```text
printCircular(head):
    if head == null: return
    current = head
    do:
        print(current.value)
        current = current.next
    while current != head
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain what replaces the `null` terminator and how traversal safely stops. Mention empty and single-node behavior. Avoid confusing a circular linked list with a circular array buffer—the abstractions are similar, but storage and indexing differ.

#### ONE-LINE SUMMARY
A circular linked list makes the tail point to the head, directly modelling endlessly repeating order such as round-robin scheduling.

---

### THE KNAPSACK PROBLEM AND DP STATE DESIGN ⚡
**Covers questions: 27**

#### CORE CONCEPT (30 seconds)
In 0/1 knapsack, each item has a weight and value, and we choose each item at most once to maximise total value without exceeding capacity `W`. The standard DP considers “skip or take” for every item and capacity in `O(nW)` time.

#### WHY IT EXISTS
Greedy choices do not generally solve 0/1 knapsack because the locally best value or ratio can block a better combination. DP works because many candidate selections reduce to the same remaining item index and capacity.

#### MENTAL MODEL
Packing a flight bag: for each item, decide whether the value gained justifies consuming part of the remaining weight allowance, but remember the best result for every allowance.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Maximise value under a weight limit. 0/1 means take an item once or not at all. Standard complexity is `O(nW)` time and `O(nW)` space, reducible to `O(W)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State: best value using considered items at capacity `c`. Transition: skip item, or take it if its weight fits. In one-dimensional 0/1 DP, iterate capacity downward so the same item is not reused.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  `O(nW)` is pseudo-polynomial because it depends on numeric capacity, not its bit length. Unbounded knapsack allows repeated items and iterates capacity upward. Fractional knapsack permits fractions and is solved greedily by value/weight ratio.

#### ALL VARIATIONS COVERED
- **Q27:** Explain 0/1 knapsack as maximising value under capacity, using include/exclude DP in `O(nW)`; distinguish it from fractional and unbounded variants.

#### CONNECTIONS TO OTHER TOPICS
Subset sum, partition DP, coin change, memoization, tabulation, pseudo-polynomial algorithms, NP-completeness, greedy algorithms, and space optimisation.

#### CODE / EXAMPLE (if applicable)
```text
dp[0..W] = 0
for each item (weight, value):
    for c from W down to weight:
        dp[c] = max(dp[c], value + dp[c - weight])
return dp[W]
```

Descending capacity is what enforces the 0/1 constraint.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify which knapsack variant is being discussed before proposing an algorithm. Derive the state and include/exclude transition aloud. If using one-dimensional DP, explicitly justify backward iteration; a forward loop silently changes the problem to unbounded knapsack.

#### ONE-LINE SUMMARY
0/1 knapsack chooses each item at most once to maximise value under capacity, using include/exclude DP in `O(nW)`.

---

### FLOYD–WARSHALL ALL-PAIRS SHORTEST PATHS ⚡⚠️
**Covers questions: 28**

#### CORE CONCEPT (30 seconds)
Floyd–Warshall computes shortest-path distances between every pair of vertices using dynamic programming. It tries each vertex as an allowed intermediate and runs in `O(V³)` time with `O(V²)` space. It supports negative edges but not valid finite shortest paths through a negative cycle.

#### WHY IT EXISTS
Running a single-source algorithm repeatedly is not always the clearest choice, especially for dense, modest-sized graphs. Floyd–Warshall turns all-pairs shortest paths into one compact recurrence over allowed intermediate vertices.

#### MENTAL MODEL
Maintain a city-to-city distance table. When city `k` becomes an allowed transfer point, ask for every pair `(i, j)`: is going `i → k → j` cheaper than the best route already known?

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Purpose: all-pairs shortest paths. Time `O(V³)`, space `O(V²)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Initialise diagonal entries to zero, direct edges to their minimum weights, and unreachable pairs to infinity. The loop over intermediate `k` must be outermost for the standard in-place DP proof.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Negative edges are allowed. After completion, any `dist[i][i] < 0` reveals a reachable negative cycle involving `i`. Guard infinity arithmetic to avoid overflow. For sparse large graphs, repeated Dijkstra or Johnson's algorithm may be preferable.

#### ALL VARIATIONS COVERED
- **Q28:** Floyd–Warshall finds shortest distances for all vertex pairs in `O(V³)` and can detect negative cycles via a negative diagonal. ⚠️ It is not a single-source algorithm.

#### CONNECTIONS TO OTHER TOPICS
Dynamic programming, transitive closure, adjacency matrices, Bellman–Ford, Dijkstra, negative cycles, Johnson's algorithm, and path reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
for k in 0..V-1:
    for i in 0..V-1:
        for j in 0..V-1:
            if dist[i][k] != INF and dist[k][j] != INF:
                dist[i][j] = min(dist[i][j],
                                 dist[i][k] + dist[k][j])
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say “all pairs” immediately and derive the update in plain language. Contrast it with single-source Dijkstra/Bellman–Ford. Mention negative-edge support and negative-cycle detection without claiming meaningful shortest paths exist through such a cycle.

#### ONE-LINE SUMMARY
Floyd–Warshall uses every vertex as an intermediate to compute all-pairs shortest paths in `O(V³)` time and `O(V²)` space.

---

### SORT STABILITY AND COUNTING SORT ⚡⚠️
**Covers questions: 29, 30**

#### CORE CONCEPT (30 seconds)
A stable sort preserves the original relative order of records with equal keys; an unstable sort may reverse them. Counting sort avoids comparisons by counting integer keys in a bounded range of size `k`, running in `O(n + k)` time, so it beats `O(n log n)` comparison sorts when `k` is not much larger than `n`.

#### WHY IT EXISTS
Stability lets multiple sorts compose—for example, sort employees by name and then stably by department. Counting sort exploits extra knowledge about the key domain, bypassing the comparison-sorting lower bound when the range is small.

#### MENTAL MODEL
Students queue by arrival order. A stable sort groups them by score while keeping equal-score students in their original order. Counting sort places one labelled bucket for every possible score, counts students per bucket, then rebuilds the queue.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stable means equal-key order is preserved. Merge sort, insertion sort, and bubble sort are normally stable; heap sort and standard in-place QuickSort are normally unstable. Counting sort costs `O(n + k)` time and `O(n + k)` space in its stable form.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Counting sort builds frequencies, converts them to cumulative positions, and places items into output. Traverse input from right to left to preserve stability. It is appropriate for bounded integer-like keys, not arbitrary comparable objects.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Counting sort does not violate the `Ω(n log n)` bound because that bound applies to comparison sorting. A huge sparse range wastes time and memory. Negative keys work by offsetting with the minimum. Stability matters when records carry payloads and powers radix sort's digit-by-digit correctness.

#### ALL VARIATIONS COVERED
- **Q29:** Stable sorting keeps equal-key records in original order; unstable sorting gives no such guarantee. The difference matters for multi-key records and chained sorts.
- **Q30:** Counting sort counts a bounded key range and runs in `O(n + k)`; it is preferable when keys are discrete and `k` is reasonably close to `n`. ⚠️ A very large range makes it a poor choice.

#### CONNECTIONS TO OTHER TOPICS
Comparison lower bounds, merge sort, QuickSort, heap sort, radix sort, bucket sort, multi-key sorting, coordinate compression, and memory/time trade-offs.

#### CODE / EXAMPLE (if applicable)
```text
count[0..k] = frequencies of keys
for x from 1 to k: count[x] += count[x - 1]
for i from n - 1 down to 0:       // reverse preserves stability
    key = a[i].key
    output[count[key] - 1] = a[i]
    count[key]--
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Demonstrate stability with records, not duplicate bare integers whose identities are invisible. For counting sort, state both `n` and key-range `k`, plus the memory cost and domain constraint. Avoid saying it is always linear without qualifying the range.

#### ONE-LINE SUMMARY
Stability preserves equal-key order; counting sort can preserve it in `O(n + k)` and beats comparison sorting only when the integer key range is suitably small.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q21 (heapify)** leads directly to Q31, where building a heap is `O(n)`, and to Q35–Q36 on priority queues and their heap implementation.
- **Q22–Q25 (trees)** connect to Q32 (complete versus full trees), Q39 (Red–Black trees), later tree-depth/symmetry/diameter problems, and recursive versus iterative DFS.
- **Q24 (segment tree)** connects to sparse tables, Fenwick trees, prefix sums, and later range-query/update problems.
- **Q26 (circular linked list)** supports round-robin scheduling, cycle detection, circular queues, and linked-list pointer exercises.
- **Q27 (knapsack)** prepares subset sum, equal partition, coin change, target sum, and other include/exclude DP questions.
- **Q28 (Floyd–Warshall)** builds on Batch 2's single-source algorithms and prepares negative-cycle, transitive-closure, and dense-graph questions.
- **Q29–Q30 (sorting)** connect immediately to Q37 (radix sort), which relies on stable per-digit sorting, plus bucket sort and comparison lower bounds.

### Be Comfortable With Before Batch 04 (Questions 31–40)

- Why bottom-up build-heap is `O(n)` even though one heapify can be `O(log n)`.
- Complete, full, perfect, and balanced binary-tree definitions.
- DAGs, indegree, and when topological ordering exists.
- Iterative versus recursive DFS and explicit versus call stacks.
- Priority-queue operations and binary-heap implementation.
- Radix sort's dependence on stable digit sorting.
- Hash-table average versus worst-case analysis.
- Adjacency-list versus adjacency-matrix trade-offs.

### Batch 03 Rapid Recall

21. One-node heapify: `O(log n)`; whole build-heap: `O(n)`.
22. AVL: BST with subtree-height difference at most one.
23. Maximum nodes at edge-height `h`: `2^(h+1) - 1`.
24. Segment tree: range queries and updates in `O(log n)`.
25. Inorder LNR; preorder NLR; postorder LRN.
26. Circular list: tail links back to head.
27. 0/1 knapsack: include/exclude DP in `O(nW)`.
28. Floyd–Warshall: all-pairs shortest paths in `O(V³)`.
29. Stable sort preserves the order of equal-key records.
30. Counting sort: `O(n + k)` for a suitably small bounded key range.
