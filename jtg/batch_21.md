# JTG Technical Interview Coaching — Batch 21

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 201–210

## Questions in This Batch

201. ⚡ Explain the prefix-sum technique with an example.
202. ⚡⚠️ Check whether a number is a power of two using bitwise operations.
203. ⚠️ Explain the XOR-swap trick and why it works.
204. ⚡ Find the single non-duplicate when every other array element appears twice.
205. ⚡ Explain bit masking with an example.
206. ⚡ Generate all combinations of `k` elements from a set of `n`.
207. ⚡⚠️ Find the minimum number of railway platforms required.
208. ⚡⚠️ Find the maximum circular subarray sum.
209. ⚡⚠️ Explain NP, NP-Hard, and NP-Complete.
210. ⚡⚠️ Find the diameter of a binary tree.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Prefix-sum preprocessing | 201 | Cumulative sums turn repeated range work into endpoint subtraction. |
| B | XOR and bit masks | 202, 203, 204, 205 | These all manipulate binary representations using clear algebraic identities. |
| C | Fixed-size combination generation | 206 | Backtracking chooses `k` items while pruning impossible remaining branches. |
| D | Maximum interval overlap | 207 | Platform count is the maximum number of simultaneously active train intervals. |
| E | Circular subarray optimisation | 208 | Kadane's maximum/minimum subarrays handle non-wrapping and wrapping cases. |
| F | Computational complexity classes | 209 | NP, NP-Hard, and NP-Complete classify verification and reduction difficulty. |
| G | Tree path aggregation | 210 | Diameter combines the two deepest downward paths at each node. |

---

### PREFIX SUMS ⚡
**Covers questions: 201**

#### CORE CONCEPT (30 seconds)
Build `prefix[i+1] = prefix[i] + a[i]`, where `prefix[t]` is the sum of the first `t` elements. Then the inclusive range sum `a[l..r]` is `prefix[r+1] - prefix[l]`. Preprocessing costs `O(n)` time/space and each query is `O(1)`.

#### WHY IT EXISTS
Repeatedly summing every requested range repeats the same additions. Prefix sums cache cumulative work so a range is the difference between two boundaries.

#### MENTAL MODEL
An odometer records total distance from the start. Distance travelled between two checkpoints is later reading minus earlier reading.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Store a leading zero, build cumulatively, answer a range by subtracting endpoints.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  The length-`n+1` convention removes special handling for `l=0`. Use a sufficiently wide type. Prefix sums work with negative values and extend to 2D rectangle sums.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Prefix sums fit static arrays; point updates invalidate later prefixes. Fenwick/segment trees support dynamic updates. Prefix-frequency maps solve target-subarray counts, while difference arrays invert the idea for many range updates.

#### ALL VARIATIONS COVERED
- **Q201:** Precompute cumulative totals once and answer `[l,r]` as `prefix[r+1]-prefix[l]`; for `[2,4,1,7]`, sum indices `1..3` is `14-2=12`.

#### CONNECTIONS TO OTHER TOPICS
Subarray sum `k`, range queries, difference arrays, Fenwick/segment trees, 2D integral images, cumulative distributions, and modular-prefix classes.

#### CODE / EXAMPLE (if applicable)
```text
prefix[0] = 0
for i in 0..n-1:
    prefix[i+1] = prefix[i] + a[i]

rangeSum(l, r): return prefix[r+1] - prefix[l]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define exactly what an index stores and derive the subtraction. Test `l=0`, empty input, and overflow. Avoid mixing inclusive array indices with a prefix array that lacks the leading zero.

#### ONE-LINE SUMMARY
Prefix sums cache totals from the start, so any static range sum is one endpoint subtraction in `O(1)`.

---

### POWER OF TWO, XOR CANCELLATION, SWAP, AND BIT MASKS ⚡⚠️
**Covers questions: 202, 203, 204, 205**

#### CORE CONCEPT (30 seconds)
A positive power of two has exactly one set bit, so `n > 0 && (n & (n-1)) == 0`. XOR is associative, commutative, has identity zero, and self-cancels; XORing an array where every value appears twice except one leaves the singleton. A bit mask selects positions so OR sets, AND clears/tests, and XOR toggles bits. XOR swap works algebraically but is inferior to a temporary variable and fails if both references alias the same storage.

#### WHY IT EXISTS
Bitwise representations let one machine operation encode set membership or algebraic cancellation without auxiliary collections. The value comes from a stated invariant, not cryptic syntax.

#### MENTAL MODEL
A mask is a stencil over switches. A power of two has exactly one switch on. XOR is a parity switch: seeing the same value twice turns its contribution on then off.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Power-of-two identity; singleton by XOR in `O(n)`/`O(1)`; bit `i`: set `x|1<<i`, clear `x&~(1<<i)`, toggle `x^1<<i`, test `x&(1<<i)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  `n-1` clears the only set bit of a power of two while changing lower bits. Singleton XOR assumes exactly one unpaired value and all others occur exactly twice. Parenthesise shifts/masks and use unsigned/wide mask types appropriately.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zero satisfies the bit expression unless explicitly excluded; signed negatives need domain constraints. XOR swap sequence `a^=b; b^=a; a^=b` works only for distinct storage locations and is less readable, may block optimisations, and can zero a value when aliased. Built-in bitsets/flags should document bit positions; shifts by/exceeding word width are language-specific or invalid.

#### ALL VARIATIONS COVERED
- **Q202:** Return `n>0 && (n&(n-1))==0`; `n>0` is essential. ⚠️ Zero is not a power of two.
- **Q203:** XOR swap follows cancellation identities, but use a temporary variable in production. ⚠️ If `a` and `b` reference the same location, the first XOR can zero it.
- **Q204:** XOR every element; paired values cancel and the singleton remains in `O(n)` time and `O(1)` space.
- **Q205:** A mask isolates selected bits; e.g. `permissions |= WRITE` sets and `(permissions & WRITE)!=0` tests a permission flag.

#### CONNECTIONS TO OTHER TOPICS
Hamming weight, missing number, parity, flags/permissions, subsets, Bloom filters, two-singleton variants, bitsets, and integer representation.

#### CODE / EXAMPLE (if applicable)
```text
isPowerOfTwo(n): return n > 0 and (n & (n - 1)) == 0

single = 0
for x in a: single ^= x

mask = 1 << i
set:    x |= mask
clear:  x &= ~mask
toggle: x ^= mask
test:   (x & mask) != 0
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain each identity with a binary example and state input assumptions. Recognise XOR swap as an interview curiosity, not superior engineering. Avoid using XOR singleton logic when values can appear three times or multiple singletons exist without adapting the method.

#### ONE-LINE SUMMARY
Bit masks target switches, `n&(n-1)` removes the lowest set bit, and XOR parity cancels pairs—but XOR swap is cleverer than it is useful.

---

### GENERATING K-COMBINATIONS ⚡
**Covers questions: 206**

#### CORE CONCEPT (30 seconds)
Backtrack with a `start` index and current path. Choose each candidate from `start` onward, recurse with the next index, then undo. Record only when path size is `k`. There are `C(n,k)` outputs, so copying them costs `O(k·C(n,k))`; recursion/path space is `O(k)` excluding output.

#### WHY IT EXISTS
Unlike permutations, combinations ignore order. Advancing `start` ensures each set is generated once in increasing input-index order rather than producing every ordering.

#### MENTAL MODEL
Choose a committee by moving forward through a roster; once a person is skipped or selected, never go backward and reorder the same committee.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Start-index backtracking, base case path size `k`, choose/recurse/unchoose.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Prune when remaining elements are fewer than remaining slots. Loop only through `n - needed`, inclusively. Validate `0<=k<=n`; `k=0` returns one empty combination.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicate input plus unique-value combinations needs sorting and same-depth duplicate skipping. A bitmask with exactly `k` bits or iterative next-combination algorithms are alternatives. Output size dominates and cannot be made polynomial in `n` for central `k`.

#### ALL VARIATIONS COVERED
- **Q206:** Use increasing start-index backtracking to generate each size-`k` subset exactly once, with output-sensitive `O(k·C(n,k))` work.

#### CONNECTIONS TO OTHER TOPICS
Power sets, permutations, subset sum, binomial coefficients, backtracking pruning, bit masks, and combinatorial generation.

#### CODE / EXAMPLE (if applicable)
```text
choose(start):
    if path.size == k: output copy(path); return
    needed = k - path.size
    for i in start .. n-needed:
        path.add(a[i])
        choose(i + 1)
        path.removeLast()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Contrast combinations with permutations and derive the loop bound. Mention output complexity and `k=0`. Avoid restarting the loop at zero, which creates duplicates/orderings.

#### ONE-LINE SUMMARY
Advance a start index while choosing exactly `k` items so every unordered combination appears once.

---

### MINIMUM RAILWAY PLATFORMS ⚡⚠️
**Covers questions: 207**

#### CORE CONCEPT (30 seconds)
The minimum platforms equal the maximum number of trains present simultaneously. Sort arrival times and departure times independently; use two pointers. If the next arrival occurs before a platform becomes free, increment current platforms; otherwise process a departure and decrement. Track the maximum. Time is `O(n log n)`, extra space depends on sorting.

#### WHY IT EXISTS
Platform identity does not matter—only overlapping occupancy. Separating sorted start/end events reduces interval allocation to a sweep-line count.

#### MENTAL MODEL
Walk a timeline: every arrival opens one active interval, every departure closes one, and the highest counter is the required number of platforms.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort arrivals/departures, sweep with two pointers, record maximum overlap.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify equal-time convention: if a departure at time `t` frees a platform before an arrival at `t`, process departure first (`arrival < departure` to allocate); if not, process arrival first (`arrival <= departure`). A min-heap of active departure times is an alternative.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Sorting arrival/departure arrays independently is safe because only event counts matter, not pairing. Input time strings should be converted to comparable minutes. Sweep-line generalises to meeting rooms and concurrent resource capacity; event tie ordering encodes closed/open interval semantics.

#### ALL VARIATIONS COVERED
- **Q207:** Sweep sorted arrival/departure events and return maximum active count. ⚠️ State whether an equal-time departure frees the platform before the arrival.

#### CONNECTIONS TO OTHER TOPICS
Meeting rooms, interval overlap, sweep lines, event sorting, min-heaps, resource allocation, and half-open intervals.

#### CODE / EXAMPLE (if applicable)
```text
sort(arrivals); sort(departures)
i=0; j=0; active=0; answer=0
while i<n:
    if arrivals[i] < departures[j]:
        active++; answer=max(answer,active); i++
    else:
        active--; j++
```

This version treats departure at the same time as freeing the platform first.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Translate the problem to maximum overlap and state tie semantics before coding. Dry-run simultaneous trains. Avoid pairwise conflict checking (`O(n²)`) or assuming one platform per arrival without processing departures.

#### ONE-LINE SUMMARY
Minimum platforms are maximum active train intervals during a correctly tie-ordered arrival/departure sweep.

---

### MAXIMUM CIRCULAR SUBARRAY SUM ⚡⚠️
**Covers questions: 208**

#### CORE CONCEPT (30 seconds)
The best circular subarray is either non-wrapping—the normal Kadane maximum—or wrapping, which includes everything except one minimum-sum contiguous middle segment. Compute `normalMax`, `total`, and `minSubarray`; answer `max(normalMax, total-minSubarray)`, except when all numbers are negative, where return `normalMax` to avoid selecting the empty complement.

#### WHY IT EXISTS
Any wrapped prefix+suffix selection can be viewed as the whole array with one contiguous middle interval removed. That converts circular structure into ordinary maximum/minimum subarray problems.

#### MENTAL MODEL
A circular necklace's chosen arc either stays within the cut or crosses it. If it crosses, describe it by removing the worst unchosen arc from the full necklace.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Kadane max plus total-minus-Kadane-min, `O(n)` time/`O(1)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Update current/global maximum and minimum in one pass. If `normalMax<0`, all values are negative and wrapping candidate equals zero/empty, so reject it.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify whether empty subarray is allowed; typical problem requires non-empty. Use wide sums. An alternative negates values to find minimum, but negating minimum integer can overflow. Reconstruction requires tracking max/min interval boundaries and complement endpoints.

#### ALL VARIATIONS COVERED
- **Q208:** Return max of ordinary Kadane and `total-minSubarray`, but return ordinary maximum for an all-negative array. ⚠️ The complement method otherwise chooses an invalid empty subarray.

#### CONNECTIONS TO OTHER TOPICS
Kadane's algorithm, minimum subarray, circular arrays, prefix/suffix maxima, complement transformations, and interval reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
total = 0
curMax=globalMax=a[0]
curMin=globalMin=a[0]
for each x (handling first consistently):
    curMax=max(x,curMax+x); globalMax=max(globalMax,curMax)
    curMin=min(x,curMin+x); globalMin=min(globalMin,curMin)
    total+=x
if globalMax < 0: return globalMax
return max(globalMax,total-globalMin)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the complement proof and all-negative guard before code. State non-empty assumption. Avoid duplicating the array and applying quadratic enumeration.

#### ONE-LINE SUMMARY
A circular optimum is either Kadane's normal maximum or total minus the minimum middle segment—with an all-negative guard.

---

### NP, NP-HARD, AND NP-COMPLETE ⚡⚠️
**Covers questions: 209**

#### CORE CONCEPT (30 seconds)
NP is the class of decision problems whose proposed solutions can be verified in polynomial time. A problem is NP-Hard if every NP problem can be polynomial-time reduced to it; it need not itself be a decision problem or belong to NP. NP-Complete problems are both in NP and NP-Hard—the hardest decision problems inside NP.

#### WHY IT EXISTS
The classification separates finding solutions from efficiently verifying them and relates problems through reductions. If any NP-Complete problem has a polynomial-time solution, then every NP problem does and `P=NP`.

#### MENTAL MODEL
NP problems have certificates a checker can grade quickly. NP-Hard problems are at least as hard as every such exam. NP-Complete problems are the hardest exams that still have quickly checkable answer sheets.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `P ⊆ NP`. NP = polynomial verification. NP-Hard = all NP reduces to it. NP-Complete = NP ∩ NP-Hard.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  To prove NP-Complete: show the problem is in NP, then reduce a known NP-Complete problem **to** it in polynomial time. Examples: SAT and decision TSP are NP-Complete; optimisation TSP is NP-Hard.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  NP does not mean “non-polynomial” or “not possible”; it means nondeterministic polynomial time/equivalently polynomial certificate verification. NP-Hard problems may be undecidable or lack polynomially checkable certificates. Reduction direction is crucial: known-hard → new problem proves new problem at least as hard.

#### ALL VARIATIONS COVERED
- **Q209:** Define membership, hardness, intersection, and reduction direction. ⚠️ Whether `P=NP` remains unknown; do not say NP means “not polynomial.”

#### CONNECTIONS TO OTHER TOPICS
P versus NP, polynomial reductions, SAT, TSP, approximation, parameterised algorithms, exponential backtracking, and certificate verification.

#### CODE / EXAMPLE (if applicable)
```text
NP-Complete proof template:
1. Membership: given a certificate, verify it in polynomial time.
2. Hardness: transform every instance of known NP-Complete A
   into an instance of target B in polynomial time,
   with yes(A) iff yes(B).
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Draw the set relationship and explain reduction direction. Use decision versus optimisation TSP to distinguish NP-Complete/NP-Hard. Avoid confident claims about `P≠NP`; it is widely believed, not proved.

#### ONE-LINE SUMMARY
NP has quickly verifiable decision certificates, NP-Hard is at least as hard as all NP, and NP-Complete is both.

---

### DIAMETER OF A BINARY TREE ⚡⚠️
**Covers questions: 210**

#### CORE CONCEPT (30 seconds)
The diameter is the longest path between any two tree nodes and need not pass through the root. In one postorder traversal, return each node's height; the best path through that node uses its left height plus right height. Update a global/returned diameter and take `1+max(left,right)` as height. Time is `O(n)`, stack `O(h)`.

#### WHY IT EXISTS
A longest path has a highest turning point. At that point it combines the deepest downward path from the left and right subtrees, so computing heights supplies the diameter candidate without recomputing depths for every node.

#### MENTAL MODEL
At each junction, ask for the deepest tunnel down each side. Joining the two tunnels gives the longest path whose highest point is this junction.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Postorder heights plus global maximum. Linear time; diameter may be counted in edges or nodes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With null height `0` and leaf height `1`, `leftHeight+rightHeight` counts diameter edges; add one for node count. Return both `(height,diameter)` instead of mutable global if preferred.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Naively computing height separately at every node can be `O(n²)` on a skewed tree. Empty-tree diameter convention should be stated. Deep recursion risks stack overflow. The same postorder pattern handles balance checking and maximum path sum, but weighted/negative-node variants need adjusted state.

#### ALL VARIATIONS COVERED
- **Q210:** Compute subtree heights once and maximise `leftHeight+rightHeight`; clarify edge-versus-node definition. ⚠️ The longest path does not have to cross the root.

#### CONNECTIONS TO OTHER TOPICS
Tree height, postorder DP, maximum path sum, balanced-tree checks, recursion, rerooting, and graph/tree longest paths.

#### CODE / EXAMPLE (if applicable)
```text
diameter = 0
height(node):
    if node == null: return 0
    left = height(node.left)
    right = height(node.right)
    diameter = max(diameter, left + right) // edges
    return 1 + max(left, right)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define units and invariant before coding. Explain why one postorder pass is sufficient and contrast with the quadratic naive method. Avoid returning only root's left height plus right height.

#### ONE-LINE SUMMARY
Tree diameter is the largest sum of left/right subtree heights at any node, found in one postorder traversal.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q201 (prefix sums)** connects directly to subarray counts, divisible-sum ranges, 2D range sums, and difference arrays.
- **Q202–Q205 (bits)** prepare target masks, combinations, lowbit/Fenwick trees, XOR basis ideas, and compact state DP.
- **Q206 (combinations)** connects to subsets of size `k` with a target sum and combinatorial backtracking.
- **Q207 (platforms)** leads to meeting-room scheduling, interval colouring, sweep lines, and min-heap allocation.
- **Q208 (circular maximum)** later appears almost verbatim and connects to Kadane/complement patterns.
- **Q209 (complexity)** prepares NP-Hard/NP-Complete, TSP, approximation, and combinatorial explosion.
- **Q210 (diameter)** prepares tree flattening, maximum path, and subtree DP.

### Be Comfortable With Before Batch 22 (Questions 211–220)

- In-place binary-tree flattening and preorder links.
- Tarjan low-link values for articulation points.
- Bipartite checking with two-colour BFS/DFS.
- Prim's MST implementation.
- Stack using one/two queues.
- Jump Game's greedy farthest-reachable invariant.
- Grid-path DP with obstacles.
- Equal-partition/subset-sum DP.
- Longest repeated subarray (longest common substring) DP.
- Master Theorem cases and applicability conditions.

### Batch 21 Rapid Recall

201. Prefix range sum = `prefix[r+1]-prefix[l]`.
202. Positive power of two: `(n&(n-1))==0`.
203. XOR swap works algebraically but is unsafe/unhelpful in real code.
204. Pairwise XOR cancellation leaves the singleton.
205. Masks set, clear, toggle, or test selected bits.
206. K-combinations use increasing-index backtracking.
207. Platforms equal maximum tie-aware interval overlap.
208. Circular maximum = max(Kadane max, total−Kadane min), except all-negative.
209. NP-Complete = NP and NP-Hard.
210. Diameter maximises left height + right height at every node.
