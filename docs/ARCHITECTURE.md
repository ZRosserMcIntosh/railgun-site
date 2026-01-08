# Railgun System Architecture

**Version 1.0 — January 2026**

---

## Architectural Doctrine

Railgun uses **strict layer separation** to achieve three goals simultaneously:
1. **Survivability**: The core protocol cannot be killed by attacking the business.
2. **Legitimacy**: Commercial and compliance pressures cannot corrupt the protocol.
3. **User Sovereignty**: No operator possesses the keys to user data.

---

## Layer Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         USER SOVEREIGNTY BOUNDARY                           │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         USER DEVICE                                 │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │   │
│   │  │ Private Keys │  │ Local State  │  │ Plaintext Messages       │   │   │
│   │  │ (never leave │  │ (contacts,   │  │ (decrypted only here)    │   │   │
│   │  │  device)     │  │  settings)   │  │                          │   │   │
│   │  └──────────────┘  └──────────────┘  └──────────────────────────┘   │   │
│   │                                                                     │   │
│   │  ┌──────────────────────────────────────────────────────────────┐   │   │
│   │  │                    RAILGUN CLIENT                            │   │   │
│   │  │  • Signal Protocol (X3DH + Double Ratchet)                   │   │   │
│   │  │  • Local encryption/decryption                               │   │   │
│   │  │  • Key management & rotation                                 │   │   │
│   │  │  • Secure deletion                                           │   │   │
│   │  └──────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                              │ Encrypted blobs only                         │
│                              ▼                                              │
└─────────────────────────────────────────────────────────────────────────────┘

                               │
                               │ TLS + Certificate Pinning
                               ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         SERVICES LAYER (Optional)                           │
│                      "The Bridge — Bankable & Mortal"                       │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     ENTERPRISE SERVICES                             │   │
│   │  • Push notification relay (payload-blind)                          │   │
│   │  • High-availability routing                                        │   │
│   │  • Compliance interfaces (legal interception → encrypted blobs)     │   │
│   │  • Analytics (aggregate, anonymized)                                │   │
│   │  • Premium features (storage, bandwidth, SLA)                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     COMPLIANCE BOUNDARY                             │   │
│   │  • Lawful intercept: can only produce encrypted blobs               │   │
│   │  • Subpoena response: metadata only (sender, recipient, timestamp)  │   │
│   │  • Data retention: configurable per jurisdiction, Services only     │   │
│   │  • Takedown: can remove content from Services, cannot affect Core   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                              │ Can be disabled/destroyed                    │
│                              │ without killing the protocol                 │
│                              ▼                                              │
└─────────────────────────────────────────────────────────────────────────────┘

                               │
                               │ Federated protocol
                               ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         SOVEREIGN CORE (Protocol)                           │
│                    "The Road — Neutral & Unkillable"                        │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     RELAY NETWORK                                   │   │
│   │  • Federated relay nodes (anyone can run one)                       │   │
│   │  • End-to-end encrypted message routing                             │   │
│   │  • No content visibility (ChaCha20-Poly1305 blobs)                  │   │
│   │  • Minimal metadata (routing headers only)                          │   │
│   │  • Store-and-forward with expiration                                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     KEY DISTRIBUTION                                │   │
│   │  • Prekey bundles (public keys only)                                │   │
│   │  • Identity verification (safety numbers / QR codes)                │   │
│   │  • No key escrow (keys exist only on user devices)                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     PROTOCOL SPECIFICATION                          │   │
│   │  • Open, documented, forkable                                       │   │
│   │  • Reference implementation (open source)                           │   │
│   │  • Interoperability requirements                                    │   │
│   │  • Community governance for changes                                 │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Message Sending

```
┌──────────────┐                                           ┌──────────────┐
│   SENDER     │                                           │  RECIPIENT   │
│   DEVICE     │                                           │   DEVICE     │
└──────┬───────┘                                           └──────▲───────┘
       │                                                          │
       │ 1. Compose plaintext                                     │
       │ 2. Encrypt with Signal Protocol                          │
       │    (recipient's public key + ephemeral keys)             │
       │ 3. Produce encrypted blob                                │
       │                                                          │
       ▼                                                          │
┌──────────────────────────────────────────────────────────────────┐
│                        ENCRYPTED BLOB                            │
│  • ChaCha20-Poly1305 ciphertext                                  │
│  • Routing header (recipient ID, timestamp, TTL)                 │
│  • No plaintext, no sender identity in payload                   │
└──────────────────────────────────────────────────────────────────┘
       │                                                          │
       │                                                          │
       ▼                                                          │
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  RELAY NODE A   │────▶│  RELAY NODE B   │────▶│  RELAY NODE C   │
│  (entry)        │     │  (transit)      │     │  (delivery)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
       │                        │                       │
       │                        │                       │
       │  Sees: routing header  │                       │
       │  Cannot see: content   │                       │
       │  Cannot decrypt: blob  │                       │
       │                        │                       │
       │                                                │
       │                                                ▼
       │                                   ┌──────────────────────┐
       │                                   │ 4. Receive blob      │
       │                                   │ 5. Decrypt with      │
       │                                   │    private key       │
       │                                   │ 6. Display plaintext │
       │                                   └──────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          WHAT OPERATORS SEE                                 │
│                                                                             │
│  Relay Operators:     Encrypted blob + routing header (no content)          │
│  Services Layer:      Encrypted blob + metadata (no content)                │
│  Railgun (company):   Aggregate statistics (no individual content)          │
│  Law Enforcement:     Encrypted blob on subpoena (cannot decrypt)           │
│  Sender/Recipient:    Full plaintext (only parties with keys)               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Evidence Publishing (High-Power Feature)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       EVIDENCE PUBLISHING FLOW                           │
│                   (Requires explicit user activation)                    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   PUBLISHER  │
│   DEVICE     │
└──────┬───────┘
       │
       │ 1. User explicitly enables "Broadcast Mode"
       │ 2. User acknowledges: "This will be public and permanent"
       │ 3. User signs content with identity key (optional: anonymous)
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         SIGNED EVIDENCE PACKAGE                          │
│  • Content hash (SHA-256)                                                │
│  • Timestamp (cryptographic, third-party witnessed)                      │
│  • Publisher signature (identity-linked OR anonymous)                    │
│  • Distribution manifest                                                 │
└──────────────────────────────────────────────────────────────────────────┘
       │
       │ Distributed to multiple independent archives
       │
       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  ARCHIVE A      │     │  ARCHIVE B      │     │  ARCHIVE C      │
│  (Railgun-run)  │     │  (Third-party)  │     │  (User-hosted)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
       │                        │                       │
       │  Any archive can be    │                       │
       │  taken down without    │                       │
       │  destroying content    │                       │
       │                        │                       │
       ▼                        ▼                       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         PUBLIC VERIFICATION                              │
│  • Anyone can verify signature                                           │
│  • Anyone can verify timestamp                                           │
│  • Content hash proves integrity                                         │
│  • Multiple archives prove persistence                                   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Responsibilities

### User Sovereignty Boundary
| Component | Responsibility | Data Held |
|-----------|---------------|-----------|
| Private Keys | Identity, message decryption | Long-term identity key, prekeys |
| Local State | Contacts, preferences, history | Decrypted message history |
| Client App | Encryption, UI, key management | Session state |

### Services Layer (Optional, Killable)
| Component | Responsibility | Data Held |
|-----------|---------------|-----------|
| Push Relay | Notification delivery | Device tokens (no content) |
| HA Routing | Reliable message delivery | Encrypted blobs (transient) |
| Compliance | Legal response capability | Metadata logs (configurable) |
| Enterprise | Premium features, SLA | Account data, billing |

### Sovereign Core (Required, Unkillable)
| Component | Responsibility | Data Held |
|-----------|---------------|-----------|
| Relay Network | Message routing | Encrypted blobs (transient) |
| Key Distribution | Public key exchange | Prekey bundles (public only) |
| Protocol Spec | Interoperability | Documentation (public) |

---

## Survivability Analysis

| Threat | Impact on Services | Impact on Core | User Impact |
|--------|-------------------|----------------|-------------|
| Railgun company shutdown | Services unavailable | Core continues | Switch to community relays |
| Server seizure | Encrypted blobs captured | Federated nodes continue | Messages unreadable to adversary |
| Legal injunction | Compliance in jurisdiction | Other jurisdictions continue | Route around |
| Funding loss | Premium features end | Open source continues | Community maintenance |
| Key compromise (server) | N/A (no server keys) | N/A (no server keys) | Only affects compromised user |
| Key compromise (user) | N/A | N/A | Forward secrecy limits damage |

---

## Security Boundaries

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  TRUST BOUNDARY 1: User Device                                              │
│  ────────────────────────────────────────────────────────────────────────   │
│  Inside: Private keys, plaintext messages, decryption capability            │
│  Outside: Everyone else                                                     │
│  Assumption: Device is not compromised                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRUST BOUNDARY 2: Encrypted Transport                                      │
│  ────────────────────────────────────────────────────────────────────────   │
│  Inside: TLS-protected channel to relay                                     │
│  Outside: Network observers                                                 │
│  Assumption: TLS is not broken, certificate pinning prevents MITM           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRUST BOUNDARY 3: Relay Operators                                          │
│  ────────────────────────────────────────────────────────────────────────   │
│  Inside: Routing metadata, encrypted blobs                                  │
│  Outside: Message content, user identities (beyond routing ID)              │
│  Assumption: Operators are honest-but-curious, not actively malicious       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRUST BOUNDARY 4: Services Layer                                           │
│  ────────────────────────────────────────────────────────────────────────   │
│  Inside: Account metadata, billing, compliance logs                         │
│  Outside: Message content (encrypted blobs only)                            │
│  Assumption: Services may be compelled to produce data they possess         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Cryptographic Stack

| Layer | Algorithm | Purpose |
|-------|-----------|---------|
| Identity | Curve25519 | Long-term identity keys |
| Key Exchange | X3DH | Initial session establishment |
| Session | Double Ratchet | Per-message key derivation |
| Encryption | ChaCha20-Poly1305 | Message confidentiality + integrity |
| Hashing | SHA-256 | Content hashing, key derivation |
| KDF | HKDF | Key derivation from shared secrets |
| Signatures | Ed25519 | Identity verification, evidence signing |

---

## Non-Functional Requirements

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| Message Latency | < 500ms (p95) | Usable real-time communication |
| Availability | 99.9% (Services), N/A (Core) | Services have SLA, Core is federated |
| Encryption Overhead | < 10% | Negligible performance impact |
| Key Rotation | Every message (ratchet) | Forward secrecy |
| Data Retention | 0 days (Core), configurable (Services) | Minimal footprint |
| Audit Frequency | Annual (third-party) | Legitimacy maintenance |

---

*This architecture document is versioned alongside the protocol specification. Changes require community review.*
