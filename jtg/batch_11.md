# JTG Technical Interview Coaching — Batch 11

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 101–110

## Questions in This Batch

101. ⚡ What are the ACID properties of a transaction?
102. ⚡ What is normalization, and why is it important?
103. ⚡⚠️ What is the difference between 1NF, 2NF, and 3NF?
104. ⚡ What is a primary key versus a foreign key?
105. ⚡⚠️ What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?
106. ⚡ What is an index in a database, and why does it improve performance?
107. ⚡ What is a B+ tree, and why is it used for indexing?
108. ⚡⚠️ What is a transaction, and what are its states?
109. ⚡⚠️ What is the difference between DELETE, TRUNCATE, and DROP?
110. ⚡⚠️ What is a stored procedure versus a function in SQL?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Transactions, ACID, and lifecycle | 101, 108 | ACID defines transaction guarantees; states describe how a transaction moves toward commit or rollback. |
| B | Relational normalization | 102, 103 | The purpose of normalization is understood through the successive 1NF, 2NF, and 3NF dependency rules. |
| C | Keys and join semantics | 104, 105 | Keys define row identity and relationships; joins use those relationships to combine tables. |
| D | Database indexes and B+ trees | 106, 107 | A B+ tree is the standard ordered structure behind many database indexes. |
| E | Row, table-content, and object removal | 109 | DELETE, TRUNCATE, and DROP act at different scopes and have different semantics. |
| F | Stored database routines | 110 | Procedures and functions differ in invocation, return contract, and permitted usage. |

---

### TRANSACTIONS, ACID, AND TRANSACTION STATES ⚡⚠️
**Covers questions: 101, 108**

#### CORE CONCEPT (30 seconds)
A transaction is one logical unit of database work. ACID means: **Atomicity**—all changes happen or none do; **Consistency**—a successful transaction preserves declared rules/invariants; **Isolation**—concurrent transactions behave according to a defined isolation guarantee, ideally like a valid serial order; **Durability**—committed results survive failures. Typical states are active, partially committed, committed, failed, aborted, and terminated.

#### WHY IT EXISTS
Real operations span multiple statements and run concurrently while machines can fail. Transactions prevent half-completed business operations, constrain concurrency anomalies, and make a clear promise about when data becomes permanent.

#### MENTAL MODEL
A bank transfer is a sealed envelope containing “debit A” and “credit B.” Atomicity seals both together, consistency preserves rules such as valid balances, isolation prevents concurrent envelopes from corrupting one another, and durability means a stamped/committed envelope survives a power cut.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Define all four ACID properties. A transaction begins active, may become partially committed after its final statement, then committed; errors cause failed → aborted/rolled back.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Atomicity/recovery use logs and rollback; durability commonly uses write-ahead logging and persistent flush rules; isolation uses locking or MVCC. Consistency is a joint result of database constraints and correct transaction logic. After abort, a transaction may restart or terminate.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  SQL isolation levels deliberately trade strictness for concurrency and may allow anomalies. “Partially committed” means statements finished but commit is not yet guaranteed durable. ACID consistency is not the same term as distributed-system consistency in CAP. Durability does not necessarily mean every replica has synchronously applied the write unless the system promises that.

#### ALL VARIATIONS COVERED
- **Q101:** ACID is Atomicity, Consistency, Isolation, and Durability; explain each through one multi-step operation rather than four memorised words.
- **Q108:** A transaction is a logical all-or-nothing unit; common states are active, partially committed, committed, failed, aborted, and terminated. ⚠️ Exact state names may vary by textbook/system, but the success and rollback paths remain.

#### CONNECTIONS TO OTHER TOPICS
Isolation levels, dirty/non-repeatable/phantom reads, MVCC, locks, deadlocks, write-ahead logs, checkpoints, commit/rollback, two-phase commit, and CAP consistency.

#### CODE / EXAMPLE (if applicable)
```sql
BEGIN;
UPDATE account SET balance = balance - 500 WHERE id = 1;
UPDATE account SET balance = balance + 500 WHERE id = 2;
COMMIT;
-- On any failure before commit: ROLLBACK both changes.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use one transaction to demonstrate all four properties and state the failure path. Mention that isolation has levels rather than claiming all databases always provide perfect serial execution. Avoid defining consistency as simply “data is correct”; name constraints/invariants and application responsibility.

#### ONE-LINE SUMMARY
A transaction is one logical unit that moves from active to commit or abort, with ACID ensuring all-or-nothing, invariant-preserving, concurrency-safe, durable results.

---

### NORMALIZATION: 1NF, 2NF, AND 3NF ⚡⚠️
**Covers questions: 102, 103**

#### CORE CONCEPT (30 seconds)
Normalization decomposes tables according to dependencies to reduce duplication and insert/update/delete anomalies. 1NF requires one atomic value per cell and no repeating groups. 2NF is 1NF plus no non-key attribute depending on only part of a composite candidate key. 3NF is 2NF plus no non-key attribute depending transitively on a key through another non-key attribute.

#### WHY IT EXISTS
If customer details repeat in every order row, changing an address requires many updates; deleting the last order may accidentally delete the only customer information; creating a customer may require a fake order. Separating facts by what determines them removes these anomalies.

#### MENTAL MODEL
Store each fact on the card belonging to the thing it describes: customer facts on a customer card, product facts on a product card, and order-line facts on a `(order, product)` card. Do not photocopy unrelated facts onto every card.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Normalization reduces redundancy/anomalies. 1NF = atomic cells; 2NF = remove partial dependency; 3NF = remove transitive dependency.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Identify candidate keys and functional dependencies before decomposing. For `(order_id, product_id) → quantity`, product name depends only on `product_id`, so it violates 2NF. If `employee_id → department_id → department_name`, department name is transitively dependent and violates 3NF.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  2NF is automatically satisfied when every candidate key has one attribute; the issue is partial dependence on a proper subset of a composite key. A formal 3NF condition for `X → A` is that `X` is a superkey or `A` is prime. Decomposition should be lossless and preferably dependency-preserving. Denormalization may be justified for measured read performance, but it reintroduces consistency work.

#### ALL VARIATIONS COVERED
- **Q102:** Normalization organises facts by functional dependency to reduce redundancy and update/insert/delete anomalies while improving integrity.
- **Q103:** 1NF removes repeating/non-atomic values; 2NF removes partial dependencies on composite keys; 3NF removes transitive non-key dependencies. ⚠️ Do not discuss 2NF without first identifying candidate keys.

#### CONNECTIONS TO OTHER TOPICS
Functional dependencies, candidate/superkeys, BCNF, lossless decomposition, dependency preservation, referential integrity, denormalization, joins, and update anomalies.

#### CODE / EXAMPLE (if applicable)
```text
Before:
OrderLine(order_id, product_id, product_name, quantity)
Key = (order_id, product_id)
product_id -> product_name          // partial dependency

After:
Product(product_id, product_name)
OrderLine(order_id, product_id, quantity)
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with anomalies, then derive decomposition from keys/dependencies. Use a composite-key example for 2NF and a chained dependency for 3NF. Avoid vague rules such as “1NF means unique rows” without explaining atomic values and relational keys.

#### ONE-LINE SUMMARY
Normalization places each fact with the key that determines it: atomic in 1NF, no partial dependency in 2NF, and no transitive non-key dependency in 3NF.

---

### PRIMARY/FOREIGN KEYS AND SQL JOINS ⚡⚠️
**Covers questions: 104, 105**

#### CORE CONCEPT (30 seconds)
A primary key is the chosen candidate key that uniquely and non-nullably identifies each row. A foreign key is column(s) whose non-null values must reference an existing candidate/primary key in another or the same table, enforcing referential integrity. INNER JOIN returns matching pairs; LEFT JOIN returns every left row plus matching right data or `NULL`; FULL OUTER JOIN returns all rows from both sides, filling the missing side with `NULL`.

#### WHY IT EXISTS
Keys make row identity and cross-table relationships explicit. Joins reconstruct related views without duplicating facts in one giant table. Outer joins preserve unmatched data when absence itself matters.

#### MENTAL MODEL
The primary key is a person's unique ID. A foreign key is an application form containing that ID. INNER JOIN shows only applications with matching people; LEFT JOIN lists every person even without an application; FULL JOIN also includes applications with no matched person where constraints allow such source data.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Primary key: unique + not null, one chosen primary-key constraint per table (possibly composite). Foreign key: references a unique/candidate key and may repeat; nullability depends on schema. Know the three join result sets.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Join behavior depends on the `ON` predicate, not automatically on names. One-to-many relationships duplicate the “one” row in joined output. Foreign-key actions may restrict, cascade, or set null on update/delete. Put a right-table filter in `WHERE` after a LEFT JOIN carefully—it can remove null-extended rows and effectively turn it into an inner join.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A table can have many candidate/unique keys but only one designated primary key; a foreign key can reference an eligible unique key, not necessarily the primary key, depending on DBMS rules. SQL joins are bag/multiset operations, so duplicates multiply. `NULL = NULL` is not true under SQL's three-valued logic. FULL OUTER JOIN support and syntax vary by engine.

#### ALL VARIATIONS COVERED
- **Q104:** A primary key identifies rows and is unique/non-null; a foreign key references a key to enforce relationships and may contain duplicate or permitted null values.
- **Q105:** INNER keeps matches only; LEFT preserves all left rows; FULL preserves all rows from both inputs. ⚠️ Filters placed after an outer join can accidentally discard its unmatched rows.

#### CONNECTIONS TO OTHER TOPICS
Candidate keys, unique constraints, referential integrity, composite keys, normalization, join algorithms, NULL semantics, self-joins, cascades, and indexing foreign keys.

#### CODE / EXAMPLE (if applicable)
```sql
SELECT c.id, c.name, o.id AS order_id
FROM customer AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id;
-- Customers without orders remain, with order_id = NULL.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Draw tiny two-table result sets rather than relying only on prose. Mention composite keys and null behavior. During SQL, explain why each predicate belongs in `ON` or `WHERE`. Avoid saying a foreign key must be unique or that LEFT JOIN always returns exactly the number of left rows—multiple matches can increase it.

#### ONE-LINE SUMMARY
Primary keys identify rows, foreign keys preserve references, and INNER/LEFT/FULL joins differ in which unmatched sides they retain.

---

### DATABASE INDEXES AND B+ TREES ⚡
**Covers questions: 106, 107**

#### CORE CONCEPT (30 seconds)
An index is an auxiliary data structure mapping search key values to row locations, reducing query work from scanning many rows to navigating a smaller structure. A B+ tree is a high-fanout balanced tree whose internal nodes guide searches and whose linked leaves store all keys/row pointers in sorted order, making both point and range queries efficient.

#### WHY IT EXISTS
Tables can be much larger than memory and disk/page access is expensive. B+ trees keep height very small by fitting many child pointers per page, while linked sorted leaves support ordered scans. The cost is extra storage and maintenance on writes.

#### MENTAL MODEL
A book index points from a term to pages instead of making you scan the book. A B+ tree is a library directory: broad internal signposts narrow the shelf, and leaf shelves are linked so a range can continue sequentially.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Indexes speed reads/filtering/joins/order access but consume space and slow insert/update/delete. B+ trees are balanced, high-fanout, and support logarithmic search plus efficient ranges.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Internal B+ nodes contain separator keys and child pointers; data entries live at leaves. Node split/merge/redistribution keeps all leaves at one depth. A composite index follows leftmost-prefix/order rules, and low-selectivity columns may not justify an index by themselves.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Complexity is `O(log_B n)` page levels, with branching factor `B` often large. Covering indexes can answer a query without fetching base rows. Clustered/primary organization affects locality; a secondary leaf may store row IDs or primary keys. Optimizers may prefer a table scan when many rows match because random lookups outweigh index navigation.

#### ALL VARIATIONS COVERED
- **Q106:** An index stores search keys with row locators to avoid full scans, improving suitable reads at the cost of write maintenance and storage.
- **Q107:** A B+ tree uses wide balanced internal navigation and linked sorted leaves, minimising page I/O and supporting point/range queries.

#### CONNECTIONS TO OTHER TOPICS
Clustered/non-clustered indexes, query plans, selectivity, covering/composite indexes, B-trees, hash indexes, page size, range scans, and write amplification.

#### CODE / EXAMPLE (if applicable)
```sql
CREATE INDEX idx_orders_customer_created
    ON orders(customer_id, created_at);

-- Supports customer equality and an ordered/range condition on created_at.
SELECT id
FROM orders
WHERE customer_id = 42
  AND created_at >= DATE '2026-01-01';
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain both read benefit and write/storage cost. Connect B+ tree design to page I/O, fanout, and range scans. Use an actual query and index-column order. Avoid saying every indexed query is `O(log n)` end-to-end when many matching rows still need fetching.

#### ONE-LINE SUMMARY
An index trades storage/write work for faster access, and B+ trees minimise page depth while linked leaves make ordered ranges efficient.

---

### DELETE, TRUNCATE, AND DROP ⚡⚠️
**Covers questions: 109**

#### CORE CONCEPT (30 seconds)
`DELETE` removes selected rows and supports `WHERE`; the table remains. `TRUNCATE` removes all rows as a whole-table operation, normally without `WHERE`, while keeping the table definition. `DROP` removes the database object itself—its definition and data. Locking, logging, identity reset, triggers, and rollback behavior vary by DBMS, especially for `TRUNCATE`.

#### WHY IT EXISTS
Databases need different scopes of removal: individual data cleanup, fast emptying/reuse of a table, and removal of the schema object. Choosing the narrowest correct command protects structure and communicates intent.

#### MENTAL MODEL
`DELETE` erases selected lines from a notebook. `TRUNCATE` clears every page but keeps the notebook. `DROP` throws away the notebook itself.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  DELETE: rows, optional `WHERE`. TRUNCATE: all rows, table remains. DROP: table/object no longer exists.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  DELETE commonly logs row changes and fires row-level delete behavior/triggers depending on engine. TRUNCATE commonly deallocates pages/extents and takes stronger locks, so it is often faster for clearing a table. Foreign-key dependencies can restrict truncate/drop.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  The popular claim “TRUNCATE cannot be rolled back” is not universally true; PostgreSQL and SQL Server can roll it back inside a transaction, while other engines may auto-commit DDL. Identity/sequence reset and trigger behavior are also engine-specific. Privileges differ because whole-object operations are more powerful.

#### ALL VARIATIONS COVERED
- **Q109:** DELETE removes chosen rows, TRUNCATE empties the table but keeps its structure, and DROP removes the object. ⚠️ Qualify rollback/logging/identity claims by DBMS rather than presenting them as universal.

#### CONNECTIONS TO OTHER TOPICS
DDL versus DML, transactions, write-ahead logs, triggers, foreign keys, cascading, locks, privileges, identity/sequence values, and backups.

#### CODE / EXAMPLE (if applicable)
```sql
DELETE FROM audit_log WHERE created_at < DATE '2025-01-01';
TRUNCATE TABLE staging_import;
DROP TABLE obsolete_feature_data;
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare scope first, then performance/transaction details with an explicit “depends on the DBMS.” Mention `WHERE` and whether structure survives. Avoid absolute folklore about rollback or “TRUNCATE is never logged.”

#### ONE-LINE SUMMARY
DELETE removes selected rows, TRUNCATE quickly empties a table, and DROP removes the table itself; transactional details are engine-specific.

---

### STORED PROCEDURES VERSUS FUNCTIONS ⚡⚠️
**Covers questions: 110**

#### CORE CONCEPT (30 seconds)
A stored procedure is invoked as a command to perform a database operation/workflow and may return result sets or output parameters. A function has a declared return value (scalar or table, depending on DBMS) and is commonly usable inside SQL expressions or queries. Exact side-effect, transaction, and invocation rules vary significantly by database engine.

#### WHY IT EXISTS
Stored routines keep reusable data-close logic inside the database, reduce network round trips, centralise permissions, and can expose a stable database API. Functions are designed for composable calculations; procedures are designed for commands and multi-step operations.

#### MENTAL MODEL
A function is a calculator you can use inside a larger formula. A procedure is a service-desk workflow that may update records, perform several steps, and hand back one or more results.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Function returns a value and is often callable in `SELECT`; procedure is called/executed as a statement and can perform broader actions.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Procedures may use input/output parameters, result sets, transaction control, and DML according to engine rules. Functions should behave predictably enough for expression evaluation and may face side-effect restrictions. Both can improve reuse but move logic away from application code.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  SQL dialects differ sharply: PostgreSQL functions/procedures, SQL Server routines, and MySQL rules are not interchangeable. Scalar functions can harm query performance if evaluated row by row unless the optimizer inlines them. Stored logic creates deployment/versioning, portability, testing, and observability trade-offs.

#### ALL VARIATIONS COVERED
- **Q110:** A function returns a composable value/table and is often usable in expressions; a procedure is invoked to execute a broader workflow and may expose result/output channels. ⚠️ State that side-effect and transaction rules are DBMS-specific.

#### CONNECTIONS TO OTHER TOPICS
Triggers, views, user-defined functions, transactions, query optimisation, permissions, database APIs, application/domain logic placement, and SQL dialect portability.

#### CODE / EXAMPLE (if applicable)
```sql
-- Function-style use:
SELECT calculate_tax(amount) FROM invoice;

-- Procedure-style use (syntax varies by DBMS):
CALL close_monthly_accounts(DATE '2026-06-30');
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare invocation, return contract, and intended side effects before discussing syntax. Mention database-specific rules and architecture trade-offs. Avoid asserting that functions can never modify data or procedures can never return values across all SQL engines.

#### ONE-LINE SUMMARY
Functions are return-oriented and composable in queries; procedures are command-oriented workflows, with exact permissions and side effects defined by the DBMS.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q101 and Q108 (transactions)** connect to database deadlocks, MVCC, isolation levels, replication consistency, write-ahead logs, and distributed transactions.
- **Q102–Q103 (normalization)** lead directly to denormalization, schema design, functional dependencies, BCNF, and query/join trade-offs.
- **Q104–Q105 (keys/joins)** prepare referential integrity, self-joins, join algorithms, query plans, and ORM relationship mapping.
- **Q106–Q107 (indexes)** connect to clustered versus non-clustered indexes, composite/covering indexes, schema performance, and storage engines.
- **Q109 (destructive SQL)** connects to triggers, transactions, permissions, cascading foreign keys, and operational safety.
- **Q110 (routines)** prepares triggers, views, functions, database-side business logic, and API/database responsibility boundaries.

### Be Comfortable With Before Batch 12 (Questions 111–120)

- Trigger timing/events and recursion/hidden-side-effect concerns.
- Views as stored queries versus materialized results.
- Clustered versus non-clustered index organisation.
- DBMS deadlock detection, prevention, and victim rollback.
- Horizontal sharding and routing/rebalancing trade-offs.
- SQL versus NoSQL data models and consistency/query differences.
- Why/when denormalization is intentional.
- Cursor row-by-row processing versus set-based SQL.
- Database schema objects and namespaces.
- Referential integrity actions such as restrict, cascade, and set null.

### Batch 11 Rapid Recall

101. ACID: Atomicity, Consistency, Isolation, Durability.
102. Normalization reduces redundancy and data anomalies through dependencies.
103. 1NF atomic; 2NF no partial dependency; 3NF no transitive non-key dependency.
104. Primary key identifies; foreign key references and enforces relationships.
105. INNER matches; LEFT keeps all left; FULL keeps all rows from both sides.
106. Index maps search keys to row locations, trading write/storage cost for faster reads.
107. B+ tree: wide balanced navigation with linked sorted leaves.
108. Transaction states: active → partial commit → commit, or failed → abort.
109. DELETE rows; TRUNCATE contents; DROP object.
110. Function returns composable results; procedure executes a broader workflow.
