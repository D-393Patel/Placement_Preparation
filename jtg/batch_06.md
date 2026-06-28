# JTG Technical Interview Coaching — Batch 06

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 51–60

## Questions in This Batch

51. ⚡ What are the four pillars of Object-Oriented Programming?
52. ⚡⚠️ What is the difference between method overloading and method overriding?
53. ⚡ What is polymorphism? Give a real-world example.
54. ⚡⚠️ What is the difference between an abstract class and an interface in Java?
55. ⚡ What is encapsulation, and why is it important?
56. ⚡⚠️ What is the difference between shallow copy and deep copy?
57. ⚡⚠️ What is a constructor? Can a constructor be private?
58. ⚡ What is the `this` keyword in OOP?
59. ⚡⚠️ What is multiple inheritance, and why does Java not support it directly?
60. ⚡ What is the difference between composition and inheritance?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | OOP pillars, encapsulation, and polymorphic behavior | 51, 52, 53, 55 | These define the core OOP model and how one interface can produce different behavior. |
| B | Abstract contracts and Java inheritance limits | 54, 59 | Abstract classes, interfaces, and multiple inheritance are alternative ways to share contracts or implementation. |
| C | Object identity, copying, and construction | 56, 57, 58 | These govern how an object is created, referenced, and duplicated. |
| D | Composition versus inheritance | 60 | This is a design decision about reusing behavior through “has-a” or “is-a” relationships. |

---

### OOP PILLARS, ENCAPSULATION, AND POLYMORPHISM ⚡⚠️
**Covers questions: 51, 52, 53, 55**

#### CORE CONCEPT (30 seconds)
The four OOP pillars are encapsulation, abstraction, inheritance, and polymorphism. Encapsulation protects an object's valid state behind controlled operations; abstraction exposes what an object does while hiding unnecessary details; inheritance models a genuine subtype; polymorphism lets the same interface call different implementations. Overloading selects between different parameter lists at compile time, while overriding selects a subclass implementation at runtime.

#### WHY IT EXISTS
Large programs become manageable when data and behavior live together behind stable boundaries. Callers depend on a small contract instead of internal details, and polymorphism lets new implementations join without rewriting the caller. Encapsulation prevents invalid state rather than merely hiding fields.

#### MENTAL MODEL
Think of vehicles:

- **Encapsulation:** speed changes through `accelerate()`, not by directly editing engine state.
- **Abstraction:** a driver uses pedals without knowing combustion details.
- **Inheritance:** a car is a vehicle.
- **Polymorphism:** calling `move()` makes a car drive and a boat sail.

Overloading is choosing among controls labelled by their inputs; overriding is the chosen vehicle responding in its own way.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Name and define all four pillars. Overloading: same method name, different parameter list, compile-time selection. Overriding: subclass supplies the same method signature, runtime dispatch. Encapsulation commonly uses private fields plus public behavior.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Overloading cannot differ by return type alone because the call would be ambiguous. A valid override needs a compatible signature and return type; Java uses dynamic dispatch for instance methods. Encapsulation should expose intention-revealing methods that validate invariants, not automatic getters/setters for everything.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  `static` methods are hidden, not overridden; `final` methods cannot be overridden, and private methods are not inherited for overriding. Overload resolution uses the compile-time argument/reference types, whereas overridden instance behavior uses the runtime object type. Inheritance supports polymorphism only when the subtype obeys the parent's behavioral contract.

#### ALL VARIATIONS COVERED
- **Q51:** The pillars are encapsulation, abstraction, inheritance, and polymorphism; explain each as a design benefit, not just a one-word list.
- **Q52:** Overloading changes parameters and is resolved at compile time; overriding replaces inherited instance behavior and is dispatched at runtime. ⚠️ Return type alone cannot overload a Java method.
- **Q53:** Polymorphism means one contract supports many implementations—for example, `payment.pay()` invokes card, UPI, or wallet behavior without changing checkout code.
- **Q55:** Encapsulation keeps state and behavior together and restricts uncontrolled access so invariants remain valid and implementation can change safely.

#### CONNECTIONS TO OTHER TOPICS
SOLID principles, dynamic dispatch, abstract classes, interfaces, dependency inversion, method hiding, access modifiers, design patterns, testing with substitutes, and API design.

#### CODE / EXAMPLE (if applicable)
```java
interface Payment {
    void pay(int amount);
}

final class CardPayment implements Payment {
    private int limit;                         // encapsulated state

    CardPayment(int limit) { this.limit = limit; }

    @Override
    public void pay(int amount) {              // runtime override
        if (amount <= 0 || amount > limit) throw new IllegalArgumentException();
        System.out.println("Card: " + amount);
    }

    public void pay(int amount, String note) { // compile-time overload
        pay(amount);
    }
}
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Define each pillar in plain language and use one coherent example. For overloading/overriding, state selection time and signature rule, then mention runtime object behavior. Explain encapsulation through a protected invariant. Avoid equating abstraction with hiding data or encapsulation with adding getters and setters.

#### ONE-LINE SUMMARY
OOP protects state and hides detail behind contracts, then uses inheritance and runtime overriding to deliver polymorphic behavior; overloading is a separate compile-time choice between parameter lists.

---

### ABSTRACT CLASSES, INTERFACES, AND MULTIPLE INHERITANCE IN JAVA ⚡⚠️
**Covers questions: 54, 59**

#### CORE CONCEPT (30 seconds)
An abstract class is a partially implemented base class that can hold instance state, constructors, abstract methods, and concrete methods; a Java class can extend only one class. An interface primarily defines a capability contract and supports multiple implementation, though modern Java interfaces can also contain default, static, and private methods. Java avoids multiple class inheritance to prevent ambiguous inherited state and behavior, but allows multiple interfaces.

#### WHY IT EXISTS
Abstract classes share a common foundation among closely related types. Interfaces decouple callers from implementations and let unrelated classes promise the same capability. Java's single class inheritance keeps object state and implementation ancestry unambiguous while interfaces provide flexible multiple contracts.

#### MENTAL MODEL
An abstract class is a partially furnished house plan: descendants inherit rooms and infrastructure. An interface is a building-code certificate: very different buildings can satisfy it. Multiple class inheritance would combine two partially furnished plans and may leave two incompatible answers for the same room.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Abstract class: extend one, may contain instance fields/constructors/concrete behavior. Interface: implement many, represents a contract; fields are implicitly `public static final`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Use an abstract class when related subclasses share state, protected helpers, or constructor logic. Use interfaces for capabilities, loose coupling, and multiple type contracts. Interface methods may include `default` and `static` implementations in Java 8+, and private helpers in Java 9+.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Multiple class inheritance creates diamond ambiguity: two parents may provide the same method or ancestor state. If two interfaces provide conflicting default methods, the implementing class must override and resolve the conflict explicitly. A class method takes precedence over an inherited interface default. Interfaces are not “100% abstraction” in modern Java.

#### ALL VARIATIONS COVERED
- **Q54:** An abstract class shares state and partial implementation through single inheritance; an interface expresses a capability and supports multiple contracts, with limited method implementation in modern Java.
- **Q59:** Multiple inheritance means inheriting implementation from more than one parent class. Java disallows it for classes to avoid diamond/ambiguity problems, but supports multiple interfaces. ⚠️ Saying “Java has no multiple inheritance at all” is incomplete.

#### CONNECTIONS TO OTHER TOPICS
Dependency inversion, default methods, diamond problem, composition, Liskov substitution, strategy pattern, dependency injection, mixins/traits in other languages, and API evolution.

#### CODE / EXAMPLE (if applicable)
```java
abstract class Worker {
    protected final String name;
    Worker(String name) { this.name = name; }
    abstract void work();
    void checkIn() { System.out.println(name); }
}

interface Auditable { void audit(); }
interface Reportable { default void report() { System.out.println("report"); } }

class Developer extends Worker implements Auditable, Reportable {
    Developer(String name) { super(name); }
    void work() { System.out.println("code"); }
    public void audit() { System.out.println("review"); }
}
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare along concrete axes: state, constructors, implementation, inheritance count, and intended relationship. Mention modern Java default methods. For multiple inheritance, explain the ambiguity instead of saying only “Java does not support it.” Avoid choosing an abstract class merely because an interface feels restrictive.

#### ONE-LINE SUMMARY
Use abstract classes for a shared stateful base and interfaces for multiple capability contracts; Java avoids multiple class implementation to remove diamond ambiguity.

---

### OBJECT COPYING, CONSTRUCTORS, AND `this` ⚡⚠️
**Covers questions: 56, 57, 58**

#### CORE CONCEPT (30 seconds)
A shallow copy creates a new outer object but reuses references to nested mutable objects; a deep copy duplicates the relevant nested object graph so later mutation is independent. A constructor establishes a new object's valid initial state and can be private to control creation. `this` refers to the current object and is used to disambiguate fields, call another constructor, or pass/return the current instance.

#### WHY IT EXISTS
Construction is the first chance to enforce invariants. Controlled creation supports factories, singletons, and utility classes. Copy depth determines whether two objects intentionally share mutable state or require isolation. `this` makes the current receiver explicit when names or constructor paths overlap.

#### MENTAL MODEL
A shallow copy of a folder duplicates its cover but leaves both covers pointing to the same documents. A deep copy duplicates the documents too. The constructor assembles the folder correctly; `this` means “this particular folder.”

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Shallow copy shares nested references; deep copy creates independent nested mutable data. Constructors initialise objects and may be private. `this.field` identifies the current object's field.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Private constructors enable static factories, controlled instance counts, and non-instantiable utility classes. In Java, `this(...)` invokes another constructor in the same class and must be the first statement. Immutable nested objects can safely be shared even in an otherwise deep-copy design.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Deep copying an arbitrary graph must handle cycles, repeated references, identity, and external resources; “recursively copy everything” may be incorrect. Constructors are not inherited or overridden, and they have no return type. Private constructors alone do not make a robust singleton under reflection, serialisation, or concurrency; enum singletons are often safer in Java.

#### ALL VARIATIONS COVERED
- **Q56:** Shallow copy duplicates the top-level object but aliases nested references; deep copy duplicates the required mutable graph. ⚠️ The right depth depends on ownership and intended sharing.
- **Q57:** A constructor initialises an object and has the class name with no return type in Java. Yes, it can be private to restrict construction, as in factories, singletons, or utility classes.
- **Q58:** `this` is the current object reference; use it for field/parameter disambiguation, constructor chaining with `this(...)`, or passing/returning the receiver. It is unavailable in a static context.

#### CONNECTIONS TO OTHER TOPICS
Object identity, aliasing, mutability, defensive copying, copy constructors, cloning, immutability, factory and singleton patterns, constructor chaining, garbage collection, and ownership.

#### CODE / EXAMPLE (if applicable)
```java
final class Profile {
    private final List<String> skills;

    private Profile(List<String> skills) {
        this.skills = new ArrayList<>(skills); // defensive/deep-enough copy
    }

    static Profile of(List<String> skills) {
        return new Profile(skills);            // controlled construction
    }

    Profile(Profile other) {
        this(other.skills);                    // constructor chaining
    }
}
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use a nested mutable object to demonstrate aliasing visibly. Explain private-constructor use cases without claiming it automatically guarantees one instance. For `this`, show disambiguation and constructor chaining. Avoid calling any recursive copy “deep” before defining which resources and identities should be duplicated.

#### ONE-LINE SUMMARY
Constructors establish valid objects, `this` identifies the current one, and copy depth decides whether nested mutable state is shared or independent.

---

### COMPOSITION VERSUS INHERITANCE ⚡
**Covers questions: 60**

#### CORE CONCEPT (30 seconds)
Inheritance models an “is-a” subtype and reuses behavior through extension; composition models a “has-a” relationship and reuses behavior by holding and delegating to another object. Prefer composition for flexible behavior reuse, and use inheritance only when the subtype can genuinely replace the parent without breaking its contract.

#### WHY IT EXISTS
Inheritance can tightly couple a subclass to parent internals and create fragile hierarchies. Composition keeps components replaceable and independently testable. Inheritance remains valuable when a stable taxonomy and true substitutability exist.

#### MENTAL MODEL
A car **has an** engine—composition. A car **is a** vehicle—inheritance. Saying a car is an engine immediately reveals the wrong relationship.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Inheritance = “is-a”; composition = “has-a.” Inheritance uses `extends`; composition stores a collaborator field.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Composition supports runtime replacement, smaller interfaces, isolated testing, and lower coupling. Inheritance provides direct polymorphism and shared base behavior but exposes subclasses to parent changes.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The real test for inheritance is substitutability, not code reuse. A subtype that rejects valid parent operations violates Liskov substitution. Composition plus interfaces often provides reuse without a rigid hierarchy, but excessive delegation can add boilerplate and obscure a truly natural subtype.

#### ALL VARIATIONS COVERED
- **Q60:** Inheritance reuses through an “is-a” subtype relationship; composition reuses through a “has-a” collaborator and is usually more flexible. Choose inheritance only when behavioral substitutability holds.

#### CONNECTIONS TO OTHER TOPICS
Liskov substitution, dependency inversion, strategy and decorator patterns, dependency injection, delegation, interface segregation, testing/mocking, and favour-composition design guidance.

#### CODE / EXAMPLE (if applicable)
```java
interface Engine { void start(); }

final class Car {
    private final Engine engine;       // Car has an Engine
    Car(Engine engine) { this.engine = engine; }
    void start() { engine.start(); }   // delegation
}
```

Any engine implementation can be supplied without subclassing `Car`.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use “is-a/has-a” as the start, not the entire answer. Discuss coupling, replacement, and testability, then give the substitutability test for inheritance. Avoid parroting “always prefer composition”; justify the relationship and trade-off.

#### ONE-LINE SUMMARY
Inheritance is for genuine substitutable “is-a” types; composition delegates to replaceable “has-a” collaborators and is usually safer for reuse.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q51–Q53 and Q55 (pillars/polymorphism)** connect directly to compile-time versus runtime polymorphism, method hiding, and every SOLID principle.
- **Q54 and Q59 (interfaces/inheritance)** prepare dependency inversion, interface default methods, abstract methods, and Java 8+ interface questions.
- **Q56 (copying)** connects to Python shallow/deep copy, immutability, serialisation, and defensive-copy API design.
- **Q57 (constructors)** leads to Singleton and Factory patterns and controlled dependency creation.
- **Q58 (`this`)** connects to `super`, constructor chaining, static context, and fluent APIs.
- **Q60 (composition/inheritance)** is the foundation for Liskov substitution, strategy, decorator, dependency injection, aggregation, and composition relationships.

### Be Comfortable With Before Batch 07 (Questions 61–70)

- Static methods and why they belong to a class rather than an instance.
- Single Responsibility, Open/Closed, and Liskov Substitution principles.
- Compile-time overloading versus runtime overriding.
- The three design-pattern families: creational, structural, and behavioral.
- Singleton lifecycle/concurrency concerns.
- Factory-based object creation and Observer notifications.
- Association, aggregation, and composition as relationship strengths.

### Batch 06 Rapid Recall

51. Pillars: encapsulation, abstraction, inheritance, polymorphism.
52. Overloading: compile-time/different parameters; overriding: runtime/same contract.
53. Polymorphism: one interface, multiple runtime implementations.
54. Abstract class shares state/implementation; interface defines multiple capability contracts.
55. Encapsulation protects state and invariants behind controlled behavior.
56. Shallow copy shares nested references; deep copy duplicates required mutable state.
57. Constructor initialises an object and may be private.
58. `this` refers to the current instance.
59. Java avoids multiple class inheritance ambiguity but supports multiple interfaces.
60. Inheritance is “is-a”; composition is “has-a” delegation.
