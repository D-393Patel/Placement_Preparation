# JTG Technical Interview Coaching — Batch 33

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 321–330

## Questions in This Batch

321. ⚡⚠️ Determine efficiently whether a number is prime.
322. ⚡ Implement the Sieve of Eratosthenes up to `n`.
323. ⚡ Serialize and deserialize a binary tree.
324. ⚡⚠️ Evaluate a mathematical expression supplied as a string.
325. ⚡ Implement topological sort with Kahn's algorithm.
326. ⚡⚠️ Find the maximum rectangle in a histogram.
327. ⚡⚠️ Find the minimum window substring.
328. ⚡⚠️ Check whether a number is a perfect square without `sqrt`.
329. ⚡ Count array inversions.
330. ⚡⚠️ Search efficiently in a sorted matrix.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Prime testing and bulk sieving | 321, 322 | One tests one number through its square root; the other marks composites for all numbers. |
| B | Tree encoding | 323 | This is the coding repeat of Q169's traversal-plus-null-marker protocol. |
| C | Expression parsing | 324 | Correct evaluation depends on tokens, precedence, associativity, parentheses, and unary operators. |
| D | Indegree-based DAG ordering | 325 | Kahn's queue repeatedly removes dependency-free vertices and detects cycles. |
| E | Monotonic-stack and frequency-window bounds | 326, 327 | Histogram rectangles discover maximal boundaries; minimum windows maintain required multiplicities. |
| F | Monotonic binary/staircase search | 328, 330 | Perfect-square and matrix order let each comparison eliminate a monotonic region. |
| G | Merge-sort counting | 329 | Cross-half inversions are counted exactly during merge. |

---

### PRIMALITY TESTING AND SIEVE OF ERATOSTHENES ⚡⚠️
**Covers questions: 321, 322**

#### CORE CONCEPT (30 seconds)
For one integer `n`, reject `<2`, handle 2, reject other evens, then test odd divisors through `d<=n/d`; any composite has a factor no larger than its square root. To list all primes up to `n`, mark 0/1 non-prime, then for every unmarked `p` through `sqrt(n)`, mark `p²,p²+p,...`. Sieve time is `O(n log log n)` and space `O(n)`.

#### WHY IT EXISTS
Factor pairs cross at `sqrt(n)`, bounding individual trial division. In a sieve, smaller primes already marked multiples below `p²`, so starting there avoids redundant work.

#### MENTAL MODEL
Primality searches only the smaller member of each factor pair. The sieve repeatedly crosses out every multiple of each surviving prime.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Single test `O(sqrt n)`; sieve `O(n log log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use `d<=n/d` and `p<=n/p` to avoid square overflow. Sieve begins marking at `p*p`; use a bitset/odd-only representation for memory improvements.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Trial division is fine for machine-sized interview input but not huge cryptographic integers; deterministic Miller–Rabin bases work for fixed-width ranges. Segmented sieve handles large `[L,R]` intervals. Allocation and `p*p` type width still require care.

#### ALL VARIATIONS COVERED
- **Q321:** Test divisors only through the square root, skipping evens after handling 2. ⚠️ Values 0 and 1 are not prime.
- **Q322:** Mark composites from each prime's square, leaving unmarked values ≥2. ⚠️ Start at `p²`, not `2p`, for the standard efficient sieve.

#### CONNECTIONS TO OTHER TOPICS
Prime factorisation, segmented sieve, perfect numbers, modular arithmetic, Miller–Rabin, bitsets, and square-root bounds.

#### CODE / EXAMPLE (if applicable)
```text
isPrime(n):
    if n<2: return false
    if n%2==0: return n==2
    for d=3; d<=n/d; d+=2:
        if n%d==0: return false
    return true
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the square-root proof and overflow-safe loop condition. For sieve, justify `p²` start. Test negative, 1, 2, square composites, and large primes.

#### ONE-LINE SUMMARY
Single primality stops at factor-pair crossover; the sieve bulk-marks multiples from each prime's square.

---

### TREE SERIALIZATION ROUND TRIP (MERGED WITH Q169) ⚡
**Covers questions: 323**

#### CORE CONCEPT (30 seconds)
Serialize with preorder plus explicit null markers and delimiters; deserialize by consuming the same token stream recursively. A null token returns null; otherwise create a node and decode left then right. Time/output are `O(n)` and recursion space `O(h)`.

#### WHY IT EXISTS
Traversal values alone do not uniquely preserve arbitrary tree shape. Null markers make the encoding unambiguous and round-trippable.

#### MENTAL MODEL
Write a blueprint in root-left-right order and place `#` wherever a child room is missing; the decoder follows it exactly.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Same traversal/grammar both directions; null markers; token iterator/index.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Handle empty tree, negative/multi-digit values, delimiters, and malformed-input policy. Avoid repeatedly removing the first token from an array if that is `O(n)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Arbitrary string values need escaping or length-prefix/binary encoding. Deep trees need iterative handling. Production formats need versioning and validation; BST-specific bounds may compress data but change assumptions.

#### ALL VARIATIONS COVERED
- **Q323:** Reuse Q169's preorder/null-marker protocol and implement a shared token cursor for exact round trips.

#### CONNECTIONS TO OTHER TOPICS
Q169, parsing, tree traversal, persistence, wire formats, BST encoding, and malformed-input validation.

#### CODE / EXAMPLE (if applicable)
```text
decode():
    token=tokens[index++]
    if token=="#": return null
    node=Node(parse(token))
    node.left=decode()
    node.right=decode()
    return node
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the grammar and explain null necessity. Test a one-sided tree. Avoid encodings that cannot distinguish different shapes with equal traversals.

#### ONE-LINE SUMMARY
Traversal order plus explicit nulls defines an unambiguous tree grammar that the decoder consumes once.

---

### MATHEMATICAL EXPRESSION EVALUATION ⚡⚠️
**Covers questions: 324**

#### CORE CONCEPT (30 seconds)
First define the grammar: supported numbers/operators, precedence, associativity, parentheses, whitespace, and unary signs. For `+−*/` and parentheses, tokenize multi-digit numbers, keep value/operator stacks (shunting-yard style), apply higher/equal-precedence left-associative operators before pushing a new one, and collapse until matching `(` or end.

#### WHY IT EXISTS
Text order is not evaluation order. A parser separates lexical tokens from precedence/nesting so evaluation is deterministic and malformed expressions can be rejected.

#### MENTAL MODEL
Operators wait in a priority pile; higher-priority or inner-parenthesis work is completed before lower-priority outside work.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Tokenise, respect precedence/parentheses, apply binary operators to top two values.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Handle unary `−` by grammar/context (start, after `(`, or after operator), not by blindly treating every minus as binary. Validate stack arity, matching parentheses, divide-by-zero, and trailing operators.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Exponentiation is usually right-associative, so equal-precedence popping differs. Recursive descent often yields clearer grammar: `expression→term`, `term→factor`, `factor→unary/primary`. Integer division semantics, decimals, functions, overflow, and security limits must be specified.

#### ALL VARIATIONS COVERED
- **Q324:** Define the expression language, then use shunting-yard/two stacks or recursive descent. ⚠️ Unary minus and associativity are where simplistic solutions fail.

#### CONNECTIONS TO OTHER TOPICS
Stacks, parsing, compilers, ASTs, postfix notation, recursive descent, precedence, and calculators.

#### CODE / EXAMPLE (if applicable)
```text
for each token:
    number -> values.push(number)
    '(' -> ops.push
    ')' -> apply until '('; remove '('
    binary op -> apply while top op has higher precedence
                 (or equal and new op is left-associative); push op
after tokens: apply remaining ops
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask for grammar before coding and separate tokenisation from evaluation. Dry-run `-2*(3+4)` and malformed input. Avoid character-by-character single-digit assumptions unless explicitly allowed.

#### ONE-LINE SUMMARY
Expression evaluation is parsing: tokenize, encode precedence/associativity/nesting, then apply operators under a declared grammar.

---

### KAHN'S TOPOLOGICAL SORT ⚡
**Covers questions: 325**

#### CORE CONCEPT (30 seconds)
Compute every vertex's indegree, enqueue all zero-indegree vertices, repeatedly remove one, append it to the order, decrement outgoing neighbours' indegrees, and enqueue newly zero neighbours. If the output contains fewer than `V` vertices, a directed cycle exists. Time `O(V+E)`, space `O(V)` beyond the graph.

#### WHY IT EXISTS
Zero-indegree vertices have no unmet prerequisites and are safe next choices. Removing them exposes new dependency-free vertices.

#### MENTAL MODEL
Finish any task with no remaining prerequisites, cross it off every dependent task's checklist, and repeat.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Indegree, zero queue, decrement edges, processed-count cycle check.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Include isolated vertices. Multiple valid orders are normal. A min-heap instead of queue gives lexicographically smallest available choice at `O((V+E)log V)`-style cost.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Kahn can detect uniqueness: if more than one zero-indegree choice exists at any step, order is not uniquely forced (under standard conditions). The residual vertices after failure participate in or depend on cycles; identifying exact cycles needs further analysis.

#### ALL VARIATIONS COVERED
- **Q325:** Queue indegree-zero vertices and require processed count `V`; otherwise report no topological order.

#### CONNECTIONS TO OTHER TOPICS
DAGs, dependency scheduling, directed-cycle detection, course schedules, build systems, and longest DAG paths.

#### CODE / EXAMPLE (if applicable)
```text
indegree=compute()
queue=all vertices with indegree 0
while queue not empty:
    u=queue.popFront(); order.add(u)
    for v in graph[u]:
        indegree[v]--
        if indegree[v]==0: queue.pushBack(v)
return order.size==V ? order : CYCLE
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why zero indegree is safe and how processed count detects cycles. Test disconnected DAGs. Avoid mutating reusable stored indegrees without documenting it.

#### ONE-LINE SUMMARY
Kahn repeatedly schedules zero-indegree vertices; leftover vertices prove a directed cycle.

---

### HISTOGRAM RECTANGLE AND MINIMUM WINDOW SUBSTRING ⚡⚠️
**Covers questions: 326, 327**

#### CORE CONCEPT (30 seconds)
Histogram: maintain increasing bar indices; when a lower bar arrives, pop height `h`, whose maximal width is from new stack top +1 to current index−1. Use sentinel index/height zero to flush. Minimum window: maintain required character multiplicities, expand right until all are satisfied, then shrink left while valid and record the shortest window. Both are linear.

#### WHY IT EXISTS
The first smaller bars determine each histogram height's maximal boundaries. In a minimum window, excess characters can be removed until the first required deficit appears.

#### MENTAL MODEL
Histogram stack keeps bars whose right boundary is unknown. Window carries a shopping list and tightens once every required item is inside.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Histogram monotonic stack `O(n)`. Window frequency map with multiplicity, `O(|S|+|T|)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Histogram width after pop is `i-stack.top−1`. Equal-height pop policy must be consistent. Window can track `missing=|T|`; decrement need on expansion and increment on shrink.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Each bar is pushed/popped once—amortized proof. Window must satisfy duplicate required chars (`AABC`), not just distinct set membership. Unicode/alphabet representation and deterministic tie choice may matter. If no window, return empty.

#### ALL VARIATIONS COVERED
- **Q326:** Pop bars when current is lower and calculate maximal width using the new stack top. ⚠️ Flush remaining bars with a sentinel.
- **Q327:** Expand until required multiplicities are met, then shrink to minimum. ⚠️ A set is insufficient when target repeats characters.

#### CONNECTIONS TO OTHER TOPICS
Monotonic stacks, maximal binary rectangle, sliding windows, frequency maps, next-smaller elements, and amortized analysis.

#### CODE / EXAMPLE (if applicable)
```text
need=count(T); missing=length(T); left=0
for right,c in S:
    if need[c]>0: missing--
    need[c]--
    while missing==0:
        update best [left,right]
        d=S[left++]; need[d]++
        if need[d]>0: missing++
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define what stack/window state guarantees. Dry-run histogram `[2,1,2]` and target with duplicates. Avoid recomputing min/max/frequencies from scratch for every interval.

#### ONE-LINE SUMMARY
Monotonic stacks discover maximal bar widths; a deficit-count window discovers the smallest substring satisfying all multiplicities.

---

### PERFECT-SQUARE AND SORTED-MATRIX SEARCH ⚡⚠️
**Covers questions: 328, 330**

#### CORE CONCEPT (30 seconds)
Perfect square: binary-search integer root `0..n`; compare `mid` with `n/mid` or use a widened product to avoid overflow. Matrix with every row and column ascending: start top-right; if value is too large move left, if too small move down, equality succeeds. Costs are `O(log n)` and `O(rows+cols)` respectively.

#### WHY IT EXISTS
`x²` is monotonic for non-negative `x`. At a top-right matrix cell, moving left decreases values and moving down increases them, so one full row/column region is eliminated each step.

#### MENTAL MODEL
Search a monotonic number line for the integer root. In the matrix, stand at a corner where one direction is smaller and the other larger.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Negative numbers are not integer squares; 0/1 are. Staircase search needs row-and-column sorting.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Avoid `mid*mid` overflow with wide type/division. Empty matrix handling. If matrix is globally row-major sorted (`last row value < next row first`), flattened binary search gives `O(log(RC))` instead.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Division comparison needs care at `mid=0`; special-case or start at 1 for `n>0`. Newton's integer method is another logarithmic-like approach. The phrase “sorted matrix” is ambiguous—row-only, row+column, and globally sorted matrices need different algorithms.

#### ALL VARIATIONS COVERED
- **Q328:** Binary-search an integer root with overflow-safe comparison. ⚠️ Negative false, 0 true.
- **Q330:** Under row/column ascending order, use top-right staircase search. ⚠️ Ask what “sorted” guarantees before choosing it.

#### CONNECTIONS TO OTHER TOPICS
Binary search, monotonic functions, integer roots, Newton iteration, 2D elimination, and flattened matrices.

#### CODE / EXAMPLE (if applicable)
```text
r=0; c=cols-1
while r<rows and c>=0:
    if M[r][c]==target: return true
    if M[r][c]>target: c--
    else: r++
return false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the monotonic guarantee and eliminate regions aloud. Test one row/column. Avoid multiplication overflow or applying flattened binary search without global row-major ordering.

#### ONE-LINE SUMMARY
Binary search monotonic squares; staircase-search a row/column-sorted matrix from a corner with opposite monotonic directions.

---

### INVERSION COUNTING WITH MERGE SORT ⚡
**Covers questions: 329**

#### CORE CONCEPT (30 seconds)
An inversion is a pair `i<j` with `a[i]>a[j]`. Recursively count inversions in each half, then during sorted merge, when right value is smaller than current left, it forms inversions with every remaining left value—add `mid−i`. Total time is `O(n log n)` and auxiliary space `O(n)`.

#### WHY IT EXISTS
Sorted halves let one comparison count many cross inversions at once; every remaining left element exceeds the chosen right value.

#### MENTAL MODEL
When a right-half runner overtakes the first remaining left-half runner, it also overtakes everyone queued behind that runner in sorted order.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Left inversions + right inversions + cross inversions during merge.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  On equality, take left first—equal pairs are not inversions. Use 64-bit count because maximum is `n(n−1)/2`. Reuse one merge buffer.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Fenwick tree plus coordinate compression is another `O(n log n)` method useful online/offline. Inversion count measures permutation disorder and minimum adjacent swaps for distinct permutation transformation.

#### ALL VARIATIONS COVERED
- **Q329:** Add remaining-left count whenever the merge selects a strictly smaller right value; use wide count and stable equality handling.

#### CONNECTIONS TO OTHER TOPICS
Merge sort, Fenwick trees, coordinate compression, adjacent swaps, Kendall tau, and divide-and-conquer counting.

#### CODE / EXAMPLE (if applicable)
```text
while i<mid and j<hi:
    if a[i]<=a[j]: temp.add(a[i++])
    else:
        temp.add(a[j++])
        inversions += mid-i
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why one right element contributes all remaining-left inversions. Test duplicates. Avoid an `O(n²)` nested pair scan.

#### ONE-LINE SUMMARY
Sorted half-merging counts an entire block of cross inversions whenever a right value precedes remaining left values.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q321–Q322 (primes)** connect to segmented sieves and factorisation.
- **Q323 (serialization)** repeats Q169 and prepares persistence/wire-format questions.
- **Q324 (expressions)** connects to stacks, parsers, and AST evaluation.
- **Q325 (Kahn)** reinforces DAG scheduling/cycle detection.
- **Q326–Q327 (boundaries/windows)** prepare maximal rectangles and substring constraints.
- **Q328/Q330 (monotonic search)** expand binary search into numeric and 2D spaces.
- **Q329 (inversions)** connects merge sort with Fenwick/order-statistic structures.

### Be Comfortable With Before Batch 34 (Questions 331–340)

- Positive-number product sliding windows.
- Rearranging strings with a max-heap.
- Longest palindromic subsequence DP.
- Minimum grid-path sum.
- Binary-tree nodes at distance `k` using parent links.
- Undirected connected components.
- Maximum pair XOR using a bit trie.
- Interleaving-string DP.
- Sorting a `k`-sorted array with a min-heap.
- Streaming kth-largest with a size-`k` min-heap.

### Batch 33 Rapid Recall

321. Primality tests factors only through `sqrt(n)`.
322. Sieve marks multiples from `p²`.
323. Tree round-trip uses traversal plus null markers.
324. Expression evaluation begins by defining a grammar.
325. Kahn repeatedly removes zero-indegree vertices.
326. Histogram pops reveal maximal widths.
327. Minimum window maintains all required multiplicities.
328. Perfect-square search needs overflow-safe comparison.
329. Merge counts all remaining-left inversions at once.
330. Row/column-sorted matrix uses corner staircase search.
