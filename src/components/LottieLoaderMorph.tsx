"use client";

import React, { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

interface LottieLoaderMorphProps {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  speed?: number;
  yoyo?: boolean;
  scale?: number;
}

export default function LottieLoaderMorph({
  className = "",
  style,
  src = "/loader-morph-white.json",
  speed = 0.4,
  yoyo = true,
  scale,
}: LottieLoaderMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const directionRef = useRef<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    fetch(src)
      .then((res) => res.json())
      .then((animationData) => {
        if (!isMounted || !containerRef.current) return;

        if (animRef.current) {
          animRef.current.destroy();
        }

        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: !yoyo,
          autoplay: true,
          animationData,
        });

        anim.setSpeed(speed);
        directionRef.current = 1;

        if (yoyo) {
          const handleComplete = () => {
            if (!isMounted || !animRef.current) return;
            const nextDirection = directionRef.current === 1 ? -1 : 1;
            directionRef.current = nextDirection;
            animRef.current.setDirection(nextDirection as 1 | -1);
            animRef.current.play();
          };

          anim.addEventListener("complete", handleComplete);
        }

        animRef.current = anim;
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
      });

    return () => {
      isMounted = false;
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [src, speed, yoyo]);

  return (
    <div
      ref={containerRef}
      className={`select-none pointer-events-none ${className}`}
      style={{
        transform: scale ? `scale(${scale})` : undefined,
        transformOrigin: "center center",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
