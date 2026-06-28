# JTG Technical Interview Coaching — Batch 20

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 191–200

## Questions in This Batch

191. ⚡⚠️ Explain how to find the pivot element in a QuickSort partition.
192. ⚡ Check whether a binary tree is symmetric.
193. ⚡ Compute the power set of a set.
194. ⚡ Find the longest common prefix of a list of strings.
195. ⚡ Explain divide-and-conquer with an example other than merge sort.
196. ⚡⚠️ Find a minimum spanning tree and compare Prim's and Kruskal's algorithms.
197. ⚡ Find all prime factors of a number.
198. ⚡⚠️ Find the second-largest array value with a minimum number of comparisons.
199. ⚡⚠️ Count occurrences of a digit in all numbers from 1 to `n`.
200. ⚡⚠️ Count subarrays whose sum equals `k`.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Divide-and-conquer and partitioning | 191, 195 | QuickSort's pivot partitions a problem; binary search illustrates divide-and-conquer without a merge step. |
| B | Recursive mirror structure | 192 | Symmetry is checked by comparing two subtrees in opposite directions. |
| C | Power-set enumeration | 193 | This is nearly identical to Q178, so the reusable include/exclude answer is applied directly. |
| D | String prefix scanning | 194 | The shared prefix can only shrink as more strings are considered. |
| E | Minimum spanning trees | 196 | Prim and Kruskal are two greedy implementations of the same cut-property goal. |
| F | Positional number decomposition | 197, 199 | Factorisation and digit counting exploit numeric position/divisibility rather than iterating all candidates naively. |
| G | Tournament selection | 198 | Minimum-comparison second-largest search retains exactly the values that lost directly to the maximum. |
| H | Prefix-sum frequency counting | 200 | Historical prefix sums convert every target subarray into a complement lookup. |

---

### QUICKSORT PARTITIONING AND DIVIDE-AND-CONQUER ⚡⚠️
**Covers questions: 191, 195**

#### CORE CONCEPT (30 seconds)
In QuickSort, choose a pivot value, partition the range so values on one side satisfy the chosen relation and values on the other satisfy the opposite relation, then recurse on the partitions. With Lomuto partitioning, choose `a[hi]`, keep boundary `i` for values `< pivot`, scan `j`, and finally swap the pivot into index `i`; that returned index is its final sorted position. Divide-and-conquer generally means divide into smaller independent subproblems, solve recursively, and combine; binary search is an example that discards one half and needs no combine step.

#### WHY IT EXISTS
Partitioning establishes enough order to solve left and right independently without sorting everything at once. Divide-and-conquer reduces problem size so recurrence depth/work becomes manageable—binary search shrinks one candidate range by half per comparison.

#### MENTAL MODEL
The pivot is a checkpoint: send smaller items left and larger items right, then place the checkpoint between them. Binary search opens a dictionary near the middle and throws away the impossible half.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Pivot is selected by a rule (first/last/random/median-of-three); partition returns a boundary/final index depending on scheme. Binary search divides a sorted range in half for `O(log n)` time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State Lomuto or Hoare explicitly because their invariants/return values differ. Lomuto pivot ends at its final index; Hoare returns a split boundary and pivot value need not land at that boundary. Random choice reduces the likelihood of repeated poor splits.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Find the pivot” may mean choose a pivot or find its final partition index—clarify. Many duplicates can make two-way partitioning inefficient; three-way `<,=,>` partitioning helps. Divide-and-conquer need not recurse into both halves or perform a combine step: binary search solves only one half.

#### ALL VARIATIONS COVERED
- **Q191:** Choose a pivot according to a stated scheme and partition around it; in Lomuto, the final swap returns the pivot's sorted index. ⚠️ Hoare's returned boundary is not necessarily the pivot's final position.
- **Q195:** Divide-and-conquer divides, recursively solves, and optionally combines; binary search halves a sorted search range and solves only the feasible half in `O(log n)`.

#### CONNECTIONS TO OTHER TOPICS
QuickSort, Quickselect, Dutch-national-flag partition, binary search, recurrence relations, Master Theorem, closest-pair algorithms, and parallel recursion.

#### CODE / EXAMPLE (if applicable)
```text
lomutoPartition(a, lo, hi):
    pivot = a[hi]
    i = lo
    for j in lo..hi-1:
        if a[j] < pivot:
            swap(a[i], a[j]); i++
    swap(a[i], a[hi])
    return i
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the partition scheme and invariant before code. Distinguish selection, value, index, and split boundary. Dry-run duplicates and already sorted input. Avoid combining pseudocode from two partition schemes.

#### ONE-LINE SUMMARY
Partitioning places values around a chosen pivot so recursive halves become independent; binary search is divide-and-conquer that simply discards one half.

---

### SYMMETRIC BINARY TREES ⚡
**Covers questions: 192**

#### CORE CONCEPT (30 seconds)
A tree is symmetric when its left and right subtrees are mirrors: node values match, the left node's left mirrors the right node's right, and left-right mirrors right-left. Recursively compare those pairs in `O(n)` time and `O(h)` call-stack space.

#### WHY IT EXISTS
Symmetry is not equality of left/right trees in the same orientation; it is equality under reflection. Pairwise mirror recursion encodes that structural transformation directly.

#### MENTAL MODEL
Fold the tree down its vertical centre. Every node on one side must land on an equal-valued node at the opposite position.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Two nulls match; one null does not; values must match; compare outer pair and inner pair.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Recursive helper takes two nodes. An iterative queue can enqueue `(left.left,right.right)` and `(left.right,right.left)` pairs. Time is linear; space is `O(h)` recursive or up to `O(w)` queue width.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Empty tree is symmetric. Equal level-order values without null positions are insufficient—shape matters. Deep skew may overflow recursion, so iterative pair processing is safer for unbounded depth.

#### ALL VARIATIONS COVERED
- **Q192:** Compare opposite child pairs recursively/iteratively; matching values alone are insufficient unless mirrored null structure also matches.

#### CONNECTIONS TO OTHER TOPICS
Tree equality, recursion, BFS pair queues, invert/mirror tree, serialization with nulls, balanced trees, and structural induction.

#### CODE / EXAMPLE (if applicable)
```text
mirror(a, b):
    if a == null and b == null: return true
    if a == null or b == null: return false
    return a.value == b.value
       and mirror(a.left, b.right)
       and mirror(a.right, b.left)

isSymmetric(root): return root == null or mirror(root.left, root.right)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say “outer with outer, inner with inner” and handle nulls before values. Draw an asymmetric-shape/equal-values counterexample. Avoid comparing left-left with right-left, which checks equality rather than reflection.

#### ONE-LINE SUMMARY
Tree symmetry is mirror equality: compare opposite child positions and values recursively in linear time.

---

### POWER SET (MERGED WITH Q178) ⚡
**Covers questions: 193**

#### CORE CONCEPT (30 seconds)
This is the same root question as Q178. For each of `n` elements, choose exclude or include, recurse, then undo. The decision tree has `2^n` leaves; copying each subset gives output-sensitive `O(n·2^n)` time and output space, with `O(n)` recursion depth.

#### WHY IT EXISTS
Every subset corresponds one-to-one with an `n`-bit inclusion vector. The method is complete because it explores both possibilities for every item and unique because each decision vector is visited once.

#### MENTAL MODEL
Each element is a yes/no switch; every final configuration is one subset.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Include/exclude backtracking or bit masks from `0` to `2^n-1`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Record a copy at the base case; restore the path after the include branch. Include empty/full sets.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Unique subsets with duplicate input require sorting and skip/frequency logic. Exponential output is unavoidable; lazy iteration reduces retained memory, not total generation.

#### ALL VARIATIONS COVERED
- **Q193:** Reuse Q178's include/exclude power-set algorithm; the wording differs but the answer is identical, so it is intentionally merged rather than repeated.

#### CONNECTIONS TO OTHER TOPICS
Q178, combinations, bit masks, subset sum, recursion trees, Gray codes, and meet-in-the-middle.

#### CODE / EXAMPLE (if applicable)
```text
generate(i):
    if i == n: output copy(path); return
    generate(i + 1)
    path.add(a[i]); generate(i + 1); path.removeLast()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Recognise the repeat and give the invariant/output bound succinctly. Avoid pretending exponential output can be generated in polynomial total time.

#### ONE-LINE SUMMARY
The power set is all `2^n` include/exclude decision vectors, generated by backtracking or bit masks.

---

### LONGEST COMMON PREFIX ⚡
**Covers questions: 194**

#### CORE CONCEPT (30 seconds)
Take the first string as the candidate prefix and compare its characters against every other string; stop at the first mismatch or shortest-string boundary. Each character is examined only as needed, so time is `O(total characters inspected)`—worst `O(N·L)`—and extra space is `O(1)` aside from the returned prefix.

#### WHY IT EXISTS
A common prefix can only stay the same or shrink as more strings are considered. There is no need to compare every string pair or build a trie for a one-time query.

#### MENTAL MODEL
Align all words at the left margin and scan columns until the first column where any word differs or ends.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Vertical scan or repeatedly shrink a candidate prefix. Empty list → empty result; any empty string forces empty prefix.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use the shortest string as the scan bound to avoid repeated length checks. A sort-based method compares only lexicographically first/last strings after `O(N log N)` sorting; a trie helps repeated prefix workloads but costs memory.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify case sensitivity and Unicode/grapheme semantics. Sorting mutates or copies input and is excessive for one query. Divide-and-conquer can merge prefixes pairwise, but total examined characters remain the central cost.

#### ALL VARIATIONS COVERED
- **Q194:** Scan aligned characters until any mismatch/end, or shrink a candidate prefix; return empty for no shared prefix.

#### CONNECTIONS TO OTHER TOPICS
Tries, lexicographic sorting, vertical scanning, string normalization, divide-and-conquer, autocomplete, and prefix compression.

#### CODE / EXAMPLE (if applicable)
```text
if strings empty: return ""
for i in 0..length(shortestString)-1:
    ch = strings[0][i]
    for s in strings:
        if s[i] != ch: return strings[0][0:i]
return shortestString
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State empty/shortest-string cases and complexity in total characters. Compare alternatives only if asked. Avoid using substring creation inside a loop if it makes the implementation unnecessarily costly.

#### ONE-LINE SUMMARY
Scan strings column by column from the start; the common prefix ends at the first mismatch or shortest string.

---

### PRIM VERSUS KRUSKAL FOR MINIMUM SPANNING TREES ⚡⚠️
**Covers questions: 196**

#### CORE CONCEPT (30 seconds)
An MST connects every vertex of a connected undirected weighted graph with `V-1` edges and minimum total weight. Prim grows one tree by repeatedly taking the cheapest edge leaving the current tree, typically `O(E log V)` with an adjacency list/min-heap. Kruskal sorts all edges and adds the next cheapest edge joining different DSU components, `O(E log E)`.

#### WHY IT EXISTS
Network design often needs minimum total connection cost, not shortest routes from one source. Both algorithms are correct through the cut property: the lightest edge crossing an appropriate cut is safe to add.

#### MENTAL MODEL
Prim expands one connected island by the cheapest bridge outward. Kruskal starts many islands and opens roads globally from cheapest upward whenever they connect two different islands.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Prim uses vertex frontier + min-heap. Kruskal uses sorted edges + union–find. Both return MST weight/edges on a connected graph.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Prim fits adjacency representation and is often attractive for dense/connected expansion; with a matrix it can be `O(V²)`. Kruskal is simple for an edge list/sparse graph and naturally yields a minimum spanning forest if disconnected. Negative weights are valid for both.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Equal weights may produce multiple MSTs with identical total weight. MST is not a shortest-path tree. Complexity comparisons depend on graph representation/heap/sort; `log E = O(log V²)=O(log V)` for simple connected graphs. To verify connectedness, require `V-1` accepted edges or all vertices reached.

#### ALL VARIATIONS COVERED
- **Q196:** Explain both greedy rules, data structures, complexities, and connectedness check. ⚠️ Do not use Dijkstra for MST; shortest paths and minimum total tree weight are different objectives.

#### CONNECTIONS TO OTHER TOPICS
Cut/cycle properties, union–find, priority queues, graph connectivity, network design, minimum spanning forests, Dijkstra, and clustering.

#### CODE / EXAMPLE (if applicable)
```text
Kruskal:
sort edges by weight
for (u,v,w) in edges:
    if find(u) != find(v):
        union(u,v); mst.add(edge)
        if mst.size == V-1: break
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State graph assumptions and objective, then compare frontier versus global-edge selection. Mention DSU/heap and cut-property intuition. Avoid simplistic “Prim dense, Kruskal sparse” as an absolute rule without representation context.

#### ONE-LINE SUMMARY
Prim grows one cheapest frontier tree; Kruskal joins cheapest separate components—both use the cut property to minimise total connection cost.

---

### PRIME FACTORS AND POSITIONAL DIGIT COUNTING ⚡⚠️
**Covers questions: 197, 199**

#### CORE CONCEPT (30 seconds)
For prime factors, repeatedly divide by `2`, then try divisors up to `p*p <= remaining`; every accepted divisor is prime after smaller factors have been removed, and a leftover `>1` is prime. For digit occurrences from `1..n`, process each decimal position using `high`, `current`, and `low` rather than iterating every number, giving `O(log n)` time; digit zero needs special handling to exclude leading zeros.

#### WHY IT EXISTS
Factor pairs cross at the square root, so larger composite factors must have a smaller factor already tested. Digit patterns repeat regularly at units, tens, hundreds, etc.; counting full cycles plus a partial cycle avoids `O(n log n)` enumeration.

#### MENTAL MODEL
Factorisation peels off small prime layers until the remaining number is prime. Digit counting watches an odometer: each position cycles predictably through 0–9 while higher digits count full cycles and lower digits determine the partial cycle.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Trial divide through square root and output multiplicity. For a nonzero digit `d` at factor `f`, use `high=n/(10f)`, `cur=(n/f)%10`, `low=n%f` and count full/partial cycles.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use condition `p <= remaining/p` to avoid `p*p` overflow. For nonzero `d`, contribution is `high*f`, plus `f` when `cur>d`, or `low+1` when `cur==d`. For `d=0`, subtract leading-zero cycles: if `high>0`, `(high-1)*f + (cur==0 ? low+1 : f)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify whether factors include multiplicity (`12 → 2,2,3`) or distinct values. Handle `n<2`, negative input (`-1` plus factors), and very large integer methods separately. Digit formula should handle `d∈[0,9]`, `n>=1`, factor overflow, and the fact that number zero is not in range `1..n`.

#### ALL VARIATIONS COVERED
- **Q197:** Repeatedly divide by candidate factors through `sqrt(remaining)` and append any leftover prime; time is `O(sqrt n)` worst case.
- **Q199:** Count each decimal position through full/partial cycles in `O(log n)`. ⚠️ Zero cannot use the ordinary nonzero formula because leading zeros are not written digits.

#### CONNECTIONS TO OTHER TOPICS
Sieve algorithms, primality, divisor enumeration, GCD, positional arithmetic, digit DP, logarithmic counting, overflow, and number formatting.

#### CODE / EXAMPLE (if applicable)
```text
primeFactors(n):
    for p in [2, then 3,5,7,...] while p <= n/p:
        while n % p == 0:
            output p
            n /= p
    if n > 1: output n

// For nonzero digit d at decimal factor f:
count += high*f
if current > d: count += f
else if current == d: count += low + 1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove the square-root bound and explain why discovered divisors are prime. For digits, derive one position with a tiny example rather than presenting a magic formula. Ask which digit and whether zero is included. Avoid scanning every integer when `n` may be large.

#### ONE-LINE SUMMARY
Prime factors come from repeated trial division through the shrinking square root; digit frequencies come from full and partial positional cycles, with zero corrected for leading positions.

---

### SECOND LARGEST WITH MINIMUM COMPARISONS ⚡⚠️
**Covers questions: 198**

#### CORE CONCEPT (30 seconds)
Assuming `n` distinct values, run a knockout tournament to find the maximum in `n-1` comparisons while recording every value that lost directly to it. The second largest must be the largest among those direct losers. For power-of-two `n`, the maximum plays `log₂n` matches, so total comparisons are `n + log₂n - 2`.

#### WHY IT EXISTS
Any value that lost to someone other than the overall maximum cannot be second largest—the winner above it is larger too. Retaining only the maximum's comparison path is the minimum evidence needed.

#### MENTAL MODEL
In a single-elimination tournament, the runner-up in strength must be the strongest player who directly lost to the champion; players defeated by anyone else have at least two players above them.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Tournament finds max with `n-1` comparisons; then scan only direct losers. Power-of-two total `n + log₂n - 2`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Store each competitor with a list/chain of values it directly beats. Pair winners each round, carrying the winner's loser list. Finally find max in champion's loser list.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify “second largest” by rank versus second distinct value and whether duplicates exist; the clean minimum bound assumes distinct values. For non-powers of two, byes make the champion's match count at most `ceil(log₂n)` and the exact comparison count depends on bracket shape. A simple one-pass top-two method is `O(n)` but can use more comparisons.

#### ALL VARIATIONS COVERED
- **Q198:** Use a tournament and search only values that lost directly to the maximum; for distinct power-of-two input, the minimum is `n + log₂n - 2` comparisons. ⚠️ State distinctness/power-of-two assumptions.

#### CONNECTIONS TO OTHER TOPICS
Tournament trees, order statistics, selection lower bounds, top-`k`, heaps, divide-and-conquer, and streaming extrema.

#### CODE / EXAMPLE (if applicable)
```text
Each node stores (winner, directLosers).
Pair nodes:
    larger.winner advances
    append smaller.winner to larger.directLosers
After one champion remains:
    return maximum(champion.directLosers)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Give the lower-bound intuition and comparison count, not only an `O(n)` scan. Clarify duplicates. Avoid scanning all non-maximum values again, which discards the tournament's saved comparison information.

#### ONE-LINE SUMMARY
The second largest is the largest value that lost directly to the tournament champion, giving `n+log₂n-2` comparisons for distinct power-of-two input.

---

### SUBARRAY SUM EQUAL TO K ⚡⚠️
**Covers questions: 200**

#### CORE CONCEPT (30 seconds)
Maintain running prefix sum `prefix` and a frequency map of earlier prefix sums, initialised with `{0:1}`. A subarray ending here sums to `k` when an earlier prefix equals `prefix-k`, so add its frequency to the answer, then record the current prefix. This counts all matching subarrays in expected `O(n)` time and `O(n)` space.

#### WHY IT EXISTS
The sum of subarray `(j+1..i)` is `prefix[i]-prefix[j]`. Rearranging converts every possible start search into a complement lookup, while frequency—not mere presence—counts multiple starts.

#### MENTAL MODEL
Record every odometer total seen so far. At current total `P`, every earlier reading `P-k` marks a journey segment of exactly `k`.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Prefix sum + hash frequency. Initialise zero prefix once. Query before incrementing current prefix.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Map value is count, not index. The method handles negatives, zeros, and overlapping subarrays. Use a wide integer for prefix/answer when sums/counts can overflow.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Sliding window generally fails with negative values because expanding/shrinking is not monotonic; prefix frequencies remain valid. Query-before-record avoids treating the same prefix position as both ends of an empty subarray. For range/query variants, related techniques use prefix arrays, modulo classes, or ordered structures.

#### ALL VARIATIONS COVERED
- **Q200:** Add `freq[prefix-k]` before incrementing `freq[prefix]`, starting with `freq[0]=1`; expected `O(n)`/`O(n)`. ⚠️ Store frequencies to count repeated prefix sums.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, Two Sum complements, hash maps, zero-sum subarrays, sums divisible by `k`, longest subarray, sliding-window limitations, and cumulative counts.

#### CODE / EXAMPLE (if applicable)
```text
freq = {0: 1}
prefix = 0; answer = 0
for x in a:
    prefix += x
    answer += freq.get(prefix - k, 0)
    freq[prefix] = freq.get(prefix, 0) + 1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive `prefix[i]-prefix[j]=k` before code and explain `{0:1}`. Test negatives and repeated zeros. Avoid a variable-size sliding window unless all values satisfy the monotonic assumptions.

#### ONE-LINE SUMMARY
Every target subarray is a pair of prefixes differing by `k`, so count prior `prefix-k` frequencies during one scan.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q191 and Q195 (divide-and-conquer)** connect to Quickselect, binary search, recurrence analysis, and parallel algorithms.
- **Q192 (symmetry)** prepares tree diameter, flattening, balance, and paired-recursion questions.
- **Q193 (power set)** is explicitly the same concept as Q178 and connects to combinations/subset-sum search.
- **Q194 (prefix)** prepares trie/autocomplete, string scanning, and lexicographic techniques.
- **Q196 (MST)** reinforces DSU/heaps and connects to graph clustering/network design.
- **Q197 and Q199 (number math)** prepare sieves, digit DP, modular arithmetic, and positional counting.
- **Q198 (selection)** connects to top-`k`, heaps, median selection, and comparison lower bounds.
- **Q200 (prefix frequencies)** leads directly to prefix-sum technique, divisible-sum, longest-sum, and target-count problems.

### Be Comfortable With Before Batch 21 (Questions 201–210)

- Prefix sums and range-sum preprocessing.
- Power-of-two bit identity `n & (n-1)`.
- XOR properties and why XOR swap is usually a bad production choice.
- Single-nonduplicate XOR cancellation.
- Bit masking to set, clear, toggle, and test bits.
- Combination generation choosing `k` from `n`.
- Minimum railway platforms via sorted arrival/departure events.
- Circular maximum subarray using Kadane plus total-minus-minimum.
- NP, NP-Hard, and NP-Complete definitions.
- Binary-tree diameter via depth computation.

### Batch 20 Rapid Recall

191. State partition scheme; Lomuto returns pivot's final index.
192. Symmetry compares outer/inner mirrored child pairs.
193. Power set is Q178's include/exclude algorithm.
194. Longest common prefix stops at first aligned mismatch.
195. Binary search divides a sorted range and solves one half.
196. Prim grows one tree; Kruskal joins DSU components.
197. Trial-divide through the shrinking square root.
198. Second largest directly lost to tournament maximum.
199. Count decimal-position cycles; correct zero for leading digits.
200. Count prior prefix sums equal to `current-k`.
