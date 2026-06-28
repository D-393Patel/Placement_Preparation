# JTG Technical Interview Coaching — Batch 19

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 181–190

## Questions in This Batch

181. ⚡⚠️ A train departs every 15 minutes from 6:00 AM. When does the 18th train depart?
182. ⚡⚠️ If five machines make five widgets in five minutes, how long do 100 machines need for 100 widgets?
183. ⚡ Find one heavier ball among nine using a balance scale exactly twice.
184. ⚡⚠️ Find the missing number in an array containing values from 1 to `n`.
185. ⚡ Count the number of set bits in an integer.
186. ⚡ Use 3-litre and 5-litre jugs to measure exactly 4 litres.
187. ⚡⚠️ Find an element equal to its index in a sorted array of distinct integers.
188. ⚡ Group anagrams in a list of strings.
189. ⚡⚠️ Find the maximum product of any three array values.
190. ⚡⚠️ Explain the Boyer–Moore Majority Vote algorithm.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Sequence indexing and parallel work rates | 181, 182 | Both test whether you model intervals/rates rather than scaling the visible numbers blindly. |
| B | Information-splitting and constructive puzzles | 183, 186 | Each step must deliberately reduce the possible states while respecting a strict operation limit. |
| C | Algebraic cancellation and bit manipulation | 184, 185 | XOR cancellation and clearing the lowest set bit both exploit binary invariants in constant space. |
| D | Fixed-point binary search | 187 | Sorted distinct values make `a[i]-i` monotonic enough to discard half the search range. |
| E | Canonical keys for equivalence classes | 188 | Anagrams become hash-map groups after converting each string to a canonical signature. |
| F | Single-pass array candidate invariants | 189, 190 | Both retain only a few candidates while scanning: numerical extremes or a possible majority. |

---

### SEQUENCE INDEXING AND PARALLEL WORK RATES ⚡⚠️
**Covers questions: 181, 182**

#### CORE CONCEPT (30 seconds)
The first train occurs at offset zero, so the 18th train is after `17 × 15 = 255` minutes: 4 hours 15 minutes after 6:00, or **10:15 AM**. For machines, five machines producing five widgets in five minutes means each machine produces one widget in five minutes; therefore 100 machines produce 100 widgets in **five minutes**.

#### WHY IT EXISTS
These questions expose two common reasoning errors: confusing item count with gaps between items, and assuming time scales with total output while ignoring parallel workers. A simple formula makes the assumption visible.

#### MENTAL MODEL
Ten fence posts have nine gaps. Likewise, the 18th departure is 17 intervals after the first. Machines are independent cooks: if each cooks one dish in five minutes, 100 cooks finish 100 dishes together in five minutes.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Nth event time = first event + `(n-1) × interval`. Per-machine rate = output divided by machines and time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State assumptions: machines work independently at constant rate, begin together, and no setup/resource bottleneck exists. Convert units explicitly before adding time.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Real parallel speedup can be bounded by shared resources/setup/serial work (Amdahl-like limits), but the puzzle deliberately assumes perfect parallelism. For sequence questions, distinguish one-indexed event number from zero-indexed elapsed intervals.

#### ALL VARIATIONS COVERED
- **Q181:** The 18th departure has 17 preceding gaps, so `6:00 + 17×15 minutes = 10:15 AM`. ⚠️ Using 18 intervals gives the wrong answer.
- **Q182:** Each machine makes one widget per five minutes, so 100 independent machines make 100 widgets in five minutes. ⚠️ Output and worker count scale together.

#### CONNECTIONS TO OTHER TOPICS
Arithmetic progressions, off-by-one errors, unit rates, throughput, parallelism, work/span analysis, and Amdahl's law.

#### CODE / EXAMPLE (if applicable)
```text
nthTime = firstTime + (n - 1) * interval

perMachineRate = 5 widgets / (5 machines * 5 minutes)
               = 1 widget / (machine * 5 minutes)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Write the formula before calculating and say the assumptions aloud. Keep units attached. Avoid rushing to the numerical answer—the interviewer is checking whether you can explain the off-by-one or parallel-rate model clearly.

#### ONE-LINE SUMMARY
Count gaps, not events, and compute per-worker rate: the answers are 10:15 AM and five minutes.

---

### BALANCE-SCALE AND WATER-JUG CONSTRUCTION ⚡
**Covers questions: 183, 186**

#### CORE CONCEPT (30 seconds)
For nine balls, split them into groups of three and weigh 3 versus 3. If unequal, the heavier ball is in the heavier group; if equal, it is in the unweighed group. From that candidate group of three, weigh one versus one: the heavier side identifies the ball, or if equal the third is heavier. For the jugs: fill 5, pour into 3 (2 remain); empty 3, pour the 2 into it; refill 5 and pour 1 into the 3-litre jug, leaving exactly 4 litres in the 5-litre jug.

#### WHY IT EXISTS
The scale has three outcomes—left heavy, right heavy, equal—so one weighing can distinguish three candidate groups. The jug puzzle constructs the target using legal fill/empty/pour operations and the fact that `gcd(3,5)=1`.

#### MENTAL MODEL
Each balance weighing is a ternary question, so divide candidates into three equal groups. Jug pouring tracks a remainder: first create 2 litres, then use it to make exactly one litre of free space in the 3-litre jug.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Balls: 3/3/3, then 1/1/1. Jugs: legal actions are fill, empty, and pour until source empty or destination full.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Enumerate every scale outcome and show it leaves exactly three then one candidates. Track jug state as `(amountIn3, amountIn5)` after every operation.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Two balance weighings have `3²=9` possible outcome sequences, matching nine known-heavier candidates—information-theoretically tight. A target is measurable with two unmarked jugs under standard operations when it is a multiple of `gcd(capacities)` and within the relevant capacity/total interpretation. BFS over jug states finds shortest constructions generally.

#### ALL VARIATIONS COVERED
- **Q183:** Weigh 3 vs 3, select the heavier or unweighed group, then weigh 1 vs 1; every outcome identifies the heavy ball in exactly two weighings.
- **Q186:** Reach states `(0,5) → (3,2) → (0,2) → (2,0) → (2,5) → (3,4)`, leaving 4 litres in the 5-litre jug.

#### CONNECTIONS TO OTHER TOPICS
Information theory, ternary decisions, divide-and-conquer, state-space search, BFS, GCD/Bézout identity, invariants, and constructive proofs.

#### CODE / EXAMPLE (if applicable)
```text
Jug state (3L, 5L):
(0,0) fill5 -> (0,5)
pour5to3    -> (3,2)
empty3      -> (0,2)
pour5to3    -> (2,0)
fill5       -> (2,5)
pour5to3    -> (3,4)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Cover every branch and show why no candidate/state is lost. For jugs, narrate state after each legal action. Avoid hand-waving “divide into groups” without resolving the equal case or claiming an arbitrary amount is always measurable.

#### ONE-LINE SUMMARY
Use each scale's three outcomes to reduce 9→3→1, and use jug remainders to reach state `(3,4)`.

---

### MISSING NUMBER AND HAMMING WEIGHT ⚡⚠️
**Covers questions: 184, 185**

#### CORE CONCEPT (30 seconds)
If an array contains every number from `1..n` except one, XOR all expected numbers and all array values; equal values cancel (`x^x=0`), leaving the missing number in `O(n)` time and `O(1)` space without sum overflow. To count set bits, repeatedly execute `x = x & (x-1)`, which clears the lowest set bit; the number of iterations is the Hamming weight.

#### WHY IT EXISTS
Both problems exploit algebraic structure rather than extra storage. XOR is associative, commutative, and self-cancelling. Subtracting one flips the lowest set `1` and lower zeros, so AND removes exactly that `1`.

#### MENTAL MODEL
XOR pairs socks: every present number pairs off, leaving the unmatched missing label. `x & (x-1)` removes the rightmost lit bulb on each step.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Missing by XOR or expected sum; both `O(n)`/`O(1)`. Kernighan bit count takes `O(number of set bits)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify domain (`1..n` with `n-1` values versus `0..n` with `n` values). XOR assumes exactly one missing and no unexpected duplicate. A sum formula should use a wide type or overflow-safe arithmetic. For negative integers, define fixed-width unsigned/two's-complement interpretation.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  XOR cannot validate malformed input or distinguish every duplicate/multiple-missing case without additional constraints. Built-in popcount may use hardware instructions and is preferable in production. Bit loops on signed values should avoid language-specific shift/sign traps; Kernighan terminates under a fixed-width bit representation.

#### ALL VARIATIONS COVERED
- **Q184:** XOR `1..n` and every array value; cancellation leaves the one missing value. ⚠️ State assumptions about range, duplicates, and input length.
- **Q185:** Count how often `x &= x-1` can clear a lowest set bit; time is proportional to the number of ones and space `O(1)`.

#### CONNECTIONS TO OTHER TOPICS
XOR properties, duplicate detection, two missing numbers, bit masks, parity, power-of-two checks, hardware popcount, overflow, and checksums.

#### CODE / EXAMPLE (if applicable)
```text
missing = 0
for value in 1..n: missing ^= value
for value in array: missing ^= value
return missing

count = 0
while x != 0:
    x &= x - 1
    count++
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the input contract first, compare sum versus XOR, and prove cancellation/bit clearing with a small binary example. Avoid choosing XOR as magic syntax without explaining why it works.

#### ONE-LINE SUMMARY
XOR cancels every present range value to reveal the missing one, while `x&(x-1)` clears one set bit per count.

---

### FIXED-POINT BINARY SEARCH ⚡⚠️
**Covers questions: 187**

#### CORE CONCEPT (30 seconds)
For a sorted array of distinct integers, binary-search for `a[i]=i`. At midpoint, if `a[mid] < mid`, every left value is too small to catch its index, so search right; if `a[mid] > mid`, search left. This takes `O(log n)` time and `O(1)` space.

#### WHY IT EXISTS
Distinct sorted integers increase by at least one per index step, so `f(i)=a[i]-i` is non-decreasing. Its sign tells which side can contain zero, turning an equality condition into monotonic binary search.

#### MENTAL MODEL
Compare two rising staircases: array value and index. At midpoint, see whether the value staircase is below or above the index staircase, then move toward their crossing.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Equality returns; value below index → right; value above index → left. Complexity `O(log n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use inclusive boundaries and safe midpoint. State whether any fixed point or the smallest fixed point is required; ordinary return-on-match finds any one.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Distinctness is essential for simple half elimination. With duplicates, `a[mid]<mid` does not rule out every left index, so specialised recursive bounds or linear scan may be required. Negative values and unrotated indexing are fine. If indexing is one-based, equality condition changes.

#### ALL VARIATIONS COVERED
- **Q187:** Binary-search the monotonic difference `a[i]-i`; return equality, move right when negative and left when positive. ⚠️ Confirm zero-based indexing and distinct values.

#### CONNECTIONS TO OTHER TOPICS
Binary-search invariants, monotonic functions, lower bound, root finding, rotated arrays, duplicate handling, and answer-space search.

#### CODE / EXAMPLE (if applicable)
```text
lo = 0; hi = n - 1
while lo <= hi:
    mid = lo + (hi - lo) / 2
    if a[mid] == mid: return mid
    if a[mid] < mid: lo = mid + 1
    else: hi = mid - 1
return -1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove which half is impossible using sorted distinctness. Clarify index convention and desired fixed point. Avoid presenting the inequalities from memory without the monotonic-difference explanation.

#### ONE-LINE SUMMARY
Because `a[i]-i` is monotonic for sorted distinct integers, binary-search its zero in `O(log n)`.

---

### GROUPING ANAGRAMS BY CANONICAL SIGNATURE ⚡
**Covers questions: 188**

#### CORE CONCEPT (30 seconds)
Two strings are anagrams when they have the same character multiset. Convert each string to a canonical signature—its sorted characters or a frequency vector—and append it to a hash-map bucket keyed by that signature. Sorting gives roughly `O(N·K log K)` for `N` strings of length up to `K`; fixed-alphabet counting gives `O(N·K)`.

#### WHY IT EXISTS
Directly comparing every pair is quadratic in the number of strings. A canonical key converts an equivalence relation into ordinary hash grouping: all and only anagrams receive the same key.

#### MENTAL MODEL
Alphabetise the letters on each word's label. `eat`, `tea`, and `ate` all become `aet`, so they enter the same labelled box.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Map sorted-string signature to list of originals. Complexity `O(N·K log K)` plus output storage.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For lowercase English letters, use 26 counts and encode them unambiguously, such as `#1#0...`; concatenating raw counts without separators can collide (`1,11` versus `11,1`). Preserve duplicate input strings if required.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify case, spaces, punctuation, Unicode normalisation, and locale. A fixed 26-vector is invalid for arbitrary Unicode; sorted code points/graphemes or a character-frequency map may be needed. Hash-map output group/order is unspecified unless requirements demand stable ordering.

#### ALL VARIATIONS COVERED
- **Q188:** Compute one canonical multiset signature per string and group by it; use sorted keys generally or fixed-alphabet counts for linear character processing.

#### CONNECTIONS TO OTHER TOPICS
Hash maps, equivalence classes, canonicalization, frequency arrays, string sorting, Unicode normalisation, hashing, and bucket grouping.

#### CODE / EXAMPLE (if applicable)
```text
groups = map signature -> list
for word in words:
    counts[0..25] = 0
    for ch in word: counts[ch-'a']++
    key = encodeWithSeparators(counts)
    groups[key].append(word)
return groups.values()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the equivalence/key invariant, then compare sorted versus count signatures. Ask about alphabet/normalisation. Avoid using a collision-prone signature such as only sum or XOR of characters.

#### ONE-LINE SUMMARY
Canonicalise each word's character multiset and hash-group identical signatures to collect all anagrams efficiently.

---

### MAXIMUM PRODUCT OF THREE AND BOYER–MOORE MAJORITY ⚡⚠️
**Covers questions: 189, 190**

#### CORE CONCEPT (30 seconds)
The maximum product of three values is the larger of `(three largest)` and `(largest × two smallest)`, because two large-magnitude negatives make a positive; track those five extremes in one `O(n)` scan. Boyer–Moore tracks a candidate and count: matching values increment, different values cancel. If a strict majority exists, it survives cancellation; otherwise a second pass must verify the candidate.

#### WHY IT EXISTS
Both problems seem to require sorting/counting everything, but only a small invariant matters. Products are maximised by numerical extremes. A majority occupies more than half the array, so pairing it against non-majority elements cannot cancel all its occurrences.

#### MENTAL MODEL
For product, keep a podium of the top three and a pit of the bottom two. For majority, different votes pair off and leave; a true majority still has at least one unpaired vote.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Track max1/max2/max3 and min1/min2; answer `max(max1·max2·max3, max1·min1·min2)`. Boyer–Moore uses `O(n)` time/`O(1)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Update extremes in correct shifted order. Boyer–Moore: if count zero choose current; then increment for match or decrement for mismatch. Verify frequency `> n/2` unless the problem guarantees a majority.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Product can overflow fixed-width integers; use a wider type/check arithmetic. Handle exactly three elements, zeros, duplicates, and all negatives. Boyer–Moore's first pass returns a candidate, not proof on arbitrary input. The cancellation idea generalises to elements occurring more than `n/k` using `k-1` candidates.

#### ALL VARIATIONS COVERED
- **Q189:** Compare the product of the three largest with the largest times two smallest; scan in `O(n)`/`O(1)`. ⚠️ Sorting only the “largest” values misses two negatives.
- **Q190:** Cancel opposing values to obtain a possible majority, then verify it occurs more than `n/2` unless existence is guaranteed. ⚠️ Candidate does not imply majority.

#### CONNECTIONS TO OTHER TOPICS
Order statistics, top-`k`, integer overflow, frequency maps, voting algorithms, cancellation invariants, Misra–Gries, and streaming algorithms.

#### CODE / EXAMPLE (if applicable)
```text
candidate = none; count = 0
for x in a:
    if count == 0: candidate = x
    if x == candidate: count++
    else: count--

if occurrences(candidate) > n/2: return candidate
return NO_MAJORITY
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
For product, test `[-10,-10,1,2,3]` and discuss overflow. For Boyer–Moore, explain cancellation and verification rather than presenting mysterious counters. Avoid sorting when a one-pass invariant is requested.

#### ONE-LINE SUMMARY
Maximum triple product comes from five extremes; a true majority survives pairwise cancellation but still needs verification when not guaranteed.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q181–Q183 and Q186 (reasoning puzzles)** strengthen off-by-one, rate, information-bound, and state-space explanations used in aptitude rounds.
- **Q184–Q185 (XOR/bits)** prepare power-of-two, single-nonduplicate, bit masks, and XOR-swap questions.
- **Q187 (fixed point)** connects to lower-bound and answer-space binary search.
- **Q188 (anagrams)** reinforces hash-map internals and prepares string grouping/frequency techniques.
- **Q189 (extremes)** connects to second-largest/top-`k`, streaming statistics, and overflow-safe arithmetic.
- **Q190 (majority)** leads to frequency thresholds, Misra–Gries, and stream candidate algorithms.

### Be Comfortable With Before Batch 20 (Questions 191–200)

- QuickSort pivot and partition invariants.
- Recursive mirror comparison for symmetric trees.
- Power-set generation (a near-repeat of Q178).
- Longest common prefix by vertical scan or sorting extremes.
- Divide-and-conquer examples beyond merge sort.
- Prim versus Kruskal MST trade-offs.
- Prime factorisation up to `sqrt(n)`.
- Tournament/minimum-comparison second-largest logic.
- Positional counting of a digit from `1..n`.
- Prefix-sum frequency maps for subarray sum `k`.

### Batch 19 Rapid Recall

181. 18th train = 17 intervals after 6:00 = 10:15 AM.
182. 100 machines make 100 widgets in five minutes.
183. Split 9 into 3/3/3, then candidates into 1/1/1.
184. XOR expected range and array to reveal the missing value.
185. `x &= x-1` removes one set bit per iteration.
186. Jug states reach `(3,4)`.
187. Binary-search monotonic `a[i]-i`.
188. Hash-group by sorted/frequency signature.
189. Compare top-three product with largest × two smallest.
190. Boyer–Moore cancels opponents, then verifies the survivor.
