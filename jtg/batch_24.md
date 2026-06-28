# JTG Technical Interview Coaching — Batch 24

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 231–240

## Questions in This Batch

231. ⚡ Explain amortized analysis using dynamic-array push.
232. ⚡⚠️ Count ways to place non-attacking rooks on an `n×n` chessboard.
233. ⚡ Find the minimum moves for Tower of Hanoi.
234. ⚡⚠️ Find all primes in `[L,R]` using a segmented sieve.
235. ⚡ Explain sparse tables for RMQ.
236. ⚡⚠️ Find the minimum number of coins that can represent every value from 1 to `n`.
237. ⚡ Check whether a number is perfect.
238. ⚡⚠️ Find the maximum subarray sum in a circular array.
239. ⚡⚠️ Count assignments of `+`/`−` to reach target sum `S`.
240. ⚡ Find the minimum deletions needed to make a parentheses string valid.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Amortized dynamic-array growth | 231 | This is the same root concept as Q43 and needs the geometric-copy proof. |
| B | Combinatorial counting recurrences | 232, 233 | Rook placements count permutations; Hanoi counts a recursively forced move sequence. |
| C | Static range preprocessing | 234, 235 | Segmented sieve and sparse table preprocess compact information to answer a bounded range efficiently. |
| D | Complete subset-sum coverage | 236 | Optimal coin values extend a contiguous representable range without gaps. |
| E | Divisor-pair number testing | 237 | Perfect-number checking uses paired proper divisors through the square root. |
| F | Circular Kadane and target-sum DP | 238, 239 | Both transform sign/range choices into standard linear or subset-sum state. |
| G | Parentheses balance repair | 240 | Unmatched closing/opening parentheses directly equal the minimum deletions. |

---

### AMORTIZED DYNAMIC-ARRAY PUSH (MERGED WITH Q43) ⚡
**Covers questions: 231**

#### CORE CONCEPT (30 seconds)
Most dynamic-array pushes write into free capacity in `O(1)`. When full, the array doubles and copies `O(n)` elements. Across `n` pushes, copies form `1+2+4+...<2n`, so total work is `O(n)` and each push is `O(1)` amortized, despite an individual resize push costing `O(n)`.

#### WHY IT EXISTS
Worst-case per operation overstates long-sequence cost when expensive maintenance is rare and creates room for many future cheap operations. Amortized analysis distributes that maintenance cost over the sequence without probability assumptions.

#### MENTAL MODEL
Occasionally move to a house twice as large; although moving day is expensive, each move creates enough rooms for many cheap new arrivals.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Dynamic-array push is amortized `O(1)`, worst-case `O(n)` during resize.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use geometric growth, typically ×2. Aggregate/accounting/potential methods all prove constant amortized cost. Growing by one slot would copy `1+2+...+n=Θ(n²)` total.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Amortized is not average-case; the guarantee holds over every valid sequence. Shrinking at exactly half full can thrash, so use hysteresis, e.g. shrink near one-quarter. Growth factor trades unused capacity against copy frequency.

#### ALL VARIATIONS COVERED
- **Q231:** This repeats Q43's dynamic-array example: geometric resizing gives `O(1)` amortized push via a geometric-series bound, not because every push is constant time.

#### CONNECTIONS TO OTHER TOPICS
Q43, array-backed stacks, potential method, hash-table resizing, capacity planning, memory locality, and hysteresis.

#### CODE / EXAMPLE (if applicable)
```text
push(x):
    if size == capacity:
        capacity = max(1, 2*capacity)
        copy size elements to new array
    data[size++] = x

Copies over n pushes: 1+2+4+... < 2n.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State worst-case and amortized costs separately and derive the geometric sum. Contrast with linear growth. Avoid calling amortized “the usual case” or assuming random inputs.

#### ONE-LINE SUMMARY
Doubling makes rare linear copies sum to linear total work, so dynamic-array push is `O(1)` amortized.

---

### NON-ATTACKING ROOKS AND TOWER OF HANOI ⚡⚠️
**Covers questions: 232, 233**

#### CORE CONCEPT (30 seconds)
Assuming **n indistinguishable rooks placed on an `n×n` board**, non-attacking means exactly one rook in each row and column; choose a column permutation for the rows, giving `n!` placements. For `k` rooks, the count is `C(n,k)²·k!`. Tower of Hanoi must move the top `n−1` disks aside, move the largest once, then move `n−1` onto it, so `T(n)=2T(n−1)+1=2^n−1` minimum moves.

#### WHY IT EXISTS
Rook constraints create a one-to-one mapping with permutations. Hanoi's disk-order rule forces the recursive subproblems; no solution can move the largest disk before clearing all smaller ones or finish without rebuilding them.

#### MENTAL MODEL
Rooks: each row chooses a unique column like assigning people to unique seats. Hanoi: clear the large disk's road, move it once, then rebuild the smaller tower on the destination.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `n` rooks on `n×n` → `n!`. Hanoi moves → `2^n−1`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For `k` rooks choose `k` rows, `k` columns, then a bijection: `C(n,k)C(n,k)k!`. Hanoi algorithm recursively moves `n−1` source→auxiliary, moves disk `n`, then `n−1` auxiliary→destination.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify number/identity of rooks: labelled rooks multiply placement assignments by `k!` again if identities matter. Hanoi recursion depth is `O(n)` but output/time is `Θ(2^n)` because every move must be emitted. The recurrence itself is also the optimality proof.

#### ALL VARIATIONS COVERED
- **Q232:** Under the standard “place n identical rooks” reading, answer `n!`; for `k` rooks use `C(n,k)²k!`. ⚠️ The source wording omits how many rooks, so state the assumption.
- **Q233:** Hanoi minimum follows `T(n)=2T(n−1)+1`, hence `2^n−1`, with the standard three-peg recursive sequence.

#### CONNECTIONS TO OTHER TOPICS
Permutations, bijections, combinatorics, recurrences, induction, recursion trees, exponential output, and Gray-code-like move patterns.

#### CODE / EXAMPLE (if applicable)
```text
hanoi(n, source, auxiliary, destination):
    if n == 0: return
    hanoi(n-1, source, destination, auxiliary)
    output move(source, destination)
    hanoi(n-1, auxiliary, source, destination)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask the rook count/identity assumption, then derive rather than memorise the formula. For Hanoi, prove why both `n−1` moves are mandatory around the largest disk. Avoid claiming the exponential time can be reduced while still outputting all moves.

#### ONE-LINE SUMMARY
Non-attacking rook placements are row-to-column bijections; Hanoi is a forced two-subproblem recurrence with `2^n−1` moves.

---

### SEGMENTED SIEVE AND SPARSE-TABLE RMQ ⚡⚠️
**Covers questions: 234, 235**

#### CORE CONCEPT (30 seconds)
For primes in `[L,R]`, first sieve base primes through `sqrt(R)`, then mark their multiples inside a boolean segment of length `R−L+1`, starting at `max(p², ceil(L/p)·p)`. Unmarked values ≥2 are prime. A sparse table precomputes minima for power-of-two intervals in `O(n log n)` and answers static RMQ in `O(1)` by taking the minimum of two overlapping blocks.

#### WHY IT EXISTS
A full sieve to `R` wastes memory when the requested interval is narrow but far from zero. A sparse table spends preprocessing once when immutable range queries are numerous; idempotent minimum makes overlap harmless.

#### MENTAL MODEL
Segmented sieve brings only the requested page of the number line into memory and crosses it out using small known primes. Sparse table stores summaries for block lengths 1,2,4,8..., then covers a query from both ends.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Segmented sieve memory `O(R−L+1 + sqrt R)` and base primes to `sqrt R`. Sparse RMQ preprocess `O(n log n)`, query `O(1)`, static data.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark start must not mark base prime itself when it lies in the segment, hence `max(p², first multiple)`. Explicitly mark 0/1 non-prime. RMQ uses `k=floor(log2(length))` and blocks `[l,l+2^k−1]`, `[r−2^k+1,r]`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Use overflow-safe ceiling/start arithmetic and block the range if `R−L` is huge. Sparse-table `O(1)` overlap works for idempotent operations such as min/max/GCD, not ordinary sum; updates require rebuild. Precompute floor logs or derive them safely.

#### ALL VARIATIONS COVERED
- **Q234:** Sieve only `[L,R]` using primes ≤`sqrt R`, with start `max(p²,ceil(L/p)p)` and special handling below 2.
- **Q235:** This repeats Q45: sparse table stores power-of-two minima and combines two overlapping blocks for static `O(1)` RMQ.

#### CONNECTIONS TO OTHER TOPICS
Ordinary sieve, prime factorisation, block processing, RMQ, segment/Fenwick trees, idempotence, binary lifting, and cache-friendly preprocessing.

#### CODE / EXAMPLE (if applicable)
```text
basePrimes = sieve(floor(sqrt(R)))
isPrime[0..R-L] = true
for p in basePrimes:
    start = max(p*p, ceilDiv(L,p)*p)
    for multiple from start to R step p:
        isPrime[multiple-L] = false
for x in [L,R]: if x >= 2 and isPrime[x-L]: output x
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the start formula and memory benefit. For sparse tables, state immutability/idempotence before `O(1)`. Avoid marking prime `p` itself composite or claiming sparse-table sums use the same overlapping trick.

#### ONE-LINE SUMMARY
Segmented sieve marks a narrow interval with small base primes; sparse RMQ precomputes power-of-two minima for constant-time static queries.

---

### MINIMUM COINS FOR COMPLETE VALUE COVERAGE ⚡⚠️
**Covers questions: 236**

#### CORE CONCEPT (30 seconds)
Assuming we may choose a **finite multiset of positive-value coins, each usable at most once per represented amount**, the minimum number needed to represent every value `1..n` is `ceil(log2(n+1))`, using values `1,2,4,8,...`. If current coins represent every value `0..reach`, the next coin must be at most `reach+1`; choosing exactly `reach+1` maximally extends coverage to `2·reach+1`.

#### WHY IT EXISTS
With `k` coins there are at most `2^k` subsets, including the empty subset, so representing `0..n` requires `2^k >= n+1`. Powers of two achieve that lower bound by giving every value a binary representation.

#### MENTAL MODEL
Each coin is a binary switch. Values `1,2,4,...` make every switch pattern produce a unique total, covering all amounts without gaps.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Powers of two cover `0..2^k−1`; minimum `k=ceil(log2(n+1))` under the subset-use assumption.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Coverage invariant: if `[0,reach]` is covered and next coin `x<=reach+1`, then `[0,reach+x]` is covered. To maximise extension per coin choose `x=reach+1`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The wording is ambiguous. With unlimited reuse and asking denomination types, coin `1` alone represents all values; with physical coins needed to pay any one value, the finite-subset interpretation yields the binary answer. If existing sorted coins are given and missing denominations must be added, greedily add `reach+1` when the next coin exceeds it.

#### ALL VARIATIONS COVERED
- **Q236:** Under the standard finite-subset interpretation, use powers of two and return `ceil(log2(n+1))`. ⚠️ State the coin reuse/denomination assumptions because the literal wording has multiple answers.

#### CONNECTIONS TO OTHER TOPICS
Binary representation, subset sums, greedy coverage, patching arrays, information lower bounds, bit masks, and coin systems.

#### CODE / EXAMPLE (if applicable)
```text
reach = 0; coins = []
while reach < n:
    nextCoin = reach + 1
    coins.append(nextCoin)
    reach += nextCoin
return coins.size
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify the model first, give both lower bound and constructive proof, and name the coverage invariant. Avoid jumping to powers of two without explaining why fewer coins cannot work.

#### ONE-LINE SUMMARY
With one-use chosen coins, powers of two cover `0..2^k−1`, so the minimum is `ceil(log2(n+1))`—after clarifying the ambiguous reuse model.

---

### PERFECT NUMBER TESTING ⚡
**Covers questions: 237**

#### CORE CONCEPT (30 seconds)
A positive integer is perfect when the sum of its positive proper divisors equals the number, e.g. `6=1+2+3`. For `n>1`, start the sum at 1 and test divisors `d` from 2 through `sqrt(n)`; when `d` divides `n`, add both `d` and `n/d`, adding only once for a square root. Time `O(sqrt n)`, space `O(1)`.

#### WHY IT EXISTS
Divisors occur in pairs around the square root, so testing beyond it repeats already discovered factors. The square case is the only pair whose members are equal.

#### MENTAL MODEL
Fold the multiplication table at the square root: every divisor below pairs with one above.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sum proper divisors, exclude `n`; 6 and 28 are perfect; 1 is not.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use `d<=n/d` to avoid `d*d` overflow. Add quotient only when it differs from `d`. Optionally stop early if sum exceeds `n` for positive divisors.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Even perfect numbers have Euclid–Euler form `2^(p−1)(2^p−1)` when the second factor is prime, but generating/testing huge ones requires big integers and primality algorithms. The direct divisor-pair test is the appropriate interview solution.

#### ALL VARIATIONS COVERED
- **Q237:** Sum paired proper divisors through the square root and compare with `n`, handling `n<=1` and perfect-square duplication.

#### CONNECTIONS TO OTHER TOPICS
Divisor enumeration, prime factorisation, amicable/abundant/deficient numbers, square-root bounds, and overflow-safe arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
isPerfect(n):
    if n <= 1: return false
    sum = 1
    for d from 2 while d <= n/d:
        if n % d == 0:
            sum += d
            if d != n/d: sum += n/d
    return sum == n
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain divisor pairing and square handling. Test 1, 6, 16, and 28. Avoid including `n` itself or double-counting a square root.

#### ONE-LINE SUMMARY
A perfect number equals its proper-divisor sum, which can be computed from divisor pairs through `sqrt(n)`.

---

### CIRCULAR MAXIMUM AND TARGET-SUM SIGNS ⚡⚠️
**Covers questions: 238, 239**

#### CORE CONCEPT (30 seconds)
Circular maximum subarray repeats Q208: answer is the greater of ordinary Kadane maximum and `total−minimumSubarray`, except return ordinary maximum when all values are negative. For Target Sum with non-negative values, let positive-selected sum be `P` and negative-selected sum `N`: `P−N=S` and `P+N=total`, so `P=(total+S)/2`; count subsets with that sum using 0/1 DP.

#### WHY IT EXISTS
The circular wrap is the complement of one minimum middle segment. Sign assignments can be algebraically transformed from `2^n` choices into subset-counting states.

#### MENTAL MODEL
Circular maximum keeps the whole ring except its worst arc. Target Sum divides numbers into plus and minus boxes; algebra tells exactly what the plus box must total.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Circular Kadane `O(n)`/`O(1)`. Target subset count `O(n·target)`/`O(target)` for non-negative integers.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Target transformation is impossible if `abs(S)>total` or `total+S` is odd. Initialise `dp[0]=1`; for each number iterate sums downward and add counts.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zeros correctly double every reachable count under descending update. Counts may overflow. Negative input values invalidate the simple subset transform; use memo/map DP over `(index,currentSum)`. Circular all-negative guard prevents choosing an empty complement.

#### ALL VARIATIONS COVERED
- **Q238:** This is the same as Q208; reuse max-Kadane versus `total−min-Kadane` with the all-negative guard.
- **Q239:** Transform signs to subset sum `(total+S)/2` and count subsets; reject impossible parity/range cases. ⚠️ Zero values multiply choices and must not be discarded.

#### CONNECTIONS TO OTHER TOPICS
Kadane, subset sum, 0/1 knapsack, partition difference, generating functions, memoization, and sign-assignment counting.

#### CODE / EXAMPLE (if applicable)
```text
if abs(S)>total or (total+S) odd: return 0
target=(total+S)/2
dp[0]=1
for x in values:
    for s from target down to x:
        dp[s] += dp[s-x]
return dp[target]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive the algebra, state non-negative assumption, and test zeros. Recognise Q238 as a repeat rather than inventing a second method. Avoid boolean subset DP when the question asks for the number of assignments.

#### ONE-LINE SUMMARY
Circular maximum removes the worst middle arc; Target Sum turns plus/minus choices into counting subsets of `(total+S)/2`.

---

### MINIMUM PARENTHESES DELETIONS ⚡
**Covers questions: 240**

#### CORE CONCEPT (30 seconds)
Scan left to right with `open` unmatched `'('` count. On `'('`, increment. On `')'`, match by decrementing `open` if possible; otherwise this closing parenthesis must be deleted, so increment `deletions`. After the scan, every remaining `open` must also be deleted. Answer is `deletions+open`, in `O(n)` time and `O(1)` space.

#### WHY IT EXISTS
An unmatched closing parenthesis cannot be repaired by anything later, so deleting it is forced. Unmatched openings remaining at the end also have no future closings. The greedy decisions are therefore optimal.

#### MENTAL MODEL
Maintain a stack height without storing the stack: openings add available partners, closings consume one; closings with no partner and leftover openings are the exact trash pile.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Count unmatched closes during scan plus unmatched opens afterward. Linear/constant space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  If an actual valid string is required, mark invalid indices with a stack/two passes and rebuild. Clarify whether non-parenthesis characters are ignored/preserved.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This handles one bracket type. Multiple bracket types need an actual stack because type/order matters. Minimum deletions differs from minimum insertions only in output construction details, though the count for single-type parentheses follows similar unmatched totals.

#### ALL VARIATIONS COVERED
- **Q240:** Count forced unmatched `')'` during the scan and add unmatched `'('` at the end; this is the minimum deletion count.

#### CONNECTIONS TO OTHER TOPICS
Valid parentheses, stacks, greedy proofs, minimum additions, bracket types, string filtering, and balance invariants.

#### CODE / EXAMPLE (if applicable)
```text
open=0; deletions=0
for ch in s:
    if ch=='(': open++
    else if ch==')':
        if open>0: open--
        else: deletions++
return deletions+open
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why each deletion is forced and hence optimal. Dry-run `())(()`. Avoid using a full stack when only a count for one parenthesis type is needed.

#### ONE-LINE SUMMARY
Delete every closing parenthesis with no available opening, then delete every opening left unmatched at the end.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q231 (amortized growth)** reinforces Q43 and connects to hash-table resizing and dynamic buffers.
- **Q232–Q233 (counting/recurrence)** connect to factorial search spaces, combinatorial explosion, and induction.
- **Q234–Q235 (range preprocessing)** connect to prime-range queries, RMQ, binary lifting, and static/dynamic structure choices.
- **Q236 (coverage coins)** connects to binary representation, greedy patching, and subset sums.
- **Q237 (divisors)** prepares perfect/prime-factor number-theory questions.
- **Q238–Q239 (array DP)** connect to Kadane, partition difference, target sum, and zero-aware counting.
- **Q240 (parentheses)** prepares bracket-validity cost and stack/greedy string problems.

### Be Comfortable With Before Batch 25 (Questions 241–250)

- Factorial number system for kth permutation.
- Longest snake sequence grid DP.
- Matrix-chain multiplication interval DP.
- Arithmetic-progression avoidance constraints.
- Trie + DFS for Word Search II.
- One-pass maximum future difference.
- Grid shortest/unique paths with portals.
- Minimum bracket-edit cost.
- Maximum meetings/activity selection (repeat).
- In-place smallest positive missing number.

### Batch 24 Rapid Recall

231. Dynamic-array push is `O(1)` amortized through geometric resizing.
232. `n` non-attacking rooks on `n×n`: `n!` under standard assumptions.
233. Hanoi minimum moves: `2^n−1`.
234. Segmented sieve marks `[L,R]` using primes through `sqrt R`.
235. Sparse RMQ uses two overlapping power-of-two minima.
236. One-use coin coverage uses powers of two; minimum `ceil(log2(n+1))`.
237. Perfect number equals sum of proper divisor pairs.
238. Circular maximum repeats Kadane/complement with all-negative guard.
239. Target signs reduce to subset count `(total+S)/2`.
240. Minimum deletions equal unmatched closes plus leftover opens.
