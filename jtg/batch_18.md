# JTG Technical Interview Coaching — Batch 18

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 171–180

## Questions in This Batch

171. ⚡⚠️ Find the longest increasing subsequence in an array.
172. ⚡ Find the median from a data stream.
173. ⚡ Explain topological sorting and its applications.
174. ⚡⚠️ Detect a negative-weight cycle in a graph.
175. ⚡ Find the shortest path in an unweighted graph.
176. ⚡⚠️ Explain greedy algorithms and when they work.
177. ⚡ Describe the activity-selection problem and its greedy solution.
178. ⚡ Find all subsets of a set.
179. ⚡⚠️ Explain how a hash map works internally and handles collisions.
180. ⚡⚠️ Search efficiently in a rotated sorted array.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | LIS state compression and binary search | 171 | LIS has a direct quadratic DP and an optimised `tails` invariant. |
| B | Online order statistics | 172 | Two heaps maintain the lower/upper halves under streaming insertion. |
| C | Graph ordering and paths | 173, 174, 175 | These cover DAG ordering, negative-cycle detection, and shortest paths under different edge assumptions. |
| D | Greedy choice and proof | 176, 177 | Activity selection is the canonical exchange-argument example of a correct greedy rule. |
| E | Power-set generation | 178 | Every item creates an include/exclude branch, producing all `2^n` subsets. |
| F | Hash-map internals | 179 | Hashing, equality, collisions, load factor, and resizing form one complete mechanism. |
| G | Modified binary search | 180 | Rotation preserves a sorted half at each step, enabling logarithmic elimination. |

---

### LONGEST INCREASING SUBSEQUENCE ⚡⚠️
**Covers questions: 171**

#### CORE CONCEPT (30 seconds)
For LIS length, maintain `tails[len-1]` as the smallest possible ending value of any increasing subsequence of length `len`. For each value, binary-search the first tail `>= value` and replace it, or append if none. Smaller tails leave more room to extend, so the number of tails is the LIS length. Time is `O(n log n)` and space `O(n)`.

#### WHY IT EXISTS
The direct DP compares every earlier value and costs `O(n²)`. Many subsequences of the same length differ only in their ending value; keeping the smallest end dominates all larger endings, compressing the state to one candidate per length.

#### MENTAL MODEL
Build card piles: place each number on the leftmost pile whose top is at least that number. The number of piles is the longest strictly increasing length because lower pile tops preserve the best future extension chances.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  DP: `dp[i] = 1 + max(dp[j])` for `j<i` and `a[j]<a[i]`, `O(n²)`. Optimised tails/lower-bound: `O(n log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For strictly increasing LIS, replace first tail `>= x` (`lower_bound`). For non-decreasing, replace first tail `> x` (`upper_bound`). To return an actual LIS, track each value's predecessor index and the index ending each length.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  `tails` values are optimal representatives and are not necessarily themselves one subsequence from the input. Replacing a tail does not reduce the best achievable length. Clarify empty input and strict versus non-decreasing semantics. Reconstruction remains `O(n log n)` with parent arrays.

#### ALL VARIATIONS COVERED
- **Q171:** Present `O(n²)` DP first for clarity, then optimise to `O(n log n)` using smallest tail per length. ⚠️ Do not return the `tails` array as the actual LIS unless reconstructing with indices/parents.

#### CONNECTIONS TO OTHER TOPICS
Dynamic programming, binary search/lower bound, patience sorting, envelopes/chain problems, maximum-sum increasing subsequence, reconstruction, and partial orders.

#### CODE / EXAMPLE (if applicable)
```text
tails = []
for x in a:
    i = first index where tails[i] >= x
    if i == length(tails): tails.append(x)
    else: tails[i] = x
return length(tails)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define what `tails[i]` means before coding and justify replacement. Clarify strictness and whether length or sequence is required. Avoid calling the method greedy without explaining its invariant or confusing subsequence with contiguous subarray.

#### ONE-LINE SUMMARY
LIS keeps the smallest possible tail for every subsequence length and binary-searches updates, yielding `O(n log n)` length computation.

---

### MEDIAN FROM A DATA STREAM ⚡
**Covers questions: 172**

#### CORE CONCEPT (30 seconds)
Maintain a max-heap `lower` for the smaller half and a min-heap `upper` for the larger half. Keep every `lower` value `<=` every `upper` value and their sizes differing by at most one. Insert in `O(log n)`, rebalance, and read the median in `O(1)` from one root or the average of both roots.

#### WHY IT EXISTS
Re-sorting all values after every arrival costs too much. Median only needs the two centre boundaries, so two heaps preserve exactly the order information required under online insertions.

#### MENTAL MODEL
Split people by height into a shorter-half room and taller-half room. The tallest in the shorter room and shortest in the taller room stand at the shared doorway; those boundary people determine the median.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Max-heap lower half, min-heap upper half. Insert `O(log n)`, median `O(1)`, storage `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Insert relative to `lower.max`, then move roots until sizes differ by at most one. For odd count, root of the larger heap is median; for even count, average both roots.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Compute the average in a wider numeric type to prevent overflow. Decide median type for integers. Arbitrary deletion/sliding-window median needs lazy deletion or balanced multisets because heaps cannot remove arbitrary values efficiently. In distributed/approximate streams, quantile sketches may replace exact `O(n)` storage.

#### ALL VARIATIONS COVERED
- **Q172:** Use two balanced heaps with lower-max ≤ upper-min; update in `O(log n)` and report the centre root(s) in `O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Priority queues, order statistics, balanced BSTs, sliding-window median, quantile sketches, online algorithms, and heap deletion.

#### CODE / EXAMPLE (if applicable)
```text
add(x):
    if lower.empty() or x <= lower.max: lower.push(x)
    else: upper.push(x)
    if lower.size > upper.size + 1: upper.push(lower.popMax())
    if upper.size > lower.size + 1: lower.push(upper.popMin())

median():
    if sizes equal: return (wide(lower.max) + upper.min) / 2
    return root of larger heap
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State both invariants—ordering and size—then dry-run several inserts. Mention overflow/empty-stream behavior. Avoid saying heaps sort all values; they expose only the central boundaries needed.

#### ONE-LINE SUMMARY
Two balanced heaps preserve the lower and upper halves, giving `O(log n)` streaming insertion and `O(1)` median lookup.

---

### TOPOLOGICAL SORT, NEGATIVE CYCLES, AND UNWEIGHTED SHORTEST PATHS ⚡⚠️
**Covers questions: 173, 174, 175**

#### CORE CONCEPT (30 seconds)
Topological sorting orders a DAG so every edge `u→v` places `u` before `v`, using Kahn's indegrees or DFS in `O(V+E)`. Bellman–Ford detects a source-reachable negative cycle if any edge can still relax after `V-1` passes. BFS finds shortest paths in an unweighted graph because vertices are first discovered in non-decreasing edge distance, also in `O(V+E)`.

#### WHY IT EXISTS
Different graph constraints enable different conclusions. Acyclic direction gives a legal dependency order; negative weights require repeated relaxation rather than Dijkstra's greedy finalisation; equal edge cost lets a queue process shortest distance layer by layer.

#### MENTAL MODEL
Topological sort creates a task list with prerequisites first. Bellman–Ford repeatedly checks every road; an improvement after all simple paths should have settled proves a cost-lowering loop. BFS is a ripple where each ring is one more edge from the source.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Topological order exists only for DAGs. Bellman–Ford: relax all edges `V-1` times, then test one more pass. BFS gives unweighted shortest distance/parent.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Kahn starts with indegree-zero vertices; fewer than `V` processed means a cycle. Bellman–Ford skips edges from unreachable `u`. BFS marks on enqueue and stores `dist[v]=dist[u]+1`, `parent[v]=u` for path reconstruction.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  DAGs may have multiple valid topological orders; a min-heap can choose lexicographically smallest. Standard single-source Bellman–Ford detects only cycles reachable from that source; initialise all distances to zero/add a super-source to detect any negative cycle. BFS works for directed or undirected unweighted graphs; `0-1 BFS` handles weights 0/1 with a deque.

#### ALL VARIATIONS COVERED
- **Q173:** Topological sort linearises DAG dependencies for build systems, course prerequisites, scheduling, and DAG DP; Kahn/DFS costs `O(V+E)`.
- **Q174:** After `V-1` Bellman–Ford passes, any further reachable relaxation proves a negative-weight cycle. ⚠️ Add a super-source/all-zero initialization to check the entire disconnected graph.
- **Q175:** BFS from the source records minimum edge count and parents in `O(V+E)` for an adjacency list.

#### CONNECTIONS TO OTHER TOPICS
DAG DP, cycle detection, Bellman–Ford, Dijkstra, BFS/0-1 BFS, dependency resolution, longest DAG paths, parent reconstruction, and strongly connected components.

#### CODE / EXAMPLE (if applicable)
```text
dist[source] = 0
repeat V - 1 times:
    changed = false
    for (u, v, w) in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            dist[v] = dist[u] + w; changed = true
    if not changed: break

for (u, v, w) in edges:
    if dist[u] != INF and dist[u] + w < dist[v]: report negative cycle
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Choose the algorithm from graph properties and say those assumptions first. Explain why each queue/pass order is correct. Distinguish cycle detection in a DAG/topological context from negative-weight cycles. Avoid using Dijkstra merely because a graph is weighted.

#### ONE-LINE SUMMARY
DAGs permit topological order, equal edge costs permit BFS shortest paths, and negative edges require Bellman–Ford whose extra relaxation exposes a negative cycle.

---

### GREEDY ALGORITHMS AND ACTIVITY SELECTION ⚡⚠️
**Covers questions: 176, 177**

#### CORE CONCEPT (30 seconds)
A greedy algorithm commits to the locally best available choice without revisiting it. It is correct only when the problem has a greedy-choice property and optimal substructure, usually proved by an exchange argument. For maximum non-overlapping activity count, sort by finish time and repeatedly select the compatible activity that finishes earliest.

#### WHY IT EXISTS
Dynamic programming explores multiple alternatives; a proven greedy rule collapses them to one choice, often producing simpler, faster algorithms. Earliest finish leaves the most remaining time for future activities.

#### MENTAL MODEL
To fit the most meetings in one room, always take the meeting that frees the room soonest, then repeat among meetings that start afterward.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Greedy = irrevocable local choice. Activity selection: sort by finish, pick first compatible; `O(n log n)` including sort and `O(n)` after sorting.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Exchange proof: replace the first activity in any optimal solution with the earliest-finishing activity; it finishes no later, so the remaining optimal activities still fit. Then the rest is the same subproblem.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Local plausibility is not proof—0/1 knapsack and arbitrary coin systems can defeat common greedy rules. Define compatibility (`start >= lastFinish` or strict variant) and endpoint semantics. Weighted activity selection is not solved by earliest finish; it needs weighted-interval DP.

#### ALL VARIATIONS COVERED
- **Q176:** Greedy works when an exchange/cut argument proves a safe local choice and the remainder retains optimal structure. ⚠️ Optimal substructure alone is not sufficient.
- **Q177:** Sort by ascending finish time and select each activity whose start is compatible with the last finish; this maximises activity count, not total weight/profit.

#### CONNECTIONS TO OTHER TOPICS
Interval scheduling, exchange arguments, cut property, Prim/Kruskal, Huffman coding, fractional versus 0/1 knapsack, weighted interval scheduling, and matroids.

#### CODE / EXAMPLE (if applicable)
```text
sort activities by finish time
selected = []
lastFinish = -infinity
for activity in activities:
    if activity.start >= lastFinish:
        selected.append(activity)
        lastFinish = activity.finish
return selected
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the rule and give a two-sentence exchange proof. Clarify objective and endpoint conventions. Provide a counterexample class where greedy fails. Avoid just saying “choose the best at each step” without defining and proving “best.”

#### ONE-LINE SUMMARY
Greedy commits to a provably safe local choice; earliest finish is safe for maximising the number of non-overlapping activities.

---

### GENERATING ALL SUBSETS ⚡
**Covers questions: 178**

#### CORE CONCEPT (30 seconds)
Generate the power set by making two choices for each element: exclude it or include it. Backtracking produces all `2^n` subsets; copying each result makes total output time `O(n·2^n)`, recursion space `O(n)`, and output space `O(n·2^n)`.

#### WHY IT EXISTS
Every subset corresponds exactly to an `n`-bit decision vector. Include/exclude recursion enumerates each vector once and generalises naturally when later constraints allow pruning.

#### MENTAL MODEL
For every item, flip a yes/no switch. Every complete row of `n` switch choices is one subset.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Backtracking or bit masks enumerate `2^n` subsets. Include empty set and full set.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  At index `i`, recurse without the value, then add it, recurse, and remove it. Alternatively masks `0..2^n-1` encode inclusion bits. Copy the path when recording.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If input contains duplicates and unique subsets are required, sort then skip equal choices at the same recursion depth. Output size makes exponential time unavoidable. Lazy iteration can avoid storing all subsets but not generating them. Bit shifts overflow for large `n` in fixed-width types.

#### ALL VARIATIONS COVERED
- **Q178:** Use include/exclude backtracking or bit masks to enumerate every subset; total work is output-sensitive `O(n·2^n)` when copying results.

#### CONNECTIONS TO OTHER TOPICS
Combinations, permutations, subset sum, backtracking, bit masks, recursion trees, Gray codes, and meet-in-the-middle.

#### CODE / EXAMPLE (if applicable)
```text
generate(i, path):
    if i == n: output copy(path); return
    generate(i + 1, path)       // exclude
    path.append(a[i])
    generate(i + 1, path)       // include
    path.pop()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Mention unavoidable output size, not just recursion depth. Explain path restoration and duplicate policy. Dry-run `[1,2]`. Avoid storing the same mutable path reference in every result.

#### ONE-LINE SUMMARY
Each element contributes an include/exclude bit, so backtracking enumerates `2^n` subsets with output-sensitive `O(n·2^n)` work.

---

### HASH-MAP INTERNALS AND COLLISIONS ⚡⚠️
**Covers questions: 179**

#### CORE CONCEPT (30 seconds)
A hash map computes a hash from a key, maps it to a bucket/index, then compares actual keys among candidates because different keys can collide. Separate chaining stores several entries per bucket; open addressing probes other slots. With good distribution and controlled load factor, get/put/remove are expected `O(1)`; many collisions can degrade to `O(n)`.

#### WHY IT EXISTS
Direct array indexing is fast but arbitrary keys do not naturally fit a compact index range. Hashing compresses the key space while collision handling preserves correctness. Resizing keeps buckets/probe sequences short as the map grows.

#### MENTAL MODEL
A mailroom hashes names into numbered boxes. If two names choose one box, either keep a labelled list inside (chaining) or find another empty box by a probe rule. Always read the label—box equality is not person equality.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Hash → bucket → key equality. Collision strategies: chaining/open addressing. Expected `O(1)`, worst `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Load factor `size/capacity` triggers resize/rehash. `put` updates an equal existing key instead of adding a duplicate. Open addressing needs tombstones for deletion and low load; chaining has node/container overhead but tolerates higher load.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Equal keys must have equal hashes; unequal keys may share hashes. Mutating fields used in a key's hash/equality after insertion can make the entry unreachable. Some implementations treeify long chains, but generic worst case remains collision-dependent. Resizing costs `O(n)` occasionally and makes insertion amortized expected `O(1)`.

#### ALL VARIATIONS COVERED
- **Q179:** Explain hash/index, collision resolution, equality verification, load factor, and resize. ⚠️ A hash match never proves key equality, and “O(1)” is expected/amortized, not unconditional.

#### CONNECTIONS TO OTHER TOPICS
Hash functions, equality contracts, chaining/probing, load factor, amortized analysis, Bloom filters, caching, sets, adversarial hashing, and concurrent maps.

#### CODE / EXAMPLE (if applicable)
```text
put(key, value):
    i = spread(hash(key)) mod capacity
    for entry in bucket[i]:
        if entry.hash == hash(key) and entry.key == key:
            entry.value = value; return
    bucket[i].append(new Entry(key, value))
    if size/capacity > threshold: resizeAndRehash()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Tell the complete lookup story and separate hash comparison from equality. Explain resize/amortization and one collision strategy deeply. Avoid claiming hashes are unique or that a map stays constant time under adversarial keys.

#### ONE-LINE SUMMARY
A hash map narrows a key to a bucket, resolves collisions and verifies equality, maintaining expected constant-time access through distribution and resizing.

---

### SEARCHING A ROTATED SORTED ARRAY ⚡⚠️
**Covers questions: 180**

#### CORE CONCEPT (30 seconds)
Use modified binary search. At each midpoint, at least one half is sorted when values are distinct. Determine the sorted half, test whether the target lies within its boundaries, and discard the other half. This gives `O(log n)` time and `O(1)` space.

#### WHY IT EXISTS
Rotation breaks global sortedness but preserves enough local order to eliminate half the array. Searching for the pivot first is possible, but one-pass binary search combines pivot reasoning and target search.

#### MENTAL MODEL
A sorted number line was cut and swapped. Wherever the midpoint lands, one side remains an unbroken sorted ruler; use its endpoints to decide whether the target is there.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Compare `a[lo]` and `a[mid]` to identify a sorted left half; otherwise the right half is sorted. Narrow using inclusive target bounds.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Handle unrotated, one-element, absent target, and pivot-near-boundary cases. Use `mid = lo + (hi-lo)/2`. With distinct values, complexity remains logarithmic.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicates can make `a[lo] == a[mid] == a[hi]`, hiding which half is sorted; shrinking both ends preserves correctness but can degrade to `O(n)`. If searching via pivot, first find minimum then binary-search the appropriate sorted interval—more steps but sometimes easier to explain.

#### ALL VARIATIONS COVERED
- **Q180:** Identify the sorted half at each midpoint and keep it only if its value range contains the target; distinct-value time is `O(log n)`. ⚠️ Ask about duplicates because they can force linear degradation.

#### CONNECTIONS TO OTHER TOPICS
Binary-search invariants, finding rotation minimum/pivot, lower/upper bounds, answer-space search, duplicate handling, and circular arrays.

#### CODE / EXAMPLE (if applicable)
```text
while lo <= hi:
    mid = lo + (hi - lo) / 2
    if a[mid] == target: return mid
    if a[lo] <= a[mid]:                    // left sorted
        if a[lo] <= target < a[mid]: hi = mid - 1
        else: lo = mid + 1
    else:                                  // right sorted
        if a[mid] < target <= a[hi]: lo = mid + 1
        else: hi = mid - 1
return -1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State distinctness and interval conventions, then narrate which half is sorted and why the target range test is safe. Dry-run unrotated and rotated arrays. Avoid memorising inequality patterns without an invariant.

#### ONE-LINE SUMMARY
Rotation leaves one midpoint half sorted, so range-test that half and discard half the search space—`O(log n)` for distinct values.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q171 (LIS)** connects to envelope nesting, chain problems, binary-search tails, and sequence DP.
- **Q172 (stream median)** prepares sliding-window median, priority queues, quantiles, and streaming system design.
- **Q173–Q175 (graphs)** connect to DAG longest paths, scheduling, Bellman–Ford, BFS, `0-1 BFS`, and SCC/cycle problems.
- **Q176–Q177 (greedy)** prepare meetings/platforms, job scheduling, interval colouring, Huffman coding, and MST correctness.
- **Q178 (subsets)** connects to combinations, target-sum search, bitmask DP, and meet-in-the-middle.
- **Q179 (hash maps)** underpins anagrams, prefix-sum counts, caches, frequency problems, and concurrent map questions.
- **Q180 (rotated search)** leads to finding the rotated minimum and other binary-search boundary problems.

### Be Comfortable With Before Batch 19 (Questions 181–190)

- Arithmetic-sequence indexing and unit-rate reasoning.
- Balance-scale information splitting into equal candidate groups.
- Missing-number methods: sum, XOR, and overflow concerns.
- Brian Kernighan's bit-count trick.
- Water-jug reachability and constructive steps.
- Binary search for an index-value fixed point.
- Canonical signatures for grouping anagrams.
- Maximum product using the three largest or two smallest values.
- Boyer–Moore majority-vote invariant and verification.

### Batch 18 Rapid Recall

171. LIS length: smallest tail per length, binary searched in `O(n log n)`.
172. Stream median: balanced max-heap/min-heap.
173. Topological order exists only for a DAG.
174. Bellman–Ford relaxation after `V-1` passes proves a reachable negative cycle.
175. BFS gives unweighted shortest paths in `O(V+E)`.
176. Greedy needs a proof of safe local choice, not intuition.
177. Activity selection chooses earliest compatible finish.
178. Subsets follow include/exclude branching over `2^n` outputs.
179. Hash map = hash to bucket, resolve collision, verify equality, resize.
180. Rotated search range-tests the sorted half at each midpoint.
