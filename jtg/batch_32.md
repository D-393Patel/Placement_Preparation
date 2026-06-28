# JTG Technical Interview Coaching — Batch 32

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 311–320

## Questions in This Batch

311. ⚡⚠️ Traverse a 2D matrix in spiral order.
312. ⚡ Count ways to climb `n` stairs using steps of 1 or 2.
313. ⚡⚠️ Return the nth node from the end of a linked list.
314. ⚡ Check whether a graph is bipartite.
315. ⚡⚠️ Solve 0/1 knapsack using DP.
316. ⚡ Find binary-tree maximum depth iteratively.
317. ⚡⚠️ Find duplicate array values without extra space.
318. ⚡ Rotate an array `k` positions right.
319. ⚡⚠️ Compute GCD and LCM.
320. ⚡⚠️ Count distinct substrings using a trie.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Matrix boundary traversal | 311 | Four shrinking boundaries generate each spiral layer exactly once. |
| B | Linear/0-1 dynamic programming | 312, 315 | Stair counting reuses previous counts; knapsack reuses capacities while enforcing one use per item. |
| C | Fixed-gap linked-list pointers | 313 | A maintained pointer gap converts end-relative indexing into one forward pass. |
| D | Iterative graph/tree traversal | 314, 316 | Bipartite colouring and depth computation both use explicit BFS/DFS state. |
| E | In-place array representation | 317, 318 | Duplicate marking and rotation exploit mutable array storage without an auxiliary collection. |
| F | Euclidean arithmetic | 319 | GCD drives an overflow-aware LCM formula. |
| G | Suffix-trie substring enumeration | 320 | Every newly created suffix-trie node corresponds to one distinct substring. |

---

### SPIRAL MATRIX TRAVERSAL ⚡⚠️
**Covers questions: 311**

#### CORE CONCEPT (30 seconds)
Maintain `top`, `bottom`, `left`, and `right` boundaries. Traverse top row left→right, right column top→bottom, then—only if rows remain—bottom row right→left, and—only if columns remain—left column bottom→top. Shrink after each side. Every cell is emitted once: `O(RC)` time and `O(1)` auxiliary space besides output.

#### WHY IT EXISTS
A spiral is a sequence of rectangular perimeter layers. Boundaries represent the unvisited rectangle and prevent needing a visited matrix.

#### MENTAL MODEL
Peel the matrix like an onion: walk the outer rim clockwise, tighten all four walls, and repeat.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Four boundaries, four directional loops, shrink inward.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Guard bottom/left traversals after shrinking to avoid duplicate cells in a single remaining row/column. Handle empty matrix and non-square dimensions.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Jagged matrices break rectangular boundary assumptions. Counter-clockwise/different starting corner changes direction order. A generator can stream output without retaining result, but asymptotic traversal remains linear.

#### ALL VARIATIONS COVERED
- **Q311:** Traverse and shrink the four unvisited bounds, guarding the reverse sides. ⚠️ Single-row/column matrices expose duplicate-visit bugs.

#### CONNECTIONS TO OTHER TOPICS
Matrix rotation, layer traversal, boundary invariants, image processing, and iterator design.

#### CODE / EXAMPLE (if applicable)
```text
while top<=bottom and left<=right:
    for c=left..right: output M[top][c]
    top++
    for r=top..bottom: output M[r][right]
    right--
    if top<=bottom:
        for c=right downTo left: output M[bottom][c]
        bottom--
    if left<=right:
        for r=bottom downTo top: output M[r][left]
        left++
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the unvisited-rectangle invariant and test `1×N`, `N×1`, and rectangular matrices. Avoid using a visited grid for a deterministic boundary walk.

#### ONE-LINE SUMMARY
Walk each shrinking rectangle perimeter clockwise, guarding collapsed rows/columns so every cell appears once.

---

### CLIMBING STAIRS AND 0/1 KNAPSACK DP ⚡⚠️
**Covers questions: 312, 315**

#### CORE CONCEPT (30 seconds)
Stairs: ways to reach `i` equal ways ending with a 1-step plus a 2-step, so `dp[i]=dp[i−1]+dp[i−2]`, with `dp[0]=1`, and rolling `O(1)` space. 0/1 knapsack: for each item `(weight,value)`, update capacity downward: `dp[c]=max(dp[c],value+dp[c−weight])`; downward order prevents reusing the current item. Time `O(items·capacity)`.

#### WHY IT EXISTS
Both classify solutions by the final choice. Stair states need only two prior counts. Knapsack compresses the item dimension, but iteration direction must preserve previous-item states.

#### MENTAL MODEL
The last stair move came from one or two steps below. Knapsack considers each item once and updates the backpack from large capacity downward so the item cannot see its own new result.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stairs is Fibonacci-style. Knapsack include/exclude, `O(nW)` time/`O(W)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State base conventions for `n=0`. Validate non-negative capacity/weights; zero-weight positive-value items need careful one-use handling. Use 2D/parent decisions to reconstruct selected items.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Knapsack complexity is pseudo-polynomial in numeric capacity. Ascending capacity changes it to unbounded knapsack. Value-based DP or meet-in-the-middle fits different constraints. Stair counts overflow quickly and may need modulo/big integers.

#### ALL VARIATIONS COVERED
- **Q312:** Use Fibonacci recurrence with `dp[0]=dp[1]=1` under the standard empty-way convention.
- **Q315:** Use descending capacity for each item to enforce 0/1 usage. ⚠️ Ascending capacity silently solves a different problem.

#### CONNECTIONS TO OTHER TOPICS
Fibonacci, coin change, subset sum, equal partition, unbounded knapsack, state compression, and pseudo-polynomial complexity.

#### CODE / EXAMPLE (if applicable)
```text
dp[0..W]=0
for each item (w,v):
    for c from W down to w:
        dp[c]=max(dp[c],v+dp[c-w])
return dp[W]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the state and explain iteration direction. Dry-run one item to prove no reuse. Avoid presenting `O(nW)` as polynomial in input bit length without qualification.

#### ONE-LINE SUMMARY
Stairs sums the previous two counts; 0/1 knapsack scans capacities backward so each item contributes at most once.

---

### NTH NODE FROM THE END ⚡⚠️
**Covers questions: 313**

#### CORE CONCEPT (30 seconds)
Assuming `n` is one-indexed, advance `fast` exactly `n` nodes. If that is impossible, `n` exceeds length. Set `slow=head`; move both until `fast` becomes null. The maintained gap is `n`, so `slow` is the nth node from the end. Time `O(length)`, space `O(1)`.

#### WHY IT EXISTS
The gap transforms “distance from unknown end” into a fixed separation that can be maintained in one forward pass.

#### MENTAL MODEL
Two walkers stay `n` steps apart; when the front walker exits the path, the rear walker is exactly `n` positions from the exit.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Fast gap, then tandem movement. `n=1` returns tail.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Reject `n<=0`, empty list, and `n>length` according to API contract. To delete nth from end, use a dummy and appropriate gap.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The method assumes an acyclic list; cycles have no well-defined end. Returning a node versus value changes API, not algorithm. One-pass requirement makes length-then-index less suitable though still linear.

#### ALL VARIATIONS COVERED
- **Q313:** Create an `n`-node lead, then move both pointers to the end. ⚠️ Clarify one-based `n` and invalid-length behavior.

#### CONNECTIONS TO OTHER TOPICS
Two pointers, fixed gaps, list deletion, cycle assumptions, middle node, and streaming order statistics.

#### CODE / EXAMPLE (if applicable)
```text
fast=head
repeat n times:
    if fast==null: error
    fast=fast.next
slow=head
while fast!=null:
    fast=fast.next; slow=slow.next
return slow
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the gap invariant and test `n=1`, `n=length`, and invalid `n`. Avoid off-by-one pointer advancement.

#### ONE-LINE SUMMARY
Keep fast `n` nodes ahead; when fast reaches null, slow is the one-indexed nth node from the end.

---

### BIPARTITE CHECK AND ITERATIVE TREE DEPTH ⚡
**Covers questions: 314, 316**

#### CORE CONCEPT (30 seconds)
Bipartite: colour every graph component with two colours using BFS/DFS; assign opposite colour to uncoloured neighbours and reject any same-colour edge. Tree depth iteratively: BFS by levels and increment depth once per queue-size batch, or DFS with `(node,depth)` pairs and track maximum. Both are explicit traversal-state problems.

#### WHY IT EXISTS
Two-colouring encodes the bipartite constraint locally and detects odd-cycle contradictions. Iterative depth replaces call-stack state with a queue/stack to avoid recursion limits.

#### MENTAL MODEL
Bipartite seats neighbours on opposite sides. Level BFS walks a building one floor at a time and counts floors.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Bipartite `O(V+E)` over all components. Tree max depth BFS `O(n)` and `O(maxWidth)` queue.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A self-loop immediately fails bipartite. Empty tree depth is zero. Mark/colour when enqueued to avoid duplicates.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Bipartite iff no odd cycle. Directed graphs require clarification—often colour the underlying undirected graph. DFS depth stack uses `O(h)` to `O(n)` explicit storage; BFS uses width. Iterative traversal avoids language call-stack overflow but not memory bounds.

#### ALL VARIATIONS COVERED
- **Q314:** Two-colour every disconnected component and reject same-colour neighbours/self-loops.
- **Q316:** Count BFS levels or track explicit DFS depths; return zero for null root.

#### CONNECTIONS TO OTHER TOPICS
Odd cycles, graph colouring, BFS/DFS, level order, recursion limits, maximum width, and components.

#### CODE / EXAMPLE (if applicable)
```text
depth=0; queue=[root]
while queue not empty:
    levelSize=queue.size
    repeat levelSize times:
        node=queue.popFront()
        enqueue non-null children
    depth++
return depth
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State what queue entries/colours mean and handle disconnected graphs/empty tree. Avoid checking only the component containing vertex zero.

#### ONE-LINE SUMMARY
Explicit BFS/DFS state colours every graph component and counts every tree level without recursion.

---

### IN-PLACE DUPLICATE DETECTION AND ARRAY ROTATION ⚡⚠️
**Covers questions: 317, 318**

#### CORE CONCEPT (30 seconds)
Duplicate detection without extra space depends on constraints. Universally, sort in place and scan adjacent equal values (`O(n log n)` time). If values are guaranteed in `1..n` and suitable multiplicities, use index sign marking/cyclic placement for `O(n)` time. Rotate right by `k`: normalise `k%=n`, reverse the whole array, then reverse `[0,k)` and `[k,n)`, giving `O(n)` time/`O(1)` space.

#### WHY IT EXISTS
The array itself can encode state only when values map safely to indices; otherwise sorting creates duplicate adjacency. Three reversals preserve internal order while moving the suffix block before the prefix.

#### MENTAL MODEL
Duplicates either stand together after sorting or mark their numbered home seats. Rotation cuts the last `k` cards and moves them front through three flips.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  In-place sort+scan is constraint-agnostic. Three-reversal rotation; handle empty array.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Sign marking: at value `x`, inspect index `abs(x)-1`; already negative means repeat, else negate. Requires positive bounded values and mutates input. Normalise negative rotations if supported as `((k%n)+n)%n`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If a value appears more than twice, naive sign marking reports it repeatedly unless output semantics allow. Zero/negative/out-of-range values break indexing. Floyd finds one duplicate under `n+1`/`1..n` constraints without mutation. In-place sort's auxiliary space depends on sorting algorithm/runtime stack.

#### ALL VARIATIONS COVERED
- **Q317:** State constraints before choosing sign/cyclic marking; otherwise in-place sort+adjacent scan is the robust no-extra-collection solution. ⚠️ Plural unique duplicates need multiplicity rules.
- **Q318:** Reverse all, then first `k`, then the remainder after normalising `k`; `O(n)`/`O(1)`.

#### CONNECTIONS TO OTHER TOPICS
Cyclic sort, in-place hashing, Floyd duplicate detection, array reversal, modular indices, and mutation contracts.

#### CODE / EXAMPLE (if applicable)
```text
rotateRight(a,k):
    if a.length==0: return
    k=((k%a.length)+a.length)%a.length
    reverse(a,0,n-1)
    reverse(a,0,k-1)
    reverse(a,k,n-1)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Challenge missing duplicate constraints and name mutation. For rotation, dry-run `k=0`, `k>n`, and empty input. Avoid allocating a second array when `O(1)` is intended.

#### ONE-LINE SUMMARY
Duplicate detection needs value-range assumptions to reuse indices; right rotation is a constraint-free three-reversal block move.

---

### GCD AND LCM ⚡⚠️
**Covers questions: 319**

#### CORE CONCEPT (30 seconds)
Euclid's algorithm repeatedly replaces `(a,b)` with `(b,a mod b)` until `b=0`; the remaining absolute value is `gcd(a,b)`. For nonzero inputs, `lcm(a,b)=abs((a/gcd)·b)`. Divide before multiplying to reduce overflow. If either input is zero, LCM is usually defined as zero.

#### WHY IT EXISTS
Any common divisor of `a,b` also divides `a mod b`, so replacing the larger pair preserves the GCD while shrinking values quickly. The product identity connects GCD and LCM.

#### MENTAL MODEL
Repeatedly remove complete multiples; the final nonzero remainder is the largest tile size fitting both lengths.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Euclid `O(log min(|a|,|b|))`; LCM product relation.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Normalise signs and define `gcd(0,0)` convention (commonly 0 in APIs). Use wide/checked multiplication. Handle language modulo behavior for negatives.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  `abs(MIN_INT)` overflows in fixed-width signed arithmetic, so widen first. Extended Euclid also returns coefficients/inverses. Binary GCD replaces division with shifts/subtraction.

#### ALL VARIATIONS COVERED
- **Q319:** Use Euclid and compute LCM by divide-before-multiply with zero/sign/overflow handling. ⚠️ Direct `a*b/gcd` can overflow first.

#### CONNECTIONS TO OTHER TOPICS
Modular arithmetic, fractions, Bézout identity, modular inverses, jug feasibility, period alignment, and binary GCD.

#### CODE / EXAMPLE (if applicable)
```text
gcd(a,b):
    a=abs(wide(a)); b=abs(wide(b))
    while b!=0: (a,b)=(b,a%b)
    return a

lcm(a,b):
    if a==0 or b==0: return 0
    return abs((wide(a)/gcd(a,b))*wide(b))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain remainder invariance and overflow-safe operation order. Test zeros/negatives. Avoid recursive code that ignores negative modulo or minimum-integer absolute value.

#### ONE-LINE SUMMARY
Euclid shrinks by remainders to find GCD; divide by GCD before multiplying to compute LCM safely.

---

### DISTINCT SUBSTRINGS WITH A TRIE ⚡⚠️
**Covers questions: 320**

#### CORE CONCEPT (30 seconds)
Insert every suffix `s[i..]` into a trie. Every newly created trie node represents one substring not seen before, because its root-to-node path is that substring. The number of new nodes is the number of distinct non-empty substrings. Straight suffix-trie construction costs `O(n²)` time and space worst case.

#### WHY IT EXISTS
Every substring is a prefix of some suffix. The trie shares equal substring prefixes, so one node corresponds to one unique string value.

#### MENTAL MODEL
Start reading from every string position and grow shared letter paths; each brand-new branch endpoint is a new substring.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Insert all suffixes, increment count on node creation; add one only if empty substring is included.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  No end markers are needed merely for count. Use map/array children according to alphabet. Empty input yields zero non-empty substrings.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A suffix trie is quadratic memory and unsuitable for large `n`. Suffix automaton counts distinct substrings in `O(n)` using `sum(len[state]-len[link[state]])`; suffix array/LCP gives `n(n+1)/2−sum(LCP)`. Unicode normalization still affects character identity.

#### ALL VARIATIONS COVERED
- **Q320:** Insert all suffixes and count newly created trie nodes. ⚠️ Complexity is `O(n²)`, not `O(n)`, despite trie operations being linear in each suffix length.

#### CONNECTIONS TO OTHER TOPICS
Suffix tries/trees, suffix automata, suffix arrays, LCP, substring search, and combinatorial counting.

#### CODE / EXAMPLE (if applicable)
```text
root=Node(); distinct=0
for i in 0..n-1:
    node=root
    for j in i..n-1:
        if s[j] not in node.children:
            node.children[s[j]]=Node(); distinct++
        node=node.children[s[j]]
return distinct
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove substring-as-prefix-of-suffix and node-as-unique-path. State quadratic cost and mention scalable alternatives. Avoid counting terminal markers or duplicate paths.

#### ONE-LINE SUMMARY
Every substring is a suffix prefix, and every new suffix-trie node is one new non-empty substring.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q311 (spiral)** connects to matrix layers/rotation and boundary simulations.
- **Q312/Q315 (DP)** reinforce Fibonacci and 0/1 subset/knapsack iteration.
- **Q313 (linked list)** connects to pointer gaps, deletion, and list length.
- **Q314/Q316 (traversal)** connect graph colouring and iterative tree BFS.
- **Q317/Q318 (in-place arrays)** prepare cyclic placement and reversal techniques.
- **Q319 (GCD/LCM)** supports modular arithmetic and number-theory code.
- **Q320 (substring trie)** prepares suffix structures and distinct-string counting.

### Be Comfortable With Before Batch 33 (Questions 321–330)

- Efficient primality testing through `sqrt(n)`.
- Sieve of Eratosthenes.
- Binary-tree serialization round trips.
- Expression parsing/evaluation with precedence.
- Kahn's topological sort.
- Largest histogram rectangle with monotonic stack.
- Minimum-window substring with required frequencies.
- Perfect-square binary search.
- Merge-sort inversion counting.
- Staircase search in a row/column-sorted matrix.

### Batch 32 Rapid Recall

311. Spiral uses four shrinking boundaries with collapse guards.
312. Two-step stairs use Fibonacci-style counting.
313. Fast pointer stays `n` nodes ahead.
314. Bipartite means two-colour every component.
315. 0/1 knapsack iterates capacity downward.
316. Iterative depth counts BFS levels or explicit DFS depth.
317. In-place duplicate method depends on value/multiplicity constraints.
318. Right rotation uses three reversals.
319. Euclid finds GCD; divide first for LCM.
320. Distinct substrings equal new suffix-trie nodes.
