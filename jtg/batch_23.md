# JTG Technical Interview Coaching — Batch 23

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 221–230

## Questions in This Batch

221. ⚡ Find the nth Fibonacci number in `O(log n)` using matrix exponentiation.
222. ⚡⚠️ Count the ways to decode a digit string.
223. ⚡⚠️ Schedule tasks with deadlines to maximise profit.
224. ⚡ Find the minimum number of coins needed to make change.
225. ⚡⚠️ Find the maximum rectangle area in a binary matrix.
226. ⚡⚠️ Find all Hamiltonian paths in a graph.
227. ⚡ Find the start of a linked-list cycle using Floyd's algorithm.
228. ⚡⚠️ Find the minimum element in a rotated sorted array in `O(log n)`.
229. ⚡⚠️ Find the longest path in a DAG.
230. ⚡ Implement an LRU eviction policy from scratch.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | DP recurrence acceleration and counting | 221, 222, 224 | Fibonacci uses algebraic exponentiation; decoding and coin change compute reusable recurrence states. |
| B | Greedy deadline scheduling | 223 | The unit-time version uses profit order plus latest feasible placement. |
| C | Monotonic-stack geometry | 225 | Each matrix row becomes a histogram whose largest rectangle is stack-solvable. |
| D | Graph path complexity under structural constraints | 226, 229 | Hamiltonian paths require exhaustive search generally; acyclicity makes longest path linear-time via topological DP. |
| E | Linked-list cycle-entry geometry | 227 | Floyd's second phase locates the cycle start after detection. |
| F | Rotated-array binary search | 228 | Comparing midpoint with the right boundary identifies which side contains the minimum. |
| G | Constant-time cache eviction | 230 | Hash lookup plus doubly linked recency order yields `O(1)` get/put/evict. |

---

### FIBONACCI EXPONENTIATION, DECODE WAYS, AND COIN CHANGE ⚡⚠️
**Covers questions: 221, 222, 224**

#### CORE CONCEPT (30 seconds)
Fibonacci can be represented by matrix multiplication: `[[1,1],[1,0]]^(n-1)` contains `F(n)`; binary exponentiation squares the matrix and uses `O(log n)` multiplications. Decode Ways uses DP: a nonzero single digit contributes `dp[i-1]`, and a valid pair `10..26` contributes `dp[i-2]`. Minimum coin change—same root concept as Q170—uses `dp[0]=0` and `dp[x]=min(1+dp[x-coin])`, giving `O(amount × coinTypes)`.

#### WHY IT EXISTS
All three start from recurrences. Matrix exponentiation fast-forwards a linear recurrence by exponentiating its transition. Decode/coin DP cache overlapping prefix or amount states so exponential recursive choices are evaluated once.

#### MENTAL MODEL
Fibonacci's matrix is a state-transition button; exponentiation by squaring presses it `n` times using the binary digits of `n`. Decoding walks a string using one- or two-digit tiles. Coin change fills the cheapest known cost for every amount.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Matrix power by squaring: `O(log n)` matrix multiplications. Decode DP: valid one/two-digit transitions, `O(n)`. Minimum coins: amount DP, `O(A·C)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use identity matrix as exponentiation accumulator and define `F(0)=0`. Decode base: `dp[0]=1` (one way to decode empty prefix); `'0'` cannot stand alone, only `10`/`20`. Coin DP initialises unreachable states to `A+1`/infinity and returns `-1` if target remains unreachable.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Fixed-width Fibonacci/counts overflow quickly; use modulus/big integers if specified. Fast doubling also computes Fibonacci in `O(log n)` with fewer scalar operations. Decode rules may differ if wildcard `*` exists. Minimum coin versus number of combinations are different states/transitions; positive coin values and unlimited-use assumptions must be stated.

#### ALL VARIATIONS COVERED
- **Q221:** Raise Fibonacci's 2×2 transition matrix to `n-1` using exponentiation by squaring; `F(n)` is the top-left entry for `n>=1`.
- **Q222:** Count valid one-digit and `10..26` two-digit continuations per prefix in `O(n)`. ⚠️ Zero is valid only inside `10` or `20` under standard mapping.
- **Q224:** Reuse Q170's minimum-unlimited-coins recurrence, now naturally shown bottom-up; `O(A·C)` time and `O(A)` space.

#### CONNECTIONS TO OTHER TOPICS
Linear recurrences, fast doubling, binary exponentiation, automata/state transitions, tiling DP, memoization/tabulation, unbounded knapsack, and modular arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
decodeWays(s):
    if s empty: return 0          // public convention
    prev2 = 1                     // dp[0]
    prev1 = (s[0] != '0') ? 1 : 0
    for i in 2..length(s):
        current = 0
        if s[i-1] != '0': current += prev1
        pair = integer(s[i-2..i))
        if 10 <= pair <= 26: current += prev2
        prev2 = prev1; prev1 = current
    return prev1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define recurrence/base cases before optimisation. For Fibonacci, write identity/odd exponent handling. For decoding, dry-run `06`, `10`, and `226`. For coins, clarify minimum versus ways. Avoid hiding edge cases behind a remembered formula.

#### ONE-LINE SUMMARY
Fast matrix powers accelerate Fibonacci, while prefix/amount DP counts valid decodings and minimises coins by evaluating each reusable state once.

---

### PROFIT-MAXIMISING JOB SEQUENCING ⚡⚠️
**Covers questions: 223**

#### CORE CONCEPT (30 seconds)
Assuming each job takes one time slot and yields profit only if completed by its deadline, sort jobs by descending profit and place each into the latest free slot at or before its deadline. Latest placement preserves earlier slots for tighter-deadline jobs. Sorting costs `O(n log n)`; naive slot search is `O(nD)`, while DSU can find free slots near-constantly.

#### WHY IT EXISTS
Taking high-profit jobs first is only safe if scheduling them as late as possible does not unnecessarily block other feasible jobs. The latest-slot rule preserves maximum flexibility.

#### MENTAL MODEL
Fill a calendar with the most valuable task first, but pencil it into the last day it can still meet its deadline, leaving earlier days open for urgent tasks.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Unit-time job sequencing: sort profits descending, scan backward for a free slot ≤ deadline, sum accepted profits.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Only slots up to `min(maxDeadline,n)` matter. A DSU can make `find(t)` return the latest available slot ≤ `t`; after using slot `t`, union it with `t-1`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The greedy solution assumes equal/unit duration, one machine, independent jobs, and no precedence. Arbitrary durations/profits become weighted scheduling/knapsack-like and this rule can fail. Non-positive-profit jobs may be skipped. Deadline inclusivity and zero deadlines require definition.

#### ALL VARIATIONS COVERED
- **Q223:** Under unit-time assumptions, choose jobs by profit and place each in its latest free pre-deadline slot. ⚠️ Ask about task duration before applying this classic greedy algorithm.

#### CONNECTIONS TO OTHER TOPICS
Greedy exchange arguments, activity selection, DSU, interval scheduling, weighted job scheduling, knapsack, deadlines, and matroids.

#### CODE / EXAMPLE (if applicable)
```text
sort jobs by profit descending
slots[1..D] = empty
profit = 0
for job in jobs:
    for t from min(job.deadline,D) down to 1:
        if slots[t] empty:
            slots[t] = job; profit += job.profit; break
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State assumptions and justify “latest slot.” Compare naive and DSU implementations. Avoid treating this as ordinary activity selection or using profit-first when durations vary.

#### ONE-LINE SUMMARY
For unit-time jobs, take highest profit first and schedule it as late as its deadline allows to preserve earlier capacity.

---

### MAXIMUM RECTANGLE IN A BINARY MATRIX ⚡⚠️
**Covers questions: 225**

#### CORE CONCEPT (30 seconds)
Treat each row as the base of a histogram: maintain `height[c]`, incrementing for `1` and resetting to zero for `0`. For each row, compute the largest histogram rectangle with a monotonic increasing index stack. Total time is `O(rows × cols)` and auxiliary space `O(cols)`.

#### WHY IT EXISTS
Every all-ones rectangle has a bottom row. At that row, column heights encode how far the rectangle can extend upward, reducing the 2D problem to a known 1D largest-rectangle problem.

#### MENTAL MODEL
As each row arrives, stack ones into vertical bars. Find the largest billboard supported by consecutive bars; repeat with every row as the ground line.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Update heights row by row, call largest-rectangle-in-histogram, track global maximum.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Stack indices of non-decreasing heights. When current height is lower, pop height `h`; its right boundary is `i-1`, left boundary is new stack top + 1, width `i-stack.top-1`. Append/process sentinel zero to flush remaining bars.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Equal-height handling (`>=` versus `>`) must match the invariant but both can work consistently. Each index is pushed/popped once, making histogram processing linear. Empty/jagged matrices and character `'1'` versus integer `1` need explicit handling. Area may overflow narrow types for huge dimensions.

#### ALL VARIATIONS COVERED
- **Q225:** Convert each row to cumulative heights and solve one monotonic-stack histogram in linear columns; overall `O(RC)`. ⚠️ Reset height to zero at matrix zeros and flush the stack with a sentinel.

#### CONNECTIONS TO OTHER TOPICS
Monotonic stacks, largest histogram rectangle, maximal square DP, next-smaller elements, matrix preprocessing, and amortized stack analysis.

#### CODE / EXAMPLE (if applicable)
```text
for each row:
    for c: heights[c] = row[c]==1 ? heights[c]+1 : 0
    stack = [-1]
    for i in 0..cols:              // i==cols has height 0 sentinel
        current = (i==cols ? 0 : heights[i])
        while stack.top != -1 and heights[stack.top] > current:
            h = heights[stack.pop()]
            best = max(best, h * (i - stack.top - 1))
        stack.push(i)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove every rectangle is considered at its bottom row and explain stack boundaries. Dry-run `[2,1,2]`. Avoid applying a 2D prefix sum and enumerating every rectangle.

#### ONE-LINE SUMMARY
Accumulate vertical one-heights per row, then solve each resulting histogram with a monotonic stack in overall `O(RC)`.

---

### HAMILTONIAN PATHS VERSUS LONGEST PATH IN A DAG ⚡⚠️
**Covers questions: 226, 229**

#### CORE CONCEPT (30 seconds)
To list all Hamiltonian paths in a general graph, backtrack from every possible start, extending only to unvisited neighbours; record a path when it contains all `V` vertices. This is exponential, up to factorial search. For a DAG, longest path is easy: topologically order vertices, initialise distances, and relax outgoing edges in that order, giving `O(V+E)`.

#### WHY IT EXISTS
Hamiltonian path must make a global “visit everyone exactly once” choice, so local decisions may require exhaustive undo. A DAG has no cycles; topological order ensures all predecessors of a vertex are processed before it, turning longest path into dynamic programming.

#### MENTAL MODEL
Hamiltonian search tries every possible city itinerary without revisits and backtracks at dead ends. DAG longest path flows best distances forward through a one-way dependency map where no route loops back.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Hamiltonian: path + visited, choose unvisited neighbour, undo; exponential. DAG longest: topological sort + max relaxation, linear.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Start Hamiltonian search at every vertex unless start is specified. For DAG, use `-∞` for unreachable distances, set selected source to zero (or all sources for global variant), and store parents for reconstruction.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  In an undirected graph, reverse paths may be duplicate representations; define whether to deduplicate. Hamiltonian decision is NP-Complete; bitmask DP can solve existence/counting in `O(2^V V²)` but still exponential. General longest simple path is NP-Hard; DAG acyclicity is precisely what makes topological DP valid. Negative edge weights are fine in a DAG.

#### ALL VARIATIONS COVERED
- **Q226:** Backtrack across unvisited neighbours from each allowed start and record length-`V` paths; worst-case output/search is factorial/exponential. ⚠️ Define directedness and reverse-duplicate policy.
- **Q229:** Topologically sort the DAG and maximise `dist[v]` through each edge in order, `O(V+E)`. ⚠️ Do not apply it to a cyclic graph.

#### CONNECTIONS TO OTHER TOPICS
Backtracking, bitmask DP, TSP, NP-Completeness, topological sorting, shortest/longest DAG paths, critical-path scheduling, and parent reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
// DAG longest path from source
order = topologicalSort(graph)
dist[*] = -INF; dist[source] = 0
for u in order:
    if dist[u] == -INF: continue
    for (v,w) in graph[u]:
        if dist[u] + w > dist[v]:
            dist[v] = dist[u] + w
            parent[v] = u
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Contrast why one problem is exponential and the DAG version linear. State start/weight/direction assumptions. Avoid confusing Hamiltonian path (visits vertices once) with Euler path (uses edges once).

#### ONE-LINE SUMMARY
Hamiltonian paths require exponential no-revisit search generally; DAG acyclicity enables linear longest-path DP in topological order.

---

### FLOYD'S CYCLE-ENTRY ALGORITHM ⚡
**Covers questions: 227**

#### CORE CONCEPT (30 seconds)
Move `slow` one step and `fast` two until they meet; if fast reaches null, no cycle exists. After a meeting, reset one pointer to head and move both one step; their next meeting is the cycle start. Time is `O(n)` and space `O(1)`.

#### WHY IT EXISTS
Inside a cycle, relative speed forces a meeting. The distance equation at that meeting implies the distance from head to cycle entry equals, modulo the cycle length, the distance from meeting point to entry—so equal-speed pointers converge there.

#### MENTAL MODEL
A fast runner laps a slow runner on a loop. Then place one runner at the track entrance and make both walk equally; they meet at the loop's gate.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Detection phase at speeds 1/2; entry phase at speeds 1/1; guard `fast` and `fast.next`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Keep phases separate. A self-loop and cycle starting at head work naturally. Hash-set alternative is simpler but uses `O(n)` space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If distance to entry is `μ`, cycle length `λ`, and meeting occurs after `t`, then `2t-t` is a multiple of `λ`; hence advancing `μ` from head and meeting point lands at entry modulo `λ`. Cycle length can be measured by one full lap after meeting.

#### ALL VARIATIONS COVERED
- **Q227:** Detect with 1×/2× pointers, reset one to head after meeting, then advance equally to entry; `O(n)`/`O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Cycle detection, cycle length, duplicate-number problems, circular linked lists, pointer invariants, and finite-state cycle finding.

#### CODE / EXAMPLE (if applicable)
```text
slow=head; fast=head
while fast != null and fast.next != null:
    slow=slow.next; fast=fast.next.next
    if slow == fast:
        finder=head
        while finder != slow:
            finder=finder.next; slow=slow.next
        return finder
return null
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the two phases and at least the modular-distance intuition. Test head-entry and no-cycle cases. Avoid resetting both pointers or keeping fast at speed two during the entry phase.

#### ONE-LINE SUMMARY
Floyd first forces a meeting by relative speed, then equal-speed walks from head and meeting point converge at the cycle entry.

---

### MINIMUM IN A ROTATED SORTED ARRAY ⚡⚠️
**Covers questions: 228**

#### CORE CONCEPT (30 seconds)
For distinct values, binary-search against the right boundary. If `a[mid] > a[hi]`, the minimum lies strictly right of mid, so set `lo=mid+1`; otherwise the minimum is at mid or left, so set `hi=mid`. When `lo==hi`, that value is the minimum. Time `O(log n)`, space `O(1)`.

#### WHY IT EXISTS
Rotation creates two sorted runs and one drop. Comparing midpoint with the rightmost value reveals whether midpoint is in the high pre-rotation run or the low run containing the minimum.

#### MENTAL MODEL
Search for the valley where a rising sorted road wraps from its highest point back to its lowest; the right endpoint tells which slope midpoint belongs to.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `mid>hi` → right; otherwise keep mid and go left. Loop while `lo<hi`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Works for unrotated and single-element arrays. Do not set `hi=mid-1` in the else case because mid may be the minimum. Clarify nonempty input.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  With duplicates, `a[mid]==a[hi]` is ambiguous; decrement `hi` safely but worst case becomes `O(n)`. Minimum index equals rotation count under standard left-rotation interpretation.

#### ALL VARIATIONS COVERED
- **Q228:** Compare midpoint to right boundary and preserve midpoint on the low side; distinct-value time is `O(log n)`. ⚠️ Duplicates can destroy logarithmic elimination.

#### CONNECTIONS TO OTHER TOPICS
Rotated-array search, binary-search invariants, pivot/rotation count, duplicates, lower bounds, and circular arrays.

#### CODE / EXAMPLE (if applicable)
```text
lo=0; hi=n-1
while lo < hi:
    mid=lo+(hi-lo)/2
    if a[mid] > a[hi]: lo=mid+1
    else: hi=mid
return a[lo]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define why the minimum remains inside `[lo,hi]` after each update. Dry-run unrotated and one rotation. Avoid searching for a target or comparing only to the first element without a consistent invariant.

#### ONE-LINE SUMMARY
Compare mid with the right boundary to locate the rotation valley, keeping mid when it may already be the minimum.

---

### LRU CACHE FROM SCRATCH ⚡
**Covers questions: 230**

#### CORE CONCEPT (30 seconds)
Use a hash map from key to node for `O(1)` lookup and a doubly linked list for recency order. Keep most recently used near the head and least recently used near the tail. `get` moves the node to the head; `put` updates/moves or inserts at head, then removes tail when over capacity. All operations are `O(1)`.

#### WHY IT EXISTS
Lookup alone cannot identify the oldest access quickly, and an ordered list alone cannot find arbitrary keys quickly. Combining two structures gives both requirements while storing one shared node per entry.

#### MENTAL MODEL
A desk holds recently used files in front-to-back order, while an index tells where any file sits. Touching a file moves it to the front; overflow discards the file at the back.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Hash map + doubly linked list; head MRU, tail LRU; `O(1)` get/put/evict.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Sentinel head/tail eliminate edge-case branches. Helpers: remove node, insert after head, move to front, remove before tail. On eviction, remove from both list and map. Updating an existing key does not increase size.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Capacity zero should store nothing. Define whether failed get changes recency (normally no). Thread safety needs a lock or concurrency design around both structures as one invariant. Real caches also need expiry, weight-based capacity, callbacks, persistence, and policies such as LFU/ARC; LRU can perform poorly on scans.

#### ALL VARIATIONS COVERED
- **Q230:** Map keys to shared DLL nodes; move every hit/update to MRU head and evict LRU tail from both structures when capacity is exceeded.

#### CONNECTIONS TO OTHER TOPICS
Hash maps, doubly linked lists, cache eviction, page replacement, memoization, thread safety, TTL, LFU, and locality.

#### CODE / EXAMPLE (if applicable)
```text
get(key):
    if key not in map: return NOT_FOUND
    node=map[key]; moveToFront(node); return node.value

put(key,value):
    if capacity==0: return
    if key in map: update; moveToFront; return
    node=new Node(key,value); map[key]=node; addAfterHead(node)
    if map.size > capacity:
        victim=tail.prev; remove(victim); map.remove(victim.key)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the combined invariant, draw sentinels, and centralise pointer changes in helpers. Dry-run update and eviction. Avoid storing separate list values that can drift from map entries or forgetting map removal on eviction.

#### ONE-LINE SUMMARY
An LRU cache combines hash lookup with a doubly linked recency list so hits move to the front and overflow evicts the tail in `O(1)`.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q221 (fast Fibonacci)** connects to binary exponentiation, linear recurrences, and matrix DP.
- **Q222 and Q224 (DP)** prepare broader decoding, target-sum, knapsack, and minimum-cost problems.
- **Q223 (job sequencing)** connects to activity selection, DSU slot allocation, weighted scheduling, and deadline optimisation.
- **Q225 (rectangle)** prepares histogram stacks, next-smaller elements, and matrix-to-1D transformations.
- **Q226 and Q229 (paths)** connect to TSP/NP-Hardness, topological DP, and critical-path scheduling.
- **Q227–Q228 (pointer/binary search)** reinforce cycle-entry and rotated-array invariants.
- **Q230 (LRU)** connects directly to OS page replacement, cache/system design, and concurrent data structures.

### Be Comfortable With Before Batch 24 (Questions 231–240)

- Counting non-attacking rook placements.
- Tower of Hanoi recurrence and move count.
- Segmented sieve over `[L,R]`.
- Sparse-table RMQ preprocessing/query.
- Coverage-greedy coin/denomination logic.
- Perfect-number divisor summation.
- Circular maximum subarray (a repeat of Q208).
- Target-sum sign assignment DP.
- Minimum parentheses deletion/validation.
- Factorial-number-system kth permutation.

### Batch 23 Rapid Recall

221. Fibonacci matrix power by squaring gives `O(log n)`.
222. Decode DP adds valid one-digit and two-digit transitions.
223. Unit jobs: profit-descending, latest free deadline slot.
224. Minimum coins: `O(A·C)` amount DP.
225. Matrix rows become histograms solved by monotonic stack.
226. Hamiltonian paths use exponential no-revisit backtracking.
227. Floyd reset-and-equal-speed phase finds cycle entry.
228. Rotated minimum compares mid with right boundary.
229. DAG longest path relaxes in topological order.
230. LRU = hash map + doubly linked recency list.
