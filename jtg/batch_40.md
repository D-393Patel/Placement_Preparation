# JTG Technical Interview Coaching — Batch 40

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source sections:** Stage 1C — Online Assessment: Coding (Questions 391–397), then Stage 2 — Video & Tech Evaluation (Questions 398–400)  
**Batch:** Questions 391–400

## Questions in This Batch

391. ⚡ Find the longest consecutive sequence in an unsorted array in `O(n)` time.
392. ⚡⚠️ Find the minimum cost to hire exactly `k` workers from quality and wage arrays.
393. ⚡ Count subarrays containing at most `k` distinct integers.
394. ⚡⚠️ Find the maximum number of visible buildings from a vantage point using a stack.
395. ⚡⚠️ Count pairs whose sum is divisible by `k`.
396. ⚡ Find the longest subarray containing equal numbers of zeroes and ones.
397. ⚡⚠️ Find the shortest subarray to remove so the remaining array is sorted.
398. ⚡ Walk through a solution you wrote in the online assessment, step by step.
399. ⚡ Explain the time and space complexity of your coding solution.
400. ⚡ Explain why you chose your algorithm instead of the alternatives.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Hash-based boundary/prefix invariants | 391, 396 | A set identifies starts of consecutive runs; a first-seen prefix balance identifies the longest equal-count range. |
| B | Ratio sorting with a size-bounded heap | 392 | Each candidate captain fixes a pay ratio while a heap keeps the smallest total quality team. |
| C | At-most-k sliding window counting | 393 | Positive window frequency changes allow one monotonic left boundary and suffix counting. |
| D | Monotonic visibility stack | 394 | Occluded buildings are removed while a stack preserves the visible skyline frontier. |
| E | Modular complement counting | 395 | Each remainder pairs only with its additive complement modulo `k`. |
| F | Sorted prefix/suffix merging | 397 | Keep the longest mergeable sorted prefix and suffix; remove the middle gap. |
| G | Technical-solution communication | 398, 399, 400 | Walkthrough, complexity, and algorithm choice are three views of one defensible solution narrative. |

---

### HASH INVARIANTS: CONSECUTIVE RUNS AND BALANCED BINARY SUBARRAYS ⚡
**Covers questions: 391, 396**

#### CORE CONCEPT (30 seconds)
Use hashing to recognize where a candidate range starts. For longest consecutive sequence, put values in a set and begin counting only at `x` when `x−1` is absent; then extend through `x+1,x+2,...`. For equal zeroes and ones, map `0→−1` and `1→+1`; equal prefix balances at indexes `i` and `j` mean the subarray between them sums to zero, so store each balance's earliest index.

#### WHY IT EXISTS
Q391 avoids restarting from every number by expanding each run only from its unique smallest value. Q396 converts a count equality into a zero-sum condition, then uses repeated prefix state to identify a balanced interval.

#### MENTAL MODEL
For Q391, enter a train only at the first carriage—never in the middle. For Q396, altitude rises on `1` and falls on `0`; revisiting an altitude means the journey between visits had equal climbs and descents.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  A hash set gives expected `O(1)` membership. Initialize balance `0` at virtual index `−1` so a balanced prefix starting at index zero is counted.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q391 must check only run starts; duplicates disappear in the set. Q396 stores the first occurrence of each balance because the earliest index maximizes future length. Both use expected `O(n)` time and `O(n)` space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Hash complexity is expected, not worst-case under arbitrary collision attacks. Q391 must guard integer overflow around extreme values when checking `x−1`/incrementing. Q396 generalizes to equal counts of two symbols by adding `+1/−1`; equal counts of three categories require a pair of prefix differences.

#### ALL VARIATIONS COVERED
- **Q391:** Insert all values, expand only from values with no predecessor, and take the longest run. This ensures each distinct value participates in at most one expansion.
- **Q396:** Convert zero to `−1`, retain the first index of each prefix balance, and maximize the distance when that balance repeats.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, zero-sum subarrays, longest arithmetic runs, hash sets/maps, connected components on integers, equal-frequency ranges, and coordinate differences.

#### CODE / EXAMPLE (if applicable)
```text
# Q391
values=set(a); best=0
for x in values:
    if x-1 not in values:
        y=x
        while y in values: y+=1
        best=max(best,y-x)

# Q396
first={0:-1}; balance=0; best=0
for i,x in enumerate(a):
    balance += 1 if x==1 else -1
    if balance in first: best=max(best,i-first[balance])
    else: first[balance]=i
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say what prevents quadratic rescanning in Q391 and why Q396 stores the earliest—not latest—prefix index. Dry-run duplicates for Q391 and a balanced prefix for Q396.

#### ONE-LINE SUMMARY
Start each integer run only at its missing-predecessor boundary; start each balanced range between two equal prefix balances.

---

### MINIMUM COST TO HIRE K WORKERS ⚡⚠️
**Covers questions: 392**

#### CORE CONCEPT (30 seconds)
Each worker requires at least `wage[i]/quality[i]` pay per quality unit. Sort workers by that ratio. While scanning ratios upward, treat the current worker as fixing the team's maximum ratio, keep the `k` smallest qualities seen using a max-heap, and evaluate `qualitySum×currentRatio` whenever the heap has size `k`. Complexity is `O(n log n+n log k)` time and `O(k)` extra space after sorting.

#### WHY IT EXISTS
To pay workers proportionally to quality while satisfying every minimum wage, a chosen group must use a ratio at least as large as its largest individual requirement. Once that maximum ratio is fixed, minimizing total cost means minimizing the chosen total quality.

#### MENTAL MODEL
The most demanding worker sets one pay rate per quality point for the entire team. At each possible rate, retain only the `k` lightest quality loads affordable under it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort by `wage/quality`, use a max-heap for qualities, and remove the largest quality when more than `k` workers are retained.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Maintain the exact quality sum. Evaluate only after heap size is `k`. Explain why every optimal group is considered when its maximum required ratio appears in sorted order.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Floating-point ratio comparisons may be performed by cross multiplication `w1*q2` versus `w2*q1` using sufficiently wide arithmetic, though final cost is fractional. Validate positive quality and `1<=k<=n`. The heap invariant is “smallest total quality among processed candidates,” not merely closest ratios.

#### ALL VARIATIONS COVERED
- **Q392:** Sort by required wage-to-quality ratio, maintain the `k` smallest processed qualities, and multiply their sum by the current maximum ratio. ⚠️ Choosing the `k` smallest wages independently violates proportional-pay constraints.

#### CONNECTIONS TO OTHER TOPICS
Greedy ratio ordering, top-k heaps, fractional optimization, scheduling, exchange arguments, and precision-safe comparisons.

#### CODE / EXAMPLE (if applicable)
```text
workers=sort((wage[i]/quality[i],quality[i]))
maxHeap=[]; qualitySum=0; answer=INF
for ratio,q in workers:
    push q; qualitySum+=q
    if heap.size>k: qualitySum-=popLargest()
    if heap.size==k: answer=min(answer,qualitySum*ratio)
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive the shared-ratio constraint before presenting the heap. State precisely what the sorted prefix and heap represent. Mention numeric precision without letting it obscure the main proof.

#### ONE-LINE SUMMARY
Let each worker be the team's maximum pay ratio and pair that ratio with the `k` smallest qualities available so far.

---

### SUBARRAYS WITH AT MOST K DISTINCT VALUES ⚡
**Covers questions: 393**

#### CORE CONCEPT (30 seconds)
Maintain a frequency map for window `[left,right]`. Add `a[right]`; while distinct count exceeds `k`, remove values from the left and delete zero frequencies. Once valid, every suffix ending at `right` and starting from `left..right` is valid, so add `right−left+1`. Time is `O(n)` expected and space `O(k)` for the active map.

#### WHY IT EXISTS
With an at-most constraint, removing elements cannot introduce a new distinct value, so validity is monotonic as the left boundary advances. Once the longest valid suffix window is known, all shorter suffixes inside it are also valid.

#### MENTAL MODEL
Keep a basket containing at most `k` colors. When a new color overfills it, discard from the oldest end until legal; every suffix of the legal basket is another valid subarray.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Count frequencies, not merely membership, because a value remains distinct until its last copy leaves. For `k<0`, answer is zero; for `k=0`, no non-empty subarray qualifies.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Prove the `right−left+1` contribution. Each index enters and leaves once, giving linear traversal despite the inner `while`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Exactly `k` distinct equals `atMost(k)−atMost(k−1)`. A dual-window technique can compute exact-k directly. Hash-map complexity and large output counts require attention.

#### ALL VARIATIONS COVERED
- **Q393:** Shrink only when distinct count exceeds `k`, then count every valid suffix ending at the current right index.

#### CONNECTIONS TO OTHER TOPICS
Exactly-k distinct subarrays, fruit into baskets, longest replacement windows, frequency maps, two pointers, and inclusion by subtraction.

#### CODE / EXAMPLE (if applicable)
```text
left=0; answer=0; freq={}
for right in 0..n-1:
    increment freq[a[right]]
    while freq.size>k:
        decrement freq[a[left]]
        if freq[a[left]]==0: delete it
        left+=1
    answer+=right-left+1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the suffix-count formula and frequency deletion. If the interviewer pivots to exactly `k`, immediately use the at-most subtraction identity.

#### ONE-LINE SUMMARY
Keep the longest window with at most `k` values and add its length as the number of valid suffixes ending at each right boundary.

---

### VISIBLE BUILDINGS WITH A MONOTONIC STACK ⚡⚠️
**Covers questions: 394**

#### CORE CONCEPT (30 seconds)
Visibility wording must be defined. In the standard stack formulation, scan buildings from the vantage direction and keep a monotonic decreasing stack of heights representing the current visible frontier; when a new building is tall enough to hide shorter/equal buildings behind it, pop them, then push the new building. The maximum/current visible count comes from stack size, with equality rules determined by whether equal-height buildings block one another.

#### WHY IT EXISTS
A building permanently hidden by a nearer, at-least-as-tall building can never become visible again as scanning continues. The stack discards exactly those dominated candidates while retaining buildings that form the skyline.

#### MENTAL MODEL
Look down a street from one end. Each nearer tall building erases shorter silhouettes behind it; the stack holds only the surviving skyline layers.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  State scan direction and visibility rule. A monotonic stack stores candidates that are not yet occluded.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Decide whether to pop `<` or `<=` for equal heights and whether the question asks final visible count, maximum simultaneous count, or per-building visibility. Each building is pushed and popped at most once, so time is `O(n)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Some “visible people/buildings” variants count pairwise lines of sight and require compressed `(height,count)` stack entries for duplicates; others require increasing maxima from a fixed observer and no stack at all. The phrase alone does not uniquely specify the algorithm.

#### ALL VARIATIONS COVERED
- **Q394:** Confirm vantage direction and blocking/equality semantics, then maintain the monotonic skyline and track stack size or visibility counts as requested. ⚠️ Different common variants have different pop conditions and outputs.

#### CONNECTIONS TO OTHER TOPICS
Next greater element, stock span, skyline problems, visible people in a queue, histogram stacks, dominance, and amortized analysis.

#### CODE / EXAMPLE (if applicable)
```text
stack=[]; best=0
for height in buildings scanned from the stated vantage direction:
    while stack not empty and stack.top<=height:
        stack.pop()
    stack.push(height)
    best=max(best,stack.size)
return best   # if maximum simultaneous skyline size is requested
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarification is the main test here. Draw three buildings including equal heights and agree on who blocks whom. Then state the stack invariant and use push-once/pop-once amortized reasoning.

#### ONE-LINE SUMMARY
Maintain only the undominated skyline in a monotonic stack, with scan direction and equal-height blocking defined first.

---

### PAIRS WHOSE SUM IS DIVISIBLE BY K ⚡⚠️
**Covers questions: 395**

#### CORE CONCEPT (30 seconds)
For each value, normalize remainder `r=((value%k)+k)%k`. A previous value forms a divisible sum exactly when its remainder is `(k−r)%k`. Add the stored count of that complement, then increment `count[r]`. This counts each pair once in `O(n)` time and `O(k)` space.

#### WHY IT EXISTS
Divisibility depends only on remainders: `(a+b)%k=0` iff their remainders are additive inverses modulo `k`. Query-before-insert ensures the current element pairs only with earlier elements.

#### MENTAL MODEL
Remainder buckets have partners: bucket `1` pairs with `k−1`, `2` with `k−2`, while bucket `0` pairs with itself.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Require `k>0`. Remainder zero pairs with zero; when `k` is even, `k/2` pairs with itself.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Normalize negative-language modulo results. Streaming query-then-insert avoids separate `c choose 2` case formulas and double counting. Use a wide answer type because pair count can reach `n(n−1)/2`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A post-frequency solution uses `count[0] choose 2`, complement bucket products once, and the half-remainder self-pair. The streaming formulation generalizes naturally to target remainder `t` using complement `(t−r+k)%k`.

#### ALL VARIATIONS COVERED
- **Q395:** Normalize each remainder, count earlier complementary remainders, and insert afterward. ⚠️ Raw `%` may be negative, and self-complement buckets must not be double-counted.

#### CONNECTIONS TO OTHER TOPICS
Two-sum, modular arithmetic, remainder classes, divisible subarrays, streaming pair counts, and combinatorics.

#### CODE / EXAMPLE (if applicable)
```text
freq=[0]*k; answer=0
for x in a:
    r=((x%k)+k)%k
    answer+=freq[(k-r)%k]
    freq[r]+=1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why query-before-insert counts unordered index pairs exactly once. Test remainder zero, `k/2`, negatives, and repeated values.

#### ONE-LINE SUMMARY
Each value pairs with previously seen values in its complementary remainder bucket modulo `k`.

---

### SHORTEST REMOVAL TO MAKE AN ARRAY SORTED ⚡⚠️
**Covers questions: 397**

#### CORE CONCEPT (30 seconds)
Find the longest nondecreasing prefix ending at `left` and longest nondecreasing suffix starting at `right`. Removing everything after the prefix or before the suffix gives a baseline. Then use two pointers `i` in the prefix and `j` in the suffix: if `a[i]<=a[j]`, they can be joined and removal length is `j−i−1`; otherwise advance `j`. Minimum over all joins is the answer. Time is `O(n)`, space `O(1)`.

#### WHY IT EXISTS
After removing one contiguous subarray, every retained element belongs to an original prefix or suffix. Those pieces must each already be sorted; only their join condition remains to be optimized.

#### MENTAL MODEL
Keep a sorted left rail and a sorted right rail, then slide their endpoints until they connect without descending. Remove the gap between the best connection.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  If the whole array is already nondecreasing, return zero. Equal adjacent values are allowed under the usual sorted definition.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Baseline is `min(n−left−1,right)`. The two-pointer scan is monotonic because both retained regions are sorted. Compare `<=`, not `<`, unless strictly increasing output is required.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Be clear that exactly one contiguous segment may be removed. Returning the segment boundaries needs saving the best `(i+1,j−1)`. If arbitrary elements can be removed, the problem becomes `n−LNDS`, which is different.

#### ALL VARIATIONS COVERED
- **Q397:** Identify sorted prefix/suffix and minimize the middle gap over all mergeable endpoint pairs. ⚠️ Do not confuse one contiguous removal with arbitrary deletions.

#### CONNECTIONS TO OTHER TOPICS
Merge procedure, longest nondecreasing subsequence, two pointers, prefix/suffix preprocessing, array repair, and interval removal.

#### CODE / EXAMPLE (if applicable)
```text
left=0
while left+1<n and a[left]<=a[left+1]: left+=1
if left==n-1: return 0
right=n-1
while right>0 and a[right-1]<=a[right]: right-=1
answer=min(n-left-1,right)
i=0; j=right
while i<=left and j<n:
    if a[i]<=a[j]: answer=min(answer,j-i-1); i+=1
    else: j+=1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
First state the structure of any valid remainder: sorted prefix plus sorted suffix. Dry-run a fully sorted array, a descending array, and a case where the best answer removes a middle block.

#### ONE-LINE SUMMARY
Keep the longest mergeable sorted prefix and suffix and remove only the smallest gap between them.

---

### EXPLAINING AND DEFENDING YOUR CODING SOLUTION AT JTG ⚡
**Covers questions: 398, 399, 400**

#### CORE CONCEPT (30 seconds)
Give one coherent story: restate the problem and assumptions, show the key observation, define the invariant/state, walk through the algorithm on a small input, prove why it works, state time and auxiliary-space complexity, then compare the chosen approach with a brute-force baseline and realistic alternatives. Speak in the same order your code executes.

#### WHY IT EXISTS
JTG is checking authenticity and engineering judgment, not only whether you remember an answer. A candidate who genuinely solved the problem can explain decisions, trace state changes, quantify cost, and discuss trade-offs without hiding behind code syntax.

#### MENTAL MODEL
Tell the solution as a courtroom case: define the claim, present the central evidence/invariant, reenact one example, prove the conclusion, disclose its cost, and explain why competing approaches were rejected.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use: problem → example → approach → code flow → complexity → edge cases. Know what `n` represents and separate time from space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Explain each data structure's job, identify the dominant loop/recursion, include sorting/preprocessing cost, count auxiliary rather than input/output space consistently, and compare against at least the obvious brute-force method.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  State expected versus worst-case hash behavior, recursion-stack cost, numeric overflow, mutation, and constraint-driven choices. Admit when an alternative has better asymptotics but worse implementation complexity or is unnecessary for given limits.

#### ALL VARIATIONS COVERED
- **Q398:** Walk from requirements and assumptions to the key insight, invariant, trace, correctness, and edge cases—do not narrate syntax line by line without explaining purpose.
- **Q399:** Define input variables, derive each phase's cost, combine phases correctly, and state auxiliary space including maps/heaps/DP/recursion stack.
- **Q400:** Compare the selected algorithm with brute force and the strongest reasonable alternative using correctness, asymptotics, memory, implementation risk, and input constraints.

#### CONNECTIONS TO OTHER TOPICS
Correctness proofs, dry runs, complexity analysis, debugging, code reviews, system constraints, trade-off communication, and behavioral authenticity.

#### CODE / EXAMPLE (if applicable)
```text
60-second answer template:
1. “We need to ..., under assumptions ...”
2. “Brute force would ... and costs ...”
3. “The key observation is ...”
4. “I maintain ...; after every iteration it means ...”
5. “On input ..., the state changes ...”
6. “Therefore correctness follows because ...”
7. “Time is ... and auxiliary space is ...”
8. “I chose it over ... because the constraints/trade-off are ...”
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use your own assessment solution and vocabulary; rehearsed generic claims are easy to detect. Think aloud in small, checkable steps. If you made a trade-off, own it. Never claim `O(n)` merely because there is one visible loop—include nested work, sorting, hash assumptions, and output size.

#### ONE-LINE SUMMARY
Explain the solution as an evidence-backed chain from assumptions and invariant to trace, proof, complexity, and constraint-based trade-off.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q391 and Q396** connect to prefix-state hashing, zero-sum ranges, frequency balancing, and expected-linear set algorithms.
- **Q392** prepares you for ratio-greedy selection, bounded heaps, and precision-aware optimization.
- **Q393** connects directly to exactly-k distinct, sliding-window counting, and suffix-contribution proofs.
- **Q394** prepares you for next-greater, skyline, histogram, and amortized monotonic-stack questions.
- **Q395** links modular complements to two-sum, divisible subarrays, and remainder-frequency counting.
- **Q397** connects to prefix/suffix merging, array repair, and the difference between interval removal and arbitrary deletion.
- **Q398–Q400** are the foundation for later Stage 2 questions on debugging, traces, edge cases, optimization, and alternative data structures.

### What to be comfortable with before Batch 41

- Explain why a hash-based algorithm is linear in expectation and what prevents repeated work.
- Derive a ratio-sorted heap invariant rather than memorizing the worker-hiring solution.
- Count all valid window suffixes after restoring an at-most constraint.
- Clarify visibility semantics before selecting a monotonic stack rule.
- Normalize negative remainders and handle self-complement remainder classes.
- Merge sorted prefix and suffix with a monotonic two-pointer scan.
- Deliver a two-minute solution narrative with a trace, proof, complexity, and alternative comparison.

## Batch 40 Rapid Recall

1. **Consecutive run:** expand only from a missing-predecessor start.
2. **Hire workers:** current ratio times the `k` smallest qualities so far.
3. **At most k distinct:** valid window length counts ending suffixes.
4. **Visible buildings:** maintain the undominated skyline stack after defining visibility.
5. **Divisible pairs:** query the modular complement before inserting.
6. **Equal 0/1:** repeated `+1/−1` prefix balance.
7. **Sorted removal:** merge a sorted prefix with a sorted suffix.
8. **Walkthrough:** assumption → insight → invariant → trace → proof.
9. **Complexity:** derive every phase and include auxiliary structures.
10. **Algorithm choice:** compare against baseline and alternatives using constraints.
