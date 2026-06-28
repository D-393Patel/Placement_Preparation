# JTG Technical Interview Coaching — Batch 05

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 41–50

## Questions in This Batch

41. ⚡⚠️ How does a Bloom filter work?
42. ⚡ What is the difference between a graph and a DAG (Directed Acyclic Graph)?
43. ⚡⚠️ What is amortized time complexity? Give an example.
44. ⚡⚠️ What is the time complexity of push and pop on a stack?
45. ⚠️ What is a sparse table, and what queries does it support in `O(1)`?
46. ⚡ What is the difference between linear probing and quadratic probing in hash tables?
47. ⚡ What is a disjoint set (union–find), and what operations does it support?
48. ⚡ What is path compression in union–find?
49. ⚡⚠️ What is the time complexity of union–find with path compression and union by rank?
50. ⚡ What is a balanced BST, and why is balance important?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Hash-based membership and collision probing | 41, 46 | Both use hash-derived positions; one is probabilistic membership, while the other stores exact entries in an open-addressed table. |
| B | Directed acyclic graphs | 42 | The acyclic constraint changes which algorithms and guarantees are available. |
| C | Amortized analysis of stack operations | 43, 44 | Stack operations are constant time, but array-backed growth makes `push` the canonical amortized-analysis example. |
| D | Static range queries with sparse tables | 45 | Its `O(1)` claim depends on immutability and the combine operation. |
| E | Disjoint-set union | 47, 48, 49 | These three questions ask for the ADT, its central optimisation, and its resulting complexity. |
| F | Balanced binary search trees | 50 | Height is the invariant that protects BST operation complexity. |

---

### BLOOM FILTERS AND OPEN-ADDRESSING PROBES ⚡⚠️
**Covers questions: 41, 46**

#### CORE CONCEPT (30 seconds)
A Bloom filter is a space-efficient probabilistic set: insertion sets several hash-selected bits, and lookup checks those bits. If any bit is zero, the key is definitely absent; if all are one, it is possibly present because false positives can occur. In an open-addressed hash table, linear probing checks consecutive slots, while quadratic probing checks offsets that grow quadratically to reduce primary clustering.

#### WHY IT EXISTS
Bloom filters cheaply reject most missing keys before an expensive disk, database, or network lookup. Open addressing stores hash-table entries directly in one array, so probing is needed when the preferred slot is occupied. Both trade perfect direct placement for compact storage and fast expected lookup.

#### MENTAL MODEL
A Bloom filter is a shared checklist: each visitor marks several boxes. An unmarked required box proves someone never visited, but all boxes marked may be caused by other visitors. Probing is parking: linear probing checks the next spaces one by one; quadratic probing takes increasingly large jumps.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Bloom filter: bit array plus multiple hash functions; false positives are possible, false negatives are not in the standard insertion-only form. Linear probing uses `h(k)+i`; quadratic probing uses `h(k)+c₁i+c₂i²`, modulo table size.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  More inserted keys set more bits and raise the Bloom filter's false-positive rate. Linear probing has excellent cache locality but suffers primary clustering. Quadratic probing breaks primary clusters but keys with the same initial hash still follow the same probe sequence, causing secondary clustering.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A standard Bloom filter cannot safely clear a bit during deletion because other keys may share it; a counting Bloom filter stores counters instead. The false-positive rate depends on bit count `m`, hash count `k`, and inserted keys `n`, approximately `(1 - e^(-kn/m))^k`. Open addressing needs tombstones for deletion, controlled load factor, and table/probe parameters that guarantee enough slots are reachable.

#### ALL VARIATIONS COVERED
- **Q41:** Insert by setting `k` hashed bit positions; query by checking all `k`. Any zero means definitely absent; all ones mean possibly present. ⚠️ Never claim that a positive result proves membership.
- **Q46:** Linear probing checks sequential offsets and suffers primary clustering; quadratic probing uses squared offsets to spread probes but can still suffer secondary clustering.

#### CONNECTIONS TO OTHER TOPICS
Hash functions, false-positive probability, caching, database negative lookups, open addressing, clustering, tombstones, load factor, double hashing, and counting Bloom filters.

#### CODE / EXAMPLE (if applicable)
```text
possiblyContains(key):
    for i in 1..k:
        index = hash_i(key) mod m
        if bits[index] == 0: return false   // definitely absent
    return true                              // possibly present
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Lead with the asymmetric guarantee: no false negatives, possible false positives under standard assumptions. Explain why deletion is unsafe. For probing, write the probe sequence and compare clustering, not merely “linear versus curved jumps.” Avoid confusing a Bloom filter with a hash set—it does not store or return the original keys.

#### ONE-LINE SUMMARY
A Bloom filter uses multiple hashed bits for “definitely absent or possibly present,” while linear and quadratic probing are exact-table collision strategies with different clustering behavior.

---

### GRAPHS AND DIRECTED ACYCLIC GRAPHS ⚡
**Covers questions: 42**

#### CORE CONCEPT (30 seconds)
A graph is any set of vertices connected by edges and may be directed or undirected, cyclic or acyclic. A DAG is specifically a directed graph with no directed cycle, so its vertices can be topologically ordered.

#### WHY IT EXISTS
Many real dependencies have direction and cannot loop: a prerequisite must precede a course, and a build dependency must be completed before its consumer. The DAG restriction enables safe dependency ordering and dynamic programming without circular dependencies.

#### MENTAL MODEL
A general road map may contain one-way streets and loops. A DAG is a downhill river network: every edge flows forward, so following arrows can never return to the same point.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Every DAG is a graph; not every graph is a DAG. A DAG is directed and contains no directed cycles.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A DAG has at least one topological ordering. Detect cycles/topologically sort with DFS colours or Kahn's indegree algorithm in `O(V + E)` using adjacency lists.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  An undirected acyclic graph is a forest, not normally called a DAG. A DAG need not be connected and can have multiple valid topological orders. Reachability still defines only a partial order: unrelated vertices may appear in either order.

#### ALL VARIATIONS COVERED
- **Q42:** A graph is the general abstraction; a DAG adds two constraints—directed edges and no directed cycle—which make topological ordering possible.

#### CONNECTIONS TO OTHER TOPICS
Topological sorting, cycle detection, dependency graphs, course scheduling, build systems, dynamic programming on DAGs, longest paths in DAGs, and partial orders.

#### CODE / EXAMPLE (if applicable)
```text
DFS colour states:
WHITE = unvisited
GRAY  = active on current recursion path
BLACK = finished

An edge to a GRAY vertex is a directed back edge, proving a cycle.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Give the two defining constraints and one consequence. If asked for validation, offer Kahn or DFS and explain the cycle signal. Avoid saying “DAG means a tree”; DAGs may have multiple parents, multiple paths, and disconnected components.

#### ONE-LINE SUMMARY
A DAG is a directed graph with no directed cycle, which is exactly why it admits dependency-respecting topological order.

---

### AMORTIZED COMPLEXITY AND STACK OPERATIONS ⚡⚠️
**Covers questions: 43, 44**

#### CORE CONCEPT (30 seconds)
Amortized complexity bounds the average cost per operation over a worst-case sequence, without using probability. For a dynamic-array stack, most pushes are `O(1)`, an occasional resize is `O(n)`, but geometric growth makes `n` pushes cost `O(n)` total, so push is `O(1)` amortized. Pop is `O(1)`; a linked-list stack gives worst-case `O(1)` for both.

#### WHY IT EXISTS
Some data structures occasionally perform expensive maintenance that benefits many future operations. Judging every operation by that rare event is too pessimistic; judging only typical inputs is too vague. Amortized analysis distributes maintenance cost across the operation sequence.

#### MENTAL MODEL
A bus card top-up takes time occasionally, but most rides are instant taps. Spread the top-up time across all rides funded by it: the cost per ride remains constant.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stack push/pop are `O(1)`. For a resizable-array stack, push is amortized `O(1)` but one resizing push can be `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Doubling capacity causes copies of `1 + 2 + 4 + ... < 2n`, so total copy work across `n` pushes is `O(n)`. Amortized analysis may use aggregate, accounting, or potential methods.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Amortized is not average-case: it makes no probability assumption and bounds every allowed operation sequence as a whole. Careless grow/shrink rules can thrash around a boundary; use hysteresis, such as grow when full and shrink only when one-quarter full. Stack overflow/underflow policy is part of the interface, not the asymptotic cost.

#### ALL VARIATIONS COVERED
- **Q43:** Amortized time spreads rare expensive operations across a sequence; dynamic-array append/push is the standard `O(1)` amortized example. ⚠️ Do not call it probabilistic average-case analysis.
- **Q44:** Push and pop are `O(1)` for a stack; precisely, dynamic-array push is `O(1)` amortized with `O(n)` worst case during resize, while pop is normally `O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Dynamic arrays, geometric resizing, aggregate/accounting/potential methods, hash-table rehashing, union–find, splay trees, cache locality, and capacity management.

#### CODE / EXAMPLE (if applicable)
```text
push(x):
    if size == capacity:
        newArray = array of size max(1, 2 * capacity)
        copy existing elements
        data = newArray
    data[size] = x
    size++
```

Each element is copied only when capacity crosses geometrically increasing boundaries.

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the headline `O(1)` and then qualify the implementation. Derive the geometric-series intuition instead of repeating “amortized.” Distinguish amortized, average, and worst-case language carefully; this precision signals genuine understanding.

#### ONE-LINE SUMMARY
Stack push/pop are constant time, but array-backed push is amortized `O(1)` because rare linear resizes are spread across many cheap pushes.

---

### SPARSE TABLES FOR STATIC RANGE QUERIES ⚠️
**Covers questions: 45**

#### CORE CONCEPT (30 seconds)
A sparse table precomputes answers for power-of-two array intervals in `O(n log n)` time and space. For immutable data, it answers idempotent range queries such as minimum, maximum, or GCD in `O(1)` by combining two overlapping intervals.

#### WHY IT EXISTS
When an array never changes but receives many range queries, preprocessing can replace repeated scanning. Power-of-two intervals let any query range be covered by two precomputed blocks of equal size.

#### MENTAL MODEL
Prepare summaries for every block of length 1, 2, 4, 8, and so on. To answer a range minimum, place the largest fitting block at each end; overlap is harmless because taking the same minimum twice changes nothing.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Static range minimum/maximum/GCD queries: `O(1)` each after `O(n log n)` preprocessing; no efficient updates.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Store `table[k][i]` for the interval of length `2^k` starting at `i`. For query length `L`, take `k = floor(log2 L)` and combine `[l, l+2^k-1]` with `[r-2^k+1, r]`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The two-block `O(1)` method relies on idempotence: `f(x,x)=x`. It works for min/max/GCD but not ordinary sum, where overlap double-counts; generic associative queries use disjoint decomposition in `O(log n)` unless another specialised structure is used. Segment/Fenwick trees are preferable when updates are required.

#### ALL VARIATIONS COVERED
- **Q45:** A sparse table is an immutable power-of-two interval table supporting `O(1)` idempotent queries such as RMQ/minimum, maximum, and GCD. ⚠️ Not every associative query, especially sum, gets the same overlapping-block `O(1)` treatment.

#### CONNECTIONS TO OTHER TOPICS
Range minimum query, segment trees, Fenwick trees, prefix sums, binary lifting, logarithm lookup tables, associativity, idempotence, and static-versus-dynamic workloads.

#### CODE / EXAMPLE (if applicable)
```text
rangeMin(l, r):
    length = r - l + 1
    k = floorLog2(length)
    return min(table[k][l],
               table[k][r - 2^k + 1])
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the workload first: many queries, no updates. State preprocessing and query costs together. Explain why overlapping blocks are valid for minimum, and do not overgeneralise the `O(1)` claim to sum.

#### ONE-LINE SUMMARY
A sparse table spends `O(n log n)` preprocessing on immutable data to answer idempotent ranges such as min/max/GCD in `O(1)`.

---

### DISJOINT-SET UNION, PATH COMPRESSION, AND RANK ⚡⚠️
**Covers questions: 47, 48, 49**

#### CORE CONCEPT (30 seconds)
Disjoint-set union maintains a partition of elements into non-overlapping sets. `find(x)` returns the representative of `x`'s set, and `union(a,b)` merges two sets. Path compression makes every node visited by `find` point closer to the root; union by rank/size attaches the smaller or shallower tree below the larger. Together, operations take `O(α(n))` amortized time, effectively constant in practice.

#### WHY IT EXISTS
Connectivity algorithms repeatedly ask whether two elements are already in the same component and merge components when they are not. DSU avoids re-traversing whole graphs by representing each component as a shallow parent tree.

#### MENTAL MODEL
Every group has a leader. To identify your group, follow managers to the leader. After asking once, everyone on that chain saves the leader's direct number; when groups merge, the smaller organisation reports to the larger one.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Operations: `makeSet`, `find`, and `union`. With path compression plus union by rank/size, amortized time per operation is `O(α(n))`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  `find` recursively reaches the root and rewrites parent links on return. `union` first finds both roots, does nothing if equal, otherwise attaches the lower-rank root below the higher-rank root and increments rank only when ranks tie.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  `α(n)`, the inverse Ackermann function, grows so slowly that it is below 5 for any practical input. The bound is amortized over a sequence, not strict worst-case `O(1)` per call. Rank is an upper-bound proxy for height after path compression, not necessarily the current exact height. DSU handles merges well but does not natively support arbitrary deletions/splits.

#### ALL VARIATIONS COVERED
- **Q47:** Union–find maintains disjoint components using `makeSet`, `find`, and `union`; typical uses include Kruskal and undirected connectivity/cycle checks.
- **Q48:** Path compression flattens the parent path during `find`, making visited nodes point directly or nearly directly to the root.
- **Q49:** Path compression plus union by rank gives `O(α(n))` amortized time per operation. ⚠️ Call it effectively constant, not mathematically identical to `O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Kruskal's MST, connected components, undirected cycle detection, equivalence classes, offline query processing, union by size, amortized analysis, and inverse Ackermann complexity.

#### CODE / EXAMPLE (if applicable)
```text
find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: return
    if rank[ra] < rank[rb]: swap(ra, rb)
    parent[rb] = ra
    if rank[ra] == rank[rb]: rank[ra]++
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the invariant before code: each set is a rooted parent tree. Name both optimisations and show where each occurs. Tie DSU to Kruskal from Batch 2. Avoid saying path compression happens during union—it is performed by `find`, although union calls find.

#### ONE-LINE SUMMARY
DSU merges components with `union` and identifies them with `find`; rank keeps trees shallow and path compression flattens them for `O(α(n))` amortized operations.

---

### BALANCED BINARY SEARCH TREES ⚡
**Covers questions: 50**

#### CORE CONCEPT (30 seconds)
A balanced BST maintains height `O(log n)` while preserving the BST ordering rule. Balance matters because search, insertion, and deletion follow a root-to-leaf path, so logarithmic height guarantees `O(log n)` operations instead of the `O(n)` worst case of a skewed ordinary BST.

#### WHY IT EXISTS
Inserting already-sorted keys into a plain BST can create a linked-list-shaped tree. Self-balancing trees use rotations and metadata to prevent input order from destroying performance while retaining ordered iteration and predecessor/successor queries.

#### MENTAL MODEL
A decision tree should split choices reasonably evenly. If every answer sends you down one side, it becomes a long corridor; balancing adds staircases that keep the destination only logarithmically many decisions away.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Balanced height is `O(log n)`, so search/insert/delete are `O(log n)`. Examples: AVL and Red–Black Trees.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Rotations change shape without breaking inorder key order. AVL uses strict height balance; Red–Black uses looser colour/black-height rules. Both prevent linear-height degeneration.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Balanced” need not mean perfectly equal subtree sizes; it means a rule guarantees asymptotically logarithmic height. Compared with hash tables, balanced BSTs provide ordering, range queries, predecessor/successor, and worst-case logarithmic operations, while hash tables target expected constant-time exact lookup.

#### ALL VARIATIONS COVERED
- **Q50:** A balanced BST enforces a height-control invariant so path-based operations remain `O(log n)`; without balance, sorted/adversarial insertion can produce `O(n)` height and operations.

#### CONNECTIONS TO OTHER TOPICS
AVL trees, Red–Black Trees, rotations, tree height, ordered maps/sets, range queries, B-trees, skip lists, and BST-versus-hash-table trade-offs.

#### CODE / EXAMPLE (if applicable)
```text
rightRotate(y):
    x = y.left
    moved = x.right
    x.right = y
    y.left = moved
    update heights/metadata
    return x
```

A rotation changes local height while preserving inorder key order.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive operation cost from height and show the sorted-input failure of a plain BST. Compare AVL and Red–Black at a high level if prompted. Avoid defining balance as “exactly the same nodes on each side”; real balanced-tree invariants are more flexible.

#### ONE-LINE SUMMARY
A balanced BST prevents skew, keeping height and search/insert/delete at `O(log n)` while preserving ordered-key operations.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q41 and Q46 (hashing)** connect to exact hash-table collision handling, distributed membership checks, cache filtering, and later hash-map internals.
- **Q42 (DAG)** prepares topological-sort applications, DAG shortest/longest paths, dependency resolution, and DP state graphs.
- **Q43–Q44 (amortized stack costs)** connect to dynamic-array resizing, hash-table rehashing, monotonic stacks, and iterative DFS.
- **Q45 (sparse table)** links back to segment trees and forward to static RMQ, binary lifting, and range-query trade-offs.
- **Q47–Q49 (union–find)** complete the foundation for Kruskal, connectivity, offline queries, and undirected cycle detection.
- **Q50 (balanced BST)** unifies the earlier AVL and Red–Black questions and prepares ordered-library implementation discussions.

### Be Comfortable With Before Batch 06 (Questions 51–60)

The next batch shifts from DSA into object-oriented programming. Review:

- Classes, objects, fields, methods, constructors, and access modifiers.
- Encapsulation, abstraction, inheritance, and polymorphism.
- Compile-time overload resolution versus runtime method dispatch.
- Abstract classes versus interfaces, especially in Java.
- Shallow versus deep copying of referenced objects.
- `this`, `super`, static members, and constructor chaining.
- Why Java avoids multiple inheritance of class implementation.
- “Is-a” inheritance versus “has-a” composition.

### Batch 05 Rapid Recall

41. Bloom filter: definitely absent or possibly present; false positives are possible.
42. DAG: directed graph with no directed cycle.
43. Amortized analysis spreads rare expensive work across an operation sequence.
44. Stack push/pop: `O(1)`; array push is amortized `O(1)`.
45. Sparse table: `O(1)` static idempotent range queries after `O(n log n)` preprocessing.
46. Linear probing checks consecutive slots; quadratic probing uses squared offsets.
47. DSU supports `makeSet`, `find`, and `union`.
48. Path compression flattens parent paths during `find`.
49. Path compression plus rank: `O(α(n))` amortized per operation.
50. Balanced BST height is `O(log n)`, protecting logarithmic operations.
