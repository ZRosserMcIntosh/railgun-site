import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Key, ArrowRight, Fingerprint, RefreshCw, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Encryption Mathematics',
  description:
    'A deep dive into the mathematics behind Rail Gun\'s end-to-end encryption: X3DH key agreement, Double Ratchet, Curve25519, AES-256-GCM, and how they combine to protect your messages.',
  alternates: {
    canonical: 'https://railgun.app/encryption',
  },
  openGraph: {
    url: 'https://railgun.app/encryption',
  },
};

export default function EncryptionPage() {
  return (
    <main className="min-h-screen bg-background-primary py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
          <Lock className="h-4 w-4" />
          <span>Cryptography</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The Mathematics of End-to-End Encryption
        </h1>
        <p className="mt-6 text-lg text-foreground-secondary">
          Rail Gun uses the Signal Protocol — the gold standard in encrypted messaging.
          This page explains the actual mathematics that protect every message you send.
        </p>

        {/* Table of Contents */}
        <nav className="mt-10 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-secondary">Contents</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#overview" className="text-accent hover:underline">1. Protocol Overview</a></li>
            <li><a href="#curve25519" className="text-accent hover:underline">2. Curve25519 — The Elliptic Curve</a></li>
            <li><a href="#x3dh" className="text-accent hover:underline">3. X3DH — Extended Triple Diffie-Hellman</a></li>
            <li><a href="#double-ratchet" className="text-accent hover:underline">4. The Double Ratchet Algorithm</a></li>
            <li><a href="#aes-gcm" className="text-accent hover:underline">5. AES-256-GCM — Message Encryption</a></li>
            <li><a href="#forward-secrecy" className="text-accent hover:underline">6. Perfect Forward Secrecy</a></li>
            <li><a href="#relay" className="text-accent hover:underline">7. Relay-Only Architecture</a></li>
            <li><a href="#summary" className="text-accent hover:underline">8. Security Properties Summary</a></li>
          </ol>
        </nav>

        {/* Protocol Overview */}
        <section id="overview" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">1. Protocol Overview</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            The Signal Protocol combines three cryptographic primitives to achieve
            end-to-end encryption with perfect forward secrecy and post-compromise security:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Key,
                title: 'X3DH',
                desc: 'Establishes a shared secret between two parties who have never communicated, even if one is offline.',
              },
              {
                icon: RefreshCw,
                title: 'Double Ratchet',
                desc: 'Derives unique encryption keys for every single message, providing forward secrecy and break-in recovery.',
              },
              {
                icon: Lock,
                title: 'AES-256-GCM',
                desc: 'Encrypts the actual message content using the keys produced by the ratchet, with authenticated encryption.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-foreground-secondary/10 bg-background-secondary p-5">
                <item.icon className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-foreground-secondary leading-relaxed">
            These three layers work together. X3DH bootstraps the first shared secret.
            The Double Ratchet continuously evolves keys so that compromising one key
            reveals nothing about past or future messages. AES-256-GCM provides the
            actual symmetric encryption and authentication for each message.
          </p>
        </section>

        {/* Curve25519 */}
        <section id="curve25519" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Fingerprint className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">2. Curve25519 — The Elliptic Curve</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            All key generation and key agreement in Rail Gun is built on{' '}
            <strong className="text-foreground-primary">Curve25519</strong>, an elliptic curve
            designed by Daniel J. Bernstein for high-speed Diffie-Hellman key exchange.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">The Curve Equation</h3>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-sm">
              <p className="text-accent">y² = x³ + 486662x² + x</p>
              <p className="mt-2 text-foreground-secondary">over the prime field 𝔽ₚ where p = 2²⁵⁵ − 19</p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
              The prime <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">2²⁵⁵ − 19</code> was
              chosen because it enables extremely fast modular arithmetic. The coefficient <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">486662</code> was
              chosen to be the smallest value that produces a safe curve with the required security properties.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Key Generation</h3>
            <div className="space-y-3 text-sm text-foreground-secondary leading-relaxed">
              <p>
                <strong className="text-foreground-primary">1. Private key:</strong>{' '}
                Generate 32 random bytes using a CSPRNG (cryptographically secure pseudorandom number generator).
                Clamp the key by clearing the lowest 3 bits and the highest bit, and setting the second-highest bit.
                This ensures the key is a multiple of 8 and in the valid range.
              </p>
              <div className="overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
                <p>a = random(32 bytes)</p>
                <p>a[0]  &amp;= 248    <span className="text-foreground-tertiary">{'// Clear low 3 bits'}</span></p>
                <p>a[31] &amp;= 127    <span className="text-foreground-tertiary">{'// Clear high bit'}</span></p>
                <p>a[31] |= 64     <span className="text-foreground-tertiary">{'// Set second-highest bit'}</span></p>
              </div>
              <p>
                <strong className="text-foreground-primary">2. Public key:</strong>{' '}
                Compute the scalar multiplication of the private key with the base point <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">G = 9</code>.
              </p>
              <div className="overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
                <p>A = a · G <span className="text-foreground-tertiary">{'// Scalar multiplication on Curve25519'}</span></p>
              </div>
              <p>
                The security relies on the <strong className="text-foreground-primary">Elliptic Curve Discrete Logarithm Problem (ECDLP)</strong>:
                given <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">A</code> and <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">G</code>,
                it is computationally infeasible to recover <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">a</code>.
                Curve25519 provides approximately <strong className="text-foreground-primary">128 bits of security</strong>.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Diffie-Hellman Key Exchange</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Two parties (Alice and Bob) can compute a shared secret without ever
              transmitting it:
            </p>
            <div className="mt-3 overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p><span className="text-success">Alice:</span> a (private), A = a·G (public)</p>
              <p><span className="text-accent">Bob:</span>   b (private), B = b·G (public)</p>
              <p className="pt-2 border-t border-foreground-secondary/10">
                <span className="text-success">Alice computes:</span> S = a · B = a · (b·G)
              </p>
              <p>
                <span className="text-accent">Bob computes:</span>   S = b · A = b · (a·G)
              </p>
              <p className="pt-2 border-t border-foreground-secondary/10 text-foreground-tertiary">
                Both arrive at S = ab·G — the same shared secret
              </p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              An eavesdropper who knows <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">A</code> and <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">B</code> (both public)
              cannot compute <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">S</code> without
              solving the ECDLP. This is the <strong className="text-foreground-primary">Computational Diffie-Hellman (CDH)</strong> assumption.
            </p>
          </div>
        </section>

        {/* X3DH */}
        <section id="x3dh" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Key className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">3. X3DH — Extended Triple Diffie-Hellman</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            X3DH solves a hard problem: how do two people establish an encrypted session
            when one of them is offline? Traditional Diffie-Hellman requires both parties
            to be online. X3DH uses <strong className="text-foreground-primary">pre-uploaded key bundles</strong> to enable asynchronous key agreement.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-4">Key Types</h3>
            <div className="space-y-4">
              {[
                { name: 'Identity Key (IK)', desc: 'Long-term Curve25519 key pair. Generated once, identifies the user cryptographically. Never changes unless the user re-registers.', color: 'text-red-400' },
                { name: 'Signed Pre-Key (SPK)', desc: 'Medium-term Curve25519 key pair, signed by the Identity Key. Rotated periodically (e.g., weekly). The signature proves it belongs to the identity key holder.', color: 'text-yellow-400' },
                { name: 'One-Time Pre-Key (OPK)', desc: 'Ephemeral Curve25519 key pairs uploaded in batches. Each is used once then deleted. Provides an extra layer of forward secrecy for the initial message.', color: 'text-green-400' },
                { name: 'Ephemeral Key (EK)', desc: 'A fresh Curve25519 key pair generated by the sender for each new session. Never stored server-side.', color: 'text-blue-400' },
              ].map((key) => (
                <div key={key.name} className="flex gap-3">
                  <div className={`mt-2 h-2 w-2 rounded-full ${key.color} shrink-0`} />
                  <div>
                    <p className="font-medium text-sm">{key.name}</p>
                    <p className="text-sm text-foreground-secondary">{key.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-4">The X3DH Handshake</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              When Alice wants to message Bob (who may be offline), she fetches Bob&apos;s
              pre-key bundle from the server and performs four Diffie-Hellman computations:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-2">
              <p className="text-foreground-tertiary">{'//'} Alice has: IKₐ (her identity key), EKₐ (fresh ephemeral)</p>
              <p className="text-foreground-tertiary">{'//'} Bob published: IKᵦ, SPKᵦ, OPKᵦ</p>
              <p className="pt-2">DH1 = DH(IKₐ, SPKᵦ)    <span className="text-foreground-tertiary">{'// Alice&apos;s identity ↔ Bob&apos;s signed pre-key'}</span></p>
              <p>DH2 = DH(EKₐ, IKᵦ)     <span className="text-foreground-tertiary">{'// Alice&apos;s ephemeral ↔ Bob&apos;s identity'}</span></p>
              <p>DH3 = DH(EKₐ, SPKᵦ)    <span className="text-foreground-tertiary">{'// Alice&apos;s ephemeral ↔ Bob&apos;s signed pre-key'}</span></p>
              <p>DH4 = DH(EKₐ, OPKᵦ)    <span className="text-foreground-tertiary">{'// Alice&apos;s ephemeral ↔ Bob&apos;s one-time pre-key'}</span></p>
              <p className="pt-3 border-t border-foreground-secondary/10">
                SK = KDF(DH1 || DH2 || DH3 || DH4)
              </p>
              <p className="text-foreground-tertiary pt-1">
                {'//'} SK is the shared secret, derived via HKDF-SHA-256
              </p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-foreground-secondary">
              <p>
                <strong className="text-foreground-primary">Why four DH operations?</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>DH1</strong> provides mutual authentication (both identity keys involved)</li>
                <li><strong>DH2</strong> ensures the ephemeral key is tied to Bob&apos;s identity</li>
                <li><strong>DH3</strong> provides forward secrecy via the ephemeral key</li>
                <li><strong>DH4</strong> provides additional forward secrecy. If no OPK is available, X3DH still works with just DH1–DH3</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">KDF — Key Derivation Function</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              The raw DH outputs are combined using <strong className="text-foreground-primary">HKDF-SHA-256</strong> (HMAC-based
              Key Derivation Function). HKDF extracts entropy from the concatenated DH
              outputs and expands it into a uniformly random shared secret:
            </p>
            <div className="mt-3 overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
              <p>PRK = HKDF-Extract(salt=&quot;&quot;, input=DH1||DH2||DH3||DH4)</p>
              <p>SK  = HKDF-Expand(PRK, info=&quot;RailGunX3DH&quot;, length=32)</p>
            </div>
          </div>
        </section>

        {/* Double Ratchet */}
        <section id="double-ratchet" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <RefreshCw className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">4. The Double Ratchet Algorithm</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            After X3DH establishes the initial shared secret, the <strong className="text-foreground-primary">Double Ratchet</strong> takes
            over. It uses two interlocking &quot;ratchets&quot; to derive a new unique key for
            every message, ensuring that even if one key is compromised, past and future
            messages remain secure.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
              <h3 className="font-semibold mb-3 text-success">DH Ratchet (Asymmetric)</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Each time the conversation direction changes (Alice → Bob, then Bob → Alice),
                a new Diffie-Hellman key exchange occurs using fresh ephemeral keys. This
                &quot;ratchets&quot; the root key forward:
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
                <p>dh_out = DH(my_ratchet_key, their_ratchet_key)</p>
                <p>root_key, chain_key = KDF(root_key, dh_out)</p>
              </div>
              <p className="mt-3 text-xs text-foreground-tertiary">
                This provides <strong>post-compromise security</strong>: even if an attacker steals the
                current state, they lose access once a new DH ratchet step occurs.
              </p>
            </div>
            <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
              <h3 className="font-semibold mb-3 text-accent">Symmetric Ratchet (Hash Chain)</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Between DH ratchet steps, a hash-based ratchet derives a new message
                key from the chain key for each message:
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
                <p>message_key = HMAC-SHA256(chain_key, 0x01)</p>
                <p>chain_key   = HMAC-SHA256(chain_key, 0x02)</p>
              </div>
              <p className="mt-3 text-xs text-foreground-tertiary">
                The old chain key is deleted after each step. The message key is used to
                encrypt exactly one message, then deleted. This is the <strong>forward secrecy</strong> mechanism.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Ratchet Progression</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Visualized, the Double Ratchet looks like this. Each arrow is a one-way function
              — you can go forward but never backward:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs leading-relaxed">
              <p className="text-foreground-tertiary">Root Key Chain:</p>
              <p>RK₀ ──DH──→ RK₁ ──DH──→ RK₂ ──DH──→ RK₃ ...</p>
              <p className="mt-2 text-foreground-tertiary">Each RK step produces a Chain Key:</p>
              <p> ↓            ↓            ↓</p>
              <p>CK₀          CK₁          CK₂</p>
              <p> ↓            ↓            ↓</p>
              <p className="text-foreground-tertiary">Each CK step produces Message Keys:</p>
              <p>CK₀→MK₀     CK₁→MK₃     CK₂→MK₅</p>
              <p>CK₀→MK₁     CK₁→MK₄     CK₂→MK₆</p>
              <p>CK₀→MK₂                  CK₂→MK₇</p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              Each <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">MKₙ</code> encrypts
              exactly one message. After use, it is deleted. Even if an attacker obtains <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">MK₄</code>,
              they cannot derive <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">MK₃</code> or <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">MK₅</code>.
            </p>
          </div>
        </section>

        {/* AES-256-GCM */}
        <section id="aes-gcm" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Lock className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">5. AES-256-GCM — Message Encryption</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Each message key from the Double Ratchet is used with <strong className="text-foreground-primary">AES-256-GCM</strong> (Advanced Encryption Standard
            in Galois/Counter Mode) to encrypt the actual message content.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">How AES-256-GCM Works</h3>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-2">
              <p className="text-foreground-tertiary">{'//'} Inputs</p>
              <p>key    = message_key         <span className="text-foreground-tertiary">{'// 256 bits from ratchet'}</span></p>
              <p>nonce  = random(12 bytes)    <span className="text-foreground-tertiary">{'// 96-bit unique nonce'}</span></p>
              <p>aad    = header_data         <span className="text-foreground-tertiary">{'// Authenticated but not encrypted'}</span></p>
              <p>plain  = message_content     <span className="text-foreground-tertiary">{'// The actual plaintext'}</span></p>
              <p className="pt-2 border-t border-foreground-secondary/10 text-foreground-tertiary">{'//'} Output</p>
              <p>(ciphertext, tag) = AES-256-GCM(key, nonce, aad, plain)</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-foreground-secondary">
              <p><strong className="text-foreground-primary">Confidentiality:</strong> AES-256 encrypts the plaintext in counter mode. 256-bit keys mean 2²⁵⁶ possible keys — far beyond brute force even with quantum computers using Grover&apos;s algorithm (which reduces effective security to 128 bits).</p>
              <p><strong className="text-foreground-primary">Integrity:</strong> GCM produces a 128-bit authentication tag using GHASH (a polynomial hash in GF(2¹²⁸)). This tag covers both the ciphertext and the additional authenticated data (AAD), detecting any tampering.</p>
              <p><strong className="text-foreground-primary">AAD:</strong> The message header (sender info, timestamps, ratchet public keys) is authenticated but not encrypted, so the protocol can route messages without decrypting them.</p>
            </div>
          </div>
        </section>

        {/* Forward Secrecy */}
        <section id="forward-secrecy" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">6. Perfect Forward Secrecy</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Perfect Forward Secrecy (PFS) means that compromising long-term keys does not
            compromise past session keys. Rail Gun achieves PFS through two mechanisms:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
              <h3 className="font-semibold mb-2">Ephemeral Keys in X3DH</h3>
              <p className="text-sm text-foreground-secondary">
                The sender generates a fresh ephemeral key pair for every new session.
                After the X3DH handshake, the private ephemeral key is deleted. Even if
                an attacker later steals both parties&apos; identity keys, they cannot reconstruct
                the session secret because the ephemeral private key no longer exists.
              </p>
            </div>
            <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
              <h3 className="font-semibold mb-2">Ratchet Key Deletion</h3>
              <p className="text-sm text-foreground-secondary">
                The Double Ratchet deletes old chain keys and message keys after use.
                The KDF chain is a one-way function — given <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">CKₙ</code>,
                you can compute <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">CKₙ₊₁</code> but
                not <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">CKₙ₋₁</code>.
                This means a key compromise at time T reveals nothing sent before T.
              </p>
            </div>
            <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
              <h3 className="font-semibold mb-2">Post-Compromise Security</h3>
              <p className="text-sm text-foreground-secondary">
                The DH ratchet also provides <em>future secrecy</em>: even if an attacker compromises
                the current session state, the next DH ratchet step introduces new randomness
                that the attacker doesn&apos;t have, locking them out of future messages. No other
                major messaging protocol offers this property.
              </p>
            </div>
          </div>
        </section>

        {/* Relay Architecture */}
        <section id="relay" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <ArrowRight className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">7. Relay-Only Architecture</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Rail Gun uses a <strong className="text-foreground-primary">relay-only</strong> server model, similar to Signal.
            The server never stores message content — not even encrypted ciphertexts.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">What the Server Sees</h3>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-medium text-success mb-2">✓ Server stores:</p>
                <ul className="space-y-1 text-foreground-secondary">
                  <li>• Public key bundles (IK, SPK, OPK)</li>
                  <li>• User registration info</li>
                  <li>• Community/channel metadata</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-red-400 mb-2">✗ Server never stores:</p>
                <ul className="space-y-1 text-foreground-secondary">
                  <li>• Message content (encrypted or plain)</li>
                  <li>• Private keys</li>
                  <li>• Session state or ratchet keys</li>
                  <li>• Message history</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              Messages are relayed to online recipients in real-time via WebSocket. For offline
              devices, encrypted envelopes are queued in Redis with a 30-day TTL, then permanently
              deleted. Message history is stored only on your device using IndexedDB (Dexie.js).
            </p>
          </div>
        </section>

        {/* Summary */}
        <section id="summary" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <ShieldCheck className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-2xl font-bold">8. Security Properties Summary</h2>
          </div>

          <div className="rounded-xl border border-foreground-secondary/20 bg-background-secondary overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground-secondary/10 bg-background-elevated">
                  <th className="px-4 py-3 text-left font-semibold">Property</th>
                  <th className="px-4 py-3 text-left font-semibold">Mechanism</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground-secondary/10">
                {[
                  { prop: 'End-to-End Encryption', mech: 'Signal Protocol (X3DH + Double Ratchet + AES-256-GCM)', status: '✓' },
                  { prop: 'Perfect Forward Secrecy', mech: 'Ephemeral keys + ratchet key deletion', status: '✓' },
                  { prop: 'Post-Compromise Security', mech: 'DH ratchet introduces new entropy on each turn', status: '✓' },
                  { prop: 'Deniable Authentication', mech: 'X3DH — no cryptographic proof of who sent a message', status: '✓' },
                  { prop: 'Asynchronous Key Agreement', mech: 'X3DH pre-key bundles enable offline key exchange', status: '✓' },
                  { prop: 'No Server-Side Storage', mech: 'Relay-only architecture, IndexedDB client-side storage', status: '✓' },
                  { prop: 'Quantum Resistance', mech: 'AES-256 provides 128-bit post-quantum security (Grover)', status: 'Partial' },
                  { prop: 'Open Source', mech: 'Full source code on GitHub for public audit', status: '✓' },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="px-4 py-3 font-medium">{row.prop}</td>
                    <td className="px-4 py-3 text-foreground-secondary">{row.mech}</td>
                    <td className="px-4 py-3">
                      <span className={row.status === '✓' ? 'text-success font-bold' : 'text-yellow-400'}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-bold">Want to see the code?</h3>
          <p className="mt-2 text-foreground-secondary">
            Rail Gun is open source. Audit the cryptographic implementation yourself.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/ZRosserMcIntosh/railgun/tree/main/apps/desktop/src/lib"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              View Crypto Source
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/threat-detection"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-5 py-2.5 font-semibold text-accent hover:bg-accent/10 transition-colors"
            >
              Threat Detection Math →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
