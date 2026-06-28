# JTG Technical Interview Coaching — Batch 10

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 91–100

## Questions in This Batch

91. ⚡⚠️ What is the difference between Round Robin and Priority scheduling?
92. ⚡⚠️ What is a system call?
93. ⚡ What is the kernel? What is the difference between user mode and kernel mode?
94. ⚡⚠️ What is a zombie process?
95. ⚡⚠️ What is an orphan process?
96. ⚡ What is the difference between multiprogramming and multitasking?
97. ⚡ What is a thread pool?
98. ⚡ What is demand paging?
99. ⚡⚠️ What is copy-on-write in an OS?
100. ⚡⚠️ What is the difference between first-fit, best-fit, and worst-fit memory allocation?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Scheduling, workload concurrency, and worker reuse | 91, 96, 97 | These explain how an OS/application keeps work available, shares execution time, and limits reusable execution resources. |
| B | Protected kernel services | 92, 93 | System calls are the controlled bridge from restricted user code into privileged kernel operations. |
| C | Process termination and parent lifecycle | 94, 95 | Zombies and orphans are both parent/child lifecycle states but differ fundamentally in whether the child is alive. |
| D | Lazy virtual-memory techniques | 98, 99 | Demand paging delays loading; copy-on-write delays duplication, both using page faults to perform work only when needed. |
| E | Contiguous memory placement | 100 | First, best, and worst fit choose different free holes and fragmentation trade-offs. |

---

### SCHEDULING, MULTIPROGRAMMING, AND THREAD POOLS ⚡⚠️
**Covers questions: 91, 96, 97**

#### CORE CONCEPT (30 seconds)
Round Robin gives each ready task a fixed time quantum in cyclic order, prioritising fairness and response time. Priority scheduling selects the highest-priority ready task but may starve low-priority work unless aging is used. Multiprogramming keeps multiple jobs in memory so the CPU can run another when one blocks; multitasking adds frequent time-sharing for responsiveness. A thread pool reuses a bounded set of worker threads to execute queued tasks without creating a new thread per task.

#### WHY IT EXISTS
Scheduling decides who receives a scarce CPU. Multiprogramming improves utilisation, multitasking makes interactive systems responsive, and thread pools control application concurrency while avoiding repeated creation cost and unbounded resource use.

#### MENTAL MODEL
Round Robin is a moderator giving everyone timed turns. Priority scheduling serves urgent cases first. Multiprogramming keeps several files open so work continues when one needs information. A thread pool is a fixed team taking jobs from a shared inbox.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Round Robin uses a circular ready queue and time quantum. Priority scheduling chooses highest priority and risks starvation. Multiprogramming focuses on CPU utilisation; multitasking/time-sharing focuses on responsive sharing. A thread pool is reusable workers plus a task queue.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A tiny Round Robin quantum improves responsiveness but increases context-switch cost; a huge quantum approaches FCFS. Priority scheduling may be preemptive or non-preemptive, and aging raises long-waiting priorities. Thread pools bound thread creation and centralise scheduling, but queue size and rejection/backpressure policy matter.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Multiprogramming and multitasking overlap in modern systems; the useful distinction is historical objective and switching trigger. Thread-pool sizing differs for CPU-bound and I/O-bound work. Unbounded queues hide overload and increase latency/memory; nested tasks waiting on the same exhausted pool can deadlock. Tasks must isolate failures and clean thread-local state.

#### ALL VARIATIONS COVERED
- **Q91:** Round Robin is fair cyclic time slicing; Priority scheduling chooses importance and may starve low priorities. ⚠️ Priority scheduling can be preemptive or non-preemptive.
- **Q96:** Multiprogramming keeps several jobs resident to avoid CPU idle time; multitasking rapidly time-slices tasks for interactive responsiveness, though modern terminology often overlaps.
- **Q97:** A thread pool owns reusable worker threads that take tasks from a queue, reducing creation overhead and bounding concurrency.

#### CONNECTIONS TO OTHER TOPICS
Preemption, context switching, FCFS, starvation and aging, throughput/latency, producer–consumer queues, backpressure, executors, async programming, and CPU-versus-I/O-bound workloads.

#### CODE / EXAMPLE (if applicable)
```text
workerLoop():
    while pool is running:
        task = queue.take()          // blocks when no work
        try:
            task.run()
        catch error:
            record/isolate failure

submit(task):
    if boundedQueue cannot accept: apply rejection/backpressure policy
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare goals and trade-offs, not only definitions. For Round Robin, discuss quantum size; for Priority, name starvation and aging. For thread pools, mention both reusable workers and a bounded workload policy. Avoid claiming more threads always increase throughput.

#### ONE-LINE SUMMARY
Round Robin shares CPU by timed turns, Priority serves importance, multiprogramming/multitasking keep work active and responsive, and thread pools reuse bounded workers for queued tasks.

---

### SYSTEM CALLS, THE KERNEL, AND PRIVILEGE MODES ⚡⚠️
**Covers questions: 92, 93**

#### CORE CONCEPT (30 seconds)
The kernel is the privileged core of the OS that manages CPU scheduling, memory, devices, files, processes, and protection. User mode restricts applications from privileged instructions and arbitrary hardware/kernel memory access. A system call is the controlled interface through which a user program requests a kernel service, triggering a validated transition to kernel mode and then returning a result.

#### WHY IT EXISTS
Applications need files, networking, memory, and devices, but direct unrestricted access would let one faulty program corrupt the whole machine. Hardware privilege modes plus the system-call boundary provide isolation and controlled resource sharing.

#### MENTAL MODEL
User mode is a public service counter; the kernel is the secure staff area. A system call is a numbered request form checked at the counter—not permission for the customer to walk into the vault.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  User mode is restricted; kernel mode can execute privileged operations. System calls include file I/O, process control, memory management, and networking requests.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A library wrapper places a system-call number/arguments where the ABI expects, executes a trap/syscall instruction, and the kernel validates arguments/permissions before dispatch. Examples include `read`, `write`, `open`, `fork`, and `mmap` on Unix-like systems.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A system call causes a privilege/mode transition but not necessarily a process context switch—the same thread may return immediately. If it blocks, the scheduler may run another task. Not every API call is a syscall; libraries may compute entirely in user space or buffer multiple operations. Copying/checking user pointers and mitigating transition overhead are major kernel concerns.

#### ALL VARIATIONS COVERED
- **Q92:** A system call is a controlled request from user code to a kernel service through a defined ABI/trap boundary. ⚠️ It may cause, but is not itself synonymous with, a context switch.
- **Q93:** The kernel is the privileged resource manager; user mode restricts applications, while kernel mode executes trusted OS code with hardware/memory authority.

#### CONNECTIONS TO OTHER TOPICS
Interrupts, exceptions/traps, context switches, process isolation, device drivers, virtual memory, file descriptors, ABIs, system-call overhead, and security boundaries.

#### CODE / EXAMPLE (if applicable)
```text
user program -> library wrapper -> syscall/trap instruction
             -> kernel validates number, pointers, permissions
             -> kernel service/device work
             -> return value/error -> user mode
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Describe the full boundary crossing and validation, then give real examples. Distinguish API, system call, mode switch, and task switch. Avoid saying the kernel is simply “the OS” without naming its privileged resource-management role.

#### ONE-LINE SUMMARY
The kernel safely manages hardware/resources in privileged mode, and system calls are the validated bridge through which restricted user programs request its services.

---

### ZOMBIE AND ORPHAN PROCESSES ⚡⚠️
**Covers questions: 94, 95**

#### CORE CONCEPT (30 seconds)
A zombie is a child process that has terminated but whose parent has not yet collected its exit status with `wait`; only a small process-table record remains. An orphan is a still-running child whose parent terminated first; the OS reparents it to a designated reaper such as `init`/a subreaper, which later collects it.

#### WHY IT EXISTS
The OS must preserve a child's exit status until its parent can observe completion. That retention creates a temporary zombie state. Reparenting ensures a living child still has someone responsible for collecting its eventual status if its original parent disappears.

#### MENTAL MODEL
A zombie is a finished exam whose result remains in the office until the parent signs for it. An orphan is a student still taking the exam after the original guardian leaves; another authorised guardian adopts the responsibility.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Zombie = terminated, not reaped. Orphan = alive, parent terminated. Parent calls `wait`/`waitpid` to reap a child.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A zombie consumes a PID/process-table entry, not normal executing memory/CPU. Many unreaped zombies can exhaust process-table resources. An orphan continues normally after reparenting and is reaped by the new parent when it exits.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Sending a normal kill signal to a zombie cannot terminate it again—it is already dead; the parent must reap it or terminate so a reaper adopts the entry. A brief zombie state is normal between child exit and parent wait. Daemonisation historically uses controlled forking/reparenting, but service managers now often supervise directly.

#### ALL VARIATIONS COVERED
- **Q94:** A zombie has finished execution but retains an exit-status table entry until its parent waits. ⚠️ It is already dead, not a process still consuming CPU.
- **Q95:** An orphan is still running after its parent exits and is adopted/reaped by a system reaper. ⚠️ It is not the same as a zombie.

#### CONNECTIONS TO OTHER TOPICS
Process creation/termination, `fork`, `wait`, exit status, signals such as `SIGCHLD`, PID tables, init/subreapers, daemons, and process supervision.

#### CODE / EXAMPLE (if applicable)
```text
parent:
    childPid = fork()
    if childPid > 0:
        ...
        waitpid(childPid)   // collects exit status; removes zombie entry

child:
    doWork()
    exit(status)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Lead with alive versus dead, then explain reaping. State the resource retained by a zombie and why the OS retains it. Avoid proposing “kill the zombie” or saying every orphan is an error.

#### ONE-LINE SUMMARY
A zombie is dead but awaiting `wait`; an orphan is alive after its parent exits and is adopted by a reaper.

---

### DEMAND PAGING AND COPY-ON-WRITE ⚡⚠️
**Covers questions: 98, 99**

#### CORE CONCEPT (30 seconds)
Demand paging loads a virtual page into RAM only when it is first referenced, causing a page fault if it is absent. Copy-on-write lets processes initially share the same physical pages as read-only and creates a private copy only when one process writes. Both postpone expensive work until it is actually needed.

#### WHY IT EXISTS
Programs often reserve or inherit more memory than they immediately use. Eagerly loading every page or copying an entire address space wastes time and RAM. Lazy paging and copying reduce startup cost and memory footprint while preserving the illusion of private memory.

#### MENTAL MODEL
Demand paging requests a book from storage only when someone opens its catalogue entry. Copy-on-write lets two readers share one read-only worksheet; a photocopy is made only when one reader wants to write on it.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Demand paging loads on first access via a page fault. COW shares pages until a write fault triggers duplication.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  On a demand page fault, the OS checks validity/permissions, finds or replaces a frame, loads data or zero-fills, updates the page table/TLB, and restarts the instruction. For COW, page tables initially map the same frame read-only; a write fault allocates/copies/remaps a private frame.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  COW needs reference counts and careful handling of concurrent faults; if only one owner remains, a copy may be avoidable. It makes `fork` cheap, especially when the child soon executes a new program. Neither technique makes access free—the first fault is expensive, and excessive demand faults can thrash. A protection fault is recoverable only when the mapping is valid for demand/COW; illegal access still fails.

#### ALL VARIATIONS COVERED
- **Q98:** Demand paging keeps nonresident pages out of RAM until reference; a valid page fault loads/maps the page and restarts execution.
- **Q99:** Copy-on-write shares read-only physical pages and copies only on the first write. ⚠️ It delays copying; it does not mean processes permanently share mutable state.

#### CONNECTIONS TO OTHER TOPICS
Virtual memory, page faults, page replacement, `fork`, memory-mapped files, lazy allocation, zero pages, reference counting, TLB invalidation, and thrashing.

#### CODE / EXAMPLE (if applicable)
```text
onWriteFault(virtualPage):
    oldFrame = pageTable[virtualPage].frame
    if oldFrame has multiple owners:
        newFrame = allocateFrame()
        copy(oldFrame, newFrame)
        remap virtualPage -> newFrame, writable
    else:
        mark oldFrame mapping writable
    restart faulting instruction
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the exact event that triggers work and the fault-handler sequence. Connect COW to `fork` and demand paging to lazy loading. Avoid treating every page fault as an error or claiming COW eliminates copying in all workloads.

#### ONE-LINE SUMMARY
Demand paging delays loading until first access; copy-on-write delays duplication until first modification, using recoverable page faults for both.

---

### FIRST-FIT, BEST-FIT, AND WORST-FIT ALLOCATION ⚡⚠️
**Covers questions: 100**

#### CORE CONCEPT (30 seconds)
For variable-size contiguous allocation, first-fit takes the first free hole large enough, best-fit takes the smallest adequate hole, and worst-fit takes the largest hole. First-fit is usually faster and often performs well; best-fit may create many tiny unusable holes; worst-fit preserves a large remainder but may consume valuable large blocks. All can suffer external fragmentation.

#### WHY IT EXISTS
A free-memory list contains holes of different sizes. The allocator must choose quickly while preserving useful space for future requests. These policies make different guesses about which leftover holes will be most reusable.

#### MENTAL MODEL
Place a suitcase in storage: first-fit takes the first locker it fits; best-fit chooses the tightest locker; worst-fit chooses the roomiest locker and leaves the largest leftover compartment.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  First = first adequate. Best = smallest adequate. Worst = largest available. These are contiguous variable-partition placement policies.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  With a simple unsorted free list, first-fit may stop early; best/worst typically scan all holes. Split the selected hole and later coalesce adjacent free blocks. Best-fit's smallest remainder is not automatically globally best because tiny fragments may be unusable.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Performance depends on request sequence, data structures, coalescing, and placement order; there is no universally best policy. Next-fit continues from the last search position. Compaction can reduce external fragmentation but is expensive and requires relocatable allocations. Modern allocators often use size classes, buddy systems, slabs, or segregated lists rather than a pure textbook strategy.

#### ALL VARIATIONS COVERED
- **Q100:** First-fit chooses the earliest sufficient hole, best-fit the smallest sufficient, and worst-fit the largest. ⚠️ Best-fit is not guaranteed to minimise long-term fragmentation, and all three can externally fragment memory.

#### CONNECTIONS TO OTHER TOPICS
External fragmentation, coalescing, compaction, next-fit, buddy allocation, free lists, heap allocators, paging, internal fragmentation, and memory locality.

#### CODE / EXAMPLE (if applicable)
```text
chooseHole(request, holes):
    firstFit = first h where h.size >= request
    bestFit  = minimum-size h where h.size >= request
    worstFit = maximum-size h where h.size >= request

split chosen hole; on free, coalesce adjacent holes
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare selection rule, scan cost, and leftover-fragment behavior. Use one free-list example and show which hole each strategy chooses. Avoid declaring best-fit “best” based on its name or confusing these policies with page replacement.

#### ONE-LINE SUMMARY
First-fit prioritises search speed, best-fit minimises the immediate leftover, and worst-fit uses the largest hole—but every policy can create external fragmentation.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q91, Q96, and Q97 (scheduling/concurrency)** connect to Java executors, fork/join, async runtimes, server request pools, backpressure, and starvation.
- **Q92–Q93 (kernel boundary)** prepare file/network APIs, containers, privilege separation, interrupts, and security principles.
- **Q94–Q95 (process lifecycle)** connect to `fork`, process supervision, signals, containers, and server worker management.
- **Q98–Q99 (lazy memory)** reinforce page faults and virtual memory and prepare Java memory, memory-mapped I/O, and process creation internals.
- **Q100 (allocation)** connects to fragmentation, garbage-collected heaps, object allocators, and database/free-page management.

### Be Comfortable With Before Batch 11 (Questions 101–110)

The next batch shifts from OS into DBMS. Review:

- Transactions and the ACID properties.
- Functional dependencies and why normalization prevents anomalies.
- 1NF, 2NF, and 3NF distinctions.
- Primary and foreign keys plus referential integrity.
- INNER, LEFT, and FULL OUTER JOIN semantics.
- Database indexes, selectivity, and write/storage trade-offs.
- Why B+ trees fit disk/page-oriented indexes.
- Transaction lifecycle states and commit/rollback.
- `DELETE` versus `TRUNCATE` versus `DROP`.
- Stored procedures versus SQL functions.

### Batch 10 Rapid Recall

91. Round Robin uses fair quanta; Priority serves importance and risks starvation.
92. System call: validated user-to-kernel service request.
93. Kernel mode is privileged; user mode is restricted and isolated.
94. Zombie: terminated child awaiting parent `wait`.
95. Orphan: living child adopted after its parent exits.
96. Multiprogramming targets utilisation; multitasking targets responsive sharing.
97. Thread pool: reusable bounded workers consuming queued tasks.
98. Demand paging loads a page on first access.
99. Copy-on-write duplicates a shared page only on modification.
100. First-fit = first adequate; best-fit = smallest; worst-fit = largest hole.
