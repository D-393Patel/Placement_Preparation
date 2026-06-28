# JTG Technical Interview Coaching — Batch 12

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 111–120

## Questions in This Batch

111. ⚡⚠️ What is a trigger in SQL?
112. ⚡⚠️ What is a view in SQL?
113. ⚡⚠️ What is the difference between clustered and non-clustered indexes?
114. ⚡ What is a deadlock in DBMS, and how can it be prevented?
115. ⚡ What is database sharding?
116. ⚡⚠️ What is the difference between SQL and NoSQL databases?
117. ⚡⚠️ What is denormalization?
118. ⚠️ What is a cursor in SQL?
119. ⚡ What is a schema?
120. ⚡ What is referential integrity?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Database-side automation and query execution objects | 111, 112, 118 | Triggers automate events, views package queries, and cursors provide procedural row traversal inside the database. |
| B | Physical index organisation | 113 | Clustered/non-clustered describes how index order relates to base-row storage. |
| C | Transaction deadlocks | 114 | This applies OS deadlock reasoning specifically to database locks and victim rollback. |
| D | Data models and horizontal distribution | 115, 116 | Sharding distributes data; SQL/NoSQL model choices affect how distribution, joins, schema, and consistency are handled. |
| E | Schema design, denormalization, and integrity | 117, 119, 120 | A schema defines structure and constraints; referential integrity protects relationships; denormalization intentionally duplicates facts for a workload. |

---

### SQL TRIGGERS, VIEWS, AND CURSORS ⚡⚠️
**Covers questions: 111, 112, 118**

#### CORE CONCEPT (30 seconds)
A trigger is database code that runs automatically when a defined event occurs, such as an insert, update, or delete. A view is a named stored query that presents a virtual table; a normal view stores the query definition, not a separate copy of its result. A cursor exposes query rows one at a time for procedural processing, but set-based SQL is usually clearer and faster.

#### WHY IT EXISTS
Triggers enforce or audit rules close to data regardless of which application writes it. Views provide reusable abstraction, security, and query simplification. Cursors handle cases that genuinely require ordered, stateful, per-row work when one declarative SQL statement cannot express the operation cleanly.

#### MENTAL MODEL
A trigger is a motion sensor that automatically acts on an event. A view is a saved camera angle over underlying tables. A cursor is a reading finger moving through one result row at a time.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Trigger = automatic event-driven database routine. View = virtual table based on a query. Cursor = row-by-row iterator over a result set.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Triggers may be `BEFORE`, `AFTER`, or `INSTEAD OF`, with syntax/availability depending on the DBMS. Views do not normally materialise data and may or may not be updatable. Cursor lifecycle is declare/open, fetch repeatedly, then close/deallocate.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Triggers create hidden side effects, recursion/cascade risks, ordering questions, and bulk-operation performance problems; they run inside the triggering transaction in common systems. Materialized views do store results and need refresh rules. A view is not automatically a security boundary unless privileges and row/column exposure are designed correctly. Cursors can hold locks/resources and cause “row-by-agonizing-row” work; prefer window functions, joins, aggregates, or batch updates first.

#### ALL VARIATIONS COVERED
- **Q111:** A trigger automatically executes database logic for a specified event/timing, useful for auditing or cross-client integrity but risky when behavior becomes hidden or recursive.
- **Q112:** A regular view is a named query exposed like a table; it usually stores no independent rows. ⚠️ Do not confuse it with a materialized view.
- **Q118:** A cursor iterates a result set row by row for procedural logic. ⚠️ Use it only when a set-based statement cannot express the requirement well.

#### CONNECTIONS TO OTHER TOPICS
Stored procedures/functions, materialized views, audit logs, constraints, transactions, row-level security, window functions, set-based SQL, result sets, and query optimisation.

#### CODE / EXAMPLE (if applicable)
```sql
CREATE VIEW active_customer AS
SELECT id, name
FROM customer
WHERE status = 'ACTIVE';

-- Prefer one set operation over a cursor:
UPDATE account
SET fee = fee + 10
WHERE status = 'OVERDUE';
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
For each object, state when it runs, whether it stores data, and its trade-off. Prefer constraints/set SQL over clever trigger/cursor logic unless the requirement justifies it. Avoid claiming every view is updatable or every trigger fires once per statement—row/statement semantics vary.

#### ONE-LINE SUMMARY
Triggers react automatically, views package queries, and cursors iterate rows—but hidden automation and row-by-row work should be used deliberately.

---

### CLUSTERED AND NON-CLUSTERED INDEXES ⚡⚠️
**Covers questions: 113**

#### CORE CONCEPT (30 seconds)
A clustered index determines or closely matches how the table's base rows are physically organised, so a table generally has only one clustering order. A non-clustered index is a separate structure containing keys plus row locators (or clustered keys), so a table can have several. Clustered organisation is strong for ordered/range access; a non-clustered lookup may need an extra base-row lookup unless the index covers the query.

#### WHY IT EXISTS
Queries need different access paths, but rows can have only one primary physical order. Clustering uses that one order for locality, while secondary/non-clustered structures support alternate search keys without duplicating the entire table in each order.

#### MENTAL MODEL
A library's books sit physically in one shelf order—that is clustering. Separate author/topic catalogues point to those shelf locations—that is non-clustered indexing.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Clustered: base-row organisation follows index key; typically one. Non-clustered: separate key-to-row structure; many possible.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Clustered range scans enjoy locality, but inserts into the middle may split pages. Non-clustered indexes add storage/write work and may require bookmark/key lookups. Including selected columns can make a non-clustered index covering.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Terminology is engine-specific. InnoDB clusters rows by primary key; SQL Server exposes clustered/nonclustered indexes explicitly; PostgreSQL's `CLUSTER` rewrites a table once but does not continuously maintain that physical order. Secondary leaves may store a row ID or clustered primary key, affecting key width and lookup cost. Heap-organised tables have no maintained clustered order.

#### ALL VARIATIONS COVERED
- **Q113:** Clustered indexing organises base rows by one key; non-clustered indexing stores a separate search structure and row locator, allowing multiple alternatives. ⚠️ Qualify physical/maintenance details by DBMS.

#### CONNECTIONS TO OTHER TOPICS
B+ trees, primary/secondary indexes, covering indexes, composite keys, page splits, range scans, selectivity, query plans, heaps, and storage-engine internals.

#### CODE / EXAMPLE (if applicable)
```text
Clustered leaf:     key -> full base row (or base-data page)
Non-clustered leaf: alternate key -> row locator / clustered key

Query cost may be:
secondary seek -> locator lookup -> base row
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain the leaf/base-row relationship and why only one maintained physical order is possible. Mention extra lookups and covering. Avoid repeating “clustered is sorted, non-clustered is not”—both index structures can be ordered; the distinction is base-data organisation.

#### ONE-LINE SUMMARY
A clustered index defines the table's one base-row order; non-clustered indexes provide separate alternate-key paths that may require a row lookup.

---

### DATABASE DEADLOCKS ⚡
**Covers questions: 114**

#### CORE CONCEPT (30 seconds)
A DBMS deadlock occurs when transactions form a cycle of lock waits—for example, T1 holds row A and waits for B while T2 holds B and waits for A. Prevent or reduce it with a consistent lock order, short transactions, acquiring required locks predictably, and efficient indexed access. Databases also detect cycles/timeouts and abort a victim transaction to break them.

#### WHY IT EXISTS
Transactions lock shared data for isolation, and concurrent lock acquisition can produce circular waiting. Because some deadlocks are impractical to prevent completely, robust systems combine disciplined transaction design with detection and retry.

#### MENTAL MODEL
Two transactions each hold one key and request the other's key. Neither will release until it finishes, and neither can finish. The database resolves the standoff by forcing one to drop its keys and restart.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Deadlock = circular wait among transactions. Break it by aborting/rolling back one transaction; reduce it with consistent resource order.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  The four Coffman conditions apply: mutual exclusion, hold-and-wait, no preemption, circular wait. A wait-for graph cycle supports detection. Victim choice may consider rollback cost, age, work done, or locks held; applications should retry aborted transactions safely.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Missing indexes can enlarge lock footprints/scans and raise deadlock probability. Lower isolation may reduce some locks but changes correctness guarantees; MVCC reduces read/write blocking but does not remove all write deadlocks. Prevention schemes include wait-die/wound-wait; timeouts detect symptoms but may abort transactions without a true cycle. Deadlock differs from lock timeout and long blocking.

#### ALL VARIATIONS COVERED
- **Q114:** A DBMS deadlock is a cyclic lock dependency; use consistent lock order/short indexed transactions to prevent many cases and cycle detection plus victim rollback/retry to recover.

#### CONNECTIONS TO OTHER TOPICS
ACID isolation, two-phase locking, wait-for graphs, MVCC, transaction retries, idempotency, lock escalation, timeouts, OS deadlocks, and optimistic concurrency.

#### CODE / EXAMPLE (if applicable)
```text
Safe convention for transfers:
    firstId  = min(sourceId, destinationId)
    secondId = max(sourceId, destinationId)
    lock account(firstId)
    lock account(secondId)
    perform transfer
```

Every transaction acquiring account locks in ID order removes that circular-wait pattern.

#### WHAT JTG SPECIFICALLY LOOKS FOR
Draw a two-transaction wait cycle and separate prevention from detection/recovery. Mention rollback and retry, including idempotency. Avoid saying “use transactions” prevents deadlock—transactions and their locks are precisely the context.

#### ONE-LINE SUMMARY
A database deadlock is a cycle of transaction lock waits; consistent ordering reduces it, while detection aborts a victim that must safely retry.

---

### DATABASE SHARDING AND SQL VERSUS NOSQL ⚡⚠️
**Covers questions: 115, 116**

#### CORE CONCEPT (30 seconds)
Sharding horizontally partitions rows across independent database nodes using a shard key, increasing storage and write throughput but complicating routing, joins, transactions, uniqueness, and rebalancing. SQL databases use relational tables, declared schemas, joins, and transactional query semantics. NoSQL is a family—key-value, document, wide-column, graph—often chosen for model flexibility or workload-specific distribution. Neither category universally guarantees or forbids ACID, schemas, or horizontal scale.

#### WHY IT EXISTS
One server eventually hits storage, CPU, or I/O limits. Sharding distributes ownership of data. Data-model choice then determines which operations are natural: relational systems excel at constraints and ad hoc joins; specialised NoSQL models can align access and distribution closely with known query patterns.

#### MENTAL MODEL
A single library catalogue becomes several branches. The shard key decides which branch owns a book. SQL keeps strongly related facts in structured tables and combines them; a document store may keep one application's commonly read facts together in a document.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Sharding = horizontal row partitioning across servers. SQL = relational/table model with SQL and joins. NoSQL = non-relational model families with workload-specific structures and often flexible schemas.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Common sharding strategies are hash, range, and directory-based. A good shard key spreads load and supports common routing; a bad key creates hotspots or scatter-gather queries. Choose SQL for rich relationships/constraints/ad hoc querying and NoSQL when a particular aggregate/access pattern and scale model fit better.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Cross-shard joins/transactions and globally unique constraints require coordination. Rebalancing moves data while serving traffic; consistent hashing or virtual shards can reduce movement. Range shards support locality but risk hot ranges; hash shards distribute well but weaken range routing. Modern SQL systems can shard and NoSQL systems can provide transactions/schema validation—the decision is multidimensional, not a CAP slogan.

#### ALL VARIATIONS COVERED
- **Q115:** Sharding divides rows by a routing key across nodes to scale horizontally, at the cost of cross-shard coordination, hotspots, and rebalancing complexity.
- **Q116:** SQL is a relational model/query ecosystem; NoSQL covers several non-relational models. ⚠️ Avoid “SQL is ACID, NoSQL is not”—capabilities vary by product and configuration.

#### CONNECTIONS TO OTHER TOPICS
Horizontal/vertical scaling, partitioning, replication, consistent hashing, CAP, distributed transactions, data locality, denormalization, document aggregates, and query routing.

#### CODE / EXAMPLE (if applicable)
```text
hash sharding:
    shard = hash(customer_id) mod shardCount

Good when customer-scoped queries dominate.
Cross-customer reports may fan out to every shard.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start from workload and access patterns, then choose a shard key/model. Name operational costs, not just scalability benefits. Present SQL/NoSQL as a trade-off spectrum. Avoid choosing technology from data size alone.

#### ONE-LINE SUMMARY
Sharding spreads rows by a key for horizontal scale, while SQL/NoSQL choices decide which relationships, constraints, and access patterns the system optimises.

---

### SCHEMAS, DENORMALIZATION, AND REFERENTIAL INTEGRITY ⚡⚠️
**Covers questions: 117, 119, 120**

#### CORE CONCEPT (30 seconds)
A database schema defines the logical structure and rules of data: tables, columns, types, keys, constraints, indexes, views, and relationships. Referential integrity ensures a foreign-key value is null when allowed or matches an existing referenced key. Denormalization intentionally duplicates or precomputes data to speed measured reads, accepting extra storage and write-time consistency work.

#### WHY IT EXISTS
Schemas make assumptions executable, so bad data is rejected at the boundary. Referential integrity prevents dangling relationships. Denormalization is used when correct normalized designs require joins/aggregations too costly for a proven read workload—but duplicate facts need a clear source of truth and synchronization mechanism.

#### MENTAL MODEL
The schema is a building blueprint and safety code. Referential integrity ensures every labelled doorway leads to a real room. Denormalization adds duplicate signs for faster navigation, but every sign must be updated when the room name changes.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Schema = structure/constraints. Foreign keys enforce referential integrity. Denormalization adds controlled redundancy for read performance.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Foreign-key actions include `RESTRICT`/`NO ACTION`, `CASCADE`, `SET NULL`, and sometimes `SET DEFAULT`, with engine timing differences. Denormalized columns/materialized aggregates improve reads but require transactions, triggers, application logic, or asynchronous repair to stay consistent.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  “Schema” may also mean a namespace within a database, depending on context/DBMS. A foreign key may reference a candidate/unique key and may be composite. Null foreign keys represent optional relationships but SQL null semantics need care. Denormalize only from profiles/SLAs; document ownership, acceptable staleness, backfill/reconciliation, and failure recovery.

#### ALL VARIATIONS COVERED
- **Q117:** Denormalization deliberately stores redundant/derived data to reduce read joins or computation, trading faster reads for harder writes and consistency. ⚠️ It is an optimisation after measurement, not permission for accidental duplication.
- **Q119:** A schema is the database's logical blueprint—objects, fields, types, keys, constraints, and relationships—and may also be a namespace.
- **Q120:** Referential integrity prevents dangling references by requiring non-null foreign keys to match an existing referenced key and defining update/delete actions.

#### CONNECTIONS TO OTHER TOPICS
Normalization, foreign/primary keys, constraints, cascades, schemas/namespaces, materialized views, event-driven projections, eventual consistency, migrations, and data contracts.

#### CODE / EXAMPLE (if applicable)
```sql
CREATE TABLE orders (
    id          BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total       DECIMAL(12,2) NOT NULL CHECK (total >= 0),
    CONSTRAINT fk_orders_customer
      FOREIGN KEY (customer_id)
      REFERENCES customer(id)
      ON DELETE RESTRICT
);
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Describe constraints as executable design, not documentation. For denormalization, name the exact read saved and consistency plan. For foreign keys, mention delete/update actions and indexing considerations. Avoid saying schemas prevent all invalid business states—cross-row/domain rules may need more.

#### ONE-LINE SUMMARY
The schema declares structure, foreign keys protect relationships, and denormalization duplicates data only when a measured read benefit justifies consistency cost.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q111–Q112 and Q118 (database objects)** connect to stored routines, materialized views, audit systems, row-level security, and query optimisation.
- **Q113 (index organisation)** builds on B+ trees and prepares execution plans, covering indexes, storage engines, and page locality.
- **Q114 (DB deadlock)** reconnects to OS deadlocks and prepares isolation levels, MVCC, optimistic locking, and distributed transaction retries.
- **Q115–Q116 (distribution/models)** prepare replication, CAP, eventual consistency, consistent hashing, distributed transactions, and data lakes/warehouses.
- **Q117, Q119, and Q120 (schema integrity)** connect to normalization, migrations, domain-driven aggregates, event projections, and ORM mapping.

### Be Comfortable With Before Batch 13 (Questions 121–130)

The next batch finishes DBMS and begins networking. Review:

- `WHERE` versus `HAVING` evaluation roles.
- Self-joins and hierarchical relationships.
- `GROUP BY`, aggregates, and grouping rules.
- Correlated versus uncorrelated subqueries.
- Database replication goals and consistency/lag trade-offs.
- The seven OSI layers and TCP/IP mapping.
- TCP versus UDP and connection/reliability differences.
- TCP's three-way handshake and initial sequence numbers.
- IPv4 versus IPv6 address size, notation, and operational differences.

### Batch 12 Rapid Recall

111. Trigger: automatic database code on a defined event.
112. View: named query exposed as a virtual table.
113. Clustered organises base rows; non-clustered is a separate key-to-row path.
114. DB deadlock: cyclic lock waits; prevent by order and recover by victim rollback.
115. Sharding: horizontal row partitioning across nodes by a shard key.
116. SQL is relational; NoSQL is a family of workload-specific non-relational models.
117. Denormalization: intentional redundancy for measured read performance.
118. Cursor: procedural row-by-row result traversal.
119. Schema: database blueprint and, sometimes, object namespace.
120. Referential integrity: foreign keys cannot dangle.
