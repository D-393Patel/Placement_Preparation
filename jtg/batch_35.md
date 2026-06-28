# JTG Technical Interview Coaching — Batch 35

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 341–350

## Questions in This Batch

341. ⚡⚠️ Check whether a directed graph contains a cycle using DFS coloring.
342. ⚡ Find the minimum cost to connect all points using an MST.
343. Find the sum of all left leaves in a binary tree.
344. ⚡⚠️ Find every duplicate in an array in `O(n)` time and `O(1)` auxiliary space.
345. ⚡⚠️ Find maximum stock profit with at most `k` transactions.
346. ⚡ Find the minimum deletions needed to make two strings equal.
347. ⚡⚠️ Count the ways to make a target amount using given coin denominations.
348. ⚡ Find shortest distances from all sources simultaneously using multi-source BFS.
349. ⚡ Find the maximum sum of a non-adjacent subsequence.
350. ⚡⚠️ Decide whether removing one edge can split a binary tree into two equal-sum trees.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | DFS state coloring | 341 | Three states distinguish unvisited, currently active, and completely processed vertices. |
| B | Minimum spanning tree | 342 | Points form a complete weighted graph; an MST connects all vertices at minimum total cost. |
| C | Postorder tree aggregation | 343, 350 | Both compute information bottom-up while preserving the parent-to-child relationship. |
| D | In-place array marking | 344 | Value constraints let array positions double as visited flags. |
| E | Choice-based dynamic programming | 345, 347, 349 | Each builds an optimum or count from repeated take/skip decisions, with different state dimensions. |
| F | LCS-derived string DP | 346 | Characters outside a longest common subsequence are exactly those that must be deleted. |
| G | Multi-source graph traversal | 348 | Seeding one BFS with every source computes distance to the nearest source in one pass. |

---

### DIRECTED-GRAPH CYCLE DETECTION WITH DFS COLORING ⚡⚠️
**Covers questions: 341**

#### CORE CONCEPT (30 seconds)
Give every vertex one of three colors: white means unvisited, gray means currently on the DFS recursion path, and black means fully processed. During DFS, an edge to a gray vertex is a back edge, so the directed graph has a cycle. An edge to a black vertex is safe. Complexity is `O(V+E)` time and `O(V)` space.

#### WHY IT EXISTS
A normal visited flag cannot distinguish a vertex still active in the current dependency chain from one whose entire subtree has already been checked. Directed-cycle detection needs that distinction: only returning to the current path proves a cycle.

#### MENTAL MODEL
White rooms are unopened, gray rooms are on your current trail of breadcrumbs, and black rooms have been completely explored. Walking into a gray room loops back onto your present trail.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use states `0/1/2`; encountering state `1` means a cycle. Start DFS from every unvisited vertex because the graph may be disconnected.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark gray on entry and black only after all outgoing neighbors finish. Explain why an edge to black is not a cycle. Complexity includes adjacency-list traversal.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Deep graphs may overflow the recursion stack, so use iterative DFS with explicit enter/exit frames. Kahn's topological-sort algorithm is an alternative: fewer than `V` processed vertices means a cycle.

#### ALL VARIATIONS COVERED
- **Q341:** Run three-color DFS across every component and report a cycle exactly when an outgoing edge reaches a gray vertex. ⚠️ A plain `visited` array gives false positives on edges to already completed vertices.

#### CONNECTIONS TO OTHER TOPICS
Topological sorting, dependency resolution, recursion stacks, back edges, strongly connected components, course scheduling, and deadlock detection.

#### CODE / EXAMPLE (if applicable)
```text
dfs(u):
    color[u]=GRAY
    for v in adj[u]:
        if color[v]==GRAY: return true
        if color[v]==WHITE and dfs(v): return true
    color[u]=BLACK
    return false

for u in vertices:
    if color[u]==WHITE and dfs(u): return true
return false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say what each color means before coding, then state the invariant: gray is exactly the current recursion path. Do not call every edge to a visited node a cycle; that rule belongs to neither directed DFS coloring nor undirected DFS without parent handling.

#### ONE-LINE SUMMARY
A directed cycle exists when DFS finds an edge back to a vertex still active on the current gray path.

---

### MINIMUM COST TO CONNECT ALL POINTS — MST ⚡
**Covers questions: 342**

#### CORE CONCEPT (30 seconds)
Treat every point as a vertex and the distance between each pair—usually Manhattan distance—as an edge weight. The cheapest way to connect all points without requiring redundant edges is a minimum spanning tree. On the implicit complete graph, Prim's algorithm can select the nearest unconnected point and update best connection costs in `O(n²)` time and `O(n)` space.

#### WHY IT EXISTS
Any connected solution with a cycle can remove the cycle's most expensive unnecessary edge and remain connected, so an optimum can be a tree with exactly `n−1` edges. MST algorithms systematically choose those edges while preserving global connectivity.

#### MENTAL MODEL
Build one island network: at each step, attach the outside island requiring the cheapest bridge to the network already built.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  An MST connects all vertices with `V−1` edges and minimum total weight. Know Prim and Kruskal and the requested distance formula.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For `n` points, the complete graph has `O(n²)` edges. Avoid materializing them: array-based Prim computes distances when updating keys, giving `O(n²)` time and `O(n)` space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A heap-based Prim implementation can still consider `O(n²)` implicit edges and may not improve dense-graph asymptotics. Kruskal requires generating/sorting all pair edges unless geometry-specific optimization is used. Use a wide integer for total cost.

#### ALL VARIATIONS COVERED
- **Q342:** Model points as a complete weighted graph and use implicit `O(n²)` Prim to return the minimum total connection cost.

#### CONNECTIONS TO OTHER TOPICS
Kruskal, disjoint-set union, cut property, greedy algorithms, network design, Manhattan distance, dense versus sparse graphs, and shortest-path distinctions.

#### CODE / EXAMPLE (if applicable)
```text
best[0]=0; all other best=INF; total=0
repeat n times:
    u = unused vertex with minimum best[u]
    used[u]=true; total+=best[u]
    for every unused v:
        best[v]=min(best[v], distance(point[u],point[v]))
return total
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the graph model and justify MST rather than jumping into loops. Clarify whether distance is Manhattan or Euclidean. A strong answer notices that constructing all `n(n−1)/2` edge objects wastes memory.

#### ONE-LINE SUMMARY
Use Prim on the implicit complete point graph, repeatedly attaching the cheapest outside point to the growing MST.

---

### POSTORDER TREE AGGREGATION: LEFT LEAVES AND EQUAL-SUM SPLITS ⚡⚠️
**Covers questions: 343, 350**

#### CORE CONCEPT (30 seconds)
Use DFS with relationship context. For left leaves, add a node only when it is a leaf reached through its parent's left edge. For an equal split, compute every subtree sum in postorder; after finding total sum `T`, a removable non-root subtree must sum to `T/2`. Both run in `O(n)` time and `O(h)` recursion space.

#### WHY IT EXISTS
Tree questions often depend on facts about children or subtrees. Postorder returns child information before the parent uses it, while a small amount of context—such as “was this a left edge?” or “is this the root?”—prevents structural mistakes.

#### MENTAL MODEL
Each child sends a sealed report upward. For Q343, the edge label says whether a leaf qualifies; for Q350, the report contains the whole branch's weight.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  A leaf has no children. A left leaf must also be the left child of its parent. A removed edge separates one subtree from the rest.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q343 can check `node.left` directly or pass an `isLeft` flag. Q350 needs total sum and a non-root subtree equal to half; use two passes or collect sums during one postorder and check afterward.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  For Q350, odd totals cannot split equally, but zero and negative values demand care: the root's total must not count as a removable subtree. A one-pass frequency map of subtree sums or `(sum, found)` return can handle repeated/zero sums cleanly. Iterative postorder avoids stack overflow on skewed trees.

#### ALL VARIATIONS COVERED
- **Q343:** Add `node.left.value` only when `node.left` exists and has no children; recurse into both sides. A leaf that happens to appear visually left is not enough—it must be a left child.
- **Q350:** Compute total `T`, reject odd `T`, then find a non-root subtree with sum `T/2`; cutting its parent edge leaves the other component with the same sum. ⚠️ Never accept the root itself as the candidate subtree.

#### CONNECTIONS TO OTHER TOPICS
Tree diameter, subtree sizes, path sums, serialization, rerooting, balanced partitions, postorder traversal, and recursion invariants.

#### CODE / EXAMPLE (if applicable)
```text
sumLeftLeaves(node):
    if node==null: return 0
    add = node.left.value if node.left is a leaf else 0
    return add + sumLeftLeaves(node.left) + sumLeftLeaves(node.right)

total = subtreeSum(root)
if total is odd: return false
return existsNonRootSubtree(root, total/2)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define “left leaf” and “component after cutting” precisely. For the partition problem, say aloud why checking half the total is sufficient and why the root is excluded. Dry-run a zero-sum tree because it exposes the common root-candidate bug.

#### ONE-LINE SUMMARY
Pass edge context for left leaves; use postorder subtree sums and find a non-root half-total subtree for an equal split.

---

### FINDING DUPLICATES IN PLACE ⚡⚠️
**Covers questions: 344**

#### CORE CONCEPT (30 seconds)
If an array of length `n` contains values restricted to `1..n`, use index `abs(value)−1` as that value's marker. On first visit, negate the value at that index; if it is already negative, the value has appeared before. This is `O(n)` time and `O(1)` auxiliary space, but it mutates the input.

#### WHY IT EXISTS
The bounded value domain provides a free one-to-one mapping from values to existing array positions. Those cells can store the “seen” bit that a hash set would otherwise require.

#### MENTAL MODEL
Every value owns a numbered mailbox. Flip that mailbox's flag on the first visit; a second visitor finding it flipped is a duplicate.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use `index=abs(a[i])−1`; negative means seen. Always take absolute value because earlier iterations may have changed the sign.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State the `1..n` constraint, mutation, output-space convention, and whether a value appearing three times should be emitted once or twice. Restore signs afterward if the caller requires the original array.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Sign marking cannot directly represent zero. For domain `0..n−1`, use modular count accumulation or cyclic placement with careful overflow and restoration. If values are unrestricted or input is immutable, `O(1)` auxiliary space is generally unavailable without sorting/mutation or extra assumptions.

#### ALL VARIATIONS COVERED
- **Q344:** Under the standard `1..n` constraint, use sign marking to identify repeated values in linear time and constant auxiliary space. ⚠️ Ask for the value range and duplicate-output semantics before coding.

#### CONNECTIONS TO OTHER TOPICS
Cyclic sort, missing numbers, first missing positive, frequency encoding, pigeonhole principle, Floyd's duplicate cycle, and in-place algorithms.

#### CODE / EXAMPLE (if applicable)
```text
answer=[]
for i in 0..n-1:
    value=abs(a[i])
    idx=value-1
    if a[idx]<0: answer.add(value)
    else: a[idx]=-a[idx]
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Lead with the constraint that makes the trick legal. Mention mutation instead of quietly changing the input. Avoid claiming universal `O(1)` space for arbitrary integers; that is the trap hidden in the wording.

#### ONE-LINE SUMMARY
When values lie in `1..n`, map each value to an index and use that cell's sign as its in-place seen flag.

---

### CHOICE-BASED DP: STOCKS, COIN CHANGE, AND NON-ADJACENT SUM ⚡⚠️
**Covers questions: 345, 347, 349**

#### CORE CONCEPT (30 seconds)
Define the smallest state that captures what future choices depend on, then combine take and skip transitions. Stock profit uses `(day, transactionsLeft, holding)` or buy/sell states; coin-change counting uses `(coinPrefix, amount)` and processes coins outermost; non-adjacent sum uses the best totals ending before the current element. State meaning and iteration order determine correctness.

#### WHY IT EXISTS
Brute force repeatedly solves the same suffix decisions. DP stores those repeated results. The questions look different, but all ask: if I take this option, what future state becomes legal; if I skip it, what remains?

#### MENTAL MODEL
At every checkpoint choose a door. “Skip” preserves most state; “take” changes capacity, transaction status, or which next index is allowed. Cache the best—or the number of routes—from each room.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stock transaction means one buy plus one sell. Coin-change “ways” usually ignores order. Non-adjacent sum is the house-robber recurrence `dp[i]=max(dp[i−1],a[i]+dp[i−2])`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q345 is typically `O(nk)` and can compress day space. Q347 uses `ways[0]=1` and coins in the outer loop to count combinations once. Q349 compresses to two values and must clarify whether the empty subsequence is allowed.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  In Q345, if `k>=n/2`, unlimited-transactions greedy summation is equivalent and avoids large DP. For Q347, reversing loop order counts permutations instead of combinations; zero/negative denominations are invalid. For Q349 with all negative values, answer is `0` if empty is allowed, otherwise the maximum element; reconstructing chosen indices requires retained decisions.

#### ALL VARIATIONS COVERED
- **Q345:** Track the best holding and non-holding profit for each allowed transaction count, with `O(nk)` time; use the unlimited-transactions shortcut when `k>=n/2`. ⚠️ Clarify whether `k` counts completed buy-sell pairs.
- **Q347:** Initialize `ways[0]=1`, iterate each denomination outside, and update amounts upward so combinations are counted without order. ⚠️ Amount-first iteration answers a different question by counting ordered sequences.
- **Q349:** At each value choose `skip=previousBest` or `take=value+bestTwoBack`; compress to two variables and define behavior for negative arrays.

#### CONNECTIONS TO OTHER TOPICS
0/1 and unbounded knapsack, state machines, memoization, tabulation order, house robber, weighted interval scheduling, subsequences, and DP space compression.

#### CODE / EXAMPLE (if applicable)
```text
# coin combinations
ways[0]=1
for coin in coins:
    for amount in coin..target:
        ways[amount]+=ways[amount-coin]

# maximum non-adjacent sum, empty allowed
twoBack=0; oneBack=0
for x in a:
    current=max(oneBack, twoBack+x)
    twoBack=oneBack; oneBack=current
return oneBack
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Write the state definition before recurrence; this makes your thought process auditable. For coin change, explicitly connect loop order to combinations. For stocks, test `k=0`, one day, and rising/falling prices. JTG will value a clear `O(nk)` solution plus the large-`k` observation more than a memorized wall of indices.

#### ONE-LINE SUMMARY
Model each problem as take versus skip, but let state and loop order encode exactly what taking changes and what counts as distinct.

---

### MINIMUM DELETIONS TO MAKE TWO STRINGS EQUAL — LCS ⚡
**Covers questions: 346**

#### CORE CONCEPT (30 seconds)
Keep a longest common subsequence of length `L` in both strings and delete every other character. If lengths are `m` and `n`, minimum deletions are `(m−L)+(n−L)=m+n−2L`. Compute LCS with dynamic programming in `O(mn)` time and `O(min(m,n))` space if only the count is needed.

#### WHY IT EXISTS
After deletions, the remaining equal string must be a common subsequence. Keeping the longest possible common subsequence maximizes saved characters and therefore minimizes deletions.

#### MENTAL MODEL
Highlight the longest matching skeleton in both strings; erase every character not on that shared skeleton.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Subsequence preserves relative order but need not be contiguous. Use `m+n−2*LCS`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  `dp[i][j]` is LCS length for prefixes. Matching characters add one from the diagonal; otherwise take the maximum of dropping one character from either prefix.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If deletion costs differ, use weighted edit-distance DP instead of the simple length formula. If actual deletions are requested, retain/backtrack the table or use Hirschberg's algorithm for linear-space reconstruction.

#### ALL VARIATIONS COVERED
- **Q346:** Find LCS length `L`, then return `len(a)+len(b)−2L`; the two terms count deletions from each string separately.

#### CONNECTIONS TO OTHER TOPICS
Edit distance, shortest common supersequence, longest palindromic subsequence, diff tools, sequence alignment, and DP reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
for i in 1..m:
    for j in 1..n:
        if a[i-1]==b[j-1]: dp[i][j]=1+dp[i-1][j-1]
        else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
L=dp[m][n]
return m+n-2*L
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove the reduction in one sentence: any final equal string is a common subsequence, so keeping the longest minimizes deletion. Do not confuse substring with subsequence or return only `max(m,n)−L`.

#### ONE-LINE SUMMARY
Keep the LCS and delete everything else, giving `m+n−2×LCS` deletions.

---

### MULTI-SOURCE BFS ⚡
**Covers questions: 348**

#### CORE CONCEPT (30 seconds)
For an unweighted graph or grid, enqueue every source initially with distance zero, then run one normal BFS. The wavefronts expand together, and the first time a node is reached gives its shortest distance to the nearest source. Complexity is `O(V+E)` for a graph or `O(rows×cols)` for a grid.

#### WHY IT EXISTS
Running BFS separately from each source repeats most exploration. A virtual super-source connected to every real source by zero-cost edges produces the same nearest-source distances; initializing the queue with all sources simulates it without adding a node.

#### MENTAL MODEL
Light several fires at the same moment. The time each cell first feels heat is its distance to the closest fire.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Put all sources in the queue before traversal, assign each distance zero, and mark them visited immediately.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Expand neighbors level by level and set `dist[v]=dist[u]+1` only on first discovery. Explain that FIFO order merges shortest-path layers correctly.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Track source ownership as well as distance for Voronoi-style partitioning. Use multi-source Dijkstra rather than BFS for nonnegative weighted edges; use 0-1 BFS for weights only zero or one. Empty-source input leaves all vertices unreachable.

#### ALL VARIATIONS COVERED
- **Q348:** Seed the queue with every source at distance zero and perform a single BFS to compute the nearest-source shortest distance for every reachable node.

#### CONNECTIONS TO OTHER TOPICS
Rotting oranges, nearest zero, distance transforms, graph Voronoi regions, super-sources, Dijkstra, 0-1 BFS, and epidemic spread.

#### CODE / EXAMPLE (if applicable)
```text
queue=[]; dist[*]=INF
for s in sources:
    dist[s]=0
    queue.push(s)
while queue not empty:
    u=queue.popFront()
    for v in adj[u]:
        if dist[v]==INF:
            dist[v]=dist[u]+1
            queue.push(v)
return dist
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State whether “from all sources” means distance to the nearest source—the standard multi-source interpretation. Mark sources when enqueued, not when dequeued, to avoid duplicates. Flag weighted edges immediately because ordinary BFS would then be wrong.

#### ONE-LINE SUMMARY
Start one BFS with every source at distance zero; simultaneous wavefronts assign each node its nearest-source shortest distance.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q341** prepares you for topological sorting, course scheduling, dependency cycles, SCCs, and deadlock-style questions.
- **Q342** connects to Kruskal/DSU, network connection cost, clustering, and dense-versus-sparse graph design.
- **Q343 and Q350** establish postorder aggregation used in subtree size/sum, diameter, balanced-tree, and tree-DP problems.
- **Q344** connects to cyclic sort, missing/duplicate number variants, first missing positive, and bounded-domain frequency encoding.
- **Q345, Q347, and Q349** prepare you for knapsack families, DP state design, loop-order traps, and space compression.
- **Q346** connects directly to edit distance, shortest common supersequence, diff generation, and sequence alignment.
- **Q348** prepares you for nearest-feature grids, spreading processes, super-source transformations, and weighted variants using Dijkstra.

### What to be comfortable with before Batch 36

- Explain DFS entry/exit states and distinguish directed from undirected cycle detection.
- State an MST model and choose Prim versus Kruskal based on graph density and representation.
- Write postorder DFS that returns a subtree aggregate while excluding the root when an edge must be cut.
- Ask for input-domain guarantees before using an in-place indexing trick.
- Define DP state, base case, transition, and iteration order before optimizing space.
- Distinguish subsequence from substring and derive the LCS deletion formula.
- Recognize when a single multi-source traversal replaces repeated single-source searches.

## Batch 35 Rapid Recall

1. **Directed cycle:** an edge to gray means a back edge to the current DFS path.
2. **Connect points:** implicit complete graph plus Prim gives the MST cost.
3. **Left leaves:** leaf status plus a left-parent edge.
4. **Duplicates:** bounded values let cell signs store seen flags.
5. **`k` stock trades:** `O(nk)` state DP; large `k` becomes unlimited transactions.
6. **Equal strings:** deletions equal `m+n−2×LCS`.
7. **Coin ways:** coins outermost counts combinations.
8. **All sources:** enqueue them together and run one BFS.
9. **Non-adjacent sum:** `max(skip, take+twoBack)`.
10. **Equal tree split:** find a non-root subtree whose sum is half the total.
