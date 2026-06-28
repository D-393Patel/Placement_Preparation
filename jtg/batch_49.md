# JTG Technical Interview Coaching — Batch 49

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 3A — Technical Interview: Coding Rounds 1 & 2  
**Batch:** Questions 481–490

## Questions in This Batch

481. ⚡ Find the minimum edit distance between two strings.
482. ⚡ Find the length of the longest palindromic substring.
483. ⚡ Perform iterative inorder traversal of a BST.
484. ⚡⚠️ Find the maximum width of a binary tree.
485. Check whether two binary trees are identical.
486. ⚡ Find the first and last positions of a target in a sorted array.
487. ⚡⚠️ Return all subsets whose sum equals target `k`.
488. ⚡ Reverse the words in a string.
489. ⚡ Decide whether some permutation of a string can be a palindrome.
490. ⚡⚠️ Find the minimum jumps needed to reach the last array index.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Prefix dynamic programming | 481 | Edit distance compares prefixes and minimizes over insert, delete, and replace transitions. |
| B | Palindrome symmetry and frequency conditions | 482, 489 | Center symmetry finds contiguous palindromes; character parity decides whether a multiset can be rearranged symmetrically. |
| C | Explicit tree traversal and structural summaries | 483, 484, 485 | A stack simulates inorder recursion, indexed BFS measures level width, and paired recursion verifies structural equality. |
| D | Binary-search boundaries | 486 | Lower and upper bounds locate the full duplicate range in logarithmic time. |
| E | Subset backtracking | 487 | Each element creates include/exclude choices, with duplicate and sign rules controlling pruning. |
| F | Word-level string normalization | 488 | Tokenize words, reverse their order, and rebuild according to whitespace semantics. |
| G | Greedy frontier expansion | 490 | Each jump layer extends the farthest reachable boundary, analogous to BFS over implicit positions. |

---

### MINIMUM EDIT DISTANCE WITH PREFIX DP ⚡
**Covers questions: 481**

#### CORE CONCEPT (30 seconds)
Let `dp[i][j]` be the minimum edits to convert the first `i` characters of source into the first `j` characters of target. If the final characters match, use `dp[i−1][j−1]`; otherwise take `1+min(delete dp[i−1][j], insert dp[i][j−1], replace dp[i−1][j−1])`. Time is `O(mn)` and space is `O(mn)`, reducible to `O(min(m,n))` for distance only.

#### WHY IT EXISTS
The last operation must be one of three exhaustive choices, each reducing the problem to smaller prefixes. DP stores overlapping prefix results instead of exploring an exponential edit tree.

#### MENTAL MODEL
Fill a grid where moving down deletes, moving right inserts, and moving diagonally matches or replaces; the cheapest route reaches the bottom-right cell.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Empty-to-length-`j` needs `j` inserts; length-`i`-to-empty needs `i` deletes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Define state before recurrence, fill by increasing prefixes, and distinguish character indexing from DP indexing. Rolling rows preserve distance but not a direct edit script.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Weighted operation costs change the recurrence. Reconstruct edits by backtracking the full table; Hirschberg-style methods reduce reconstruction memory. Banded DP helps when a small maximum distance is expected.

#### ALL VARIATIONS COVERED
- **Q481:** Use prefix DP over insert/delete/replace, with zero-length base rows and a diagonal no-cost transition for matching characters.

#### CONNECTIONS TO OTHER TOPICS
Sequence alignment, LCS, deletion distance, dynamic time warping, spelling correction, diff tools, and DP reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
for i in 0..m: dp[i][0]=i
for j in 0..n: dp[0][j]=j
for i in 1..m:
    for j in 1..n:
        if a[i-1]==b[j-1]: dp[i][j]=dp[i-1][j-1]
        else:
            dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
return dp[m][n]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain what each predecessor cell means instead of memorizing the formula. Dry-run one mismatch and one empty-string case, then mention row compression only after correctness is clear.

#### ONE-LINE SUMMARY
Edit distance is the cheapest path through source/target prefixes using insert, delete, replace, or free matching.

---

### PALINDROME SUBSTRINGS AND PALINDROME-PERMUTATION PARITY ⚡
**Covers questions: 482, 489**

#### CORE CONCEPT (30 seconds)
For longest palindromic substring, expand around every character and every gap, retaining the greatest matching radius; this is `O(n²)` time and `O(1)` space. For a palindrome permutation, count character frequencies: at most one character may have odd frequency, because symmetric positions consume pairs and only the center may be unpaired.

#### WHY IT EXISTS
Every contiguous palindrome has a unique odd or even center. A rearranged palindrome ignores original positions and depends only on whether characters can be paired symmetrically.

#### MENTAL MODEL
Q482 widens a mirror placed on each possible center. Q489 puts characters into pairs, allowing one leftover character for the middle seat.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Check both odd and even centers. Palindrome permutation requires zero odd counts for even length and one for odd length—equivalently at most one overall.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q482 track start/length when expansion improves. Q489 can toggle membership in an odd-frequency set, using `O(alphabet)` space. Clarify case, spaces, punctuation, and Unicode normalization.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Manacher reduces longest-palindrome time to `O(n)`. Frequency parity can be a bitmask for a small alphabet. Grapheme clusters, not code units, may define user-visible characters.

#### ALL VARIATIONS COVERED
- **Q482:** Expand from `(i,i)` and `(i,i+1)` and retain the longest matching interval; substring must be contiguous.
- **Q489:** Count/toggle character parity and accept iff at most one odd count remains; state normalization rules first.

#### CONNECTIONS TO OTHER TOPICS
Palindromic substring counting, Manacher’s algorithm, frequency maps, bitmasks, anagrams, and Unicode normalization.

#### CODE / EXAMPLE (if applicable)
```text
# Q482
for center in 0..n-1:
    expand(center,center)
    expand(center,center+1)
return bestLength

# Q489
odd=set()
for ch in normalized string:
    if ch in odd: remove ch
    else: add ch
return odd.size<=1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Distinguish substring position from permutation frequency. Test even palindromes, repeated characters, empty input, and agreed normalization behavior.

#### ONE-LINE SUMMARY
Contiguous palindromes grow from centers; rearrangeable palindromes need every frequency paired except possibly one center character.

---

### ITERATIVE INORDER, TREE WIDTH, AND TREE EQUALITY ⚡⚠️
**Covers questions: 483, 484, 485**

#### CORE CONCEPT (30 seconds)
Iterative inorder uses a stack: push the full left chain, pop/process a node, then move to its right child. Maximum width uses level-order traversal with conceptual complete-tree indexes—children `2i+1` and `2i+2`—and width `last−first+1`, including null gaps. Tree equality recursively requires both nodes absent or both present with equal values and identical left/right subtrees.

#### WHY IT EXISTS
An explicit stack stores pending ancestors that recursion would hide. Positional indexes preserve gaps between edge nodes at a level, which queue size alone misses. Equality is recursive because both structure and value must match at every corresponding position.

#### MENTAL MODEL
Inorder keeps bookmarks while descending left. Width labels nodes as if placed in a complete-tree array. Equality overlays two trees and checks every matching location.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Inorder is left-root-right. Width may include missing nodes between endpoints. Empty trees are identical; one-null/one-present trees are not.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Q483 is `O(n)` time and `O(h)` space. Q484 normalize every level’s indexes by subtracting its first index to reduce overflow risk; use a wide type. Q485 short-circuits on mismatch.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Morris traversal gives `O(1)` auxiliary inorder by temporarily threading the tree but mutates links. Deep skewed trees favor iterative equality. Tree-width definitions may mean node count rather than complete-position width—clarify.

#### ALL VARIATIONS COVERED
- **Q483:** Simulate recursive inorder by pushing left ancestors, processing the top, then entering its right subtree.
- **Q484:** BFS with normalized positional indexes and measure endpoint distance, not just nodes present. ⚠️ Unnormalized doubling can overflow on deep sparse trees.
- **Q485:** Recursively or iteratively compare corresponding nullness, values, and child structure.

#### CONNECTIONS TO OTHER TOPICS
Morris traversal, tree serialization, level-order BFS, complete-tree indexing, structural hashing, and recursion simulation.

#### CODE / EXAMPLE (if applicable)
```text
# Iterative inorder
stack=[]; node=root
while node!=null or stack not empty:
    while node!=null: stack.push(node); node=node.left
    node=stack.pop(); visit(node)
    node=node.right

# Width level normalization
base=queue.front.index
for each node in current level:
    idx=node.index-base
    enqueue children with 2*idx+1 and 2*idx+2
width=lastIdx-firstIdx+1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the stack/queue entry contract. Ask which width definition is intended, and explain index normalization. For equality, do not compare only traversals unless uniqueness/serialization delimiters are guaranteed.

#### ONE-LINE SUMMARY
Use a stack for inorder ancestry, normalized complete-tree positions for width, and paired structural recursion for equality.

---

### FIRST AND LAST TARGET POSITION WITH BINARY SEARCH ⚡
**Covers questions: 486**

#### CORE CONCEPT (30 seconds)
Run two boundary searches. Lower bound finds the first index with value `>=target`; upper bound finds the first index with value `>target`. If lower bound is outside the array or not equal to target, return `[-1,-1]`; otherwise the range is `[lower,upper−1]`. Time is `O(log n)`, space `O(1)`.

#### WHY IT EXISTS
Ordinary binary search may find any duplicate. Boundary predicates are monotonic, so each search preserves the earliest position where its condition becomes true.

#### MENTAL MODEL
Find the first door where values are no longer below the target, then the first door where they are above it; the target occupies the hallway between them.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Empty or absent target returns `[-1,-1]`. Use overflow-safe midpoint calculation.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Prefer a half-open interval `[left,right)` and state the invariant. Lower and upper searches differ only in equality handling.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Generalize to insertion positions, frequency `upper−lower`, range queries, and custom comparators. Library lower/upper bound functions are ideal if their contracts are understood.

#### ALL VARIATIONS COVERED
- **Q486:** Compute lower and upper bounds and validate presence rather than scanning outward from an arbitrary match.

#### CONNECTIONS TO OTHER TOPICS
Lower/upper bounds, insertion position, frequency queries, monotonic predicates, rotated search, and equal range.

#### CODE / EXAMPLE (if applicable)
```text
lowerBound(target):
    left=0; right=n
    while left<right:
        mid=left+(right-left)/2
        if a[mid]<target: left=mid+1
        else: right=mid
    return left

first=lowerBound(target)
last=lowerBound(value strictly greater than target)-1  # upper bound
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the interval invariant and show which side retains equality. Test target at both ends, all duplicates, absent-between-values, and empty input.

#### ONE-LINE SUMMARY
The target range is from the first value not below target to one before the first value above target.

---

### ALL TARGET-SUM SUBSETS BY BACKTRACKING ⚡⚠️
**Covers questions: 487**

#### CORE CONCEPT (30 seconds)
Backtrack over indexes, choosing whether to include each value, and emit a copy when the required condition is reached at the terminal state. If values are sorted and duplicate value-combinations should appear once, skip equal choices at the same recursion depth. Worst-case time/output is exponential, and the path uses `O(n)` space.

#### WHY IT EXISTS
Every subset corresponds to one path of include/exclude decisions. Exhaustive search is unavoidable when all matching subsets must be returned because the output itself can be exponential.

#### MENTAL MODEL
Walk a binary decision tree: take this item or leave it. At each leaf, the chosen basket is one subset.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use each index at most once, undo after recursion, and copy the path when emitting.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify whether duplicate indexes represent distinct subsets or duplicate value combinations must be removed. With nonnegative values, prune when sum exceeds target; with negatives, that pruning is invalid.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Meet-in-the-middle reduces decision search to roughly `O(2^(n/2))` for counting/existence but enumerating all outputs still costs output size. DP can test existence/count when target bounds are small, while reconstruction needs parent paths.

#### ALL VARIATIONS COVERED
- **Q487:** Enumerate include/exclude paths, define duplicate-output semantics, and prune by current sum only when value signs make it safe. ⚠️ Returning immediately when the sum first reaches target can miss supersets involving zero or canceling values.

#### CONNECTIONS TO OTHER TOPICS
Subset sum, combinations, 0/1 knapsack, meet-in-the-middle, power sets, duplicate-aware backtracking, and output-sensitive complexity.

#### CODE / EXAMPLE (if applicable)
```text
search(index,currentSum,path):
    if index==n:
        if currentSum==target: output.add(copy(path))
        return
    search(index+1,currentSum,path)
    path.add(a[index])
    search(index+1,currentSum+a[index],path)
    path.removeLast()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify whether results are index-distinct or value-distinct and whether negatives/zeroes exist. State unavoidable exponential output rather than claiming an unrealistic polynomial enumeration.

#### ONE-LINE SUMMARY
Every subset is one include/exclude path; enumerate safely, deduplicate by contract, and prune only under valid sign assumptions.

---

### REVERSING WORD ORDER IN A STRING ⚡
**Covers questions: 488**

#### CORE CONCEPT (30 seconds)
Under the common contract, split the string into non-empty whitespace-delimited words, reverse their order, and join with one space. This is `O(n)` time and `O(n)` output/auxiliary space. If in-place on a mutable character array, reverse the whole array, then reverse each word and normalize spaces.

#### WHY IT EXISTS
The task reverses word order, not characters inside words. Tokenization separates semantic units from formatting; reconstruction defines whitespace behavior explicitly.

#### MENTAL MODEL
Write each word on a card, reverse the cards, but keep the letters on each card unchanged.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Clarify leading/trailing/multiple spaces and empty input.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A library split/join is clear when whitespace normalization is desired. In-place logic is useful only when the input is mutable and preserving exact whitespace is not required.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Unicode whitespace/graphemes and punctuation/token definitions can change semantics. Streaming complete reversal requires retaining words or external storage because the final first word arrives last.

#### ALL VARIATIONS COVERED
- **Q488:** Reverse word tokens and state whether whitespace is normalized or preserved; do not reverse the characters within each word.

#### CONNECTIONS TO OTHER TOPICS
Tokenization, in-place reversal, two pointers, string normalization, Unicode, and streaming lower bounds.

#### CODE / EXAMPLE (if applicable)
```text
words = split input on whitespace, omitting empty tokens
reverse(words)
return join(words, " ")
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Resolve whitespace semantics before implementation. Prefer clear library operations unless in-place constraints are explicit, and know their complexity.

#### ONE-LINE SUMMARY
Treat words as units, reverse their sequence, and rebuild under an explicit whitespace contract.

---

### MINIMUM JUMPS WITH GREEDY FRONTIERS ⚡⚠️
**Covers questions: 490**

#### CORE CONCEPT (30 seconds)
For nonnegative jump lengths, scan positions reachable with the current number of jumps. Track `farthest=max(farthest,i+a[i])`. When index `i` reaches `currentEnd`, commit one jump and set `currentEnd=farthest`. Stop once it reaches the last index. Time is `O(n)` and space `O(1)`.

#### WHY IT EXISTS
All indexes up to `currentEnd` form one BFS layer of positions reachable with the current jump count. Among them, only the farthest next boundary matters for minimizing the number of layers.

#### MENTAL MODEL
Stand on all positions reachable with the current number of jumps simultaneously; choose the next jump only after seeing which of those positions extends your horizon farthest.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Arrays of length zero/one need zero jumps by the agreed contract. Do not jump from the last index.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Detect unreachable input: if at a boundary `farthest==currentEnd` before the last index, return impossible. Explain the BFS-layer invariant rather than “always jump farthest from the current position.”
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This greedy solution assumes forward nonnegative reach. To reconstruct the path, track which index first achieved each committed farthest boundary. Weighted jump costs require shortest-path/DP methods.

#### ALL VARIATIONS COVERED
- **Q490:** Expand the farthest reach across each current layer, increment jumps only at layer boundaries, and detect stagnation. ⚠️ Choosing the locally longest jump immediately is not the same proof and can be misleading.

#### CONNECTIONS TO OTHER TOPICS
Jump Game reachability, BFS layers, interval coverage, greedy frontiers, shortest paths, and path reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
if n<=1: return 0
jumps=0; currentEnd=0; farthest=0
for i in 0..n-2:
    farthest=max(farthest,i+a[i])
    if i==currentEnd:
        if farthest==currentEnd: return impossible
        jumps+=1
        currentEnd=farthest
        if currentEnd>=n-1: break
return jumps
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the layer boundary and unreachable case. Dry-run `[2,3,1,1,4]` and `[3,2,1,0,4]` to prove both success and stagnation behavior.

#### ONE-LINE SUMMARY
Treat each reachable range as one BFS layer and extend the next range as far as any position in the current layer permits.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q481** connects to weighted edit distance, LCS, sequence alignment, and reconstruction.
- **Q482 and Q489** prepare you for palindrome counting, Manacher, anagram parity, and bitmask frequency problems.
- **Q483–Q485** connect to Morris traversal, tree serialization, level indexing, and iterative recursion simulation.
- **Q486** links to lower/upper bounds, range frequencies, and insertion positions.
- **Q487** connects to knapsack, meet-in-the-middle, combination sums, and output-sensitive search.
- **Q488** prepares you for tokenization, in-place string transforms, and whitespace contracts.
- **Q490** connects to reachability, BFS layering, interval coverage, and greedy proof questions.

### What to be comfortable with before Batch 50

- Define prefix DP transitions and base rows before compressing memory.
- Distinguish contiguous-palindrome geometry from permutation parity.
- Simulate tree recursion with explicit stack/queue contracts.
- Normalize complete-tree indexes to avoid width overflow.
- Write lower and upper bound as separate monotonic searches.
- State duplicate/sign semantics before pruning subset search.
- Clarify whitespace normalization in string transformations.
- Explain minimum jumps as layer expansion and detect unreachable input.

## Batch 49 Rapid Recall

1. **Edit distance:** minimum insert/delete/replace over prefixes.
2. **Longest palindrome:** expand from odd and even centers.
3. **Inorder:** push left chain, pop, then go right.
4. **Tree width:** normalized complete-position endpoints.
5. **Tree equality:** corresponding nullness, value, and structure.
6. **Target range:** lower bound to upper bound minus one.
7. **Target subsets:** include/exclude enumeration with safe pruning.
8. **Reverse words:** reverse tokens under defined whitespace rules.
9. **Palindrome permutation:** at most one odd frequency.
10. **Minimum jumps:** greedy BFS frontiers plus stagnation check.
