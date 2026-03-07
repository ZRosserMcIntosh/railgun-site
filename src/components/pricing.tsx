'use client';

import { Check, X, Shield, Mail, Zap, Crown } from 'lucide-react';

const features = [
  {
    name: 'End-to-end encrypted messaging',
    free: true,
    pro: true,
    description: 'Signal Protocol (X3DH + Double Ratchet)',
  },
  {
    name: 'Communities & channels',
    free: true,
    pro: true,
    description: 'Create and join servers with multiple channels',
  },
  {
    name: 'Direct messages',
    free: true,
    pro: true,
    description: 'Private 1:1 encrypted conversations',
  },
  {
    name: 'Voice calls',
    free: true,
    pro: true,
    description: 'Encrypted voice communication',
  },
  {
    name: 'Message length',
    free: '500 chars',
    pro: '2,000 chars',
    description: 'Extended message length for Pro users',
  },
  {
    name: 'Image uploads',
    free: 'Up to 1280px',
    pro: 'Unlimited HD',
    description: 'Send full-resolution images without compression',
  },
  {
    name: 'File transfers',
    free: 'Up to 10 MB',
    pro: 'Up to 500 MB',
    description: 'Encrypted file sharing',
  },
  {
    name: 'Video uploads',
    free: 'Up to 60s',
    pro: 'Up to 30 min',
    description: 'Send longer encrypted video clips',
  },
  {
    name: 'Video calling',
    free: false,
    pro: true,
    description: 'Face-to-face encrypted video calls',
  },
  {
    name: 'Screen sharing',
    free: false,
    pro: true,
    description: 'Share your screen in calls',
  },
  {
    name: 'Encrypted email (@railgun.chat)',
    free: false,
    pro: true,
    description: 'Your own @railgun.chat encrypted email address',
  },
  {
    name: 'Priority relay network',
    free: false,
    pro: true,
    description: 'Faster message delivery via priority infrastructure',
  },
];

function FeatureCheck({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-gray-300">{value}</span>;
  }
  return value ? (
    <Check className="w-5 h-5 text-emerald-400" />
  ) : (
    <X className="w-5 h-5 text-gray-600" />
  );
}

export function Pricing() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, private pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Rail Gun is free to use. Upgrade to Pro for heavy bandwidth features
            and encrypted email. <strong className="text-gray-300">Stripe never sees your identity.</strong>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Free Tier */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
              <p className="text-gray-400">Everything you need for secure messaging</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-gray-500 ml-2">forever</span>
            </div>
            <a
              href="/download"
              className="block w-full text-center py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors mb-8"
            >
              Download Rail Gun
            </a>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                E2E encrypted messaging
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Communities & channels
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Voice calls
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Images up to 1280px
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Files up to 10 MB
              </li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-b from-purple-900/30 to-gray-900/50 border-2 border-purple-500/50 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full flex items-center gap-1.5">
              <Crown className="w-4 h-4" />
              Most Popular
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Rail Gun Pro</h2>
              <p className="text-gray-400">Heavy bandwidth + encrypted email</p>
            </div>
            <div className="mb-2">
              <span className="text-5xl font-bold text-white">$7</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              or $70/year (save ~17%)
            </p>
            <a
              href="/download"
              className="block w-full text-center py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors mb-8"
            >
              Get Rail Gun Pro
            </a>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <strong>Everything in Free</strong>, plus:
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                HD images & 500 MB file transfers
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                Video calling & screen sharing
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                @railgun.chat encrypted email
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                Priority relay network
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                2,000 character messages
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                30-minute video uploads
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Feature Comparison
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-800/50 border-b border-gray-700">
              <div className="text-sm font-medium text-gray-400">Feature</div>
              <div className="text-sm font-medium text-gray-400 text-center">Free</div>
              <div className="text-sm font-medium text-purple-400 text-center">Pro</div>
            </div>
            {features.map((feature) => (
              <div
                key={feature.name}
                className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/20 transition-colors"
              >
                <div>
                  <div className="text-sm text-white">{feature.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{feature.description}</div>
                </div>
                <div className="flex justify-center items-center">
                  <FeatureCheck value={feature.free} />
                </div>
                <div className="flex justify-center items-center">
                  <FeatureCheck value={feature.pro} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <Shield className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-3">
              Pseudonymous Billing
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rail Gun uses a privacy-preserving billing system. When you subscribe,
              Stripe only sees a one-way cryptographic hash — never your username,
              email, or identity. Your subscription status is verified offline using
              an Ed25519-signed token stored locally on your device. We can&apos;t
              link your payment to your account even if compelled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
