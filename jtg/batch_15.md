# JTG Technical Interview Coaching — Batch 15

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 141–150

## Questions in This Batch

141. ⚡⚠️ What are latency and bandwidth?
142. ⚡⚠️ What is a VPN?
143. ⚡⚠️ What is a MAC address?
144. ⚡ What are ICMP and `ping`?
145. What is the difference between half-duplex and full-duplex communication?
146. ⚡ What is a CDN, and how does it reduce latency?
147. ⚡ What is the difference between circuit switching and packet switching?
148. ⚡ What is the role of the transport layer in the OSI model?
149. ⚡⚠️ What is flow control in TCP?
150. ⚡ What is DHCP, and what role does it play in networking?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | Network performance and edge delivery | 141, 146 | Latency/bandwidth define performance; CDNs reduce distance and origin work to improve delivery. |
| B | Secure network tunnelling | 142 | A VPN creates an authenticated encrypted logical network across another network. |
| C | Host identity, control messages, and configuration | 143, 144, 150 | MAC, ICMP, and DHCP provide local delivery identity, network diagnostics/control, and automatic host configuration. |
| D | Link directionality and switching models | 145, 147 | Duplex describes simultaneous direction use; switching describes how communication capacity is reserved/shared. |
| E | End-to-end transport and TCP flow control | 148, 149 | The transport layer connects application processes; TCP flow control protects the receiving endpoint. |

---

### LATENCY, BANDWIDTH, AND CDNS ⚡⚠️
**Covers questions: 141, 146**

#### CORE CONCEPT (30 seconds)
Latency is the delay before data reaches its destination, usually measured in milliseconds; bandwidth is the maximum data-transfer capacity of a path, measured in bits per second. Actual throughput is achieved rate, often below bandwidth. A CDN caches and serves content from edge locations near users, reducing round-trip distance, origin processing, and backbone congestion.

#### WHY IT EXISTS
Applications can be slow because each request waits too long, because too little data can move per second, or both. CDNs target repeated long-distance work by moving cacheable content, TLS termination, and sometimes computation closer to users.

#### MENTAL MODEL
Latency is how long the first delivery truck takes to arrive; bandwidth is how many trucks the highway can carry at once. A CDN places a warehouse in the user's city, shortening the journey and reducing traffic to the central warehouse.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Latency = time delay; bandwidth = capacity; throughput = achieved transfer rate. A CDN uses geographically distributed edge servers to cache content near users.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Latency includes propagation, transmission, queueing, processing, DNS, and handshake delays. A CDN routes users to an edge, serves cache hits locally, and fetches misses from the origin. TTLs, cache keys, invalidation, and `Cache-Control` determine freshness.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A high-bandwidth path can still feel slow for many sequential small requests if RTT is high. Bandwidth-delay product estimates data needed in flight to utilise a path. CDNs do not help every dynamic/personalised request equally; bad cache keys can leak private content or destroy hit rate. Edge TLS, compression, HTTP multiplexing, request collapsing, and origin shielding can improve more than distance alone.

#### ALL VARIATIONS COVERED
- **Q141:** Latency measures delay and bandwidth measures capacity; achieved throughput depends on protocol overhead, congestion, loss, and endpoint limits. ⚠️ More bandwidth does not automatically lower latency.
- **Q146:** A CDN places cached content/services at nearby edges, reducing RTT and origin load; misses still contact the origin and freshness needs explicit policy.

#### CONNECTIONS TO OTHER TOPICS
Throughput, RTT, bandwidth-delay product, TCP congestion windows, caching, DNS/anycast, HTTP cache headers, edge computing, load balancing, compression, and origin shielding.

#### CODE / EXAMPLE (if applicable)
```text
Page has 20 sequential requests; RTT to origin = 150 ms.
Even tiny responses can wait on repeated round trips.

Nearby CDN edge RTT = 20 ms:
cache hit -> edge responds locally
cache miss -> edge fetches origin, caches per policy
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use units and distinguish bandwidth from throughput. Give one high-bandwidth/high-latency example. For CDN, explain hit/miss and invalidation, not simply “it has many servers.” Avoid promising that a CDN fixes slow database/application logic.

#### ONE-LINE SUMMARY
Latency is wait time, bandwidth is path capacity, and a CDN reduces repeated long-distance delay by serving cached content from nearby edges.

---

### VIRTUAL PRIVATE NETWORKS ⚡⚠️
**Covers questions: 142**

#### CORE CONCEPT (30 seconds)
A VPN creates an authenticated encrypted tunnel over another network, encapsulating traffic between endpoints so users or sites can securely reach a private network or route traffic through a VPN gateway.

#### WHY IT EXISTS
Remote users and separate offices need private communication across untrusted networks such as the internet. A VPN provides confidentiality/integrity in transit and logical network connectivity without leasing a dedicated physical circuit.

#### MENTAL MODEL
A VPN is a locked, tamper-evident pipe carried through a public delivery system. Outsiders can see that a pipe exists and its endpoints/traffic patterns, but cannot normally read protected contents.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  VPN = encrypted authenticated tunnel. Common uses: remote access and site-to-site connectivity.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  The client encapsulates and encrypts selected packets; the VPN gateway decrypts and forwards them toward the private network/internet. Full tunnel routes most traffic through the VPN; split tunnel routes only selected destinations. Common technologies include IPsec and WireGuard; TLS-based VPNs also exist.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  A VPN protects traffic only between tunnel endpoints; plaintext may continue beyond the gateway unless application encryption such as HTTPS is used. It does not guarantee anonymity, endpoint safety, or trustworthy applications. DNS/route leaks, insecure endpoints, key management, MTU overhead, split-tunnel policy, and gateway trust/availability matter.

#### ALL VARIATIONS COVERED
- **Q142:** A VPN authenticates endpoints and encrypts encapsulated traffic through a logical tunnel for remote/site connectivity. ⚠️ It changes the trust path; it does not make a compromised device safe or a user anonymous.

#### CONNECTIONS TO OTHER TOPICS
Encryption, authentication, IPsec, TLS, tunnelling, routing tables, NAT traversal, firewalls, zero trust, remote access, DNS leaks, and MTU/fragmentation.

#### CODE / EXAMPLE (if applicable)
```text
inner packet: laptop-private-IP -> company-server
VPN client encrypts + encapsulates it in:
outer packet: laptop-public-path -> VPN gateway
gateway decrypts -> routes inner packet privately
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name encryption, authentication, encapsulation, and routing. Distinguish remote-access from site-to-site and full from split tunnel. Avoid claiming a VPN is “private internet” or a complete security solution.

#### ONE-LINE SUMMARY
A VPN securely encapsulates traffic between authenticated tunnel endpoints, extending private connectivity across an untrusted network.

---

### MAC ADDRESSES, ICMP/PING, AND DHCP ⚡⚠️
**Covers questions: 143, 144, 150**

#### CORE CONCEPT (30 seconds)
A MAC address is a link-layer identifier used to deliver frames on a local network segment; it is commonly 48 bits and is not internet-routable. ICMP carries IP-layer control/error information; `ping` sends ICMP Echo Requests and measures Echo Replies. DHCP automatically leases IP configuration—address, subnet, gateway, DNS—commonly through Discover, Offer, Request, Acknowledge (DORA).

#### WHY IT EXISTS
Hosts need three different capabilities: local frame delivery, network error/diagnostic feedback, and automatic configuration. MAC addresses identify next-hop interfaces locally, ICMP reports network conditions, and DHCP prevents manual configuration for every device.

#### MENTAL MODEL
DHCP gives a newcomer a temporary office number and directory details. The MAC address is the local desk badge used inside that office. `ping` calls the office and times whether an echo returns; ICMP also carries notices such as “destination unreachable.”

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  MAC = Layer-2 local identifier, typically hexadecimal 48-bit. ICMP = network control/error protocol; ping uses Echo Request/Reply. DHCP assigns configuration dynamically using DORA.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Switches learn MAC-to-port mappings; ARP resolves IPv4 next-hop IP to MAC. Ping reports round-trip time and loss, but filtering can block replies. DHCP client/server use UDP ports 68/67; initial discovery is broadcast because the client lacks an address. A relay forwards DHCP across subnets.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  MAC addresses may be locally administered/randomised/spoofed and change at each routed hop, so they are not reliable permanent identity. ICMP is essential for errors and path MTU discovery; blindly blocking all ICMP can break networking. A failed ping does not prove a host is down. DHCP leases expire/renew and rogue servers can misconfigure clients; DHCP does not itself authenticate normal assignments.

#### ALL VARIATIONS COVERED
- **Q143:** A MAC address identifies a local link interface for frame delivery; it is usually 48-bit, not routed end-to-end, and can be changed/spoofed. ⚠️ It is not a globally reliable device identity.
- **Q144:** ICMP carries IP control/error messages; `ping` uses Echo Request/Reply to estimate reachability, RTT, and loss, but blocked ICMP makes conclusions incomplete.
- **Q150:** DHCP leases address, mask/prefix, gateway, DNS, and related settings, commonly via DORA over UDP 67/68.

#### CONNECTIONS TO OTHER TOPICS
Ethernet, switches, ARP, IP addressing, default gateways, traceroute, path MTU discovery, DHCP relay, leases, DNS configuration, spoofing, and network access control.

#### CODE / EXAMPLE (if applicable)
```text
DHCP DORA:
Client -- Discover (broadcast) --> servers
Client <-- Offer ---------------- server
Client -- Request --------------> chosen server/broadcast
Client <-- Acknowledge ---------- server

Then ARP resolves the local gateway MAC before off-subnet traffic.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Place each protocol at the correct layer and tell a host-boot story. Explain what ping can and cannot prove. Avoid saying MAC crosses routers, ICMP is only ping, or DHCP permanently assigns every address.

#### ONE-LINE SUMMARY
DHCP configures the host, MAC delivers frames on the local link, and ICMP/ping reports network-layer reachability and errors.

---

### HALF/FULL DUPLEX AND CIRCUIT/PACKET SWITCHING ⚡
**Covers questions: 145, 147**

#### CORE CONCEPT (30 seconds)
Half-duplex communication can send in both directions but only one direction at a time; full-duplex sends and receives simultaneously. Circuit switching reserves a dedicated end-to-end path/resources for a session, giving predictable capacity after setup. Packet switching divides data into packets that statistically share links, using capacity efficiently but introducing variable delay, queueing, loss, and reordering.

#### WHY IT EXISTS
Duplex mode determines whether a medium can carry simultaneous conversations. Switching mode determines whether capacity is reserved or shared. Dedicated circuits fit steady predictable traffic; packet sharing fits bursty computer communication and resilient routing.

#### MENTAL MODEL
Half-duplex is a walkie-talkie: one person speaks at a time. Full-duplex is a phone call: both can talk. Circuit switching reserves a railway track for one train; packet switching lets labelled parcels share changing routes with other traffic.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Half-duplex = bidirectional, not simultaneous. Full-duplex = simultaneous both ways. Circuit = reserved path; packet = shared per-packet forwarding.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Half-duplex shared Ethernet historically used collision detection; modern switched Ethernet is normally full-duplex with separate send/receive paths. Circuit setup adds delay and reserved capacity may sit idle. Packet switching uses statistical multiplexing and can reroute, but needs buffering/control under congestion.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Full-duplex does not necessarily mean equal bandwidth in both directions. Packet networks can provide virtual circuits/QoS but still share underlying resources. “Packets take different paths” is possible, not required. Circuit versus packet is about resource allocation/forwarding model, while duplex is an independent link-direction property.

#### ALL VARIATIONS COVERED
- **Q145:** Half-duplex alternates direction; full-duplex supports simultaneous transmit/receive, improving utilisation and avoiding shared-medium collisions.
- **Q147:** Circuit switching reserves resources and gives predictability; packet switching shares links efficiently for bursts but produces variable delay/loss under load.

#### CONNECTIONS TO OTHER TOPICS
Ethernet switching, collision domains, Wi-Fi medium access, statistical multiplexing, QoS, congestion, jitter, telephone networks, MPLS/virtual circuits, and streaming.

#### CODE / EXAMPLE (if applicable)
```text
Half-duplex timeline: A ---> B | B ---> A
Full-duplex timeline: A ---> B
                      A <--- B   (simultaneous)

Circuit: reserve capacity first, then send.
Packet: enqueue/forward each packet over shared links.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Compare each pair along simultaneity or reservation, then give one benefit/cost. Keep the two axes separate. Avoid saying packet switching guarantees each packet follows a different route or circuit switching has no delay.

#### ONE-LINE SUMMARY
Duplex controls simultaneous direction; switching controls whether end-to-end capacity is reserved or statistically shared packet by packet.

---

### THE TRANSPORT LAYER AND TCP FLOW CONTROL ⚡⚠️
**Covers questions: 148, 149**

#### CORE CONCEPT (30 seconds)
The transport layer provides end-to-end communication between application processes using ports, multiplexing/demultiplexing, segmentation/reassembly, and—in protocols such as TCP—reliability, ordering, flow control, and congestion control. TCP flow control prevents a fast sender from overwhelming a receiver by limiting unacknowledged data to the receiver-advertised window.

#### WHY IT EXISTS
IP delivers packets between hosts, but applications need data delivered to the correct process with appropriate guarantees. Receivers also have finite buffers and processing rates, so flow control communicates how much data they can currently accept.

#### MENTAL MODEL
IP delivers mail to a building; transport ports deliver it to the correct apartment. TCP's receive window is the apartment's sign saying how many boxes can fit before the sender must wait.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Transport = process-to-process delivery using ports. TCP supplies reliable ordered stream behavior; UDP supplies datagrams. Flow control protects the receiver using a sliding/advertised receive window.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  The receiver advertises `rwnd` based on free buffer space; the sender limits bytes in flight accordingly. ACKs advance the window. If `rwnd` becomes zero, the sender pauses normal transmission and uses probes/persist behavior to learn when the window reopens.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Flow control is receiver protection; congestion control protects the network. Actual TCP sending is constrained by roughly `min(rwnd, cwnd)`, where `cwnd` is the congestion window. Window scaling permits receive windows beyond the original 16-bit field. Head-of-line blocking and application read speed can limit throughput even on a high-bandwidth link.

#### ALL VARIATIONS COVERED
- **Q148:** The transport layer multiplexes application processes via ports and supplies protocol-dependent segmentation, reliability, ordering, flow, and congestion behavior.
- **Q149:** TCP flow control uses the receiver-advertised sliding window to cap outstanding data so receive buffers are not overrun. ⚠️ It is distinct from congestion control, which responds to network capacity.

#### CONNECTIONS TO OTHER TOPICS
TCP/UDP, sockets and ports, sequence/acknowledgement numbers, sliding windows, congestion control, retransmission, bandwidth-delay product, buffering, backpressure, and head-of-line blocking.

#### CODE / EXAMPLE (if applicable)
```text
receiver free buffer = 32 KB -> advertises rwnd = 32 KB
sender congestion window      -> cwnd = 64 KB

sender may keep about min(rwnd, cwnd) = 32 KB unacknowledged
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Start with process-to-process delivery and ports, then separate protocol-specific guarantees. For TCP, explicitly contrast receiver flow control with network congestion control. Avoid saying the transport layer always guarantees reliability—UDP intentionally does not.

#### ONE-LINE SUMMARY
Transport delivers data to application processes, and TCP's advertised receive window applies backpressure so the sender cannot overflow the receiver.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q141 and Q146 (performance/CDN)** connect to load balancing, caching, HTTP versions, edge computing, observability, and system-design latency budgets.
- **Q142 (VPN)** prepares encryption, TLS/IPsec, firewalls, zero trust, cloud networks, and secure remote access.
- **Q143–Q144 and Q150 (host networking)** connect to ARP, IPv6 Neighbor Discovery, traceroute, DHCP security, service discovery, and packet troubleshooting.
- **Q145 and Q147 (communication models)** connect to Ethernet/Wi-Fi, QoS, queueing, congestion, and real-time streaming.
- **Q148–Q149 (transport)** prepare TCP internals, backpressure, sockets, streaming systems, and high-bandwidth/high-latency tuning.

### Be Comfortable With Before Batch 16 (Questions 151–160)

The next batch begins Stage 1B subjective problem solving. Review how to state approach, correctness, complexity, and edge cases for:

- Two-sum using a hash map versus sorting/two pointers.
- In-place palindrome checks.
- Longest common subsequence state and recurrence.
- Fibonacci as a DP/memoization example.
- Floyd's linked-list cycle detection.
- Kth-largest selection with heaps or Quickselect.
- Binary-tree maximum depth recursion.
- Sliding-window invariants.
- Iterative linked-list reversal.
- The general two-pointer technique.

### Batch 15 Rapid Recall

141. Latency is delay; bandwidth is capacity; throughput is achieved rate.
142. VPN: authenticated encrypted tunnel over another network.
143. MAC: local link-layer interface identifier, not a routable permanent identity.
144. ICMP carries network control/errors; ping uses Echo Request/Reply.
145. Half-duplex alternates direction; full-duplex communicates both ways simultaneously.
146. CDN reduces RTT/origin work by serving cached content at nearby edges.
147. Circuit reserves resources; packet switching statistically shares links.
148. Transport provides process-to-process delivery through ports and protocol guarantees.
149. TCP flow control uses `rwnd` to protect receiver buffers.
150. DHCP leases IP configuration via DORA.
