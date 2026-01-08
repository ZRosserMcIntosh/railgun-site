# Railgun Threat Model

**Version 1.0 — January 2026**

---

## Scope

This document identifies threats to Railgun users, operators, and the system itself—and specifies mitigations that preserve non-violence, legitimacy, and user sovereignty.

**Threat modeling principles:**
- Assume adversaries are well-resourced (state-level capability)
- Assume honest-but-curious operators (will comply with law, won't actively attack)
- Assume users make mistakes (safe defaults matter)
- Never rely on obscurity
- Design for graceful degradation, not brittle failure

---

## Threat Categories

### 1. Censorship Threats

| Threat | Description | Likelihood | Impact |
|--------|-------------|------------|--------|
| **C1: Domain seizure** | Authorities seize railgun.app domain | Medium | High |
| **C2: App store removal** | Apple/Google remove client apps | Medium | High |
| **C3: ISP blocking** | Network-level blocking of relay IPs | Medium | Medium |
| **C4: CDN termination** | Cloudflare/AWS refuse service | Low | Medium |
| **C5: Payment processor ban** | Stripe/PayPal refuse transactions | Medium | Low |

**Mitigations:**

| Threat | Mitigation | Layer |
|--------|------------|-------|
| C1 | Multiple domains, .onion address, IP-direct connection | Core |
| C2 | Direct APK distribution, F-Droid, sideloading instructions | Core |
| C3 | Domain fronting, pluggable transports, relay diversity | Core |
| C4 | Self-hosted infrastructure, multi-CDN, P2P fallback | Services |
| C5 | Cryptocurrency acceptance, direct bank transfer, grants | Services |

---

### 2. Coercion Threats

| Threat | Description | Likelihood | Impact |
|--------|-------------|------------|--------|
| **CO1: Legal compulsion (company)** | Court orders Railgun to produce data | High | Low* |
| **CO2: Legal compulsion (user)** | Court orders user to decrypt | Medium | High |
| **CO3: National security letter** | Secret order with gag provision | Medium | Low* |
| **CO4: Extrajudicial pressure** | Threats, harassment of operators | Low | Variable |
| **CO5: Insider compromise** | Employee coerced or bribed | Low | Medium |

*Low impact because company cannot produce plaintext—only encrypted blobs.

**Mitigations:**

| Threat | Mitigation | Layer |
|--------|------------|-------|
| CO1 | Architecture produces only encrypted blobs; transparency reports | Core/Services |
| CO2 | Deniable encryption option; ephemeral messages; user education | User |
| CO3 | Warrant canary; architectural inability to comply silently | Services |
| CO4 | Geographic distribution; legal structure in privacy-friendly jurisdictions | Services |
| CO5 | No single employee has keys; separation of duties; audit logs | Services |

---

### 3. Data Seizure Threats

| Threat | Description | Likelihood | Impact |
|--------|-------------|------------|--------|
| **D1: Server seizure** | Physical capture of relay servers | Medium | Low* |
| **D2: Cloud account compromise** | AWS/GCP credentials stolen | Low | Low* |
| **D3: Backup exfiltration** | Backups copied by adversary | Low | Low* |
| **D4: Device seizure (user)** | User's phone/laptop captured | Medium | High |
| **D5: Device compromise (malware)** | Spyware on user device | Medium | High |

*Low impact because servers hold only encrypted blobs.

**Mitigations:**

| Threat | Mitigation | Layer |
|--------|------------|-------|
| D1 | No plaintext on servers; short retention; full disk encryption | Core |
| D2 | No credentials = no access to content; infrastructure as code | Services |
| D3 | No plaintext backups; encrypted blobs only | Services |
| D4 | Device encryption; biometric lock; remote wipe capability | User |
| D5 | Security hardening guides; platform integrity checks; user education | User |

---

### 4. Misuse Threats

| Threat | Description | Likelihood | Impact |
|--------|-------------|------------|--------|
| **M1: Illegal content distribution** | CSAM, terrorism, etc. | Medium | Critical |
| **M2: Harassment/stalking** | Platform used to target individuals | Medium | High |
| **M3: Coordination of violence** | Planning attacks via Railgun | Low | Critical |
| **M4: Fraud/scams** | Financial crimes using platform | Medium | Medium |
| **M5: Disinformation campaigns** | Coordinated inauthentic behavior | Medium | Medium |

**Mitigations:**

| Threat | Mitigation | Layer | Notes |
|--------|------------|-------|-------|
| M1 | PhotoDNA on unencrypted uploads (Services only); reporting mechanism; cooperation with NCMEC | Services | Cannot scan E2E content |
| M2 | Blocking/muting tools; abuse reporting; account suspension (Services) | User/Services | Core cannot enforce |
| M3 | No content visibility = no content moderation at Core; Terms of Service at Services | Services | Architectural limit |
| M4 | User education; reporting to law enforcement (metadata only) | Services | Limited capability |
| M5 | Rate limiting; behavioral analysis (metadata only); transparency | Services | Cannot see content |

**Critical acknowledgment:** End-to-end encryption means we cannot prevent all misuse at the content level. This is a deliberate tradeoff—the same architecture that protects journalists and dissidents also protects bad actors. Our mitigations focus on:
1. Metadata-level detection (patterns, not content)
2. User-level controls (blocking, reporting)
3. Services-level enforcement (account suspension)
4. Legal cooperation within architectural limits
5. User education about responsible use

---

### 5. Reputational & Legal Threats

| Threat | Description | Likelihood | Impact |
|--------|-------------|------------|--------|
| **R1: Association with violence** | Media links Railgun to violent event | Medium | Critical |
| **R2: Regulatory classification** | Classified as "crime-facilitating service" | Medium | High |
| **R3: Defamation claims** | Sued for content published via platform | Medium | Medium |
| **R4: Patent litigation** | Crypto patent trolls | Low | Medium |
| **R5: Employment liability** | Staff targeted for working on "dangerous" tech | Low | Medium |

**Mitigations:**

| Threat | Mitigation | Layer |
|--------|------------|-------|
| R1 | Charter commitment to non-violence; proactive messaging; rapid response PR plan | All |
| R2 | Legal structure review; compliance interfaces; jurisdiction shopping | Services |
| R3 | Section 230 protections (US); intermediary liability shields; no editorial control | Services |
| R4 | Prior art documentation; defensive patent pool; legal reserve fund | Services |
| R5 | Legal support for employees; geographic distribution; remote-first structure | Services |

---

## Adversary Profiles

### Nation-State (High Capability)
- **Capabilities:** Lawful intercept, infrastructure seizure, zero-day exploits, metadata analysis, social engineering, unlimited budget
- **Constraints:** Legal process (in democracies), international relations, public opinion
- **Mitigations:** End-to-end encryption, traffic analysis resistance, geographic distribution, open source (no backdoors), legal structure

### Law Enforcement (Medium Capability)
- **Capabilities:** Subpoenas, court orders, device seizure, cooperation from platforms
- **Constraints:** Due process, jurisdiction limits, technical capability
- **Mitigations:** Encrypted blobs only, minimal retention, transparency reports, legal counsel

### Organized Crime (Medium Capability)
- **Capabilities:** Bribery, physical threats, hacking-for-hire
- **Constraints:** Risk of law enforcement attention, limited technical sophistication
- **Mitigations:** Employee security training, separation of duties, no single points of compromise

### Hacktivists (Low-Medium Capability)
- **Capabilities:** Public shaming, DDoS, opportunistic exploitation
- **Constraints:** Limited persistence, ideological constraints
- **Mitigations:** DDoS protection, security hygiene, bug bounty program

### Curious Insider (Low Capability)
- **Capabilities:** Access to internal systems, social engineering
- **Constraints:** Employment risk, legal consequences
- **Mitigations:** Least privilege access, audit logging, no plaintext access by design

---

## Escalation Prevention

**Principle:** Features that could be misinterpreted as aggressive must be designed to minimize escalation risk.

| Feature | Escalation Risk | Mitigation |
|---------|-----------------|------------|
| Anonymous publishing | Could be used to threaten | No deanonymization tools; no "targeting" features |
| Coordination tools | Could organize mobs | Rate limiting; no broadcast-to-strangers; explicit opt-in |
| Evidence timestamping | Could be used for extortion | Public verification = harder to use privately for coercion |
| Encrypted communications | Could plan violence | Same architecture protects everyone; we don't choose users |

**Red lines (features we will NOT build):**
- Doxxing tools (automated identity exposure)
- Mob coordination (broadcast to non-contacts)
- "Targeting" interfaces (lists of enemies, adversaries)
- Coercion assistance (blackmail, extortion workflows)
- Violence celebration (no likes/shares on violent content)

---

## Incident Response

### If Railgun is associated with a violent event:

1. **Immediate (0-4 hours)**
   - Executive team convenes
   - Legal counsel engaged
   - No public comment until facts established

2. **Assessment (4-24 hours)**
   - Determine actual Railgun involvement (if any)
   - Identify what data exists (metadata only)
   - Prepare cooperation with law enforcement if warranted

3. **Response (24-72 hours)**
   - Public statement emphasizing non-violence commitment
   - Cooperation with lawful investigation (within architectural limits)
   - Internal review: did design choices contribute?

4. **Follow-up (1-4 weeks)**
   - Charter review: any changes needed?
   - Product review: any features enabled misuse?
   - Transparency report: what happened, what we did

### If served with legal process:

1. **Receipt:** Legal counsel reviews immediately
2. **Scope:** Determine what data actually exists
3. **Response:** Comply within architectural limits (encrypted blobs, metadata)
4. **Transparency:** Disclose in quarterly report (unless legally prohibited)
5. **Challenge:** Contest overbroad requests

---

## Assumptions & Limitations

**What we assume:**
- Cryptography is not broken (Curve25519, ChaCha20, SHA-256)
- TLS protects transport
- User devices are not pre-compromised
- Operators are honest-but-curious, not actively malicious

**What we cannot protect against:**
- Compromised user devices (malware, physical access)
- Rubber-hose cryptanalysis (physical coercion of users)
- Quantum computing (future threat, migration plan needed)
- User operational security failures (screenshots, sharing passwords)

**What we explicitly accept:**
- Bad actors can use the same tools as good actors
- We cannot moderate end-to-end encrypted content
- Some governments will classify us as hostile
- We will be criticized from all sides

---

*This threat model is reviewed quarterly and updated when new threats emerge or mitigations change.*
