import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: HeroSectionProps): React.ReactElement {
  return (
    <header className={styles.hero}>
      <div className={styles.heroPattern} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        {ctaLabel && ctaHref && (
          <Link to={ctaHref} className={styles.heroCta}>
            {ctaLabel}
          </Link>
        )}
      </div>
    </header>
  );
}
