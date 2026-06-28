# JTG Technical Interview Coaching — Batch 07

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 61–70

## Questions in This Batch

61. ⚡⚠️ What is a static method, and when would you use it?
62. ⚡ What is the Liskov Substitution Principle?
63. ⚡⚠️ What is the Open/Closed Principle?
64. ⚡⚠️ What is the Single Responsibility Principle?
65. ⚡ What is the difference between compile-time and runtime polymorphism?
66. ⚡ What is a design pattern? Name the three categories of design patterns.
67. ⚡⚠️ What is the Singleton design pattern?
68. ⚡ What is the Factory design pattern?
69. ⚡ What is the Observer design pattern?
70. ⚡⚠️ What is the difference between Association, Aggregation, and Composition?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Static behavior and polymorphic binding | 61, 65 | These test whether method selection belongs to the class, compile-time signature, or runtime object. |
| B | SOLID design principles | 62, 63, 64 | LSP, OCP, and SRP work together to create substitutable, extensible, focused code. |
| C | Design-pattern vocabulary and collaboration | 66, 67, 68, 69 | The category question introduces the three specific patterns in the batch. |
| D | Object relationship strength and ownership | 70 | Association, aggregation, and composition differ mainly in ownership and lifecycle. |

---

### STATIC METHODS AND POLYMORPHIC BINDING ⚡⚠️
**Covers questions: 61, 65**

#### CORE CONCEPT (30 seconds)
A static method belongs to the class rather than an object, has no `this`, and is suitable for behavior that does not depend on instance state, such as utility functions or named factories. Compile-time polymorphism usually means overloading: the compiler chooses a signature from declared types. Runtime polymorphism means overriding: dynamic dispatch chooses the implementation from the actual object type.

#### WHY IT EXISTS
Not every operation needs object identity or mutable state, so static methods provide class-level behavior. Polymorphism separates callers from implementations: overloading gives convenient forms of one operation, while overriding lets a stable contract support new runtime behavior.

#### MENTAL MODEL
A static method is a tool hanging on a workshop wall—no particular machine owns it. Overloading is choosing the correct socket size before work starts; overriding is pressing the same “start” button and letting the connected machine decide how it runs.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Call a static method through the class. It cannot directly access instance fields or `this`. Overloading is compile-time polymorphism; overriding is runtime polymorphism.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use static methods for pure utilities, validation, conversion, or static factories when no receiver state is needed. Overload resolution uses method name, parameter types, and compile-time reference types. Overridden instance methods use dynamic dispatch on the runtime object.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Static methods are hidden, not overridden; selecting one through a reference depends on the reference's declared class. Static utility code can become hard to substitute in tests if it hides external dependencies or mutable global state. Return type alone cannot distinguish overloads, and `null` may make overload selection ambiguous.

#### ALL VARIATIONS COVERED
- **Q61:** A static method is class-level behavior with no current instance; use it when the result depends only on arguments/class state, or for a named factory. ⚠️ Do not use static merely to avoid designing object collaboration.
- **Q65:** Compile-time polymorphism selects overloaded signatures during compilation; runtime polymorphism dispatches an overridden instance method according to the actual object.

#### CONNECTIONS TO OTHER TOPICS
Method overloading/overriding, method hiding, `this`, factories, pure functions, dependency injection, testability, dynamic dispatch, and early versus late binding.

#### CODE / EXAMPLE (if applicable)
```java
class Parser {
    static int parse(String text) { return Integer.parseInt(text); }
    static int parse(String text, int radix) { return Integer.parseInt(text, radix); }
}

interface Alert { void send(); }
class EmailAlert implements Alert {
    public void send() { System.out.println("email"); }
}

Alert alert = new EmailAlert();
alert.send(); // runtime dispatch -> EmailAlert.send()
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State what information chooses the method: compile-time argument/reference types versus runtime object type. Give one justified static use case and mention the lack of `this`. Avoid saying static methods are overridden or that every helper should be static.

#### ONE-LINE SUMMARY
Static methods belong to the class; overloads are selected from signatures at compile time, while overridden instance methods are selected from the real object at runtime.

---

### LISKOV, OPEN/CLOSED, AND SINGLE RESPONSIBILITY ⚡⚠️
**Covers questions: 62, 63, 64**

#### CORE CONCEPT (30 seconds)
SRP says a module should have one cohesive responsibility—one reason to change. OCP says stable code should allow new behavior through extension without repeatedly modifying tested core logic. LSP says every subtype must be safely usable wherever its base type is promised, preserving the base behavior contract.

#### WHY IT EXISTS
Software changes continuously. SRP contains each kind of change, OCP creates deliberate extension points, and LSP ensures extensions do not surprise existing callers. Together they reduce ripple effects without pretending change can be eliminated.

#### MENTAL MODEL
Think of electrical appliances:

- **SRP:** a toaster toasts; it does not also manage billing and user accounts.
- **OCP:** any compliant appliance can plug into an unchanged socket.
- **LSP:** every appliance claiming plug compatibility obeys the socket's voltage and safety contract.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  SRP = one reason to change. OCP = open for extension, closed for modification. LSP = subtypes must substitute for their base type without breaking correctness.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  SRP separates unrelated policies, such as invoice calculation, persistence, and emailing. OCP commonly uses interfaces and strategies to add variants. LSP requires preserving expectations: do not strengthen input preconditions, weaken output guarantees, or introduce incompatible side effects/exceptions.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  SRP does not mean “one method per class”; responsibility is defined by the actor/source of change. OCP does not mean source code is never edited—predictable variation should be extendable while unrelated core behavior remains stable. LSP is behavioral, not just type/signature compatibility; inheritance for code reuse can still violate it.

#### ALL VARIATIONS COVERED
- **Q62:** LSP requires a subtype to honour the parent's behavioral contract so callers need no special-case checks or surprises.
- **Q63:** OCP asks us to add expected variants through stable abstractions rather than editing growing conditionals. ⚠️ It does not demand speculative abstraction for every possible future.
- **Q64:** SRP means one cohesive responsibility or reason to change, not literally one function. ⚠️ A “god class” often changes for multiple independent actors.

#### CONNECTIONS TO OTHER TOPICS
Strategy pattern, dependency inversion, interface segregation, composition, inheritance, contract design, preconditions/postconditions, cohesion, coupling, testing, and plugin architectures.

#### CODE / EXAMPLE (if applicable)
```java
interface DiscountPolicy {
    int apply(int subtotal);
}

final class Checkout {
    private final DiscountPolicy policy;
    Checkout(DiscountPolicy policy) { this.policy = policy; }
    int total(int subtotal) { return policy.apply(subtotal); }
}
```

New discount policies extend behavior without changing `Checkout`; each implementation must honour the same input/output contract.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain each principle as a change-management benefit and use one design example across all three. Mention costs: too many tiny abstractions can obscure simple code. Avoid slogan-only answers, especially “one class, one method” for SRP or “never modify code” for OCP.

#### ONE-LINE SUMMARY
SRP isolates reasons to change, OCP provides intentional extension points, and LSP ensures every extension remains behaviorally substitutable.

---

### DESIGN PATTERNS: SINGLETON, FACTORY, AND OBSERVER ⚡⚠️
**Covers questions: 66, 67, 68, 69**

#### CORE CONCEPT (30 seconds)
A design pattern is a reusable design idea for a recurring context, not copy-paste code. The three categories are creational, structural, and behavioral. Singleton controls a type to one accessible instance; Factory centralises which concrete object is created; Observer creates one-to-many notifications so subscribers react when a subject changes.

#### WHY IT EXISTS
Patterns give teams shared names for proven trade-offs. Creational patterns separate object creation, structural patterns compose objects/classes, and behavioral patterns organise communication. Singleton, Factory, and Observer solve lifecycle, creation-choice, and notification problems respectively.

#### MENTAL MODEL
A building has one reception desk (**Singleton**), reception chooses the right specialist for a visitor (**Factory**), and an announcement system informs everyone who subscribed (**Observer**).

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Categories: creational, structural, behavioral. Singleton and Factory are creational; Observer is behavioral.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Singleton hides construction and exposes one instance. Factory returns an abstraction based on input/configuration. Observer stores subscribers and calls them on an event, allowing publisher/subscriber decoupling.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Singleton can become global mutable state, create hidden dependencies, complicate tests, and require thread-safe initialisation; Java enum singletons handle many lifecycle issues. A factory is valuable when creation varies or is complex, not for every `new`. Observer needs unsubscription, failure isolation, ordering/reentrancy decisions, and sometimes weak references to prevent leaks.

#### ALL VARIATIONS COVERED
- **Q66:** A design pattern names a reusable solution structure and trade-offs; categories are creational, structural, and behavioral.
- **Q67:** Singleton restricts construction to one globally reachable instance. ⚠️ Use it only when “exactly one” is a real domain/lifecycle requirement, not as convenient global access.
- **Q68:** Factory moves concrete-type selection and construction behind a method/object that returns a common abstraction.
- **Q69:** Observer lets a subject notify many registered observers when an event/state change occurs, reducing direct coupling.

#### CONNECTIONS TO OTHER TOPICS
Abstract Factory, Factory Method, dependency injection, global state, thread safety, event buses, publish/subscribe, listener lifecycle, strategy, decorator, and test doubles.

#### CODE / EXAMPLE (if applicable)
```java
interface Notifier { void send(String text); }

final class NotifierFactory {
    static Notifier create(String channel) {
        return switch (channel) {
            case "email" -> new EmailNotifier();
            case "sms"   -> new SmsNotifier();
            default      -> throw new IllegalArgumentException(channel);
        };
    }
}

// Observer core:
// subscribe(listener), unsubscribe(listener),
// then listener.onEvent(event) for each current subscriber.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
For each pattern, state the problem, mechanism, and one downside. Distinguish the pattern from one implementation recipe. Use clear naming and explain object flow aloud. Avoid presenting patterns as universal “best practices”; inappropriate patterns add indirection without value.

#### ONE-LINE SUMMARY
Patterns are named design trade-offs: Singleton controls one instance, Factory controls creation choice, and Observer decouples one publisher from many subscribers.

---

### ASSOCIATION, AGGREGATION, AND COMPOSITION ⚡⚠️
**Covers questions: 70**

#### CORE CONCEPT (30 seconds)
Association is any meaningful link between independent objects. Aggregation is a weak whole–part association where parts can exist independently and may be shared. Composition is strong ownership: the whole controls the parts' lifecycle, and a part conceptually does not exist independently of that whole.

#### WHY IT EXISTS
Object models need to communicate not only that objects interact, but who owns what and how lifetimes relate. That decision affects construction, deletion, sharing, persistence, and responsibility boundaries.

#### MENTAL MODEL
A doctor treats a patient (**association**); a team has players who can exist or move to another team (**aggregation**); a house owns rooms that are not independent houses and disappear with that house model (**composition**).

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Association = general relationship. Aggregation = weak “has-a,” independent lifecycle. Composition = strong “part-of,” lifecycle owned by whole.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  In aggregation, collaborators are often injected and may be shared. In composition, the owner commonly creates/encapsulates parts and does not expose independent ownership. UML uses a hollow diamond for aggregation and a filled diamond for composition.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  These are semantic design claims, not automatically enforced by a Java reference field. Garbage collection does not by itself make a relationship composition. Multiplicity, mutability, persistence boundaries, and transfer of ownership should match the stated model; real domains can make the same nouns aggregate in one context and compose in another.

#### ALL VARIATIONS COVERED
- **Q70:** Move from weakest to strongest: association merely connects objects, aggregation models a whole with independently living parts, and composition gives the whole exclusive lifecycle ownership. ⚠️ The distinction is ownership semantics, not syntax.

#### CONNECTIONS TO OTHER TOPICS
Composition over inheritance, dependency injection, ownership, object lifecycle, UML, aggregate roots in DDD, garbage collection, immutability, and persistence cascades.

#### CODE / EXAMPLE (if applicable)
```java
// Aggregation: Team receives an independently existing Player.
team.add(player);

// Composition: Order creates and owns its LineItems.
order.addItem(productId, quantity); // LineItem hidden inside Order
```

The code shape supports the model, but the ownership contract is the real distinction.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare lifecycle and ownership, then give examples that survive scrutiny. Acknowledge that language references do not enforce UML semantics. Avoid defining aggregation as “uses a pointer” and composition as “creates with `new`”; those are implementation hints, not the contract.

#### ONE-LINE SUMMARY
Association links independent objects, aggregation groups independently living parts, and composition gives the whole strong lifecycle ownership of its parts.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q61 and Q65 (binding)** lead directly to interface default methods, abstract methods, and method hiding versus overriding in the next batch.
- **Q62–Q64 (SOLID)** connect to Dependency Inversion, Interface Segregation, composition, dependency injection, refactoring, and testable architecture.
- **Q66–Q69 (patterns)** prepare later Java/Spring questions on dependency injection and Observer/EventListener models, plus system-design event communication.
- **Q67 (Singleton)** reconnects to private constructors and static methods and later raises concurrency, serialisation, and global-state concerns.
- **Q68 (Factory)** connects to abstract classes/interfaces, OCP, dependency inversion, and Spring-managed object creation.
- **Q69 (Observer)** connects to event-driven systems, message queues, callbacks, reactive streams, and backpressure.
- **Q70 (relationships)** deepens Batch 6's composition-versus-inheritance decision and prepares domain modelling.

### Be Comfortable With Before Batch 08 (Questions 71–80)

The next batch finishes OOP and begins operating systems/concurrency. Review:

- `super`, superclass constructors, and overridden parent-method access.
- Java interface default methods and conflict resolution.
- Dependency Inversion and programming to abstractions.
- Abstract-method implementation rules.
- Static method hiding versus instance method overriding.
- Process versus thread memory/resource models.
- Race conditions, critical sections, mutual exclusion, and synchronisation.
- Deadlock's four necessary conditions.
- Preemptive versus non-preemptive scheduling.
- Mutex versus semaphore semantics.

### Batch 07 Rapid Recall

61. Static method: class-level behavior with no `this`.
62. LSP: subtypes must preserve the base behavioral contract.
63. OCP: extend expected variants without repeatedly changing stable core logic.
64. SRP: one cohesive responsibility or reason to change.
65. Compile time = overloading; runtime = overriding/dynamic dispatch.
66. Pattern categories: creational, structural, behavioral.
67. Singleton: one controlled accessible instance—with global-state trade-offs.
68. Factory: centralised creation behind an abstraction.
69. Observer: one publisher notifies many subscribers.
70. Association links; aggregation weakly owns; composition strongly owns lifecycle.
