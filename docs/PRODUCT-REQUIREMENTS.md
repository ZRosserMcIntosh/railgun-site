# Railgun Product Requirements

**Version 1.0 — January 2026**

---

## Product Philosophy

Railgun is infrastructure. Like roads, it should be:
- **Boring:** Reliable, predictable, unsurprising
- **Universal:** Usable by anyone for lawful purposes
- **Durable:** Outlasts any single operator or regime
- **Neutral:** Does not pick winners or losers

Every feature must pass the **legitimacy test:**
1. Would a reasonable regulator see this as infrastructure or as a weapon?
2. Does this reduce or increase the likelihood of violence?
3. Does this preserve or undermine user agency?
4. Can this survive public scrutiny?

---

## User Personas

### Primary: The Ordinary Private Person
- Wants private conversations with friends/family
- Not a target, but values privacy as a default
- Low technical sophistication
- Needs: Simple UX, safe defaults, reliable delivery

### Secondary: The Journalist/Researcher
- Communicates with sensitive sources
- Needs evidence integrity and timestamping
- Moderate technical sophistication
- Needs: Source protection, verifiable publishing, metadata minimization

### Tertiary: The At-Risk Communicator
- Lives under authoritarian conditions
- Active target of surveillance
- Variable technical sophistication
- Needs: Censorship resistance, deniability, operational security guidance

### Enterprise: The Organization
- Needs compliant internal communications
- Subject to regulatory requirements
- Has IT/security staff
- Needs: Admin controls, audit logs, compliance interfaces

---

## Feature Requirements

### Tier 1: Core Messaging (MVP)

| Feature | Requirement | Rationale |
|---------|-------------|-----------|
| **End-to-end encryption** | Signal Protocol (X3DH + Double Ratchet) | Industry standard, audited, trusted |
| **1:1 messaging** | Text, images, files up to 100MB | Basic communication |
| **Group messaging** | Up to 100 members, encrypted | Coordination capability |
| **Multi-device sync** | Linked devices share session | Practical usability |
| **Message deletion** | Local delete, "delete for everyone" | User control over data |
| **Read receipts** | Optional, off by default | Privacy-preserving default |
| **Typing indicators** | Optional, off by default | Privacy-preserving default |
| **Contact verification** | Safety numbers, QR code scanning | MITM protection |

**Explicit non-requirements (MVP):**
- Voice/video calls (complexity, metadata exposure)
- Stories/status (social features increase attack surface)
- Payment integration (regulatory complexity)

---

### Tier 2: Resilience Features (Post-MVP)

| Feature | Requirement | Rationale |
|---------|-------------|-----------|
| **Relay federation** | Any operator can run a relay node | No single point of failure |
| **Pluggable transports** | Obfs4, meek, domain fronting | Censorship resistance |
| **Offline messaging** | Store-and-forward with 30-day TTL | Works with intermittent connectivity |
| **Relay discovery** | Decentralized relay list, out-of-band sharing | Resilience against blocking |
| **Key backup** | Optional encrypted backup to user-controlled storage | Recovery without trusting us |

---

### Tier 3: Evidence & Publishing (High-Power, Explicit Opt-In)

| Feature | Requirement | Rationale |
|---------|-------------|-----------|
| **Cryptographic timestamping** | Third-party witnessed timestamps | Prove "this existed at time T" |
| **Content signing** | Ed25519 signatures on published content | Prove "this came from identity X" |
| **Distributed archiving** | Multi-archive publication | Survive takedowns |
| **Anonymous publishing** | Option to publish without identity link | Protect whistleblowers |

**Safeguards for high-power features:**
- Explicit user activation ("I understand this is public and permanent")
- Cooling-off period before publication (1 hour default)
- No "target" or "enemy" framing in UI
- No broadcast-to-strangers capability

---

### Tier 4: Enterprise & Compliance (Services Layer)

| Feature | Requirement | Rationale |
|---------|-------------|-----------|
| **Admin console** | User management, policy enforcement | Enterprise control |
| **Compliance export** | Export encrypted blobs + metadata for legal | Regulatory requirement |
| **Retention policies** | Configurable retention periods | Compliance flexibility |
| **SSO integration** | SAML/OIDC for enterprise auth | Enterprise requirement |
| **Audit logging** | Who did what when (metadata only) | Accountability |

**Explicit limitation:** Compliance features cannot access plaintext. Encrypted blobs only.

---

## User Interface Principles

### 1. Safe Defaults
- Disappearing messages: OFF by default (users can enable)
- Read receipts: OFF by default
- Typing indicators: OFF by default
- Profile visibility: Contacts only by default
- Link previews: OFF by default (metadata leak)

### 2. Progressive Disclosure
- Basic features visible immediately
- Advanced features require deliberate navigation
- High-power features require explicit activation

### 3. No Dark Patterns
- No engagement optimization
- No notification manipulation
- No social pressure mechanics
- No "X people are typing" for strangers

### 4. Honest Limitations
- Clear indication when messages are encrypted
- Clear indication when features reduce privacy
- No false promises about anonymity or security

---

## Harm Reduction Requirements

| Potential Harm | Mitigation | Implementation |
|----------------|------------|----------------|
| **Harassment** | Block/mute, report abuse, no stranger messaging | User controls, Services moderation |
| **Stalking** | No read receipts default, no precise online status | Privacy defaults |
| **Mob formation** | No broadcast-to-strangers, rate limits on group invites | Architectural limits |
| **Evidence tampering** | Cryptographic timestamps, hash verification | Technical controls |
| **Doxxing** | No identity lookup, no "find people" feature | Feature omission |
| **Coercion amplification** | No "targeting" UI, no enemy lists | Feature omission |

---

## Accessibility Requirements

| Requirement | Standard | Rationale |
|-------------|----------|-----------|
| Screen reader support | WCAG 2.1 AA | Inclusive design |
| Keyboard navigation | Full functionality without mouse | Accessibility |
| Color contrast | 4.5:1 minimum | Visual accessibility |
| Text scaling | Support 200% zoom | Visual accessibility |
| Reduced motion | Respect prefers-reduced-motion | Accessibility |

---

## Performance Requirements

| Metric | Target | Rationale |
|--------|--------|-----------|
| Message send latency | < 500ms p95 | Real-time feel |
| App launch time | < 2s cold start | Usability |
| Encryption overhead | < 50ms per message | Imperceptible |
| Battery impact | < 5% daily (background) | Practical for mobile |
| Storage efficiency | < 1KB per message (metadata) | Scalability |

---

## Privacy Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| No plaintext on servers | E2E encryption, encrypted blobs only | Architecture audit |
| Minimal metadata | Routing info only, no content metadata | Protocol audit |
| No analytics on content | Aggregate stats only, no individual tracking | Code audit |
| User data deletion | Complete deletion on request, automated expiration | Functional test |
| No third-party tracking | No ad networks, no analytics SDKs | Dependency audit |

---

## Compliance Requirements (Services Layer Only)

| Jurisdiction | Requirement | Implementation |
|--------------|-------------|----------------|
| EU (GDPR) | Data export, deletion, consent | User controls, automated processes |
| US (ECPA) | Lawful intercept cooperation | Encrypted blobs only |
| California (CCPA) | Data disclosure, deletion | User controls |
| Germany (NetzDG) | Abuse reporting, response times | Reporting mechanism |

**Explicit limitation:** Compliance produces encrypted blobs and metadata only. We cannot provide plaintext because we do not possess it.

---

## Quality Attributes

| Attribute | Requirement | Measurement |
|-----------|-------------|-------------|
| **Reliability** | 99.9% uptime (Services) | Monitoring |
| **Security** | Annual third-party audit | Audit report |
| **Maintainability** | Modular architecture, documented APIs | Code review |
| **Portability** | Cross-platform (macOS, Windows, Linux, iOS, Android, Web) | Platform testing |
| **Scalability** | 10M MAU without architecture change | Load testing |

---

## Anti-Requirements (What We Will NOT Build)

| Feature | Reason |
|---------|--------|
| Identity verification (real name) | Enables targeting, chills speech |
| Social graph exposure | Metadata surveillance |
| Broadcast to strangers | Mob formation, spam |
| Engagement metrics | Manipulation, addiction |
| Algorithmic feed | Filter bubbles, manipulation |
| Location sharing (persistent) | Stalking enablement |
| "Find people near me" | Stalking enablement |
| Reaction/like counts | Social pressure mechanics |
| Public follower counts | Status games, targeting |
| Content recommendation | Filter bubbles, manipulation |

---

*These requirements are reviewed quarterly against the Charter and updated based on threat model changes.*
