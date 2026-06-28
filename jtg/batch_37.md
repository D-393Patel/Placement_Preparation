# JTG Technical Interview Coaching — Batch 37

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 361–370

## Questions in This Batch

361. ⚡⚠️ Find the smallest rectangle enclosing all black pixels in a binary matrix.
362. ⚡ Find the maximum number of non-overlapping intervals.
363. ⚡⚠️ Count valid parenthesis strings of length `n`.
364. ⚡ Implement `strStr()` using KMP substring matching.
365. ⚡⚠️ Count smaller numbers appearing after every array element.
366. ⚡ Count the ways a robot can traverse a maze containing walls.
367. ⚡⚠️ Find the minimum cost to cut a rope at specified positions.
368. Find the nth row of Pascal's triangle.
369. ⚡⚠️ Find the largest BST subtree inside a binary tree.
370. ⚡⚠️ Find the maximum adjacent gap after sorting an array.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Matrix boundary discovery | 361 | The answer is determined by the extreme rows and columns containing black pixels. |
| B | Interval scheduling greedy | 362 | Earliest finishing time leaves maximum room for later compatible intervals. |
| C | Combinatorial DP rows | 363, 368 | Both derive a count/row from smaller combinatorial states using Pascal/Catalan structure. |
| D | Prefix-function string matching | 364 | KMP reuses the longest matched prefix after a mismatch. |
| E | Offline order statistics | 365 | Processing from right to left requires counting already-seen values below the current value. |
| F | Grid path-counting DP | 366 | Each open cell accumulates route counts from legal predecessor cells. |
| G | Interval dynamic programming | 367 | The first/last cut splits a segment into independent subsegments plus the current segment cost. |
| H | Bottom-up tree validation | 369 | Postorder combines child BST facts, ranges, and sizes at each parent. |
| I | Pigeonhole bucket gap | 370 | A linear-time bucket argument finds the sorted maximum gap without comparison sorting. |

---

### SMALLEST RECTANGLE ENCLOSING BLACK PIXELS ⚡⚠️
**Covers questions: 361**

#### CORE CONCEPT (30 seconds)
The enclosing axis-aligned rectangle is defined by the minimum and maximum row and column containing a black pixel. A full scan updates `top`, `bottom`, `left`, and `right` in `O(rows×cols)` time and `O(1)` space; area is `(bottom−top+1)×(right−left+1)`. If black pixels are guaranteed connected and one black coordinate is provided, binary search can find four boundaries faster.

#### WHY IT EXISTS
Every valid enclosing rectangle must include all four extreme coordinates. The rectangle using exactly those extremes is therefore feasible and cannot be made smaller on any side.

#### MENTAL MODEL
Slide four walls inward from the matrix edges until each wall touches the first row or column containing black paint.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Scan every cell and track extremes. Handle the no-black-pixel case explicitly.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Return coordinates or area as requested. Initialize extremes safely, and include `+1` because boundaries are inclusive. A DFS from one black pixel works only if all black pixels are connected and still costs proportional to visited area/pixels.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  With connected black pixels, predicates such as “column contains black” are monotonic on either side of a known black point, enabling boundary binary searches in roughly `O(rows log cols + cols log rows)`. Without connectivity, those predicates may contain gaps and binary search is invalid.

#### ALL VARIATIONS COVERED
- **Q361:** Track the four extreme black-pixel coordinates and compute the inclusive rectangle; mention binary-search boundaries only under the connected-pixels/known-point guarantee. ⚠️ Do not assume connectivity unless stated.

#### CONNECTIONS TO OTHER TOPICS
Bounding boxes, flood fill, connected components, monotonic predicates, binary search on answer boundaries, image segmentation, and integral images.

#### CODE / EXAMPLE (if applicable)
```text
top=rows; left=cols; bottom=-1; right=-1
for r in 0..rows-1:
    for c in 0..cols-1:
        if image[r][c]==1:
            top=min(top,r); bottom=max(bottom,r)
            left=min(left,c); right=max(right,c)
if bottom==-1: return 0
return (bottom-top+1)*(right-left+1)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with the always-correct scan, state its invariant, and ask whether connectivity and a seed pixel are guaranteed before proposing binary search. Many candidates overengineer this and silently rely on missing assumptions.

#### ONE-LINE SUMMARY
The minimal rectangle uses exactly the minimum and maximum black-pixel row and column.

---

### MAXIMUM NON-OVERLAPPING INTERVALS — ACTIVITY SELECTION ⚡
**Covers questions: 362**

#### CORE CONCEPT (30 seconds)
Sort intervals by increasing end time. Select the first interval, then select each later interval whose start is at least the end of the last selected one. This greedy rule maximizes the number of non-overlapping intervals in `O(n log n)` time.

#### WHY IT EXISTS
Among all possible first choices, the interval ending earliest leaves at least as much remaining timeline as any other choice. Replacing an optimal solution's first interval with the earliest-finishing compatible one never reduces how many later intervals fit—the exchange argument.

#### MENTAL MODEL
Book the meeting that frees the room earliest; it gives every future meeting the largest possible window.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort by end, not start or duration. Count intervals satisfying the compatibility condition.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify endpoint semantics: for half-open intervals `[start,end)`, `start>=lastEnd` is compatible; for closed intervals, touching may or may not count as overlap depending on the problem.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The greedy rule maximizes count, not total weight/profit; weighted interval scheduling needs DP. If the question asks minimum removals, return `n−maxSelected`. Stable tie-breaking is not essential for count, though shorter/later-start intervals can make output deterministic.

#### ALL VARIATIONS COVERED
- **Q362:** Sort by finish time and greedily accept compatible intervals; explicitly define whether intervals touching at one endpoint overlap.

#### CONNECTIONS TO OTHER TOPICS
Minimum interval removals, meeting rooms, weighted interval scheduling, exchange arguments, greedy proofs, and sweep-line algorithms.

#### CODE / EXAMPLE (if applicable)
```text
sort intervals by end ascending
count=0; lastEnd=-INF
for [start,end] in intervals:
    if start>=lastEnd:
        count+=1
        lastEnd=end
return count
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Give the exchange argument in one sentence rather than saying “greedy works.” Confirm interval semantics and distinguish maximum count from maximum total value.

#### ONE-LINE SUMMARY
Always take the compatible interval finishing earliest because it preserves the most room for future selections.

---

### COMBINATORIAL ROWS: VALID PARENTHESES AND PASCAL'S TRIANGLE ⚡⚠️
**Covers questions: 363, 368**

#### CORE CONCEPT (30 seconds)
Valid parenthesis strings with `p` pairs are counted by the Catalan number `C_p`, or by DP over used opens/closes while enforcing `closes<=opens`. Pascal row `n` contains binomial coefficients `C(n,k)` and can be built from the recurrence `C(n,k)=C(n−1,k−1)+C(n−1,k)`, or iteratively from `value[k]=value[k−1]×(n−k+1)/k`.

#### WHY IT EXISTS
Both count constrained choices. Pascal coefficients count unrestricted ways to choose positions; balanced parentheses impose a prefix-validity condition, turning the central-binomial count into Catalan structure.

#### MENTAL MODEL
Pascal's triangle adds two parents above each cell. A parenthesis path walks right for `(` and down for `)`, but may never cross below the diagonal where closes exceed opens.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  If `n` means total parenthesis-string length, odd `n` gives zero and pairs are `p=n/2`. Catalan `C_p=binom(2p,p)/(p+1)`. Pascal row indexing must be stated—row `0` is `[1]` in the usual convention.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Parenthesis memoization state is `(openUsed,closeUsed)` with `closeUsed<=openUsed<=p`. Pascal's multiplicative row uses `O(n)` output space and exact division at each step. Counts may require wide integers or modulo.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Catalan counts overflow quickly; modular division requires inverses, while DP avoids division. Pascal values can overflow during multiplication even when the divided result fits, so widen or reduce by gcd. Generating strings is output-exponential and different from counting them.

#### ALL VARIATIONS COVERED
- **Q363:** First clarify whether `n` means characters or pairs; for character length, return zero when odd and otherwise compute Catalan for `n/2`. ⚠️ Never count strings that become prefix-invalid even if final opens and closes match.
- **Q368:** Build all `n+1` coefficients of row `n` using Pascal addition or the multiplicative binomial recurrence; clarify zero-based row numbering.

#### CONNECTIONS TO OTHER TOPICS
Catalan numbers, unique BSTs, Dyck paths, binomial coefficients, combinations, lattice paths, backtracking, and modular arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
# nth Pascal row, zero-based
row=[1]
for k in 1..n:
    row.add(row[k-1]*(n-k+1)/k)

# count valid strings with p pairs
count(open,close):
    if open==p: return 1
    answer=count(open+1,close)
    if close<open: answer+=count(open,close+1)
    return memoized answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Resolve the ambiguous meaning of `n` immediately. Derive prefix validity for parentheses and row indexing for Pascal instead of relying on memorized formulas. State overflow/modulo assumptions.

#### ONE-LINE SUMMARY
Pascal rows follow binomial recurrence; valid parenthesis counts are Catalan because no prefix may contain more closes than opens.

---

### KMP SUBSTRING SEARCH ⚡
**Covers questions: 364**

#### CORE CONCEPT (30 seconds)
KMP preprocesses the pattern into an LPS array where `lps[i]` is the longest proper prefix of `pattern[0..i]` that is also a suffix. During search, a mismatch after `j` matched characters moves `j` to `lps[j−1]` instead of moving the text pointer backward. Preprocessing plus search is `O(m+n)` time and `O(m)` space.

#### WHY IT EXISTS
Naive search rechecks text characters after partial matches. The pattern's own prefix-suffix structure tells us exactly how much of that match remains useful, preventing repeated work.

#### MENTAL MODEL
After a mismatch, slide the pattern so its longest matching border stays aligned with text already confirmed; do not rewind the text tape.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Empty pattern conventionally returns `0`. A full match ends at text index `i−1`, so its start is `i−m`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Build LPS using its own fallback loop. During search, on mismatch use `j=lps[j−1]` when `j>0`; otherwise increment text index. Prove each pointer moves forward or falls through a bounded prefix chain.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  KMP supports streaming text because only `j` and LPS are retained. It can report all matches by resetting `j=lps[j−1]` after a match. Unicode grapheme semantics may differ from code-unit matching.

#### ALL VARIATIONS COVERED
- **Q364:** Build LPS for the needle, scan the haystack without rewinding its pointer, and return the first full-match start index or `−1`.

#### CONNECTIONS TO OTHER TOPICS
Z algorithm, rolling hash/Rabin–Karp, borders, periods, prefix functions, finite automata, and streaming pattern matching.

#### CODE / EXAMPLE (if applicable)
```text
# search
i=0; j=0
while i<text.length:
    if text[i]==pattern[j]: i++; j++
    if j==pattern.length: return i-j
    if i<text.length and text[i]!=pattern[j]:
        if j>0: j=lps[j-1]
        else: i++
return -1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define LPS precisely—“proper prefix” matters—and dry-run a fallback on a pattern with repetition such as `ababaca`. Avoid copying KMP code without explaining why the text index never moves backward.

#### ONE-LINE SUMMARY
KMP uses pattern prefix-suffix borders to preserve useful matched work after mismatches and searches in linear time.

---

### COUNT OF SMALLER NUMBERS AFTER SELF ⚡⚠️
**Covers questions: 365**

#### CORE CONCEPT (30 seconds)
Process the array from right to left. Coordinate-compress values into sorted ranks, maintain frequencies of ranks already seen in a Fenwick tree, query the count of ranks strictly below the current rank, then add the current rank. This gives `O(n log n)` time and `O(n)` space.

#### WHY IT EXISTS
When scanning from right, the data structure represents exactly the suffix after the current element. A prefix-sum query over ranks answers “how many suffix values are smaller?” without sorting each suffix separately.

#### MENTAL MODEL
Walk from the right while filling numbered buckets by value rank. Before placing the current item, ask how many balls already sit in lower-numbered buckets.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Compression preserves ordering and handles negative/large values. Query `rank−1`, not `rank`, because equal values are not smaller.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Fenwick update and prefix query are `O(log n)`. A merge-sort solution can count how many right-half elements cross before each left element, also in `O(n log n)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  An augmented balanced BST stores subtree sizes but is harder to implement safely. Stable index tracking is essential in merge sort. For online bounded domains, a segment tree/Fenwick tree works without seeing all values first; otherwise compression is offline.

#### ALL VARIATIONS COVERED
- **Q365:** Scan right-to-left, query the frequency of compressed ranks below the current value, and then insert it. ⚠️ Including the current rank incorrectly counts duplicates as smaller.

#### CONNECTIONS TO OTHER TOPICS
Inversion counting, Fenwick trees, segment trees, coordinate compression, order-statistic trees, merge sort, and range-frequency queries.

#### CODE / EXAMPLE (if applicable)
```text
ranks = sorted unique values mapped to 1..m
for i from n-1 down to 0:
    r=rank[a[i]]
    answer[i]=fenwick.query(r-1)
    fenwick.add(r,1)
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why right-to-left makes the maintained set exactly the required suffix. State “strictly smaller” and show how duplicates behave. If Fenwick syntax becomes noisy, first present the invariant and compression mapping.

#### ONE-LINE SUMMARY
Scan from the right and use a rank-frequency prefix query to count previously seen values strictly below each element.

---

### ROBOT PATH COUNTING IN A MAZE ⚡
**Covers questions: 366**

#### CORE CONCEPT (30 seconds)
If the robot only moves right and down, let `dp[r][c]` be the number of ways to reach open cell `(r,c)`. A wall contributes zero; otherwise `dp[r][c]=dp[r−1][c]+dp[r][c−1]`, with the start initialized to one if open. Time is `O(rows×cols)` and space can be `O(cols)`.

#### WHY IT EXISTS
Every path into a cell must arrive from one of its legal predecessors. Their path sets are disjoint by final move, so adding predecessor counts counts every valid route exactly once.

#### MENTAL MODEL
Each open square receives route tokens from the square above and the square left; walls absorb all tokens.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Start or destination wall means zero. Set walls to zero so they block inherited counts.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With 1D DP, `dp[c]` before update is the value from above and `dp[c−1]` is from the left. State allowed moves; arbitrary four-direction movement is not this simple DAG recurrence.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Counts may require modulo/big integers. If moves allow cycles, “number of walks” can be infinite; simple-path counting becomes much harder. Weighted minimum-cost traversal is a different DP/shortest-path problem.

#### ALL VARIATIONS COVERED
- **Q366:** Under standard right/down movement, sum route counts from top and left for open cells and reset walls to zero; clarify moves and modulo requirements.

#### CONNECTIONS TO OTHER TOPICS
Unique paths, lattice paths, Pascal's triangle, DAG DP, obstacle grids, minimum path sums, and combinatorial counting.

#### CODE / EXAMPLE (if applicable)
```text
dp=[0]*cols
dp[0]=1 if start is open else 0
for r in 0..rows-1:
    for c in 0..cols-1:
        if maze[r][c] is wall: dp[c]=0
        else if c>0: dp[c]+=dp[c-1]
return dp[cols-1]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask which movements are legal. Explain the 1D state update rather than presenting it as magic, and test a blocked start, blocked destination, and single-cell maze.

#### ONE-LINE SUMMARY
For right/down movement, each open cell's route count is top plus left, while every wall resets the count to zero.

---

### MINIMUM COST TO CUT A ROPE — INTERVAL DP ⚡⚠️
**Covers questions: 367**

#### CORE CONCEPT (30 seconds)
Add endpoints `0` and rope length `L` to the sorted cut positions. Let `dp[i][j]` be the minimum cost to perform all cuts strictly between positions `i` and `j`. If cut `k` is performed first, pay segment length `pos[j]−pos[i]` plus `dp[i][k]+dp[k][j]`; minimize over `k`. Complexity is `O(c³)` time and `O(c²)` space for `c` cuts.

#### WHY IT EXISTS
The cost of a cut depends on the current piece length, which depends on earlier choices. Once the first cut inside a segment is chosen, the left and right remaining cuts become independent subproblems.

#### MENTAL MODEL
Choose where to split a stick first; pay for the entire current stick once, then solve the two smaller sticks independently.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort cuts and include endpoints. Empty intervals with no internal cut cost zero.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Fill intervals by increasing gap length so subintervals are already solved. Be precise about whether `k` is the first or last cut—either recurrence works because the current segment cost is paid once.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This is the same shape as matrix-chain multiplication and burst balloons. Remove duplicate/invalid cut positions, use wide totals, and note that generic greedy choices such as “cut nearest the middle” are not guaranteed optimal.

#### ALL VARIATIONS COVERED
- **Q367:** Sort cut locations with endpoints and apply interval DP over the first cut in each segment. ⚠️ Cutting positions in sorted order is not necessarily minimum cost.

#### CONNECTIONS TO OTHER TOPICS
Matrix-chain multiplication, optimal BST, burst balloons, polygon triangulation, memoized intervals, and divide-and-conquer optimization conditions.

#### CODE / EXAMPLE (if applicable)
```text
pos=sorted([0]+cuts+[L])
for gap in 2..pos.length-1:
    for i in 0..pos.length-gap-1:
        j=i+gap; dp[i][j]=INF
        for k in i+1..j-1:
            dp[i][j]=min(dp[i][j], pos[j]-pos[i]+dp[i][k]+dp[k][j])
return dp[0][last]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the interval state and explain why the chosen cut separates independent subproblems. Candidates often know the recurrence but forget endpoints or fill intervals in an invalid order.

#### ONE-LINE SUMMARY
For each segment, try every first cut, pay the segment length once, and add optimal costs of its two subsegments.

---

### LARGEST BST SUBTREE BY POSTORDER ⚡⚠️
**Covers questions: 369**

#### CORE CONCEPT (30 seconds)
Process the tree postorder. From each node return whether its subtree is a BST, its minimum value, maximum value, and size. The current subtree is a BST when both children are BSTs and `left.max < node.value < right.min`; then its size is `left.size+right.size+1`. Otherwise mark invalid and propagate the largest valid size seen. Overall complexity is `O(n)` time and `O(h)` stack space.

#### WHY IT EXISTS
Revalidating each subtree from scratch repeats work and can take `O(n²)`. A parent needs only compact summaries from its children to decide the BST invariant and compute size.

#### MENTAL MODEL
Each child sends a certificate: “I am a BST, my value range is this, and I contain this many nodes.” The parent combines certificates or rejects the combined subtree.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  BST validity concerns every descendant, not just immediate children. Empty children are valid with neutral ranges `(+∞,−∞)` and size zero.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Return a structured result and update a global maximum, or include `largestBSTSize` in the result. State duplicate-key policy because inequalities may be strict or one-sided.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Avoid sentinel collisions when node values may equal numeric limits—use nullable ranges or wider types. If asked for the subtree root, store it when updating the maximum. Iterative postorder handles deeply skewed trees.

#### ALL VARIATIONS COVERED
- **Q369:** Use one postorder pass returning BST validity, range, and subtree size; update the best only when the complete subtree satisfies the global range condition. ⚠️ Checking only parent-child comparisons is insufficient.

#### CONNECTIONS TO OTHER TOPICS
BST validation, tree DP, balanced-tree checks, subtree aggregates, postorder traversal, range invariants, and largest valid substructure problems.

#### CODE / EXAMPLE (if applicable)
```text
solve(node):
    if node==null: return (true,+INF,-INF,0)
    L=solve(node.left); R=solve(node.right)
    if L.isBST and R.isBST and L.max<node.value<R.min:
        size=L.size+R.size+1
        best=max(best,size)
        return (true,min(L.min,node.value),max(R.max,node.value),size)
    return (false,0,0,0)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the returned contract before coding and demonstrate why global min/max—not only child values—are required. Clarify duplicates and sentinel safety.

#### ONE-LINE SUMMARY
Postorder returns each subtree's BST certificate—validity, range, and size—so the largest valid one is found in one pass.

---

### MAXIMUM SORTED ADJACENT GAP WITH BUCKETS ⚡⚠️
**Covers questions: 370**

#### CORE CONCEPT (30 seconds)
For `n>=2`, let global range be `max−min` and bucket width be `ceil(range/(n−1))`. Place values into buckets storing only each bucket's minimum and maximum. By the pigeonhole principle, the maximum sorted adjacent gap occurs between non-empty buckets, so scan `currentBucket.min−previousBucket.max`. This is `O(n)` time and `O(n)` space.

#### WHY IT EXISTS
Comparison sorting costs `O(n log n)`, but the average of the `n−1` sorted gaps bounds how small every gap could be. Choosing bucket width at that average ensures values within one bucket cannot produce a gap larger than the answer candidate between buckets.

#### MENTAL MODEL
Place numbers into evenly spaced boxes. Ignore arrangements inside a box; the largest empty stretch is exposed when jumping from one occupied box's maximum to the next occupied box's minimum.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Return zero for fewer than two values or all-equal values. Each bucket stores min/max and an occupied flag.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use ceiling division and a wide type for `max−min`. Map index with `(value−min)/width`; size bucket storage to include the maximum safely.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This achieves linear time under a word-RAM arithmetic model, not comparison-only sorting. Negative values work after subtracting global minimum. Floating-point values need careful precision; integer arithmetic is the standard setting.

#### ALL VARIATIONS COVERED
- **Q370:** Bucket by the global average-gap bound and compare consecutive non-empty bucket boundaries. ⚠️ Sorting first is correct but misses the intended linear-time result; floor width can become zero.

#### CONNECTIONS TO OTHER TOPICS
Pigeonhole principle, bucket sort, radix sort, linear-time selection, distribution algorithms, and non-comparison lower bounds.

#### CODE / EXAMPLE (if applicable)
```text
if n<2 or minValue==maxValue: return 0
width=ceil((maxValue-minValue)/(n-1))
create buckets with empty,min,max
for x in a:
    b=(x-minValue)/width
    update bucket[b]
answer=0; previousMax=none
for each nonempty bucket:
    if previousMax exists: answer=max(answer,bucket.min-previousMax)
    previousMax=bucket.max
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the pigeonhole argument before implementation. Handle all-equal input and integer overflow. If constraints do not require linear time, acknowledge sorting as the simpler baseline, then present buckets as the optimized answer.

#### ONE-LINE SUMMARY
Bucket by the average-gap bound; the largest sorted gap must appear between consecutive non-empty bucket boundaries.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q361** connects to image bounding boxes, flood fill, matrix binary search, and connected-component assumptions.
- **Q362** prepares you for interval removals, meeting scheduling, sweep lines, and weighted interval DP.
- **Q363 and Q368** connect to Catalan numbers, lattice paths, combinations, unique BST counts, and modular combinatorics.
- **Q364** prepares you for prefix functions, borders, Z algorithm, rolling hash, and streaming text search.
- **Q365** connects to inversions, Fenwick/segment trees, coordinate compression, and order statistics.
- **Q366** prepares you for obstacle-grid DP, minimum paths, DAG counting, and movement-model traps.
- **Q367** connects directly to matrix-chain multiplication, burst balloons, and other interval DP recurrences.
- **Q369** prepares you for one-pass tree validation and richer postorder subtree summaries.
- **Q370** links pigeonhole arguments to bucket/radix techniques and linear-time numeric algorithms.

### What to be comfortable with before Batch 38

- Identify the exact assumptions that make a matrix boundary predicate monotonic.
- Give a short exchange proof for earliest-finish interval scheduling.
- Distinguish Catalan counting from Pascal/binomial counting and resolve ambiguous indexing.
- Explain KMP's LPS invariant and mismatch fallback without rewinding text.
- Perform suffix order-statistic queries using compressed ranks.
- Define grid and interval DP states before writing transitions.
- Return compact validity/range/size summaries from postorder tree traversal.
- Use the pigeonhole principle to justify bucket width and cross-bucket gaps.

## Batch 37 Rapid Recall

1. **Black rectangle:** track extreme black rows and columns.
2. **Intervals:** choose earliest compatible finish.
3. **Parenthesis count:** Catalan with prefix validity.
4. **KMP:** fall back through LPS, never rewind text.
5. **Smaller after self:** right-to-left Fenwick rank query.
6. **Maze ways:** open cell equals top plus left.
7. **Rope cuts:** segment length plus optimal left/right intervals.
8. **Pascal row:** iterative binomial coefficients.
9. **Largest BST:** postorder validity, range, and size.
10. **Maximum gap:** compare non-empty bucket boundaries.
