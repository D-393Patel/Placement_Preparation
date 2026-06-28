# JTG Technical Interview Coaching — Batch 36

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1C — Online Assessment: Coding (Algorithmic & Data Structures)  
**Batch:** Questions 351–360

## Questions in This Batch

351. ⚡ Count ways to tile a `2×n` floor using `1×2` dominoes.
352. ⚡⚠️ Detect and remove a loop in a linked list.
353. ⚡⚠️ Find the maximum nesting depth of parentheses.
354. ⚡ Count trailing zeroes in `n!`.
355. ⚡ Count structurally unique BSTs with `n` nodes—the Catalan number.
356. ⚡⚠️ Reconstruct a binary tree from preorder and inorder traversals.
357. ⚡ Find the kth symbol in the recursive grammar.
358. ⚡⚠️ Find the minimum swaps needed to sort an array.
359. ⚡ Find the minimum steps to reach the end of a word ladder.
360. Generate the Cartesian product of multiple lists.

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Recursive counting with DP | 351, 355 | Both count structures by splitting a larger instance into smaller independent instances. |
| B | Linked-list cycle structure | 352 | Floyd's meeting point reveals a loop, then pointer geometry identifies the exact edge to cut. |
| C | Balanced-delimiter scanning | 353 | A running balance represents current nesting; its maximum is the answer. |
| D | Prime valuation in factorials | 354 | Every trailing zero comes from a factor pair `2×5`, and fives are scarce. |
| E | Tree reconstruction from traversals | 356 | Preorder chooses roots while inorder determines subtree boundaries. |
| F | Divide-and-conquer grammar recursion | 357 | A symbol's half-position recursively maps to the previous row, possibly with inversion. |
| G | Permutation cycles | 358 | Sorting swaps correspond to resolving cycles in the current-to-target position mapping. |
| H | Implicit-graph shortest path | 359 | Words are vertices, one-letter transformations are edges, and BFS finds minimum steps. |
| I | Recursive product enumeration | 360 | Choose one value from each list, backtrack, and emit at the final depth. |

---

### RECURSIVE COUNTING: DOMINO TILINGS AND CATALAN BSTS ⚡
**Covers questions: 351, 355**

#### CORE CONCEPT (30 seconds)
Define the first structural choice and count the smaller independent problems it creates. For a `2×n` domino board, the first placement leaves either `2×(n−1)` or `2×(n−2)`, so `ways[n]=ways[n−1]+ways[n−2]`. For unique BSTs, choosing root `r` leaves `r−1` keys on the left and `n−r` on the right, so `C[n]=Σ C[r−1]×C[n−r]`.

#### WHY IT EXISTS
Direct enumeration repeats the same subproblems exponentially. The recurrence captures every valid structure once, and DP stores smaller counts for reuse. Addition joins mutually exclusive first choices; multiplication combines independent left/right choices.

#### MENTAL MODEL
Stand at the first unresolved space. A domino covers it vertically or forces a horizontal pair. A BST root splits the remaining keys into two independent construction workshops.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Tiling is Fibonacci-like with `ways[0]=1, ways[1]=1`. Unique BST counts are Catalan numbers with `C[0]=1`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Tiling needs `O(n)` time and can use `O(1)` space. Catalan DP uses `O(n²)` time and `O(n)` space. Explain why subtree counts multiply and root alternatives add.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Counts grow rapidly, so discuss overflow/modulo/big integers. Catalan also has `C_n = binom(2n,n)/(n+1)` but division under a modulus needs modular inverses. Different tile sets or blocked cells change the state, often to profile DP.

#### ALL VARIATIONS COVERED
- **Q351:** Use `ways[n]=ways[n−1]+ways[n−2]` because the leftmost column is covered vertically or by two horizontal dominoes; define the empty board as one valid tiling.
- **Q355:** Sum `leftCount×rightCount` over each possible root; key values do not matter beyond their relative order, so the result is the nth Catalan number.

#### CONNECTIONS TO OTHER TOPICS
Fibonacci, Catalan structures, balanced parentheses, full binary trees, matrix exponentiation, combinatorics, memoization, and profile DP.

#### CODE / EXAMPLE (if applicable)
```text
# 2×n tilings
if n<=1: return 1
a=1; b=1
for width in 2..n: a,b=b,a+b
return b

# unique BSTs
dp[0]=1
for nodes in 1..n:
    for leftSize in 0..nodes-1:
        dp[nodes] += dp[leftSize]*dp[nodes-1-leftSize]
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Derive rather than quote the recurrence. Say why `dp[0]=1`: an empty side is one construction choice, not zero. Clarify whether the output needs modulo arithmetic before selecting a numeric type.

#### ONE-LINE SUMMARY
Partition by the first placement or root, add alternative cases, and multiply independent subtree choices.

---

### DETECTING AND REMOVING A LINKED-LIST LOOP ⚡⚠️
**Covers questions: 352**

#### CORE CONCEPT (30 seconds)
Use Floyd's slow/fast pointers to detect a meeting inside the cycle. Reset one pointer to `head` and move both one step until they meet at the cycle entry. Then walk one pointer around the cycle until its `next` points to the entry, and set that `next=null`. Time is `O(n)`, auxiliary space `O(1)`.

#### WHY IT EXISTS
A visited set detects repeated nodes but costs `O(n)` space. Different pointer speeds force a meeting if a cycle exists; the traveled-distance relationship then reveals the entry without modifying nodes prematurely.

#### MENTAL MODEL
Two runners meet on a circular track. Put one runner back at the road's start and make both walk equally; they meet at the track entrance. Then walk around to find the gate immediately before it and open the loop.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Slow advances once, fast twice. If fast reaches `null`, no loop exists; if they meet, a loop exists.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Find the entry, then the predecessor inside the loop, and cut exactly that edge. Handle empty list, self-loop, and a loop beginning at the head.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Another removal method keeps one pointer at the meeting point and compares successors carefully, but entry-first logic is easier to prove. If shared/concurrent lists are possible, mutation requires ownership and synchronization. Identity comparison—not node value—is mandatory.

#### ALL VARIATIONS COVERED
- **Q352:** Detect with Floyd, locate the cycle entry, find the cycle node whose `next` is that entry, and null that link. ⚠️ Do not cut at the arbitrary first meeting point.

#### CONNECTIONS TO OTHER TOPICS
Cycle length, duplicate-number Floyd algorithm, functional graphs, pointer identity, linked-list intersection, and constant-space algorithms.

#### CODE / EXAMPLE (if applicable)
```text
slow=head; fast=head
repeat:
    if fast==null or fast.next==null: return false
    slow=slow.next; fast=fast.next.next
until slow==fast

entry=head
while entry!=slow: entry=entry.next; slow=slow.next
tail=entry
while tail.next!=entry: tail=tail.next
tail.next=null
return true
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Separate the three phases aloud: detect, locate entry, remove. Dry-run a self-loop and a cycle starting at head. A common weak answer proves detection but guesses which link to cut.

#### ONE-LINE SUMMARY
Floyd detects the cycle, equal-speed pointers locate its entry, and the entry's cycle predecessor is the edge to sever.

---

### MAXIMUM PARENTHESIS NESTING DEPTH ⚡⚠️
**Covers questions: 353**

#### CORE CONCEPT (30 seconds)
Scan left to right with `depth=0`. Increment on `(`, update `maximum`, and decrement on `)`. For validation, reject if depth ever becomes negative or is nonzero at the end. Time is `O(n)` and space is `O(1)`.

#### WHY IT EXISTS
The number of unmatched opening parentheses at a position is exactly the current nesting depth. A full stack is unnecessary when bracket type and matching content are irrelevant.

#### MENTAL MODEL
Opening a parenthesis walks down one staircase level; closing walks up. Record the deepest floor visited and reject attempts to climb above ground.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Increment before comparing with maximum; decrement on close.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clarify whether input is guaranteed valid. If not, detect a negative prefix and a positive final balance. Ignore non-parenthesis characters if allowed.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Multiple delimiter types require a stack to verify correct type/order, though depth can still be the stack size. In source code, parentheses inside strings/comments need tokenization before structural scanning.

#### ALL VARIATIONS COVERED
- **Q353:** Track running unmatched opens and its maximum; if validity is not guaranteed, include both prefix and final-balance checks. ⚠️ Balance zero alone does not validate `)(`.

#### CONNECTIONS TO OTHER TOPICS
Balanced brackets, prefix sums, stacks, expression parsing, compiler front ends, and Dyck paths.

#### CODE / EXAMPLE (if applicable)
```text
depth=0; best=0
for ch in s:
    if ch=='(':
        depth+=1; best=max(best,depth)
    else if ch==')':
        depth-=1
        if depth<0: invalid
if depth!=0: invalid
return best
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Ask whether validity is guaranteed. State the invariant—depth equals unmatched opens in the scanned prefix—and avoid using a stack when one counter fully represents the required information.

#### ONE-LINE SUMMARY
Maximum nesting is the maximum running count of unmatched opening parentheses, with negative-prefix and final-zero checks for validity.

---

### TRAILING ZEROES IN A FACTORIAL ⚡
**Covers questions: 354**

#### CORE CONCEPT (30 seconds)
A decimal trailing zero needs one factor `10=2×5`. Factorials contain more twos than fives, so count factors of five: `floor(n/5)+floor(n/25)+floor(n/125)+...` until the divisor exceeds `n`. This takes `O(log₅ n)` time and `O(1)` space.

#### WHY IT EXISTS
Multiples of five contribute at least one five, multiples of 25 contribute an extra five, and so on. Counting only multiples of five misses repeated factors, while computing `n!` is enormous and unnecessary.

#### MENTAL MODEL
Pair every five-ticket with an abundant two-ticket to make a zero. Numbers like 25 bring two five-tickets, so they must be counted on multiple floors.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sum integer divisions by powers of five. Example: `25!` has `25/5 + 25/25 = 6` trailing zeroes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Repeatedly set `n=floor(n/5)` and add it, avoiding explicit factorial computation and power-overflow hazards.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  This is the prime valuation `v₅(n!)` from Legendre's formula. In base `b`, factorize `b` and take the minimum available prime-exponent ratio.

#### ALL VARIATIONS COVERED
- **Q354:** Count all factors of five in `n!`, including extra factors from powers such as `25` and `125`; twos are not the limiting factor.

#### CONNECTIONS TO OTHER TOPICS
Prime factorization, Legendre's formula, number bases, binomial coefficients, divisibility, and overflow-free arithmetic.

#### CODE / EXAMPLE (if applicable)
```text
zeros=0
while n>0:
    n=floor(n/5)
    zeros+=n
return zeros
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the `2×5` pairing and why fives limit the count. Mention the extra contribution of powers of five; stopping at `n/5` is the standard mistake.

#### ONE-LINE SUMMARY
Trailing zeroes of `n!` equal its total number of factors of five: `⌊n/5⌋+⌊n/25⌋+…`.

---

### RECONSTRUCTING A TREE FROM PREORDER AND INORDER ⚡⚠️
**Covers questions: 356**

#### CORE CONCEPT (30 seconds)
Preorder supplies the next root. Find that root's position in inorder; everything left of it belongs to the left subtree and everything right belongs to the right subtree. Use a value-to-inorder-index map and a shared preorder pointer to build recursively in `O(n)` time and `O(n)` space.

#### WHY IT EXISTS
One traversal alone usually cannot determine tree shape. Preorder reveals root order, while inorder reveals how nodes split around each root; together, with distinct values, they uniquely define the tree.

#### MENTAL MODEL
Preorder hands you the manager; inorder shows which employees sit in the manager's left and right departments. Repeat inside each department.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Preorder is root-left-right; inorder is left-root-right. Base case is an empty inorder interval.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Precompute the inorder map to avoid `O(n)` search at every recursion, which would degrade to `O(n²)`. Validate equal lengths and consistent values.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicate values make a simple value-to-index map ambiguous and reconstruction may not be unique without occurrence identifiers or extra rules. A skewed tree gives `O(n)` recursion depth; iterative construction avoids stack overflow.

#### ALL VARIATIONS COVERED
- **Q356:** Consume preorder roots in order, split by their inorder indexes, and recurse left before right. ⚠️ The standard uniqueness and `O(n)` map solution assumes distinct node values.

#### CONNECTIONS TO OTHER TOPICS
Postorder/inorder reconstruction, serialization, recursion intervals, expression trees, tree traversals, and uniqueness proofs.

#### CODE / EXAMPLE (if applicable)
```text
index[value] = position in inorder
pre=0
build(lo,hi):
    if lo>hi: return null
    value=preorder[pre++]
    mid=index[value]
    node=new Node(value)
    node.left=build(lo,mid-1)
    node.right=build(mid+1,hi)
    return node
return build(0,n-1)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State traversal orders and the distinct-values assumption before implementation. Keep interval semantics consistent and explain why the shared preorder pointer naturally selects the next subtree root.

#### ONE-LINE SUMMARY
Take roots from preorder and use their inorder positions to delimit and recursively build left and right subtrees.

---

### KTH SYMBOL IN RECURSIVE GRAMMAR ⚡
**Covers questions: 357**

#### CORE CONCEPT (30 seconds)
Each row replaces `0→01` and `1→10`; the second half is the bitwise complement of the first. For 1-indexed `(n,k)`, let `half=2^(n−2)`: recurse to `(n−1,k)` if `k<=half`, otherwise recurse to `(n−1,k−half)` and invert the result. An equivalent shortcut is parity of set bits in `k−1`.

#### WHY IT EXISTS
Constructing row `n` takes exponential space, but one requested position has only one ancestor per row. Recursive half-mapping reduces the problem size without generating unrelated symbols.

#### MENTAL MODEL
Fold the row in half: the right half is a color-inverted copy of the left. Move the index into the left half and remember whether to flip the color.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Base case `(1,1)=0`; left half stays the same, right half flips.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use 1-based indexing consistently and validate `1<=k<=2^(n−1)`. Recursive time/space are `O(n)`; popcount parity can be `O(log k)` time and `O(1)` space.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The sequence is the Thue–Morse sequence: answer is `popcount(k−1) mod 2`, independent of `n` once `k` fits. Avoid overflow when computing powers for large `n` by using parent-position recursion: parent index is `(k+1)/2`, with even positions inverted.

#### ALL VARIATIONS COVERED
- **Q357:** Map `k` through recursive halves and flip for the right half, or return the parity of set bits in `k−1`; do not materialize the row.

#### CONNECTIONS TO OTHER TOPICS
Divide and conquer, binary representations, popcount parity, Thue–Morse sequence, recursive strings, and bit manipulation.

#### CODE / EXAMPLE (if applicable)
```text
symbol(n,k):
    if n==1: return 0
    parent=symbol(n-1, (k+1)/2)
    if k is odd: return parent
    return 1-parent
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the index convention and derive the parent relation. Mention the popcount result only after establishing the recursion; that demonstrates understanding instead of a memorized trick.

#### ONE-LINE SUMMARY
Trace `k` to its parent each row, flipping on right/even children; equivalently answer `popcount(k−1) mod 2`.

---

### MINIMUM SWAPS TO SORT VIA PERMUTATION CYCLES ⚡⚠️
**Covers questions: 358**

#### CORE CONCEPT (30 seconds)
For distinct values, pair each value with its original index, sort the pairs by value, and view the resulting original-to-sorted position mapping as a permutation. A cycle of length `L` needs exactly `L−1` swaps, so sum that over all cycles. Time is `O(n log n)`, space `O(n)`.

#### WHY IT EXISTS
One swap can place at most one additional cycle element into its correct position. Rotating a cycle around one anchor resolves it in `L−1` swaps, proving both the lower bound and achievability.

#### MENTAL MODEL
People have assigned seats. Follow “whose seat should this person occupy?” until the chain returns to its start; a loop of `L` misplaced people takes `L−1` exchanges.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sort value-index pairs, mark visited positions, and add `cycleLength−1` for cycles longer than one.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Define mapping direction carefully and dry-run it. Alternatively, maintain a value-to-current-index map and greedily swap each target value into place when all values are distinct.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Duplicate values make target assignments non-unique; naïvely stable-sorting indexed duplicates can overcount because a better matching between equal values may use fewer swaps. Clarify whether values are distinct or use a duplicate-aware formulation appropriate to constraints.

#### ALL VARIATIONS COVERED
- **Q358:** Convert the distinct-value sorting target into permutation cycles and sum `L−1`. ⚠️ Ask about duplicates because the simple indexed-pair cycle method is not universally minimal for them.

#### CONNECTIONS TO OTHER TOPICS
Permutations, cycle decomposition, minimum swaps to group elements, inversion count, selection sort, and graph components.

#### CODE / EXAMPLE (if applicable)
```text
pairs=sorted((value, originalIndex) for each array element)
visited=[false]*n; answer=0
for sortedPos in 0..n-1:
    if visited[sortedPos] or pairs[sortedPos].originalIndex==sortedPos: continue
    length=0; j=sortedPos
    while not visited[j]:
        visited[j]=true
        j=pairs[j].originalIndex
        length+=1
    answer+=length-1
return answer
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Prove why each cycle costs `L−1`, not just present code. State the distinct-values assumption prominently and do not confuse minimum swaps with inversion count, which is minimum adjacent swaps.

#### ONE-LINE SUMMARY
Sorting defines a permutation; each cycle of length `L` requires `L−1` arbitrary swaps.

---

### WORD LADDER AS AN IMPLICIT-GRAPH BFS ⚡
**Covers questions: 359**

#### CORE CONCEPT (30 seconds)
Treat each valid word as a vertex and connect words differing by one character. Because every transformation costs one step, BFS from the start word finds the shortest ladder. Generate neighbors by changing each position to every alphabet character, and remove or mark a word when enqueued. Typical time is `O(N·L·alphabet)` with hash-set lookup.

#### WHY IT EXISTS
The full graph can have too many pair comparisons. Neighbor generation reveals only reachable one-edit edges on demand, while BFS guarantees the first discovery uses the fewest transformations.

#### MENTAL MODEL
Words are rooms; changing one letter opens a door. BFS explores all rooms one door away, then two doors away, until it reaches the target.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Use BFS, not DFS, for minimum unweighted steps. All words must have equal length, and the target usually must be in the dictionary.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Mutate one position at a time, restore it, perform `O(1)` expected hash lookup, and mark on enqueue. Clarify whether answer counts transformations or words in the sequence.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Bidirectional BFS expands from both start and target and often reduces the frontier dramatically. Wildcard-pattern buckets such as `h*t` can accelerate adjacency construction. Avoid repeatedly scanning the entire dictionary.

#### ALL VARIATIONS COVERED
- **Q359:** Run BFS on one-letter word transformations and return the level where the target is first reached; define whether the initial word contributes to the reported length.

#### CONNECTIONS TO OTHER TOPICS
Unweighted shortest paths, bidirectional BFS, wildcard indexing, implicit graphs, mutation problems, and state-space search.

#### CODE / EXAMPLE (if applicable)
```text
queue=[(begin,0)]; remove begin from dictionary
while queue not empty:
    word,steps=popFront()
    if word==end: return steps
    for each position i:
        for ch in 'a'..'z':
            next=word with position i changed to ch
            if next in dictionary:
                remove next
                pushBack(next,steps+1)
return -1
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Translate the problem to an unweighted graph before coding and state the level-count convention. Mark on enqueue to prevent duplicate frontiers. If constraints are large, mention bidirectional BFS as the practical improvement.

#### ONE-LINE SUMMARY
Words form an implicit unweighted graph, so BFS over one-letter mutations returns the minimum transformation count.

---

### CARTESIAN PRODUCT BY BACKTRACKING
**Covers questions: 360**

#### CORE CONCEPT (30 seconds)
Build one tuple from left to right. At depth `i`, try every value from list `i`, append it, recurse to `i+1`, then remove it. When depth equals the number of lists, emit a copy. If list sizes are `s₁…sₘ`, there are `P=∏sᵢ` outputs, so output-sensitive time is `O(P·m)`.

#### WHY IT EXISTS
Every output makes exactly one independent choice from each list. Backtracking mirrors that product structure and stores only the current partial tuple besides the unavoidable output.

#### MENTAL MODEL
Walk through aisles of choices, picking one item from each aisle. Photograph the basket after the last aisle, then backtrack to try the next choice.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  One recursive level per list; append, recurse, pop. An empty input list makes the entire product empty.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Copy the path when emitting or every result may reference the same mutable list. Distinguish zero input lists—often one empty tuple—from an input containing an empty list—zero tuples.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A lazy iterator avoids materializing enormous products. Mixed-radix counters generate iteratively. Detect size overflow or impose limits before allocation because output grows multiplicatively.

#### ALL VARIATIONS COVERED
- **Q360:** Backtrack through lists, choosing one element from each and emitting a copied tuple at the final depth; no algorithm can avoid time proportional to the requested output.

#### CONNECTIONS TO OTHER TOPICS
Backtracking, combinations, nested loops, mixed-radix counting, lazy generators, configuration testing, and combinatorial explosion.

#### CODE / EXAMPLE (if applicable)
```text
generate(i,path):
    if i==lists.length:
        output.add(copy(path)); return
    for value in lists[i]:
        path.add(value)
        generate(i+1,path)
        path.removeLast()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State output complexity instead of claiming merely `O(m)`. Handle empty-list semantics explicitly and copy the path on emission. For huge products, proactively suggest a generator interface.

#### ONE-LINE SUMMARY
Choose one value per list with append–recurse–pop, emitting a copy after the final choice.

---

## Step 3 — Cross-Batch Connections

### Questions that connect to later batches

- **Q351 and Q355** prepare you for recurrence derivation, Catalan families, combinatorial DP, and modulo-counting problems.
- **Q352** connects to cycle length/entry, functional graphs, duplicate-number Floyd detection, and linked-list intersection.
- **Q353** links to valid-parentheses stacks, prefix-balance arguments, and expression parsers.
- **Q354** prepares you for prime valuations, divisibility of factorials, and trailing zeroes in other bases.
- **Q356** connects to traversal conversion, serialization, subtree intervals, and recursive tree construction.
- **Q357** links recursive strings to binary indexing, popcount parity, and divide-and-conquer navigation.
- **Q358** prepares you for permutation-cycle counting and the distinction between arbitrary versus adjacent swaps.
- **Q359** connects to bidirectional BFS, mutation graphs, and shortest paths on implicit states.
- **Q360** prepares you for combinations, generators, search trees, and output-sensitive complexity.

### What to be comfortable with before Batch 37

- Derive a counting recurrence from mutually exclusive first choices and independent substructures.
- Explain all three phases of Floyd loop removal and handle a self-loop.
- Use running-balance invariants and distinguish balance from full delimiter validation.
- Count prime factors in factorials without constructing the factorial.
- Rebuild a tree using traversal order plus interval boundaries.
- Navigate recursive sequences by index rather than generating them.
- Decompose a permutation into cycles and state assumptions about duplicate values.
- Choose BFS for unit-cost shortest paths and backtracking for complete enumeration.

## Batch 36 Rapid Recall

1. **Domino tiling:** `f(n)=f(n−1)+f(n−2)`.
2. **Loop removal:** detect, locate entry, cut its cycle predecessor.
3. **Parenthesis depth:** maximum unmatched-open count.
4. **Factorial zeroes:** sum divisions by powers of five.
5. **Unique BSTs:** sum left-count times right-count over roots.
6. **Tree reconstruction:** preorder gives roots; inorder gives boundaries.
7. **Kth grammar:** follow parent indices and flip on right children.
8. **Minimum swaps:** sum `cycleLength−1`.
9. **Word ladder:** BFS one-letter mutations.
10. **Cartesian product:** one recursive choice per list.
