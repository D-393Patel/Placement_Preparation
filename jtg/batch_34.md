# JTG Technical Interview Coaching — Batch 34

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 331–340

## Questions in This Batch

331. ⚡⚠️ Count subarrays whose product is less than `k`.
332. ⚡ Rearrange a string so adjacent characters differ.
333. ⚡⚠️ Find the longest palindromic subsequence length.
334. ⚡ Find the minimum top-left-to-bottom-right grid path sum.
335. ⚡⚠️ Find all binary-tree nodes at distance `k` from a target node.
336. ⚡ Count connected components in an undirected graph.
337. ⚡⚠️ Find the maximum XOR of two array values.
338. ⚡ Determine whether one string interleaves two other strings.
339. ⚡ Sort a `k`-nearly-sorted array.
340. ⚡⚠️ Maintain the kth-largest value in an integer stream.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Multiplicative sliding window | 331 | Positive products give a monotonic window and direct count of valid suffixes. |
| B | Greedy frequency scheduling | 332 | A max-heap repeatedly chooses the most frequent character not equal to the previous one. |
| C | String/grid dynamic programming | 333, 334, 338 | Palindromic subsequence, grid cost, and interleaving each define reusable prefix/interval states. |
| D | Graph/tree reachability | 335, 336 | Parent-augmented tree BFS and component flood-fill are both explicit graph traversal. |
| E | Bit-trie optimisation | 337 | Opposite-bit choices greedily maximise XOR at each bit position. |
| F | Size-bounded min-heaps | 339, 340 | A heap of at most `k+1` or `k` elements maintains the next sorted/kth-largest boundary. |

---

### SUBARRAY PRODUCT LESS THAN K ⚡⚠️
**Covers questions: 331**

#### CORE CONCEPT (30 seconds)
Assuming all array values are strictly positive, maintain a window product. Multiply by each new right value; while product `>=k`, divide out left values and advance left. Then every subarray ending at right and starting from `left..right` is valid, so add `right−left+1`. Time `O(n)`, space `O(1)`.

#### WHY IT EXISTS
With positive values, shrinking cannot increase the product and extending cannot restore an invalid prefix unpredictably. Once the largest valid suffix window is known, all its shorter suffixes are also valid.

#### MENTAL MODEL
Stretch a product window until it exceeds a budget, then remove items from the left until affordable; every suffix inside the affordable window is another valid subarray.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Positive array, `k<=1` gives zero under standard `nums[i]>=1`, sliding product, add window length.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use sufficiently wide product or guard overflow. Division is exact because values currently multiply the product. Explain why adding `windowLength` counts all new subarrays ending at right.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zeros require segmentation/special handling because division by zero and product reset alter the standard proof. Negative values destroy monotonicity; logarithms/order-statistics or other approaches are needed depending on constraints. Floating values introduce precision issues.

#### ALL VARIATIONS COVERED
- **Q331:** Use the positive-number multiplicative window and add each valid suffix count. ⚠️ State positivity; the algorithm is not correct for arbitrary signed arrays.

#### CONNECTIONS TO OTHER TOPICS
Sliding windows, subarray counting, at-most-k constraints, logarithms, two pointers, and overflow.

#### CODE / EXAMPLE (if applicable)
```text
if k<=1: return 0
product=1; left=0; answer=0
for right in 0..n-1:
    product*=a[right]
    while product>=k:
        product/=a[left++]
    answer+=right-left+1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the positivity assumption and prove the suffix count. Dry-run `[10,5,2,6],k=100`. Avoid a generic prefix-product division solution, which fails around zeros and overflow.

#### ONE-LINE SUMMARY
For positive values, shrink product to validity and count every valid suffix ending at the new right boundary.

---

### REARRANGING CHARACTERS WITHOUT ADJACENT DUPLICATES ⚡
**Covers questions: 332**

#### CORE CONCEPT (30 seconds)
Count characters and use a max-heap by remaining frequency. Repeatedly pop the most frequent character, append it, decrement it, and only then reinsert the previously used character if it still has occurrences. This prevents immediate reuse. A solution exists iff maximum frequency `<=ceil(n/2)`. Time `O(n log σ)`.

#### WHY IT EXISTS
The most frequent character is the hardest to place, so schedule it whenever allowed while holding the last character out for one turn. The frequency bound is necessary because copies of the dominant character need separators, and the greedy construction achieves it.

#### MENTAL MODEL
Seat the largest remaining group first, but keep yesterday's group outside the room for one round so no identical neighbours sit together.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Frequency max-heap, hold previous, feasibility bound.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Reinsert previous after choosing current, not before. At end, if held character remains, arrangement is impossible. Tie order affects output but not validity.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Fixed lowercase alphabet permits `O(n+σ)` bucket placement. Generalisation to distance `d` uses a cooldown queue. Unicode/code-point and deterministic lexicographic requirements change heap comparator/state.

#### ALL VARIATIONS COVERED
- **Q332:** Max-heap frequencies with a one-step cooldown constructs a valid string exactly when the dominant count fits available separators.

#### CONNECTIONS TO OTHER TOPICS
Task scheduling with cooldown, priority queues, greedy exchange reasoning, frequency maps, and interval spacing.

#### CODE / EXAMPLE (if applicable)
```text
heap=maxHeap(counts); previous=null
while heap not empty:
    current=heap.popMax()
    output current.char; current.count--
    if previous!=null and previous.count>0: heap.push(previous)
    previous=current
if previous!=null and previous.count>0: return IMPOSSIBLE
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Give the feasibility argument and explain cooldown ordering. Test `aaab` (impossible) and `aaabc` (possible). Avoid greedily choosing any different character without frequency priority.

#### ONE-LINE SUMMARY
Always place the most frequent currently allowed character and hold the last one out for a turn; feasibility is `maxFreq<=ceil(n/2)`.

---

### PALINDROMIC SUBSEQUENCE, GRID COST, AND INTERLEAVING DP ⚡⚠️
**Covers questions: 333, 334, 338**

#### CORE CONCEPT (30 seconds)
LPS interval DP: if endpoints match, `dp[l][r]=2+dp[l+1][r−1]`; otherwise take max after dropping one endpoint. Grid minimum cost: cell cost plus min(top,left). Interleaving: `dp[i][j]` says whether `s3[0..i+j)` can be formed from prefixes of `s1,s2`, taking the next matching character from either. All are `O(n²)`/`O(RC)` style DP with reducible space.

#### WHY IT EXISTS
Each problem has overlapping substructure identified by boundaries: string interval, grid coordinates, or two consumed-prefix lengths. The recurrence captures every valid final/outer choice.

#### MENTAL MODEL
LPS either pairs matching ends or discards one end. Grid paths pay the cheaper predecessor. Interleaving walks a 2D grid: right consumes `s1`, down consumes `s2`, and path labels must spell `s3`.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  LPS `O(n²)`, grid `O(RC)`, interleaving `O(|s1||s2|)`. Check interleaving total length first.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  LPS base `dp[i][i]=1`, fill shorter intervals first; equivalent to LCS(s,reverse(s)). Grid initialise first row/column and handle obstacles only if specified. Interleaving transition ORs valid sources whose next character matches `s3[i+j−1]`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  LPS is not longest palindromic substring. Matching endpoints recurrence for length 2 needs empty-inner value zero. Grid negative weights are fine with only right/down DAG movement. Interleaving one-row DP must preserve prior-row and current-row meanings; repeated characters create multiple paths but boolean OR handles them.

#### ALL VARIATIONS COVERED
- **Q333:** Interval DP or LCS-with-reverse finds LPS length. ⚠️ Subsequences need not be contiguous.
- **Q334:** Add each grid value to the cheaper valid top/left predecessor; use `O(columns)` rolling space.
- **Q338:** Prefix-pair boolean DP consumes characters from `s1` or `s2` in order and must match `s3` exactly.

#### CONNECTIONS TO OTHER TOPICS
LCS, interval DP, path DP, edit distance, sequence alignment, rolling arrays, and DAG paths.

#### CODE / EXAMPLE (if applicable)
```text
// Interleaving
if len1+len2!=len3: return false
dp[0]=true
for i in 0..len1:
    for j in 0..len2:
        if i==0 and j==0: continue
        dp[i][j]=(i>0 and dp[i-1][j] and s1[i-1]==s3[i+j-1])
              or (j>0 and dp[i][j-1] and s2[j-1]==s3[i+j-1])
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define each state in words before recurrence and state fill order. Test empty inputs and repeated characters. Avoid using greedy matching for interleaving.

#### ONE-LINE SUMMARY
These DPs index the unresolved boundaries: palindrome interval, grid cell, or pair of consumed string prefixes.

---

### NODES AT DISTANCE K AND GRAPH COMPONENTS ⚡⚠️
**Covers questions: 335, 336**

#### CORE CONCEPT (30 seconds)
For distance-`k` tree nodes, first map each node to its parent, then BFS from the target over neighbours `{left,right,parent}` with visited; nodes in BFS level `k` are the answer. For undirected components, scan all vertices and start DFS/BFS at every unvisited one; number of starts is the component count. Both are `O(n)`/`O(V+E)`.

#### WHY IT EXISTS
A tree becomes an undirected graph once parent edges are available. Repeated traversal starts partition a graph into disjoint reachable regions.

#### MENTAL MODEL
From the target, ripples travel up and down the tree; the kth ripple is the answer. Components are islands, one flood-fill each.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Parent map + BFS levels; component scan + flood-fill.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use node references/IDs, not values, because values may repeat. Mark target visited before BFS. Include isolated graph vertices and handle `k=0`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A recursive distance-from-target method avoids parent map but is harder. Confirm target actually belongs to the tree. DSU counts static undirected components from an edge list; directed weak/strong components are different.

#### ALL VARIATIONS COVERED
- **Q335:** Convert parent relationships, BFS exactly `k` levels, return that frontier. ⚠️ Identify target by node identity.
- **Q336:** Count traversal starts over every unvisited undirected vertex, including isolated nodes.

#### CONNECTIONS TO OTHER TOPICS
BFS levels, parent pointers, graph conversion, connected components, union–find, and tree distance queries.

#### CODE / EXAMPLE (if applicable)
```text
queue=[target]; visited={target}; distance=0
while queue not empty and distance<k:
    repeat queue.size times:
        u=popFront()
        for v in [u.left,u.right,parent[u]]:
            if v!=null and v not visited: mark/enqueue
    distance++
return queue contents if distance==k else []
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain tree-to-graph conversion and level boundary. Test target root/leaf and duplicate values. Avoid revisiting parent-child cycles by forgetting visited.

#### ONE-LINE SUMMARY
Parent links make tree distance ordinary BFS; graph component count is the number of independent flood-fill starts.

---

### MAXIMUM XOR WITH A BIT TRIE ⚡⚠️
**Covers questions: 337**

#### CORE CONCEPT (30 seconds)
Insert numbers into a binary trie from the most significant bit downward. For each number, query the trie preferring the opposite bit at every position because that sets the current XOR bit to 1; fall back to the same bit if needed. Over fixed word width `W`, time is `O(nW)` and trie space `O(nW)`.

#### WHY IT EXISTS
XOR value is lexicographically dominated by higher bits. Once the highest possible XOR bit is chosen, lower bits cannot outweigh it, so greedy opposite-bit traversal is correct.

#### MENTAL MODEL
At each binary digit, take the branch opposite your bit whenever possible to light the most valuable remaining XOR lamp.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Bit trie children 0/1; insert/query high-to-low.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Insert one value, then query subsequent values to guarantee distinct indices, or insert all and query if self-pair cannot beat alternatives. Use correct fixed width and unsigned bit extraction.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Signed “maximum” semantics differ because sign bit dominates numeric comparison; many problems interpret values/XOR as non-negative 31-bit ints. Alternative prefix-set greedy constructs result bits without a trie in `O(nW)` space/time. Trie nodes can be pooled for performance.

#### ALL VARIATIONS COVERED
- **Q337:** Greedily follow opposite bits in a binary trie to maximise the highest XOR bit first. ⚠️ Define word width and signed/unsigned interpretation.

#### CONNECTIONS TO OTHER TOPICS
Bit masks, prefix tries, maximum XOR subarrays, binary representation, greedy bit construction, and memory pools.

#### CODE / EXAMPLE (if applicable)
```text
query(x):
    node=root; value=0
    for bit from W-1 down to 0:
        b=(x>>bit)&1; wanted=1-b
        if node.child[wanted] exists:
            value |= 1<<bit; node=node.child[wanted]
        else: node=node.child[b]
    return value
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why high-bit greed is safe and handle fewer than two values. Avoid string-based binary conversion or unspecified signed shifts.

#### ONE-LINE SUMMARY
A bit trie chooses the opposite available bit from most significant to least, maximising XOR greedily by bit priority.

---

### K-SORTED ARRAYS AND STREAMING KTH LARGEST ⚡⚠️
**Covers questions: 339, 340**

#### CORE CONCEPT (30 seconds)
For an array where each element is at most `k` positions from sorted location, put the first `k+1` values in a min-heap, repeatedly output the minimum and insert the next value; time `O(n log(k+1))`, space `O(k)`. For kth largest in a stream, maintain a min-heap of the largest `k` values; after each insert, pop the minimum if size exceeds `k`, and the root is kth largest.

#### WHY IT EXISTS
In a k-sorted array, the next output must lie among the next `k+1` unseen values. In the stream, values below the current top-k boundary can be discarded permanently.

#### MENTAL MODEL
Sorting keeps a small look-ahead basket; output its smallest. Kth-largest keeps a podium of `k`; its weakest member is the kth place.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  K-sorted heap size `k+1`; kth-largest heap size `k`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clamp initial heap to array size and validate `k>=0`. Stream constructor processes initial values through the same `add`. Duplicates count by rank unless “distinct” is stated.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Before stream has `k` values, API must return absent/error or define behavior. For distinct kth largest, maintain dedup state—which may violate strict `O(k)` without assumptions. Nearly sorted guarantee is essential; otherwise output can be wrong.

#### ALL VARIATIONS COVERED
- **Q339:** Min-heap the next `k+1` candidates and emit one at a time.
- **Q340:** Keep only the largest `k` stream values in a min-heap; root is rank `k`. ⚠️ Define pre-`k` and duplicate behavior.

#### CONNECTIONS TO OTHER TOPICS
Priority queues, external/online sorting, top-k, stream medians, order statistics, and bounded memory.

#### CODE / EXAMPLE (if applicable)
```text
add(x):
    heap.push(x)
    if heap.size>k: heap.popMin()
    return heap.size==k ? heap.min : NOT_AVAILABLE
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive why sizes are `k+1` versus `k` and state ranking semantics. Test `k=0`, `k>n`, duplicates, and initial stream. Avoid a max-heap for keeping top k—it cannot cheaply discard the smallest podium member.

#### ONE-LINE SUMMARY
K-sorted output needs the next `k+1` candidates; kth-largest streaming retains only the largest `k`, whose minimum is the answer.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q331 (product window)** connects to positive-only sliding windows and subarray counting.
- **Q332 (rearrangement)** connects to task scheduling/cooldowns and heap greed.
- **Q333/Q334/Q338 (DP)** reinforce interval, grid, and two-prefix states.
- **Q335/Q336 (traversal)** connect tree-to-graph conversion and component counting.
- **Q337 (bit trie)** prepares XOR queries and binary prefix structures.
- **Q339/Q340 (bounded heaps)** connect nearly sorted data, top-k, and online statistics.

### Be Comfortable With Before Batch 35 (Questions 341–350)

- Directed-cycle DFS colouring (repeat).
- Complete-graph MST for connecting points.
- Sum of left leaves.
- O(n)/O(1) duplicate detection constraints.
- At-most-k stock-transaction DP.
- Minimum deletions to make strings equal.
- Number-of-ways coin change.
- Multi-source BFS.
- Maximum non-adjacent subsequence sum.
- Equal-sum tree edge partition.

### Batch 34 Rapid Recall

331. Positive-product window adds every valid suffix count.
332. Max-heap plus one-step cooldown avoids adjacent duplicates.
333. LPS is interval DP, not substring.
334. Grid minimum adds current cell to min(top,left).
335. Distance-k tree nodes use parent-map BFS.
336. Components equal flood-fill starts.
337. Bit trie prefers opposite bits high-to-low.
338. Interleaving uses two-prefix boolean DP.
339. K-sorted array needs a `k+1` min-heap.
340. Streaming kth-largest keeps a size-`k` min-heap.
