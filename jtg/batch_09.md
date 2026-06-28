# JTG Technical Interview Coaching — Batch 09

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 81–90

## Questions in This Batch

81. ⚡⚠️ What is context switching?
82. ⚡ What is virtual memory?
83. ⚡ What is paging in an OS?
84. ⚡ What is segmentation in memory management?
85. ⚡⚠️ What is thrashing?
86. ⚡⚠️ What is the difference between internal and external fragmentation?
87. ⚡ What is the purpose of a page replacement algorithm?
88. ⚡⚠️ Explain the FIFO, LRU, and Optimal page replacement algorithms.
89. ⚡ What is a critical section?
90. ⚡⚠️ What is starvation in OS scheduling?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | CPU context switching | 81 | This is the mechanism that transfers execution between schedulable tasks. |
| B | Virtual address-space organisation | 82, 83, 84, 86 | Virtual memory is implemented through mappings such as paging/segmentation, whose allocation choices explain fragmentation. |
| C | Page faults, replacement, and thrashing | 85, 87, 88 | Replacement policy determines victims during page faults; excessive faults produce thrashing. |
| D | Critical sections and starvation | 89, 90 | Both concern safe and fair progress when concurrent tasks compete for CPU or shared resources. |

---

### CONTEXT SWITCHING ⚡⚠️
**Covers questions: 81**

#### CORE CONCEPT (30 seconds)
A context switch occurs when the OS stops one running thread/process, saves its CPU execution state, and restores another's state so the CPU can resume the new task. The saved context includes registers, program counter, stack pointer, and scheduling/accounting state; switching processes may also change address-space mappings.

#### WHY IT EXISTS
One CPU core must multiplex many runnable tasks. Context switching enables multitasking, time sharing, priority response, and blocking I/O, but it performs no application work itself and therefore adds overhead.

#### MENTAL MODEL
Two people share one desk. Before changing workers, the first bookmarks the document, stores their notes, and clears the desk; the second restores their own notes and continues exactly where they stopped.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Save the current task's state, choose another task, restore its state, and resume. Triggers include time-slice expiry, blocking, interrupts, and a higher-priority task becoming runnable.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  The OS stores execution state in thread/process control structures. Switching has direct save/restore and scheduler cost plus indirect cache, TLB, and branch-predictor disruption. Thread switches within one process are often cheaper because the address space remains the same.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A user-to-kernel mode switch is not automatically a context switch—the same task may continue after a system call. A context switch may follow an interrupt if scheduling chooses another task. Exact saved state and address-space/TLB behavior depend on architecture and OS; hardware tags such as ASIDs can reduce TLB flushing.

#### ALL VARIATIONS COVERED
- **Q81:** Context switching saves one task's CPU state and restores another's to multiplex the processor. ⚠️ It is broader than merely entering kernel mode and has both direct and cache-related overhead.

#### CONNECTIONS TO OTHER TOPICS
Preemption, scheduling, interrupts, system calls, process control blocks, thread control blocks, TLBs, CPU caches, time quantum, and user/kernel mode.

#### CODE / EXAMPLE (if applicable)
```text
onSchedule():
    save registers, PC, SP of current task
    mark/update current task state
    next = scheduler.chooseRunnable()
    switch address space if required
    restore next task's registers, PC, SP
    resume next
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain what is saved, why switching happens, and why it costs time. Distinguish process, thread, and mode switches without claiming one fixed cost. Avoid vague phrases such as “the CPU changes process” with no state-restoration explanation.

#### ONE-LINE SUMMARY
A context switch saves one task's execution state and restores another's so the CPU can multitask, at scheduler and cache/TLB cost.

---

### VIRTUAL MEMORY, PAGING, SEGMENTATION, AND FRAGMENTATION ⚡⚠️
**Covers questions: 82, 83, 84, 86**

#### CORE CONCEPT (30 seconds)
Virtual memory gives each process a private logical address space mapped to physical memory and, when needed, secondary storage. Paging divides virtual memory and RAM into fixed-size pages and frames, using a page table for mapping. Segmentation divides an address space into variable-size logical regions such as code, stack, and data. Fixed-size allocation mainly risks internal fragmentation; variable-size contiguous allocation mainly risks external fragmentation.

#### WHY IT EXISTS
Programs need isolation, protection, relocation, sharing, and the illusion of more contiguous memory than physically available. Paging makes physical allocation non-contiguous and simple; segmentation reflects logical program units and allows per-segment protection/sharing. Fragmentation describes space lost because allocated shapes do not perfectly match requests.

#### MENTAL MODEL
A program sees a numbered book (**virtual address space**). Paging cuts it into equal pages stored in any available shelf slots (**frames**) and uses an index to find them. Segmentation stores whole chapters of different lengths. Internal waste is blank space inside a reserved box; external waste is many small free gaps between boxes.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Paging: fixed-size pages/frames and page tables. Segmentation: variable-size logical segments with base/limit. Internal fragmentation is waste inside allocated blocks; external fragmentation is free memory split into unusable holes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A virtual address is divided into virtual page number plus offset; the page table maps the page number to a frame, and the offset is unchanged. A segmented address uses segment number plus offset checked against a limit. Paging removes the need for contiguous physical allocation but adds page-table/TLB overhead.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Paging may waste part of the final page (internal fragmentation) but does not suffer classic external fragmentation for frame allocation. Segmentation can suffer external fragmentation and may require compaction. Real systems often combine logical regions with paging; “virtual memory” is the abstraction, while demand paging is one implementation policy. Virtual memory also supports copy-on-write and memory-mapped files—not only “using disk as extra RAM.”

#### ALL VARIATIONS COVERED
- **Q82:** Virtual memory maps private virtual addresses to physical frames/backing storage, providing isolation, protection, relocation, and demand-loaded capacity.
- **Q83:** Paging splits virtual memory into fixed pages and physical memory into equal frames; page tables translate page number while preserving the offset.
- **Q84:** Segmentation divides memory into variable-size logical units addressed by segment plus offset, enabling logical protection/sharing but risking external fragmentation.
- **Q86:** Internal fragmentation is unused space inside an allocated block; external fragmentation is enough total free space scattered into unsuitable holes. ⚠️ Paging mainly causes the former, variable contiguous allocation the latter.

#### CONNECTIONS TO OTHER TOPICS
MMU, page tables, TLBs, page faults, demand paging, base/limit registers, copy-on-write, memory-mapped files, compaction, buddy allocation, and protection bits.

#### CODE / EXAMPLE (if applicable)
```text
pageNumber = virtualAddress / pageSize
offset     = virtualAddress % pageSize
frame      = pageTable[pageNumber]
physicalAddress = frame * pageSize + offset
```

The mapping changes the page/frame number, not the within-page offset.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with the abstraction and benefits, then compare fixed versus logical variable-size division. Draw the address split if asked. Use one numeric waste example to distinguish fragmentation. Avoid defining virtual memory only as swapping to disk or claiming paging has no memory waste.

#### ONE-LINE SUMMARY
Virtual memory maps private logical addresses to RAM; paging uses fixed blocks and risks internal waste, while segmentation uses logical variable blocks and risks external holes.

---

### PAGE REPLACEMENT AND THRASHING ⚡⚠️
**Covers questions: 85, 87, 88**

#### CORE CONCEPT (30 seconds)
When a page fault occurs and no free frame exists, a page replacement algorithm chooses a victim. FIFO evicts the oldest loaded page, LRU evicts the least recently used page, and Optimal evicts the page whose next use is farthest in the future. Optimal is only a benchmark because future references are unknown. Thrashing occurs when a process/system lacks frames for its active working set and spends most of its time faulting and moving pages instead of executing.

#### WHY IT EXISTS
RAM is finite, so demand paging needs a policy for retaining the pages most likely to be useful. Good replacement exploits locality and minimises faults. If aggregate active working sets exceed available frames, no clever replacement policy can fully compensate; the OS must reduce pressure or add memory.

#### MENTAL MODEL
A desk holds only a few books. FIFO removes the book placed there earliest; LRU removes the book untouched longest; Optimal removes the book you know you will not need for the longest future time. Thrashing is constantly swapping books with the shelf and doing almost no reading.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Replacement selects a victim page. FIFO = oldest arrival; LRU = oldest recent use; Optimal = farthest future use. Thrashing = extremely high page-fault activity and low useful CPU work.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  FIFO is simple but ignores locality. LRU uses locality but exact implementation can be expensive, so systems approximate it with reference bits/Clock. Optimal gives the minimum possible faults for a reference string and evaluates other algorithms.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  FIFO can show Belady's anomaly: adding frames may increase faults. LRU and Optimal are stack algorithms and do not show that anomaly. Dirty victims require write-back; clean victims do not. Thrashing can be controlled with working-set/page-fault-frequency policies, reducing multiprogramming, or allocating more frames. Global replacement may let one process steal another's frames; local replacement limits that interaction.

#### ALL VARIATIONS COVERED
- **Q85:** Thrashing is excessive paging caused when active working sets do not fit in allocated memory; page faults dominate and CPU utilisation falls.
- **Q87:** A page replacement algorithm chooses which resident page to evict after a page fault when no free frame exists, aiming to minimise future faults and I/O.
- **Q88:** FIFO uses load age, LRU uses past recency, and Optimal uses future knowledge. ⚠️ Optimal is unimplementable online and serves as a lower-bound benchmark; FIFO may suffer Belady's anomaly.

#### CONNECTIONS TO OTHER TOPICS
Demand paging, locality, working sets, page-fault frequency, Clock/second-chance, dirty/reference bits, swap, TLBs, Belady's anomaly, and multiprogramming level.

#### CODE / EXAMPLE (if applicable)
```text
onPageFault(page):
    if free frame exists: use it
    else:
        victim = replacementPolicy.choose()
        if victim is dirty: write victim to backing store
        invalidate victim mapping
    load page, update page table/TLB, resume instruction
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the fault-to-victim flow, then compare all three policies on information used, cost, and quality. Connect thrashing to working-set pressure rather than just “many page faults.” Avoid saying LRU knows the future or that more multiprogramming always improves CPU use.

#### ONE-LINE SUMMARY
Replacement chooses a victim when RAM is full—FIFO by age, LRU by past use, Optimal by unknowable future use—and insufficient frames for working sets causes thrashing.

---

### CRITICAL SECTIONS AND STARVATION ⚡⚠️
**Covers questions: 89, 90**

#### CORE CONCEPT (30 seconds)
A critical section is code that accesses shared mutable state and must follow a synchronization protocol so concurrent execution cannot violate its invariant. A correct critical-section solution targets mutual exclusion, progress, and bounded waiting. Starvation is indefinite postponement: the system continues making progress, but one ready task repeatedly loses access to CPU or a resource.

#### WHY IT EXISTS
Read–modify–write operations can interleave and lose updates. Critical sections identify exactly where coordination is required. Mutual exclusion alone is not enough if the policy is unfair; starvation analysis asks whether every waiting task eventually gets a turn.

#### MENTAL MODEL
A critical section is a one-person editing room for a shared document. Starvation is one waiting editor who is continually skipped while others keep entering—the room is active, so this is not a total deadlock.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Critical section = shared-state access requiring controlled entry. Starvation = a task waits indefinitely while others proceed.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Protect the shared invariant with a mutex/semaphore/monitor or atomic operation, keep the section small, and release in a guaranteed cleanup path. Starvation can arise from strict priority scheduling, unfair locks, or reader preference; aging and fair/FIFO queues help.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The classic requirements are mutual exclusion, progress, and bounded waiting. Overly large sections reduce parallelism; multiple locks introduce deadlock risk. Starvation differs from deadlock, where a set of tasks cannot progress, and livelock, where tasks change state but accomplish nothing. Priority inversion is different again: a high-priority task waits for a lower-priority lock holder and may require priority inheritance.

#### ALL VARIATIONS COVERED
- **Q89:** A critical section is the code region manipulating shared mutable state; synchronise entry to preserve a shared invariant and aim for mutual exclusion, progress, and bounded waiting.
- **Q90:** Starvation is indefinite waiting while other work continues, often caused by unfair priority/resource allocation. ⚠️ Unlike deadlock, system-wide progress still occurs.

#### CONNECTIONS TO OTHER TOPICS
Race conditions, mutexes, semaphores, monitors, atomic instructions, deadlock, livelock, fairness, aging, priority inversion, readers–writers, and bounded waiting.

#### CODE / EXAMPLE (if applicable)
```text
lock(mutex)
try:
    sharedBalance = sharedBalance + amount  // critical section
finally:
    unlock(mutex)

Fairness option: queue waiters FIFO rather than repeatedly
letting newly arrived high-priority work bypass one task forever.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the shared invariant, not merely “code inside a lock.” State all three desirable critical-section properties. Contrast starvation with deadlock using system progress. Avoid assuming every lock is fair or that a larger critical section is automatically safer.

#### ONE-LINE SUMMARY
A critical section protects a shared invariant; starvation occurs when an unfair policy postpones one task forever even though others keep progressing.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q81 (context switching)** connects to process/thread scheduling, system calls, kernel mode, thread pools, and time-quantum tuning.
- **Q82–Q84 and Q86 (memory mapping)** prepare demand paging, copy-on-write, allocation policies, Java heap/stack memory, and database buffer management.
- **Q85, Q87, and Q88 (replacement/thrashing)** connect to cache eviction such as LRU, working-set capacity planning, and locality in data structures.
- **Q89–Q90 (critical section/starvation)** connect to mutexes, semaphores, deadlock, Round Robin/priority scheduling, Java locks, race conditions, and fairness.
- **Q88 (LRU)** later becomes an implementation problem combining a hash map with a doubly linked list.

### Be Comfortable With Before Batch 10 (Questions 91–100)

- Round Robin time quantum and priority-scheduling starvation/aging.
- System calls, traps, and user-mode/kernel-mode protection.
- Zombie versus orphan process lifecycle.
- Multiprogramming versus time-sharing/multitasking.
- Thread pools, bounded queues, and reuse benefits.
- Demand paging and page-fault flow.
- Copy-on-write and shared pages after `fork`-style creation.
- First-fit, best-fit, and worst-fit contiguous allocation strategies.

### Batch 09 Rapid Recall

81. Context switch: save one task's CPU state and restore another's.
82. Virtual memory: private logical address space mapped to physical/backing storage.
83. Paging: fixed-size virtual pages mapped to physical frames.
84. Segmentation: variable-size logical regions addressed by segment and offset.
85. Thrashing: working sets do not fit, so page faults dominate execution.
86. Internal waste is inside allocations; external waste is scattered free holes.
87. Replacement selects a victim when a page fault finds no free frame.
88. FIFO = oldest; LRU = least recent; Optimal = farthest future use.
89. Critical section: shared-state code requiring synchronization.
90. Starvation: one task waits indefinitely while others progress.
