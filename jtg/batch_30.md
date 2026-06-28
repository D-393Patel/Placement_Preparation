# JTG Technical Interview Coaching — Batch 30

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 291–300

## Questions in This Batch

291. ⚡ Implement a trie with `insert`, `search`, and `startsWith`.
292. ⚡ Implement binary-tree level-order traversal.
293. ⚡⚠️ Find the longest substring without repeated characters.
294. ⚡ Check whether parentheses/brackets in a string are balanced.
295. ⚡ Implement an LRU cache with a hash map and doubly linked list.
296. ⚡⚠️ Compute `power(x,n)` in `O(log n)`.
297. ⚡ Implement merge sort and analyse its time complexity.
298. ⚡ Convert a sorted array into a balanced BST.
299. ⚡⚠️ Implement Dijkstra's shortest-path algorithm.
300. ⚡⚠️ Find all array pairs summing to a target.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Prefix-tree operations | 291 | All trie methods walk the same character-edge invariant. |
| B | Balanced tree construction and breadth traversal | 292, 298 | One consumes a tree by levels; the other builds balanced subtrees from sorted intervals. |
| C | Sliding-window uniqueness | 293 | Last-seen positions let the valid left boundary jump forward. |
| D | Stack-based delimiter matching | 294 | Nested delimiters require LIFO pairing. |
| E | Constant-time recency cache | 295 | This is the implementation version of Q230's hash-map + DLL design. |
| F | Logarithmic/divide-and-conquer computation | 296, 297 | Fast power halves an exponent; merge sort halves an array and merges results. |
| G | Heap-based shortest paths | 299 | Non-negative relaxation plus a min-heap is the complete Dijkstra invariant. |
| H | Pair-sum enumeration | 300 | Complement lookup changes according to unique-value versus index-pair output semantics. |

---

### TRIE IMPLEMENTATION ⚡
**Covers questions: 291**

#### CORE CONCEPT (30 seconds)
A trie node stores child edges and an `isWord` flag. `insert` follows/creates one child per character and marks the final node. `search` walks the word and requires the final flag; `startsWith` only requires the prefix path to exist. Each operation takes `O(L)` time for input length `L`.

#### WHY IT EXISTS
Hash sets answer exact membership but do not expose shared prefixes naturally. A trie stores common prefixes once and distinguishes “path exists” from “complete word exists.”

#### MENTAL MODEL
Each node is a signpost for the next character. Reaching a signpost proves a prefix; a special end marker proves a complete stored word.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Node children + end flag; insert/create, exact search/end check, prefix search/path only.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Choose fixed child array for known small alphabet or map for sparse/general alphabet. Decide whether empty string may be inserted. Avoid recursive overhead for simple walks.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Memory can dominate due to nodes/maps; compressed radix tries merge single-child paths. Case/Unicode normalization matters. Thread safety, deletion with shared-prefix pruning, frequency/ranking, and wildcard search require additional state.

#### ALL VARIATIONS COVERED
- **Q291:** All three methods walk character edges; only `search` checks `isWord`, while `startsWith` accepts any surviving path.

#### CONNECTIONS TO OTHER TOPICS
Autocomplete, Word Search II, prefix counts, radix trees, dictionaries, string normalization, and memory trade-offs.

#### CODE / EXAMPLE (if applicable)
```text
insert(word):
    node=root
    for ch in word:
        node.children.putIfAbsent(ch,new Node())
        node=node.children[ch]
    node.isWord=true

walk(text):
    node=root
    for ch in text:
        if ch not in node.children: return null
        node=node.children[ch]
    return node

search(w): return walk(w)!=null and walk(w).isWord
startsWith(p): return walk(p)!=null
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain prefix-versus-word distinction and choose the child structure explicitly. Test inserting `app`/`apple`. Avoid duplicating traversal logic in three bug-prone methods in production code.

#### ONE-LINE SUMMARY
A trie walks one character edge per input symbol; path existence proves a prefix, and the terminal flag proves a word.

---

### LEVEL-ORDER TRAVERSAL AND SORTED ARRAY TO BALANCED BST ⚡
**Covers questions: 292, 298**

#### CORE CONCEPT (30 seconds)
Level-order traversal uses a queue: remove a node, visit it, enqueue non-null children; capture the queue size to group one level. To build a balanced BST from a sorted array, choose the midpoint as root and recursively build left/right halves. Both are `O(n)` time; BFS space is `O(maxWidth)`, construction stack is `O(log n)` for balanced output.

#### WHY IT EXISTS
A queue preserves increasing depth order. Midpoint selection splits node counts nearly equally and preserves BST inorder order.

#### MENTAL MODEL
BFS processes a waiting line by floors. BST construction repeatedly folds a sorted ruler at its centre and makes each half a subtree.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Queue root then children; midpoint root then recursive halves.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Empty root returns empty output. Use safe midpoint. Decide lower/upper midpoint for even-length intervals; either gives height balance. If output is list-of-levels, process exactly current queue size.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Input duplicates require a BST duplicate policy; simple midpoint still yields non-decreasing inorder but may violate strict bounds. Construction is `O(n)` only with array random access; building from a sorted linked list needs inorder simulation to avoid repeated middle scans.

#### ALL VARIATIONS COVERED
- **Q292:** Queue-based BFS visits nodes level by level; level grouping uses a queue-size snapshot.
- **Q298:** Midpoint recursion yields a height-balanced BST whose inorder traversal matches the sorted array.

#### CONNECTIONS TO OTHER TOPICS
BFS, tree width, serialization, BST validation, divide-and-conquer, sorted-list-to-BST, and height balance.

#### CODE / EXAMPLE (if applicable)
```text
build(lo,hi):                       // inclusive
    if lo>hi: return null
    mid=lo+(hi-lo)/2
    node=Node(a[mid])
    node.left=build(lo,mid-1)
    node.right=build(mid+1,hi)
    return node
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State queue/interval invariants and space in terms of width/height. Test empty and even-size input. Avoid slicing arrays recursively, which can add unnecessary copying.

#### ONE-LINE SUMMARY
Queue order exposes tree levels; midpoint recursion converts sorted order into balanced BST structure.

---

### LONGEST SUBSTRING WITHOUT REPEATS ⚡⚠️
**Covers questions: 293**

#### CORE CONCEPT (30 seconds)
Maintain a sliding window `[left,right]` with unique characters and a map of each character's most recent index. On character `c`, set `left=max(left,lastSeen[c]+1)`, update its last index, and maximise window length. Each boundary only moves forward, so time is `O(n)` and space `O(alphabet)`.

#### WHY IT EXISTS
A repeated character invalidates only the portion through its previous occurrence. Last-seen position jumps directly past it instead of shrinking one character at a time.

#### MENTAL MODEL
Keep a transparent frame over unique characters; when a duplicate enters, slide the frame's left edge just beyond that character's previous copy.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Last-seen map, monotonic left boundary, `O(n)`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  `max(left,...)` prevents moving left backward when the prior occurrence lies outside the current window. Track best length and optionally start index.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Unicode code points/graphemes affect indexing. A fixed array improves constants for ASCII. Streaming can retain the active window/positions. “At most k repeats/distinct” needs frequency counts rather than last-seen-only state.

#### ALL VARIATIONS COVERED
- **Q293:** Jump left to one after the latest in-window occurrence and track max width. ⚠️ Omitting `max` can move the window backward.

#### CONNECTIONS TO OTHER TOPICS
Sliding windows, at-most-k distinct, minimum windows, frequency maps, Unicode, and two pointers.

#### CODE / EXAMPLE (if applicable)
```text
left=0; best=0; last={}
for right,c in s:
    if c in last: left=max(left,last[c]+1)
    last[c]=right
    best=max(best,right-left+1)
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the uniqueness invariant and dry-run `abba`. Explain why left never retreats. Avoid deleting map entries unnecessarily when last-index jumps suffice.

#### ONE-LINE SUMMARY
Track each character's last index and jump the unique window past any duplicate in one step.

---

### BALANCED BRACKETS WITH A STACK ⚡
**Covers questions: 294**

#### CORE CONCEPT (30 seconds)
Scan the string. Push opening delimiters. For a closing delimiter, the stack must be nonempty and its top must be the matching opener; pop it. The string is balanced only if no mismatch occurs and the stack is empty at the end. Time `O(n)`, space `O(n)` worst case.

#### WHY IT EXISTS
Nested delimiters close in reverse opening order, exactly the LIFO behavior of a stack.

#### MENTAL MODEL
Every opening bracket is an unfinished box placed on a pile; the next closing bracket must finish the topmost box.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Push opens, match/pop closes, require empty end.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use a map `closing→opening`. Clarify whether non-bracket characters are ignored or invalid. Empty string is typically balanced.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  If only one bracket type and only validity is needed, an integer balance works but must never become negative. Multiple types require a stack because counts alone lose nesting order. Language parsers also handle quoted/escaped delimiters, which changes tokenization.

#### ALL VARIATIONS COVERED
- **Q294:** Stack matching validates both type and nesting; reject early on empty/mismatched top and require empty stack afterward.

#### CONNECTIONS TO OTHER TOPICS
Parsing, expression evaluation, minimum-parentheses repair, monotonic stacks, recursion, and compiler syntax checking.

#### CODE / EXAMPLE (if applicable)
```text
match={')':'(',']':'[','}':'{'}; stack=[]
for ch in s:
    if ch is opener: stack.push(ch)
    else if ch in match:
        if stack.empty() or stack.pop()!=match[ch]: return false
return stack.empty()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Handle early close, wrong type, and leftover opens. Clarify non-bracket input. Avoid using only three counters, which accepts invalid nesting like `([)]`.

#### ONE-LINE SUMMARY
Balanced brackets close in reverse opening order, so every close must match the stack top and leave no unfinished opener.

---

### LRU CACHE IMPLEMENTATION (MERGED WITH Q230) ⚡
**Covers questions: 295**

#### CORE CONCEPT (30 seconds)
This is Q230's implementation: map key→DLL node, sentinel head/tail, MRU after head, LRU before tail. `get` moves a hit to front. `put` updates/moves an existing node or inserts a new one; if over capacity, remove tail predecessor from both list and map. Every operation is `O(1)`.

#### WHY IT EXISTS
The map gives direct lookup; the doubly linked list gives constant-time removal/reordering/oldest access. One shared node keeps both views consistent.

#### MENTAL MODEL
An index finds any file instantly, while a desk order moves touched files to front and discards the back file when full.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Hash map + doubly linked list, MRU/LRU ends, `O(1)` get/put.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Central helpers `remove(node)` and `addAfterHead(node)` prevent pointer bugs. Updating an existing key does not change size; eviction removes map entry too.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Capacity zero, missing reads, thread safety, TTL, weighted capacity, and scan pollution need explicit policies. Both structures must change atomically under concurrency.

#### ALL VARIATIONS COVERED
- **Q295:** Reuse Q230's map+DLL invariant and implement sentinels/helpers. ⚠️ Do not create a second node on update or forget map removal on eviction.

#### CONNECTIONS TO OTHER TOPICS
Q230, hash maps, doubly linked lists, page replacement, caches, concurrency, TTL, and LFU.

#### CODE / EXAMPLE (if applicable)
```text
moveToFront(node): remove(node); addAfterHead(node)
evict(): victim=tail.prev; remove(victim); map.remove(victim.key)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Draw sentinels and dry-run insert/update/hit/evict. Keep pointer logic in helpers. Avoid saying `LinkedHashMap` when the task explicitly asks from-scratch design.

#### ONE-LINE SUMMARY
Map for lookup plus sentinel DLL for recency gives constant-time hit, update, and tail eviction.

---

### FAST POWER AND MERGE SORT ⚡⚠️
**Covers questions: 296, 297**

#### CORE CONCEPT (30 seconds)
Fast power uses exponentiation by squaring: repeatedly square the base and multiply the result when the exponent bit is one, taking `O(log|n|)` time. Merge sort recursively sorts equal halves and linearly merges them, yielding `T(n)=2T(n/2)+Θ(n)=Θ(n log n)` in best/average/worst cases with `O(n)` array buffer.

#### WHY IT EXISTS
Both exploit halving. Binary exponent digits represent exactly which powers of the base to multiply. Merge sort ensures balanced recursion and performs one linear combine per level.

#### MENTAL MODEL
Power builds `x^n` from squared blocks `x,x²,x⁴,...`. Merge sort cuts a deck evenly and merges two ordered piles.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Fast power `O(log n)`; merge sort stable `O(n log n)` and `O(n)` auxiliary array space.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For negative exponent, invert base and negate exponent in a wider signed type first. Merge with two pointers and consistent half-open intervals; copy leftover elements.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Negating minimum signed integer in the same width overflows. Define `0^0`/zero-negative behavior. Floating rounding accumulates. “Measure complexity” should include derivation/instrumented comparisons across input sizes, not wall-clock alone; benchmarking needs warm-up and controlled inputs.

#### ALL VARIATIONS COVERED
- **Q296:** Binary exponentiation squares base and consumes exponent bits; handle negative minimum exponent with a wider type. ⚠️ `-MIN_INT` overflows in the original width.
- **Q297:** Implement split/merge and derive `Θ(n log n)` from logarithmic levels × linear merge work; array auxiliary space `Θ(n)`.

#### CONNECTIONS TO OTHER TOPICS
Binary representation, modular exponentiation, Fibonacci matrices, divide-and-conquer recurrences, stable sorting, benchmarking, and overflow.

#### CODE / EXAMPLE (if applicable)
```text
power(x,n):
    e=wide(n)
    if e<0: x=1/x; e=-e
    result=1
    while e>0:
        if e&1: result*=x
        x*=x; e>>=1
    return result
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the bit invariant and negative-exponent edge. For merge sort, use one buffer and derive complexity rather than claiming it from memory. Avoid allocating many sliced subarrays if a range-based version is expected.

#### ONE-LINE SUMMARY
Fast power consumes exponent bits in logarithmic time; merge sort performs linear merging across logarithmically many balanced levels.

---

### DIJKSTRA IMPLEMENTATION ⚡⚠️
**Covers questions: 299**

#### CORE CONCEPT (30 seconds)
Set source distance to zero, all others infinity, and push `(0,source)` into a min-heap. Pop the smallest pair; skip it if stale. For every edge `(u,v,w)`, if `dist[u]+w<dist[v]`, update distance/parent and push the new pair. With adjacency lists and non-negative weights, time is `O((V+E)log V)` and space `O(V+E)`.

#### WHY IT EXISTS
With non-negative edges, once the current minimum tentative distance is popped, no future path through farther vertices can improve it. The heap efficiently selects that frontier minimum.

#### MENTAL MODEL
A travel-time wave finalises the nearest unsettled city and offers cheaper arrival times to its neighbours.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Min-heap, relaxation, non-negative weights, infinity for unreachable.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Lazy heaps permit duplicates; `if poppedDistance != dist[u] continue`. Store parents for paths. Use wide distances and guard infinity/overflow.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Zero weights work; negative edges do not. Early exit when target is popped current is safe. Complexity may be written `O(E log V)` for connected standard graphs. Dense matrix implementation is `O(V²)` and can be preferable without a heap.

#### ALL VARIATIONS COVERED
- **Q299:** Implement min-heap relaxation with stale-entry skipping and state the non-negative-edge assumption. ⚠️ Do not mark/finalise a vertex merely when first inserted.

#### CONNECTIONS TO OTHER TOPICS
Priority queues, Bellman–Ford, BFS/0-1 BFS, shortest-path trees, Prim, adjacency lists, and path reconstruction.

#### CODE / EXAMPLE (if applicable)
```text
dist[s]=0; heap.push((0,s))
while heap not empty:
    d,u=heap.popMin()
    if d!=dist[u]: continue
    for v,w in graph[u]:
        if d+w<dist[v]:
            dist[v]=d+w; parent[v]=u
            heap.push((dist[v],v))
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State representation/assumptions and narrate relaxation. Test disconnected and multiple-path cases. Avoid a comparator that overflows by subtracting distances.

#### ONE-LINE SUMMARY
Dijkstra repeatedly finalises the smallest current non-negative distance and relaxes its outgoing edges through a min-heap.

---

### ALL PAIRS SUMMING TO A TARGET ⚡⚠️
**Covers questions: 300**

#### CORE CONCEPT (30 seconds)
Clarify output. For every **index pair**, scan left to right: prior occurrences of `target−x` each form a pair with current index, so output/count their stored indices/frequency before recording current. For unique **value pairs**, use a set of seen values plus a canonical result set, or sort and use two pointers while skipping duplicates. Expected hash time is `O(n)` plus output.

#### WHY IT EXISTS
Every pair is a current value plus an earlier complement. The storage required depends on whether duplicate occurrences create distinct answers.

#### MENTAL MODEL
At each number, ask the notebook which earlier numbers complete the target; record the requested kind of pair, then add the current number.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Complement hash map/set or sorted two pointers.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Index pairs need list of indices or frequency; unique values need deduplication. If `x==target−x`, two occurrences are required. Output complexity may be `Θ(n²)` when all matching index pairs are requested.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Integer overflow in complement/sum, mutation by sorting, deterministic output order, and duplicate semantics matter. Counting pairs uses `answer+=freq[need]`; enumerating requires stored prior indices. Canonical pair `(min,max)` avoids reversed duplicates.

#### ALL VARIATIONS COVERED
- **Q300:** Use complement lookup, but define unique value pairs versus all index/occurrence pairs first. ⚠️ Algorithm/output storage changes materially with duplicate semantics.

#### CONNECTIONS TO OTHER TOPICS
Two Sum, hash maps, two pointers, pair counting, 3Sum, overflow, output-sensitive complexity, and deduplication.

#### CODE / EXAMPLE (if applicable)
```text
// Count index pairs
freq={}; answer=0
for x in a:
    answer += freq.get(target-x,0)
    freq[x] = freq.get(x,0)+1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask what “all pairs” means and include output complexity. Test `[1,1,1]`, target 2. Avoid a set-only solution when every occurrence pair must be returned.

#### ONE-LINE SUMMARY
Complement lookup finds pairs in linear expected time, but duplicate/output semantics determine whether to store presence, frequency, or prior indices.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q291 (trie)** connects to autocomplete, Word Search II, and prefix-heavy string coding.
- **Q292/Q298 (trees)** prepare BFS views, balanced construction, and serialization.
- **Q293/Q294 (strings)** connect to windows, parsing, and stack validation.
- **Q295 (LRU)** repeats Q230 and prepares production cache/system questions.
- **Q296/Q297 (halving)** connect to modular power, recurrences, and stable sorting.
- **Q299 (Dijkstra)** reinforces weighted graph coding and priority-queue correctness.
- **Q300 (pairs)** expands Two Sum into output-sensitive enumeration.

### Be Comfortable With Before Batch 31 (Questions 301–310)

- Median of two sorted arrays by partition binary search.
- Directed-cycle DFS with white/gray/black states.
- Recursive/iterative nested-list flattening.
- Backtracking generation of valid parentheses.
- Next permutation pivot/successor/reverse steps.
- Minimum-coin DP (repeat).
- Edit-distance 2D DP.
- Maximum-product subarray with max/min ending states.
- Longest common prefix (repeat).
- Matrix dimension validation and triple-loop multiplication.

### Batch 30 Rapid Recall

291. Trie path proves prefix; terminal flag proves word.
292. Level order uses a queue and level-size snapshots.
293. Unique substring jumps left past last duplicate.
294. Balanced delimiters must match the stack top.
295. LRU repeats map + sentinel DLL.
296. Fast power squares base and consumes exponent bits.
297. Merge sort is stable `Θ(n log n)` with `Θ(n)` array buffer.
298. Midpoint recursion builds a balanced BST.
299. Dijkstra uses non-negative relaxation and stale min-heap skipping.
300. Pair-sum storage depends on value-pair versus index-pair semantics.
