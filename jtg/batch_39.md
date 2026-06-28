# JTG Technical Interview Coaching — Batch 39

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 381–390

## Questions in This Batch

381. ⚡⚠️ Find the longest zigzag (wiggle) subsequence in an array.
382. ⚡⚠️ Find the maximum score of a good subarray.
383. ⚡⚠️ Count groups of strings connected by one-character changes.
384. ⚡ Find the minimum starting vertices needed to reach every node in a DAG.
385. ⚡ Find the `k` points closest to the origin.
386. ⚡⚠️ Find the maximum-score path through a matrix.
387. ⚡ Restore all valid IP addresses from a digit string.
388. ⚠️ Find the minimum arithmetic operations needed to produce a target from a given set.
389. ⚡⚠️ Return all dictionary-word segmentations of a string—Word Break II.
390. ⚡⚠️ Find the maximum-sum path between any two nodes in a binary tree.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Sign-alternating subsequence DP/greedy | 381 | Only the best subsequence ending with an upward or downward difference matters. |
| B | Mandatory-index subarray expansion | 382 | The score couples a subarray's minimum with its length and usually requires containing index `k`. |
| C | Graph components and source reachability | 383, 384 | String transformations form graph components; DAG reachability begins from exactly its zero-indegree sources. |
| D | Top-k geometric selection | 385 | Squared distance supplies a ranking key for heap or quickselect. |
| E | Maximum path dynamic programming | 386, 390 | Both combine the best extendable predecessor/child path while tracking the best complete path. |
| F | Constrained string decomposition | 387, 389 | Backtracking chooses the next valid segment, while pruning/memoization prevents impossible suffix work. |
| G | Shortest search over arithmetic states | 388 | Each allowed operation creates an edge; minimum operation count is a shortest-path question once semantics are fixed. |

---

### LONGEST ZIGZAG SUBSEQUENCE ⚡⚠️
**Covers questions: 381**

#### CORE CONCEPT (30 seconds)
Track `up`, the longest zigzag subsequence ending with a positive difference, and `down`, one ending with a negative difference. If `a[i]>a[i−1]`, set `up=down+1`; if smaller, set `down=up+1`; equal values change neither. The answer is `max(up,down)`, using `O(n)` time and `O(1)` space.

#### WHY IT EXISTS
For length only, the exact previous endpoint is less important than the last difference sign. A more extreme peak or valley can replace an earlier endpoint without shortening the subsequence and leaves at least as much room for the next opposite move.

#### MENTAL MODEL
Trace mountain peaks and valleys. While still climbing, keep only the latest/higher peak; while falling, keep only the latest/lower valley. A zigzag grows only when direction flips.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Initialize `up=down=1` for a non-empty array. Equal adjacent values do not form a positive or negative difference.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Explain the two-state DP and why comparing adjacent array values is enough for the optimized recurrence. An `O(n²)` DP over all previous indexes is correct but unnecessary for length alone.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Reconstructing an actual subsequence requires retaining selected turning points or parent decisions. If “zigzag” means fixed alternation beginning specifically upward, return the appropriate state rather than either orientation. Strict versus non-strict inequalities must be stated.

#### ALL VARIATIONS COVERED
- **Q381:** Maintain best lengths ending in up/down differences and ignore equals. ⚠️ Clarify whether either starting direction is allowed and whether equal differences count.

#### CONNECTIONS TO OTHER TOPICS
Wiggle subsequence, stock peaks/valleys, two-state DP, greedy exchange arguments, subsequence reconstruction, and finite-state optimization.

#### CODE / EXAMPLE (if applicable)
```text
if n==0: return 0
up=1; down=1
for i in 1..n-1:
    if a[i]>a[i-1]: up=down+1
    else if a[i]<a[i-1]: down=up+1
return max(up,down)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define zigzag precisely and derive the two states rather than reciting code. Dry-run equal values and a monotonic array; both reveal incorrect unconditional increments.

#### ONE-LINE SUMMARY
Keep the best subsequence whose last move is up and whose last move is down; an opposite sign extends the other state.

---

### MAXIMUM SCORE OF A GOOD SUBARRAY ⚡⚠️
**Covers questions: 382**

#### CORE CONCEPT (30 seconds)
Under the standard definition, a good subarray must contain a given index `k`, and its score is `minimum(subarray)×length`. Start `left=right=k` and current minimum `a[k]`; repeatedly expand toward the larger adjacent value, update the minimum, and maximize `minimum×(right−left+1)`. This is `O(n)` time and `O(1)` space.

#### WHY IT EXISTS
For a fixed expansion step, choosing the larger available neighbor delays the drop in the running minimum. Every candidate interval must grow outward from `k`; once a smaller boundary is admitted, the score's height cannot recover.

#### MENTAL MODEL
Build a rectangle over histogram bars that must cover bar `k`. Widen toward the taller next wall to preserve the rectangle's limiting height as long as possible.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Score is width times minimum height, not sum. Initialize with the single-element interval at `k`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Handle exhausted sides by forcing expansion to the remaining side. Compute score after including the new boundary and updating the minimum. A monotonic-stack solution can also compute each bar's maximal span containing `k`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The greedy proof relies on nonnegative histogram-like values and the standard mandatory-index definition. If no `k` is supplied, the question becomes largest rectangle in a histogram (`max minimum×length`) and a monotonic stack is the canonical solution.

#### ALL VARIATIONS COVERED
- **Q382:** Ask for the definition of “good,” its score, and the required index `k`; under the standard formulation, expand from `k` toward the larger neighbor. ⚠️ Without `k`, solve the different largest-rectangle problem.

#### CONNECTIONS TO OTHER TOPICS
Largest rectangle in histogram, monotonic stacks, two pointers, bottleneck ranges, range minimum, and container-style discard proofs.

#### CODE / EXAMPLE (if applicable)
```text
left=right=k; minimum=a[k]; best=a[k]
while left>0 or right<n-1:
    if left==0: right+=1
    else if right==n-1: left-=1
    else if a[left-1]<a[right+1]: right+=1
    else: left-=1
    minimum=min(minimum,a[left],a[right])
    best=max(best,minimum*(right-left+1))
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Resolve the omitted `k` and score definition before coding. Explain why minimum is monotonic under expansion and why the larger neighbor is the safe next choice.

#### ONE-LINE SUMMARY
For a subarray forced to contain `k`, expand outward toward the taller neighbor while tracking `minimum×width`.

---

### STRING-CHANGE GROUPS AND MINIMUM DAG SOURCES ⚡⚠️
**Covers questions: 383, 384**

#### CORE CONCEPT (30 seconds)
Both are graph-structure questions. For strings, make each string a vertex, connect strings allowed by one character operation, then count connected components using DFS/BFS or DSU. For a DAG, the minimum starting set that can reach every node is exactly all vertices with indegree zero: each such vertex is unreachable from another vertex, and every other DAG vertex is reachable from some zero-indegree source.

#### WHY IT EXISTS
Connectivity is transitive: strings need not differ directly if a chain of valid changes connects them. In a DAG, repeatedly following incoming edges must terminate at a source, so sources collectively cover all vertices—and none can be omitted.

#### MENTAL MODEL
String groups are islands joined by one-edit bridges. A DAG is a system of downhill streams; every stream begins at a spring with no incoming channel, and all springs are required starting points.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Components can be counted by traversal or DSU. In a DAG, collect every vertex with indegree zero.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q383 must define “single character change”: Hamming replacement only usually requires equal lengths; add/delete/replace is edit distance one. Avoid `O(N²·L)` pair checking when wildcard buckets or generated neighbors can index candidates. Q384 computes indegrees in `O(V+E)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If each string represents a set of letters and operations are add/delete/replace, bitmask neighbor generation plus DSU is efficient. Duplicate strings need clear vertex/set semantics. If the graph is not a DAG, zero-indegree vertices are insufficient; condense strongly connected components and choose each source SCC.

#### ALL VARIATIONS COVERED
- **Q383:** Define the permitted one-character operation, union every directly connected pair efficiently, and return the number of DSU roots/components. ⚠️ Replacement-only and add/delete/replace produce different graphs.
- **Q384:** Return all zero-indegree DAG vertices and prove necessity plus sufficiency; for general directed graphs, use source SCCs instead.

#### CONNECTIONS TO OTHER TOPICS
Connected components, DSU, edit distance, wildcard indexing, topological sort, SCC condensation, source components, and reachability.

#### CODE / EXAMPLE (if applicable)
```text
# Q384
indegree=[0]*V
for u in vertices:
    for v in adj[u]: indegree[v]+=1
answer=[u for u in vertices if indegree[u]==0]

# Q383 skeleton
initialize DSU over strings
for each efficiently generated valid neighbor pair (u,v): union(u,v)
return number of distinct roots
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
For Q383, refuse to guess what “change” means—state the interpretations and select one. For Q384, give the concise graph proof rather than treating zero indegree as a memorized fact.

#### ONE-LINE SUMMARY
String groups are connected components under the stated edit rule; a DAG needs exactly its zero-indegree vertices as reachability starts.

---

### K CLOSEST POINTS TO THE ORIGIN ⚡
**Covers questions: 385**

#### CORE CONCEPT (30 seconds)
Rank each point by squared distance `x²+y²`; square roots are unnecessary because they preserve order. Maintain a max-heap of at most `k` points: push each point and remove the farthest when size exceeds `k`. This uses `O(n log k)` time and `O(k)` space. Quickselect gives average `O(n)` time when output order is irrelevant.

#### WHY IT EXISTS
Only the current `k` closest points matter. A max-heap exposes the worst selected point, so any closer newcomer can replace it without storing or sorting the full input.

#### MENTAL MODEL
Keep `k` seats for the closest travelers; the seat nearest the exit belongs to the farthest selected traveler and is the first replaced.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Compare squared distances. Handle `k=0` and decide behavior when `k>n`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Heap is deterministic `O(n log k)` and good for streaming. Sorting is simpler at `O(n log n)`. Quickselect partitions in place with average `O(n)` but worst-case `O(n²)` unless pivot strategy is strengthened.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Use a wide type because squaring coordinates can overflow. Define tie behavior and whether result order matters. In high dimensions or repeated nearest-neighbor queries, spatial indexes/approximate methods become relevant.

#### ALL VARIATIONS COVERED
- **Q385:** Use squared distance as the key and choose a size-`k` max-heap or quickselect based on streaming, memory, and worst-case requirements.

#### CONNECTIONS TO OTHER TOPICS
Top-k selection, heaps, quickselect, nearest neighbors, streaming algorithms, distance metrics, and overflow-safe comparisons.

#### CODE / EXAMPLE (if applicable)
```text
heap = max-heap by x*x+y*y
for point in points:
    heap.push(point)
    if heap.size>k: heap.popMax()
return heap elements
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Skip the square root and explain the heap invariant. Mention wide arithmetic and compare heap, full sort, and quickselect without overselling average-case performance.

#### ONE-LINE SUMMARY
Rank by squared distance and retain only the best `k` using a max-heap, or partition with quickselect.

---

### MAXIMUM PATH DP IN MATRICES AND BINARY TREES ⚡⚠️
**Covers questions: 386, 390**

#### CORE CONCEPT (30 seconds)
Define what path can be extended. In a matrix with acyclic moves such as down/down-left/down-right, `dp[r][c]` is the cell value plus the best legal predecessor. In a binary tree, postorder returns the best downward arm `node.value+max(0,leftGain,rightGain)`, while the global path through the node is `node.value+max(0,leftGain)+max(0,rightGain)`.

#### WHY IT EXISTS
A path reaching a matrix cell needs only its best predecessor. A tree path may join two child branches at one highest node, but only one branch can continue to the parent. Separating extendable state from complete-answer state prevents branching paths from being returned illegally.

#### MENTAL MODEL
In the matrix, each cell accepts the richest incoming route. In the tree, each node can build a complete bridge from two profitable child roads but can send only one road upward.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  State legal matrix moves and allowed start/end rows. For the tree, initialize the global answer to a real node value, not zero, because all values may be negative.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q386 fills rows in dependency order and uses `−∞` for illegal predecessors when a path must include cells. Q390 clamps negative child gains to zero, updates a global through-path, and returns one downward arm. Both are linear in their input size.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If matrix moves create cycles, ordinary row DP is invalid; use DAG longest path if acyclic or recognize that positive cycles make an unrestricted maximum walk unbounded. For tree path reconstruction, retain chosen children/endpoints. Wide totals may be needed.

#### ALL VARIATIONS COVERED
- **Q386:** Ask for legal moves and start/end conditions, then add each cell to its best valid predecessor in topological/row order. ⚠️ Different move sets define different problems.
- **Q390:** Combine both positive child gains for the global any-node-to-any-node path, but return only the larger one-sided gain to the parent. ⚠️ Initializing best to zero gives the wrong answer for an all-negative tree.

#### CONNECTIONS TO OTHER TOPICS
Minimum/maximum grid paths, DAG longest paths, tree diameter, path sums, postorder DP, Kadane-style negative pruning, and path reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
# Q390
gain(node):
    if node==null: return 0
    L=max(0,gain(node.left)); R=max(0,gain(node.right))
    best=max(best,node.value+L+R)
    return node.value+max(L,R)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define “path” before writing a recurrence. For Q390, clearly separate the returned arm from the complete path considered locally. For Q386, draw dependency arrows so iteration order is obvious.

#### ONE-LINE SUMMARY
DP keeps the best path that can continue; the final answer may combine multiple incoming branches only where the problem permits it.

---

### CONSTRAINED STRING DECOMPOSITION: IP RESTORATION AND WORD BREAK II ⚡⚠️
**Covers questions: 387, 389**

#### CORE CONCEPT (30 seconds)
Build answers by choosing the next valid segment. For IP restoration, choose exactly four numeric parts, each length `1..3`, value `0..255`, and no leading zero unless the part is `0`. For Word Break II, choose every dictionary prefix and recursively produce all sentences for the remaining suffix, memoizing by start index.

#### WHY IT EXISTS
Both questions enumerate paths through a string-position graph. Local segment rules determine valid edges; pruning or memoization avoids exploring positions that cannot lead to a complete answer.

#### MENTAL MODEL
Place dividers in the string. An IP needs exactly three dividers satisfying strict numeric rules; Word Break places dividers wherever dictionary words end and records every route to the finish.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  IP has four non-empty parts; `0` is valid but `00` is not. Word Break II returns sentences/paths, not only a boolean.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For IP, prune when remaining digits are fewer than remaining parts or more than three times that count. For Word Break, memoize `sentencesFrom(index)` and use a hash set; combine current word with each suffix sentence.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Word Break II output can be exponential, so memoization removes repeated computation but cannot remove output cost. A preliminary boolean feasibility DP prevents building dead suffixes. A trie avoids testing every possible substring when dictionary structure is large.

#### ALL VARIATIONS COVERED
- **Q387:** Backtrack exactly four IP segments with length, range, leading-zero, and remaining-length pruning.
- **Q389:** Memoize all sentence suffixes by start index and combine every valid dictionary prefix with every returned suffix path. ⚠️ Boolean Word Break alone does not produce all paths.

#### CONNECTIONS TO OTHER TOPICS
Backtracking, memoized DAG paths, tries, string segmentation, decoding, restore-address problems, and output-sensitive complexity.

#### CODE / EXAMPLE (if applicable)
```text
# IP segment choice
search(index,parts):
    if parts.size==4: emit if index==n; return
    remainingParts=4-parts.size
    if n-index<remainingParts or n-index>3*remainingParts: return
    for length in 1..3:
        segment=s[index:index+length]
        if leadingZero or value>255: break/continue
        choose segment; search(index+length,parts); undo
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State constraints before recursion and show the pruning logic. For Word Break II, mention unavoidable exponential output and use memoization to avoid recomputing identical suffix solution sets.

#### ONE-LINE SUMMARY
Choose valid next segments and recurse; IP uses strict four-part pruning, while Word Break II memoizes every sentence path from each suffix.

---

### MINIMUM ARITHMETIC OPERATIONS AS STATE-SPACE SEARCH ⚠️
**Covers questions: 388**

#### CORE CONCEPT (30 seconds)
The question is underspecified until allowed operations, operand reuse, order, intermediate bounds, and starting rules are known. Once defined, model each reachable numeric value or expression state as a node and each legal arithmetic operation as a unit-cost edge. BFS returns the minimum number of operations; DP over subsets is appropriate when every given number may be used at most once.

#### WHY IT EXISTS
Greedy arithmetic choices can move closer numerically yet block an optimal expression. Minimum operation count is fundamentally a shortest derivation problem, so the state must capture exactly which values/resources remain available.

#### MENTAL MODEL
Numbers are stations and arithmetic operations are one-stop rides. BFS finds the target using the fewest rides; if input numbers are consumable, the ticket also records which numbers have already been used.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Ask which of `+,-,×,÷` are allowed, whether division must be exact, whether negatives/fractions are legal, and whether operands can be reused.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With reusable constants and bounded integer states, multi-source or ordinary BFS with a visited set gives minimum unit operations. With each input usable once, subset DP stores reachable results for each bitmask and combines partitions, tracking minimum cost.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Without bounds, multiplication/addition may create an infinite state graph. Rational arithmetic needs normalized fractions to avoid precision errors. If operations have different costs, use Dijkstra rather than BFS. Expression reconstruction requires parent pointers.

#### ALL VARIATIONS COVERED
- **Q388:** Specify the arithmetic language first, then use BFS for bounded reusable-value states or subset DP for single-use operands. ⚠️ There is no single correct recurrence without these semantics.

#### CONNECTIONS TO OTHER TOPICS
Shortest paths, expression synthesis, 24 game, subset DP, Dijkstra, dynamic programming over masks, and program synthesis.

#### CODE / EXAMPLE (if applicable)
```text
queue=[start states]; distance[start]=0
while queue not empty:
    state=popFront()
    if value(state)==target: reconstruct/return distance[state]
    for next in all legal one-operation transitions(state):
        if next is within bounds and unseen:
            distance[next]=distance[state]+1
            parent[next]=state
            pushBack(next)
return impossible
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
The strongest first move is clarification, not code. Then explain why the chosen state contains enough information and why BFS/DP gives a minimum. Do not silently impose integer division, reuse, or bounds.

#### ONE-LINE SUMMARY
After defining the arithmetic rules, treat each legal operation as an edge and solve the resulting shortest derivation problem.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q381** connects to finite-state subsequence DP, peak/valley greedy arguments, and sequence reconstruction.
- **Q382** prepares you for histogram ranges, monotonic stacks, and mandatory-index subarray optimization.
- **Q383 and Q384** connect to DSU, SCC condensation, source components, transformation graphs, and topological reasoning.
- **Q385** links to streaming top-k, quickselect, heaps, and nearest-neighbor systems.
- **Q386 and Q390** prepare you for DAG longest paths, tree diameter, path reconstruction, and global-versus-returned DP states.
- **Q387 and Q389** connect to memoized string DAGs, tries, decoding, and output-sensitive enumeration.
- **Q388** prepares you for BFS/Dijkstra over implicit states, bitmask DP, and expression synthesis.

### What to be comfortable with before Batch 40

- Reduce alternating subsequences to two last-sign states.
- State every hidden definition in “good subarray” before using two pointers or stacks.
- Model transformations as graph edges and prove why zero-indegree DAG sources are necessary and sufficient.
- Compare heap, sorting, and quickselect for top-k selection.
- Separate an extendable path state from a complete path answer.
- Add pruning and memoization to string-decomposition backtracking.
- Refuse to solve an arithmetic-search problem until operations and state bounds are defined.

## Batch 39 Rapid Recall

1. **Zigzag:** alternate `up` and `down` states.
2. **Good subarray:** expand from `k` toward the taller neighbor.
3. **String groups:** connected components under the exact edit rule.
4. **DAG starts:** all and only zero-indegree vertices.
5. **Closest points:** squared-distance size-`k` max-heap.
6. **Matrix path:** cell plus best legal predecessor.
7. **Restore IP:** four bounded, non-leading-zero segments.
8. **Minimum arithmetic operations:** clarify rules, then shortest-state search.
9. **Word Break II:** memoize all suffix sentence paths.
10. **Tree max path:** combine two positive gains, return one.
