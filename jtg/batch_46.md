# JTG Technical Interview Coaching — Batch 46

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source sections:** Stage 2 — Video & Tech Evaluation (Questions 451–457), then Stage 3A — Technical Interview: Coding Rounds 1 & 2 (Questions 458–460)  
**Batch:** Questions 451–460

## Questions in This Batch

451. ⚡ Explain the invariant maintained throughout your algorithm.
452. ⚡ Explain how you would modify the solution for an additional constraint.
453. Explain how your solution compares with a standard-library implementation.
454. ⚡ Describe the most interesting test case for your solution.
455. ⚡ Explain how you would benchmark the solution against an alternative.
456. ⚡ Explain what you would change for a production implementation.
457. ⚡⚠️ Explain scaling from `10³` to `10⁶` input elements.
458. ⚡⚠️ Find the maximum sum of a contiguous subarray.
459. ⚡⚠️ Decide whether a string is a valid number.
460. ⚡ Find the size of the largest island in a binary grid.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Invariant-driven adaptation and adversarial testing | 451, 452, 454 | The invariant explains correctness, a new constraint identifies what must change, and the best test targets that exact boundary. |
| B | Comparative engineering and scalability | 453, 455, 456, 457 | Library comparison, benchmarking, productionization, and scaling all evaluate an implementation under realistic costs and constraints. |
| C | Best-ending-here dynamic programming | 458 | Kadane's recurrence decides whether to extend the previous subarray or restart at the current value. |
| D | Grammar/state-machine validation | 459 | A valid numeric string is recognized by explicit syntax rules and legal state transitions. |
| E | Grid connected-component traversal | 460 | Each island is a four-direction component; flood fill counts it once and tracks the maximum size. |

---

### INVARIANTS, NEW CONSTRAINTS, AND HIGH-VALUE TEST CASES ⚡
**Covers questions: 451, 452, 454**

#### CORE CONCEPT (30 seconds)
State an invariant as a precise meaning of the maintained state after each iteration or recursive return. When a new constraint arrives, identify which assumption or state transition it invalidates, then minimally extend the state/algorithm and re-prove the invariant. The most interesting test is the smallest case that exercises the fragile transition, breaks a tempting wrong solution, or reaches a constraint boundary.

#### WHY IT EXISTS
An invariant is the bridge between code and correctness. It also localizes change: if requirements evolve, you can see whether the existing proof still holds and exactly which state is missing. Targeted tests then challenge that modified proof.

#### MENTAL MODEL
The invariant is a contract checked at every checkpoint. A new constraint edits the contract; the most useful test goes directly to the clause most likely to fail.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Say what each key variable represents, when the statement is true, and how one iteration preserves it.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Cover initialization, maintenance, and termination. For a new constraint, give a counterexample to the old approach, update state/transitions, and recalculate complexity. Choose a test with a hand-verifiable expected output.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Separate representation invariants from algorithmic invariants, use multiple invariants only when necessary, and derive property-based tests from them. Explain whether the added constraint changes feasibility, only complexity, or the entire algorithmic family.

#### ALL VARIATIONS COVERED
- **Q451:** State a falsifiable invariant tied to the key state, then prove initialization, preservation, and why it implies the answer at termination.
- **Q452:** Name the exact old assumption invalidated by the new constraint, show a counterexample, modify state/transition, and update proof plus complexity.
- **Q454:** Pick a compact adversarial case that activates the critical branch or defeats a common wrong approach; explain expected state changes and result.

#### CONNECTIONS TO OTHER TOPICS
Correctness proofs, loop invariants, regression tests, requirements changes, state design, counterexamples, property-based testing, and debugging.

#### CODE / EXAMPLE (if applicable)
```text
Answer template:
Invariant: after processing prefix/state ..., variable ... equals ...
Initialization: ...
Preservation: operation ... changes state while keeping ... true.
Termination: invariant + stop condition gives ...

New constraint: ...
Old failure example: ...
Required extra state/rule: ...
New complexity: ...
Most revealing test: ... -> expected ..., because ...
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use the invariant you actually relied on while coding, not an abstract sentence added afterward. JTG values candidates who can absorb a changed constraint without discarding all prior reasoning.

#### ONE-LINE SUMMARY
Define the state contract, update only what the new constraint breaks, and test the smallest case that attacks the revised invariant.

---

### LIBRARY COMPARISON, BENCHMARKING, PRODUCTION, AND SCALE ⚡⚠️
**Covers questions: 453, 455, 456, 457**

#### CORE CONCEPT (30 seconds)
Compare equivalent contracts, not just code snippets. Verify semantics, complexity, mutation, stability, edge behavior, and failure modes. Benchmark with representative and adversarial datasets after warm-up, isolate the operation, report latency distributions and memory, and validate outputs. Production code adds validation, observability, resource limits, error handling, deterministic behavior, tests, and operational safety. Scaling estimates must translate complexity into approximate work and memory.

#### WHY IT EXISTS
An asymptotically good interview solution may still be slower, less safe, or harder to operate than a tuned library. Benchmarks without semantic equivalence or production constraints produce misleading confidence.

#### MENTAL MODEL
Test two vehicles on the same route with the same load, measure speed and fuel, then add the brakes, dashboard, maintenance plan, and safety checks needed for real traffic.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Standard libraries are tested and often optimized; custom code offers control. Use the same inputs and verify the same outputs before comparing time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Benchmark multiple sizes/distributions, include warm-up, repeat runs, avoid I/O setup in the timed region, and measure peak memory. For `10³→10⁶`, `O(n)` work grows about 1000×, `O(n log n)` somewhat more than 1000×, and `O(n²)` about one million×.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Discuss JIT/GC noise, CPU affinity, cache warmness, confidence intervals, tail latency, throughput, backpressure, timeouts, cancellation, metrics, structured logs, load tests, rollback, and data/privacy requirements. Extrapolation should be validated because hardware and memory thresholds create discontinuities.

#### ALL VARIATIONS COVERED
- **Q453:** Compare standard-library and custom implementations on contract, guarantees, complexity, constant factors, edge semantics, and maintainability—not only speed.
- **Q455:** Define a fair benchmark protocol, validate result equivalence, measure time distributions plus memory, and use representative/adversarial inputs.
- **Q456:** Add input validation, error/resource handling, observability, tests, configurability, concurrency safety, and deployment/rollback considerations appropriate to risk.
- **Q457:** Estimate growth from the algorithm's complexity and bytes per element, then identify memory, cache, recursion, I/O, and output bottlenecks. ⚠️ Do not assume a 1000× larger input causes only 1000× runtime for a superlinear algorithm.

#### CONNECTIONS TO OTHER TOPICS
Microbenchmarking, profiling, standard libraries, load testing, observability, reliability, capacity planning, tail latency, and asymptotic analysis.

#### CODE / EXAMPLE (if applicable)
```text
Benchmark plan:
- Same contract and verified outputs
- Sizes: 10^3, 10^4, ..., 10^6
- Shapes: random, sorted, reverse, duplicate-heavy, adversarial
- Warm up runtime; repeat many times
- Measure median/p95 time, throughput, allocations, peak memory
- Separate setup/I/O from algorithm unless end-to-end is the goal

Scale estimate:
O(n):       ratio ≈ 10^6 / 10^3 = 1000
O(n log n): ratio ≈ (10^6 log 10^6)/(10^3 log 10^3)
O(n²):      ratio = (1000)^2 = 1,000,000
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Avoid production buzzword soup. Choose changes relevant to the solution and justify each. Benchmarks should be reproducible, outputs verified, and conclusions limited to the tested environment.

#### ONE-LINE SUMMARY
Compare equal contracts, benchmark reproducibly, productionize around real failure modes, and scale from complexity plus memory—not intuition.

---

### MAXIMUM CONTIGUOUS SUBARRAY SUM — KADANE'S ALGORITHM ⚡⚠️
**Covers questions: 458**

#### CORE CONCEPT (30 seconds)
Let `endingHere` be the maximum sum of a non-empty subarray ending at the current index. Either extend the best ending at the previous index or restart at the current value: `endingHere=max(value,endingHere+value)`. Track the maximum `best` over all endings. Time is `O(n)`, space `O(1)`.

#### WHY IT EXISTS
Any best subarray ending at index `i` either includes the best useful subarray ending at `i−1` or begins at `i`. A negative prior sum can only hurt future totals, so it is discarded.

#### MENTAL MODEL
Carry a running account only while its history helps. If yesterday's balance makes today's result worse than starting fresh, open a new account today.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Initialize from the first element for a non-empty result. Updating from zero incorrectly returns zero for an all-negative array.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State the `endingHere` invariant and update `best`. To return indexes, record a tentative start on restart and save start/end when `best` improves.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify empty-array and empty-subarray semantics, tie-breaking, and overflow. Circular maximum subarray additionally compares ordinary best with `total−minimumSubarray`, except in the all-negative case.

#### ALL VARIATIONS COVERED
- **Q458:** Apply Kadane's recurrence for non-empty contiguous subarrays and initialize with the first value. ⚠️ Do not initialize the answer to zero unless an empty subarray is explicitly allowed.

#### CONNECTIONS TO OTHER TOPICS
Prefix sums, DP state compression, maximum circular subarray, stock profit, segment trees, divide and conquer, and path gains.

#### CODE / EXAMPLE (if applicable)
```text
if array empty: handle per contract
endingHere=a[0]; best=a[0]
for x in a[1:]:
    endingHere=max(x,endingHere+x)
    best=max(best,endingHere)
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the state before coding and dry-run an all-negative case plus a restart case such as `[4,-6,3,2]`. Explain why only one previous value is necessary.

#### ONE-LINE SUMMARY
At each index, either extend the best subarray ending previously or restart here, then retain the best ending seen.

---

### VALID NUMBER AS A GRAMMAR OR STATE MACHINE ⚡⚠️
**Covers questions: 459**

#### CORE CONCEPT (30 seconds)
Define the accepted grammar first. A common form is optional sign, a mantissa containing digits with at most one decimal point and at least one digit overall, then an optional exponent `e/E` followed by optional sign and at least one digit. Scan once with flags or a finite-state machine; reject illegal ordering or missing required digits. Time is `O(n)`, space `O(1)`.

#### WHY IT EXISTS
Ad-hoc character checks miss interactions: a sign is legal only at the start or just after an exponent; a decimal point is illegal inside the exponent; `e` requires digits on both sides. A grammar/state machine makes legal contexts explicit.

#### MENTAL MODEL
A number passes through stations in order: optional sign, mantissa digits/dot, optional exponent marker, optional exponent sign, exponent digits. It may not jump backward or leave a required station unfinished.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Agree on whitespace, decimal forms like `.5`/`5.`, exponent notation, plus sign, and forbidden values such as `NaN`/`Infinity`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Track `seenDigit`, `seenDot`, `seenExponent`, and `digitAfterExponent`. A sign is valid only at position zero or after `e/E`; dot is valid only before exponent; exponent requires a preceding digit and may appear once.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Separate lexical validation from numeric conversion/overflow. Locale, hexadecimal floats, separators, and Unicode digits change the grammar. A DFA table is easier to audit and extend than tangled conditions.

#### ALL VARIATIONS COVERED
- **Q459:** State the exact numeric syntax, then scan with grammar-aware state and ensure at least one mantissa digit plus exponent digits when an exponent appears. ⚠️ Do not delegate blindly to a parser whose accepted language is broader than the required contract.

#### CONNECTIONS TO OTHER TOPICS
Finite automata, lexical analysis, parsers, regular languages, input validation, numeric conversion, and compiler front ends.

#### CODE / EXAMPLE (if applicable)
```text
seenDigit=false; seenDot=false; seenExp=false; digitAfterExp=true
for i,ch in s:
    if digit:
        seenDigit=true
        if seenExp: digitAfterExp=true
    else if ch in '+-':
        if i>0 and s[i-1] not in 'eE': return false
    else if ch=='.':
        if seenDot or seenExp: return false
        seenDot=true
    else if ch in 'eE':
        if seenExp or not seenDigit: return false
        seenExp=true; digitAfterExp=false
    else: return false
return seenDigit and digitAfterExp
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start by clarifying examples and grammar. Test `+3.`, `.8`, `46.e3`, `e9`, `1e`, `--6`, `6e-1`, and whitespace according to the agreed contract.

#### ONE-LINE SUMMARY
Recognize the agreed numeric grammar with explicit states for sign, mantissa, dot, exponent, and required digits.

---

### LARGEST ISLAND AS A GRID CONNECTED COMPONENT ⚡
**Covers questions: 460**

#### CORE CONCEPT (30 seconds)
Scan every grid cell. When an unvisited land cell is found, run DFS/BFS in four directions, mark each reached land cell immediately, count the component, and update the maximum. Every cell is processed at most once, so time is `O(rows×cols)` and visited/stack space is up to `O(rows×cols)`.

#### WHY IT EXISTS
An island is exactly a connected component under the chosen adjacency rule. Flood fill enumerates one whole component; marking prevents recounting and cycles.

#### MENTAL MODEL
Drop dye on each uncolored land patch. It spreads through side-sharing land, and the amount dyed is that island's size.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Clarify four-direction versus eight-direction adjacency. All-water grid returns zero; one land cell gives one.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark on enqueue/entry, not after processing, to prevent duplicate work. Either mutate `1→0` or use a visited matrix; state the mutation trade-off.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Recursive DFS can overflow on a huge island; iterative BFS/DFS uses heap-backed storage. For a streaming/too-large grid, connected-component labeling with row frontier/DSU is needed. Jagged rows require per-row bounds.

#### ALL VARIATIONS COVERED
- **Q460:** Flood-fill each unvisited four-direction land component, count it once, and retain the largest size; state adjacency and whether input mutation is permitted.

#### CONNECTIONS TO OTHER TOPICS
Number of islands, flood fill, connected components, perimeter, DSU, matrix traversal, and iterative DFS/BFS.

#### CODE / EXAMPLE (if applicable)
```text
best=0
for each cell (r,c):
    if grid[r][c]==1:
        size=0; stack=[(r,c)]; grid[r][c]=0
        while stack not empty:
            x,y=stack.pop(); size+=1
            for neighbor in four directions:
                if in bounds and grid[neighbor]==1:
                    grid[neighbor]=0
                    stack.push(neighbor)
        best=max(best,size)
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify adjacency and mutation, then state the visit-on-push invariant. Use iterative traversal if constraints make recursion depth unsafe, and explain why total work remains linear despite nested loops.

#### ONE-LINE SUMMARY
Each island is one grid component: flood-fill it once, count its cells, and keep the largest count.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q451, Q452, and Q454** connect to live-coding follow-ups where constraints change and candidates must defend invariants with adversarial tests.
- **Q453 and Q455–Q457** prepare you for production, benchmarking, scale, profiling, and standard-library trade-off discussions.
- **Q458** connects to circular subarrays, stock-profit state, segment trees, and maximum path-sum recurrences.
- **Q459** prepares you for string parsing, automata, expression validation, and tokenizer questions.
- **Q460** connects to island counting, graph components, flood fill, DSU, and grid-boundary problems.

### What to be comfortable with before Batch 47

- State and preserve a falsifiable invariant during live coding.
- Modify the proof and complexity when a constraint changes.
- Design a benchmark that measures equivalent behavior and validates output.
- Estimate CPU and memory growth from `10³` to `10⁶` inputs.
- Initialize Kadane correctly for all-negative arrays.
- Define a numeric grammar before implementing its recognizer.
- Traverse grid components with immediate marking and explicit adjacency.

## Batch 46 Rapid Recall

1. **Invariant:** precise state meaning maintained after each step.
2. **New constraint:** counterexample → state change → new proof/complexity.
3. **Library comparison:** contract and guarantees before speed.
4. **Interesting test:** smallest case attacking the fragile transition.
5. **Benchmark:** same outputs, representative data, repeated measurements.
6. **Production:** validation, failures, observability, limits, tests.
7. **Scale:** extrapolate from complexity and bytes, then validate.
8. **Maximum subarray:** extend or restart; initialize non-empty.
9. **Valid number:** explicit grammar/state machine.
10. **Largest island:** flood-fill every component once.
