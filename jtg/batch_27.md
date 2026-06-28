# JTG Technical Interview Coaching — Batch 27

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 261–270

## Questions in This Batch

261. ⚡ Explain maximum-weight matching in a bipartite graph.
262. ⚡⚠️ Find the minimum pancake flips needed to sort an array.
263. ⚡ Find size-`k` subsets whose sum equals a target.
264. ⚠️ Find the maximum length of a string decoded by a rule.
265. ⚡ Explain interval-graph colouring and its greedy solution.
266. ⚡ Find the longest subarray with at most `k` distinct values.
267. ⚡ Explain Sprague–Grundy using Nim.
268. ⚡ Find minimum character deletions needed to make two strings anagrams.
269. ⚡⚠️ Count ways to form a target string from a dictionary using DP.
270. ⚡⚠️ Solve Broken Calculator: reach `Y` from `X` using only `+1` or `×2`.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Weighted bipartite assignment | 261 | Maximum-weight matching is an assignment/min-cost-flow optimisation problem. |
| B | Exponential state/backtracking search | 262, 263 | Minimum prefix reversals need shortest-state search; fixed-size target subsets use constrained combination search. |
| C | Rule-driven string DP/parsing | 264, 269 | Both require the decoding/word-usage grammar to define a meaningful state recurrence. |
| D | Interval/resource windows | 265, 266 | Interval colouring tracks active intervals; at-most-`k` distinct tracks an active value-frequency window. |
| E | Impartial combinatorial games | 267 | Sprague–Grundy reduces each position to a Nim-equivalent xor value. |
| F | Character-frequency reconciliation | 268 | Anagram deletion depends only on count differences, not order. |
| G | Reverse greedy arithmetic | 270 | Reversing monotonic operations exposes forced/beneficial predecessor choices. |

---

### MAXIMUM-WEIGHT BIPARTITE MATCHING ⚡
**Covers questions: 261**

#### CORE CONCEPT (30 seconds)
Model left/right vertices as workers/jobs and edge weights as benefit. For a complete balanced assignment, use the Hungarian algorithm in `O(n³)`, converting maximum weight to minimum cost with `cost=C−weight` or negated weights. For sparse graphs or optional cardinality, min-cost max-flow is a flexible alternative; add zero-weight dummy vertices when unmatched choices are allowed.

#### WHY IT EXISTS
Choosing each locally largest edge can block a better global pairing because every vertex may be used at most once. Matching algorithms account for opportunity cost across assignments.

#### MENTAL MODEL
Assign each candidate to at most one role and each role to at most one candidate; the best-looking individual pair may consume someone needed for a much more valuable pairing elsewhere.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Bipartite matching has two disjoint vertex sets; maximum-weight matching maximises total selected edge weight under degree ≤1.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Hungarian solves square assignment; pad rectangular sides with dummies. Min-cost max-flow creates source→left→right→sink capacities 1 and sends desired flow while minimising negative weight/cost.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Distinguish maximum-weight matching of any cardinality, maximum-cardinality then maximum-weight, and perfect assignment—negative weights change which is preferred. Missing edges are forbidden, not simply zero unless modelled deliberately. Hopcroft–Karp solves unweighted maximum cardinality, not weighted objective.

#### ALL VARIATIONS COVERED
- **Q261:** Choose Hungarian for dense perfect assignment or min-cost flow for sparse/optional matching; state cardinality, missing-edge, and negative-weight semantics first.

#### CONNECTIONS TO OTHER TOPICS
Assignment problem, augmenting paths, min-cost max-flow, Hungarian algorithm, Hopcroft–Karp, dual variables, and scheduling.

#### CODE / EXAMPLE (if applicable)
```text
Flow model:
source -> each left vertex       capacity 1, cost 0
left u -> right v (allowed edge) capacity 1, cost -weight(u,v)
each right vertex -> sink        capacity 1, cost 0
min-cost flow of required size -> maximum total weight
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify objective/cardinality and explain why greedy edges fail. Name the correct algorithm with complexity rather than trying to reproduce Hungarian internals from memory. Avoid treating absent edges as legitimate zero-profit assignments.

#### ONE-LINE SUMMARY
Maximum-weight bipartite matching is a global assignment problem solved by Hungarian or min-cost flow after defining cardinality and dummy/unmatched rules.

---

### PANCAKE SORTING AND SIZE-K TARGET SUBSETS ⚡⚠️
**Covers questions: 262, 263**

#### CORE CONCEPT (30 seconds)
A pancake move reverses a prefix. The common greedy pancake sort brings the next-largest value to the front, then flips it into its final position, but it does **not** guarantee minimum flips. Exact minimum for small `n` is shortest-path search over permutations using BFS/bidirectional BFS (each prefix flip is an edge). Size-`k` target subsets use start-index backtracking, choosing values while tracking remaining count and sum.

#### WHY IT EXISTS
Both search a combinatorial state space. BFS guarantees the fewest unit-cost flips. Subset backtracking prunes branches that cannot supply enough elements or reach the target under stated value assumptions.

#### MENTAL MODEL
Pancake states are rooms connected by prefix-flip doors; BFS finds the fewest doors. Target subsets build a committee while tracking seats and remaining budget.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Exact pancake minimum: BFS over permutations, up to factorial states. Size-`k` subsets: choose/recurse/unchoose with increasing index.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Pancake neighbours reverse prefix lengths `2..n`; canonicalise state and store visited/distance. Subsets stop when chosen count is `k`, record only if sum matches, and prune when remaining elements are insufficient.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Bidirectional BFS reduces frontier depth; IDA* with breakpoint heuristics handles somewhat larger pancake instances. Duplicate pancake values require a state definition beyond permutations. For sorted non-negative subset values, sum bounds prune; negatives invalidate simple “sum exceeded target” pruning. Meet-in-the-middle helps larger `n`.

#### ALL VARIATIONS COVERED
- **Q262:** Use BFS/bidirectional BFS for minimum flips; ordinary greedy pancake sorting only gives a bounded valid sequence, not the optimum. ⚠️ Distinguish “sort” from “minimum moves.”
- **Q263:** Backtrack with increasing indices, exactly `k` choices, and a running target; prune only under justified value/order assumptions.

#### CONNECTIONS TO OTHER TOPICS
Shortest paths in implicit graphs, BFS/IDA*, permutation ranking, backtracking, combinations, subset sum, meet-in-the-middle, and admissible heuristics.

#### CODE / EXAMPLE (if applicable)
```text
choose(start,needed,remaining):
    if needed==0:
        if remaining==0: output path
        return
    if n-start < needed: return
    for i from start to n-needed:
        path.add(a[i])
        choose(i+1,needed-1,remaining-a[i])
        path.removeLast()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Call out factorial/exponential complexity honestly and separate exact from heuristic/greedy. State duplicate/negative assumptions for subset pruning. Avoid claiming the standard two-flips-per-position pancake algorithm is minimal.

#### ONE-LINE SUMMARY
Minimum pancake flips are a shortest path over permutation states; size-`k` target subsets are constrained combination backtracking.

---

### RULE-BASED DECODING AND DICTIONARY FORMATION DP ⚡⚠️
**Covers questions: 264, 269**

#### CORE CONCEPT (30 seconds)
Both prompts need the rule specified. For a nested run-length encoding such as `3[a2[c]]`, compute decoded **length** with a stack of `(previousLength,repeatCount)` and combine `previous + repeat·current` without constructing the string. For the common dictionary-word formation/word-break-count model, let `dp[i]` be ways to form target prefix `target[0..i)`; for each matching dictionary word at `i`, add `dp[i]` to `dp[i+word.length]`.

#### WHY IT EXISTS
Decoded strings can be exponentially larger than input, so length arithmetic avoids materialisation. Dictionary formation has overlapping prefix endpoints; DP counts every segmentation once.

#### MENTAL MODEL
Nested decoding is algebra on lengths inside brackets. Dictionary DP places word tiles end-to-end and counts how many paths reach each target boundary.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Define grammar/reuse/order first. Word-break count uses prefix DP with `dp[0]=1`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Parse multi-digit repeat counts and nested brackets; use wide/capped length arithmetic. For dictionary DP, use a trie to walk target characters from each reachable `i`, adding ways at terminal nodes and avoiding testing every full word.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Maximum decoded length” could instead mean digit-to-letter decodings, deletion choices, or grammar ambiguity—each is a different DP. Dictionary words may be reusable or single-use, ordered or column-constrained; Q269's wording does not specify. Counts can overflow; modulo requirements matter. Empty-target convention usually has one empty construction internally.

#### ALL VARIATIONS COVERED
- **Q264:** Ask for the exact decode grammar. Under nested repeat encoding, parse and multiply lengths without materialising output. ⚠️ There is no unique algorithm without the rule.
- **Q269:** Under reusable word-break counting, use prefix DP/trie transitions. ⚠️ Confirm reuse, order, and whether words are dictionary tokens or column choices.

#### CONNECTIONS TO OTHER TOPICS
Parsing, stacks, formal grammars, word break, tries, DAG path counting, big integers, overflow caps, and string DP.

#### CODE / EXAMPLE (if applicable)
```text
dp[0]=1
for i in 0..target.length-1:
    if dp[i]==0: continue
    trieNode=root
    for j from i onward while target[j] is trie child:
        trieNode=child(target[j])
        if trieNode.isWord: dp[j+1]+=dp[i]
return dp[target.length]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Refuse to guess silently; define the grammar and counting identity. Explain state boundaries and avoid constructing enormous decoded output. Ambiguity detection here is a strength, not evasiveness.

#### ONE-LINE SUMMARY
Specify the grammar first, then compute decoded lengths algebraically or count dictionary segmentations with prefix DP.

---

### INTERVAL GRAPH COLOURING AND AT-MOST-K DISTINCT WINDOWS ⚡
**Covers questions: 265, 266**

#### CORE CONCEPT (30 seconds)
Interval-graph colouring assigns different colours/resources to overlapping intervals. Sort by start time and keep active colours in a min-heap by finish; reuse the earliest-finished colour when compatible, otherwise create one. The number of colours equals maximum overlap. For longest subarray with at most `k` distinct values, keep a frequency-map window, expand right, and shrink left until distinct count is at most `k`.

#### WHY IT EXISTS
Both track an active set along an ordered axis. Interval colouring frees resources when intervals end. Sliding windows remove left values when category capacity is exceeded.

#### MENTAL MODEL
Assign meeting rooms as meetings start, always reusing the room that becomes free first. The subarray window is a basket allowing only `k` different item types.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Interval colouring/min rooms: sort + min-heap, `O(n log n)`. At-most-`k` distinct: frequency map + two pointers, expected `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Define endpoint compatibility (`end<=start` for half-open intervals). To output colours, heap stores `(end,colourId)`. Window decrements/removes zero-frequency keys and updates maximum after restoring validity.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Interval graphs are perfect: chromatic number equals clique number/maximum simultaneous overlap, which is why greedy chronological allocation is optimal. For exactly `k` distinct, longest can use the same at-most window but require distinct count equality; count of subarrays exactly `k` equals atMost(k)−atMost(k−1).

#### ALL VARIATIONS COVERED
- **Q265:** Allocate/reuse colours using an earliest-finish heap; colours needed equal max overlap under stated endpoint semantics.
- **Q266:** Maintain a frequency window and shrink while map size exceeds `k`; answer maximum valid width.

#### CONNECTIONS TO OTHER TOPICS
Meeting rooms/platforms, sweep lines, interval graphs, perfect graphs, sliding windows, frequency maps, and exactly-k counting.

#### CODE / EXAMPLE (if applicable)
```text
left=0; freq={}; best=0
for right,x in array:
    freq[x]++
    while freq.size>k:
        y=array[left++]; freq[y]--
        if freq[y]==0: remove y
    best=max(best,right-left+1)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the active-set invariant and tie semantics. Explain why maximum overlap lower-bounds and the greedy achieves the number of colours. Avoid confusing graph colouring in general (NP-Hard) with interval-graph colouring.

#### ONE-LINE SUMMARY
Chronological active sets solve both: reuse the earliest-free interval colour, or shrink a value window until at most `k` types remain.

---

### SPRAGUE–GRUNDY AND NIM ⚡
**Covers questions: 267**

#### CORE CONCEPT (30 seconds)
For a finite impartial normal-play game, assign each position a Grundy number equal to `mex` of its option Grundy numbers. The disjoint sum of games has Grundy number equal to xor of component values. In Nim, a pile of size `s` has Grundy `s`, so a position is losing exactly when xor of all pile sizes is zero.

#### WHY IT EXISTS
Sprague–Grundy proves every such game position is equivalent to a Nim heap. XOR composes independent subgames and identifies whether a move to a losing state exists.

#### MENTAL MODEL
Replace every mini-game with an equivalent Nim pile label; xor all labels. Zero means every move gives the opponent a nonzero reply position.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `grundy(state)=mex{grundy(next)}`; xor zero is losing, nonzero is winning.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  In Nim, find a winning move by reducing some pile so total xor becomes zero: target size `pile ^ totalXor`, valid when smaller than current pile.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The theorem assumes impartial moves, normal play (last move wins), finite/no infinite-cycle game graph, and independent sum. Misère Nim (last move loses) needs an endgame adjustment; partisan games are outside the theorem.

#### ALL VARIATIONS COVERED
- **Q267:** Explain mex, xor composition, and Nim's zero-xor criterion with a small pile example.

#### CONNECTIONS TO OTHER TOPICS
Game DP, mex, XOR, impartial games, DAG states, Nim, misère play, and winning-strategy construction.

#### CODE / EXAMPLE (if applicable)
```text
piles=[3,4,5]; xor=3^4^5=2 (winning)
For pile 3: target=3^2=1 < 3
Reduce 3 -> 1; new xor=1^4^5=0
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State theorem assumptions and construct the zero-xor move. Avoid saying every game is Nim-equivalent without impartial/normal/finite conditions.

#### ONE-LINE SUMMARY
Grundy numbers turn impartial subgames into Nim heaps, and xor zero characterises losing positions.

---

### MINIMUM DELETIONS TO MAKE TWO STRINGS ANAGRAMS ⚡
**Covers questions: 268**

#### CORE CONCEPT (30 seconds)
Count each character in both strings. For every character, the surplus `abs(countA−countB)` must be deleted from one side, so the minimum total deletions is the sum of absolute frequency differences. Time is `O(|A|+|B|+alphabet)` and space depends on the alphabet.

#### WHY IT EXISTS
Anagrams care only about character multisets, not order. Every matched occurrence can remain; every unmatched surplus occurrence is forced to be deleted.

#### MENTAL MODEL
Lay letter tiles from both strings into labelled bins. Pair tiles in each bin; all unpaired tiles are exactly the required deletions.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Frequency difference, not LCS; sum absolute counts.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  One map/array can increment for A and decrement for B, then sum absolute values. Clarify case, spaces, punctuation, and Unicode normalization.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If deletions must make strings equal **without reordering**, answer becomes `|A|+|B|−2·LCS`, a different problem. For anagrams, order is irrelevant. Grapheme clusters versus code points may matter for human text.

#### ALL VARIATIONS COVERED
- **Q268:** Sum absolute character-count differences; every surplus character must be deleted and this is sufficient.

#### CONNECTIONS TO OTHER TOPICS
Anagram grouping, frequency maps, multiset intersection, LCS distinction, Unicode normalization, and edit distance.

#### CODE / EXAMPLE (if applicable)
```text
count={}
for ch in A: count[ch]++
for ch in B: count[ch]--
answer=sum(abs(v) for v in count.values)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove necessity/sufficiency through unmatched counts and distinguish anagram from equal-string deletion. Avoid sorting unless simplicity outweighs linear frequency counting.

#### ONE-LINE SUMMARY
Minimum anagram deletions are exactly the unmatched character multiplicities: sum of absolute frequency differences.

---

### BROKEN CALCULATOR WITH +1 AND ×2 ⚡⚠️
**Covers questions: 270**

#### CORE CONCEPT (30 seconds)
The source variant allows forward `+1` and `×2`, so operations only increase. Work backward from `Y`: if `Y` is odd, its only valid immediate predecessor is `Y−1`; if even and `Y/2>=X`, halving dominates decrementing; otherwise decrement until reaching `X`. If `X>Y`, the target is unreachable with these operations.

#### WHY IT EXISTS
Backward reasoning turns forward branching into mostly forced choices. An odd target cannot result from doubling, while halving an eligible even target removes far more distance in one step than subtracting one.

#### MENTAL MODEL
Undo the calculator: odd displays must undo a previous `+1`; even displays may undo a doubling as long as that does not fall below the starting value.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Reverse operations are `−1` and `/2 when even`; use `/2` only if result remains at least `X`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Loop while `Y>X`; odd or unsafe-half → `Y--`, else `Y/=2`. Complexity is logarithmic plus a small boundary decrement tail; with `X<=Y` it is efficient and constant space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This is **not** the common LeetCode variant whose forward operations are `×2` and `−1`; that version reverses odd `Y` with `+1`. Here, reversing odd uses `−1`. State reachability for `X>Y`, zero/negative domains, and overflow if reasoning forward.

#### ALL VARIATIONS COVERED
- **Q270:** Reverse from `Y` using forced odd decrement and safe even halving. ⚠️ Do not copy the classic `×2/−1` solution; the prompt says `+1/×2`.

#### CONNECTIONS TO OTHER TOPICS
Reverse greedy, shortest paths on integers, parity, Euclidean-style shrinking, BFS, and operation inversion.

#### CODE / EXAMPLE (if applicable)
```text
if X>Y: return IMPOSSIBLE
moves=0
while Y>X:
    if Y even and Y/2>=X: Y/=2
    else: Y-=1
    moves++
return moves
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Read the allowed operations exactly, prove forced odd behavior, and test `X=5,Y=8` where halving below `X` would be invalid. Avoid pattern-matching to a similarly named problem.

#### ONE-LINE SUMMARY
For forward `+1/×2`, reverse odd targets by `−1` and safely halve even targets without crossing below `X`.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q261 (matching)** connects to flow networks, assignment, and scheduling.
- **Q262/Q263 (search)** connect to implicit-state BFS, backtracking, and subset-sum variants.
- **Q264/Q269 (string rules)** prepare automata, forbidden patterns, word-break counting, and parsing.
- **Q265/Q266 (active windows)** connect to interval allocation and at-most-k sliding windows.
- **Q267 (games)** connects XOR/bit reasoning with DAG DP.
- **Q268 (anagrams)** reinforces frequency-map canonicalization.
- **Q270 (reverse greedy)** prepares other integer-operation shortest-path puzzles.

### Be Comfortable With Before Batch 28 (Questions 271–280)

- Automaton/DP counting of strings avoiding a forbidden pattern.
- Knight shortest paths via BFS.
- Russian-doll envelopes (sort + LIS).
- Pair-count definitions and frequency matching.
- Splitting a digit string into three equal-sum parts.
- Equal-sharing/divisibility modelling for chocolate bars.
- Mountain-array two-phase monotonic validation.
- Total digit-count formulas from 1 to `n`.
- Jump Game III graph reachability.
- Catalan-number binary-tree structures.

### Batch 27 Rapid Recall

261. Weighted bipartite assignment: Hungarian or min-cost flow.
262. Minimum pancake flips require shortest-state search, not ordinary greedy sorting.
263. Size-`k` target subsets use constrained start-index backtracking.
264. Decode length needs an explicit grammar.
265. Interval colours equal maximum overlap; reuse earliest-finished colour.
266. At-most-`k` distinct uses a frequency sliding window.
267. Sprague–Grundy combines impartial games by xor.
268. Anagram deletions equal absolute frequency differences.
269. Dictionary formation commonly uses prefix word-break-count DP.
270. For `+1/×2`, reverse odd by `−1` and safely halve even values.
