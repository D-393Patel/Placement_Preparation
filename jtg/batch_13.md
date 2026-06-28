# JTG Technical Interview Coaching — Batch 13

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 121–130

## Questions in This Batch

121. ⚡⚠️ What is the difference between `HAVING` and `WHERE` clauses in SQL?
122. ⚡ What is a self-join, and when is it used?
123. ⚡ What is the purpose of `GROUP BY` in SQL?
124. ⚡⚠️ What is a subquery, and what are the types of subqueries?
125. ⚡⚠️ What is database replication, and why is it used?
126. ⚡ What is the OSI model? Name all seven layers.
127. ⚡⚠️ What is the TCP/IP model, and how does it map to the OSI model?
128. ⚡⚠️ What is the difference between TCP and UDP?
129. ⚡ What is a three-way handshake in TCP?
130. ⚡⚠️ What is an IP address, and what is the difference between IPv4 and IPv6?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | SQL query construction and relational composition | 121, 122, 123, 124 | Filtering, grouping, self-joins, and nested queries are ways to shape one relational result. |
| B | Database replication | 125 | Replication copies the same data for availability, reads, and locality, with consistency trade-offs. |
| C | Network layering models | 126, 127 | OSI is the seven-layer reference model; TCP/IP is the practical stack and can be mapped onto it. |
| D | Transport protocols and TCP connection setup | 128, 129 | TCP/UDP trade guarantees; the handshake establishes TCP's connection state. |
| E | Network-layer addressing | 130 | IPv4 and IPv6 provide routable logical addresses with different sizes and protocol details. |

---

### SQL FILTERING, GROUPING, SELF-JOINS, AND SUBQUERIES ⚡⚠️
**Covers questions: 121, 122, 123, 124**

#### CORE CONCEPT (30 seconds)
`WHERE` filters individual rows before grouping; `GROUP BY` forms groups of equal key values for aggregates; `HAVING` filters the resulting groups. A self-join aliases one table as two logical roles, such as employee and manager. A subquery nests one query inside another and may return a scalar, row, column/set, or table; it may be correlated with the outer query or independent.

#### WHY IT EXISTS
SQL builds results in logical stages. Row filters reduce input early, grouping calculates summaries, and group filters keep only qualifying summaries. Self-joins express relationships within one table. Subqueries let one result become a value, set, existence test, or relation used by another query.

#### MENTAL MODEL
Start with individual exam papers: `WHERE` removes ineligible papers, `GROUP BY` sorts them into class piles, and `HAVING` removes classes whose average is too low. A self-join compares two roles from the same roster. A subquery is a smaller question whose answer feeds the main question.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  `WHERE` filters rows; `HAVING` filters groups/aggregates. `GROUP BY` creates one output group per distinct key combination. Self-join means joining a table to itself with aliases. Subqueries can be scalar, multi-row/set, or table-producing; correlated or uncorrelated.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Useful logical order: `FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`. Non-aggregated selected columns generally must be grouped (subject to DBMS functional-dependency rules). Correlated subqueries refer to outer-row values; optimizers may transform them into joins/semi-joins.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Put non-aggregate predicates in `WHERE` to reduce rows early, though optimizers can push safe predicates. `EXISTS` expresses existence and can short-circuit conceptually; `IN` expresses membership. `NOT IN` with a `NULL` in its subquery can become unknown and return surprising results—`NOT EXISTS` is often safer. A scalar subquery must return at most one row or it errors.

#### ALL VARIATIONS COVERED
- **Q121:** `WHERE` filters source rows before aggregation; `HAVING` filters groups after aggregation. ⚠️ Use `WHERE` for eligible row predicates and `HAVING` for aggregate conditions.
- **Q122:** A self-join aliases the same table into two roles, useful for hierarchies, pair comparisons, or relationships such as employee-to-manager.
- **Q123:** `GROUP BY` partitions rows by key so aggregate functions produce one result per group rather than one for the whole input.
- **Q124:** A subquery is a nested query classified by result shape (scalar/row/set/table) and dependency (correlated/uncorrelated). ⚠️ Watch `NULL` with `NOT IN`.

#### CONNECTIONS TO OTHER TOPICS
Aggregate functions, logical query processing, joins, aliases, CTEs, window functions, `EXISTS`/semi-joins, NULL logic, query plans, and indexing predicates.

#### CODE / EXAMPLE (if applicable)
```sql
SELECT d.name, COUNT(*) AS employee_count
FROM employee AS e
JOIN department AS d ON d.id = e.department_id
WHERE e.status = 'ACTIVE'
GROUP BY d.id, d.name
HAVING COUNT(*) >= 5;

-- Self-join:
SELECT e.name, m.name AS manager
FROM employee e
LEFT JOIN employee m ON m.id = e.manager_id;
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Narrate the logical data flow and test it with a small table. Give aliases meaningful roles in a self-join. For subqueries, classify by correlation and cardinality, then mention a join alternative without claiming one form is always faster—the optimizer and data decide.

#### ONE-LINE SUMMARY
`WHERE` filters rows, `GROUP BY` builds aggregate groups, `HAVING` filters groups, while aliases and subqueries let a query reuse the same or nested relations.

---

### DATABASE REPLICATION ⚡⚠️
**Covers questions: 125**

#### CORE CONCEPT (30 seconds)
Database replication maintains copies of the same data on multiple nodes by sending committed changes from a leader or coordinating among peers. It improves availability, read scaling, disaster recovery options, and geographic locality, but introduces replication lag, failover, conflict, and consistency trade-offs. Replication is not a substitute for backups.

#### WHY IT EXISTS
One database node is a performance and failure bottleneck. Replicas let reads run near users, provide standby copies when a node fails, and reduce recovery time. The system must still decide when a write is acknowledged and how stale/conflicting copies are handled.

#### MENTAL MODEL
Several branch offices maintain copies of the same ledger. Synchronous replication waits for another office to confirm before saying “saved”; asynchronous replication confirms locally and ships updates later, which is faster but may lose recent changes during failure.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Replication copies data across nodes for high availability, read capacity, and recovery. Common topology: leader/primary accepts writes; followers/replicas apply its changes.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Synchronous replication improves durability/consistency but adds write latency and can reduce availability. Asynchronous replication lowers latency and tolerates distant replicas but creates lag and possible acknowledged-write loss on failover. Read replicas do not automatically scale writes.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Other topologies include multi-leader and leaderless/quorum systems, which add conflict/reconciliation complexity. Failover requires leader election, fencing, and prevention of split brain. Read-after-write may require routing to the leader or tracking replication position. Replication copies accidental deletion/corruption too; backups preserve historical recovery points.

#### ALL VARIATIONS COVERED
- **Q125:** Replication keeps redundant data copies for availability, reads, and locality, with synchronous/asynchronous consistency and latency trade-offs. ⚠️ A live replica can copy mistakes, so it is not a historical backup.

#### CONNECTIONS TO OTHER TOPICS
High availability, backups, disaster recovery, synchronous/asynchronous commits, replication lag, leader election, quorums, CAP, consistency models, sharding, and CDC/log shipping.

#### CODE / EXAMPLE (if applicable)
```text
leader commit -> append durable log -> stream log record to followers

synchronous: acknowledge after required replica confirmation
asynchronous: acknowledge locally; followers catch up later
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State the business goal and then the consistency cost. Contrast replication with sharding: replication copies the same data; sharding divides different data. Mention failover and lag. Avoid saying replicas guarantee zero downtime or write scaling.

#### ONE-LINE SUMMARY
Replication copies the same database changes across nodes for availability and reads, trading write latency and consistency against lag and failover complexity.

---

### OSI AND TCP/IP LAYERING MODELS ⚡⚠️
**Covers questions: 126, 127**

#### CORE CONCEPT (30 seconds)
OSI's seven layers bottom-up are Physical, Data Link, Network, Transport, Session, Presentation, and Application. The practical TCP/IP model commonly uses Link, Internet, Transport, and Application: TCP/IP Application combines OSI layers 5–7, Transport maps to 4, Internet to 3, and Link combines 1–2.

#### WHY IT EXISTS
Layering separates responsibilities so technologies can evolve independently and engineers can locate failures. Each layer offers a service upward and uses the layer below, from transmitting bits to delivering application protocols.

#### MENTAL MODEL
Sending a parcel: the application writes the message, presentation formats it, session manages the conversation, transport tracks end-to-end delivery, network chooses routes, data link moves across one local hop, and physical carries signals.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  OSI 7→1: Application, Presentation, Session, Transport, Network, Data Link, Physical. TCP/IP 4-layer: Application, Transport, Internet, Link/Network Access.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Examples: HTTP/DNS at application; TCP/UDP at transport; IP/ICMP at internet/network; Ethernet/Wi-Fi at link; electrical/radio/optical signalling at physical. Encapsulation adds headers as data moves downward and removes them upward.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  OSI is a conceptual reference, not a perfect description of every real protocol. Some TCP/IP presentations use five layers by separating Physical from Data Link. TLS is often placed between application and transport or associated with presentation-like functions; real boundaries can blur. Devices/functions can span layers, so use the model diagnostically rather than dogmatically.

#### ALL VARIATIONS COVERED
- **Q126:** Name all seven OSI layers in order and attach one responsibility/example to each.
- **Q127:** TCP/IP collapses OSI Session/Presentation/Application into Application and Physical/Data Link into Link; Transport and Network/Internet correspond directly. ⚠️ Four- and five-layer TCP/IP teaching variants both exist.

#### CONNECTIONS TO OTHER TOPICS
Encapsulation, frames/packets/segments, Ethernet, IP, TCP/UDP, DNS, HTTP, TLS, switches/routers, ports, and layered troubleshooting.

#### CODE / EXAMPLE (if applicable)
```text
OSI                         TCP/IP
7 Application   ┐
6 Presentation  ├────────>  Application
5 Session       ┘
4 Transport     ─────────>  Transport
3 Network       ─────────>  Internet
2 Data Link     ┐
1 Physical      ┴────────>  Link / Network Access
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Recite in order, then prove understanding with examples and encapsulation. Explain that the mapping is approximate. Avoid assigning switches/routers as rigid one-layer-only objects without acknowledging real multifunction devices.

#### ONE-LINE SUMMARY
OSI separates networking into seven conceptual layers; TCP/IP implements the practical stack by combining them into Application, Transport, Internet, and Link.

---

### TCP, UDP, AND THE THREE-WAY HANDSHAKE ⚡⚠️
**Covers questions: 128, 129**

#### CORE CONCEPT (30 seconds)
TCP is connection-oriented and provides a reliable, ordered byte stream using sequence numbers, acknowledgements, retransmission, flow control, and congestion control. UDP sends independent datagrams with minimal protocol state and no built-in guarantee of delivery, ordering, or duplicate suppression. TCP establishes bidirectional sequence state with `SYN → SYN-ACK → ACK`.

#### WHY IT EXISTS
Applications need different trade-offs. File transfer and web connections need ordered reliable bytes; real-time media, DNS, gaming, or custom protocols may prefer low-latency datagrams and handle loss themselves. The TCP handshake confirms both endpoints can communicate and synchronises initial sequence numbers/options before normal data transfer.

#### MENTAL MODEL
TCP is a tracked phone conversation: both parties connect, maintain order, acknowledge missing pieces, and manage pace. UDP is sending postcards: each message is independent and may be lost/reordered. The TCP handshake is “Can you hear me? / Yes, can you hear me? / Yes.”

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  TCP: reliable, ordered, connection-oriented byte stream. UDP: connectionless, best-effort datagrams with lower header/state overhead. Handshake: client SYN, server SYN-ACK, client ACK.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  TCP preserves no application message boundaries; applications frame messages. UDP preserves datagram boundaries and has checksums but no recovery policy. Handshake packets carry initial sequence numbers: `SYN(x)`, `SYN(y), ACK(x+1)`, `ACK(y+1)`.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  TCP reliability does not provide encryption/authentication—TLS does. UDP is not inherently always faster; application-level reliability can recreate complexity, while modern QUIC supplies secure reliable streams over UDP. TCP's handshake negotiates options and resists stale duplicate connections, but consumes state and is exposed to SYN-flood attacks mitigated by SYN cookies/backlogs.

#### ALL VARIATIONS COVERED
- **Q128:** Choose TCP for an ordered reliable byte stream and UDP for independent low-overhead datagrams where the application tolerates/handles loss and ordering. ⚠️ TCP is not secure by itself, and UDP is not automatically faster end-to-end.
- **Q129:** TCP uses SYN, SYN-ACK, ACK to verify two-way reachability and synchronise sequence numbers/options before the connection is established.

#### CONNECTIONS TO OTHER TOPICS
Ports/sockets, flow and congestion control, retransmission, checksums, TLS, HTTP/2, QUIC/HTTP/3, DNS, streaming, sequence numbers, and SYN floods.

#### CODE / EXAMPLE (if applicable)
```text
Client                                  Server
  | ---- SYN, seq=x --------------------> |
  | <--- SYN+ACK, seq=y, ack=x+1 -------- |
  | ---- ACK, ack=y+1 ------------------> |
  |          ESTABLISHED                  |
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare guarantees, data model, and use cases—not only speed. Explain what each handshake message proves. Mention TCP's byte stream and UDP's datagram boundaries. Avoid claiming UDP has no checksum or TCP guarantees application-level success after acknowledgement.

#### ONE-LINE SUMMARY
TCP handshakes into a reliable ordered byte stream; UDP sends best-effort independent datagrams with less built-in state and control.

---

### IP ADDRESSING: IPv4 VERSUS IPv6 ⚡⚠️
**Covers questions: 130**

#### CORE CONCEPT (30 seconds)
An IP address is a logical network-layer address assigned to an interface so packets can be routed across networks. IPv4 uses 32-bit addresses written in dotted decimal; IPv6 uses 128-bit addresses written in colon-separated hexadecimal, providing a vastly larger space plus redesigned addressing/header behavior.

#### WHY IT EXISTS
Link-layer addresses work only on local networks; IP creates hierarchical, routable addressing across interconnected networks. IPv6 addresses IPv4 exhaustion and simplifies/extensifies parts of packet processing and autoconfiguration without changing IP's best-effort nature.

#### MENTAL MODEL
A MAC address is like a person's identity inside one building; an IP address is the routable postal address used across cities. IPv6 expands the address format from a small crowded city map to a vast address space.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  IPv4 = 32 bits, e.g. `192.0.2.10`. IPv6 = 128 bits, e.g. `2001:db8::10`. Both identify interfaces/prefix locations for routing.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  IPv4 has about `2^32` addresses and commonly relies on NAT due to scarcity. IPv6 has `2^128`, supports compact zero notation, no broadcast (uses multicast/anycast), and uses Neighbor Discovery rather than ARP. Prefix length identifies network/subnet bits.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  An IP address identifies an interface/location at a point in time, not permanently a person/device; DHCP, mobility, NAT, and multiple interfaces change that. IPv6's base header is fixed/simplified with extension headers, but operational transition uses dual stack/tunnelling/translation. IPv6 is not automatically secure or faster, and IPv4/IPv6 can both use IPsec.

#### ALL VARIATIONS COVERED
- **Q130:** IP addresses provide logical routable interface addresses; IPv4 is 32-bit dotted decimal, while IPv6 is 128-bit hexadecimal with a huge space and protocol changes such as no broadcast. ⚠️ IPv6 does not automatically provide security.

#### CONNECTIONS TO OTHER TOPICS
Subnets/CIDR, routing tables, NAT, DHCP, ARP/Neighbor Discovery, MAC addresses, ICMP, private/public addresses, loopback, dual stack, and firewalls.

#### CODE / EXAMPLE (if applicable)
```text
IPv4: 192.0.2.10/24
      first 24 bits = network prefix

IPv6: 2001:db8:0:0:0:0:0:10/64
      compressed as 2001:db8::10/64
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
State layer, bit width, notation, and routing purpose before extra differences. Explain prefix/interface rather than “device ID.” Mention address exhaustion and transition without claiming NAT is security. Avoid memorising only `32 versus 128`.

#### ONE-LINE SUMMARY
IP gives interfaces routable logical addresses: IPv4 uses scarce 32-bit addresses, while IPv6 expands to 128 bits and modernises addressing behavior.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q121–Q124 (SQL)** connect to query plans, indexes, window functions, correlated-query optimisation, analytics, and ORM-generated SQL.
- **Q125 (replication)** prepares distributed-system consistency, read replicas, WAL/log shipping, leader election, CAP, and geo-distributed databases.
- **Q126–Q127 (layers)** provide the map for every later networking question: DNS/HTTP at application, TCP/UDP at transport, IP/ICMP at network, Ethernet/ARP at link.
- **Q128–Q129 (transport)** connect to sockets, flow control, TLS, HTTP versions, WebSockets, gRPC, and QUIC.
- **Q130 (IP)** prepares subnetting/CIDR, NAT, DHCP, ARP/Neighbor Discovery, routing, and firewall rules.

### Be Comfortable With Before Batch 14 (Questions 131–140)

- Binary subnet masks and CIDR prefix lengths.
- Public/private addressing and NAT/PAT translation.
- Recursive DNS resolution and caching.
- HTTP versus HTTPS, TLS, and default ports.
- Stateful versus stateless firewall filtering.
- Hub, switch, and router forwarding domains.
- ARP's local IPv4 address-to-MAC resolution.
- GET versus POST semantics, safety, and idempotency.
- Cookies versus server-side sessions.
- REST constraints and resource-oriented APIs.

### Batch 13 Rapid Recall

121. `WHERE` filters rows; `HAVING` filters groups after aggregation.
122. Self-join aliases one table into multiple roles.
123. `GROUP BY` creates one aggregate result per key group.
124. Subqueries vary by result cardinality and correlation.
125. Replication copies the same data for availability, reads, and locality.
126. OSI: Physical, Data Link, Network, Transport, Session, Presentation, Application.
127. TCP/IP: Link, Internet, Transport, Application.
128. TCP = reliable ordered byte stream; UDP = best-effort datagrams.
129. TCP handshake: SYN, SYN-ACK, ACK.
130. IPv4 is 32-bit; IPv6 is 128-bit routable addressing.
