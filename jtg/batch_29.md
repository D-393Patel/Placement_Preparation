# JTG Technical Interview Coaching — Batch 29

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 281–290

## Questions in This Batch

281. ⚡ Find the first non-repeating character in a string.
282. ⚡ Check whether two strings are anagrams.
283. ⚡⚠️ Implement a stack with `O(1)` `push`, `pop`, and `getMin`.
284. ⚡ Return all root-to-leaf paths in a binary tree.
285. ⚡⚠️ Implement binary search iteratively and recursively.
286. ⚡⚠️ Find the intersection of two linked lists.
287. ⚡⚠️ Check whether a binary tree is a BST.
288. ⚡⚠️ Find the largest-sum contiguous subarray using Kadane's algorithm.
289. ⚡ Remove duplicates from a sorted linked list.
290. ⚡⚠️ Count islands in a 2D binary matrix.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Character-frequency invariants | 281, 282 | First uniqueness and anagram equality both depend on complete character counts. |
| B | Augmented stack state | 283 | A second stack/node field maintains the aggregate minimum under every mutation. |
| C | Binary-tree traversal and global validity | 284, 287 | Root paths use DFS/backtracking; BST validation carries ancestor bounds through the whole subtree. |
| D | Binary-search implementations | 285 | Iterative/recursive versions share the same sorted-interval invariant. |
| E | Linked-list pointer identity and deduplication | 286, 289 | Intersection compares node identity; sorted dedup rewires consecutive equal nodes. |
| F | One-pass contiguous optimisation | 288 | Kadane retains the best subarray ending at the current index. |
| G | Grid connected components | 290 | Island count is repeated flood-fill over unvisited land cells. |

---

### FIRST UNIQUE CHARACTER AND ANAGRAM CHECKING ⚡
**Covers questions: 281, 282**

#### CORE CONCEPT (30 seconds)
Count character frequencies. For first non-repeating, scan the original string a second time and return the first character/index whose count is one. For anagrams, strings match exactly when their normalised character multisets are equal; increment counts for one string and decrement for the other. Both are `O(n)` for a fixed/bounded alphabet.

#### WHY IT EXISTS
A single left-to-right decision cannot know whether a character will repeat later. Counting separates global multiplicity from order; the second pass restores first-occurrence order.

#### MENTAL MODEL
Inventory every letter, then reread the original queue to find the first inventory count of one. Two words are anagrams when every inventory bin balances to zero.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Frequency array/map; second ordered scan for Q281; compare/decrement counts for Q282.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Reject unequal lengths after agreed normalisation. Return contract for no unique character should be explicit (`-1`, null, etc.). Fixed 26/128/256 arrays are fast only for the promised alphabet.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Clarify case, whitespace, punctuation, Unicode normalisation, and whether “character” means UTF-16 code unit, Unicode code point, or grapheme. Sorting is `O(n log n)` and mutates/copies; map counting is usually preferable. Streaming first-unique needs counts plus an ordered queue, not two complete passes.

#### ALL VARIATIONS COVERED
- **Q281:** Count all characters, then scan original order for the first count of one; return the requested character or index.
- **Q282:** After agreed normalisation, compare frequency maps or increment/decrement one map; every final count must be zero.

#### CONNECTIONS TO OTHER TOPICS
Hash maps, anagram grouping, streaming queues, canonicalisation, Unicode, frequency windows, and counting sort.

#### CODE / EXAMPLE (if applicable)
```text
firstUnique(s):
    freq={}
    for ch in s: freq[ch]++
    for i,ch in s:
        if freq[ch]==1: return i
    return -1

areAnagrams(a,b):
    if length(a)!=length(b): return false
    count={}
    for ch in a: count[ch]++
    for ch in b: count[ch]--
    return every count == 0
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Clarify alphabet/normalisation and return type before coding. Explain why Q281 needs order after counts. Test empty strings, all repeats, and mixed case. Avoid relying on map iteration order to identify the first character.

#### ONE-LINE SUMMARY
Character counts answer multiplicity; a second original-order pass finds first uniqueness, while balanced counts prove anagrams.

---

### MIN STACK IN O(1) ⚡⚠️
**Covers questions: 283**

#### CORE CONCEPT (30 seconds)
Maintain the normal value stack plus a minimum stack. On push, also push onto `mins` when the value is `<=` current minimum. On pop, if the removed value equals `mins.top`, pop `mins` too. Then push, pop, top, and getMin are all `O(1)`, with `O(n)` extra space worst case.

#### WHY IT EXISTS
Removing the current minimum must reveal the previous minimum instantly. The auxiliary stack stores exactly that history in LIFO order.

#### MENTAL MODEL
Alongside each stack layer, keep a checkpoint whenever the lowest value so far changes or repeats; removing layers exposes the previous checkpoint.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Two stacks; duplicate minima must be represented; all operations constant time.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use `<=`, not only `<`, or store `(value,currentMin)` per node. Define empty-stack errors consistently and compare values safely.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  An encoded single-stack arithmetic trick can store differences with `O(1)` extra per stack, but risks overflow and obscures code. Pair-per-node is often clearest. For generic comparable types, equality/comparator consistency matters.

#### ALL VARIATIONS COVERED
- **Q283:** Track minimum history in a second stack or per-node field; duplicate minima are the classic trap. ⚠️ Pop both structures together when minima match.

#### CONNECTIONS TO OTHER TOPICS
Monotonic stacks, aggregate stacks, min queues, sliding-window minimum, persistent data structures, and augmented trees.

#### CODE / EXAMPLE (if applicable)
```text
push(x):
    values.push(x)
    if mins.empty() or x<=mins.top(): mins.push(x)

pop():
    x=values.pop()
    if x==mins.top(): mins.pop()
    return x

getMin(): return mins.top()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the synchronized invariant and dry-run `[2,1,1]` through two pops. Avoid recomputing minimum in `O(n)` or losing duplicate minima.

#### ONE-LINE SUMMARY
Store the stack of historical minima alongside values so every removal reveals the next minimum immediately.

---

### ROOT-TO-LEAF PATHS AND BST VALIDATION ⚡⚠️
**Covers questions: 284, 287**

#### CORE CONCEPT (30 seconds)
For root-to-leaf paths, DFS with a mutable path: append current value, copy the path at a leaf, recurse, then remove it. For BST validation, carry an allowed `(lower,upper)` range from all ancestors: left gets upper=`node.value`, right gets lower=`node.value`; every node must lie strictly inside. Both visit each node once.

#### WHY IT EXISTS
Path DFS needs current recursion ancestry, not all paths copied at every step. BST correctness is global: a node deep in the right subtree must exceed the root, so checking only parent/children is insufficient.

#### MENTAL MODEL
Path generation leaves breadcrumbs and removes them while backtracking. BST validation gives every node a legal numeric corridor narrowed by each ancestor turn.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Leaf means both children null. Backtrack path. BST recursive bounds, `O(n)` time/`O(h)` stack.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Copy path only when recording. Use nullable/unbounded or wider numeric bounds to avoid `MIN/MAX` overflow. Define duplicate policy; strict BST normally rejects equality.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Output path cost is `Θ(total output length)`, potentially more than `O(n)`. Iterative inorder BST validation checks strictly increasing sequence but must retain previous value safely. A local-child-only validator fails on `[10, left=5, right subtree containing 6]`.

#### ALL VARIATIONS COVERED
- **Q284:** DFS append/copy-at-leaf/pop; complexity is `O(n)` traversal plus output size.
- **Q287:** Validate every node against ancestor-derived bounds, not only direct children. ⚠️ State duplicate and integer-bound policy.

#### CONNECTIONS TO OTHER TOPICS
Backtracking, tree serialization, path sums, recursion stacks, inorder traversal, BST insertion bounds, and global tree invariants.

#### CODE / EXAMPLE (if applicable)
```text
isBST(node,low,high):
    if node==null: return true
    if not (low < node.value < high): return false
    return isBST(node.left,low,node.value)
       and isBST(node.right,node.value,high)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the invariant before recursion and show state restoration. Use a counterexample to local BST checks. Avoid adding the same mutable path object to every result.

#### ONE-LINE SUMMARY
Backtracking records root ancestry at leaves; ancestor bounds enforce the BST's global ordering rule.

---

### ITERATIVE AND RECURSIVE BINARY SEARCH ⚡⚠️
**Covers questions: 285**

#### CORE CONCEPT (30 seconds)
Maintain a sorted candidate interval `[lo,hi]`. Compare target with `a[mid]`; equality returns, smaller target moves `hi=mid−1`, larger moves `lo=mid+1`. Both iterative and recursive versions take `O(log n)` time; iterative uses `O(1)` space, recursive uses `O(log n)` call stack.

#### WHY IT EXISTS
Sorted order proves one half impossible after each comparison, halving candidate count.

#### MENTAL MODEL
Open a dictionary in the middle, compare alphabetically, and discard the half that cannot contain the word.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Safe midpoint `lo+(hi−lo)/2`, base `lo>hi`, sorted input requirement.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  State inclusive or half-open interval and keep updates consistent. Ordinary search returns any duplicate occurrence; first/last occurrence needs boundary-search modifications.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Random access matters: binary search on linked lists does not yield the same total efficiency. Comparator order and integer overflow matter. Standard library lower/upper bounds often solve production boundary requirements more safely.

#### ALL VARIATIONS COVERED
- **Q285:** Implement both forms with the same interval invariant; recursive space is not `O(1)`. ⚠️ Avoid mixed interval conventions and non-progress updates.

#### CONNECTIONS TO OTHER TOPICS
Lower/upper bounds, rotated arrays, answer-space search, overflow-safe arithmetic, recursion, and random access.

#### CODE / EXAMPLE (if applicable)
```text
binarySearch(a,target):
    lo=0; hi=a.length-1
    while lo<=hi:
        mid=lo+(hi-lo)/2
        if a[mid]==target: return mid
        if a[mid]<target: lo=mid+1
        else: hi=mid-1
    return -1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Write the invariant and test empty, one element, absent value, and boundaries. Explain stack-space difference. Avoid using `(lo+hi)/2` in fixed-width languages.

#### ONE-LINE SUMMARY
Binary search preserves a sorted candidate interval and discards half each step: `O(log n)`, with iteration saving recursion space.

---

### LINKED-LIST INTERSECTION AND SORTED DEDUPLICATION ⚡⚠️
**Covers questions: 286, 289**

#### CORE CONCEPT (30 seconds)
For two acyclic singly linked lists, move pointers `a` and `b`; at each null, redirect to the other list's head. After each traverses `m+n` distance, they meet at the shared node or both null—`O(m+n)` time and `O(1)` space. For sorted deduplication, if `current.value==current.next.value`, bypass `current.next`; otherwise advance current.

#### WHY IT EXISTS
Pointer switching cancels unequal prefix lengths without explicitly measuring them. Sorting places equal values adjacent, so duplicate removal needs only local comparison.

#### MENTAL MODEL
Two walkers swap routes after finishing; equal total route length aligns them at the shared road. Dedup skips repeated adjacent train cars.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Intersection compares node identity, not value. Dedup sorted list in one pass, `O(n)`/`O(1)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Pointer switch expression uses `a=(a==null?headB:a.next)` and analogous `b`. Dedup naturally preserves one copy. Clarify return node/null and empty lists.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If lists can contain cycles, ordinary switching may not terminate and intersection cases require cycle-entry analysis. “Remove duplicates” may mean remove all values that appear more than once (LeetCode II), needing a dummy and different rewiring. In manual-memory languages, bypassed nodes may require deallocation.

#### ALL VARIATIONS COVERED
- **Q286:** Pointer switching aligns lengths and finds the first shared node by reference. ⚠️ Equal values in separate nodes are not intersection.
- **Q289:** Because the list is sorted, bypass consecutive equal nodes to keep one copy; clarify if all duplicate-valued nodes must instead be removed.

#### CONNECTIONS TO OTHER TOPICS
Cycle detection, pointer identity, list length alignment, dummy nodes, memory ownership, and two-pointer techniques.

#### CODE / EXAMPLE (if applicable)
```text
intersection(headA,headB):
    a=headA; b=headB
    while a != b:
        a = (a==null) ? headB : a.next
        b = (b==null) ? headA : b.next
    return a

dedup(head):
    cur=head
    while cur!=null and cur.next!=null:
        if cur.value==cur.next.value: cur.next=cur.next.next
        else: cur=cur.next
    return head
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the equalised path length and identity comparison. For dedup, restate which duplicate semantics you implement. Avoid nested scans or hash sets when sorted adjacency/pointer alignment gives constant space.

#### ONE-LINE SUMMARY
Pointer route-switching aligns two lists at a shared node; sorted adjacency lets one pass bypass duplicate values.

---

### KADANE'S MAXIMUM CONTIGUOUS SUBARRAY ⚡⚠️
**Covers questions: 288**

#### CORE CONCEPT (30 seconds)
Let `current` be the best sum of a non-empty subarray ending at this position. For each value `x`, either start fresh or extend: `current=max(x,current+x)`; update global `best=max(best,current)`. This is `O(n)` time and `O(1)` space.

#### WHY IT EXISTS
If the best sum ending before `x` is negative, carrying it can only hurt any subarray ending at `x`; discard it. Otherwise extending is at least as good as restarting.

#### MENTAL MODEL
Carry a running investment only while its history helps; if past losses drag down today's result, restart today.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  End-here state and global best. Initialise from first element for non-empty subarray.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Track candidate start, best left/right to return indices. Define empty-array behavior. Use a wide sum type.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Initialising to zero incorrectly returns empty sum for all-negative arrays unless empty subarray is explicitly allowed. Circular maximum adds total-minus-minimum with all-negative guard. The recurrence is one-dimensional DP/greedy compression.

#### ALL VARIATIONS COVERED
- **Q288:** Use `current=max(x,current+x)` and initialise from the first value. ⚠️ All-negative input exposes zero-initialisation bugs.

#### CONNECTIONS TO OTHER TOPICS
Circular maximum subarray, DP state compression, maximum product subarray, stock differences, prefix minimum, and interval reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
best=current=a[0]
for i in 1..n-1:
    current=max(a[i],current+a[i])
    best=max(best,current)
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define “best ending here” and prove the restart decision. Test all-negative and single-element arrays. Avoid describing Kadane as a sliding window; its boundary decision depends on accumulated sign.

#### ONE-LINE SUMMARY
Kadane keeps the best non-empty sum ending here, restarting exactly when the previous contribution hurts.

---

### COUNTING ISLANDS BY FLOOD-FILL ⚡⚠️
**Covers questions: 290**

#### CORE CONCEPT (30 seconds)
Scan every grid cell. When an unvisited land cell is found, increment the island count and run DFS/BFS to mark every connected land cell in that island. With four-direction adjacency, time is `O(rows·cols)` and visited/queue/stack space is up to `O(rows·cols)`.

#### WHY IT EXISTS
Each flood-fill marks exactly one connected component, so the number of new searches equals the number of islands. Marking prevents repeated counting.

#### MENTAL MODEL
Walk the map; each time dry land is discovered, flood-paint the entire connected island and add one to the atlas count.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Repeated DFS/BFS, visited/bounds, four neighbours by default.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mark on enqueue/entry. Mutating land to water saves a visited matrix if input mutation is allowed. Handle empty grid and rectangular dimensions.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Four versus eight directions changes connectivity and must be clarified. Recursive DFS can overflow on a huge island; iterative BFS/DFS is safer. Jagged grids require row-specific bounds. For dynamic additions, union–find can maintain island count incrementally.

#### ALL VARIATIONS COVERED
- **Q290:** Count flood-fill starts and mark all reachable land; clarify four/eight-direction adjacency and mutation policy. ⚠️ Mark immediately to avoid duplicate queue entries.

#### CONNECTIONS TO OTHER TOPICS
Connected components, flood fill, BFS/DFS, union–find, grid graphs, perimeter/area variants, and dynamic connectivity.

#### CODE / EXAMPLE (if applicable)
```text
count=0
for each cell (r,c):
    if grid[r][c]==1:
        count++
        queue=[(r,c)]; grid[r][c]=0
        while queue not empty:
            pop cell
            for four neighbours:
                if in bounds and land:
                    grid[nr][nc]=0
                    enqueue neighbour
return count
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State adjacency and whether mutation is allowed. Dry-run diagonal land. Explain linear time by “each cell marked once.” Avoid counting every land cell as an island before flood-filling.

#### ONE-LINE SUMMARY
Every unvisited land cell starts one flood-fill, so counting starts counts connected island components.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q281–Q282 (frequency maps)** connect to substring windows, grouping, and string canonicalisation.
- **Q283 (min stack)** prepares monotonic/aggregate data structures and constant-time min queues.
- **Q284/Q287 (trees)** connect to traversal output, BST construction, bounds, and serialization.
- **Q285 (binary search)** underpins rotated search, powers, and answer-space algorithms.
- **Q286/Q289 (linked lists)** reinforce pointer identity, cycle cases, and in-place rewiring.
- **Q288 (Kadane)** connects to circular/product/matrix maximum problems.
- **Q290 (islands)** connects to graph components, union–find, and grid BFS.

### Be Comfortable With Before Batch 30 (Questions 291–300)

- Trie node design and prefix methods.
- Binary-tree level-order BFS.
- Longest substring without repeats using a last-seen/window map.
- Balanced-bracket stack matching.
- LRU hash-map + doubly linked-list invariants.
- Fast exponentiation, including negative exponents/overflow.
- Merge-sort implementation and complexity measurement.
- Sorted-array-to-balanced-BST midpoint recursion.
- Dijkstra with non-negative weights/stale heap entries.
- Unique-pair versus index-pair semantics for target-sum output.

### Batch 29 Rapid Recall

281. Count, then scan original order for the first frequency one.
282. Anagrams have identical normalised character counts.
283. Min stack stores minimum history, including duplicates.
284. Root paths use append/copy/pop DFS.
285. Binary search halves one consistent sorted interval.
286. Pointer switching finds shared node identity.
287. BST validation carries ancestor bounds.
288. Kadane keeps best non-empty sum ending here.
289. Sorted duplicates are adjacent and can be bypassed.
290. Island count equals number of flood-fill starts.
