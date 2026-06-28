# JTG Technical Interview Coaching — Batch 38

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 371–380

## Questions in This Batch

371. ⚡ Count all palindromic substrings in a string.
372. ⚡⚠️ Find the minimum depth of a binary tree.
373. Count the ways to express `n` as an ordered sum of `1`, `3`, and `4`.
374. ⚡⚠️ Find the longest path of equal-valued nodes in a binary tree.
375. ⚡⚠️ Decide whether a pattern matches a string using dynamic programming.
376. ⚡ Generate all unique permutations of a list containing duplicates.
377. ⚡⚠️ Decide whether a non-empty subset has XOR equal to zero.
378. ⚡⚠️ Find the minimum removals from array ends needed to reduce `x` to zero.
379. ⚡ Count all occurrences of a pattern in a text.
380. ⚡⚠️ Find the maximum water-container area between buildings.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Center-based palindrome enumeration | 371 | Every palindrome has one character center or one gap center. |
| B | Tree path/depth summaries | 372, 374 | Both derive a global/rooted path result by combining carefully defined child information. |
| C | Ordered-sum dynamic programming | 373 | The last chosen number reduces the target to one of three smaller states. |
| D | Pattern matching and reusable prefixes | 375, 379 | Both match pattern structure against text, though wildcard/regex DP and literal occurrence counting use different state machines. |
| E | Duplicate-aware backtracking | 376 | Sorting plus same-level skipping emits each multiset permutation once. |
| F | XOR linear dependence | 377 | A non-empty zero-XOR subset exists exactly when vectors are dependent over `GF(2)`. |
| G | Complementary subarray transformation | 378 | Removing ends is equivalent to retaining one middle subarray with a target sum. |
| H | Two-pointer container optimization | 380 | The shorter boundary limits area, so only moving it can improve the answer. |

---

### COUNTING PALINDROMIC SUBSTRINGS BY CENTER EXPANSION ⚡
**Covers questions: 371**

#### CORE CONCEPT (30 seconds)
Every palindrome has a center: one character for odd length or a gap for even length. For each of the `2n−1` centers, expand left and right while characters match; every successful expansion is one distinct substring occurrence. This uses `O(n²)` worst-case time and `O(1)` auxiliary space.

#### WHY IT EXISTS
Enumerating all substrings and checking each independently repeats comparisons and can take `O(n³)`. Center expansion generates only palindrome candidates and extends each using the symmetry already established.

#### MENTAL MODEL
Place a mirror on every character and every gap; widen it one step at a time while both reflected characters agree.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Expand around `(i,i)` and `(i,i+1)`. Count occurrences by position, so identical text at different positions counts separately.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Explain why the two center types cover every palindrome exactly once. Empty string gives zero. A DP table `isPalindrome[l][r]` is also `O(n²)` but uses `O(n²)` space and is useful when later queries need ranges.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Manacher's algorithm computes palindrome radii in `O(n)` and the count is derived from those radii, but it is rarely the best first interview answer unless constraints demand it. Distinct palindrome values—not occurrences—need additional deduplication or a palindromic tree.

#### ALL VARIATIONS COVERED
- **Q371:** Expand around all odd and even centers and increment once per valid radius; clarify that this counts substring occurrences, not unique palindrome texts.

#### CONNECTIONS TO OTHER TOPICS
Longest palindromic substring, Manacher's algorithm, palindrome DP, palindromic trees, two pointers, and symmetry.

#### CODE / EXAMPLE (if applicable)
```text
expand(left,right):
    count=0
    while left>=0 and right<n and s[left]==s[right]:
        count+=1; left-=1; right+=1
    return count

answer=0
for center in 0..n-1:
    answer+=expand(center,center)
    answer+=expand(center,center+1)
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the exact counting unit and prove center coverage. Dry-run `aaa`, which exposes whether repeated occurrences and both center types are handled correctly.

#### ONE-LINE SUMMARY
Expand from every character and gap; each matching expansion contributes one palindromic substring occurrence.

---

### TREE DEPTH AND SAME-VALUE PATHS ⚡⚠️
**Covers questions: 372, 374**

#### CORE CONCEPT (30 seconds)
For minimum depth, the answer is the distance to the nearest leaf; level-order BFS can return at the first leaf. For the longest same-value path, postorder DFS returns the longest downward matching arm from each node, while a global answer combines the matching left and right arms through that node. Both are linear-time tree traversals, but their returned meanings differ.

#### WHY IT EXISTS
Tree path questions become manageable when each recursive return has one precise contract. Minimum depth needs the nearest complete root-to-leaf route; the longest equal-value path may bend through a node, so the parent receives one arm while the global result considers two.

#### MENTAL MODEL
For minimum depth, flood the tree level by level until water first touches a leaf. For equal-value paths, each child offers an upward-colored branch; a node can join two branches of its own color for the global road but can pass only one branch upward.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  A leaf has no children. Minimum depth of an empty tree is zero. Same-value path length is usually measured in edges, not nodes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q372 BFS returns when a dequeued node is a leaf. In recursive DFS, a missing child cannot contribute depth zero to `min(left,right)` when the other child exists. Q374 extends an arm only if child value equals parent value, updates `best=leftArm+rightArm`, and returns `1+max(leftArm,rightArm)` in edge units.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  BFS may use `O(width)` memory but can terminate early; DFS uses `O(height)` stack. A skewed tree can overflow recursion. For Q374, store endpoints/path only if requested; equal-value comparison and length units must be defined for duplicates and single nodes.

#### ALL VARIATIONS COVERED
- **Q372:** Use BFS and return the first leaf's level, or DFS with special handling when exactly one child is absent. ⚠️ `1+min(depth(left),depth(right))` is wrong for a one-child node if null depth is zero.
- **Q374:** Return one downward same-value arm, combine both compatible arms for the global maximum, and clarify edge versus node length. ⚠️ A recursive return cannot pass both branches to its parent.

#### CONNECTIONS TO OTHER TOPICS
Maximum depth, tree diameter, nearest-leaf search, longest univalue path, postorder DP, BFS frontiers, and path reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
# Q374, lengths in edges
dfs(node):
    if node==null: return 0
    left=dfs(node.left); right=dfs(node.right)
    L = left+1 if node.left and node.left.value==node.value else 0
    R = right+1 if node.right and node.right.value==node.value else 0
    best=max(best,L+R)
    return max(L,R)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define leaf and length units before coding. Explain local return versus global combination for Q374. These questions reward a clean invariant more than clever syntax.

#### ONE-LINE SUMMARY
Minimum depth is the first BFS leaf; a same-value path combines two child arms globally but returns only its longer arm upward.

---

### ORDERED SUMS USING 1, 3, AND 4
**Covers questions: 373**

#### CORE CONCEPT (30 seconds)
Let `dp[t]` be the number of ordered sequences from `{1,3,4}` summing to `t`. Group sequences by their last number: `dp[t]=dp[t−1]+dp[t−3]+dp[t−4]`, treating negative indexes as zero and setting `dp[0]=1`. Compute bottom-up in `O(n)` time and `O(n)` space, compressible to constant recent state.

#### WHY IT EXISTS
Removing the last term from any valid sequence leaves a smaller valid sequence, and the three possible last terms form disjoint cases. The empty sequence is the one base construction of sum zero.

#### MENTAL MODEL
To land on stair `t`, the final jump came from `t−1`, `t−3`, or `t−4`; add the route counts at those launch stairs.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `dp[0]=1`; invalid negative targets contribute zero. Ordered sums mean `1+3` and `3+1` are different.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Derive using the final choice and use a wide type/modulo because counts grow quickly. If order does not matter, the loop structure and answer are different—a coin-change combinations problem.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This linear recurrence can be accelerated with matrix exponentiation for huge `n`. Constant-space compression must preserve the needed offsets `t−1`, `t−3`, and `t−4`, so a small circular buffer is clearer than two Fibonacci variables.

#### ALL VARIATIONS COVERED
- **Q373:** Sum counts for targets `n−1`, `n−3`, and `n−4` with `dp[0]=1`; explicitly state that different orders are counted separately.

#### CONNECTIONS TO OTHER TOPICS
Climbing stairs, composition counting, coin-change permutations, linear recurrences, matrix exponentiation, and memoization.

#### CODE / EXAMPLE (if applicable)
```text
dp=[0]*(n+1); dp[0]=1
for total in 1..n:
    for step in [1,3,4]:
        if total>=step: dp[total]+=dp[total-step]
return dp[n]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify ordered versus unordered before presenting the recurrence. Explain why zero has one construction; setting it to zero silently kills every future state.

#### ONE-LINE SUMMARY
Count by the final term: `ways[n]=ways[n−1]+ways[n−3]+ways[n−4]`, with one empty construction at zero.

---

### PATTERN MATCHING: DP SEMANTICS AND OCCURRENCE COUNTING ⚡⚠️
**Covers questions: 375, 379**

#### CORE CONCEPT (30 seconds)
First define what “pattern” means. For wildcard matching, `?` matches one character and `*` matches any sequence; DP state `dp[i][j]` means the first `i` text characters match the first `j` pattern characters. For literal occurrence counting, use KMP: each full pattern match increments the count, then fall back to `lps[m−1]` so overlapping occurrences remain possible.

#### WHY IT EXISTS
Patterns contain reusable structure. DP resolves ambiguous wildcard consumption without exponential backtracking, while KMP reuses literal prefix/suffix matches rather than rescanning text after each occurrence.

#### MENTAL MODEL
Wildcard DP fills a grid of text-prefix versus pattern-prefix agreements. KMP slides a transparent pattern template while preserving the longest border already aligned after a match or mismatch.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Wildcard base: empty matches empty; leading `*` can match empty. Literal occurrence count must specify whether overlaps count—normally they do unless stated otherwise.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Wildcard transitions: equal/`?` uses diagonal; `*` uses `dp[i][j−1]` for empty or `dp[i−1][j]` for consuming one more text character. KMP counts a match at `j==m` and resets `j=lps[j−1]`. Complexities are `O(nm)` for wildcard DP and `O(n+m)` for KMP.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Regex semantics differ: `*` modifies the previous token, so recurrence uses `dp[i][j−2]` and possibly `dp[i−1][j]`. Q375's wording is incomplete without specifying wildcard versus regex syntax. For Q379, empty-pattern occurrence semantics must be agreed; many APIs treat it specially.

#### ALL VARIATIONS COVERED
- **Q375:** Ask whether the pattern is wildcard or regex. Under wildcard semantics, use prefix DP with `?` diagonal and `*` empty-or-consume transitions. ⚠️ Regex `*` requires a different recurrence.
- **Q379:** Use KMP and, after each full match, increment the answer and fall back through LPS to count overlaps; resetting to zero can miss matches such as `ana` in `banana`-style overlap cases.

#### CONNECTIONS TO OTHER TOPICS
KMP, regex engines, wildcard globbing, edit-distance grids, finite automata, prefix functions, and rolling hash.

#### CODE / EXAMPLE (if applicable)
```text
# wildcard transition
if pattern[j-1]=='*':
    dp[i][j]=dp[i][j-1] or dp[i-1][j]
else if pattern[j-1]=='?' or pattern[j-1]==text[i-1]:
    dp[i][j]=dp[i-1][j-1]

# KMP full match
if j==m:
    count+=1
    j=lps[j-1]   # preserve overlap
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Do not code until pattern semantics and overlap rules are explicit. JTG will value noticing the ambiguity. For DP, define state and base row; for KMP, explain why LPS fallback counts overlaps without rescanning.

#### ONE-LINE SUMMARY
Use prefix DP for wildcard/regex semantics and KMP with post-match LPS fallback for overlapping literal occurrences.

---

### UNIQUE PERMUTATIONS WITH DUPLICATES ⚡
**Covers questions: 376**

#### CORE CONCEPT (30 seconds)
Sort the list, backtrack with a `used[]` array, and at each depth skip index `i` when it equals the previous value and the previous identical index has not been used in the current prefix. This chooses only the first unused copy at each tree level and emits every unique permutation once.

#### WHY IT EXISTS
Ordinary permutation backtracking treats identical copies as distinct and generates duplicate branches. Sorting places equal choices together, and the skip rule removes only symmetric choices at the same depth without blocking valid repeated values at later depths.

#### MENTAL MODEL
Identical twins may both appear in a lineup, but at any empty position the leftmost unused twin must be chosen first; swapping indistinguishable twins creates no new lineup.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort first, mark an index used before recursion, and unmark after. Emit a copy when path length reaches `n`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Correct skip condition is `i>0 && a[i]==a[i−1] && !used[i−1]`. The last clause means “same recursion level”; changing it carelessly can remove valid permutations.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A frequency map chooses values rather than indexes and is often simpler for heavy duplication. Output count is `n!/(c₁!c₂!...)`, so runtime must be output-sensitive. A generator avoids storing all results.

#### ALL VARIATIONS COVERED
- **Q376:** Sort and use the same-level duplicate-skip invariant, or recurse over remaining frequencies; never deduplicate a huge ordinary-permutation output afterward.

#### CONNECTIONS TO OTHER TOPICS
Multisets, combinations with duplicates, backtracking trees, frequency maps, lexicographic next permutation, and output-sensitive complexity.

#### CODE / EXAMPLE (if applicable)
```text
backtrack(path):
    if path.length==n: output.add(copy(path)); return
    for i in 0..n-1:
        if used[i]: continue
        if i>0 and a[i]==a[i-1] and not used[i-1]: continue
        used[i]=true; path.add(a[i])
        backtrack(path)
        path.removeLast(); used[i]=false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the skip condition in terms of tree levels rather than memorizing it. State factorial output complexity and demonstrate `[1,1,2]`.

#### ONE-LINE SUMMARY
Sort and skip an equal unused predecessor at the same recursion level so symmetric duplicate branches are never created.

---

### NON-EMPTY ZERO-XOR SUBSET VIA A LINEAR BASIS ⚡⚠️
**Covers questions: 377**

#### CORE CONCEPT (30 seconds)
Treat each integer as a bit vector over `GF(2)`, where XOR is vector addition. Insert values into a binary linear basis from highest bit downward. If a nonzero value reduces to zero during insertion—or the array contains zero—the vectors are linearly dependent, so some non-empty subset XORs to zero. With `B` bits, time is `O(nB)` and space `O(B)`.

#### WHY IT EXISTS
A non-empty subset XOR of zero is exactly a nontrivial linear combination equaling the zero vector. A basis retains independent directions and detects when a new vector can already be produced by earlier ones.

#### MENTAL MODEL
Each number is an arrow in binary space. If a new arrow can be canceled completely using stored direction arrows, those arrows form a closed XOR loop.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  The subset must be non-empty; otherwise the answer is trivially always true. A zero element alone is an immediate valid subset, and duplicate values form a two-element zero XOR.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Insert by eliminating the highest set bit using the basis vector stored there. If no new pivot remains, dependence is proven. For a small bounded XOR range, boolean subset DP is an easier alternative but can cost `O(n·range)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  For `n>B`, dependence is guaranteed by dimension, though early insertion detects it naturally. Signed integers need a fixed-width bit interpretation. If an actual subset is required, track each basis vector's provenance mask/index set.

#### ALL VARIATIONS COVERED
- **Q377:** Require a non-empty subset and detect XOR-linear dependence using a bit basis; return true when any inserted value reduces to zero. ⚠️ A standard DP initialized with reachable XOR zero must not immediately confuse the empty subset with a valid answer.

#### CONNECTIONS TO OTHER TOPICS
Maximum subset XOR, Gaussian elimination over `GF(2)`, vector spaces, parity constraints, XOR tries, and matroids.

#### CODE / EXAMPLE (if applicable)
```text
basis[0..B-1]=0
for original in a:
    x=original
    for bit from B-1 down to 0:
        if bit of x is 0: continue
        if basis[bit]!=0: x=x XOR basis[bit]
        else:
            basis[bit]=x
            break
    if x==0: return true
return false
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Call out the empty-subset trap immediately. If a linear basis feels too advanced for the stated constraints, present bounded-XOR DP first, then explain the basis as the range-independent solution.

#### ONE-LINE SUMMARY
A non-empty zero-XOR subset exists exactly when the array's bit vectors are linearly dependent over XOR.

---

### REDUCE X TO ZERO BY REMOVING ARRAY ENDS ⚡⚠️
**Covers questions: 378**

#### CORE CONCEPT (30 seconds)
If each operation removes the leftmost or rightmost value and subtracts it from `x`, let total array sum be `S`. Removing values totaling `x` is equivalent to keeping one contiguous middle subarray totaling `S−x`. Find the longest such subarray; minimum operations are `n−longestLength`. For positive values, use a sliding window in `O(n)` time.

#### WHY IT EXISTS
Any sequence of end removals leaves exactly one contiguous middle segment. Minimizing removed elements is therefore the same as maximizing the retained segment length.

#### MENTAL MODEL
Instead of deciding which books to pull from both ends of a shelf, find the longest middle block whose weight should remain untouched.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Target retained sum is `S−x`. If it is zero, keeping an empty subarray means removing all `n` elements unless a longer zero-sum segment is possible under broader inputs.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With strictly positive values, expand right and shrink while sum exceeds target. If no target-sum subarray exists, return `−1`. Handle `x=0` according to whether zero operations are allowed—normally answer zero.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zeros and negative values break the monotonic sliding-window argument; use prefix-sum earliest-index mapping to find the longest subarray with exact sum. A direct two-end recursion/DP explores many redundant states.

#### ALL VARIATIONS COVERED
- **Q378:** Under the standard “remove from either end” interpretation, transform to longest middle subarray of sum `total−x`, then return its complement length. ⚠️ Sliding window requires nonnegative/positive values; use prefix sums for arbitrary integers.

#### CONNECTIONS TO OTHER TOPICS
Longest fixed-sum subarray, prefix sums, sliding windows, two-ended operations, complement transformations, and exact-sum hashing.

#### CODE / EXAMPLE (if applicable)
```text
target=sum(a)-x
if target<0: return -1
left=0; current=0; longest=-1
for right in 0..n-1:
    current+=a[right]
    while left<=right and current>target: current-=a[left++]
    if current==target: longest=max(longest,right-left+1)
return -1 if longest==-1 else n-longest
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the complement transformation before coding—it is the main insight. Confirm allowed operations and value signs, then select sliding window or prefix-sum hashing accordingly.

#### ONE-LINE SUMMARY
End removals leave one middle subarray, so keep the longest segment summing to `total−x` and remove everything else.

---

### MAXIMUM WATER-CONTAINER AREA WITH TWO POINTERS ⚡⚠️
**Covers questions: 380**

#### CORE CONCEPT (30 seconds)
Interpreting “maximum area between buildings” as choosing two vertical boundaries, start pointers at both ends. Area is `min(height[left],height[right])×(right−left)`. Record it, then move the shorter boundary inward because moving the taller one reduces width while the same shorter wall still caps height. This is `O(n)` time and `O(1)` space.

#### WHY IT EXISTS
For the current pair, the shorter wall is the bottleneck. No pair using that same shorter wall at a smaller width can improve the area, so discarding it is safe; only a taller replacement might overcome the lost width.

#### MENTAL MODEL
Two walls hold water only up to the shorter wall. Narrowing the pool while keeping that bottleneck cannot help, so replace the bottleneck.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Compute area before moving a pointer. Width is index difference, and height is the smaller boundary.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Give the discard proof. If heights are equal, moving either one is safe; some implementations move both, though one-at-a-time is simpler to reason about.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The wording may instead mean total rainwater trapped across all buildings. That is a different problem: maintain `leftMax/rightMax` and accumulate water above every bar. Container area ignores intermediate bars because only the selected two boundaries define the container.

#### ALL VARIATIONS COVERED
- **Q380:** For maximum area formed by two buildings, use inward two pointers and discard the shorter wall. ⚠️ Ask whether the interviewer means one maximum container or total trapped rainwater; the objectives and algorithms differ.

#### CONNECTIONS TO OTHER TOPICS
Container with most water, trapping rain water, two-pointer proofs, monotonic stacks, bottleneck optimization, and geometric area.

#### CODE / EXAMPLE (if applicable)
```text
left=0; right=n-1; best=0
while left<right:
    best=max(best, min(h[left],h[right])*(right-left))
    if h[left]<=h[right]: left+=1
    else: right-=1
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Resolve the ambiguity first, then justify the pointer move mathematically. Simply reciting “move the smaller pointer” without the bottleneck proof looks memorized.

#### ONE-LINE SUMMARY
For one maximum container, evaluate both ends and discard the shorter wall because it cannot improve at any narrower width.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q371** connects to longest-palindrome problems, palindrome DP, Manacher's algorithm, and palindromic trees.
- **Q372 and Q374** prepare you for diameter, path-sum, nearest-leaf, and postorder arm-combination problems.
- **Q373** links to climbing stairs, ordered coin change, recurrence matrices, and modulo DP.
- **Q375 and Q379** connect to wildcard/regex DP, KMP, automata, rolling hashes, and overlap semantics.
- **Q376** prepares you for multiset combinations, frequency-based recursion, and output-sensitive generation.
- **Q377** links to XOR bases, maximum subset XOR, parity systems, and Gaussian elimination over bits.
- **Q378** prepares you for complement transformations, longest exact-sum subarrays, and sign-dependent window selection.
- **Q380** connects to rainwater trapping, two-pointer discard proofs, and bottleneck geometry.

### What to be comfortable with before Batch 39

- Prove that odd and even centers cover every palindromic substring.
- Define exactly what a tree DFS returns versus what updates the global answer.
- Distinguish ordered sum compositions from unordered coin combinations.
- Ask for wildcard, regex, literal, and overlap semantics before solving pattern questions.
- Explain duplicate skipping at one backtracking depth.
- Treat XOR as linear algebra and exclude the empty subset explicitly.
- Transform end-removal problems into a retained-middle subarray problem.
- Distinguish maximum container area from total trapped rainwater.

## Batch 38 Rapid Recall

1. **Palindromic substrings:** expand from characters and gaps.
2. **Minimum tree depth:** first BFS leaf.
3. **Sums of 1, 3, 4:** add three predecessor counts.
4. **Same-value path:** combine two arms, return one.
5. **Pattern DP:** semantics first; wildcard `*` means empty or consume.
6. **Unique permutations:** sort and skip same-level duplicate choices.
7. **Zero subset XOR:** detect linear dependence, excluding empty subset.
8. **Reduce x:** retain longest sum `total−x` middle segment.
9. **Pattern occurrences:** KMP fallback preserves overlaps.
10. **Maximum water area:** move the shorter boundary.
