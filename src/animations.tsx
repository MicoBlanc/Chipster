export type AnimationEffect = 'fade' | 'scale' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'rotate';

export interface AnimationConfig {
  effects: readonly AnimationEffect[];
  duration: number;
  easing: string;
}

export interface ChipsterAnimationConfig {
  exit: AnimationConfig;
}

export const defaultAnimationConfig: ChipsterAnimationConfig = {
  exit: {
    effects: ['fade', 'scale', 'slideLeft'] as const,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth easing
  },
};

export const getAnimationStyle = (config: AnimationConfig, isExit: boolean): React.CSSProperties => {
  const styles: React.CSSProperties = {
    transition: `all ${config.duration}ms ${config.easing}`,
  };

  config.effects.forEach(effect => {
    switch (effect) {
      case 'fade':
        styles.opacity = isExit ? 0 : 1;
        break;
      case 'scale':
        styles.transform = `${styles.transform || ''} scale(${isExit ? 0.8 : 1})`;
        break;
      case 'slideLeft':
        styles.transform = `${styles.transform || ''} translateX(${isExit ? '-20px' : '0'})`;
        break;
      case 'slideRight':
        styles.transform = `${styles.transform || ''} translateX(${isExit ? '20px' : '0'})`;
        break;
      case 'slideUp':
        styles.transform = `${styles.transform || ''} translateY(${isExit ? '-20px' : '0'})`;
        break;
      case 'slideDown':
        styles.transform = `${styles.transform || ''} translateY(${isExit ? '20px' : '0'})`;
        break;
      case 'rotate':
        styles.transform = `${styles.transform || ''} rotate(${isExit ? '-90deg' : '0'})`;
        break;
    }
  });

  return styles;
};

// Predefined animation configurations
export const animations = {
  fadeSlideLeft: {
    exit: { effects: ['fade', 'scale', 'slideLeft'] as const, duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  },
  fadeSlideUp: {
    exit: { effects: ['fade', 'scale', 'slideUp'] as const, duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  },
  rotateOut: {
    exit: { effects: ['fade', 'rotate'] as const, duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  },
} as const;

export type AnimationPreset = keyof typeof animations;
