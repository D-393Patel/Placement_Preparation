# JTG Technical Interview Coaching — Batch 50

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 3A — Technical Interview: Coding Rounds 1 & 2  
**Batch:** Questions 491–500

## Questions in This Batch

491. ⚡⚠️ Print all binary-tree nodes at distance `k` from a target node.
492. ⚡ Find maximum stock profit using at most two transactions.
493. ⚡ Count subarrays having a given XOR.
494. ⚡⚠️ Match a string against wildcard pattern `*` and `?`.
495. ⚡ Find the minimum brackets to add to make a string valid.
496. ⚡⚠️ Count distinct palindromic substrings.
497. ⚡⚠️ Merge two sorted arrays without extra space.
498. ⚡ Find the smallest range containing an element from each of `k` sorted lists.
499. Find all Pythagorean triplets in an array.
500. ⚡ Count structurally unique BSTs possible with `n` keys.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Tree-to-graph distance traversal | 491 | Parent links make upward and downward tree moves uniform for BFS from the target. |
| B | Finite-state stock dynamic programming | 492 | Four states capture the best result after first buy/sell and second buy/sell. |
| C | Prefix XOR frequency counting | 493 | Equal/complementary prefix XOR values identify every target-XOR subarray. |
| D | String automata and balance state | 494, 495 | Wildcard DP tracks pattern/text prefixes; bracket additions track unmatched opening/closing state. |
| E | Distinct-palindrome representation | 496 | Center expansion discovers occurrences, while a set/hash/tree deduplicates palindrome values. |
| F | Coordinated traversal of sorted sequences | 497, 498 | Order enables boundary-safe merging and heap advancement through multiple sorted streams. |
| G | Algebraic triplet search | 499 | Squaring turns the Pythagorean condition into a sorted two-sum search for each hypotenuse. |
| H | Catalan structural counting | 500 | Choosing each key as root multiplies independent left/right BST counts. |

---

### NODES AT DISTANCE K FROM A TREE TARGET ⚡⚠️
**Covers questions: 491**

#### CORE CONCEPT (30 seconds)
First DFS/BFS from the root to map each node to its parent. Then BFS from the target as if the tree were an undirected graph, visiting left child, right child, and parent while using a visited set. After exactly `k` levels, the queue contains all nodes at distance `k`. Time and space are `O(n)`.

#### WHY IT EXISTS
Distance paths may travel down into the target’s subtree or up through ancestors and into another branch. Parent mapping exposes the missing upward edge, and BFS guarantees shortest edge distance.

#### MENTAL MODEL
Turn every parent-child branch into a two-way road, start a ripple at the target, and collect the nodes touched on wave `k`.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `k=0` returns the target. Mark nodes visited so parent/child edges do not bounce forever.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use node identity, not value, because values may repeat. Decide behavior when target is absent or `k<0`. Stop expanding after level `k`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A recursive alternative handles descendants at distance `d` and returns target distance upward, but parent-map BFS is easier to explain and generalize. Repeated queries may justify preprocessing ancestors/LCA or graph indexes.

#### ALL VARIATIONS COVERED
- **Q491:** This repeats Q335’s core idea: add parent edges, BFS from the target, and emit the exact `k`th frontier. ⚠️ Searching only the target subtree misses nodes reached through ancestors.

#### CONNECTIONS TO OTHER TOPICS
Q335, burning tree, graph BFS, parent pointers, LCA, tree diameter, multi-source traversal, and shortest paths.

#### CODE / EXAMPLE (if applicable)
```text
build parent[node] for every node
queue=[target]; visited={target}; distance=0
while queue not empty and distance<k:
    repeat queue.size times:
        node=popFront()
        for next in [node.left,node.right,parent[node]]:
            if next exists and unseen: mark; pushBack(next)
    distance+=1
return values/identities currently in queue
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the graph transformation and use identity-safe visited state. Draw a target whose answer includes both a descendant and a node in another branch.

#### ONE-LINE SUMMARY
Add parent links and run one BFS wave from the target; the `k`th frontier is the answer.

---

### MAXIMUM STOCK PROFIT WITH AT MOST TWO TRANSACTIONS ⚡
**Covers questions: 492**

#### CORE CONCEPT (30 seconds)
Maintain four best states while scanning prices: `buy1=max(buy1,−price)`, `sell1=max(sell1,buy1+price)`, `buy2=max(buy2,sell1−price)`, and `sell2=max(sell2,buy2+price)`. The final `sell2` is the best profit after at most two non-overlapping buy-sell transactions. Time is `O(n)` and space `O(1)`.

#### WHY IT EXISTS
Future decisions need only the best balance after each stage, not the full transaction history. The second buy uses profit from the first completed sale, which enforces transaction order and prevents overlapping holdings.

#### MENTAL MODEL
Move through four checkpoints—first purchase, first sale, second purchase, second sale—always retaining the richest balance attainable at each checkpoint.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  One transaction is one buy followed by one sell. You cannot hold two stocks simultaneously.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Initialize buy states to negative infinity or `−price[0]` and sell states to zero. Explain each state’s meaning. A prefix-best plus suffix-best method is also `O(n)` but uses `O(n)` space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This is the `k=2` compression of general `O(nk)` stock DP. Transaction fees, cooldown, or short-selling change state transitions. State whether same-day sell-then-buy is harmless/allowed under the model.

#### ALL VARIATIONS COVERED
- **Q492:** Scan once through the four ordered transaction states and return the best second-sale/no-trade profit.

#### CONNECTIONS TO OTHER TOPICS
General `k`-transaction stock DP, state machines, prefix/suffix optimization, cooldown/fee variants, and DP compression.

#### CODE / EXAMPLE (if applicable)
```text
buy1=-INF; sell1=0; buy2=-INF; sell2=0
for price in prices:
    buy1=max(buy1,-price)
    sell1=max(sell1,buy1+price)
    buy2=max(buy2,sell1-price)
    sell2=max(sell2,buy2+price)
return sell2
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name every state before coding. Dry-run a rising, falling, and two-peak price sequence; avoid presenting four unexplained formulas.

#### ONE-LINE SUMMARY
Keep the best balance after each of four ordered stages: buy one, sell one, buy two, sell two.

---

### COUNTING SUBARRAYS WITH TARGET XOR ⚡
**Covers questions: 493**

#### CORE CONCEPT (30 seconds)
Maintain prefix XOR `p` and a frequency map of earlier prefix XORs, initialized with `freq[0]=1`. A subarray ending here has XOR `target` when `previousPrefix = p XOR target`, so add that frequency, then increment `freq[p]`. This is expected `O(n)` time and `O(n)` space.

#### WHY IT EXISTS
For indexes `l..r`, `prefix[r] XOR prefix[l−1] = target`. XORing both sides yields the exact earlier prefix value needed. The frequency map counts all possible starts, including duplicates.

#### MENTAL MODEL
At each endpoint, compute its XOR fingerprint and ask how many earlier fingerprints would combine with it to produce the target.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Initialize zero prefix before the array so subarrays beginning at index zero count.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Query before insertion to count earlier prefixes only. Use a wide result type because the count can be `n(n+1)/2`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  XOR works naturally with negative values under fixed-width bit representation. For many offline target queries, more specialized transforms may apply depending on value domain; ordinary sliding windows do not work because XOR is not monotonic.

#### ALL VARIATIONS COVERED
- **Q493:** Count earlier prefixes equal to `currentPrefix XOR target` and initialize the virtual zero prefix.

#### CONNECTIONS TO OTHER TOPICS
Subarray sum `k`, prefix hashes, XOR algebra, zero-XOR subsets, parity masks, and frequency counting.

#### CODE / EXAMPLE (if applicable)
```text
freq={0:1}; prefix=0; answer=0
for x in a:
    prefix=prefix XOR x
    answer+=freq.get(prefix XOR target,0)
    freq[prefix]=freq.get(prefix,0)+1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive the equation aloud and explain `freq[0]=1`. Contrast it with sum-prefix logic and avoid proposing a sign-based sliding window.

#### ONE-LINE SUMMARY
Each endpoint needs an earlier prefix equal to `currentXor XOR target`; count those prefixes in a frequency map.

---

### WILDCARD MATCHING AND MINIMUM BRACKET ADDITIONS ⚡⚠️
**Covers questions: 494, 495**

#### CORE CONCEPT (30 seconds)
For wildcard matching, let `dp[i][j]` mean text prefix `i` matches pattern prefix `j`. A literal or `?` uses the diagonal; `*` either matches empty (`dp[i][j−1]`) or consumes one more text character (`dp[i−1][j]`). For parentheses additions, scan a balance of unmatched opens; an unmatched close immediately requires one opening addition, and remaining balance at the end requires closing additions.

#### WHY IT EXISTS
Wildcard `*` creates two reusable choices whose naive recursion repeats states. Bracket validity depends only on prefix balance: no prefix may contain more closes than available opens, and final balance must be zero.

#### MENTAL MODEL
Wildcard DP fills a grid where a star can stay in place while consuming characters or move past itself empty. Bracket scanning keeps a stack-height counter and repairs any close that would fall below ground.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Leading stars can match empty text. For parentheses, increment balance on `(` and either decrement or add a missing opener on `)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Wildcard DP is `O(text×pattern)` and compressible to one row with careful update order; collapse consecutive stars as an optimization. Q495’s constant-state scan applies to one bracket type.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Regex `*` has different semantics because it modifies the previous token. Multiple bracket types need a stack for ordering, not only counts. If arbitrary insert locations/types have costs, DP may be required.

#### ALL VARIATIONS COVERED
- **Q494:** Use wildcard—not regex—prefix DP with `?` diagonal and `*` empty-or-consume transitions. ⚠️ Initialize the empty-text row for leading stars.
- **Q495:** Count repairs for unmatched closes during the scan, then add unmatched opens at the end; clarify that “brackets” means one parenthesis type.

#### CONNECTIONS TO OTHER TOPICS
Regex DP, finite automata, balanced parentheses, stack validation, prefix invariants, and edit distance.

#### CODE / EXAMPLE (if applicable)
```text
# Wildcard
if pattern[j-1]=='*':
    dp[i][j]=dp[i][j-1] or dp[i-1][j]
else if pattern[j-1]=='?' or pattern[j-1]==text[i-1]:
    dp[i][j]=dp[i-1][j-1]

# Minimum additions for parentheses
balance=0; additions=0
for ch in s:
    if ch=='(': balance+=1
    else if balance>0: balance-=1
    else: additions+=1
return additions+balance
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define wildcard semantics and DP state before transitions. For brackets, state the prefix invariant and test strings beginning with closes and ending with opens.

#### ONE-LINE SUMMARY
Wildcard matching reuses prefix states for star choices; bracket repair counts every prefix deficit plus the final unmatched opens.

---

### COUNTING DISTINCT PALINDROMIC SUBSTRINGS ⚡⚠️
**Covers questions: 496**

#### CORE CONCEPT (30 seconds)
Expand around all odd and even centers to discover every palindromic occurrence, but insert each palindrome value into a set so equal text from different positions counts once. This is `O(n²)` expansions; substring copying/hashing may increase practical or theoretical cost. For a truly efficient specialized solution, a palindromic tree (Eertree) creates one node per distinct palindrome in linear time for fixed/efficient alphabet transitions.

#### WHY IT EXISTS
Center expansion solves palindrome discovery, while “distinct” changes the counting unit from positions to text values. A deduplication representation is therefore essential.

#### MENTAL MODEL
Mirrors discover every palindrome occurrence; a registry assigns one identity card to each unique palindrome spelling.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Do not merely increment on every expansion—that counts occurrences, not distinct values. Check odd and even centers.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A set of substring values is simple but can consume `O(n²)` total stored characters and copying time. Hash pairs or DP plus hashes reduce copying but introduce collision/complexity considerations.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  An Eertree stores suffix links and creates exactly one node per distinct palindrome as characters arrive, enabling online `O(n)` construction under standard assumptions. Suffix arrays/automata with palindrome machinery are alternatives.

#### ALL VARIATIONS COVERED
- **Q496:** Discover palindromes by centers and deduplicate their values; state substring-copy complexity. ⚠️ The count from Q371 is occurrence count and is not the answer here.

#### CONNECTIONS TO OTHER TOPICS
Q371, palindrome centers, rolling hashes, Eertrees, suffix structures, Manacher’s radii, and distinct-substring counting.

#### CODE / EXAMPLE (if applicable)
```text
seen=set()
for each odd and even center:
    left,right=center
    while in bounds and s[left]==s[right]:
        seen.add(s[left:right+1])
        left-=1; right+=1
return seen.size
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask whether an `O(n²)` set-based solution satisfies constraints. Explicitly distinguish occurrence discovery cost from substring materialization and unique-storage cost.

#### ONE-LINE SUMMARY
Center expansion finds occurrences; a set/hash or Eertree converts them into a count of unique palindrome values.

---

### SORTED-SEQUENCE COORDINATION: IN-PLACE MERGE AND SMALLEST RANGE ⚡⚠️
**Covers questions: 497, 498**

#### CORE CONCEPT (30 seconds)
For merging, first clarify storage. If the first array has `m+n` capacity, fill it backward using the largest remaining elements in `O(m+n)` time and `O(1)` extra space. If both arrays are fixed-size, use the Shell-sort-like gap method across the conceptual combined array. For the smallest range across `k` sorted lists, keep one current element from each list in a min-heap plus the current maximum; pop the minimum, update the best range, and advance only that list.

#### WHY IT EXISTS
Backward merge avoids overwriting unread values. Gap comparisons progressively order fixed arrays without a full buffer. In the range problem, every valid range needs one element per list; advancing the current minimum is the only move that can raise the lower boundary and possibly shrink the range.

#### MENTAL MODEL
Merge from the empty end of a shelf so existing books are never crushed. For smallest range, hold one marker in each sorted lane and advance the lane currently setting the left boundary.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Q497 storage contract determines the algorithm. Q498 heap starts with each list’s first value; any empty list means no covering range.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Buffer merge uses three indexes from the end. Gap method repeatedly uses `gap=ceil(gap/2)`. Q498 stores `(value,list,index)`, tracks max, and stops when the popped list is exhausted; complexity `O(totalElements log k)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “No extra space” may still permit swapping but not concatenation; gap merge is not stable and has larger constants. Range tie-breaking may prefer smaller left endpoint. Streaming lists work if each supplies a next element.

#### ALL VARIATIONS COVERED
- **Q497:** If array one has spare capacity, merge backward; otherwise state the fixed-array contract and use a gap method. ⚠️ “Without extra space” is ambiguous unless capacities and mutation are defined.
- **Q498:** Maintain exactly one representative per list, the heap minimum, and current maximum; advancing any nonminimum list cannot improve the current left boundary.

#### CONNECTIONS TO OTHER TOPICS
Merge sort, Shell sort gaps, k-way merge, heaps, streaming sorted data, range covering, and external merging.

#### CODE / EXAMPLE (if applicable)
```text
# Buffered backward merge
i=m-1; j=n-1; write=m+n-1
while j>=0:
    if i>=0 and a[i]>b[j]: a[write--]=a[i--]
    else: a[write--]=b[j--]

# Smallest k-list range
heap=first element from every list
currentMax=max(heap values)
while heap contains k representatives:
    minimum,list,index=popMin()
    update best [minimum,currentMax]
    if list exhausted after index: break
    push next from same list; update currentMax
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Resolve Q497’s memory layout before code. For Q498, explain why the minimum’s list is the only useful one to advance and dry-run heap/max updates.

#### ONE-LINE SUMMARY
Merge backward when spare capacity exists; for `k` lists, advance the list currently providing the range minimum.

---

### PYTHAGOREAN TRIPLETS BY SQUARING AND TWO POINTERS
**Covers questions: 499**

#### CORE CONCEPT (30 seconds)
Convert each value to its square, sort the squares, and for each candidate largest square `c²` scan smaller squares with two pointers to find `a²+b²=c²`. Move left up when the sum is small and right down when large. Time is `O(n²)` after sorting; output handling/deduplication depends on the contract.

#### WHY IT EXISTS
The Pythagorean equation becomes a two-sum target once the hypotenuse is fixed. Squaring also makes signs irrelevant if original values may be negative.

#### MENTAL MODEL
Choose the largest side as the target weight, then slide two smaller squared weights until their sum matches it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort squared values and ensure the hypotenuse candidate is the largest. Use a wide type before squaring.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify whether to return values, indexes, or unique value triplets; duplicates require skipping or a result set. Preserve original values/indexes if output needs them.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zero and negative inputs change conventional “positive side length” semantics. Hash-based two-sum also gives `O(n²)` expected time but duplicate/index handling is less naturally ordered.

#### ALL VARIATIONS COVERED
- **Q499:** Square safely, sort, fix the largest side, and solve two-sum with pointers; define positivity and duplicate-output semantics.

#### CONNECTIONS TO OTHER TOPICS
3Sum, two-sum, algebraic transformations, geometry, duplicate handling, and overflow.

#### CODE / EXAMPLE (if applicable)
```text
squares=sort(x*x for x in values)
for c from n-1 down to 2:
    left=0; right=c-1
    while left<right:
        sum=squares[left]+squares[right]
        if sum==squares[c]: emit; move/skip duplicates
        else if sum<squares[c]: left+=1
        else: right-=1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Widen before squaring and define what “all triplets” means with duplicates and signs. Show the monotonic reason for both pointer moves.

#### ONE-LINE SUMMARY
Square and sort; each hypotenuse becomes a two-sum target for two smaller sides.

---

### COUNTING UNIQUE BSTS WITH CATALAN DP ⚡
**Covers questions: 500**

#### CORE CONCEPT (30 seconds)
Let `dp[n]` be the number of structurally unique BSTs using `n` ordered keys. For each root, left and right key counts are fixed, so `dp[n]=Σ dp[left]×dp[n−1−left]` with `dp[0]=1`. This is `O(n²)` time and `O(n)` space; the answer is Catalan number `C_n`.

#### WHY IT EXISTS
Choosing a root partitions smaller and larger keys uniquely. Left and right subtree shapes are independent, so their counts multiply; alternative roots are disjoint, so their totals add.

#### MENTAL MODEL
Choose a root shelf divider; independently choose one legal arrangement for everything smaller and one for everything larger.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `dp[0]=1` because an empty subtree is one valid structural choice.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Explain multiplication/addition and use a wide type or modulo because Catalan numbers grow quickly.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Closed form is `C_n=binom(2n,n)/(n+1)`. Modular division needs inverses; arbitrary-precision arithmetic may be required.

#### ALL VARIATIONS COVERED
- **Q500:** This is the same Catalan recurrence as Q355; derive it from root choice instead of merely naming the sequence.

#### CONNECTIONS TO OTHER TOPICS
Q355, Catalan numbers, valid parentheses, full binary trees, polygon triangulations, and combinatorial DP.

#### CODE / EXAMPLE (if applicable)
```text
dp[0]=1
for nodes in 1..n:
    for left in 0..nodes-1:
        right=nodes-1-left
        dp[nodes]+=dp[left]*dp[right]
return dp[n]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why the empty subtree contributes one and why left/right counts multiply. Ask about overflow or modulo requirements.

#### ONE-LINE SUMMARY
Try every root and multiply independent left/right BST counts—the Catalan recurrence.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q491** connects to Q335, burning trees, parent graphs, and distance/LCA queries.
- **Q492** prepares you for general transaction-state DP and fee/cooldown stock variants.
- **Q493** connects to prefix-sum counting, XOR bases, and parity-mask substring problems.
- **Q494 and Q495** prepare you for regex DP, automata, parsers, and bracket-stack variants.
- **Q496** connects occurrence-versus-distinct counting to Eertrees and suffix structures.
- **Q497 and Q498** prepare you for k-way merge, external sorting, sorted streams, and heap-frontier problems.
- **Q499** links algebraic transformations with two-pointer k-sum patterns.
- **Q500** connects Catalan families across BSTs, parentheses, and triangulation.

### What to be comfortable with before Batch 51

- Convert a tree to an undirected graph safely using node identity.
- Explain four-state stock DP in plain English.
- Derive prefix-XOR complement equations.
- Initialize wildcard DP for empty text and leading stars.
- Distinguish palindrome occurrences from distinct values.
- Ask about array capacity before promising an in-place merge.
- Prove why only the minimum list advances in a smallest-range heap.
- Widen values before squaring and define duplicate triplet semantics.
- Derive Catalan counts from independent subtrees.

## Batch 50 Rapid Recall

1. **Distance-k nodes:** parent map plus BFS frontier.
2. **Two stock transactions:** buy1, sell1, buy2, sell2.
3. **Target XOR:** prefix complement frequency.
4. **Wildcard:** diagonal for literal/`?`, empty-or-consume for `*`.
5. **Bracket additions:** prefix deficits plus final balance.
6. **Distinct palindromes:** discover, then deduplicate.
7. **No-space merge:** backward with buffer; gap for fixed arrays.
8. **Smallest k-list range:** heap minimum plus current maximum.
9. **Pythagorean triplets:** squared two-sum for each largest side.
10. **BST count:** Catalan root-split recurrence.
