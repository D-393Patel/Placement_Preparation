# JTG Technical Interview Coaching — Batch 16

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1B — Online Assessment: Subjective (Problem Solving & Aptitude)  
**Batch:** Questions 151–160

## Questions in This Batch

151. ⚡⚠️ Given an unsorted array, find two numbers that add to a target. Explain the approach and complexity.
152. ⚡ Write an algorithm to check whether a string is a palindrome without extra space.
153. ⚡⚠️ Describe an algorithm to find the longest common subsequence (LCS) of two strings.
154. ⚡ Explain dynamic programming using Fibonacci.
155. ⚡⚠️ Detect a cycle in a linked list using Floyd's cycle detection algorithm.
156. ⚡⚠️ Find the kth-largest element in an unsorted array.
157. ⚡ Find the maximum depth of a binary tree.
158. ⚡⚠️ Explain the sliding-window technique with an example.
159. ⚡ Reverse a linked list and state time and space complexity.
160. ⚡ Explain the two-pointer technique and give two applications.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Two pointers, complement lookup, and sliding windows | 151, 152, 158, 160 | These maintain a small moving state while scanning arrays/strings instead of testing all pairs/subarrays. |
| B | Dynamic programming state reuse | 153, 154 | Fibonacci introduces overlapping subproblems; LCS turns the same idea into a two-dimensional recurrence. |
| C | Linked-list pointer invariants | 155, 159 | Floyd detection and reversal both require moving pointers without losing structure or looping forever. |
| D | Order-statistic selection | 156 | Kth-largest supports distinct heap, Quickselect, and sorting trade-offs. |
| E | Recursive tree structure | 157 | Maximum depth is the canonical “solve children, combine answers” tree recursion. |

---

### TWO SUM, PALINDROMES, SLIDING WINDOWS, AND TWO POINTERS ⚡⚠️
**Covers questions: 151, 152, 158, 160**

#### CORE CONCEPT (30 seconds)
Avoid repeated work by maintaining exactly the state the scan needs. For unsorted Two Sum, store previously seen values in a hash map and look for `target - value`, giving `O(n)` time and `O(n)` space. For a palindrome, compare characters from both ends and move inward in `O(n)` time and `O(1)` space. A sliding window maintains an invariant over a contiguous range and moves its boundaries so each element enters/leaves only a constant number of times, often giving `O(n)`.

#### WHY IT EXISTS
Brute-force pair/subarray checks repeat comparisons and recompute overlapping ranges, often costing `O(n²)` or worse. Complement lookup, opposing pointers, and maintained-window state turn global search into one pass when the input structure supports a monotonic decision.

#### MENTAL MODEL
Two pointers are two bookmarks moving through a book. A sliding window is a frame that expands to include useful items and shrinks when its rule is violated. The hash map is a notebook of values already seen and the index where each appeared.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Two Sum hash map: `O(n)` time/`O(n)` space. Palindrome: left/right pointers, `O(n)`/`O(1)`. Sliding window is for contiguous ranges; two pointers commonly solve sorted-pair, palindrome, deduplication, and merge problems.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For Two Sum, check the complement before inserting the current element so the same index is not reused. If sorting is allowed, two pointers use `O(n log n)` time and can reduce auxiliary space, but original indices need value-index pairs. Sliding windows may be fixed-size or variable-size and require an efficiently updateable invariant.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Ask whether to return values, indices, one pair, or all pairs; whether duplicates count; and whether input may be mutated. A variable window for “sum at most K” usually relies on non-negative elements—negative numbers destroy the monotonic shrink rule. For palindrome normalisation, clarify whether case/punctuation are ignored; creating a cleaned string violates strict `O(1)` extra-space requirements.

#### ALL VARIATIONS COVERED
- **Q151:** Scan once, look up `target - a[i]` among prior values, then insert `a[i]`; return stored/current indices in expected `O(n)` time. ⚠️ Check before insert to avoid reusing one element.
- **Q152:** Compare `s[left]` and `s[right]`, moving inward until mismatch or crossing; this is `O(n)` time and `O(1)` auxiliary space.
- **Q158:** A sliding window incrementally maintains a property for a contiguous interval; for longest substring without repeats, expand right and advance left past duplicates in `O(n)`.
- **Q160:** Two pointers move indices according to an invariant; examples include palindrome checking and pair sum in a sorted array (also merge/deduplicate/partition).

#### CONNECTIONS TO OTHER TOPICS
Hash maps, sorted arrays, prefix sums, monotonic deques, longest substring, minimum window, fast/slow pointers, partitioning, interval scans, and amortized analysis.

#### CODE / EXAMPLE (if applicable)
```text
twoSum(a, target):
    seen = map value -> index
    for i in 0..n-1:
        need = target - a[i]
        if need in seen: return (seen[need], i)
        seen[a[i]] = i

isPalindrome(s):
    left = 0; right = length(s) - 1
    while left < right:
        if s[left] != s[right]: return false
        left++; right--
    return true
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with clarifying questions, state brute force, then improve it and name the invariant. Dry-run duplicates, empty input, one character, absent answer, and boundary movement. Avoid calling every two-index solution a sliding window—the window must represent a contiguous maintained range.

#### ONE-LINE SUMMARY
Replace repeated pair/range work with a complement map or moving boundaries whose invariant lets each element be processed only a constant number of times.

---

### DYNAMIC PROGRAMMING WITH FIBONACCI AND LCS ⚡⚠️
**Covers questions: 153, 154**

#### CORE CONCEPT (30 seconds)
Dynamic programming identifies a state, recurrence, and base cases, then computes each overlapping subproblem once. Fibonacci uses `F(n)=F(n-1)+F(n-2)` and drops from exponential recursion to `O(n)`. For LCS, let `dp[i][j]` be the LCS length of prefixes `A[0..i)` and `B[0..j)`: matching final characters add one to `dp[i-1][j-1]`; otherwise take `max(dp[i-1][j], dp[i][j-1])`, giving `O(mn)` time.

#### WHY IT EXISTS
Naive recursion branches into the same states repeatedly. DP saves those answers. LCS has two choices whenever characters differ—skip from one string or the other—and many branches reach the same prefix pair.

#### MENTAL MODEL
Fibonacci is a question tree where the same numbers are asked repeatedly; write each answer once. LCS is a grid: each cell summarises two prefixes, and movement up/left means skipping a character while diagonal movement accepts a match.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  DP needs overlapping subproblems and optimal substructure. Fibonacci memo/tabulation: `O(n)` time. LCS table: `O(mn)` time and `O(mn)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Define LCS state before recurrence. Initialise empty-prefix row/column to zero. Reconstruct one sequence by walking backward: on a match take the character/diagonal; otherwise follow the larger neighbour. Length-only space can be reduced to `O(min(m,n))` using two rows.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  LCS is not longest common substring: subsequence characters need not be contiguous. Multiple valid LCS strings may exist and tie-breaking changes which is returned. One-row optimisation must update in a safe direction while preserving the previous diagonal. Fibonacci can use matrix exponentiation in `O(log n)` and fast doubling; DP is the teaching point, not the globally fastest formula.

#### ALL VARIATIONS COVERED
- **Q153:** Use prefix-pair DP with match-diagonal/otherwise-max recurrence in `O(mn)` time; reconstruct by backtracking if the actual sequence is required. ⚠️ Clarify length versus sequence and subsequence versus substring.
- **Q154:** Naive Fibonacci repeats states exponentially; memoization/tabulation computes each `F(i)` once in `O(n)` time, with `O(1)` space possible iteratively.

#### CONNECTIONS TO OTHER TOPICS
Memoization versus tabulation, edit distance, longest common substring, shortest common supersequence, diff tools, sequence alignment, DAG evaluation, and space optimisation.

#### CODE / EXAMPLE (if applicable)
```text
for i in 1..m:
    for j in 1..n:
        if A[i-1] == B[j-1]:
            dp[i][j] = 1 + dp[i-1][j-1]
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
return dp[m][n]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Say state, transition, base case, evaluation order, and complexity in that order. Show why the recurrence covers all choices. Dry-run two short strings. Avoid writing a table before defining what each cell means.

#### ONE-LINE SUMMARY
DP computes each reusable state once: Fibonacci has one index, while LCS uses two prefix indices and a match-or-skip recurrence in `O(mn)`.

---

### LINKED-LIST CYCLE DETECTION AND REVERSAL ⚡⚠️
**Covers questions: 155, 159**

#### CORE CONCEPT (30 seconds)
Floyd's algorithm moves `slow` one step and `fast` two; if they meet, a cycle exists, and if `fast` reaches `null`, none exists. To find the cycle entry, reset one pointer to head and move both one step until they meet. To reverse a list, preserve `next`, redirect `current.next` to `previous`, then advance; this is `O(n)` time and `O(1)` extra space.

#### WHY IT EXISTS
Hashing visited nodes detects cycles but uses `O(n)` memory; relative pointer speed exploits cyclic structure with constant space. Reversal must change each edge without losing the unreversed suffix, so the saved-next invariant is essential.

#### MENTAL MODEL
On a circular track, a fast runner eventually laps a slow runner. Reversal is flipping arrows on a chain one link at a time while holding the unflipped remainder before disconnecting it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Floyd cycle detection: `O(n)` time, `O(1)` space. Iterative reversal: three pointers, `O(n)` time, `O(1)` space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Loop guard must verify `fast != null && fast.next != null`. For reversal, store `next` before overwriting `current.next`; return `previous` as the new head. Handle empty and single-node lists naturally.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Floyd can also find cycle length by walking once around after meeting. The entry proof follows distances: after meeting, moving one pointer from head and one from meeting at equal speed converges at the entry. Reversing a cyclic list with the ordinary loop never terminates; establish the input contract or detect/break the cycle first. Recursive reversal uses `O(n)` call-stack space.

#### ALL VARIATIONS COVERED
- **Q155:** Use one-step/two-step pointers; meeting means a cycle, null means none, and reset-plus-equal-speed finds its start. ⚠️ Guard both `fast` and `fast.next`.
- **Q159:** Repeatedly save next, reverse the link, and advance; iterative complexity is `O(n)` time and `O(1)` auxiliary space.

#### CONNECTIONS TO OTHER TOPICS
Fast/slow pointers, circular linked lists, cycle entry/length, middle node, palindrome list, pointer safety, garbage collection, and recursive stack space.

#### CODE / EXAMPLE (if applicable)
```text
reverse(head):
    previous = null
    current = head
    while current != null:
        next = current.next
        current.next = previous
        previous = current
        current = next
    return previous
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State pointer invariants before code and update one pointer per line. Draw three nodes and dry-run. For Floyd, explain both detection and entry phases. Avoid memorised code with unsafe loop conditions or overwriting `next` before saving it.

#### ONE-LINE SUMMARY
Floyd detects a loop through relative pointer speed, while reversal safely redirects each link after preserving the remaining suffix—both in `O(n)` time and `O(1)` space.

---

### KTH-LARGEST SELECTION ⚡⚠️
**Covers questions: 156**

#### CORE CONCEPT (30 seconds)
For the kth-largest element in an unsorted array, keep a min-heap of size `k`: push each value and remove the smallest when size exceeds `k`; the root is the kth largest. This takes `O(n log k)` time and `O(k)` space. Quickselect offers expected `O(n)` time and `O(1)` extra array space if mutation is allowed, but `O(n²)` worst case.

#### WHY IT EXISTS
Sorting all `n` elements pays for a complete order when only one rank is needed. A size-`k` heap remembers only the best `k`; Quickselect partitions away the side that cannot contain the target rank.

#### MENTAL MODEL
Maintain a podium with only `k` places. Every candidate enters briefly; when the podium is overcrowded, remove its weakest member. At the end, the weakest person still on the podium is kth largest.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort: `O(n log n)`. Min-heap size `k`: `O(n log k)` and `O(k)`. Quickselect: expected `O(n)`, worst `O(n²)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Heap is deterministic and excellent for streaming/large input. Quickselect mutates the array and is good for one in-memory query; random pivots reduce bad-split likelihood. Convert kth largest to zero-based sorted index `n-k`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify whether duplicates count: in `[5,5,4]`, second-largest by rank is `5`, but second distinct-largest is `4`. Validate `1 <= k <= n`. A heap can be built from the first `k` items and replace root only when a larger value appears. Median-of-medians gives guaranteed linear time but has higher constants and is rarely the fresher default.

#### ALL VARIATIONS COVERED
- **Q156:** Recommend a size-`k` min-heap for simple `O(n log k)` behavior or Quickselect for expected `O(n)` when mutation is allowed. ⚠️ Clarify duplicate ranking and valid `k`.

#### CONNECTIONS TO OTHER TOPICS
Priority queues, heaps, QuickSort partitioning, order statistics, top-`k`, streaming, median selection, randomisation, and median-of-medians.

#### CODE / EXAMPLE (if applicable)
```text
kthLargest(a, k):
    minHeap = empty
    for value in a:
        push(minHeap, value)
        if size(minHeap) > k:
            popMin(minHeap)
    return minHeap.min
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask about duplicates, memory, streaming, mutation, and worst-case requirements before choosing. Compare sorting, heap, and Quickselect rather than asserting one universal answer. Use a min-heap—not max-heap—when retaining the largest `k` values.

#### ONE-LINE SUMMARY
Keep the largest `k` values in a size-`k` min-heap for `O(n log k)`, or use Quickselect for expected linear time when in-place mutation is acceptable.

---

### MAXIMUM DEPTH OF A BINARY TREE ⚡
**Covers questions: 157**

#### CORE CONCEPT (30 seconds)
The maximum depth of a binary tree is `0` for an empty tree; otherwise it is `1 + max(depth(left), depth(right))`. Visit every node once, so time is `O(n)` and recursion space is `O(h)`, where `h` is tree height.

#### WHY IT EXISTS
A tree's answer is naturally composed from its subtrees. The recurrence is the basic postorder pattern: solve children first, then combine their results at the parent.

#### MENTAL MODEL
Ask each child subtree for its deepest floor, choose the deeper side, and add the current floor.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Base case null → `0`; leaf → `1`. Time `O(n)`; auxiliary stack `O(h)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Recursive DFS is simplest. Iterative BFS processes levels with a queue and counts levels, using `O(w)` memory where `w` is maximum width. State whether depth counts nodes or edges; common coding-platform node-depth uses empty `0`, root `1`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A balanced tree uses `O(log n)` recursion depth; a skewed tree uses `O(n)` and may overflow the call stack. Iterative DFS can store `(node, depth)` to avoid recursion. The same child-combine pattern extends to diameter, balance checking, and path-sum problems.

#### ALL VARIATIONS COVERED
- **Q157:** Return zero for null and one plus the larger child depth otherwise; this visits all nodes in `O(n)` time with `O(h)` stack space.

#### CONNECTIONS TO OTHER TOPICS
DFS/BFS, tree height conventions, postorder recursion, balanced trees, diameter, minimum depth, recursion limits, and divide-and-conquer.

#### CODE / EXAMPLE (if applicable)
```text
maxDepth(node):
    if node == null: return 0
    leftDepth = maxDepth(node.left)
    rightDepth = maxDepth(node.right)
    return 1 + max(leftDepth, rightDepth)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define the base case and depth convention aloud. Derive complexity using visited nodes and maximum recursion depth, not simply “space O(n).” Mention an iterative fallback for a potentially skewed tree.

#### ONE-LINE SUMMARY
Maximum depth is a postorder recurrence—one plus the deeper child—computed in `O(n)` time and `O(h)` stack space.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q151–Q152, Q158, and Q160 (scan patterns)** prepare rotated-array search, anagram grouping, subarray sums, longest-window constraints, and monotonic deque problems.
- **Q153–Q154 (DP)** connect to coin change, LIS, decoding, grid paths, matrix-chain multiplication, and target-sum variants.
- **Q155 and Q159 (linked lists)** prepare cycle-start detection, list palindrome, merge/reorder, and LRU cache implementation.
- **Q156 (selection)** connects to QuickSort partitioning, stream medians, top-`k`, and heap design.
- **Q157 (tree depth)** prepares symmetry, diameter, serialization, flattening, and balance-check questions.

### Be Comfortable With Before Batch 17 (Questions 161–170)

- Merge sort recurrence, merge step, and auxiliary space.
- QuickSort partition invariants and pivot trade-offs.
- In-place matrix transpose/reversal for 90° rotation.
- Backtracking choice/explore/unchoose structure for permutations and N-Queens.
- Queue using two stacks and amortized analysis.
- Dijkstra's relaxation and stale min-heap entries.
- Graph connected components with DFS/BFS.
- Binary-tree serialization with null markers.
- Memoized coin-change state and impossible-value handling.

### Batch 16 Rapid Recall

151. Two Sum: complement hash map, expected `O(n)` time.
152. Palindrome: inward pointers, `O(n)` time/`O(1)` space.
153. LCS: prefix-pair DP, `O(mn)`.
154. Fibonacci DP computes each state once in `O(n)`.
155. Floyd: slow one step, fast two; meeting proves a cycle.
156. Kth largest: size-`k` min-heap `O(n log k)` or expected-linear Quickselect.
157. Max depth: `1 + max(left, right)`, `O(n)`.
158. Sliding window maintains a contiguous-range invariant in near-linear time.
159. Reverse list with `previous/current/next`, `O(n)`/`O(1)`.
160. Two pointers move boundaries according to a monotonic invariant.
