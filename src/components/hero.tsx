'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Lock, Zap } from 'lucide-react';

// Types for shatter pieces
interface ShatterPiece {
  id: number;
  char: string;
  baseX: number; // Original X position relative to center
  x: number;
  y: number;
  vx: number; // velocity X for physics
  vy: number; // velocity Y for physics
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  blur: number;
  isGradient: boolean;
  isHit: boolean;
  hitTime: number;
  lineIndex: number; // 0 = line 1, 1 = line 2
}

// Spark particle type
interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'flying' | 'impact' | 'exiting' | 'shattered'>('idle');
  const [projectileX, setProjectileX] = useState(-150);
  const [shatterPieces, setShatterPieces] = useState<ShatterPiece[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSlowMo, setIsSlowMo] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const lastSparkTimeRef = useRef<number>(0);
  const exitStartTimeRef = useRef<number>(0);

  // Animation timing constants (in ms) - DOUBLED SPEED
  const TOTAL_DURATION = 4000; // 4 seconds for slow-mo phase (was 8)
  const FAST_PHASE_DURATION = 200; // 0.2 seconds for fast approach (was 0.4)
  const SLOW_PHASE_DURATION = TOTAL_DURATION - FAST_PHASE_DURATION; // slow-mo through text
  const EXIT_DURATION = 300; // 0.3 seconds to accelerate off screen (was 0.6)
  const GRAVITY = 0.15; // Gravity for physics simulation
  const AIR_RESISTANCE = 0.98; // Air drag

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize shatter pieces with positions
  const initializeShatterPieces = useCallback(() => {
    const line1 = 'Private messaging.';
    const line2 = 'Zero compromises.';
    const pieces: ShatterPiece[] = [];
    let id = 0;

    // Approximate character width in pixels (will vary by screen size)
    const charWidth = typeof window !== 'undefined' ? 
      (window.innerWidth < 640 ? 18 : window.innerWidth < 1024 ? 28 : 38) : 28;

    // Line 1 characters
    const line1Start = -(line1.length * charWidth) / 2;
    for (let i = 0; i < line1.length; i++) {
      pieces.push({
        id: id++,
        char: line1[i],
        baseX: line1Start + i * charWidth,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotation: 0,
        rotationSpeed: 0,
        scale: 1,
        opacity: 1,
        blur: 0,
        isGradient: false,
        isHit: false,
        hitTime: 0,
        lineIndex: 0,
      });
    }

    // Line 2 characters
    const line2Start = -(line2.length * charWidth) / 2;
    for (let i = 0; i < line2.length; i++) {
      pieces.push({
        id: id++,
        char: line2[i],
        baseX: line2Start + i * charWidth,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotation: 0,
        rotationSpeed: 0,
        scale: 1,
        opacity: 1,
        blur: 0,
        isGradient: true,
        isHit: false,
        hitTime: 0,
        lineIndex: 1,
      });
    }

    return pieces;
  }, []);

  // Create spark at impact point
  const createSpark = useCallback((x: number, y: number): Spark => {
    const angle = (Math.random() - 0.5) * Math.PI; // Spray mostly to the right
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      angle: angle + Math.PI, // Bias toward right side (direction of travel)
      speed: 1 + Math.random() * 3,
      size: 2 + Math.random() * 3,
      opacity: 1,
    };
  }, []);

  // Main animation sequence
  useEffect(() => {
    setMounted(true);
    
    if (prefersReducedMotion) {
      setAnimationPhase('shattered');
      return;
    }

    // Initialize pieces
    setShatterPieces(initializeShatterPieces());

    // Start animation after a brief delay
    const startDelay = setTimeout(() => {
      setAnimationPhase('flying');
      startTimeRef.current = Date.now();
    }, 600);

    return () => {
      clearTimeout(startDelay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, initializeShatterPieces]);

  // Main animation loop
  useEffect(() => {
    if (animationPhase !== 'flying' && animationPhase !== 'impact' && animationPhase !== 'exiting') return;

    const sectionWidth = sectionRef.current?.offsetWidth || window.innerWidth;
    const centerX = sectionWidth / 2;
    
    // Text spans roughly from centerX - 400 to centerX + 400 (adjust based on text width)
    const textStartX = centerX - 350; // Where text begins
    const textEndX = centerX + 400; // Where text ends
    const startX = -150; // Starting position off-screen
    const exitEndX = sectionWidth + 200; // Exit position off right side
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      let newX: number;
      let currentPhase = animationPhase;

      if (currentPhase === 'exiting') {
        // Exit phase: accelerate off the right side of the screen
        const exitElapsed = Date.now() - exitStartTimeRef.current;
        const exitProgress = Math.min(1, exitElapsed / EXIT_DURATION);
        // Ease in - starts slow, accelerates
        const easedExitProgress = Math.pow(exitProgress, 2.5);
        
        const exitStartX = textEndX + 150;
        newX = exitStartX + (exitEndX - exitStartX) * easedExitProgress;
        setIsSlowMo(false);
        
        if (exitProgress >= 1) {
          // Animation complete
          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 200);
          setTimeout(() => {
            setAnimationPhase('shattered');
            setSparks([]);
          }, 300);
          return;
        }
      } else if (elapsed < FAST_PHASE_DURATION) {
        // Fast phase: quickly travel from start to near text
        const fastProgress = elapsed / FAST_PHASE_DURATION;
        // Ease out for smooth deceleration into slow-mo
        const easedProgress = 1 - Math.pow(1 - fastProgress, 3);
        newX = startX + (textStartX - startX - 50) * easedProgress;
        setIsSlowMo(false);
      } else {
        // Slow phase: crawl through the text
        const slowElapsed = elapsed - FAST_PHASE_DURATION;
        const slowProgress = Math.min(1, slowElapsed / SLOW_PHASE_DURATION);
        
        // Very slow ease - almost linear with slight ease at end
        const easedSlowProgress = slowProgress < 0.9 
          ? slowProgress 
          : 0.9 + (slowProgress - 0.9) * Math.pow((slowProgress - 0.9) / 0.1, 0.5) * 0.1;
        
        const slowStartX = textStartX - 50;
        newX = slowStartX + (textEndX - slowStartX + 200) * easedSlowProgress;
        setIsSlowMo(true);
        
        if (currentPhase === 'flying' && slowProgress > 0) {
          setAnimationPhase('impact');
          currentPhase = 'impact';
        }
        
        // Check if all letters have been hit - transition to exit phase
        if (slowProgress >= 1) {
          setAnimationPhase('exiting');
          exitStartTimeRef.current = Date.now();
          currentPhase = 'exiting';
        }
      }

      setProjectileX(newX);

      // During impact phase, check for letter collisions and update physics
      if (currentPhase === 'impact' || currentPhase === 'exiting') {
        const projectileHitX = newX - centerX; // Relative to center
        const now = Date.now();

        setShatterPieces(prev => {
          const updated = prev.map(piece => {
            // Check if projectile has passed this character (initial hit)
            if (!piece.isHit && projectileHitX > piece.baseX - 20) {
              // Create sparks at impact
              if (now - lastSparkTimeRef.current > 40) {
                lastSparkTimeRef.current = now;
                const sparkY = 220; // Between the lines
                setSparks(s => [...s.slice(-20), createSpark(newX, sparkY)]);
              }

              // Physics-based initial velocity
              // Letters get pushed in direction of projectile travel (rightward) 
              // Plus deflection based on which line (up for line 1, down for line 2)
              const impactForce = 8 + Math.random() * 6; // Strong initial push
              const deflectionAngle = piece.lineIndex === 0 
                ? -Math.PI / 4 - Math.random() * Math.PI / 4  // Line 1: upward (-45° to -90°)
                : Math.PI / 4 + Math.random() * Math.PI / 4;  // Line 2: downward (45° to 90°)
              
              // Add some rightward momentum from the projectile
              const rightwardPush = 3 + Math.random() * 4;
              
              return {
                ...piece,
                isHit: true,
                hitTime: now,
                vx: Math.cos(deflectionAngle) * impactForce * 0.5 + rightwardPush,
                vy: Math.sin(deflectionAngle) * impactForce,
                rotationSpeed: (Math.random() - 0.5) * 15, // Random spin
                scale: 1,
                opacity: 1,
                blur: 0,
              };
            }
            
            // Apply physics to already-hit pieces
            if (piece.isHit) {
              const timeSinceHit = now - piece.hitTime;
              const fadeStart = 800; // Start fading after 800ms
              const fadeDuration = 1200; // Fade over 1200ms
              
              // Calculate new opacity based on time
              let newOpacity = piece.opacity;
              if (timeSinceHit > fadeStart) {
                newOpacity = Math.max(0, 1 - (timeSinceHit - fadeStart) / fadeDuration);
              }
              
              // Apply velocity with gravity and air resistance
              const newVy = piece.vy + GRAVITY; // Gravity pulls down
              const newVx = piece.vx * AIR_RESISTANCE; // Air resistance
              const adjustedVy = newVy * AIR_RESISTANCE;
              
              return {
                ...piece,
                x: piece.x + piece.vx,
                y: piece.y + piece.vy,
                vx: newVx,
                vy: adjustedVy,
                rotation: piece.rotation + piece.rotationSpeed,
                rotationSpeed: piece.rotationSpeed * 0.98, // Slow down rotation
                opacity: newOpacity,
                blur: Math.min(6, piece.blur + 0.05), // Gradually increase blur
                scale: Math.max(0.5, piece.scale - 0.002), // Slowly shrink
              };
            }
            return piece;
          });
          return updated;
        });

        // Update existing sparks with physics
        setSparks(prev => prev
          .map(spark => ({
            ...spark,
            x: spark.x + Math.cos(spark.angle) * spark.speed,
            y: spark.y + Math.sin(spark.angle) * spark.speed + 0.3, // slight gravity
            opacity: Math.max(0, spark.opacity - 0.025),
            speed: spark.speed * 0.96,
          }))
          .filter(spark => spark.opacity > 0)
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPhase]);

  const showOriginalHeadline = animationPhase === 'idle' || animationPhase === 'flying';
  const showShatterLayer = animationPhase === 'impact' || animationPhase === 'exiting';
  const showFinalHeadline = animationPhase === 'shattered';
  const showProjectile = animationPhase === 'flying' || animationPhase === 'impact' || animationPhase === 'exiting';

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[128px]" />

      {/* Static logo in top-right corner - purple tinted */}
      <div className="pointer-events-none absolute right-8 top-8 opacity-20 sm:right-12 sm:top-12">
        <Image
          src="/logo.png"
          alt=""
          width={120}
          height={120}
          className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          style={{
            filter: 'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(2255%) hue-rotate(235deg) brightness(100%) contrast(92%)',
          }}
          priority
        />
      </div>

      {/* Projectile logo - purple tinted, flies between the two text lines */}
      {showProjectile && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: projectileX,
            top: '255px', // Positioned between line 1 and line 2
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative">
            {/* Extended motion blur trail during slow-mo */}
            <div 
              className="absolute opacity-70"
              style={{
                background: `linear-gradient(to left, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.3), transparent)`,
                width: isSlowMo ? '300px' : '120px',
                height: '50px',
                left: isSlowMo ? '-280px' : '-100px',
                top: '5px',
                filter: `blur(${isSlowMo ? '12px' : '6px'})`,
                transition: 'all 0.15s ease',
              }}
            />
            {/* Intense glow during slow-mo */}
            <div 
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
                width: isSlowMo ? '180px' : '80px',
                height: isSlowMo ? '180px' : '80px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                filter: `blur(${isSlowMo ? '20px' : '10px'})`,
                transition: 'all 0.25s ease',
              }}
            />
            {/* Logo - purple tinted, smaller to fit between lines */}
            <Image
              src="/logo.png"
              alt=""
              width={60}
              height={60}
              className="relative h-12 w-12 drop-shadow-[0_0_30px_rgba(139,92,246,0.9)] sm:h-14 sm:w-14"
              style={{
                filter: isSlowMo 
                  ? 'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(2255%) hue-rotate(235deg) brightness(130%) contrast(92%) drop-shadow(0 0 40px rgba(139, 92, 246, 1))'
                  : 'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(2255%) hue-rotate(235deg) brightness(100%) contrast(92%)',
              }}
              priority
            />
          </div>
        </div>
      )}

      {/* Impact flash */}
      {showFlash && (
        <div className="pointer-events-none absolute inset-0 z-40 animate-flash bg-white/40" />
      )}

      {/* Spark particles */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="pointer-events-none absolute z-40 rounded-full"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            opacity: spark.opacity,
            background: 'radial-gradient(circle, #fff 0%, #8b5cf6 50%, transparent 100%)',
            boxShadow: `0 0 ${spark.size * 3}px rgba(139, 92, 246, 0.9)`,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-light">
            <Shield className="h-4 w-4" />
            <span>Invitation Only · Private Beta</span>
          </div>

          {/* Headline - Original (shown during idle/flying) */}
          <h1 
            className={`text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl transition-opacity duration-300 ${
              showOriginalHeadline ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            style={{ 
              visibility: showOriginalHeadline ? 'visible' : 'hidden',
            }}
          >
            Private messaging.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Zero compromises.
            </span>
          </h1>

          {/* Shatter layer - characters fly away as projectile hits them */}
          {showShatterLayer && (
            <div 
              className="relative h-[120px] sm:h-[160px] lg:h-[200px]" 
              aria-hidden="true"
            >
              {/* Line 1: Private messaging. */}
              <div className="absolute inset-x-0 top-0 flex justify-center">
                {shatterPieces.filter(p => p.lineIndex === 0).map((piece) => (
                  <span
                    key={piece.id}
                    className="inline-block text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                    style={{
                      transform: `translate(${piece.x}px, ${piece.y}px) rotate(${piece.rotation}deg) scale(${piece.scale})`,
                      opacity: piece.opacity,
                      filter: `blur(${piece.blur}px)`,
                    }}
                  >
                    {piece.char === ' ' ? '\u00A0' : piece.char}
                  </span>
                ))}
              </div>
              {/* Line 2: Zero compromises. (gradient) */}
              <div className="absolute inset-x-0 top-12 flex justify-center sm:top-16 lg:top-20">
                {shatterPieces.filter(p => p.lineIndex === 1).map((piece) => (
                  <span
                    key={piece.id}
                    className="inline-block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                    style={{
                      transform: `translate(${piece.x}px, ${piece.y}px) rotate(${piece.rotation}deg) scale(${piece.scale})`,
                      opacity: piece.opacity,
                      filter: `blur(${piece.blur}px)`,
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    {piece.char === ' ' ? '\u00A0' : piece.char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Final headline - fades in after animation completes */}
          {showFinalHeadline && (
            <h1 
              className="animate-fade-in text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Private messaging.
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Zero compromises.
              </span>
            </h1>
          )}

          {/* Subheadline */}
          <p className="mt-6 text-lg text-foreground-secondary sm:text-xl">
            Rail Gun is civic infrastructure for private communication. End-to-end encrypted
            messaging where your keys never leave your device. Truth without permission.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#waitlist"
              className="btn-primary group w-full sm:w-auto"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#security"
              className="btn-secondary w-full sm:w-auto"
            >
              Learn About Security
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">X3DH + Double Ratchet</span>
              <span className="text-sm text-foreground-secondary">
                Signal Protocol key exchange
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">Curve25519</span>
              <span className="text-sm text-foreground-secondary">
                Modern elliptic curve cryptography
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">ChaCha20-Poly1305</span>
              <span className="text-sm text-foreground-secondary">
                AEAD authenticated encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
