# JTG Technical Interview Coaching — Batch 22

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 211–220

## Questions in This Batch

211. ⚡⚠️ Flatten a binary tree to a linked list in place.
212. ⚡⚠️ Find all articulation points (cut vertices) in a graph.
213. ⚡ Determine whether a graph is bipartite.
214. ⚡⚠️ Explain Prim's minimum-spanning-tree algorithm.
215. ⚡ Implement a stack using a queue.
216. ⚡ Explain the Jump Game: can the last array index be reached?
217. ⚡ Count distinct top-left-to-bottom-right grid paths with obstacles.
218. ⚡⚠️ Partition an array into two equal-sum subsets.
219. ⚡⚠️ Find the maximum length of a repeated subarray.
220. ⚡⚠️ Explain the significance of the Master Theorem.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | In-place tree rewiring | 211 | Flattening preserves preorder while changing every left/right link. |
| B | Graph DFS invariants and greedy growth | 212, 213, 214 | Low-link values, two-colouring, and Prim all traverse graph structure while maintaining a different correctness invariant. |
| C | ADT simulation | 215 | Queue rotation reverses FIFO access to expose LIFO behavior. |
| D | Greedy reachability | 216 | Only the farthest reachable boundary matters for deciding Jump Game feasibility. |
| E | Dynamic-programming state design | 217, 218, 219 | Grid paths, equal partition, and repeated subarray each reduce to reusable state/transition tables. |
| F | Divide-and-conquer recurrence analysis | 220 | The Master Theorem classifies recurrence cost by comparing recursive and non-recursive work. |

---

### FLATTENING A BINARY TREE IN PLACE ⚡⚠️
**Covers questions: 211**

#### CORE CONCEPT (30 seconds)
Flatten the tree into preorder order using only right pointers and set every left pointer to null. A clean recursive method processes nodes in reverse preorder—right, then left—while keeping `previous`; set `node.right=previous`, `node.left=null`, and update `previous=node`. Time is `O(n)` and recursion space is `O(h)`.

#### WHY IT EXISTS
Ordinary preorder visits root-left-right, but rewiring a node too early can lose an unprocessed subtree. Reverse preorder builds the final list from tail to head, so `previous` is always exactly the already-flattened suffix.

#### MENTAL MODEL
Build a train from the back. After the right and left subtrees have become one carriage chain, attach the current node in front and erase its left track.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Output order is preorder. All left links become null; each right link points to the next preorder node. `O(n)` time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Recursive reverse preorder uses `O(h)` stack. An iterative stack pushes right then left and links the previous popped node. Always preserve subtree references before overwriting links.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Morris-style rewiring can use `O(1)` auxiliary space: for each node with a left subtree, find its rightmost predecessor, attach current right subtree there, move left subtree to right, and null left. This can revisit right spines, though standard analysis remains linear with careful traversal. “In place” generally excludes allocating list nodes but recursion stack may still count as auxiliary space.

#### ALL VARIATIONS COVERED
- **Q211:** Rewire nodes in preorder so left is null and right is the next node; reverse-preorder `previous` gives `O(n)` time and `O(h)` stack. ⚠️ Do not overwrite a subtree pointer before preserving/processing it.

#### CONNECTIONS TO OTHER TOPICS
Preorder traversal, threaded/Morris traversal, tree serialization, linked lists, pointer invariants, recursion, and BST-to-list transformations.

#### CODE / EXAMPLE (if applicable)
```text
previous = null
flatten(node):
    if node == null: return
    flatten(node.right)
    flatten(node.left)
    node.right = previous
    node.left = null
    previous = node
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the final link invariant and explain why traversal order prevents data loss. Dry-run a node with both children. Clarify whether recursion space satisfies “in place,” then mention the constant-space alternative if pressed.

#### ONE-LINE SUMMARY
Build the preorder chain backward with reverse preorder, making each node's right link the flattened suffix and clearing its left link.

---

### ARTICULATION POINTS, BIPARTITE GRAPHS, AND PRIM'S MST ⚡⚠️
**Covers questions: 212, 213, 214**

#### CORE CONCEPT (30 seconds)
For articulation points in an undirected graph, DFS records discovery time `disc[u]` and the earliest reachable ancestor `low[u]`; a non-root `u` is a cut vertex if a child `v` has `low[v] >= disc[u]`, while a DFS root is a cut vertex only with more than one DFS child. A graph is bipartite if every component can be two-coloured without an edge joining equal colours. Prim grows an MST from any start by repeatedly adding the minimum-weight edge crossing from the current tree to an unvisited vertex.

#### WHY IT EXISTS
All three problems ask what DFS/frontier structure reveals. Low-link values detect a subtree that cannot reconnect above its parent. Two colours test for odd-cycle conflicts. Prim exploits the cut property: the cheapest edge crossing the current tree cut is safe.

#### MENTAL MODEL
Articulation point: a bridge-city whose removal isolates a region with no back road. Bipartite: seat enemies on two sides so every conflict crosses the aisle. Prim: expand one connected power grid through the cheapest cable leaving it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Articulation uses DFS discovery/low arrays. Bipartite uses BFS/DFS colours `0/1`. Prim uses visited set plus min-heap; adjacency-list time `O(E log V)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For an undirected back edge `(u,v)` where `v != parent[u]`, update `low[u]=min(low[u],disc[v])`; after a DFS child, propagate `low`. Bipartite traversal starts from every uncoloured component and rejects self-loops/same-colour neighbours. Prim skips stale/visited heap entries and records selected parent/edge weight.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Articulation inequality is `low[child] >= disc[u]`; bridge inequality is strict `low[child] > disc[u]`. The root has its special child-count rule. Bipartite is equivalent to no odd cycle and applies to disconnected graphs. Prim accepts negative weights; MST ordering still works. A disconnected graph yields a spanning forest unless each component is restarted/reported.

#### ALL VARIATIONS COVERED
- **Q212:** Run Tarjan-style DFS and apply the root/non-root low-link rules in `O(V+E)`. ⚠️ Do not use the bridge's strict inequality for cut vertices.
- **Q213:** Two-colour every component with BFS/DFS; any same-colour edge means non-bipartite, equivalently an odd cycle exists.
- **Q214:** Prim repeatedly takes the lightest frontier edge into an unvisited vertex, producing an MST in `O(E log V)` with heap/list. ⚠️ Negative weights are valid.

#### CONNECTIONS TO OTHER TOPICS
DFS timestamps, bridges, biconnected components, odd cycles, graph colouring, Kruskal/DSU, cut property, Dijkstra, priority queues, and spanning forests.

#### CODE / EXAMPLE (if applicable)
```text
DFS articulation core for tree edge u->v:
    parent[v] = u; dfs(v)
    low[u] = min(low[u], low[v])
    if parent[u] == null and childCount > 1: mark u
    if parent[u] != null and low[v] >= disc[u]: mark u

Back edge u->v, v != parent[u]:
    low[u] = min(low[u], disc[v])
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State graph direction/connectivity assumptions and the invariant before code. Draw one back edge for low-link reasoning. For Prim, compare briefly with Dijkstra/Kruskal. Avoid treating “visited” alone as enough for articulation logic.

#### ONE-LINE SUMMARY
Low links expose cut vertices, two-colouring exposes odd cycles, and Prim uses cheapest cut-crossing edges to grow an MST.

---

### STACK USING A QUEUE ⚡
**Covers questions: 215**

#### CORE CONCEPT (30 seconds)
With one queue, make `push` costly: enqueue the new value, then rotate the previous queue elements from front to back so the new value becomes the front. Then `pop` and `top` are `O(1)`, while push is `O(n)`; space is `O(n)`.

#### WHY IT EXISTS
A queue exposes the oldest value, but a stack needs the newest. Rotating after each push reverses the effective priority so FIFO removal returns LIFO order.

#### MENTAL MODEL
When a new person joins a line but must be served first, let everyone who was already in line walk from the front to the back once.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Push then rotate `oldSize` elements; front is stack top. Push `O(n)`, pop/top `O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Capture old queue size before enqueue/rotation or rotate exactly `size-1`. Define empty behavior. A two-queue variant can also choose costly push or costly pop.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The problem demonstrates ADT behavior versus implementation, not an efficiency improvement over a native stack. If pop is made costly instead, each pop transfers `n-1` items and swaps queue roles. State operation guarantees explicitly.

#### ALL VARIATIONS COVERED
- **Q215:** Enqueue then rotate existing elements so newest reaches the front; this implements LIFO with one queue and `O(n)` push/`O(1)` pop.

#### CONNECTIONS TO OTHER TOPICS
Queue using stacks, amortized analysis, deques, ADTs, queue rotation, and data-structure simulation.

#### CODE / EXAMPLE (if applicable)
```text
push(x):
    oldSize = queue.size
    queue.enqueue(x)
    repeat oldSize times:
        queue.enqueue(queue.dequeue())

pop(): return queue.dequeue()
top(): return queue.front()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Choose and state which operation is costly, then demonstrate `push 1, push 2, pop`. Avoid claiming all operations are constant time with an ordinary queue.

#### ONE-LINE SUMMARY
Rotate the queue after each push so its front is always the newest element, trading `O(n)` push for `O(1)` pop/top.

---

### JUMP GAME GREEDY REACHABILITY ⚡
**Covers questions: 216**

#### CORE CONCEPT (30 seconds)
Scan left to right while maintaining `farthest`, the greatest index reachable from any processed reachable position. If current index `i > farthest`, there is a gap and the end is unreachable; otherwise update `farthest=max(farthest,i+a[i])`. Return true once it reaches `n-1`. Time `O(n)`, space `O(1)`.

#### WHY IT EXISTS
For feasibility, exact jump paths do not matter. Any index up to the farthest boundary is reachable through some processed path, and a farther boundary dominates all shorter possibilities.

#### MENTAL MODEL
Paint all ground reachable so far. Standing only on painted positions, extend the painted frontier as far as each jump allows. A gap before the next position ends the process.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Greedy farthest-reachable boundary; non-negative jump lengths; `O(n)`/`O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Check reachability before using `a[i]`. Empty/single-element convention should be clarified; typical nonempty single array is already at the last index. Early return when boundary reaches last.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This solves existence, not minimum jumps; Jump Game II uses a level-like greedy boundary. Negative jumps or exact-jump constraints invalidate the monotonic frontier invariant. DP/graph search works but is unnecessary here.

#### ALL VARIATIONS COVERED
- **Q216:** Maintain the farthest reachable index and fail at the first `i>farthest`; return true when the frontier reaches the end.

#### CONNECTIONS TO OTHER TOPICS
Greedy proofs, interval coverage, BFS-layer intuition, minimum jumps, reachability, and invariant-based scans.

#### CODE / EXAMPLE (if applicable)
```text
farthest = 0
for i in 0..n-1:
    if i > farthest: return false
    farthest = max(farthest, i + a[i])
    if farthest >= n-1: return true
return false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define `farthest` precisely and prove why dominated paths can be forgotten. Dry-run `[2,3,1,1,4]` and `[3,2,1,0,4]`. Avoid solving a different objective such as minimum jumps.

#### ONE-LINE SUMMARY
Jump Game feasibility needs only the farthest reachable frontier; encountering an index beyond it proves failure.

---

### GRID PATHS, EQUAL PARTITION, AND REPEATED SUBARRAY DP ⚡⚠️
**Covers questions: 217, 218, 219**

#### CORE CONCEPT (30 seconds)
Grid paths: `dp[r][c]=0` for obstacles, otherwise paths from top plus left. Equal partition: if total is even, solve 0/1 subset sum for `total/2` using descending capacity. Repeated subarray: it is longest common **contiguous** segment, so if `A[i-1]==B[j-1]`, `dp[i][j]=1+dp[i-1][j-1]`; otherwise reset to zero. All are state-and-transition DP.

#### WHY IT EXISTS
Each problem has overlapping states: ways to reach a cell, reachable sums after some items, or matching suffix length at two indices. DP stores exactly the history needed and discards exponential path/subset/string enumeration.

#### MENTAL MODEL
Grid paths flow into a cell from above/left. Partition fills a target-capacity checklist once per item. Repeated subarray extends a diagonal streak only while adjacent values continue matching.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Grid `O(mn)` time and `O(n)` optimised space. Partition `O(n·S)` time/`O(S)` where `S=total/2`. Repeated subarray `O(mn)` time and `O(min(m,n))` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Grid start/destination obstacle yields zero; one-row DP sets blocked cell back to zero. Partition capacity iterates downward so an item is used once. Repeated-subarray mismatch resets zero, unlike LCS, and one-row updates must go right-to-left or use a previous row.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Path counts may overflow and often need modulo. Standard subset-sum DP assumes non-negative integers; negatives require shifted/set states. Partition is pseudo-polynomial/NP-Complete in general input encoding. Repeated subarray can use binary search + rolling hash/suffix structures for large inputs, with collision/complexity trade-offs.

#### ALL VARIATIONS COVERED
- **Q217:** Sum top/left paths while obstacles contribute zero; initialise the start carefully and use `O(columns)` space.
- **Q218:** Require even total and run descending 0/1 subset-sum DP for half. ⚠️ Ascending iteration accidentally reuses an item.
- **Q219:** Use longest-common-suffix DP and reset on mismatch; track global maximum. ⚠️ Repeated subarray is contiguous, unlike LCS.

#### CONNECTIONS TO OTHER TOPICS
Unique paths, coin/knapsack DP, subset sum, longest common substring/LCS, rolling hashes, space optimisation, and obstacle grids.

#### CODE / EXAMPLE (if applicable)
```text
// Equal partition
target = total / 2
dp[0] = true
for x in values:
    for s from target down to x:
        dp[s] = dp[s] or dp[s-x]
return dp[target]

// Repeated subarray
if A[i-1] == B[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
else: dp[i][j] = 0
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
For each problem, state state meaning, transition, base case, iteration direction, and complexity. Explain why partition goes backward and repeated-subarray mismatch resets. Avoid copying one familiar DP template without matching the problem semantics.

#### ONE-LINE SUMMARY
DP stores paths per cell, reachable half-sums per item, or equal suffix lengths per index pair—each state uses only the history its recurrence needs.

---

### MASTER THEOREM ⚡⚠️
**Covers questions: 220**

#### CORE CONCEPT (30 seconds)
The Master Theorem quickly solves balanced divide-and-conquer recurrences `T(n)=aT(n/b)+f(n)` by comparing combine/non-recursive work `f(n)` with the recursive-leaf scale `n^(log_b a)`. If `f` is polynomially smaller, recursion dominates; if equal up to log factors, costs accumulate across levels; if polynomially larger and regular, `f` dominates.

#### WHY IT EXISTS
Instead of expanding a recursion tree every time, the theorem classifies which part contributes most work and yields a tight asymptotic bound for a common recurrence family.

#### MENTAL MODEL
Compare work produced by the branching tree with work done at each parent. Whichever grows faster dominates; if tied, every level contributes similarly and adds a logarithmic factor.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Let `c=log_b a`. Case 1: `f(n)=O(n^(c-ε))` → `Θ(n^c)`. Case 2: `f(n)=Θ(n^c)` → `Θ(n^c log n)`. Case 3: `f(n)=Ω(n^(c+ε))` plus regularity → `Θ(f(n))`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Extended case 2: `f(n)=Θ(n^c log^k n)` gives `Θ(n^c log^(k+1)n)` for standard `k≥0`. Examples: binary search `T(n)=T(n/2)+Θ(1)=Θ(log n)`; merge sort `2T(n/2)+Θ(n)=Θ(n log n)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Case 3 needs a regularity condition such as `a f(n/b) <= q f(n)` for some `q<1`. The basic theorem does not directly handle unequal subproblem sizes, changing `a/b`, many non-polynomial gaps, or recurrences like `T(n)=T(n-1)+n`; use recursion tree, substitution, Akra–Bazzi, or other methods.

#### ALL VARIATIONS COVERED
- **Q220:** The theorem turns a balanced recurrence into a tight bound by comparing `f(n)` to `n^(log_b a)`. ⚠️ Check recurrence form and case conditions before applying it.

#### CONNECTIONS TO OTHER TOPICS
Recursion trees, divide-and-conquer, binary search, merge sort, Strassen, substitution, Akra–Bazzi, regularity conditions, and asymptotic notation.

#### CODE / EXAMPLE (if applicable)
```text
T(n) = 4T(n/2) + n
a=4, b=2 -> n^(log_2 4)=n^2
f(n)=n is polynomially smaller than n^2
Case 1 -> T(n)=Theta(n^2)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Identify `a`, `b`, `f`, compute `n^(log_b a)`, compare, then name the case/conditions. Explain intuition through recursion levels. Avoid applying Master Theorem to `T(n-1)` or uneven splits without checking applicability.

#### ONE-LINE SUMMARY
Master Theorem compares recursive growth `n^(log_b a)` with per-call work `f(n)` to classify balanced divide-and-conquer recurrences.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q211 (flatten tree)** connects to tree serialization, Morris traversal, pointer rewiring, and preorder processing.
- **Q212–Q214 (graphs)** prepare bridges/biconnectivity, graph colouring, MSTs, and DFS low-link techniques.
- **Q215 (stack via queue)** mirrors the earlier queue-via-stacks question and reinforces ADT simulation.
- **Q216 (Jump Game)** connects to minimum jumps, interval coverage, and greedy frontier algorithms.
- **Q217–Q219 (DP)** prepare grid portals, target sum, decoding, repeated-string problems, and space optimisation.
- **Q220 (Master Theorem)** connects to logarithmic Fibonacci/matrix exponentiation and future recurrence analyses.

### Be Comfortable With Before Batch 23 (Questions 221–230)

- Fibonacci via matrix exponentiation/fast doubling in `O(log n)`.
- Decode Ways DP and zero-handling.
- Job sequencing with deadlines and profit.
- Minimum-coin DP.
- Largest rectangle in histogram and binary matrix.
- Hamiltonian path backtracking.
- Floyd cycle-entry proof.
- Minimum in a rotated sorted array.
- Longest path in a DAG using topological order.
- LRU cache using hash map plus doubly linked list.

### Batch 22 Rapid Recall

211. Flatten in preorder by safe pointer rewiring/reverse preorder.
212. Cut vertex: root has >1 DFS child, or non-root has `low[child]>=disc[node]`.
213. Bipartite iff every component can be two-coloured.
214. Prim grows an MST through the cheapest frontier edge.
215. Queue rotation puts newest at front for stack behavior.
216. Jump Game tracks farthest reachable index.
217. Grid paths sum top and left unless blocked.
218. Equal partition is descending 0/1 subset sum for half the total.
219. Repeated subarray is longest common contiguous suffix DP.
220. Master Theorem compares `f(n)` with `n^(log_b a)`.
