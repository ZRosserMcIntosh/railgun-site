import { Shield, CheckCircle, AlertTriangle, Terminal } from 'lucide-react';

const securityFeatures = [
  'Signal Protocol (X3DH + Double Ratchet)',
  'Perfect Forward Secrecy (PFS)',
  'Extended Triple Diffie-Hellman (X3DH)',
  'Double Ratchet Algorithm (KDF Chain)',
  'libsodium / NaCl (Curve25519, ChaCha20-Poly1305)',
  'HMAC-based Key Derivation Function (HKDF)',
  'Local key generation and storage (never transmitted)',
  'Open source and auditable (GitHub)',
  'No phone number required',
  'Metadata minimization (routing only)',
  'Forward Secrecy & Backward Secrecy',
  'Deniable Authentication',
];

export function Security() {
  return (
    <section id="security" className="bg-background-secondary py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Security Overview */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm text-success">
              <Shield className="h-4 w-4" />
              <span>Security Built-In</span>
            </div>
            <h2 className="section-title">
              Your messages are truly private
            </h2>
            <p className="section-subtitle">
              Rail Gun uses the same encryption protocol trusted by billions of
              users worldwide. Your private keys are generated locally and never
              touch our servers.
            </p>

            <ul className="mt-8 space-y-3">
              {securityFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-foreground-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Verify Downloads */}
          <div className="rounded-xl bg-background-primary p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Verify Your Download</h3>
            </div>
            <p className="text-sm text-foreground-secondary">
              Always verify downloads to ensure they haven&apos;t been tampered with.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  1. Import our GPG key:
                </p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="font-mono text-xs text-foreground-secondary">
                    gpg --keyserver keys.openpgp.org --recv-keys [KEY_ID]
                  </code>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  2. Verify the signature:
                </p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="font-mono text-xs text-foreground-secondary">
                    gpg --verify SHA256SUMS.txt.asc SHA256SUMS.txt
                  </code>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">3. Check the checksum:</p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="whitespace-pre font-mono text-xs text-foreground-secondary">
                    {`# macOS/Linux
sha256sum -c SHA256SUMS.txt --ignore-missing

# Windows PowerShell
Get-FileHash Rail-Gun-*.exe | Format-List`}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-foreground-secondary">
              <Terminal className="h-4 w-4" />
              <span>
                Full checksums available in{' '}
                <a href="/SHA256SUMS.txt" className="text-accent hover:underline">
                  SHA256SUMS.txt
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
