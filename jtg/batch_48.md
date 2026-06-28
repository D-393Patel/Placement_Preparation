# JTG Technical Interview Coaching — Batch 48

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 3A — Technical Interview: Coding Rounds 1 & 2  
**Batch:** Questions 471–480

## Questions in This Batch

471. ⚡⚠️ Decode a run-length encoded string such as `3a2b → aaabb`.
472. ⚡ Find the minimum cost to connect all cities using available roads.
473. ⚡⚠️ Arrange integers to form the largest concatenated number.
474. ⚡ Find all unique triplets summing to zero.
475. ⚡⚠️ Decide whether a graph has an Eulerian path.
476. ⚡ Find the rotation point in a once-rotated sorted array.
477. ⚡⚠️ Implement a basic calculator supporting `+`, `−`, `×`, and `/`.
478. ⚡ Convert a Roman numeral string to an integer.
479. Count representations of `n` as a sum of consecutive positive integers.
480. ⚡⚠️ Find the celebrity at a party.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Tokenization and deterministic parsing | 471, 477, 478 | Each scans symbols into tokens while context determines how a token changes accumulated state. |
| B | Graph structure: spanning trees and Euler trails | 472, 475 | One chooses edges for minimum connectivity; the other checks whether every edge can belong to one valid trail. |
| C | Custom comparator sorting | 473 | Pairwise concatenation order defines which arrangement maximizes the complete number. |
| D | Ordering-based array reduction | 474, 476 | Sorting enables two-pointer elimination for 3Sum, while rotated order enables logarithmic boundary search. |
| E | Consecutive-sum number theory | 479 | Length and divisibility constraints reduce enumeration to `O(√n)` candidates or odd-divisor counting. |
| F | Candidate elimination plus verification | 480 | Pairwise knowledge eliminates one non-celebrity at a time, followed by a full proof check. |

---

### PARSING RUN-LENGTH, ARITHMETIC, AND ROMAN NUMERALS ⚡⚠️
**Covers questions: 471, 477, 478**

#### CORE CONCEPT (30 seconds)
Define the grammar, then scan while maintaining only the state that grammar needs. Run-length decoding parses a possibly multi-digit count followed by a symbol. A calculator tokenizes numbers/operators and applies multiplication/division before addition/subtraction. Roman conversion adds a symbol unless it precedes a larger symbol, in which case it subtracts it.

#### WHY IT EXISTS
Characters gain meaning from context: digits combine into one count/number, operators have precedence, and Roman symbols may be additive or subtractive. Explicit state prevents malformed input or incorrect evaluation order.

#### MENTAL MODEL
Read a sentence with punctuation rules: first group characters into meaningful tokens, then apply the language’s context and ordering rules.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Accumulate all count digits for Q471, enforce operator precedence for Q477, and subtract a Roman value when a larger value follows.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify whitespace, unary signs, division rounding, malformed input, count zero, and whether RLE symbols may be digits. A no-parentheses calculator can use a stack or `result + lastTerm`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Limit decoded output for untrusted RLE. Parentheses need stacks or recursive descent. Strict Roman validation also restricts repetitions and legal subtractive pairs such as `IV`, `IX`, `XL`, `XC`, `CD`, and `CM`.

#### ALL VARIATIONS COVERED
- **Q471:** Parse multi-digit counts, require the expected symbol, and guard malformed input/output explosion. ⚠️ Reading `12a` as `1` then `2` is wrong.
- **Q477:** Define unary signs, whitespace, division behavior, and whether parentheses are supported; resolve `*` and `/` before lower-precedence operations.
- **Q478:** Convert by looking one symbol ahead; if validity is not guaranteed, separately enforce repetition and subtractive-pair rules.

#### CONNECTIONS TO OTHER TOPICS
Finite-state machines, tokenizers, recursive-descent parsers, stacks, expression trees, serialization, and decompression safety.

#### CODE / EXAMPLE (if applicable)
```text
# Roman conversion
total=0
for i in 0..n-1:
    value=roman[s[i]]
    if i+1<n and value<roman[s[i+1]]: total-=value
    else: total+=value

# Calculator without parentheses
result=0; last=0; number=0; operator='+'
on each operator or end sentinel:
    apply previous operator to last/result and number
return result+last
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify grammar before code, especially for the calculator. Keep tokenization and evaluation conceptually separate, and test multi-digit tokens, invalid endings, unary negatives, and subtractive Roman cases.

#### ONE-LINE SUMMARY
Define the language first, tokenize deterministically, and let count, precedence, or neighboring symbols control each state update.

---

### MINIMUM CITY CONNECTION AND EULERIAN PATH CONDITIONS ⚡⚠️
**Covers questions: 472, 475**

#### CORE CONCEPT (30 seconds)
For minimum road cost, compute a minimum spanning tree: sort roads by cost and use DSU to add an edge only when it joins different components. For an Eulerian path, require all non-isolated vertices to be connected and check degrees: an undirected graph needs zero or two odd-degree vertices; a directed graph needs balanced indegree/outdegree except possibly one start with `out=in+1` and one end with `in=out+1`.

#### WHY IT EXISTS
MST algorithms remove cycle redundancy while preserving cheapest connectivity. Euler trails pair every arrival and departure at intermediate vertices, leaving unmatched degree only at possible endpoints.

#### MENTAL MODEL
MST builds the cheapest road network without circular detours. An Euler walk uses every road once, so intermediate cities must pair each arrival with a departure.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Kruskal sorts edges and unions components. An undirected Euler path has two odd vertices; a circuit has none.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q472 returns impossible when fewer than `n−1` unions occur; time is `O(m log m)`. Q475 ignores isolated vertices in connectivity checks and distinguishes directed from undirected conditions.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Hierholzer constructs the actual Euler trail in `O(V+E)`. Prim may better suit adjacency/dense representations. Preconnected cities can be unioned first.

#### ALL VARIATIONS COVERED
- **Q472:** Use Kruskal/DSU or Prim and detect a disconnected graph instead of returning a partial-forest cost.
- **Q475:** Ask whether the graph is directed; verify non-isolated connectivity plus the correct degree pattern. ⚠️ Degree conditions alone are insufficient.

#### CONNECTIONS TO OTHER TOPICS
Kruskal, Prim, DSU, cut property, spanning forests, Hierholzer’s algorithm, connectivity, and degree parity.

#### CODE / EXAMPLE (if applicable)
```text
# Kruskal
sort roads by cost
cost=0; used=0
for (w,u,v) in roads:
    if find(u)!=find(v):
        union(u,v); cost+=w; used+=1
return cost if used==n-1 else impossible

# Undirected Euler existence
if nonzero-degree vertices not connected: return false
odd=count(v where degree[v] is odd)
return odd==0 or odd==2
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the graph model and disconnected behavior. For Euler paths, address connectivity and directed-versus-undirected degree rules before implementation.

#### ONE-LINE SUMMARY
Use an MST for cheapest connectivity; an Euler trail needs one relevant component and only the permitted endpoint degree imbalance.

---

### LARGEST CONCATENATED NUMBER WITH A CUSTOM ORDER ⚡⚠️
**Covers questions: 473**

#### CORE CONCEPT (30 seconds)
Convert values to strings and sort them so `a` precedes `b` when `a+b > b+a`. Concatenate the result. If the first character is zero, return `"0"` to collapse all-zero input. Sorting takes `O(n log n)` comparisons, each depending on string length.

#### WHY IT EXISTS
Numeric or ordinary lexicographic descending order is insufficient. Comparing both pair concatenations directly measures which local order creates the larger global prefix.

#### MENTAL MODEL
For every pair of number cards, test both side-by-side orders and keep the one displaying the larger number.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Compare `a+b` with `b+a` and return a string because the answer may exceed integer limits.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use an adjacent-swap proof: any adjacent pair violating the comparator can be swapped to increase the entire concatenation.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  State the nonnegative-input assumption, implement the language’s comparator contract correctly, and cache string forms.

#### ALL VARIATIONS COVERED
- **Q473:** Sort string forms by pair concatenation and collapse a leading-zero result. ⚠️ Ordinary numeric or lexicographic order is wrong.

#### CONNECTIONS TO OTHER TOPICS
Custom comparators, exchange arguments, greedy ordering, lexicographic optimization, and big-number strings.

#### CODE / EXAMPLE (if applicable)
```text
parts=map each value to string
sort parts with comparator:
    a before b if a+b > b+a
if parts[0]=='0': return "0"
return concatenate(parts)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove the comparator by adjacent exchange and test `[3,30,34,5,9]`, prefix-related strings, and all zeroes.

#### ONE-LINE SUMMARY
Order every pair by whichever concatenation is larger; no comparator inversion means the whole concatenation is maximal.

---

### ORDERED ARRAYS: 3SUM AND ROTATION POINT ⚡
**Covers questions: 474, 476**

#### CORE CONCEPT (30 seconds)
For 3Sum, sort, fix one value, and use left/right pointers to move the sum toward zero while skipping duplicates; time is `O(n²)`. For a rotated strictly increasing array, binary-search the minimum: if `a[mid]>a[right]`, the rotation point is right of `mid`; otherwise it is at `mid` or left. Time is `O(log n)`.

#### WHY IT EXISTS
Ordering gives directional elimination. Pointer moves change a 3Sum total monotonically, while comparison with the right boundary identifies which side contains the one rotation cliff.

#### MENTAL MODEL
3Sum squeezes two pointers around a target after fixing an anchor. Rotation search keeps the half containing the cliff where the sorted sequence wraps.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Skip duplicate anchors and pointer values for Q474. Q476 returns zero for an unrotated array and handles one element.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use a wide sum. In rotation search, `right=mid` preserves `mid` as a possible minimum.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicates can force `right--` and degrade rotation search to `O(n)`. 3Sum can prune impossible anchors.

#### ALL VARIATIONS COVERED
- **Q474:** Sort, anchor each unique first value, use two pointers, and skip duplicates so each value triplet is emitted once.
- **Q476:** Compare `mid` with `right` to retain the half containing the minimum; clarify whether duplicates are allowed.

#### CONNECTIONS TO OTHER TOPICS
Two-sum, k-sum, binary search, rotated-array search, duplicate handling, and overflow-safe arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
# Rotation point
left=0; right=n-1
while left<right:
    mid=left+(right-left)/2
    if a[mid]>a[right]: left=mid+1
    else: right=mid
return left

# 3Sum: sort; for each unique i, move left/right by sum comparison
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the monotonic effect of every pointer move. For rotation, justify why the remaining interval always contains the minimum.

#### ONE-LINE SUMMARY
Sorting reduces 3Sum to anchor-plus-two-pointers, while one rotation cliff allows binary elimination around the minimum.

---

### CONSECUTIVE POSITIVE SUM REPRESENTATIONS
**Covers questions: 479**

#### CORE CONCEPT (30 seconds)
For length `L` and positive start `a`, `n=L(2a+L−1)/2`, so `a=(n−L(L−1)/2)/L`. Try lengths while a positive start remains and count when the numerator is divisible by `L`. This is `O(√n)` time and `O(1)` space. Equivalently, the answer equals the number of odd divisors of `n`.

#### WHY IT EXISTS
Once sequence length is chosen, the start value is forced. The arithmetic-progression formula converts partition enumeration into divisibility checks.

#### MENTAL MODEL
For each row length, subtract the staircase `0+1+...+(L−1)`; the remainder must divide evenly into `L` equal starting blocks.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  The single-term representation counts unless length must be at least two; starts must be positive.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Iterate while `L(L+1)/2<=n`, use wide arithmetic, and check divisibility.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Factoring out powers of two leaves the odd-divisor count. Allowing negative starts changes the valid length range.

#### ALL VARIATIONS COVERED
- **Q479:** Count lengths yielding a positive integer start, or count odd divisors; subtract one if one-term representations are excluded.

#### CONNECTIONS TO OTHER TOPICS
Arithmetic progressions, triangular numbers, divisor counting, parity, prime factorization, and Diophantine equations.

#### CODE / EXAMPLE (if applicable)
```text
count=0; length=1
while length*(length+1)/2<=n:
    remaining=n-length*(length-1)/2
    if remaining%length==0: count+=1
    length+=1
return count
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive the formula aloud and clarify whether a single number counts. Mention odd divisors as the deeper connection after the clean `O(√n)` solution.

#### ONE-LINE SUMMARY
Choose a length; after subtracting its staircase, a representation exists exactly when the remainder divides into a positive integer start.

---

### CELEBRITY FINDING BY ELIMINATION AND VERIFICATION ⚡⚠️
**Covers questions: 480**

#### CORE CONCEPT (30 seconds)
A celebrity knows nobody and is known by everybody. Keep candidate `c=0`; for each `i`, if `c` knows `i`, eliminate `c` and set `c=i`; otherwise eliminate `i`. Then verify that `c` knows nobody and everyone knows `c`. Time is `O(n)`, space `O(1)`.

#### WHY IT EXISTS
One relationship query eliminates one of two people. The first pass leaves only a possible candidate; verification handles the case where no celebrity exists.

#### MENTAL MODEL
Run a knockout tournament, then perform a complete background check on the sole survivor.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Eliminate, then verify; return `−1` if verification fails.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  If `c` knows `i`, `c` fails; otherwise `i` fails because a celebrity must be known by `c`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Linear queries are asymptotically necessary for verification. Remote/unreliable queries introduce caching and consistency concerns.

#### ALL VARIATIONS COVERED
- **Q480:** Eliminate to one possible candidate, then verify both universal conditions. ⚠️ Returning the survivor without verification is incorrect when no celebrity exists.

#### CONNECTIONS TO OTHER TOPICS
Tournament elimination, Boyer–Moore majority voting, universal graph sinks, oracle-query complexity, and filter-then-verify patterns.

#### CODE / EXAMPLE (if applicable)
```text
candidate=0
for person in 1..n-1:
    if knows(candidate,person): candidate=person
for person in 0..n-1:
    if person==candidate: continue
    if knows(candidate,person) or not knows(person,candidate): return -1
return candidate
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain why each comparison eliminates one candidate and why verification is logically necessary.

#### ONE-LINE SUMMARY
Use every knowledge query to eliminate one person, then verify the only survivor against both celebrity conditions.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q471, Q477, and Q478** connect to tokenizers, recursive-descent parsing, state machines, serialization, and safe decompression.
- **Q472 and Q475** prepare you for DSU, spanning trees, graph trails, Hierholzer, and connectivity proofs.
- **Q473** connects to custom comparators and exchange arguments.
- **Q474 and Q476** prepare you for k-sum, duplicate-aware scans, and rotated binary search.
- **Q479** links algorithms with arithmetic progressions, divisor counting, and factorization.
- **Q480** connects to elimination algorithms, universal sinks, majority candidates, and verification phases.

### What to be comfortable with before Batch 49

- Define token grammar and malformed-input behavior before parsing.
- Choose Kruskal/Prim from representation and detect disconnection.
- Distinguish directed and undirected Euler path conditions.
- Prove a custom comparator by adjacent exchange.
- Skip duplicates correctly in sorted two-pointer enumeration.
- Preserve binary-search candidates with correct boundaries.
- Derive counting from an arithmetic-progression equation.
- Separate fast candidate elimination from final verification.

## Batch 48 Rapid Recall

1. **RLE:** parse the full count, then emit safely.
2. **Connect cities:** MST plus disconnected check.
3. **Largest number:** compare `a+b` with `b+a`.
4. **3Sum:** sorted anchor and duplicate-aware pointers.
5. **Euler path:** connectivity plus degree balance.
6. **Rotation point:** compare midpoint with right boundary.
7. **Calculator:** tokenize and enforce precedence.
8. **Roman:** subtract when a larger symbol follows.
9. **Consecutive sums:** length divisibility or odd divisors.
10. **Celebrity:** eliminate one candidate, then verify.
