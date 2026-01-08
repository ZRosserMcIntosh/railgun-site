# Railgun Roadmap

**Version 1.0 — January 2026**

---

## Strategic Priorities

Every phase optimizes for:
1. **Survivability** — Can this be killed? How do we reduce single points of failure?
2. **Legitimacy** — Does this look like infrastructure or a weapon? Can it survive scrutiny?
3. **Non-violence** — Does this reduce or increase the likelihood of harm?

---

## Phase 1: Foundation (Days 0–90)

**Objective:** Ship a boring, functional, auditable MVP that establishes legitimacy.

### Month 1 (Days 0–30): Core Protocol & Client

| Week | Deliverable | Owner | Success Criteria |
|------|-------------|-------|------------------|
| 1 | Signal Protocol integration complete | Crypto | All test vectors pass |
| 1 | Charter published on website | Leadership | Live at /charter |
| 2 | 1:1 encrypted messaging functional | Client | Send/receive works E2E |
| 2 | Desktop client (macOS) alpha | Client | Installable, functional |
| 3 | Multi-device sync working | Client | 2 devices, same account |
| 3 | Key verification UI (safety numbers) | Client | QR code scanning works |
| 4 | Internal security review | Security | No critical findings |
| 4 | Desktop client (Windows, Linux) alpha | Client | Parity with macOS |

**Exit criteria:**
- [ ] 1:1 messaging works reliably
- [ ] Signal Protocol correctly implemented
- [ ] Charter is public and linked from app
- [ ] No known security vulnerabilities

### Month 2 (Days 31–60): Groups & Resilience

| Week | Deliverable | Owner | Success Criteria |
|------|-------------|-------|------------------|
| 5 | Group messaging (up to 50 members) | Client | Create, invite, message |
| 5 | Message deletion (local + remote) | Client | "Delete for everyone" works |
| 6 | Relay federation specification | Protocol | Published, reviewed |
| 6 | Second relay node operational | Infra | Failover tested |
| 7 | Offline message queue (7-day TTL) | Backend | Messages delivered after reconnect |
| 7 | Disappearing messages (optional) | Client | 24h, 7d, 30d options |
| 8 | Basic abuse reporting mechanism | Client/Backend | Reports reach human reviewer |
| 8 | Privacy policy & terms finalized | Legal | Published, GDPR-compliant |

**Exit criteria:**
- [ ] Groups work reliably
- [ ] System survives single relay failure
- [ ] Abuse reports are processed
- [ ] Legal documents published

### Month 3 (Days 61–90): Public Beta & Audit

| Week | Deliverable | Owner | Success Criteria |
|------|-------------|-------|------------------|
| 9 | Third-party security audit commissioned | Security | Contract signed |
| 9 | Public beta launch (limited) | Product | 1,000 users target |
| 10 | Mobile client (iOS) alpha | Client | Feature parity with desktop |
| 10 | Bug bounty program launched | Security | HackerOne or equivalent |
| 11 | Mobile client (Android) alpha | Client | Feature parity with desktop |
| 11 | Documentation site launched | Docs | Protocol spec, user guides |
| 12 | Transparency report (first) | Legal | Published, even if empty |
| 12 | Phase 1 retrospective | Leadership | Document learnings |

**Exit criteria:**
- [ ] 1,000+ beta users
- [ ] Security audit in progress
- [ ] Bug bounty operational
- [ ] Mobile clients functional
- [ ] First transparency report published

---

## Phase 2: Resilience & Scale (Days 91–180)

**Objective:** Harden against censorship, scale infrastructure, begin enterprise motion.

### Month 4 (Days 91–120): Censorship Resistance

| Deliverable | Owner | Success Criteria |
|-------------|-------|------------------|
| Pluggable transports (obfs4) | Protocol | Works through DPI |
| Domain fronting (CDN-based) | Infra | Works when domain blocked |
| Relay discovery mechanism | Protocol | Users can find relays without us |
| Tor hidden service (.onion) | Infra | Accessible via Tor |
| Decentralized relay registry | Protocol | No single point of failure |

### Month 5 (Days 121–150): Enterprise Foundation

| Deliverable | Owner | Success Criteria |
|-------------|-------|------------------|
| Admin console (basic) | Enterprise | User management, policy |
| SSO integration (SAML) | Enterprise | Works with Okta/Azure AD |
| Compliance export (encrypted) | Enterprise | Produces encrypted blobs |
| Audit logging (metadata) | Enterprise | Who did what when |
| Enterprise pricing published | Business | Clear, public pricing |

### Month 6 (Days 151–180): Scale & Stability

| Deliverable | Owner | Success Criteria |
|-------------|-------|------------------|
| Security audit complete | Security | No critical findings unresolved |
| 10,000 user capacity proven | Infra | Load test passes |
| 99.9% uptime achieved (30-day) | Infra | Monitoring confirms |
| Mobile clients GA | Client | Stable, feature-complete |
| Enterprise pilot customers (3) | Business | Signed agreements |

**Phase 2 Exit Criteria:**
- [ ] Works through censorship (tested in hostile network conditions)
- [ ] Enterprise product exists and has paying customers
- [ ] System is stable at scale
- [ ] Security audit published

---

## Phase 3: Evidence & Federation (Months 6–12)

**Objective:** Enable high-power features with appropriate safeguards; achieve protocol independence.

### Months 7–9: Evidence Publishing

| Deliverable | Owner | Success Criteria |
|-------------|-------|------------------|
| Cryptographic timestamping | Protocol | Third-party witnessed |
| Content signing | Protocol | Ed25519 signatures |
| Distributed archive protocol | Protocol | Multi-archive publication |
| Anonymous publishing option | Protocol | No identity linkage |
| Publishing UI with safeguards | Client | Explicit consent, cooling-off |

**Safeguards checklist:**
- [ ] Explicit opt-in required
- [ ] "This is public and permanent" warning
- [ ] 1-hour cooling-off period (configurable)
- [ ] No "target" or "enemy" framing
- [ ] Clear distinction from private messaging

### Months 10–12: Federation & Independence

| Deliverable | Owner | Success Criteria |
|-------------|-------|------------------|
| Full relay federation live | Protocol | 10+ independent relays |
| Protocol governance established | Community | RFC process documented |
| Reference implementation open source | Engineering | Apache 2.0 / MIT licensed |
| Independent client implementations | Community | At least 1 third-party client |
| Railgun Foundation established | Leadership | Non-profit for protocol stewardship |

**Phase 3 Exit Criteria:**
- [ ] Evidence publishing works with safeguards
- [ ] Protocol can survive Railgun company disappearing
- [ ] Community governance functional
- [ ] At least one independent implementation

---

## Milestones Summary

| Milestone | Target Date | Success Criteria |
|-----------|-------------|------------------|
| **M1: MVP Launch** | Day 30 | 1:1 messaging works |
| **M2: Beta Launch** | Day 90 | 1,000 users, audit started |
| **M3: Censorship Resistant** | Day 120 | Works through DPI |
| **M4: Enterprise GA** | Day 180 | Paying enterprise customers |
| **M5: Evidence Publishing** | Month 9 | Timestamping, signing work |
| **M6: Protocol Independence** | Month 12 | Survives company loss |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Security vulnerability discovered | High | High | Bug bounty, audit, rapid response | Security |
| Apple/Google reject app | Medium | High | Direct distribution, sideloading | Client |
| Domain seizure | Low | Medium | Multiple domains, .onion | Infra |
| Key engineer departure | Medium | Medium | Documentation, knowledge sharing | Leadership |
| Funding shortfall | Medium | High | Enterprise revenue, grants | Business |
| Association with violent event | Low | Critical | Charter, PR plan, rapid response | Leadership |

---

## Resource Requirements

### Phase 1 (0–90 days)
- 2 protocol engineers
- 2 client engineers
- 1 infrastructure engineer
- 1 security engineer
- 1 product manager
- Legal counsel (contract)
- **Estimated burn:** $300K

### Phase 2 (91–180 days)
- Add: 1 enterprise engineer, 1 sales/BD
- **Estimated burn:** $400K

### Phase 3 (6–12 months)
- Add: 1 community manager, 1 documentation writer
- **Estimated burn:** $600K

**Total 12-month estimate:** $1.3M

---

## Decision Log

| Date | Decision | Rationale | Reversible? |
|------|----------|-----------|-------------|
| Jan 2026 | Signal Protocol for E2E | Industry standard, audited, trusted | No (core choice) |
| Jan 2026 | Desktop-first launch | Lower distribution risk than mobile | Yes (can pivot) |
| Jan 2026 | No voice/video MVP | Reduces complexity, metadata exposure | Yes (can add later) |
| Jan 2026 | Federated relay architecture | Survivability over simplicity | No (core choice) |
| Jan 2026 | Charter before code | Legitimacy foundation | No (values choice) |

---

## Quarterly Review Questions

Each quarter, answer:

1. **Survivability:** What would kill us? Have we reduced that risk?
2. **Legitimacy:** Would a reasonable observer see us as infrastructure or threat?
3. **Non-violence:** Have our tools been used for harm? What did we learn?
4. **User agency:** Are users more or less in control than last quarter?
5. **Protocol independence:** Could the protocol survive if we disappeared tomorrow?

---

*This roadmap is reviewed monthly and adjusted based on learnings. Major changes require Charter alignment review.*
