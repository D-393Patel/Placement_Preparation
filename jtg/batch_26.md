# JTG Technical Interview Coaching — Batch 26

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 251–260

## Questions in This Batch

251. ⚡ Count ways to climb `n` stairs using steps of 1, 2, or 3.
252. ⚡ Find the minimum number of perfect squares summing to `n`.
253. ⚡⚠️ Find the longest subarray whose sum is divisible by `k`.
254. ⚡ Find the maximum consecutive ones after flipping at most `k` zeros.
255. ⚡ Explain the candy-distribution problem.
256. ⚡⚠️ Count ways to paint `n` fence posts with `k` colours when adjacent posts cannot match.
257. ⚠️ Count ways to score `n` cricket runs using shots worth 1, 2, or 6.
258. ⚠️ Find minimum operations to make an array non-decreasing.
259. ⚡⚠️ Find the largest-sum submatrix whose sum is no greater than `k`.
260. ⚠️ Find the minimum cost to fill an `n`-gallon jug using given jug sizes.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Counting linear recurrences | 251, 256, 257 | Each counts constructions by the final step/colour/shot, with interpretation-dependent transitions. |
| B | Minimum-cost unbounded DP | 252, 260 | Perfect squares and priced jug sizes repeatedly choose an item to reach an exact total at minimum cost/count. |
| C | Prefix remainders and sliding windows | 253, 254 | One tracks earliest equivalent prefixes; the other maintains a monotonic valid binary window. |
| D | Greedy monotonic repair | 255, 258 | Candy uses directional constraints; increment-only array repair raises each violating value by the minimum forced amount. |
| E | 2D compression plus ordered prefix sums | 259 | Row/column compression reduces a matrix rectangle problem to 1D “maximum subarray ≤ k.” |

---

### CLIMBING STAIRS, FENCE COLOURS, AND CRICKET SCORES ⚡⚠️
**Covers questions: 251, 256, 257**

#### CORE CONCEPT (30 seconds)
Count constructions by their final choice. Stair ways satisfy `dp[i]=dp[i−1]+dp[i−2]+dp[i−3]` with `dp[0]=1`. With the source's strict “no two adjacent posts same” rule, fence paintings are `k·(k−1)^(n−1)`. If cricket shot **order matters**, scoring ways obey `dp[i]=dp[i−1]+dp[i−2]+dp[i−6]`; if only shot-count combinations matter, use coin-change ordering with shots outermost.

#### WHY IT EXISTS
Every complete construction has one final action. Removing it leaves a smaller valid state, and the possible final actions form disjoint cases—provided we define whether order creates a different outcome.

#### MENTAL MODEL
Stand on the last stair and ask whether the final jump was 1, 2, or 3. At a fence post, choose any colour except the previous one. For cricket, ask whether `1 then 2` differs from `2 then 1` before counting.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Stair tribonacci recurrence, linear time/constant rolling space. Strict fence adjacency formula. Cricket recurrence depends on sequence versus combination semantics.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use `dp[0]=1` as the empty construction and treat negative indices as zero. Fence `n=0` convention should be stated; for `n>=1`, first post has `k` choices and each later post `k−1`. Cricket combinations loop shot values outside and totals upward.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The common “paint fence” interview variant allows at most two adjacent posts equal and uses a different same/different recurrence; the source explicitly says no adjacent same. Counts grow quickly and may need modulo/big integers. Linear recurrences can be accelerated using matrix exponentiation for huge `n`.

#### ALL VARIATIONS COVERED
- **Q251:** Count final jumps of 1/2/3 with `dp[i]=dp[i−1]+dp[i−2]+dp[i−3]`, `O(n)` time and `O(1)` rolling space.
- **Q256:** Under the explicit no-equal-neighbours rule, answer `k(k−1)^(n−1)` for `n>=1`. ⚠️ Do not apply the “no more than two adjacent” recurrence.
- **Q257:** If shot order matters use the 1/2/6 final-shot recurrence; if combinations matter use unbounded coin-change loops. ⚠️ The source does not define whether order matters.

#### CONNECTIONS TO OTHER TOPICS
Fibonacci/tribonacci, tiling, coin change, composition versus combination counting, linear recurrences, matrix exponentiation, and modular arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
ways[0]=1
for score in 1..n:
    ways[score]=0
    for shot in [1,2,6]:
        if score>=shot: ways[score]+=ways[score-shot]
// This version counts ordered shot sequences.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask what constitutes a distinct way, write base cases, and derive transitions from the final action. Call out the fence wording. Avoid silently switching between ordered and unordered counts.

#### ONE-LINE SUMMARY
Count by the final action, but define whether order matters and follow the source's exact fence adjacency rule.

---

### MINIMUM PERFECT SQUARES AND MINIMUM-COST JUG FILLING ⚡⚠️
**Covers questions: 252, 260**

#### CORE CONCEPT (30 seconds)
For perfect squares, set `dp[0]=0` and `dp[x]=1+min(dp[x−s²])` over squares `s²<=x`, giving `O(n√n)` time and `O(n)` space. For jug filling, if each jug size `size[i]` has cost `cost[i]`, may be used repeatedly, and exactly `n` gallons are required, use `dp[v]=min(dp[v−size[i]]+cost[i])`; this is unbounded minimum-cost DP in `O(n·m)`.

#### WHY IT EXISTS
Both problems ask for the cheapest exact total when each final chosen item leaves a smaller total of the same form. Memoization/tabulation prevents recomputing every decomposition.

#### MENTAL MODEL
To build amount `x`, try placing one final square/jug and ask for the cheapest way to build the remainder.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Exact-total minimum DP, unreachable states infinity, repeated choices allowed.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Precompute squares through `sqrt(n)`. For jug costs, validate positive sizes and define exact fill versus at-least fill. Return impossible when `dp[n]` remains infinity.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Perfect squares can also be solved as BFS over remainders; number theory guarantees at most four squares (Lagrange), with Legendre's theorem enabling faster classification. Q260 omits actual costs and reuse/overfill rules; if every jug use costs one, it reduces to minimum item count, while “at least n” changes state bounds/transitions.

#### ALL VARIATIONS COVERED
- **Q252:** Minimise one plus the solution after subtracting each square; `O(n√n)` baseline.
- **Q260:** Assume priced, unlimited jug choices and exact fill, then use unbounded min-cost DP. ⚠️ Ask for costs, reuse, and exact-versus-at-least semantics because the prompt omits them.

#### CONNECTIONS TO OTHER TOPICS
Coin change, unbounded knapsack, shortest path/BFS, number theory, exact fill, memoization, and sentinel values.

#### CODE / EXAMPLE (if applicable)
```text
dp[0]=0; dp[1..n]=INF
for volume in 1..n:
    for each (size,cost):
        if size<=volume and dp[volume-size]!=INF:
            dp[volume]=min(dp[volume],dp[volume-size]+cost)
return dp[n]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the item model before the recurrence and explain why choices are unlimited. For squares, dry-run `12→4+4+4`. Avoid returning an infinity sentinel as a legitimate answer.

#### ONE-LINE SUMMARY
Both are unbounded exact-total DP: subtract one allowed item, add its count/cost, and minimise over choices.

---

### DIVISIBLE-SUM PREFIXES AND AT-MOST-K-ZERO WINDOWS ⚡⚠️
**Covers questions: 253, 254**

#### CORE CONCEPT (30 seconds)
A subarray sum is divisible by `k` when its endpoint prefix sums have the same remainder modulo `k`; store the earliest index for each remainder and maximise distance. For maximum ones after at most `k` flips, maintain a window with at most `k` zeros, expand right, and shrink left while zero count exceeds `k`. Both run in `O(n)`.

#### WHY IT EXISTS
Prefix-remainder equality converts a divisibility condition into repeated-state distance. Binary-window validity is monotonic: removing left elements can only reduce/not increase its zero count, so two pointers never need to move backward.

#### MENTAL MODEL
Prefix remainders are clock positions—returning to the same position means the elapsed sum made full turns of `k`. The sliding window carries a budget of `k` zero coupons.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Earliest remainder map with remainder 0 at index −1. Sliding window counts zeros and tracks max length.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Normalise negative remainder as `((prefix%k)+k)%k`. Keep the first occurrence only for maximum length. Window input must be binary and flips are at most `k`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Require `k!=0`; for divisibility by negative `k`, use absolute modulus. If asking longest sum exactly `k`, store prefix values instead, not remainders. Sliding window generalises to longest substring with at most `k` distinct/bad items, but not arbitrary negative-sum constraints.

#### ALL VARIATIONS COVERED
- **Q253:** Store earliest normalised prefix remainder; equal remainders define a divisible subarray, so maximise index difference. ⚠️ Initial remainder `0→−1` captures prefixes from index zero.
- **Q254:** Expand a binary window and shrink only when zeros exceed `k`; maximum valid width is the answer.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, modular arithmetic, pigeonhole principle, sliding windows, at-most-k distinct, binary arrays, and complement budgets.

#### CODE / EXAMPLE (if applicable)
```text
first={0:-1}; prefix=0; best=0
for i,x in a:
    prefix+=x
    r=((prefix%k)+k)%k
    if r in first: best=max(best,i-first[r])
    else: first[r]=i
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive the equal-remainder equation and explain earliest-only storage. For the window, state its invariant before pointer moves. Avoid using a remainder frequency count when the objective is maximum length rather than count.

#### ONE-LINE SUMMARY
Equal prefix remainders create divisible ranges; a zero-budget window creates the longest flippable run of ones.

---

### CANDY DISTRIBUTION AND NON-DECREASING REPAIR ⚡⚠️
**Covers questions: 255, 258**

#### CORE CONCEPT (30 seconds)
Candy: give everyone one candy, scan left-to-right so higher-than-left gets one more, then right-to-left so higher-than-right gets at least one more than it; use the maximum of both requirements and sum. For array repair, **if one operation increments one element by 1**, scan left-to-right; whenever `a[i]<a[i−1]`, pay `a[i−1]−a[i]` and raise `a[i]` to `a[i−1]`. Both are linear greedy constraint propagation.

#### WHY IT EXISTS
Candy constraints come independently from left and right neighbours, so two directional passes capture the minimum required lower bounds. Increment-only repair has a forced minimum: a violating element must reach at least the previous repaired value, and raising it higher only costs more.

#### MENTAL MODEL
Candy builds minimum slopes from both sides and takes the taller requirement. Array repair lifts each low stair just enough to meet the preceding stair.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Candy two passes, `O(n)` time/`O(n)` space (or advanced constant-space slope method). Increment-only repair running previous value, `O(n)`/`O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Equal ratings impose no strict inequality. Candy reverse pass uses `max(current,right+1)`. Repair uses the already-repaired previous value, not the original one; use wide cost.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Q258 is underspecified. If decrement is also allowed with unit absolute cost, the problem becomes isotonic regression (often solved with a pooled/heap approach), not the simple greedy. If one arbitrary replacement costs one, LNDS-style reasoning may apply. Different operation models yield different optima.

#### ALL VARIATIONS COVERED
- **Q255:** Combine left and right minimum candy requirements, satisfying strict higher-rating neighbours with minimum total.
- **Q258:** Under increment-by-one-only operations, raise each violating value exactly to the repaired predecessor. ⚠️ Ask which operations/costs are allowed before answering.

#### CONNECTIONS TO OTHER TOPICS
Two-pass greedy, monotonic constraints, isotonic regression, longest non-decreasing subsequence, slope methods, and local-to-global lower bounds.

#### CODE / EXAMPLE (if applicable)
```text
candy[0..n-1]=1
for i=1..n-1:
    if rating[i]>rating[i-1]: candy[i]=candy[i-1]+1
for i=n-2 down to 0:
    if rating[i]>rating[i+1]: candy[i]=max(candy[i],candy[i+1]+1)
return sum(candy)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why one pass cannot see both candy constraints and why max preserves both. Challenge Q258's missing operation model. Avoid presenting the increment-only greedy for a problem that permits decrement/replacement.

#### ONE-LINE SUMMARY
Candy takes the maximum of two directional minimum slopes; increment-only array repair raises each violation by the smallest forced amount.

---

### MAXIMUM SUBMATRIX SUM NO LARGER THAN K ⚡⚠️
**Covers questions: 259**

#### CORE CONCEPT (30 seconds)
Choose pairs of row boundaries and compress the rows between them into one column-sum array. Now find the maximum subarray sum `≤k`: scan prefix sums `p` and use an ordered set to find the smallest previous prefix `q>=p−k`; candidate `p−q` is the best valid ending here. Complexity is `O(min(R,C)²·max(R,C)·log(max(R,C)))` after orienting the smaller dimension as the boundary-pair dimension.

#### WHY IT EXISTS
Every rectangle is determined by two row and two column boundaries. Fixing one boundary pair collapses 2D into 1D. The upper-bound constraint prevents ordinary Kadane; an ordered prefix set finds the closest allowed complement.

#### MENTAL MODEL
Compress a horizontal strip into column totals, then find the richest contiguous column segment that stays under a budget ceiling.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Row/column compression + ordered prefix sums. Initialise ordered set with zero.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For current prefix `p`, need `p−q<=k`, hence `q>=p−k`; choose the smallest such `q` using ceiling/lower_bound. Return immediately if candidate equals `k`, the theoretical best.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Use a multiset/tree structure; duplicate prefixes do not hurt value-only answers. Rotate/transposition choice reduces squared dimension. Negative values are fully supported. Prefix and answer require wide types. Without a balanced ordered set, maintaining sorted prefixes in an array may become quadratic per strip.

#### ALL VARIATIONS COVERED
- **Q259:** Compress boundary pairs and solve each 1D “max subarray ≤k” with ordered prefix ceilings. ⚠️ Kadane alone finds unconstrained maximum and can exceed `k`.

#### CONNECTIONS TO OTHER TOPICS
2D prefix sums, Kadane, ordered sets, prefix complements, range sums, binary search, and dimension reduction.

#### CODE / EXAMPLE (if applicable)
```text
for top in rows:
    sums[cols]=0
    for bottom from top onward:
        add matrix[bottom][c] into sums[c]
        ordered={0}; prefix=0
        for x in sums:
            prefix+=x
            q=ordered.ceiling(prefix-k)
            if q exists: answer=max(answer,prefix-q)
            ordered.add(prefix)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive `q>=p−k` aloud and explain dimension compression. State full complexity. Avoid brute-force four boundaries with inner summation or unconstrained Kadane.

#### ONE-LINE SUMMARY
Fix two matrix boundaries, compress to 1D, and use ordered prefix complements to get the best subarray not exceeding `k`.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q251/Q256/Q257 (counting recurrences)** connect to decoding, tiling, coin change, and recurrence acceleration.
- **Q252/Q260 (minimum-cost DP)** connect to unbounded knapsack, shortest paths in implicit graphs, and exact-fill problems.
- **Q253/Q254 (prefix/window)** prepare at-most-`k` distinct windows and modular-prefix problems.
- **Q255/Q258 (monotonic repair)** connect to local constraints, isotonic regression, and sequence adjustment.
- **Q259 (bounded rectangle)** combines matrix compression, prefix sums, and balanced ordered structures.

### Be Comfortable With Before Batch 27 (Questions 261–270)

- Maximum-weight bipartite matching/assignment modelling.
- Pancake sorting and prefix reversals.
- Size-`k` target-sum backtracking.
- Decoding-rule state definition.
- Interval graph colouring with a heap/sweep.
- Longest subarray with at most `k` distinct values.
- Sprague–Grundy/Nim xor.
- Minimum deletions to make two strings anagrams.
- Word-break/counting target strings from a dictionary.
- Reverse greedy reasoning for Broken Calculator.

### Batch 26 Rapid Recall

251. Stair ways use final steps 1/2/3.
252. Minimum squares uses `1+min(dp[x−square])`.
253. Longest divisible subarray uses earliest equal prefix remainder.
254. At-most-`k` zero flips use a zero-count sliding window.
255. Candy takes maximum left/right slope requirements.
256. Strict unequal-adjacent fence count is `k(k−1)^(n−1)`.
257. Cricket recurrence depends on ordered sequences versus combinations.
258. Increment-only repair raises each value to its repaired predecessor.
259. Compress matrix strips and query ordered prefix ceilings.
260. Priced unlimited jug sizes form unbounded exact-fill min-cost DP.
