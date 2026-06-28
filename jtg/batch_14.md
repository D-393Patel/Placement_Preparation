# JTG Technical Interview Coaching — Batch 14

> You are my technical interview coach preparing me for JTG (Josh Technology Group).

**Source section:** Stage 1A — Online Assessment: Objective (DSA, OOP, OS, DBMS, Networks)  
**Batch:** Questions 131–140

## Questions in This Batch

131. ⚡⚠️ What is a subnet mask, and what is CIDR notation?
132. ⚡⚠️ What is NAT (Network Address Translation)?
133. ⚡ What is DNS, and how does it work?
134. ⚡⚠️ What are HTTP and HTTPS? What port does each use?
135. ⚡ What is a firewall?
136. ⚡ What is the difference between a hub, switch, and router?
137. ⚡⚠️ What is ARP (Address Resolution Protocol)?
138. ⚡⚠️ What is the difference between GET and POST HTTP methods?
139. ⚡⚠️ What is a cookie versus a session?
140. ⚡⚠️ What is REST, and what are its constraints?

## Step 1 — Group the Questions

| Group | Underlying concept | Questions | Why they belong together |
|---|---|---:|---|
| A | IP subnetting and address translation | 131, 132 | Subnets divide address space; NAT translates addresses/ports across network boundaries. |
| B | Local and routed packet forwarding | 136, 137 | Hubs, switches, and routers forward at different layers; ARP supplies the local MAC address needed for an IPv4 frame. |
| C | Name resolution | 133 | DNS is a separate distributed hierarchy that maps names to records and relies on caching. |
| D | HTTP transport security and traffic filtering | 134, 135 | HTTPS secures HTTP in transit, while firewalls decide which traffic may cross a boundary. |
| E | HTTP methods, client state, and REST design | 138, 139, 140 | GET/POST express request semantics, cookies/sessions manage state, and REST defines the broader architectural constraints. |

---

### SUBNET MASKS, CIDR, AND NAT ⚡⚠️
**Covers questions: 131, 132**

#### CORE CONCEPT (30 seconds)
A subnet mask marks which IPv4 address bits are the network prefix and which are host bits; bitwise AND of an address and mask gives the network address. CIDR writes the prefix length as `/n`, such as `192.168.1.0/24`. NAT rewrites packet source/destination IP addresses—and often ports—between address realms, commonly letting many private IPv4 hosts share one public address through PAT.

#### WHY IT EXISTS
Subnetting creates routable administrative groups and controls address allocation/broadcast domains. CIDR replaces rigid classful networks with flexible prefixes and route aggregation. NAT mitigates IPv4 scarcity and hides internal addressing, though it complicates end-to-end connectivity.

#### MENTAL MODEL
A postal address has a neighbourhood part and a house part; the prefix length says where the split occurs. NAT is a building receptionist who replaces apartment return addresses with one public building address plus an internal tracking number.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Mask `255.255.255.0` equals `/24`: 24 network bits, 8 host bits. NAT translates private/internal addresses to public/external addresses. PAT/NAT overload distinguishes many connections with port mappings.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  For IPv4 `/n`, total addresses are `2^(32-n)`; traditional subnets reserve network and broadcast addresses, with `/31` point-to-point and `/32` host-route exceptions. SNAT changes source, DNAT changes destination. A stateful translation table maps internal tuples to external tuples and adjusts checksums.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  Valid masks have contiguous prefix bits; CIDR also supports route aggregation and applies to IPv6. NAT breaks the pure end-to-end model, complicates inbound connections/peer-to-peer/protocols carrying addresses, and needs port forwarding or traversal methods. NAT is not a firewall or encryption; stateful behavior may incidentally block unsolicited mappings, but security policy belongs to firewall rules.

#### ALL VARIATIONS COVERED
- **Q131:** A subnet mask/CIDR prefix divides network and host bits; `/24` is the compact form of `255.255.255.0`, and masking finds the subnet.
- **Q132:** NAT rewrites IP/port information between networks, often allowing private IPv4 devices to share a public address. ⚠️ It conserves addresses but is not itself a security guarantee.

#### CONNECTIONS TO OTHER TOPICS
IPv4/IPv6, routing tables, longest-prefix match, private addresses, DHCP, broadcast domains, PAT, port forwarding, firewalls, VPNs, and consistent address planning.

#### CODE / EXAMPLE (if applicable)
```text
IP:      192.168.1.77
Mask:    255.255.255.0  = /24
Network: 192.168.1.0    (IP bitwise-AND mask)

PAT mapping:
192.168.1.77:51500 -> 203.0.113.8:40001
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Calculate one subnet rather than only reciting definitions. Explain the NAT state table and address-versus-port translation. Mention address conservation and end-to-end trade-offs. Avoid using the obsolete “subtract two” host rule without noting `/31` and `/32` exceptions.

#### ONE-LINE SUMMARY
CIDR marks the network-prefix length for routing/subnetting, while NAT rewrites address/port tuples so private networks can communicate through limited public IPv4 space.

---

### HUBS, SWITCHES, ROUTERS, AND ARP ⚡⚠️
**Covers questions: 136, 137**

#### CORE CONCEPT (30 seconds)
A hub repeats incoming bits to every port at the physical layer. A switch learns source MAC addresses and forwards Ethernet frames within a LAN at the data-link layer. A router forwards IP packets between networks using routing tables at the network layer. ARP maps a local IPv4/next-hop address to a MAC address so the sender can build the Ethernet frame for the next hop.

#### WHY IT EXISTS
Local Ethernet delivery needs link-layer destinations, while communication across subnets needs logical IP routing. Switches reduce unnecessary LAN traffic compared with hubs; routers connect broadcast domains; ARP bridges the addressing gap for each local IPv4 hop.

#### MENTAL MODEL
A hub is a loudspeaker heard by every room. A switch is a receptionist who learns each person's room. A router is a postal sorting centre choosing the next network. ARP asks the local room, “Who owns this IP? Tell me your MAC address.”

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  Hub: Layer 1, repeats everywhere. Switch: Layer 2, forwards by MAC. Router: Layer 3, forwards by IP. ARP resolves IPv4 address to MAC on the local link.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  A switch learns `source MAC → ingress port`, floods unknown unicast/broadcast, and gives each port its own collision domain. A router separates broadcast domains and selects a next hop by longest-prefix match. ARP broadcasts a request and normally receives a unicast reply, then caches the mapping.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  For an off-subnet destination, the host ARPs for the default gateway's MAC—not the remote server's MAC. MAC addresses change hop by hop while source/destination IPs usually remain end-to-end unless translated. Switches may operate at Layer 3, and routers/firewalls are multifunction devices. ARP is unauthenticated and vulnerable to spoofing/poisoning; IPv6 uses Neighbor Discovery instead.

#### ALL VARIATIONS COVERED
- **Q136:** Hub repeats bits to all ports, switch forwards local frames by learned MAC, and router connects IP networks using routes.
- **Q137:** ARP discovers the local MAC for an IPv4 next-hop address using request/reply and caching. ⚠️ It resolves only on the local broadcast domain, not across routers.

#### CONNECTIONS TO OTHER TOPICS
OSI layers, Ethernet frames, MAC tables, VLANs, collision/broadcast domains, IP routing, default gateways, longest-prefix match, ARP spoofing, and IPv6 Neighbor Discovery.

#### CODE / EXAMPLE (if applicable)
```text
Destination IP 8.8.8.8 is outside host's /24:
1. Routing table selects default gateway 192.168.1.1.
2. ARP resolves 192.168.1.1 -> gateway MAC.
3. Ethernet frame destination = gateway MAC.
4. IP packet destination remains 8.8.8.8.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Explain forwarding decisions layer by layer and walk one off-subnet packet. Mention collision versus broadcast domains. Avoid saying switches never broadcast or that ARP finds the remote internet server's MAC.

#### ONE-LINE SUMMARY
Hubs repeat bits, switches deliver LAN frames by MAC, routers move IP packets between networks, and ARP finds the local next-hop MAC.

---

### DNS RESOLUTION ⚡
**Covers questions: 133**

#### CORE CONCEPT (30 seconds)
DNS is a distributed hierarchical naming system that maps domain names to records such as IP addresses. A client asks a recursive resolver; on a cache miss, it follows referrals from root to TLD to authoritative name server, returns the answer, and caches it for the record's TTL.

#### WHY IT EXISTS
Humans need stable readable names while service addresses can change and be distributed across providers. DNS delegates authority by domain and caches results, avoiding one global database or one server handling every lookup.

#### MENTAL MODEL
Ask a librarian for a book location. If it is not cached, the librarian asks the national directory (root), then the category office (TLD), then the owning library (authoritative server), and remembers the result temporarily.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  DNS resolves names using hierarchical servers and caching. Common records: `A` (IPv4), `AAAA` (IPv6), `CNAME` (alias), `MX` (mail), `NS` (authority), and `TXT`.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Stub resolver asks a recursive resolver; root/TLD usually return referrals; authoritative server returns the domain's record. DNS commonly uses UDP port 53, with TCP for cases such as large/truncated responses and zone transfers; modern encrypted transports include DoT/DoH.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  TTL trades freshness against latency/load. Negative answers can also be cached. Recursive and iterative queries are different roles. DNS may return several addresses for load distribution, and client/resolver selection affects observed result. DNSSEC authenticates DNS data but does not encrypt ordinary DNS; DoH/DoT encrypt transport but do not prove application content is safe.

#### ALL VARIATIONS COVERED
- **Q133:** DNS maps hierarchical names to typed records through recursive resolution, authoritative delegation, and TTL-based caching.

#### CONNECTIONS TO OTHER TOPICS
CDNs, load balancing, anycast, HTTP/TLS, certificates/SNI, caching, UDP/TCP, DNSSEC, DoH/DoT, service discovery, and propagation delays.

#### CODE / EXAMPLE (if applicable)
```text
browser/stub -> recursive resolver
cache miss -> root -> .com TLD -> example.com authoritative
authoritative -> A/AAAA answer + TTL
resolver caches -> returns address to client
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Tell the resolution story in order and distinguish recursive resolver from authoritative server. Name records and TTL. Avoid saying the root server returns every final IP or that DNS always uses only UDP.

#### ONE-LINE SUMMARY
DNS resolves human names through cached recursive queries and delegated root/TLD/authoritative records.

---

### HTTP, HTTPS, TLS, AND FIREWALLS ⚡⚠️
**Covers questions: 134, 135**

#### CORE CONCEPT (30 seconds)
HTTP is an application protocol for request/response communication, conventionally on TCP port 80. HTTPS is HTTP protected by TLS, conventionally on port 443, providing encryption, integrity, and server authentication through certificates. A firewall enforces traffic policy by allowing or blocking connections/packets based on addresses, ports, protocol, connection state, and sometimes application data.

#### WHY IT EXISTS
HTTP standardises web communication but plaintext can be observed or modified. TLS protects data in transit and authenticates the endpoint. Firewalls reduce exposed attack surface and control which traffic may cross host/network trust boundaries.

#### MENTAL MODEL
HTTP is a postcard; HTTPS puts it in a tamper-evident locked envelope addressed to a verified recipient. A firewall is the gatekeeper checking who may enter or leave—not reading or fixing every action inside the building.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  HTTP default port 80; HTTPS default port 443. TLS gives confidentiality, integrity, and certificate-based server authentication. Firewalls filter traffic according to rules.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  Ports are defaults, not requirements. A stateful firewall tracks connection state and can allow established return traffic; a stateless filter evaluates packets independently. Host firewalls protect one machine; network firewalls protect boundaries; a WAF specialises in HTTP/application attacks.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  HTTPS authenticates control of the certified identity/domain, not the trustworthiness of the business/content. TLS terminates at an endpoint/proxy, so downstream hops require their own protection. Encrypted traffic limits payload inspection unless terminated. Firewalls do not replace authentication, patching, input validation, or least privilege; egress rules and default-deny policies matter too.

#### ALL VARIATIONS COVERED
- **Q134:** HTTP is plaintext application messaging, typically port 80; HTTPS is HTTP over TLS, typically port 443. ⚠️ HTTPS secures transport but does not certify that a site is honest.
- **Q135:** A firewall allows/denies traffic by security policy at host or network boundaries, using packet, state, and sometimes application context.

#### CONNECTIONS TO OTHER TOPICS
TLS handshakes, certificates/PKI, TCP/QUIC, ports, proxies, WAFs, NAT, VPNs, zero trust, access control lists, and security groups.

#### CODE / EXAMPLE (if applicable)
```text
Example inbound policy:
allow TCP 443 to public web proxy
allow established return traffic
deny unsolicited traffic to database port 5432 from internet

Port identifies a service endpoint; TLS provides protection.
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Name the three TLS properties and distinguish default ports from protocol requirements. Compare stateful/stateless and firewall/WAF briefly. Avoid claiming firewalls “stop hackers” generally or HTTPS encrypts data after it reaches the application/database.

#### ONE-LINE SUMMARY
HTTPS protects HTTP with TLS on conventional port 443, while a firewall limits which traffic may cross a boundary according to policy.

---

### GET, POST, COOKIES, SESSIONS, AND REST ⚡⚠️
**Covers questions: 138, 139, 140**

#### CORE CONCEPT (30 seconds)
GET retrieves a representation and should be safe and idempotent; POST submits data for processing or creation and is not inherently idempotent. A cookie is small browser-stored data automatically sent to matching origins; a server-side session stores user state on the server and commonly uses a cookie containing an opaque session ID. REST is an architectural style with client–server separation, stateless requests, cacheability, a uniform interface, layered systems, and optional code-on-demand.

#### WHY IT EXISTS
Method semantics let clients, caches, proxies, and servers behave predictably. HTTP itself is stateless, so cookies/session identifiers carry continuity when applications need login/cart state. REST constrains distributed interfaces so components remain decoupled, scalable, and evolvable.

#### MENTAL MODEL
GET asks a librarian to show a book; repeating the request changes nothing. POST hands in a new application form, potentially creating another record each time. A cookie is the claim ticket kept by the visitor; the session is the corresponding folder kept behind the desk. REST is the library's consistent resource-and-request rulebook.

#### DEPTH LAYERS
- **Layer 1: What a fresher must know (objective/MCQ level)**  
  GET = retrieve, safe/idempotent, commonly cacheable and parameters in URL. POST = submit/process, body payload, usually non-idempotent. Cookies live client-side; sessions usually store state server-side keyed by a session cookie. Know the REST constraints.
- **Layer 2: What a tech round expects (implementation + trade-offs)**  
  `Secure`, `HttpOnly`, and `SameSite` cookie attributes reduce transport, script-access, and CSRF risk. Sessions need expiry, rotation after login, revocation, and shared/distributed storage at scale. REST's uniform interface uses resource identifiers, representations, self-descriptive messages, and hypermedia as the engine of application state.
- **Layer 3: What separates top candidates (edge cases, internals, real-world application)**  
  GET/POST do not determine confidentiality—HTTPS does. HTTP permits a GET content body but semantics/intermediary support are poorly defined, so avoid relying on it. POST can be made retry-safe using idempotency keys. REST statelessness means each request contains its required context; servers may still persist resources and authentication/session records. REST is not synonymous with JSON, CRUD, or even strictly HTTP, though HTTP is the normal implementation.

#### ALL VARIATIONS COVERED
- **Q138:** GET is safe/idempotent retrieval; POST submits a representation/action and may create new effects per request. ⚠️ POST is not more secure merely because data is in the body.
- **Q139:** A cookie is browser-stored request data; a session is server-maintained state commonly addressed by an opaque cookie ID. ⚠️ Do not store sensitive session state directly in an unprotected cookie.
- **Q140:** REST is a constrained client–server architectural style: stateless, cacheable, uniform interface, layered system, with optional code-on-demand. ⚠️ “Uses JSON endpoints” is not a complete definition.

#### CONNECTIONS TO OTHER TOPICS
HTTP safety/idempotency, caching, authentication, CSRF/XSS, JWTs, OAuth, API versioning, HATEOAS, proxies/CDNs, distributed sessions, and idempotency keys.

#### CODE / EXAMPLE (if applicable)
```http
GET /orders/42 HTTP/1.1
Host: api.example.com
Cookie: session=opaque-random-id

POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Idempotency-Key: 8c9a...

{"productId": 7, "quantity": 2}
```

#### WHAT JTG SPECIFICALLY LOOKS FOR
Use semantic words—safe, idempotent, cacheable—then give retry behavior. Explain where cookie and session data physically live and name security attributes. Recite REST constraints and connect statelessness to self-contained requests. Avoid using GET for state changes.

#### ONE-LINE SUMMARY
GET safely retrieves, POST submits effects, cookies carry client tokens to server-side sessions, and REST constrains APIs around stateless, cacheable, uniform resource interaction.

---

## Step 3 — Cross-Batch Connections

### Questions from This Batch That Reappear Later

- **Q131–Q132 (subnet/NAT)** connect to routing, firewalls, VPNs, DHCP, private cloud networks, containers, and Kubernetes networking.
- **Q133 (DNS)** prepares CDN routing, service discovery, load balancing, TLS/SNI, and DNS-security questions.
- **Q134–Q135 (HTTPS/firewalls)** lead to TLS handshakes, CSP, same-origin policy, reverse proxies, WAFs, and zero-trust design.
- **Q136–Q137 (devices/ARP)** connect to VLANs, routing tables, MAC addresses, packet capture, and man-in-the-middle attacks.
- **Q138–Q140 (web semantics)** prepare authentication, CORS, JWT/OAuth, GraphQL, WebSockets, API versioning, and HTTP idempotency.

### Be Comfortable With Before Batch 15 (Questions 141–150)

- Latency versus bandwidth and why improving one does not guarantee the other.
- VPN tunnels, encryption, and routing scope.
- MAC address purpose and local-link scope.
- ICMP error/control messages and how `ping` works.
- Half-duplex versus full-duplex communication.
- CDN edge caching and origin interaction.
- Circuit switching versus packet switching.
- Transport-layer multiplexing, reliability, and flow control.
- TCP receive-window flow control versus congestion control.
- DHCP address assignment and the DORA exchange.

### Batch 14 Rapid Recall

131. Subnet mask/CIDR divides network-prefix and host bits.
132. NAT rewrites address/port tuples between address realms.
133. DNS resolves names through cached hierarchical delegation.
134. HTTP defaults to 80; HTTPS uses TLS and defaults to 443.
135. Firewall enforces traffic allow/deny policy.
136. Hub repeats, switch forwards by MAC, router forwards by IP.
137. ARP maps a local IPv4 next-hop address to a MAC.
138. GET safely retrieves; POST submits potentially non-idempotent work.
139. Cookie is client-stored; session state is commonly server-side.
140. REST is stateless, cacheable, uniform, layered client–server architecture.
