# JTG Technical Interview Coaching — Batch 01

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 1–10

## Questions in This Batch

1. ⚡ What is the time complexity of binary search on a sorted array of `n` elements?
2. ⚡ Which data structure uses LIFO (Last In First Out) order?
3. ⚡⚠️ What is the worst-case time complexity of QuickSort?
4. ⚡⚠️ What is the space complexity of merge sort?
5. ⚡ What is the difference between a min-heap and a max-heap?
6. ⚡ What is the time complexity of inserting an element in a balanced BST?
7. ⚡ What is a hash collision, and what are two strategies to resolve it?
8. ⚡ What is the difference between BFS and DFS traversal?
9. ⚡⚠️ What is the time complexity of BFS and DFS on a graph with `V` vertices and `E` edges?
10. What is a deque (double-ended queue), and where is it used?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Divide-and-conquer and complexity analysis | 1, 3, 4 | These test whether you can derive time or space from how an algorithm divides and combines work. |
| B | Restricted-access linear data structures | 2, 10 | Stack and deque differ mainly in which ends allow insertion and removal. |
| C | Ordered tree structures and invariants | 5, 6 | A heap and a balanced BST both maintain ordering rules, but support different operations efficiently. |
| D | Hashing and collision handling | 7 | This needs its own master answer because collisions, load factor, and resolution strategy form one complete concept. |
| E | Graph traversal | 8, 9 | These are two phrasings of the same root topic, so they are merged rather than repeated. |

---

### DIVIDE-AND-CONQUER AND COMPLEXITY ANALYSIS ⚡⚠️
**Covers questions: 1, 3, 4**

#### CORE CONCEPT (30 seconds)
Binary search halves one sorted search range per step, so it takes `O(log n)` time. QuickSort is usually `O(n log n)`, but its worst case is `O(n²)` when each pivot creates a highly uneven split. Merge sort always takes `O(n log n)` time and, for arrays, normally needs `O(n)` auxiliary space to merge.

#### WHY IT EXISTS
Divide-and-conquer turns one large problem into smaller versions of the same problem. Binary search discards half the candidates; QuickSort partitions around a pivot; merge sort sorts halves and combines them. The key interview skill is not memorising three complexities—it is explaining how the split quality and combine work produce them.

#### MENTAL MODEL
Think of repeatedly handling a deck of cards:

- **Binary search:** discard half the deck after each comparison.
- **QuickSort:** choose a divider card and split into smaller/larger piles; bad dividers leave one pile almost unchanged.
- **Merge sort:** split evenly until single cards, then merge sorted piles using a temporary tray.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Binary search: `O(log n)` time. QuickSort worst case: `O(n²)`. Array merge sort: `O(n)` auxiliary space and `O(n log n)` time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State the precondition for binary search: sorted data. Explain that QuickSort reaches `O(n²)` when partition sizes repeatedly become `0` and `n-1`. Explain that merging arrays needs a temporary buffer, while QuickSort is commonly in-place apart from its recursion stack.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Randomised pivots make repeated bad QuickSort splits unlikely but do not change the theoretical worst case. Binary search on a linked list is not generally `O(log n)` end-to-end because reaching the middle is not `O(1)`. For merge sort, array implementations use `O(n)` auxiliary storage plus an `O(log n)` call stack; linked-list merging can relink nodes with `O(1)` merge space.

#### ALL VARIATIONS COVERED
- **Q1:** On a sorted array, binary search takes `O(log n)` time because the candidate range halves after each comparison; iterative space is `O(1)`.
- **Q3:** QuickSort's worst-case time is `O(n²)` when pivot choices repeatedly produce maximally unbalanced partitions. ⚠️ Do not answer with its average `O(n log n)`.
- **Q4:** Standard merge sort on arrays uses `O(n)` auxiliary space; the recursion stack adds `O(log n)` but does not change the overall `O(n)`. ⚠️ Say which implementation/data structure you assume.

#### CONNECTIONS TO OTHER TOPICS
Recurrence relations, the recursion stack, the Master Theorem, stable sorting, in-place algorithms, pivot selection, randomisation, lower bounds for comparison sorting, and binary-search variants such as lower/upper bound.

#### CODE / EXAMPLE (if applicable)
```text
binarySearch(a, target):
    lo = 0, hi = length(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) / 2
        if a[mid] == target: return mid
        if a[mid] < target:  lo = mid + 1
        else:                hi = mid - 1
    return -1
```

Using `lo + (hi - lo) / 2` avoids the overflow risk of `(lo + hi) / 2` in fixed-width integer languages.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Lead with the exact complexity, then justify it in one sentence. State assumptions such as “sorted array” and “standard array merge sort.” If asked to code, use clear boundary names and test empty, one-element, absent-target, and duplicate-value cases aloud. Avoid dumping memorised best/average/worst tables without explaining the partition or merge behavior.

#### ONE-LINE SUMMARY
Binary search halves the search space (`O(log n)`), bad QuickSort pivots can cause `O(n²)`, and array merge sort pays `O(n)` extra space for predictable merging.

---

### STACKS AND DEQUES ⚡
**Covers questions: 2, 10**

#### CORE CONCEPT (30 seconds)
A stack allows insertion and removal at one end, so it follows LIFO: the last item pushed is the first popped. A deque allows insertion and removal at both the front and rear, usually in `O(1)`, so it can behave as either a stack or a queue.

#### WHY IT EXISTS
These structures deliberately restrict access so common ordering rules are cheap and obvious. A stack tracks the most recent unfinished work, while a deque supports algorithms that need to add or discard candidates from either end.

#### MENTAL MODEL
A stack is a pile of plates: use only the top. A deque is a train platform with doors at both ends: passengers can enter or leave from either side.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stack = LIFO; core operations are `push`, `pop`, and `peek`. Deque = double-ended queue; insert/delete at front and rear.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A stack can use a dynamic array or linked list. A deque is commonly implemented with a circular buffer or doubly linked list. End operations are `O(1)`; searching remains `O(n)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A circular-buffer deque avoids shifting elements by wrapping indices. A monotonic deque removes dominated candidates and solves sliding-window maximum in `O(n)`. `0-1 BFS` uses a deque: weight-0 edges go to the front and weight-1 edges to the back.

#### ALL VARIATIONS COVERED
- **Q2:** The **stack** uses LIFO order; the answer should include one operation pair (`push`/`pop`) and one use such as recursion or undo.
- **Q10:** A **deque** supports both-end insertion and deletion; common uses include sliding-window algorithms, task scheduling, palindrome checks, and implementing a stack or queue.

#### CONNECTIONS TO OTHER TOPICS
Function call stacks, recursion, iterative DFS, expression parsing, undo/redo, queue behavior, circular arrays, monotonic queues, sliding windows, and `0-1 BFS`.

#### CODE / EXAMPLE (if applicable)
```text
// Monotonic deque stores indices; values decrease from front to back.
for i in 0..n-1:
    while deque not empty and deque.front <= i - k: pop_front()
    while deque not empty and a[deque.back] <= a[i]: pop_back()
    push_back(i)
    if i >= k - 1: output a[deque.front]
```

Each index enters and leaves once, so the total time is `O(n)`.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the access rule before listing applications. Use precise operation names and mention empty-structure handling. If implementation is requested, describe why a circular buffer avoids costly shifting. Do not say a deque is merely “a queue in both directions” without specifying that both insertion and deletion are supported at both ends.

#### ONE-LINE SUMMARY
A stack is one-ended LIFO; a deque exposes both ends in `O(1)` and can power stack, queue, and sliding-window behavior.

---

### HEAPS AND BALANCED BINARY SEARCH TREES ⚡
**Covers questions: 5, 6**

#### CORE CONCEPT (30 seconds)
A min-heap keeps the smallest element at the root; a max-heap keeps the largest there, but neither fully sorts all elements. A balanced BST keeps left keys smaller and right keys larger while maintaining height `O(log n)`, so insertion takes `O(log n)`.

#### WHY IT EXISTS
Different ordering guarantees serve different queries. Heaps optimise repeated access to one extreme value, which makes them ideal for priority queues. Balanced BSTs preserve searchable key order, enabling search, insertion, deletion, predecessor/successor, and ordered traversal efficiently.

#### MENTAL MODEL
A heap is a company where only the CEO rule matters at every subtree: the highest- or lowest-priority person rises to the top. A balanced BST is a well-organised decision tree: every comparison sends you left or right, and balancing prevents a long corridor.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Min-heap root = minimum; max-heap root = maximum. Balanced BST insertion = `O(log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Heap peek is `O(1)` and insert/extract is `O(log n)`, but arbitrary-key search is `O(n)`. A balanced BST follows the search path, inserts, then restores balance with rotations or recolouring depending on the tree type.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A binary heap is a complete tree and maps compactly to an array. Its heap-order property is partial, unlike a BST's global search ordering. AVL trees enforce stricter balance than Red-Black trees; both guarantee logarithmic height. Duplicate-key policy must be defined—count, consistently place, or reject duplicates.

#### ALL VARIATIONS COVERED
- **Q5:** Min-heap and max-heap differ only in the direction of the heap-order property: parent `≤` children versus parent `≥` children; the root exposes the minimum or maximum.
- **Q6:** Inserting into a balanced BST is `O(log n)` because the height is logarithmic; locating the position and rebalancing both stay within that bound.

#### CONNECTIONS TO OTHER TOPICS
Priority queues, heap sort, top-`k` problems, median-from-stream, AVL and Red-Black rotations, ordered sets/maps, tree height, complete binary trees, and array indexing of trees.

#### CODE / EXAMPLE (if applicable)
```text
heapPush(heap, x):
    append x
    i = last index
    while i > 0 and heap[parent(i)] > heap[i]:
        swap heap[parent(i)], heap[i]
        i = parent(i)
```

For a min-heap this “bubble up” restores parent `≤` child in at most the tree height: `O(log n)`.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare the guarantees, not just the root names. Say explicitly that a heap is not a sorted tree and is poor for arbitrary search. For the BST complexity, tie `O(log n)` to bounded height and mention that an ordinary unbalanced BST can degrade to `O(n)`. Avoid claiming every operation on a heap is logarithmic—peek is `O(1)`.

#### ONE-LINE SUMMARY
Heaps expose one extreme efficiently; balanced BSTs preserve searchable order, and their logarithmic height makes insertion `O(log n)`.

---

### HASH COLLISIONS AND RESOLUTION ⚡
**Covers questions: 7**

#### CORE CONCEPT (30 seconds)
A hash collision occurs when two different keys map to the same bucket. Two standard solutions are **separate chaining**, which stores multiple entries per bucket, and **open addressing**, which probes for another free slot.

#### WHY IT EXISTS
A hash function compresses a huge key space into a finite number of buckets, so collisions are unavoidable. Collision handling lets a hash table keep distinct keys correct while retaining expected `O(1)` insert, search, and delete when the table is well-sized and hashes are well-distributed.

#### MENTAL MODEL
A hash is a building directory that assigns people to room numbers. Two people may receive the same room: chaining gives the room a guest list; open addressing sends the second person to the next acceptable vacant room.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Collision = different keys, same hash bucket. Name chaining and open addressing.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Chaining tolerates more entries than buckets but allocates bucket containers. Open addressing is cache-friendly but needs careful probing and deletion markers. Linear probing, quadratic probing, and double hashing are open-addressing variants.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Performance depends on load factor and hash distribution; resize/rehash before clustering becomes severe. Average operations are expected `O(1)`, but adversarial or excessive collisions can degrade to `O(n)`. A hash match is not enough—compare actual keys to confirm equality.

#### ALL VARIATIONS COVERED
- **Q7:** Define the collision first, then give two named strategies with one-line mechanics: chaining stores a bucket collection; open addressing probes another slot.

#### CONNECTIONS TO OTHER TOPICS
Hash functions, load factor, resizing and rehashing, equality contracts, linear/quadratic probing, double hashing, clustering, Bloom filters, caching, and hash-based security attacks.

#### CODE / EXAMPLE (if applicable)
```text
put(key, value):                 // separate chaining
    i = hash(key) mod capacity
    for entry in buckets[i]:
        if entry.key == key:
            entry.value = value
            return
    buckets[i].append((key, value))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why collisions are mathematically unavoidable, then compare the two solutions. Mention average versus worst-case complexity and the load factor. Avoid saying a “better hash function removes collisions”; it reduces their frequency but cannot eliminate them for an unrestricted key space.

#### ONE-LINE SUMMARY
Collisions are unavoidable bucket clashes; chaining stores colliding entries together, while open addressing probes elsewhere to preserve expected `O(1)` access.

---

### BFS AND DFS GRAPH TRAVERSAL ⚡⚠️
**Covers questions: 8, 9**

#### CORE CONCEPT (30 seconds)
BFS explores a graph level by level using a queue and finds shortest paths in an unweighted graph. DFS goes as deep as possible using recursion or a stack and is useful for cycles, components, and topological-style reasoning. With an adjacency list, both take `O(V + E)` time and `O(V)` auxiliary space.

#### WHY IT EXISTS
Graphs do not provide a natural linear order, so traversal systematically visits reachable vertices without looping forever. BFS preserves distance in edge counts; DFS preserves exploration ancestry, which reveals structural properties such as back edges and finishing order.

#### MENTAL MODEL
BFS is a ripple spreading outward from a stone dropped in water. DFS is exploring a maze by following one corridor until blocked, then backtracking to the last junction.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  BFS uses a queue; DFS uses a stack or recursion. Both are `O(V + E)` with adjacency lists.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark vertices visited to avoid repeated work and cycles. BFS gives minimum-edge distances in unweighted graphs. DFS is natural for cycle detection, connected components, topological sort on a DAG, and backtracking. Both use `O(V)` visited storage; the frontier/call stack can also grow to `O(V)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  To traverse a disconnected graph, start a traversal from every still-unvisited vertex. With an adjacency matrix, scanning neighbours costs `O(V)` per vertex, so traversal is `O(V²)`, not `O(V + E)`. In an undirected adjacency list each edge appears twice, but asymptotic time remains `O(V + E)`. Recursive DFS can overflow the language call stack on a deep graph.

#### ALL VARIATIONS COVERED
- **Q8:** Contrast exploration order and data structure first: BFS is level-order with a queue; DFS is depth-first with a stack/recursion. Then attach representative uses.
- **Q9:** With adjacency lists, both BFS and DFS take `O(V + E)` because every vertex is processed once and every edge is inspected a constant number of times. ⚠️ With an adjacency matrix, state `O(V²)`.

#### CONNECTIONS TO OTHER TOPICS
Shortest paths in unweighted graphs, connected components, cycle detection, bipartite checking, topological sorting, tree traversals, flood fill, recursion, iterative stacks, adjacency lists versus matrices, and `0-1 BFS`.

#### CODE / EXAMPLE (if applicable)
```text
BFS(graph, source):
    queue = [source]
    visited[source] = true       // mark when enqueued
    while queue not empty:
        u = pop_front(queue)
        for v in graph[u]:
            if not visited[v]:
                visited[v] = true
                push_back(queue, v)
```

Marking on enqueue prevents the same vertex from being inserted multiple times.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say the representation assumption before the complexity. Explain why BFS finds unweighted shortest paths instead of merely listing applications. While coding, mark visited at the right moment and discuss disconnected graphs. Avoid claiming BFS always finds a shortest path—it does not directly solve arbitrary weighted shortest paths.

#### ONE-LINE SUMMARY
BFS uses a queue for level-order and unweighted shortest paths; DFS uses a stack for deep structural exploration, and both are `O(V + E)` on adjacency lists.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q2 and Q10 (stack/deque)** prepare you for Q11 (array vs linked-list stack), Q26 (iterative vs recursive DFS), Q44 (stack push/pop complexity), and later queue/stack implementation problems.
- **Q3 and Q4 (sorting trade-offs)** connect to Q29 (stable vs unstable sort), Q31 (building a heap), and later full merge-sort and QuickSort explanations.
- **Q5 (heaps)** leads directly to Q21 (heapify), Q31 (build-heap complexity), Q35 (priority queue), and Q36 (heap–priority-queue relationship).
- **Q6 (balanced BST)** prepares Q22 (AVL tree), Q38 (Red-Black Tree), and Q50 (why balance matters).
- **Q7 (collisions)** connects to Q38 (average vs worst-case hash lookup), Q46 (linear vs quadratic probing), and later “how a hash map works internally.”
- **Q8–Q9 (BFS/DFS)** prepare Q17 (tree vs graph), Q24 (tree traversal orders), Q26 (iterative vs recursive DFS), Q40 (adjacency matrix vs list), and later shortest-path, connected-component, and cycle-detection problems.
- **Q1 (binary search)** becomes the base pattern for later rotated-array search, boundary search, and answer-space binary search questions.

### Be Comfortable With Before Batch 02 (Questions 11–20)

- Deriving complexity from the number of operations rather than recalling a table.
- Array versus linked-list trade-offs: random access, insertion/deletion, memory overhead, and cache locality.
- Basic pointer/reference manipulation for singly and doubly linked lists.
- Tree and graph vocabulary: node, edge, root, height, path, cycle, and connectedness.
- The difference between recursion, memoization, and bottom-up dynamic programming.
- Why negative edge weights matter to shortest-path algorithms.

### Batch 01 Rapid Recall

1. Binary search: `O(log n)` on a sorted array.
2. LIFO structure: stack.
3. QuickSort worst case: `O(n²)`.
4. Array merge-sort auxiliary space: `O(n)`.
5. Min-heap exposes minimum; max-heap exposes maximum.
6. Balanced BST insertion: `O(log n)`.
7. Collision: different keys share a bucket; use chaining or open addressing.
8. BFS = queue/levels; DFS = stack/depth.
9. BFS and DFS: `O(V + E)` with adjacency lists.
10. Deque: `O(1)` operations at both ends.
