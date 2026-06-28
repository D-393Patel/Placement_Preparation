# JTG Technical Interview Coaching — Batch 31

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 301–310

## Questions in This Batch

301. ⚡⚠️ Find the median of two sorted arrays.
302. ⚡⚠️ Detect a cycle in a directed graph using DFS.
303. ⚡ Flatten a nested list/array.
304. ⚡ Generate all valid combinations of `n` pairs of parentheses.
305. ⚡⚠️ Find the next permutation of a number/sequence.
306. ⚡ Find the minimum number of coins for an amount.
307. ⚡ Compute edit distance between two strings.
308. ⚡⚠️ Find the maximum-product subarray.
309. ⚡ Find the longest common prefix of strings.
310. ⚡⚠️ Perform matrix multiplication.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Binary-search partitioning | 301 | Median is found by balancing left/right partitions without merging arrays. |
| B | Directed DFS state | 302 | A back edge to the active recursion path proves a directed cycle. |
| C | Recursive container traversal | 303 | Flattening recursively or iteratively expands nested containers while preserving order. |
| D | Lexicographic combinatorial generation | 304, 305 | Parentheses backtracking generates valid objects; next permutation advances one lexicographic step in place. |
| E | Dynamic programming | 306, 307, 308 | Coin count, edit distance, and product subarrays retain the minimum state needed from earlier choices. |
| F | Common-prefix scanning | 309 | This is the coding repeat of Q194. |
| G | Matrix dimension/index computation | 310 | Multiplication combines row/column dot products under strict shape compatibility. |

---

### MEDIAN OF TWO SORTED ARRAYS ⚡⚠️
**Covers questions: 301**

#### CORE CONCEPT (30 seconds)
Binary-search a partition in the shorter array. Choose `i` items from A and `j=(m+n+1)/2−i` from B for the combined left half. A valid partition satisfies `Aleft<=Bright` and `Bleft<=Aright`. For odd total, median is `max(Aleft,Bleft)`; for even, average that with `min(Aright,Bright)`. Time is `O(log min(m,n))` and space `O(1)`.

#### WHY IT EXISTS
The median only needs a balanced partition, not a fully merged array. Sorted order lets one partition comparison tell which direction to move.

#### MENTAL MODEL
Cut both sorted rulers so the left side contains half the total marks and every left mark is no larger than every right mark.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Search shorter array, balance counts, validate cross-boundaries, handle odd/even.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use `−∞/+∞` when a partition lies at an edge. If `Aleft>Bright`, move `i` left; otherwise if `Bleft>Aright`, move right. Require at least one element overall.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Average in a wider/floating type to prevent integer overflow/truncation. Duplicates are fine because inequalities are non-strict. A linear merge is `O(m+n)` and easier, but misses the intended logarithmic challenge.

#### ALL VARIATIONS COVERED
- **Q301:** Binary-search a valid cross-array half partition on the shorter input; return centre boundary/boundaries. ⚠️ Most bugs come from `j` calculation and empty-edge sentinels.

#### CONNECTIONS TO OTHER TOPICS
Binary-search invariants, order statistics, kth element in sorted arrays, lower bounds, selection, and sentinels.

#### CODE / EXAMPLE (if applicable)
```text
ensure A is shorter
lo=0; hi=m
while lo<=hi:
    i=(lo+hi)/2; j=(m+n+1)/2-i
    AL=(i==0?-INF:A[i-1]); AR=(i==m?INF:A[i])
    BL=(j==0?-INF:B[j-1]); BR=(j==n?INF:B[j])
    if AL<=BR and BL<=AR: return median from max(AL,BL), min(AR,BR)
    if AL>BR: hi=i-1
    else: lo=i+1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define partition sizes/invariant before code and dry-run one empty array plus unequal lengths. Avoid memorising inequalities without explaining which offending left value forces movement.

#### ONE-LINE SUMMARY
Balance a cross-array partition and binary-search until both left maxima are below both right minima.

---

### DIRECTED-CYCLE DETECTION WITH DFS ⚡⚠️
**Covers questions: 302**

#### CORE CONCEPT (30 seconds)
Colour every vertex white (unvisited), gray (active in current DFS path), or black (finished). DFS marks gray before exploring; an edge to gray is a back edge and proves a directed cycle. Mark black on return. Start DFS from every white vertex. Time `O(V+E)`, space `O(V)`.

#### WHY IT EXISTS
An edge to any visited vertex is not enough in a directed graph—it may point to an already completed branch. Only an edge back into the current unfinished ancestry closes a directed loop.

#### MENTAL MODEL
Gray folders are open on the current desk stack; referencing an open ancestor creates a loop. Black folders are completed and safe to reference.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Three colours/visited plus recursion-stack flag; gray-neighbour means cycle.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Process disconnected components. Self-loop is immediately cyclic. Propagate true up recursion and ensure black marking only after all outgoing edges.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Undirected cycle detection uses parent logic instead; do not mix it. Kahn's topological sort detects a directed cycle when processed count `<V`. Recursive DFS can overflow on deep graphs; iterative DFS needs explicit enter/exit state.

#### ALL VARIATIONS COVERED
- **Q302:** Use white/gray/black DFS and identify a cycle only on an edge to active gray. ⚠️ A black neighbour does not prove a cycle.

#### CONNECTIONS TO OTHER TOPICS
Topological sorting, DAGs, back edges, SCCs, recursion stacks, and dependency graphs.

#### CODE / EXAMPLE (if applicable)
```text
dfs(u):
    color[u]=GRAY
    for v in graph[u]:
        if color[v]==GRAY: return true
        if color[v]==WHITE and dfs(v): return true
    color[u]=BLACK
    return false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain active versus completed state and scan all components. Test cross edges and self-loops. Avoid using only one boolean visited array without a recursion-path marker.

#### ONE-LINE SUMMARY
A directed cycle exists exactly when DFS finds an edge back to a currently active gray ancestor.

---

### FLATTENING NESTED LISTS/ARRAYS ⚡
**Covers questions: 303**

#### CORE CONCEPT (30 seconds)
Traverse elements in order: if an element is atomic, append it; if it is a nested list/array, recursively traverse it. An iterative version pushes nested elements onto a stack in reverse order so popping preserves left-to-right output. Time is `O(total containers+atoms)` and space is nesting depth/output.

#### WHY IT EXISTS
A nested container is a recursive structure; the same operation applies at every depth. Flattening is preorder traversal of that structure while emitting only leaves.

#### MENTAL MODEL
Open boxes from left to right; if a box contains smaller boxes, open those before moving to the next outer item.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Recursive type check, preserve order, append atomic leaves.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify what counts as nested—strings are often atomic despite being iterable. Handle nulls according to contract. A generator/lazy iterator avoids storing the whole flattened result.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Arbitrary object graphs may contain cycles/shared references; ordinary nested arrays are assumed acyclic. Deep nesting can overflow recursion, favouring an explicit iterator stack. Depth-limited flattening requires carrying current depth.

#### ALL VARIATIONS COVERED
- **Q303:** Recursively/iteratively traverse nested containers and emit leaves in order; define atomic types, nulls, and depth behavior.

#### CONNECTIONS TO OTHER TOPICS
Tree traversal, iterators/generators, recursion, JSON processing, cycle detection, and lazy evaluation.

#### CODE / EXAMPLE (if applicable)
```text
flatten(item,result):
    if item is list/array:
        for child in item: flatten(child,result)
    else:
        result.append(item)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify input type contract and preserve order. Mention iterative fallback for depth. Avoid accidentally flattening strings into characters unless requested.

#### ONE-LINE SUMMARY
Flattening is recursive preorder over nested containers, emitting atomic leaves in original order.

---

### VALID PARENTHESES GENERATION AND NEXT PERMUTATION ⚡⚠️
**Covers questions: 304, 305**

#### CORE CONCEPT (30 seconds)
Generate parentheses by tracking opens/closes used: add `'('` while `open<n`, add `')'` only while `close<open`; record length `2n`. For next lexicographic permutation, find the rightmost index `i` with `a[i]<a[i+1]`, swap it with the rightmost value greater than `a[i]`, then reverse the suffix. If no pivot exists, reverse the whole sequence to the first permutation.

#### WHY IT EXISTS
Parentheses constraints prune invalid prefixes before generation. Next permutation changes the smallest possible suffix: increase the rightmost improvable position by the smallest amount, then minimise everything after it.

#### MENTAL MODEL
Parentheses never allow more closes than opens. Next permutation finds the longest descending tail, nudges the preceding digit upward, then sorts the tail minimally by reversing it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Parentheses backtracking outputs Catalan `C_n` strings. Next permutation is pivot, successor, reverse suffix; `O(n)`/`O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Parentheses path restoration is required. For next permutation, successor is rightmost `>pivot` because suffix is non-increasing; reversing makes it ascending. Duplicates are handled by strict comparison.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Parentheses generation complexity is output-sensitive `Θ(C_n·n)`. If Q305 means a numeric type, operate on digits then handle overflow/leading-zero rules; as a sequence algorithm, it is generic. All-descending input wraps to lowest permutation.

#### ALL VARIATIONS COVERED
- **Q304:** Backtrack only valid prefixes using `open<n` and `close<open`; no post-filtering needed.
- **Q305:** Find rightmost ascent pivot, swap with rightmost greater suffix value, reverse suffix. ⚠️ If no pivot, reverse all.

#### CONNECTIONS TO OTHER TOPICS
Catalan numbers, backtracking pruning, lexicographic order, permutations, factorial ranking, and in-place array reversal.

#### CODE / EXAMPLE (if applicable)
```text
nextPermutation(a):
    i=n-2
    while i>=0 and a[i]>=a[i+1]: i--
    if i>=0:
        j=n-1
        while a[j]<=a[i]: j--
        swap(a[i],a[j])
    reverse(a,i+1,n-1)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State prefix validity and lexicographic-minimal-change proof. Dry-run duplicates and descending input. Avoid sorting the suffix (`O(n log n)`) when it is already non-increasing and can be reversed.

#### ONE-LINE SUMMARY
Generate parentheses by never letting closes overtake opens; get next permutation by pivot, smallest greater successor, and suffix reversal.

---

### COIN CHANGE, EDIT DISTANCE, AND MAXIMUM PRODUCT DP ⚡⚠️
**Covers questions: 306, 307, 308**

#### CORE CONCEPT (30 seconds)
Minimum coins repeats Q224: `dp[0]=0`, `dp[a]=1+min(dp[a−coin])`. Edit distance uses `dp[i][j]` for prefixes: matching final characters copy diagonal; otherwise one plus min(delete, insert, replace). Maximum-product subarray tracks both maximum and minimum products ending here because multiplying by a negative swaps their roles.

#### WHY IT EXISTS
Each problem compresses exponentially many histories into sufficient state: remaining amount, two prefix lengths, or product extremes ending at one index.

#### MENTAL MODEL
Coin DP chooses the final coin; edit distance chooses the final alignment operation; product DP carries both the best and worst multiplier because a future negative may flip them.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Coins `O(amount·coins)`. Edit `O(mn)`. Product `O(n)` time/`O(1)` state.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Coins use infinity/unreachable and positive denominations. Edit bases `dp[i][0]=i`, `dp[0][j]=j`; reduce to two/one rows carefully. Product captures prior max/min before updating and initializes from first value.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Coin count versus ways differs. Weighted edit costs alter transition; transposition requires Damerau–Levenshtein. Product zeros restart naturally; fixed-width multiplication can overflow. Track indices by remembering restart positions for max/min candidates.

#### ALL VARIATIONS COVERED
- **Q306:** Reuse Q224's unbounded minimum-coin DP and return impossible when target remains infinity.
- **Q307:** Prefix-pair DP chooses insert/delete/replace and copies diagonal on match.
- **Q308:** Track ending max and min; a negative value can turn the previous minimum into the new maximum. ⚠️ Max-only Kadane logic fails.

#### CONNECTIONS TO OTHER TOPICS
Unbounded knapsack, sequence alignment, LCS, spell checking, Kadane, sign changes, state compression, and overflow.

#### CODE / EXAMPLE (if applicable)
```text
maxProduct(a):
    curMax=curMin=answer=a[0]
    for x in a[1..]:
        if x<0: swap(curMax,curMin)
        curMax=max(x,curMax*x)
        curMin=min(x,curMin*x)
        answer=max(answer,curMax)
    return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define each state before recurrence and test zeros/negatives/empty contracts. For edit distance, explain operation orientation. Avoid reusing stale updated max when computing min.

#### ONE-LINE SUMMARY
Coins minimise over final choices, edit distance minimises prefix operations, and product DP preserves both sign-sensitive extremes.

---

### LONGEST COMMON PREFIX (MERGED WITH Q194) ⚡
**Covers questions: 309**

#### CORE CONCEPT (30 seconds)
This repeats Q194: scan character columns up to the shortest string and stop at the first mismatch. Worst time is `O(total inspected characters)` and extra space is `O(1)` besides the returned prefix.

#### WHY IT EXISTS
The shared prefix can only shrink; aligned scanning finds its exact first invalid position.

#### MENTAL MODEL
Line every word up at the left edge and scan columns until one differs or ends.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Handle empty list/string and scan to shortest length.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Avoid repeated substring allocation while shrinking. Sort-first/last and trie are alternatives for other workloads.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Case/Unicode normalisation and grapheme semantics may matter. Repeated prefix queries can justify a trie; a single query usually does not.

#### ALL VARIATIONS COVERED
- **Q309:** Reuse Q194's vertical scan; return empty on no shared prefix or empty input according to contract.

#### CONNECTIONS TO OTHER TOPICS
Q194, tries, lexicographic sorting, autocomplete, and string normalization.

#### CODE / EXAMPLE (if applicable)
```text
for i in 0..shortestLength-1:
    expected=strings[0][i]
    for s in strings:
        if s[i]!=expected: return strings[0][0:i]
return shortestString
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Recognise the repeat and code the simplest robust method. Avoid overengineering a trie for a one-shot list.

#### ONE-LINE SUMMARY
The common prefix ends at the first mismatched aligned character across the strings.

---

### MATRIX MULTIPLICATION ⚡⚠️
**Covers questions: 310**

#### CORE CONCEPT (30 seconds)
Matrices `A` of shape `m×p` and `B` of shape `p×n` multiply to `C` of shape `m×n`, where `C[i][j]=Σ A[i][k]·B[k][j]` over `k=0..p−1`. Standard dense multiplication takes `O(mpn)` time and `O(mn)` output space.

#### WHY IT EXISTS
Each output entry is the dot product of one row from A and one column from B. The shared inner dimension represents compatible coordinates.

#### MENTAL MODEL
Every result cell pairs one row with one column, multiplies aligned entries, and sums them.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Require `A.columns==B.rows`; triple loops; result dimensions outer sizes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Validate rectangular matrices/empty contract. Loop order `i-k-j` can improve cache reuse of `A[i][k]` and B rows. Use wide accumulation type.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Sparse matrices should iterate nonzeros; blocked/tiled multiplication improves cache; parallel/vectorised libraries outperform naive code. Strassen improves asymptotic square complexity but has constants/stability trade-offs. Integer overflow and floating-point error matter.

#### ALL VARIATIONS COVERED
- **Q310:** Validate compatible dimensions and compute row-column dot products. ⚠️ Result shape is `A.rows × B.columns`, not either input shape generally.

#### CONNECTIONS TO OTHER TOPICS
Linear algebra, matrix exponentiation, dynamic programming, cache locality, sparse matrices, SIMD/parallelism, and Strassen.

#### CODE / EXAMPLE (if applicable)
```text
C[m][n]=0
for i in 0..m-1:
    for k in 0..p-1:
        for j in 0..n-1:
            C[i][j]+=A[i][k]*B[k][j]
return C
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State shapes before loops and check compatibility. Explain every loop index. Test non-square inputs. Avoid silently assuming square matrices.

#### ONE-LINE SUMMARY
Matrix multiplication computes every row-column dot product when the inner dimensions match, in `O(mpn)` dense time.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q301 (median partition)** connects to kth order statistics and binary-search partition design.
- **Q302 (directed cycles)** prepares topological sorting, dependency validation, and SCCs.
- **Q303 (flattening)** connects to iterators, JSON trees, and recursion-depth handling.
- **Q304/Q305 (generation/order)** connect to Catalan objects, permutations, and ranking.
- **Q306–Q308 (DP)** reinforce coin, edit/alignment, and sign-sensitive contiguous states.
- **Q309 (prefix)** repeats Q194 and supports trie/string scanning.
- **Q310 (matrices)** prepares matrix rotation, exponentiation, and numerical coding.

### Be Comfortable With Before Batch 32 (Questions 311–320)

- Spiral matrix boundaries and duplicate-row/column guards.
- Two-step climbing recurrence.
- Nth node from end using a fixed pointer gap.
- Bipartite BFS/DFS colouring.
- 0/1 knapsack descending-capacity DP.
- Iterative tree-depth BFS/DFS.
- In-place duplicate-detection assumptions.
- Three-reversal array rotation.
- GCD/LCM overflow/sign handling.
- Distinct-substring counting with a suffix trie.

### Batch 31 Rapid Recall

301. Median uses balanced cross-array partitions.
302. Directed DFS detects edges to gray active vertices.
303. Nested flattening recursively emits atomic leaves.
304. Valid parentheses maintain `close<=open<=n`.
305. Next permutation = pivot, successor, reverse suffix.
306. Minimum coins repeats unbounded amount DP.
307. Edit distance uses insert/delete/replace prefix DP.
308. Maximum product tracks both ending max and min.
309. LCP repeats vertical scanning from Q194.
310. Matrix multiplication requires compatible inner dimensions.
