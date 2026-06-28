# JTG Technical Interview Coaching — Batch 08

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 71–80

## Questions in This Batch

71. ⚡ What is the purpose of the `super` keyword in OOP?
72. ⚡⚠️ What is an interface default method (Java 8+)?
73. ⚡⚠️ What is the Dependency Inversion Principle?
74. ⚡ What is an abstract method, and when must it be implemented?
75. ⚡⚠️ What is method hiding versus method overriding?
76. ⚡ What is a process, and how does it differ from a thread?
77. ⚡⚠️ What is a deadlock, and what are its four necessary conditions?
78. ⚡ What is the difference between preemptive and non-preemptive scheduling?
79. ⚡⚠️ What is a semaphore, and how does it prevent race conditions?
80. ⚡⚠️ What is a mutex? How does it differ from a semaphore?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Java inheritance contracts and method selection | 71, 72, 74, 75 | These govern access to parent behavior, interface evolution, required implementation, and static versus dynamic binding. |
| B | Dependency Inversion | 73 | This architectural principle explains which direction dependencies should point. |
| C | Processes and threads | 76 | The distinction is primarily isolation versus shared execution context. |
| D | CPU scheduling control | 78 | Preemption determines whether the scheduler may interrupt a running task. |
| E | Synchronization, semaphores, mutexes, and deadlock | 77, 79, 80 | These questions share resource coordination, mutual exclusion, and failure modes. |

---

### JAVA INHERITANCE, DEFAULT METHODS, AND METHOD BINDING ⚡⚠️
**Covers questions: 71, 72, 74, 75**

#### CORE CONCEPT (30 seconds)
`super` refers to the immediate parent portion of the current object and accesses a parent constructor, field, or overridden method. An interface default method supplies inheritable behavior so an interface can evolve without breaking every implementation. An abstract method declares required behavior without an implementation; the first concrete subclass must implement it. Instance methods are overridden and dispatched by runtime object type, while static methods are hidden and selected by compile-time reference/class type.

#### WHY IT EXISTS
Inheritance must support reuse without losing explicit access to the parent implementation. Abstract methods enforce a contract; default methods evolve that contract compatibly. Java separates runtime instance behavior from class-level static behavior, which explains overriding versus hiding.

#### MENTAL MODEL
A child recipe may call the parent's base recipe with `super`, must fill any blank required steps marked abstract, and may inherit a new optional default step. Instance behavior asks the actual cook at runtime; static behavior reads the recipe-book label known at compile time.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `super(...)` calls a parent constructor; `super.method()` invokes parent behavior. Default interface methods use the `default` keyword and have a body. A concrete subclass must implement inherited abstract methods. Static methods hide; instance methods override.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A parent-constructor call must be the first constructor statement; if omitted, Java inserts `super()` when accessible. Default methods were added mainly for interface evolution. If two interfaces contribute the same default, the class must resolve the conflict. Overriding requires a compatible signature and enables dynamic dispatch.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A class method beats an interface default, and a more specific subinterface default beats a less specific one. A conflict can be resolved with `InterfaceName.super.method()`. Abstract methods cannot be `private`, `final`, or `static` because those modifiers prevent required instance overriding. Static selection through an object reference is legal but misleading; use the class name.

#### ALL VARIATIONS COVERED
- **Q71:** Use `super` to call the immediate parent's constructor or explicitly access a hidden field/overridden method; `super(...)` must be the constructor's first statement.
- **Q72:** A Java 8+ default method is an interface instance method with a body, designed to add behavior without forcing all existing implementers to change. ⚠️ Conflicting inherited defaults require explicit resolution.
- **Q74:** An abstract method declares a signature without implementation; the first non-abstract subclass must implement it unless a concrete implementation is inherited.
- **Q75:** Instance overriding uses runtime dispatch; static hiding selects by compile-time type. ⚠️ Static methods are not polymorphically overridden.

#### CONNECTIONS TO OTHER TOPICS
Abstract classes, interfaces, multiple inheritance of type, dynamic dispatch, constructors, `this`, method overloading, polymorphism, template method, and API compatibility.

#### CODE / EXAMPLE (if applicable)
```java
interface Logged {
    default void log() { System.out.println("default"); }
}

abstract class Parent {
    Parent(String name) { }
    abstract void work();
    void describe() { System.out.println("parent"); }
    static void type() { System.out.println("Parent"); }
}

class Child extends Parent implements Logged {
    Child() { super("child"); }
    void work() { }
    void describe() { super.describe(); }
    static void type() { System.out.println("Child"); } // hides
}
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Connect each keyword/rule to dispatch or contract behavior. Use a declared-parent/reference-child example to prove hiding versus overriding. Mention default-method conflict resolution. Avoid saying `super` accesses a separate parent object—the parent state is part of the same current object.

#### ONE-LINE SUMMARY
`super` reaches parent behavior, abstract methods require concrete implementation, defaults evolve interfaces, and only instance overrides—not static hides—use runtime dispatch.

---

### DEPENDENCY INVERSION PRINCIPLE ⚡⚠️
**Covers questions: 73**

#### CORE CONCEPT (30 seconds)
Dependency Inversion says high-level policy should not depend directly on low-level details; both should depend on abstractions, and those abstractions should be shaped by the policy rather than the implementation. This keeps business logic stable when databases, APIs, or frameworks change.

#### WHY IT EXISTS
If core logic directly constructs and calls a concrete database or email client, infrastructure changes ripple into business rules and tests require real external systems. Depending on an interface reverses control: infrastructure plugs into the policy's required contract.

#### MENTAL MODEL
A wall socket defines the contract an appliance needs. The house does not rewire itself for every appliance brand; adapters and devices conform to the stable socket.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Depend on abstractions, not concrete implementations. High-level and low-level modules both point to an interface.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Define a small interface around what the use case needs, inject an implementation, and test with a fake. Constructor injection makes dependencies explicit and prevents partially initialised objects.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Dependency inversion is the design principle; dependency injection is one wiring technique, and an IoC container is optional tooling. Interfaces owned by low-level frameworks may not invert the dependency meaningfully—the abstraction should reflect high-level policy needs. Too many one-use interfaces can add ceremony without reducing volatility.

#### ALL VARIATIONS COVERED
- **Q73:** DIP makes both business policy and infrastructure depend on a policy-oriented abstraction. ⚠️ It is not synonymous with using a DI framework.

#### CONNECTIONS TO OTHER TOPICS
SOLID, dependency injection, inversion of control, interfaces, factories, hexagonal/clean architecture, ports and adapters, mocking, and testability.

#### CODE / EXAMPLE (if applicable)
```java
interface OrderRepository { void save(Order order); }

final class PlaceOrder {
    private final OrderRepository repository;
    PlaceOrder(OrderRepository repository) { this.repository = repository; }
    void execute(Order order) { repository.save(order); }
}

// SQL repository and in-memory test repository both implement the port.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Draw or state the dependency arrows: high-level policy → abstraction ← low-level implementation. Give a testability or replaceability benefit. Distinguish the principle from constructor injection and frameworks; buzzwords without dependency direction are not enough.

#### ONE-LINE SUMMARY
DIP keeps policy independent of infrastructure by making both depend on a small abstraction owned by the policy side.

---

### PROCESSES VERSUS THREADS ⚡
**Covers questions: 76**

#### CORE CONCEPT (30 seconds)
A process is an isolated running program with its own virtual address space and OS-managed resources. A thread is an execution path inside a process: threads share the process's code, heap, and open resources but each has its own stack, registers, and program counter.

#### WHY IT EXISTS
Processes provide fault and security isolation. Threads provide lightweight concurrency and cheap communication inside one application. The trade-off is that shared memory is fast but creates races and synchronization requirements.

#### MENTAL MODEL
A process is a house with its own address and belongings. Threads are people living in that house: they share rooms and appliances but each has a separate train of thought and personal stack of tasks.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Processes have separate address spaces; threads in one process share memory. Each thread has its own stack and CPU execution state.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Process creation/context switching and IPC are generally heavier than thread equivalents. Processes communicate through pipes, sockets, shared-memory mechanisms, etc.; threads can communicate through shared variables but require locks/atomics.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  One crashing process is usually isolated from another, whereas a bad thread can corrupt or terminate its entire process. Threads do not literally share every resource—thread-local storage, stacks, registers, and scheduling state remain private. Kernel implementations and copy-on-write make simplistic “processes are always expensive” claims inaccurate.

#### ALL VARIATIONS COVERED
- **Q76:** A process is the isolated resource/address-space container; a thread is a schedulable execution unit within it that shares process memory but has private execution state.

#### CONNECTIONS TO OTHER TOPICS
Context switching, IPC, virtual memory, thread pools, race conditions, mutexes, semaphores, copy-on-write, user versus kernel threads, and Python multiprocessing/GIL.

#### CODE / EXAMPLE (if applicable)
```text
Process owns/shared by its threads:
  code, heap, global data, open files

Each thread owns:
  stack, registers, program counter, scheduling state
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare isolation, memory, communication, failure impact, and switching cost. Explicitly list shared and private thread state. Avoid the vague answer “threads are smaller processes” without explaining what is shared.

#### ONE-LINE SUMMARY
A process isolates resources and memory; its threads share that process state while keeping separate stacks and CPU execution state.

---

### PREEMPTIVE AND NON-PREEMPTIVE SCHEDULING ⚡
**Covers questions: 78**

#### CORE CONCEPT (30 seconds)
In preemptive scheduling, the OS may interrupt a running task and give the CPU to another, such as when a time slice expires or higher-priority work arrives. In non-preemptive scheduling, a running task keeps the CPU until it finishes, blocks, or voluntarily yields.

#### WHY IT EXISTS
Preemption improves responsiveness and fairness for interactive/multitasking systems. Non-preemptive scheduling reduces switching and synchronization complexity but allows a long-running job to delay everyone else.

#### MENTAL MODEL
Preemptive scheduling is a moderator who enforces timed turns. Non-preemptive scheduling lets each speaker continue until finished or until they voluntarily pause.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Preemptive: scheduler can interrupt. Non-preemptive: task relinquishes CPU itself. Round Robin is preemptive; non-preemptive FCFS is not.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Preemption improves response time but adds context-switch overhead and shared-state races. Non-preemptive execution is simpler and predictable within a CPU burst but can cause convoy effect and poor response time.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Non-preemptive” does not mean a task can never block; I/O/blocking still releases the CPU. Priority scheduling may be either form. Preemption requires timer interrupts and safe kernel transitions; real-time systems care about bounded scheduling latency, not merely average throughput.

#### ALL VARIATIONS COVERED
- **Q78:** Preemptive scheduling can forcibly pause a running task; non-preemptive scheduling waits for completion, blocking, or yield. Compare responsiveness against switching/synchronization overhead.

#### CONNECTIONS TO OTHER TOPICS
Round Robin, FCFS, priority scheduling, context switching, interrupts, starvation, convoy effect, time quantum, real-time scheduling, and critical sections.

#### CODE / EXAMPLE (if applicable)
```text
Preemptive Round Robin:
run task for at most quantum q
if unfinished and runnable:
    save context
    append task to ready queue
schedule next task
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define who controls CPU release, then give one benefit and cost. Use examples but acknowledge that some policies have both variants. Avoid saying non-preemptive scheduling has no context switches—it still switches on block, yield, or completion.

#### ONE-LINE SUMMARY
Preemptive scheduling lets the OS enforce turns for responsiveness; non-preemptive scheduling waits for the running task to release the CPU, trading responsiveness for simplicity.

---

### DEADLOCKS, SEMAPHORES, AND MUTEXES ⚡⚠️
**Covers questions: 77, 79, 80**

#### CORE CONCEPT (30 seconds)
A race occurs when correctness depends on uncontrolled execution timing. A mutex allows one owner into a critical section at a time. A semaphore is a counter of permits managed by atomic `wait` and `signal`; a binary semaphore can guard one permit, while a counting semaphore controls multiple resources. Deadlock is permanent waiting, possible only when mutual exclusion, hold-and-wait, no preemption, and circular wait all hold together.

#### WHY IT EXISTS
Threads share mutable state and finite resources, so they need protocols that prevent conflicting access and coordinate availability. Those protocols can themselves fail: a wrong lock order may prevent progress forever. Knowing the four deadlock conditions shows how to design prevention.

#### MENTAL MODEL
A mutex is one bathroom key with an owner who must return it. A counting semaphore is a car park sign showing available spaces; one participant can signal availability for another. Deadlock is two people each holding one key while waiting forever for the other's key.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Mutex = ownership-based mutual exclusion. Semaphore = permit counter for signalling/resource limits. Deadlock conditions: mutual exclusion, hold and wait, no preemption, circular wait.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Wrap every read–modify–write of a shared invariant in the same lock protocol. `wait` atomically decrements/acquires a permit or blocks; `signal` increments/releases one. Prevent deadlock by breaking a Coffman condition, commonly a global lock order or acquiring all needed resources together.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A semaphore does not automatically prevent races—the initial count and placement of `wait/signal` must match the invariant. A mutex normally has ownership: only the locker unlocks; a semaphore does not require the same actor to signal and is therefore useful for coordination. Deadlock differs from starvation (a task is repeatedly bypassed) and livelock (tasks act but make no progress).

#### ALL VARIATIONS COVERED
- **Q77:** Deadlock is a cycle of permanent resource waiting; all four Coffman conditions—mutual exclusion, hold-and-wait, no preemption, and circular wait—must be present.
- **Q79:** A semaphore uses atomic permit acquisition/release to limit access or coordinate threads; a binary semaphore can protect a critical section. ⚠️ Correct usage prevents a race, not the semaphore's existence alone.
- **Q80:** A mutex is a one-owner mutual-exclusion lock; a semaphore is a non-ownership permit counter that may allow several concurrent users or signal between tasks.

#### CONNECTIONS TO OTHER TOPICS
Critical sections, race conditions, atomic operations, monitors, condition variables, producer–consumer, readers–writers, lock ordering, starvation, livelock, and thread pools.

#### CODE / EXAMPLE (if applicable)
```text
semaphore slots = N

worker:
    wait(slots)        // atomically acquire one permit
    try:
        useResource()
    finally:
        signal(slots)  // release even on failure

Deadlock prevention rule:
    whenever two locks are needed, always acquire A before B.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
List all four deadlock conditions exactly and show how one prevention rule breaks one condition. Compare mutex and semaphore on count, ownership, and purpose. Use a `finally`-style release path. Avoid claiming mutexes eliminate deadlocks or semaphores automatically make code thread-safe.

#### ONE-LINE SUMMARY
Mutexes protect one-owner critical sections, semaphores coordinate permits, and inconsistent resource acquisition can deadlock only when all four Coffman conditions coexist.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q71–Q75 (Java contracts/binding)** connect to Java 8+ interface/abstract-class comparisons, reflection, default methods, and framework proxy behavior.
- **Q73 (DIP)** prepares Spring dependency injection, ports/adapters, test doubles, factories, and clean architecture.
- **Q76 (process/thread)** leads directly to context switching, thread pools, copy-on-write, Java concurrency, and Python threading versus multiprocessing.
- **Q77, Q79, and Q80 (synchronization)** connect to critical sections, race conditions, starvation, monitors, condition variables, `synchronized`, `volatile`, and `ReentrantLock`.
- **Q78 (scheduling)** prepares Round Robin versus priority scheduling, starvation, response time, and real-time scheduling.
- **Q77 (deadlock)** later reappears in DBMS transaction locking as well as operating systems.

### Be Comfortable With Before Batch 09 (Questions 81–90)

- What state a context switch saves and why switching has overhead.
- Virtual versus physical addresses and the role of the MMU/page table.
- Paging versus segmentation.
- Internal versus external fragmentation.
- Page faults, locality, working sets, and thrashing.
- FIFO, LRU, and Optimal page replacement.
- Critical-section requirements: mutual exclusion, progress, and bounded waiting.
- Starvation versus deadlock and how fairness/aging help.

### Batch 08 Rapid Recall

71. `super` accesses the immediate parent's constructor, field, or implementation.
72. Default method: interface method with a body for compatible evolution.
73. DIP: policy and infrastructure both depend on policy-oriented abstractions.
74. A concrete subclass must implement inherited abstract methods.
75. Static methods hide by compile-time type; instance methods override at runtime.
76. Processes isolate memory/resources; threads share process state but own stacks/registers.
77. Deadlock needs mutual exclusion, hold-and-wait, no preemption, and circular wait.
78. Preemptive scheduling can interrupt; non-preemptive waits for release.
79. Semaphore: atomic permit counter used by a correct synchronization protocol.
80. Mutex: one-owner exclusion; semaphore: non-owner permit/signalling mechanism.
