# JTG Technical Interview Coaching — Batch 28

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 271–280

## Questions in This Batch

271. ⚡⚠️ Count strings of length `n` that avoid a forbidden pattern.
272. ⚡ Find the minimum knight moves to a target chessboard square.
273. ⚡⚠️ Solve Russian Doll Envelopes.
274. ⚠️ Find the maximum number of pairs formable from an integer array.
275. ⚡⚠️ Count ways to split a digit string into three parts with equal digit sum.
276. ⚠️ Find the minimum chocolate bars needed for equal sharing.
277. ⚡ Determine whether a sequence is a valid mountain array.
278. ⚡ Find the total number of written digits from 1 to `n`.
279. ⚡ Solve Jump Game III: reach an index containing zero using left/right jumps.
280. ⚡⚠️ Generate all binary-tree structures with `n` nodes.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Automaton-constrained string counting | 271 | Pattern-prefix state lets DP count strings without enumerating all alphabet choices. |
| B | Implicit-graph reachability | 272, 279 | Knight moves and Jump Game III are shortest/reachability searches over generated neighbours. |
| C | Ordered-sequence shape | 273, 277 | Envelope nesting reduces to LIS; mountain validation checks one strict rise followed by one strict fall. |
| D | Frequency pairing and divisibility sharing | 274, 276 | Both require a precise pairing/share model before arithmetic is meaningful. |
| E | Digit-prefix/positional counting | 275, 278 | Prefix digit sums count cut pairs; decimal blocks count total written digits. |
| F | Catalan recursive structures | 280 | Each root splits remaining nodes into every left/right size pair. |

---

### COUNTING STRINGS THAT AVOID A FORBIDDEN PATTERN ⚡⚠️
**Covers questions: 271**

#### CORE CONCEPT (30 seconds)
Given an alphabet of size `σ` and a forbidden **substring** pattern of length `m`, build a KMP-style automaton whose state is the longest pattern prefix matching the current suffix. Let `dp[len][state]` count strings reaching a non-accepting state; append every alphabet character through the automaton but discard transitions to state `m`. Complexity is `O(n·m·σ)` after transitions are built, reducible to `O(m)` rolling space.

#### WHY IT EXISTS
Whether a future character completes the pattern depends only on the longest useful suffix/prefix match, not the full string. The automaton compresses exponentially many prefixes into `m` states.

#### MENTAL MODEL
Track how many opening characters of the forbidden word currently appear at the string's tail. Each new character advances that match or falls back; never enter the complete-pattern alarm state.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  State `(position,matchedPrefixLength)`, transition by character, sum all states except full match.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  KMP failure links compute fallback state efficiently. Initialise `dp[0][0]=1`; use modulo/big integers for large counts. For one-character forbidden pattern, simply remove that character from available choices.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Define substring versus subsequence and alphabet. Multiple forbidden patterns use Aho–Corasick automaton plus DP, excluding terminal/failure-terminal states. Matrix exponentiation over the transition-count matrix can handle huge `n` in roughly `O(m³ log n)` (or sparse improvements).

#### ALL VARIATIONS COVERED
- **Q271:** Build a pattern-prefix automaton and count length-`n` walks that never enter the accepting state. ⚠️ Alphabet and substring/subsequence semantics must be specified.

#### CONNECTIONS TO OTHER TOPICS
KMP, finite automata, Aho–Corasick, digit DP, transfer matrices, matrix exponentiation, formal languages, and forbidden-state counting.

#### CODE / EXAMPLE (if applicable)
```text
dp[0][0]=1
for len in 0..n-1:
    for state in 0..m-1:
        for ch in alphabet:
            next=automaton[state][ch]
            if next<m: dp[len+1][next]+=dp[len][state]
answer=sum(dp[n][0..m-1])
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask for alphabet and pattern semantics, then define the compressed state. Explain why no earlier history matters beyond KMP state. Avoid inclusion–exclusion guesses that fail on overlapping pattern occurrences.

#### ONE-LINE SUMMARY
Count non-accepting walks through a KMP prefix automaton, one transition per generated character.

---

### KNIGHT MOVES AND JUMP GAME III AS GRAPH SEARCH ⚡
**Covers questions: 272, 279**

#### CORE CONCEPT (30 seconds)
Treat each valid position/index as a graph vertex. For knight minimum moves on an unweighted board, BFS from the start using eight legal moves; first target discovery gives the minimum. For Jump Game III, DFS/BFS from `start` to neighbours `i−a[i]` and `i+a[i]`, marking visited; succeed when a reached value is zero. Both take linear time in reachable states/edges.

#### WHY IT EXISTS
Neither problem needs an explicitly stored graph: neighbours are generated from the current state. BFS gives unit-edge shortest paths; DFS is enough for yes/no reachability.

#### MENTAL MODEL
Every square/index is a room. Legal jumps are doors. BFS explores rooms by number of doors used; visited marks prevent walking in circles.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Knight: BFS + distance on bounded board. Jump III: BFS/DFS + visited + bounds.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark visited when enqueued/pushed, not when removed, to avoid duplicates. Validate start/target. Knight board may include obstacles; Jump values are non-negative under the common problem definition.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Bidirectional BFS can reduce knight frontier size when both endpoints are known. On an infinite board, symmetry/closed-form observations differ from finite-board BFS. Mutating `arr[i]` to mark visited can be `O(1)` space but must preserve zero detection and may violate input immutability; a boolean set is clearer.

#### ALL VARIATIONS COVERED
- **Q272:** BFS over eight knight neighbours gives minimum moves on an unweighted finite board, `O(board cells)`.
- **Q279:** Traverse `i±a[i]` within bounds with visited tracking; reaching any `a[i]==0` returns true, `O(n)`.

#### CONNECTIONS TO OTHER TOPICS
Implicit graphs, BFS shortest paths, DFS reachability, bidirectional search, state mutation, maze solving, and Jump Game variants.

#### CODE / EXAMPLE (if applicable)
```text
queue=[start]; visited[start]=true
while queue not empty:
    state=queue.popFront()
    if goal(state): return distance[state]
    for next in generatedNeighbours(state):
        if valid(next) and not visited[next]:
            visited[next]=true
            distance[next]=distance[state]+1
            queue.pushBack(next)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say why BFS gives minimum and why DFS also suffices for Jump Game reachability. Define bounds/obstacles. Avoid applying the forward-only Jump Game greedy invariant to Q279, where jumps go both directions and cycles exist.

#### ONE-LINE SUMMARY
Generate legal jumps as unweighted graph edges; BFS gives knight distance, while visited BFS/DFS decides Jump Game III reachability.

---

### RUSSIAN DOLL ENVELOPES AND MOUNTAIN ARRAYS ⚡⚠️
**Covers questions: 273, 277**

#### CORE CONCEPT (30 seconds)
For envelopes `(width,height)`, sort width ascending and height **descending for equal widths**, then find a strictly increasing subsequence of heights in `O(n log n)`; descending tie order prevents equal widths from nesting. A valid mountain has length at least three, strictly increases to an interior peak, then strictly decreases to the end—scan both phases once.

#### WHY IT EXISTS
Sorting resolves one envelope dimension so LIS handles the other; tie reversal prevents illegal equal-width chains. Mountain validation checks a deterministic two-phase shape rather than trying every peak.

#### MENTAL MODEL
Envelopes line up by width; equal-width heights descend so LIS can choose at most one. A mountain walker must climb at least once, reach a non-edge peak, then descend at least once with no plateau.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Envelopes: `(w asc,h desc)` + strict LIS heights. Mountain: strict rise then strict fall, peak not first/last.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  LIS uses lower bound first tail `>=h`. Mountain increment index while rising, reject peak at 0/end, then consume decreasing values and require reaching end.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Reconstruct envelope chain with parent indices if requested. Sorting both dimensions ascending incorrectly permits equal-width heights into LIS. Mountain plateaus invalidate strictness; bitonic subsequence is a different problem because it may skip elements.

#### ALL VARIATIONS COVERED
- **Q273:** Sort equal widths by descending height and run strict LIS on heights; `O(n log n)`. ⚠️ Tie order is essential.
- **Q277:** Require `n>=3`, at least one strict rise and fall, no equality, and full-array consumption.

#### CONNECTIONS TO OTHER TOPICS
LIS, multidimensional nesting, custom comparators, bitonic sequences, peak finding, monotonic scans, and reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
sort envelopes by (width ascending, height descending)
tails=[]
for (_,h) in envelopes:
    i=lowerBound(tails,h)
    if i==tails.size: tails.append(h)
    else: tails[i]=h
return tails.size
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain equal-width tie handling and strict LIS. For mountain, test plateaus and monotonic-only arrays. Avoid confusing contiguous mountain validation with longest bitonic subsequence.

#### ONE-LINE SUMMARY
Envelope nesting is tie-safe sorted LIS; a mountain is one strict contiguous rise followed by one strict fall.

---

### ARRAY PAIRS AND EQUAL CHOCOLATE SHARING ⚠️
**Covers questions: 274, 276**

#### CORE CONCEPT (30 seconds)
Both prompts lack required rules. If Q274 means maximum disjoint **equal-value pairs**, count frequencies and sum `floor(freq[x]/2)`. If Q276 means each bar has `c` equal indivisible pieces and `p` people must receive equal integer piece counts, the minimum bars is `p/gcd(p,c)`, the smallest positive `b` such that `b·c` is divisible by `p`.

#### WHY IT EXISTS
Pair count depends on the compatibility relation; sharing count depends on people, bar size, divisibility, and whether cutting is arbitrary. Once specified, frequency grouping or GCD gives the exact minimum.

#### MENTAL MODEL
Pair identical socks by colour; leftovers cannot form equal pairs. For chocolate, keep adding identical `c`-piece bars until the total piece count divides evenly among `p` people.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Equal pairs: sum frequency halves. Equal pieces: solve divisibility `p | b·c` via GCD.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  If pairs must sum to a target, use complement counts instead; if pair difference/adjacency matters, algorithm changes. If chocolate can be cut arbitrarily, one bar may be divisible into equal fractional shares, changing the answer.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Labelled versus unlabelled pairs, reuse, maximizing count versus weighted score, and leftover policy all matter. Chocolate may ask equal **amount** rather than equal pieces or include bar costs/sizes; use LCM/GCD/DP only after the model is explicit.

#### ALL VARIATIONS COVERED
- **Q274:** Under equal-value disjoint-pair interpretation, answer `Σ floor(freq/2)`. ⚠️ “Pair” has no condition in the source, so ask whether equality, target sum, or another rule defines it.
- **Q276:** Under identical `c`-piece bars shared among `p` people, answer `p/gcd(p,c)`. ⚠️ The source omits `p`, bar size, and cutting rules, so no unique numeric solution exists.

#### CONNECTIONS TO OTHER TOPICS
Frequency maps, target-pair counting, matching, GCD/LCM, divisibility, resource sharing, and problem specification.

#### CODE / EXAMPLE (if applicable)
```text
equalPairs(array):
    freq=countValues(array)
    return sum(freq[x] / 2 floor)

minimumBars(people p, piecesPerBar c):
    return p / gcd(p,c)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Identify missing constraints immediately, then solve a clearly labelled standard variant. Avoid bluffing a universal answer from incomplete wording.

#### ONE-LINE SUMMARY
Equal-value pairs come from frequency halves; equal-piece sharing comes from divisibility—but both source questions require their missing rule parameters.

---

### THREE EQUAL DIGIT-SUM PARTS AND TOTAL DIGIT COUNT ⚡⚠️
**Covers questions: 275, 278**

#### CORE CONCEPT (30 seconds)
For three non-empty contiguous parts with equal digit sum, total sum must be divisible by three. Scan cut boundaries `1..length−1`; count earlier boundaries whose prefix sum is `T/3`, and when current prefix is `2T/3`, add that count. For total written digits from `1..n`, sum complete decimal-length blocks and the final partial block: `9·10^(d−1)·d` for each shorter length `d`.

#### WHY IT EXISTS
Equal three-part sums are determined by two prefix thresholds, so counting valid ordered cut pairs is enough. Decimal numbers occur in predictable blocks: 9 one-digit, 90 two-digit, 900 three-digit, etc.

#### MENTAL MODEL
Place two cuts where the running digit total reaches one-third and two-thirds. For digit count, count whole shelves by label length, then the partially filled last shelf.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Split: total divisible by 3, two non-edge cut positions, prefix thresholds. Digit total: block formula, `O(log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  At each boundary, add first-cut count for `2T/3` **before** recording a `T/3` boundary; this enforces first cut < second and handles all-zero strings correctly. For final digit length `D`, add `(n−10^(D−1)+1)·D`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  All-zero string has `C(length−1,2)` splits; update order naturally produces it. Clarify digit characters/non-empty parts. Digit count needs wide integers and overflow-safe powers; for `n<=0`, result is zero under `1..n` definition.

#### ALL VARIATIONS COVERED
- **Q275:** Count ordered prefix-boundary pairs at `T/3` and `2T/3` in one scan. ⚠️ Update order matters when `T=0`.
- **Q278:** Sum full `d`-digit blocks plus the final partial block in `O(log n)`.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, cut counting, combinatorics, positional arithmetic, digit DP, logarithms, and overflow.

#### CODE / EXAMPLE (if applicable)
```text
T=sum(digits); if T%3!=0: return 0
one=T/3; two=2*one; firstCuts=0; answer=0; prefix=0
for boundary after positions 0..len-2:
    prefix += digit
    if prefix==two: answer += firstCuts
    if prefix==one: firstCuts++
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive thresholds and enforce non-empty segments. Test all zeros. For digit totals, show block arithmetic rather than looping to `n`.

#### ONE-LINE SUMMARY
Equal three-way splits are prefix-threshold cut pairs; total written digits are complete decimal blocks plus one partial block.

---

### ALL BINARY-TREE STRUCTURES WITH N NODES ⚡⚠️
**Covers questions: 280**

#### CORE CONCEPT (30 seconds)
For each possible left-subtree size `l=0..n−1`, right size is `n−1−l`. Recursively generate all left and right structures and combine every pair under a new root. The count follows the Catalan recurrence `C[n]=Σ C[l]C[n−1−l]`, with `C[0]=1`, and equals `(1/(n+1))·binom(2n,n)`.

#### WHY IT EXISTS
Every binary tree has one root and a unique split of remaining node counts between left and right. Enumerating every split and Cartesian product is complete and non-duplicating for ordered binary-tree shapes.

#### MENTAL MODEL
Choose how many nodes live left of the root; every left shape can pair with every compatible right shape.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Recursive left-size split, Cartesian product, Catalan count. Empty subtree is one structural possibility.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Memoize generated structures/counts by node count. Output is Catalan/exponential, so generation time cannot beat output size. Assign identical placeholder values for pure shapes.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Memoized subtree objects may be shared across returned trees; clone if callers can mutate. Clarify ordered binary trees (left/right distinct) versus unordered shapes, BSTs with labels, or arbitrary distinct node labels—counts differ. Unique BSTs on keys `1..n` also have Catalan shapes but require value ranges.

#### ALL VARIATIONS COVERED
- **Q280:** Generate every left/right size split and Cartesian product; the number of ordered structures is Catalan `C_n`. ⚠️ Clarify whether structures are mutable/shared and whether nodes are labelled.

#### CONNECTIONS TO OTHER TOPICS
Catalan numbers, unique BSTs, recursive generation, memoization, Cartesian products, parenthesizations, and combinatorial explosion.

#### CODE / EXAMPLE (if applicable)
```text
generate(n):
    if n==0: return [null]
    result=[]
    for leftSize in 0..n-1:
        rightSize=n-1-leftSize
        for L in generate(leftSize):
            for R in generate(rightSize):
                result.add(Node(left=L,right=R))
    return result
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain `C[0]=1` and why every root split is unique. State output complexity and mutability caveat. Avoid saying `2^n`—binary-tree structures grow by Catalan numbers.

#### ONE-LINE SUMMARY
All ordered binary-tree shapes come from every left/right node-count split, producing the Catalan recurrence.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q271 (forbidden patterns)** connects to string automata, KMP, Aho–Corasick, and transfer-matrix DP.
- **Q272/Q279 (implicit graphs)** connect to BFS/DFS, bidirectional search, and state-space modelling.
- **Q273/Q277 (ordered sequences)** reinforce LIS, sorting tie rules, and monotonic validation.
- **Q274/Q276 (specification)** train the clarification discipline needed for ambiguous coding prompts.
- **Q275/Q278 (digit counting)** connect to prefix sums, combinatorics, and digit DP.
- **Q280 (Catalan trees)** prepares unique BST generation and structural recursion.

### Be Comfortable With Before Batch 29 (Questions 281–290)

The next batch begins Stage 1C coding. Review implementation details for:

- First non-repeating character with frequency/order tracking.
- Anagram validation.
- Min-stack with `O(1)` minimum retrieval.
- Root-to-leaf path generation.
- Iterative and recursive binary search.
- Linked-list intersection by pointer switching.
- BST validation with value bounds.
- Kadane's maximum contiguous sum.
- Writing compilable, edge-case-complete functions rather than only pseudocode.

### Batch 28 Rapid Recall

271. Avoided-pattern strings are non-accepting automaton walks.
272. Knight minimum moves use BFS.
273. Envelopes use `(width asc,height desc)` plus strict LIS.
274. Equal-pair interpretation uses `Σ floor(freq/2)`—clarify the pair rule.
275. Equal digit-sum thirds use prefix thresholds `T/3` and `2T/3`.
276. Equal sharing needs people/bar/cutting parameters; a common answer uses GCD.
277. Mountain = strict rise then strict fall with an interior peak.
278. Total digits use decimal-length blocks.
279. Jump Game III is visited reachability via `i±a[i]`.
280. Binary-tree structures follow Catalan root splits.
