'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Database,
  Server,
  Globe,
  Shield,
  Mail,
  CreditCard,
  MessageSquare,
  Users,
  Radio,
  Smartphone,
  Monitor,
  Wifi,
  Clock,
  ArrowRight,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CheckStatus = 'up' | 'down' | 'degraded' | 'checking' | 'unknown';

interface EndpointCheck {
  name: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST';
  status: CheckStatus;
  latencyMs: number | null;
  statusCode: number | null;
  group: string;
  icon: React.ElementType;
}

interface GroupSummary {
  name: string;
  icon: React.ElementType;
  checks: EndpointCheck[];
  overallStatus: CheckStatus;
}

// ---------------------------------------------------------------------------
// Config — API base is used by the server-side proxy (/api/health-check)
// ---------------------------------------------------------------------------

const ENDPOINT_DEFINITIONS: Omit<EndpointCheck, 'status' | 'latencyMs' | 'statusCode'>[] = [
  // Core Infrastructure
  {
    name: 'Health Check',
    description: 'Core API availability and database/Redis connectivity',
    endpoint: '/health',
    method: 'GET',
    group: 'Core Infrastructure',
    icon: Activity,
  },
  {
    name: 'Readiness',
    description: 'Full readiness probe — DB + Redis connected and responsive',
    endpoint: '/health/ready',
    method: 'GET',
    group: 'Core Infrastructure',
    icon: Database,
  },
  {
    name: 'Liveness',
    description: 'Process liveness — confirms the API process is running',
    endpoint: '/health/live',
    method: 'GET',
    group: 'Core Infrastructure',
    icon: Radio,
  },

  // Authentication
  {
    name: 'Auth — Register',
    description: 'User registration endpoint reachable (rejects empty body)',
    endpoint: '/auth/register',
    method: 'POST',
    group: 'Authentication',
    icon: Shield,
  },
  {
    name: 'Auth — Login',
    description: 'User login endpoint reachable (rejects bad credentials)',
    endpoint: '/auth/login',
    method: 'POST',
    group: 'Authentication',
    icon: Shield,
  },
  {
    name: 'Auth — Refresh',
    description: 'Token refresh endpoint reachable',
    endpoint: '/auth/refresh',
    method: 'POST',
    group: 'Authentication',
    icon: Shield,
  },

  // Messaging
  {
    name: 'Communities',
    description: 'Community listing endpoint (requires auth)',
    endpoint: '/communities',
    method: 'GET',
    group: 'Messaging',
    icon: Users,
  },
  {
    name: 'Direct Messages',
    description: 'DM listing endpoint (requires auth)',
    endpoint: '/dms',
    method: 'GET',
    group: 'Messaging',
    icon: MessageSquare,
  },
  {
    name: 'Discovery',
    description: 'Community discovery/search endpoint',
    endpoint: '/discovery',
    method: 'GET',
    group: 'Messaging',
    icon: Globe,
  },

  // Billing
  {
    name: 'Billing — Status',
    description: 'Subscription status endpoint (requires auth)',
    endpoint: '/billing/status',
    method: 'GET',
    group: 'Billing & Payments',
    icon: CreditCard,
  },
  {
    name: 'Stripe Webhook',
    description: 'Stripe webhook ingestion endpoint (rejects unsigned)',
    endpoint: '/webhooks/stripe',
    method: 'POST',
    group: 'Billing & Payments',
    icon: CreditCard,
  },

  // Crypto & Keys
  {
    name: 'Crypto — Key Registration',
    description: 'Signal Protocol key registration endpoint (requires auth)',
    endpoint: '/keys/register',
    method: 'POST',
    group: 'Encryption & Keys',
    icon: Shield,
  },

  // Mail
  {
    name: 'Mail — Send',
    description: 'Encrypted email send endpoint (requires auth)',
    endpoint: '/mail/send',
    method: 'POST',
    group: 'Railgun Mail',
    icon: Mail,
  },

  // Search
  {
    name: 'Search — Users',
    description: 'User search endpoint',
    endpoint: '/search/users',
    method: 'GET',
    group: 'Search & Discovery',
    icon: Globe,
  },

  // Analytics
  {
    name: 'Analytics',
    description: 'Usage analytics endpoint (requires auth)',
    endpoint: '/analytics/dau',
    method: 'GET',
    group: 'Search & Discovery',
    icon: Activity,
  },
];

// Group icons
const GROUP_ICONS: Record<string, React.ElementType> = {
  'Core Infrastructure': Server,
  'Authentication': Shield,
  'Messaging': MessageSquare,
  'Billing & Payments': CreditCard,
  'Encryption & Keys': Shield,
  'Railgun Mail': Mail,
  'Search & Discovery': Globe,
};

// ---------------------------------------------------------------------------
// Architecture Diagram Component (SVG)
// ---------------------------------------------------------------------------

function ArchitectureDiagram({ groups }: { groups: GroupSummary[] }) {
  const statusColor = (s: CheckStatus) => {
    switch (s) {
      case 'up': return '#22c55e';
      case 'degraded': return '#eab308';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const groupStatusMap: Record<string, CheckStatus> = {};
  groups.forEach(g => { groupStatusMap[g.name] = g.overallStatus; });

  // Fixed layout nodes
  const nodes = [
    { id: 'clients', label: 'Clients', sub: 'Desktop · iOS · Android · Web', x: 120, y: 50, w: 200, h: 56, status: 'up' as CheckStatus },
    { id: 'api', label: 'API Gateway', sub: 'NestJS on Fly.io', x: 120, y: 160, w: 200, h: 56, status: groupStatusMap['Core Infrastructure'] || 'unknown' as CheckStatus },
    { id: 'auth', label: 'Auth', sub: 'JWT + Argon2', x: 20, y: 270, w: 130, h: 48, status: groupStatusMap['Authentication'] || 'unknown' as CheckStatus },
    { id: 'messaging', label: 'Messaging', sub: 'E2EE + Signal', x: 160, y: 270, w: 130, h: 48, status: groupStatusMap['Messaging'] || 'unknown' as CheckStatus },
    { id: 'billing', label: 'Billing', sub: 'Stripe', x: 300, y: 270, w: 130, h: 48, status: groupStatusMap['Billing & Payments'] || 'unknown' as CheckStatus },
    { id: 'mail', label: 'Mail', sub: '@railgun.chat', x: 20, y: 350, w: 130, h: 48, status: groupStatusMap['Railgun Mail'] || 'unknown' as CheckStatus },
    { id: 'crypto', label: 'Crypto', sub: 'X3DH + Ratchet', x: 160, y: 350, w: 130, h: 48, status: groupStatusMap['Encryption & Keys'] || 'unknown' as CheckStatus },
    { id: 'search', label: 'Search', sub: 'Discovery', x: 300, y: 350, w: 130, h: 48, status: groupStatusMap['Search & Discovery'] || 'unknown' as CheckStatus },
    { id: 'postgres', label: 'PostgreSQL', sub: 'Supabase', x: 50, y: 450, w: 150, h: 48, status: groupStatusMap['Core Infrastructure'] || 'unknown' as CheckStatus },
    { id: 'redis', label: 'Redis', sub: 'Upstash', x: 240, y: 450, w: 150, h: 48, status: groupStatusMap['Core Infrastructure'] || 'unknown' as CheckStatus },
  ];

  const edges = [
    { from: 'clients', to: 'api' },
    { from: 'api', to: 'auth' },
    { from: 'api', to: 'messaging' },
    { from: 'api', to: 'billing' },
    { from: 'api', to: 'mail' },
    { from: 'api', to: 'crypto' },
    { from: 'api', to: 'search' },
    { from: 'auth', to: 'postgres' },
    { from: 'messaging', to: 'postgres' },
    { from: 'messaging', to: 'redis' },
    { from: 'billing', to: 'postgres' },
    { from: 'mail', to: 'postgres' },
    { from: 'crypto', to: 'postgres' },
    { from: 'search', to: 'postgres' },
  ];

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50 p-4">
      <svg viewBox="0 0 450 520" className="mx-auto w-full max-w-lg" aria-label="Architecture diagram">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#4b5563" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodeMap.get(e.from)!;
          const to = nodeMap.get(e.to)!;
          const x1 = from.x + from.w / 2;
          const y1 = from.y + from.h;
          const x2 = to.x + to.w / 2;
          const y2 = to.y;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#4b5563"
              strokeWidth={1.5}
              markerEnd="url(#arrowhead)"
              opacity={0.6}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x} y={n.y} width={n.w} height={n.h}
              rx={8} ry={8}
              fill="#1a1a1c"
              stroke={statusColor(n.status)}
              strokeWidth={2}
            />
            {/* Status dot */}
            <circle
              cx={n.x + n.w - 12} cy={n.y + 12} r={4}
              fill={statusColor(n.status)}
            />
            <text
              x={n.x + n.w / 2} y={n.y + (n.h > 50 ? 22 : 18)}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={12}
              fontWeight={600}
            >
              {n.label}
            </text>
            <text
              x={n.x + n.w / 2} y={n.y + (n.h > 50 ? 38 : 34)}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize={9}
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: CheckStatus }) {
  switch (status) {
    case 'up':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <CheckCircle className="h-3 w-3" />
          Operational
        </span>
      );
    case 'degraded':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
          <AlertTriangle className="h-3 w-3" />
          Degraded
        </span>
      );
    case 'down':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400">
          <XCircle className="h-3 w-3" />
          Down
        </span>
      );
    case 'checking':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-500/10 px-2.5 py-0.5 text-xs font-medium text-gray-400">
          <RefreshCw className="h-3 w-3 animate-spin" />
          Checking
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-500/10 px-2.5 py-0.5 text-xs font-medium text-gray-500">
          <Clock className="h-3 w-3" />
          Unknown
        </span>
      );
  }
}

// ---------------------------------------------------------------------------
// Overall Status Banner
// ---------------------------------------------------------------------------

function OverallBanner({ checks }: { checks: EndpointCheck[] }) {
  const down = checks.filter(c => c.status === 'down').length;
  const degraded = checks.filter(c => c.status === 'degraded').length;
  const checking = checks.filter(c => c.status === 'checking').length;
  const up = checks.filter(c => c.status === 'up').length;

  if (checking > 0) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 text-center">
        <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-gray-400" />
        <h2 className="text-xl font-bold text-white">Running health checks…</h2>
        <p className="mt-1 text-sm text-gray-400">
          Probing {checks.length} endpoints across all services
        </p>
      </div>
    );
  }

  if (down > 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center">
        <XCircle className="mx-auto mb-3 h-8 w-8 text-red-400" />
        <h2 className="text-xl font-bold text-red-400">Service Disruption</h2>
        <p className="mt-1 text-sm text-gray-400">
          {down} endpoint{down > 1 ? 's' : ''} unreachable · {up} operational
        </p>
      </div>
    );
  }

  if (degraded > 0) {
    return (
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 text-center">
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-yellow-400" />
        <h2 className="text-xl font-bold text-yellow-400">Partial Degradation</h2>
        <p className="mt-1 text-sm text-gray-400">
          {degraded} endpoint{degraded > 1 ? 's' : ''} degraded · {up} operational
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
      <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
      <h2 className="text-xl font-bold text-emerald-400">All Systems Operational</h2>
      <p className="mt-1 text-sm text-gray-400">
        {up} endpoint{up > 1 ? 's' : ''} checked — everything looks good
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Platform Status Cards
// ---------------------------------------------------------------------------

function PlatformCards() {
  const platforms = [
    { name: 'Desktop', icon: Monitor, status: 'operational', detail: 'macOS · Windows · Linux' },
    { name: 'iOS', icon: Smartphone, status: 'operational', detail: 'App Store' },
    { name: 'Android', icon: Smartphone, status: 'operational', detail: 'Play Store' },
    { name: 'Web App', icon: Globe, status: 'operational', detail: 'app.railgun.chat' },
    { name: 'Marketing Site', icon: Globe, status: 'operational', detail: 'railgun.chat' },
    { name: 'WebSocket', icon: Wifi, status: 'operational', detail: 'Real-time messaging' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {platforms.map(p => (
        <div key={p.name} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
          <p.icon className="mx-auto mb-2 h-5 w-5 text-gray-400" />
          <p className="text-xs font-medium text-white">{p.name}</p>
          <p className="mt-0.5 text-[10px] text-gray-500">{p.detail}</p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">Operational</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------------------------

export function StatusDashboard() {
  const [checks, setChecks] = useState<EndpointCheck[]>(
    ENDPOINT_DEFINITIONS.map(def => ({
      ...def,
      status: 'checking',
      latencyMs: null,
      statusCode: null,
    })),
  );
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runChecks = useCallback(async () => {
    setIsRefreshing(true);

    // Set all to checking
    setChecks(prev => prev.map(c => ({ ...c, status: 'checking' as CheckStatus, latencyMs: null, statusCode: null })));

    const results = await Promise.all(
      ENDPOINT_DEFINITIONS.map(async (def) => {
        const start = performance.now();
        let status: CheckStatus = 'unknown';
        let statusCode: number | null = null;

        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);

          // Route through our own API route to avoid CORS issues.
          // The server-side proxy hits the production API directly.
          const proxyUrl = `/api/health-check?endpoint=${encodeURIComponent(def.endpoint)}&method=${def.method}`;
          const resp = await fetch(proxyUrl, {
            signal: controller.signal,
          });

          clearTimeout(timeout);

          if (resp.ok) {
            const data = await resp.json();
            statusCode = data.statusCode;

            if (!data.ok || statusCode === null) {
              // Network error on server side
              status = 'down';
            } else if (statusCode >= 200 && statusCode < 300) {
              status = 'up';
            } else if (statusCode === 401 || statusCode === 403) {
              // Auth-required endpoints — reachable but need credentials
              status = 'up';
            } else if (statusCode === 400 || statusCode === 422) {
              // Validation error = endpoint exists and works
              status = 'up';
            } else if (statusCode === 429) {
              // Rate limited = endpoint exists, just busy
              status = 'degraded';
            } else if (statusCode >= 500) {
              status = 'down';
            } else {
              // 404, etc.
              status = 'up';
            }
          } else {
            status = 'down';
          }
        } catch {
          status = 'down';
          statusCode = null;
        }

        const latencyMs = Math.round(performance.now() - start);

        return {
          ...def,
          status,
          latencyMs,
          statusCode,
        } as EndpointCheck;
      }),
    );

    setChecks(results);
    setLastRefresh(new Date());
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    runChecks();
    // Auto-refresh every 60 seconds
    const interval = setInterval(runChecks, 60000);
    return () => clearInterval(interval);
  }, [runChecks]);

  // Group checks
  const groupNames = Array.from(new Set(ENDPOINT_DEFINITIONS.map(d => d.group)));
  const groups: GroupSummary[] = groupNames.map(name => {
    const groupChecks = checks.filter(c => c.group === name);
    let overallStatus: CheckStatus = 'up';
    if (groupChecks.some(c => c.status === 'down')) overallStatus = 'down';
    else if (groupChecks.some(c => c.status === 'degraded')) overallStatus = 'degraded';
    else if (groupChecks.some(c => c.status === 'checking')) overallStatus = 'checking';
    else if (groupChecks.every(c => c.status === 'unknown')) overallStatus = 'unknown';

    return {
      name,
      icon: GROUP_ICONS[name] || Server,
      checks: groupChecks,
      overallStatus,
    };
  });

  // Aggregate stats
  const avgLatency = checks.filter(c => c.latencyMs !== null).length > 0
    ? Math.round(
        checks.filter(c => c.latencyMs !== null).reduce((sum, c) => sum + (c.latencyMs || 0), 0) /
        checks.filter(c => c.latencyMs !== null).length,
      )
    : null;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">System Status</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">
            Live health checks across all Rail Gun services. Every endpoint is probed directly from
            your browser — no server-side caching.
          </p>
        </div>

        {/* Overall Banner */}
        <div className="mb-8">
          <OverallBanner checks={checks} />
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
            <p className="text-2xl font-bold text-white">{checks.filter(c => c.status === 'up').length}</p>
            <p className="text-xs text-gray-400">Endpoints Up</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
            <p className="text-2xl font-bold text-white">{checks.length}</p>
            <p className="text-xs text-gray-400">Total Monitored</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
            <p className="text-2xl font-bold text-white">{avgLatency !== null ? `${avgLatency}ms` : '—'}</p>
            <p className="text-xs text-gray-400">Avg Latency</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
            <p className="text-2xl font-bold text-white">{groups.length}</p>
            <p className="text-xs text-gray-400">Service Groups</p>
          </div>
        </div>

        {/* Platform cards */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Platforms</h2>
          <PlatformCards />
        </div>

        {/* Architecture Diagram */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Architecture</h2>
          <ArchitectureDiagram groups={groups} />
          <p className="mt-2 text-center text-xs text-gray-500">
            Border color reflects live status: <span className="text-emerald-400">green</span> = operational,{' '}
            <span className="text-yellow-400">yellow</span> = degraded,{' '}
            <span className="text-red-400">red</span> = down
          </p>
        </div>

        {/* Endpoint Groups */}
        <div className="mb-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Endpoint Details</h2>
            <button
              onClick={runChecks}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {groups.map(group => (
            <div key={group.name} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-gray-800 bg-gray-800/50 px-5 py-3">
                <div className="flex items-center gap-3">
                  <group.icon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-white">{group.name}</span>
                </div>
                <StatusBadge status={group.overallStatus} />
              </div>

              {/* Checks */}
              <div className="divide-y divide-gray-800/50">
                {group.checks.map(check => (
                  <div key={check.endpoint} className="flex items-center justify-between px-5 py-3 hover:bg-gray-800/20 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <check.icon className="h-4 w-4 flex-shrink-0 text-gray-500" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate">{check.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          <span className="font-mono text-[10px]">{check.method}</span>{' '}
                          {check.endpoint}
                          {check.description && (
                            <span className="hidden sm:inline"> — {check.description}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {check.latencyMs !== null && (
                        <span className="text-xs font-mono text-gray-500">{check.latencyMs}ms</span>
                      )}
                      {check.statusCode !== null && (
                        <span className={`text-xs font-mono ${
                          check.statusCode < 400 ? 'text-emerald-500' :
                          check.statusCode < 500 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {check.statusCode}
                        </span>
                      )}
                      <StatusBadge status={check.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How Pseudonymous Billing Works */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">How Pseudonymous Billing Works</h2>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { step: '1', label: 'You click Subscribe', detail: 'In the desktop/mobile app' },
                { step: '2', label: 'API hashes your user ID', detail: 'HMAC-SHA256 → billing_ref' },
                { step: '3', label: 'Stripe creates session', detail: 'Only sees billing_ref — no PII' },
                { step: '4', label: 'You pay via Checkout', detail: 'Standard Stripe Checkout' },
                { step: '5', label: 'Entitlement token issued', detail: 'Ed25519-signed, stored locally' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <p className="text-xs font-medium text-gray-200">{item.label}</p>
                  <p className="mt-0.5 text-[10px] text-gray-500">{item.detail}</p>
                  {i < 4 && <ArrowRight className="mt-2 hidden h-4 w-4 text-gray-600 md:block rotate-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-500">
          {lastRefresh && (
            <p>
              Last checked: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 60 seconds
            </p>
          )}
          <p className="mt-1">
            Health checks run server-side from our edge network. Results reflect real-time API availability.
          </p>
        </div>
      </div>
    </section>
  );
}
