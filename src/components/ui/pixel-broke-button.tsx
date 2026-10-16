import React from 'react';
import { sound } from '@/lib/sound';
import './pixel-broke-button.css';

export interface Button03Props {
  text?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  variant?: "blue" | "dark" | "outline";
  target?: string;
  rel?: string;
  soundEnabled?: boolean;
}

export const Button03 = ({
  text = "Pixel-Broke",
  href = "#",
  onClick,
  onMouseEnter,
  className = "",
  variant = "blue",
  target,
  rel,
  soundEnabled = true,
}: Button03Props) => {
  // Define the index patterns for left and right pixels
  const leftPixelIndices = [0, 0, 1, 3, 4, 0, 0, 2, 0, 0, 0, 1];
  const rightPixelIndices = [3, 0, 0, 0, 4, 0, 0, 2, 1, 3, 0, 0];

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (soundEnabled) {
      sound.playPixelHover();
    }
    onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (soundEnabled) {
      sound.playPixelClick();
    }
    onClick?.(e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      target={target}
      rel={rel}
      className={`button03 w-inline-block button03--${variant} ${className}`}
    >
      <span className="button03_bg" aria-hidden="true">
        <span className="button03_bg-left">
          {leftPixelIndices.map((index, i) => (
            <span
              key={`left-${i}`}
              style={{ '--index': index } as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
        <span className="button03_bg-mid"></span>
        <span className="button03_bg-right">
          {rightPixelIndices.map((index, i) => (
            <span
              key={`right-${i}`}
              style={{ '--index': index } as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
      </span>
      <span data-text={text} className="button03_inner">
        <span className="button03_text">{text}</span>
      </span>
    </a>
  );
};
