# JTG Technical Interview Coaching — Batch 04

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 31–40

## Questions in This Batch

31. ⚡⚠️ What is the time complexity of building a heap from an unsorted array?
32. ⚡⚠️ What is the difference between a complete binary tree and a full binary tree?
33. ⚡ What is topological sorting, and when is it applicable?
34. ⚡ What is the difference between iterative DFS and recursive DFS?
35. ⚡ What is a priority queue? How is it typically implemented?
36. ⚡⚠️ What is the relationship between heaps and priority queues?
37. ⚡⚠️ What is radix sort, and what is its time complexity?
38. ⚡⚠️ What is the time complexity of searching in a hash table on average versus in the worst case?
39. ⚡ What is a Red–Black Tree, and how does it maintain balance?
40. ⚡ What is the difference between an adjacency matrix and an adjacency list for graph representation?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Heaps and the priority-queue abstraction | 31, 35, 36 | These connect linear-time heap construction to the ADT that heaps most commonly implement. |
| B | Binary-tree shape and guaranteed balance | 32, 39 | Complete/full describe structural shape; Red–Black invariants control height. |
| C | Graph representation and DFS-based ordering | 33, 34, 40 | Representation determines traversal cost, while DFS is one way to produce a topological order. |
| D | Radix sorting | 37 | Its non-comparison complexity and stability requirement form one distinct concept. |
| E | Hash-table performance | 38 | The average/worst-case gap depends on collisions, distribution, and load factor. |

---

### HEAPS AND PRIORITY QUEUES ⚡⚠️
**Covers questions: 31, 35, 36**

#### CORE CONCEPT (30 seconds)
A priority queue is an abstract data type that removes the highest- or lowest-priority item first. It is usually implemented with a binary heap, giving `O(1)` peek and `O(log n)` insert/extract. An unsorted array can be turned into a heap bottom-up in `O(n)` time—not `O(n log n)`.

#### WHY IT EXISTS
A normal queue follows arrival order; a priority queue follows importance. The heap gives just enough ordering to expose one extreme efficiently without paying to keep every element fully sorted. Bottom-up construction exploits the fact that most heap nodes are near leaves and require little or no movement.

#### MENTAL MODEL
A hospital waiting room is the priority queue policy: the most urgent patient goes first. The heap is the seating system that keeps the most urgent patient at the front. Building it bottom-up is efficient because most people are already near the bottom and move very little.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Build-heap is `O(n)`. A priority queue removes by priority and is commonly implemented by a min-heap or max-heap. Heap peek is `O(1)`; insertion and extraction are `O(log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Start heapifying from the last internal node, index `floor(n/2)-1`, and move to the root. A min-heap implements a min-priority queue; a max-heap implements a max-priority queue. An unsorted array gives `O(1)` insertion but `O(n)` extraction, while a sorted array reverses that trade-off.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Multiplying `n` nodes by `O(log n)` is a loose upper bound. The tighter sum is `Σ(nodes at height h × h) = O(n)` because the number of nodes falls exponentially with height. A heap is one implementation of the priority-queue ADT, not the ADT itself; alternatives include balanced BSTs, binomial heaps, and Fibonacci heaps.

#### ALL VARIATIONS COVERED
- **Q31:** Bottom-up construction from an unsorted array takes `O(n)`. ⚠️ Repeatedly inserting all elements would take `O(n log n)`, but that is not the optimal build-heap algorithm.
- **Q35:** A priority queue serves items by priority rather than arrival order and is typically implemented with a binary heap.
- **Q36:** A priority queue defines behavior; a heap is the common concrete structure that provides it. ⚠️ They are related but not synonymous.

#### CONNECTIONS TO OTHER TOPICS
Heapify, heap sort, complete binary trees, top-`k`, median from a stream, Dijkstra, Prim, event scheduling, balanced BSTs, and ADT-versus-implementation design.

#### CODE / EXAMPLE (if applicable)
```text
buildHeap(a):
    for i from floor(length(a)/2) - 1 down to 0:
        heapifyDown(a, i, length(a))
```

Leaves already satisfy the heap rule, so only internal nodes need processing.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Answer `O(n)` confidently and explain why the naive `O(n log n)` multiplication is not tight. Separate interface from implementation: priority queue is the contract, heap is a choice. When discussing operations, specify min- or max-priority behavior and do not claim a heap is fully sorted.

#### ONE-LINE SUMMARY
A priority queue is the behavior, a heap is its usual implementation, and bottom-up heap construction is `O(n)`.

---

### COMPLETE, FULL, AND RED–BLACK TREES ⚡⚠️
**Covers questions: 32, 39**

#### CORE CONCEPT (30 seconds)
A complete binary tree fills every level except possibly the last, which fills left to right. A full binary tree requires every node to have either zero or two children. A Red–Black Tree is a BST with colouring rules that prevent long imbalance, guaranteeing `O(log n)` search, insertion, and deletion.

#### WHY IT EXISTS
“Complete” controls compact shape, which lets heaps fit naturally in arrays. “Full” controls child count but does not guarantee small height. Red–Black rules limit path-length imbalance while requiring fewer rotations than stricter AVL balancing, making them useful for ordered maps and sets with frequent updates.

#### MENTAL MODEL
A complete theatre fills rows from front to back and left to right. A full family tree says each parent has exactly two children or none, even if one branch is much deeper. A Red–Black Tree adds traffic rules that prevent any route from becoming disproportionately long.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Complete = level placement rule. Full = child-count rule. Red–Black = self-balancing BST with colour invariants and logarithmic operations.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Red–Black properties: every node is red or black; root and null leaves are black; a red node cannot have a red child; every path from a node to descendant null leaves has equal black count. Insert/delete restore rules using recolouring and rotations.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A tree can be both complete and full, either one, or neither. “Full” does not mean every level is filled—that is closer to perfect. Red–Black invariants ensure the longest root-to-leaf path is at most twice the shortest, so height remains `O(log n)`. Compared with AVL, Red–Black Trees accept looser balance and often perform fewer update rotations.

#### ALL VARIATIONS COVERED
- **Q32:** Complete describes how levels fill; full describes allowed child counts. ⚠️ A full tree may be highly unbalanced, and a complete tree may contain a node with only a left child on its last level.
- **Q39:** A Red–Black Tree is a BST that uses colour, black-height, recolouring, and rotations to keep height `O(log n)`.

#### CONNECTIONS TO OTHER TOPICS
Binary heaps, perfect trees, AVL trees, BST rotations, tree height, ordered maps/sets, Java `TreeMap`, C++ `std::map`, and B-trees.

#### CODE / EXAMPLE (if applicable)
```text
Red–Black invariants:
1. Root is black.
2. Null leaves are black.
3. No red node has a red child.
4. Every node-to-null path has the same black count.

After insertion: fix a red–red violation using uncle colour,
recolouring, and LL/RR/LR/RL rotations.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use tiny counterexamples to distinguish complete from full; definitions alone are easy to mix up. For Red–Black Trees, connect invariants to the actual result—bounded height—rather than reciting colours mechanically. Avoid saying the tree is perfectly balanced.

#### ONE-LINE SUMMARY
Complete controls left-to-right level filling, full controls zero-or-two children, and Red–Black invariants keep a BST approximately balanced with `O(log n)` operations.

---

### GRAPH REPRESENTATION, DFS, AND TOPOLOGICAL ORDER ⚡
**Covers questions: 33, 34, 40**

#### CORE CONCEPT (30 seconds)
An adjacency list stores only existing neighbours in `O(V + E)` space and is best for sparse graphs; a matrix stores every possible edge in `O(V²)` space and gives `O(1)` edge lookup. DFS explores deeply using either the call stack or an explicit stack. Topological sorting orders a directed acyclic graph so every edge `u → v` places `u` before `v`.

#### WHY IT EXISTS
Graph representation should match density and operations. DFS gives a systematic way to explore dependencies, while topological order converts a DAG's partial order into a legal processing sequence for prerequisites, builds, and scheduling.

#### MENTAL MODEL
An adjacency matrix is a complete city road chart with a box for every city pair. An adjacency list is each city's short list of actual roads. DFS follows one road chain deeply; topological sorting produces a task list in which prerequisites always appear first.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  DFS recursion and iteration have `O(V + E)` time with adjacency lists and `O(V)` auxiliary space. Topological sorting applies only to DAGs. Matrix space is `O(V²)`; list space is `O(V + E)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Recursive DFS uses the language call stack; iterative DFS uses an explicit stack and avoids recursion-depth failure. Topological order can use DFS finishing times or Kahn's indegree/queue algorithm. Kahn processes fewer than `V` vertices if a cycle exists.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Iterative and recursive DFS may visit neighbours in different orders unless neighbours are pushed in reverse. An adjacency list's edge-membership test is generally `O(deg(u))`, while a matrix's is `O(1)`. Traversing a matrix costs `O(V²)`. A DAG may have multiple valid topological orders; uniqueness requires stronger conditions.

#### ALL VARIATIONS COVERED
- **Q33:** Topological sorting is a dependency-respecting linear ordering and exists only for a DAG; implement it with Kahn's algorithm or DFS finishing order.
- **Q34:** Recursive DFS uses the call stack and is concise; iterative DFS uses an explicit stack, avoids call-stack overflow, and offers direct control. Their asymptotic costs are the same.
- **Q40:** Use an adjacency list for sparse graphs and neighbour iteration; use a matrix for dense graphs or constant-time edge checks, accepting `O(V²)` space.

#### CONNECTIONS TO OTHER TOPICS
Cycle detection, DAGs, build systems, course scheduling, strongly connected components, BFS, recursion limits, sparse versus dense graphs, shortest paths, and transitive closure.

#### CODE / EXAMPLE (if applicable)
```text
topologicalSort(graph):            // Kahn's algorithm
    indegree = count incoming edges
    queue = all vertices with indegree 0
    order = []
    while queue not empty:
        u = pop_front(queue)
        order.append(u)
        for v in graph[u]:
            indegree[v]--
            if indegree[v] == 0: push_back(queue, v)
    if length(order) < V: report cycle
    return order
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the DAG requirement before explaining topological sorting. Compare representations using both space and actual operations. For iterative DFS, discuss visited timing and neighbour push order. Avoid claiming topological order is unique or meaningful for an arbitrary cyclic graph.

#### ONE-LINE SUMMARY
Choose lists for sparse graphs and matrices for dense/fast edge checks; DFS uses an implicit or explicit stack, and a DAG's dependencies can be linearised by topological sorting.

---

### RADIX SORT AND NON-COMPARISON SORTING ⚡⚠️
**Covers questions: 37**

#### CORE CONCEPT (30 seconds)
Radix sort processes keys one digit or character position at a time using a stable sub-sort, commonly counting sort. For `n` keys, `d` positions, and digit range `k`, its time is `O(d(n + k))` with `O(n + k)` auxiliary space for the usual stable implementation.

#### WHY IT EXISTS
Comparison sorting needs `Ω(n log n)` comparisons in the general case. Radix sort uses the internal structure of bounded-length keys, such as digits or bytes, to sort without pairwise comparisons and can be near-linear when `d` and `k` are small.

#### MENTAL MODEL
Sort postal envelopes first by the least-significant part of the code, then the next, while never disturbing the order established by earlier passes. After the final position, the whole code is ordered.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Process one position at a time. Complexity is `O(d(n + k))`, often simplified to `O(dn)` when base/range `k` is constant.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  LSD radix sort starts at the least-significant digit and requires every digit pass to be stable. Counting sort is the standard subroutine. It is useful for fixed-width integers and strings with controlled alphabets.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The algorithm is not universally linear: many digits, a huge base, variable-length keys, sign handling, and memory traffic affect performance. Choosing a larger base reduces passes but increases count-array size. MSD radix variants recurse from the most-significant position and need different handling.

#### ALL VARIATIONS COVERED
- **Q37:** Radix sort stably sorts by each of `d` positions and runs in `O(d(n + k))`. ⚠️ Do not state bare `O(n)` without assumptions about digit count and base.

#### CONNECTIONS TO OTHER TOPICS
Counting sort, sort stability, bucket sort, comparison lower bounds, lexicographic ordering, integer representation, and time–space trade-offs.

#### CODE / EXAMPLE (if applicable)
```text
exp = 1
while maxKey / exp > 0:
    stableCountingSortByDigit(a, exp, base)
    exp *= base
```

Stability ensures later passes preserve ordering established for less-significant positions.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define `d` and `k` when stating complexity. Explain why stability is necessary and compare the domain assumptions with general comparison sorting. Avoid presenting radix sort as automatically faster for every dataset.

#### ONE-LINE SUMMARY
Radix sort uses stable per-position passes to sort structured keys in `O(d(n + k))`, approaching linear time only when digit count and range stay small.

---

### HASH-TABLE SEARCH COMPLEXITY ⚡⚠️
**Covers questions: 38**

#### CORE CONCEPT (30 seconds)
Hash-table search is expected `O(1)` on average when hashes are well distributed and the load factor is controlled, but it is `O(n)` in the worst case when many keys collide into the same probe sequence or bucket.

#### WHY IT EXISTS
Hashing converts a key into a bucket location so search usually jumps near the answer instead of scanning all entries. The guarantee is probabilistic/amortized rather than absolute because a finite table must handle collisions.

#### MENTAL MODEL
A well-run mailroom sends each employee's mail to a different box, giving near-instant retrieval. A pathological labelling rule sends everyone's mail to one box, forcing a linear search through the pile.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Average/expected search: `O(1)`. Worst case: `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Performance depends on hash quality, collision strategy, capacity, and load factor `α = n/m`. Resizing and rehashing keep expected chain/probe lengths short. Successful search must compare actual keys after matching a bucket/hash.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Open addressing suffers clustering as the table fills; chaining degrades when a bucket grows. Some implementations treeify long chains, improving collision-heavy lookup to `O(log n)` under specific conditions, but generic hash-table worst case remains `O(n)`. Adversarial keys can create denial-of-service risks without randomised/secure hashing.

#### ALL VARIATIONS COVERED
- **Q38:** State expected `O(1)` and worst-case `O(n)`, then explain that the difference comes from collision distribution and load-factor control. ⚠️ “Always `O(1)`” is incorrect.

#### CONNECTIONS TO OTHER TOPICS
Hash collisions, chaining, open addressing, linear/quadratic probing, load factor, resizing, equality contracts, amortized analysis, Bloom filters, and adversarial hashing.

#### CODE / EXAMPLE (if applicable)
```text
find(key):                         // separate chaining
    bucket = table[hash(key) mod capacity]
    for entry in bucket:
        if entry.key == key: return entry.value
    return NOT_FOUND
```

Expected bucket length stays constant under good distribution and bounded load factor; one giant bucket gives linear time.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use “expected” or “average” precisely, then name the assumptions. Explain the worst case with a concrete collision pattern. Avoid hiding behind implementation-specific treeification unless asked about a particular language library.

#### ONE-LINE SUMMARY
Hash search is expected `O(1)` with good distribution and controlled load, but collisions can force `O(n)` worst-case scanning.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q31, Q35, and Q36 (heaps/priority queues)** connect to heap sort, top-`k`, median streaming, Dijkstra, Prim, and scheduling problems.
- **Q32 and Q39 (tree structure/balance)** reinforce AVL trees and prepare ordered map/set internals, B-trees, and later balance/height questions.
- **Q33–Q34 and Q40 (graphs)** connect to Q42 (graph versus DAG), connected components, cycle detection, shortest paths, strongly connected components, and course scheduling.
- **Q37 (radix sort)** depends directly on Batch 3's stable counting sort and connects to bucket-based non-comparison algorithms.
- **Q38 (hash lookup)** prepares Q41 (Bloom filter), Q46 (linear versus quadratic probing), and real hash-map internals.
- **Q34 (iterative DFS)** reconnects to Batch 1's stack/deque concepts and later deep-recursion safety discussions.

### Be Comfortable With Before Batch 05 (Questions 41–50)

- False positives versus false negatives and how multiple hash functions can represent set membership probabilistically.
- Directed graphs, DAGs, and why cycles prevent topological order.
- Aggregate versus worst-case-per-operation analysis for dynamic arrays.
- Hash probing, clustering, tombstones, and load factor.
- Union–find operations, tree representations, and component merging.
- Why path compression and union by rank/size produce near-constant amortized operations.
- How logarithmic tree height protects BST performance.

### Batch 04 Rapid Recall

31. Bottom-up build-heap: `O(n)`.
32. Complete fills levels leftward; full allows zero or two children.
33. Topological sort orders a DAG with every prerequisite first.
34. Iterative DFS uses an explicit stack; recursive DFS uses the call stack.
35. Priority queue removes by priority, usually via a heap.
36. Priority queue is an ADT; heap is an implementation.
37. Radix sort: `O(d(n + k))` using stable position passes.
38. Hash lookup: expected `O(1)`, worst `O(n)`.
39. Red–Black rules and rotations guarantee `O(log n)` height.
40. Matrix: `O(V²)` space; list: `O(V + E)` space.
