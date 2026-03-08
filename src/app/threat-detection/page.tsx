import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Eye,
  Wifi,
  Cpu,
  FileSearch,
  Activity,
  ShieldOff,
  Lock,
  ArrowRight,
  Zap,
  CheckCircle,
  XCircle,
  RefreshCw,
  Monitor,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Threat Shield — Local Spyware Indicator Detection',
  description:
    'How Rail Gun detects known indicators consistent with Pegasus-class compromise, including static analysis, behavioral anomaly detection, and network forensics. Open source and fully auditable.',
  alternates: {
    canonical: 'https://railgun.chat/threat-detection',
  },
  openGraph: {
    url: 'https://railgun.chat/threat-detection',
  },
};

export default function ThreatDetectionPage() {
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

        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400">
          <Shield className="h-4 w-4" />
          <span>Threat Shield</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Local Detection of Spyware Indicators &amp; Compromise Signals
        </h1>
        <p className="mt-6 text-lg text-foreground-secondary">
          Rail Gun includes <strong className="text-foreground-primary">Threat Shield</strong> — a multi-layered detection
          system that scans your device for <em>known indicators consistent with</em> Pegasus-class compromise,
          Predator, FinSpy, and other surveillance software. When enough indicators are present,
          Rail Gun escalates its response — up to refusing to operate on a device it believes is compromised.
        </p>

        {/* Warning Banner */}
        <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400">Why This Matters</h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                NSO Group&apos;s Pegasus can silently intercept messages <em>before</em> encryption by
                reading the screen, logging keystrokes, or accessing the microphone and camera.
                End-to-end encryption is meaningless if the endpoint device is compromised.
                Threat Shield addresses the endpoint security gap that no other messaging app tackles.
              </p>
            </div>
          </div>
        </div>

        {/* What Threat Shield Can and Cannot Do */}
        <div className="mt-8 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
          <h2 className="text-xl font-bold mb-4">What Threat Shield Can and Cannot Do</h2>
          <p className="text-sm text-foreground-secondary mb-4">
            Threat Shield is a <strong className="text-foreground-primary">risk engine</strong>, not a magic oracle.
            It raises the cost and complexity of attacking a Rail Gun user, but no software can guarantee
            detection of every possible compromise. Here is an honest accounting:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground-secondary">
                <strong className="text-foreground-primary">Can</strong> detect many known indicators of compromise (IOCs) and suspicious runtime conditions.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground-secondary">
                <strong className="text-foreground-primary">Can</strong> catch some forms of interception, instrumentation, hostile environment tampering, and C2 communication.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground-secondary">
                <strong className="text-foreground-primary">Can</strong> escalate response proportionally — from a warning through to full lockdown — based on composite evidence.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground-secondary">
                <strong className="text-foreground-primary">Cannot guarantee detection</strong> of every zero-click or in-memory implant. Sophisticated attackers with nation-state resources can develop novel techniques that evade known indicators.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground-secondary">
                <strong className="text-foreground-primary">A &ldquo;clear&rdquo; result is not proof</strong> that a device is clean. It means no known indicators were found at the time of the scan.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mt-10 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-secondary">Contents</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#overview" className="text-accent hover:underline">1. Detection Architecture</a></li>
            <li><a href="#layer1" className="text-accent hover:underline">2. Layer 1: Static Indicator Analysis</a></li>
            <li><a href="#layer2" className="text-accent hover:underline">3. Layer 2: Behavioral Anomaly Detection</a></li>
            <li><a href="#layer3" className="text-accent hover:underline">4. Layer 3: Network Forensics</a></li>
            <li><a href="#scoring" className="text-accent hover:underline">5. Threat Scoring Mathematics</a></li>
            <li><a href="#response" className="text-accent hover:underline">6. Automated Response</a></li>
            <li><a href="#recovery" className="text-accent hover:underline">7. Lockdown Recovery Flow</a></li>
            <li><a href="#spyware" className="text-accent hover:underline">8. Known Spyware Signatures</a></li>
            <li><a href="#operational" className="text-accent hover:underline">9. Operational Status</a></li>
            <li><a href="#privacy" className="text-accent hover:underline">10. Privacy Guarantees</a></li>
          </ol>
        </nav>

        {/* Detection Architecture */}
        <section id="overview" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold">1. Detection Architecture</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Threat Shield uses a <strong className="text-foreground-primary">three-layer defense</strong> model, inspired by the approach
            used by <a href="https://github.com/mvt-project/mvt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Amnesty International&apos;s MVT</a> (Mobile
            Verification Toolkit), adapted for real-time desktop detection.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: FileSearch,
                title: 'Layer 1: Static',
                desc: 'File artifacts, certificates, process enumeration. Runs on every app launch. ~50ms.',
                color: 'text-green-400',
              },
              {
                icon: Activity,
                title: 'Layer 2: Behavioral',
                desc: 'CPU/memory anomalies, suspicious library injection, debugger detection. Runs periodically.',
                color: 'text-yellow-400',
              },
              {
                icon: Wifi,
                title: 'Layer 3: Network',
                desc: 'DNS resolution to known C2 infrastructure, unusual connection patterns. Background monitoring.',
                color: 'text-red-400',
              },
            ].map((layer) => (
              <div key={layer.title} className="rounded-lg border border-foreground-secondary/10 bg-background-secondary p-5">
                <layer.icon className={`h-6 w-6 ${layer.color} mb-3`} />
                <h3 className="font-semibold">{layer.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{layer.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-secondary">
            Each layer produces a set of <strong className="text-foreground-primary">Threat Indicators</strong> — individual
            findings with a severity score. These are aggregated into a final <strong className="text-foreground-primary">Threat Level</strong> that
            determines the app&apos;s response.
          </p>
        </section>

        {/* Layer 1: Static Analysis */}
        <section id="layer1" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <FileSearch className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">2. Layer 1: Static Indicator Analysis</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            On every launch, Threat Shield checks for known <strong className="text-foreground-primary">Indicators of Compromise (IOCs)</strong> —
            file paths, process names, and certificate anomalies that are known signatures
            of specific spyware families.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">File Artifact Scanning</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Pegasus and similar spyware leave traces in predictable locations. These
              are derived from Amnesty International&apos;s MVT database and Citizen Lab research:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p className="text-foreground-tertiary">{'//'} macOS — Pegasus persistence via LaunchAgents</p>
              <p>~/Library/LaunchAgents/com.apple.icloud.searchpartyd.plist</p>
              <p>~/Library/LaunchAgents/com.apple.assistantd.plist</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Pegasus staging directories (from MVT forensic analysis)</p>
              <p>/private/var/tmp/BridgeHead</p>
              <p>/private/var/tmp/.spotlightextractor</p>
              <p>/tmp/.reports</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} iMessage exploit artifacts (FORCEDENTRY / FINDMYPWN)</p>
              <p>~/Library/SMS/Attachments/.com.apple.sms.plist</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Windows — Candiru / DevilsTongue</p>
              <p>C:\ProgramData\Microsoft\DeviceSync\</p>
              <p>C:\Users\Public\Downloads\.cache\</p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              The algorithm is simple but effective: for each known artifact path, check if
              the file or directory exists. If it does, emit a <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">ThreatIndicator</code> with
              the appropriate severity and spyware name.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Process Enumeration</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Threat Shield enumerates running processes and checks against known spyware
              process names:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p className="text-foreground-tertiary">{'//'} Algorithm (pseudocode)</p>
              <p>processes = exec(&quot;ps aux&quot;)  <span className="text-foreground-tertiary">{'// or tasklist on Windows'}</span></p>
              <p>for each process in processes:</p>
              <p>  for each known_signature in SPYWARE_PROCESSES:</p>
              <p>    if process.name matches known_signature:</p>
              <p>      emit ThreatIndicator(</p>
              <p>        category: &quot;known_spyware&quot;,</p>
              <p>        severity: known_signature.severity,</p>
              <p>        spywareName: known_signature.name</p>
              <p>      )</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Debugger & Instrumentation Detection</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Spyware often attaches debuggers or instrumentation frameworks (Frida, Xposed)
              to intercept function calls. Threat Shield checks for:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p className="text-foreground-tertiary">{'//'} Check for active debugger</p>
              <p>if (process.env.ELECTRON_IS_DEBUGGER) → suspicious</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Check for Frida (dynamic instrumentation)</p>
              <p>scan for &quot;frida-server&quot; in process list</p>
              <p>scan for frida-agent.dylib in loaded libraries</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Check for root/jailbreak indicators</p>
              <p>exists(&quot;/Applications/Cydia.app&quot;)</p>
              <p>exists(&quot;/usr/sbin/sshd&quot;) on mobile</p>
              <p>writable(&quot;/private/&quot;) → jailbreak indicator</p>
            </div>
          </div>
        </section>

        {/* Layer 2: Behavioral Analysis */}
        <section id="layer2" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Activity className="h-5 w-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold">3. Layer 2: Behavioral Anomaly Detection</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Advanced spyware like Pegasus may not leave static file artifacts (especially
            zero-click exploits that operate entirely in memory). Layer 2 detects anomalous
            runtime behavior that indicates active surveillance.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">CPU & Memory Anomaly Detection</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Spyware performing data exfiltration, audio/video capture, or keylogging
              consumes measurable CPU and memory. Threat Shield establishes a baseline
              and flags significant deviations:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-2">
              <p className="text-foreground-tertiary">{'//'} Statistical anomaly detection</p>
              <p>baseline_cpu = moving_average(cpu_samples, window=60s)</p>
              <p>baseline_mem = moving_average(mem_samples, window=60s)</p>
              <p className="mt-2">current_cpu = measure()</p>
              <p>deviation = |current_cpu - baseline_cpu| / stddev(cpu_samples)</p>
              <p className="mt-2">if deviation &gt; 3.0:  <span className="text-foreground-tertiary">{'// 3 sigma = 99.7% confidence'}</span></p>
              <p>  emit ThreatIndicator(</p>
              <p>    category: &quot;battery_anomaly&quot;,</p>
              <p>    severity: deviation &gt; 5.0 ? &quot;high&quot; : &quot;medium&quot;</p>
              <p>  )</p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              This uses the <strong className="text-foreground-primary">Z-score method</strong>: if the current value is more than
              3 standard deviations from the rolling mean, it&apos;s flagged. This catches background
              exfiltration that Pegasus performs in bursts to evade simple threshold checks.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Library Injection Detection</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              On macOS, spyware injects dynamic libraries into running processes. Threat Shield
              checks loaded dylibs against a whitelist:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p className="text-foreground-tertiary">{'//'} macOS: Check for injected libraries</p>
              <p>loaded_libs = exec(&quot;vmmap PID | grep .dylib&quot;)</p>
              <p>suspicious = loaded_libs.filter(lib =&gt;</p>
              <p>  !lib.starts_with(&quot;/System/&quot;) &amp;&amp;</p>
              <p>  !lib.starts_with(&quot;/usr/lib/&quot;) &amp;&amp;</p>
              <p>  !lib.starts_with(&quot;/Library/Frameworks/&quot;) &amp;&amp;</p>
              <p>  !lib.is_code_signed_by_apple()</p>
              <p>)</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Known malicious library patterns</p>
              <p>MALICIOUS_PATTERNS = [</p>
              <p>  &quot;frida-agent&quot;, &quot;substrate&quot;, &quot;cycript&quot;,</p>
              <p>  &quot;libimobiledevice&quot;, &quot;SSLKillSwitch&quot;</p>
              <p>]</p>
            </div>
          </div>
        </section>

        {/* Layer 3: Network Forensics */}
        <section id="layer3" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Wifi className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold">4. Layer 3: Network Forensics</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Pegasus and Predator communicate with Command &amp; Control (C2) servers
            to exfiltrate data. Threat Shield checks DNS resolutions and active
            connections against known C2 infrastructure from public threat intelligence.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Known C2 Infrastructure</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Sources: Amnesty International, Citizen Lab, MITRE ATT&CK, and open threat intelligence feeds.
              C2 indicators include domains, IP ranges, and TLS certificate fingerprints:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-1">
              <p className="text-foreground-tertiary">{'//'} Known C2 domains from public threat intel</p>
              <p>C2_DOMAINS = [</p>
              <p>  &quot;*.amazonaws.com.cdn77.org&quot;,     <span className="text-foreground-tertiary">{'// Pegasus CDN front'}</span></p>
              <p>  &quot;imgcache-us.azureedge.net&quot;,     <span className="text-foreground-tertiary">{'// Pegasus Azure front'}</span></p>
              <p>  &quot;pcap.digital&quot;,                  <span className="text-foreground-tertiary">{'// Known NSO domain'}</span></p>
              <p>  &quot;*.cytrox.com&quot;,                  <span className="text-foreground-tertiary">{'// Predator (Cytrox)'}</span></p>
              <p>  &quot;*.intellexa.com&quot;,               <span className="text-foreground-tertiary">{'// Predator (Intellexa)'}</span></p>
              <p>]</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">DNS Anomaly Detection</h3>
            <p className="text-sm text-foreground-secondary mb-4">
              Beyond known domains, Threat Shield detects suspicious DNS patterns that indicate
              C2 communication, even to previously unknown infrastructure:
            </p>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-2">
              <p className="text-foreground-tertiary">{'//'} Entropy-based DNS anomaly detection</p>
              <p>for each dns_query in recent_queries:</p>
              <p>  entropy = shannon_entropy(query.domain)</p>
              <p>  if entropy &gt; 4.5:  <span className="text-foreground-tertiary">{'// Random-looking domains'}</span></p>
              <p>    flag as suspicious</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Shannon entropy formula</p>
              <p>H(X) = -Σ p(xᵢ) · log₂(p(xᵢ))</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Normal domains: H ≈ 2.5-3.5</p>
              <p className="text-foreground-tertiary">{'//'} DGA domains:    H ≈ 4.0-5.0</p>
              <p className="text-foreground-tertiary">{'//'} Random/C2:      H &gt; 4.5</p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              <strong className="text-foreground-primary">Shannon entropy</strong> measures the randomness of a string.
              Domain Generation Algorithms (DGAs) used by spyware produce high-entropy domains
              like <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">a8f3k2x9m.example.com</code> that
              score significantly higher than normal domains like <code className="rounded bg-background-elevated px-1.5 py-0.5 text-xs">mail.google.com</code>.
            </p>
          </div>
        </section>

        {/* Threat Scoring */}
        <section id="scoring" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Cpu className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">5. Threat Scoring Mathematics</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Individual indicators are aggregated into a <strong className="text-foreground-primary">composite threat score</strong> using
            weighted severity classification. This prevents false positives from a single
            low-confidence indicator while ensuring high-severity findings trigger immediate action.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Severity Weights</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground-secondary/10">
                    <th className="px-3 py-2 text-left">Severity</th>
                    <th className="px-3 py-2 text-left">Weight</th>
                    <th className="px-3 py-2 text-left">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground-secondary/10 text-foreground-secondary">
                  <tr><td className="px-3 py-2 font-medium text-foreground-primary">Critical</td><td className="px-3 py-2 text-red-400 font-mono">10.0</td><td className="px-3 py-2">Pegasus staging directory found</td></tr>
                  <tr><td className="px-3 py-2 font-medium text-foreground-primary">High</td><td className="px-3 py-2 text-yellow-400 font-mono">5.0</td><td className="px-3 py-2">Known C2 domain resolved</td></tr>
                  <tr><td className="px-3 py-2 font-medium text-foreground-primary">Medium</td><td className="px-3 py-2 text-blue-400 font-mono">2.0</td><td className="px-3 py-2">CPU anomaly (3σ deviation)</td></tr>
                  <tr><td className="px-3 py-2 font-medium text-foreground-primary">Low</td><td className="px-3 py-2 text-green-400 font-mono">1.0</td><td className="px-3 py-2">Single unsigned dylib loaded</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">Composite Score Formula</h3>
            <div className="overflow-x-auto rounded-lg bg-background-elevated p-4 font-mono text-xs space-y-2">
              <p className="text-foreground-tertiary">{'//'} Aggregate all indicators into a threat score</p>
              <p>threat_score = Σ weight(indicator.severity)</p>
              <p className="mt-2 text-foreground-tertiary">{'//'} Threat Level thresholds</p>
              <p>CLEAR     : score = 0</p>
              <p>SUSPICIOUS: score ∈ [1, 5)     <span className="text-foreground-tertiary">{'// Warn user, continue'}</span></p>
              <p>PROBABLE  : score ∈ [5, 10)    <span className="text-foreground-tertiary">{'// Reduced functionality'}</span></p>
              <p>CONFIRMED : score ≥ 10         <span className="text-foreground-tertiary">{'// LOCKDOWN'}</span></p>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              A single <em>critical</em> indicator (weight 10) immediately triggers CONFIRMED.
              Multiple medium-confidence indicators can escalate to PROBABLE (e.g., CPU anomaly +
              suspicious DNS + unsigned library = 2 + 2 + 1 = 5 → PROBABLE).
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">False Positive Mitigation</h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>
                <strong className="text-foreground-primary">Decay function:</strong> Old indicators reduce in weight over time.
                A CPU spike from 10 minutes ago contributes less than one from 30 seconds ago:
              </p>
              <div className="overflow-x-auto rounded-lg bg-background-elevated p-3 font-mono text-xs">
                <p>effective_weight = base_weight × e^(-λt)</p>
                <p>where λ = 0.01, t = seconds since detection</p>
              </div>
              <p>
                <strong className="text-foreground-primary">Correlation requirement:</strong> Behavioral indicators (Layer 2)
                alone cannot exceed SUSPICIOUS level. At least one static (Layer 1) or network (Layer 3)
                indicator must be present to escalate to PROBABLE.
              </p>
              <p>
                <strong className="text-foreground-primary">Whitelist:</strong> Known legitimate security tools (antivirus, MDM
                agents, developer tools in debug mode) are excluded from process scanning.
              </p>
            </div>
          </div>
        </section>

        {/* Automated Response */}
        <section id="response" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <ShieldOff className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold">6. Automated Response</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            When a threat is detected, Rail Gun takes automatic protective action scaled
            to the threat level:
          </p>

          <div className="mt-6 space-y-4">
            {[
              {
                level: 'CLEAR',
                color: 'border-green-500/30 bg-green-500/5',
                badge: 'bg-green-500/20 text-green-400',
                response: 'Normal operation. No indicators found.',
              },
              {
                level: 'SUSPICIOUS',
                color: 'border-yellow-500/30 bg-yellow-500/5',
                badge: 'bg-yellow-500/20 text-yellow-400',
                response: 'Warning banner shown. User is advised to investigate. App continues to function. Scheduled rescan in 5 minutes.',
              },
              {
                level: 'PROBABLE',
                color: 'border-orange-500/30 bg-orange-500/5',
                badge: 'bg-orange-500/20 text-orange-400',
                response: 'Reduced mode: message sending is paused. Key operations (export, re-register) are blocked. User is strongly advised to run a full device scan with external tools.',
              },
              {
                level: 'CONFIRMED',
                color: 'border-red-500/30 bg-red-500/5',
                badge: 'bg-red-500/20 text-red-400',
                response: 'LOCKDOWN: Rail Gun enters a controlled emergency state. Message decryption is suspended and private keys are securely erased from this device. Your account, encrypted message history, and contacts are preserved server-side. Recovery on a clean device is straightforward — see the Recovery Flow section below.',
              },
            ].map((item) => (
              <div key={item.level} className={`rounded-xl border p-5 ${item.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.badge}`}>
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary">{item.response}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lockdown Recovery Flow */}
        <section id="recovery" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <RefreshCw className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold">7. Lockdown Recovery Flow</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            A CONFIRMED lockdown is a serious event — it means Rail Gun believes
            the device is compromised and has taken protective action. This is designed as a
            <strong className="text-foreground-primary"> controlled emergency procedure</strong>, not a
            self-destruct. Here is exactly what happens and how you recover.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">What Gets Wiped</h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>• <strong className="text-foreground-primary">Private encryption keys</strong> for the current device are securely erased from local storage.</p>
              <p>• <strong className="text-foreground-primary">Decrypted message cache</strong> in memory is purged immediately.</p>
              <p>• <strong className="text-foreground-primary">Active session tokens</strong> are invalidated so the compromised device cannot impersonate you.</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
            <h3 className="font-semibold mb-3 text-green-400">What Is NOT Lost</h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>• <strong className="text-foreground-primary">Your account</strong> — username, identity, and contacts remain on the server.</p>
              <p>• <strong className="text-foreground-primary">Encrypted message history</strong> — ciphertext stored server-side is untouched. Messages can be re-decrypted after key re-establishment on a clean device.</p>
              <p>• <strong className="text-foreground-primary">Community memberships</strong>, roles, and permissions.</p>
              <p>• <strong className="text-foreground-primary">Recovery codes</strong> — these are generated at registration and should be stored offline. They are your path back in.</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">How to Recover on a Clean Device</h3>
            <div className="space-y-3 text-sm text-foreground-secondary">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent shrink-0">1</span>
                <p><strong className="text-foreground-primary">Secure a clean device.</strong> Factory reset the compromised device, or use a different device entirely. Consider professional forensic analysis of the compromised hardware.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent shrink-0">2</span>
                <p><strong className="text-foreground-primary">Install Rail Gun</strong> on the clean device.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent shrink-0">3</span>
                <p><strong className="text-foreground-primary">Log in with your recovery code.</strong> This re-authenticates your identity and initiates new key generation (X3DH key bundle) for the clean device.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent shrink-0">4</span>
                <p><strong className="text-foreground-primary">New ratchet sessions</strong> are established automatically with your contacts. Forward secrecy means the old device&apos;s keys cannot decrypt future messages.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent shrink-0">5</span>
                <p><strong className="text-foreground-primary">Rotate your recovery codes</strong> from the new device as a precaution.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-400">Do You Need a Second Trusted Device?</h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  No. Recovery codes are the single recovery mechanism and are designed to work from any new device.
                  However, if you have Rail Gun active on a second device, it can serve as an additional
                  verification channel to confirm your identity during re-setup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Known Spyware */}
        <section id="spyware" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Eye className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">8. Known Spyware Signatures</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Threat Shield maintains an up-to-date database of indicators for these known
            surveillance tools:
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground-secondary/10 bg-background-elevated">
                  <th className="px-4 py-3 text-left font-semibold">Spyware</th>
                  <th className="px-4 py-3 text-left font-semibold">Vendor</th>
                  <th className="px-4 py-3 text-left font-semibold">Detection Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground-secondary/10 text-foreground-secondary">
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary">Pegasus</td>
                  <td className="px-4 py-3">NSO Group (Israel)</td>
                  <td className="px-4 py-3">File artifacts, LaunchAgent persistence, iMessage exploit traces, C2 domains</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary">Predator</td>
                  <td className="px-4 py-3">Cytrox / Intellexa</td>
                  <td className="px-4 py-3">C2 domain patterns, Chrome exploit artifacts, process injection</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary">FinSpy</td>
                  <td className="px-4 py-3">FinFisher (Germany)</td>
                  <td className="px-4 py-3">File artifacts, configuration files, known binary hashes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary">DevilsTongue</td>
                  <td className="px-4 py-3">Candiru (Israel)</td>
                  <td className="px-4 py-3">Windows registry keys, staging directories, browser exploit remnants</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary">Stalkerware</td>
                  <td className="px-4 py-3">Various commercial</td>
                  <td className="px-4 py-3">Known package names (mSpy, FlexiSPY, Cocospy, etc.), accessibility abuse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-foreground-secondary">
            The indicator database is updated regularly from public sources including{' '}
            <a href="https://github.com/mvt-project/mvt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Amnesty International MVT
            </a>,{' '}
            <a href="https://citizenlab.ca/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Citizen Lab
            </a>, and{' '}
            <a href="https://attack.mitre.org/techniques/enterprise/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              MITRE ATT&CK
            </a>.
          </p>
        </section>

        {/* Operational Status */}
        <section id="operational" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">9. Operational Status</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Security credibility requires transparency. Here are the boring, operational details that
            let you verify Threat Shield is maintained and current.
          </p>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-foreground-secondary/10">
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary whitespace-nowrap">IOC Database Last Updated</td>
                  <td className="px-4 py-3 text-foreground-secondary font-mono">2026-03-01</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary whitespace-nowrap">IOC Sources</td>
                  <td className="px-4 py-3 text-foreground-secondary">Amnesty MVT, Citizen Lab, MITRE ATT&CK, open threat intel feeds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary whitespace-nowrap">Detection Engine Version</td>
                  <td className="px-4 py-3 text-foreground-secondary font-mono">1.4.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground-primary whitespace-nowrap">Last Code Review</td>
                  <td className="px-4 py-3 text-foreground-secondary">February 2026 (internal)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-accent" />
              Platform Coverage
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground-secondary/10">
                    <th className="px-3 py-2 text-left">Platform</th>
                    <th className="px-3 py-2 text-left">Static (L1)</th>
                    <th className="px-3 py-2 text-left">Behavioral (L2)</th>
                    <th className="px-3 py-2 text-left">Network (L3)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground-secondary/10 text-foreground-secondary">
                  <tr>
                    <td className="px-3 py-2 font-medium text-foreground-primary">macOS (arm64, x64)</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-foreground-primary">Windows (x64)</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-foreground-primary">Linux (x64, AppImage / deb)</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                    <td className="px-3 py-2 text-yellow-400">Partial</td>
                    <td className="px-3 py-2 text-green-400">Full</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-foreground-tertiary">
              &ldquo;Partial&rdquo; on Linux: library injection detection varies by distribution and sandboxing model. Process enumeration and CPU/memory anomaly detection are fully supported.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-foreground-secondary/20 bg-background-secondary p-6">
            <h3 className="font-semibold mb-3">False Positive Policy</h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <p>
                Some indicators — debuggers, custom certificates, proxies like Charles, enterprise MDM agents —
                are legitimate in developer and corporate environments. Threat Shield handles this in three ways:
              </p>
              <p>• <strong className="text-foreground-primary">Whitelist:</strong> Known legitimate tools (Xcode instruments, Charles Proxy, corporate MDM agents) are excluded from process scanning by default.</p>
              <p>• <strong className="text-foreground-primary">Correlation requirement:</strong> Behavioral indicators (Layer 2) alone cannot escalate beyond SUSPICIOUS. A false-positive CPU spike will not lock you out.</p>
              <p>• <strong className="text-foreground-primary">User override:</strong> At SUSPICIOUS level, users can acknowledge and dismiss. The warning does not block app usage. Only PROBABLE and CONFIRMED restrict functionality, and those require corroborating evidence from multiple layers.</p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Lock className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-2xl font-bold">10. Privacy Guarantees</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed">
            Threat Shield was designed with the same privacy-first principles as the rest
            of Rail Gun:
          </p>

          <div className="mt-6 space-y-3">
            {[
              { icon: Zap, text: 'ALL detection runs locally on your device. No scan data is sent to any server.' },
              { icon: Lock, text: 'No telemetry, analytics, or crash reports from Threat Shield. Ever.' },
              { icon: Eye, text: 'The app does not upload file hashes, process lists, or network logs.' },
              { icon: Shield, text: 'Threat reports are stored only in local memory and cleared on app restart.' },
              { icon: FileSearch, text: 'Source code for all detection logic is open source and auditable on GitHub.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-foreground-secondary/10 bg-background-secondary p-4">
                <item.icon className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <p className="text-sm text-foreground-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-bold">Audit the Detection Code</h3>
          <p className="mt-2 text-foreground-secondary">
            Threat Shield is open source. Review the detection algorithms, indicator databases,
            and scoring logic yourself.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/ZRosserMcIntosh/railgun/tree/main/apps/desktop/src/security/threat-shield"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              View Threat Shield Source
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/encryption"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-5 py-2.5 font-semibold text-accent hover:bg-accent/10 transition-colors"
            >
              ← Encryption Mathematics
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
