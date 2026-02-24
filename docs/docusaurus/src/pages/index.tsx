import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '../components/HeroSection';
import { IconCard, BoxCard, CardGrid } from '../components/Cards';
import { iconCards, boxCards } from '../data/hubCards';

export default function Home(): React.ReactElement {
  return (
    <Layout title="Copilot CLI Workshop" description="A hands-on guide to mastering the GitHub Copilot CLI">
      <HeroSection
        title="Copilot CLI Workshop"
        subtitle="A hands-on, 13-module guide to mastering the GitHub Copilot CLI. Learn modes, commands, custom instructions, skills, MCP servers, and advanced workflows."
        ctaLabel="Start the workshop →"
        ctaHref="/docs/intro"
      />

      <main>
        <section style={{ padding: '24px 0', maxWidth: 'calc(100% - 48px)', margin: '0 24px' }}>
          <CardGrid columns={4}>
            {iconCards.map((card) => (
              <IconCard key={card.href} icon={card.icon} supertitle={card.supertitle} title={card.title} href={card.href} description={card.description} />
            ))}
          </CardGrid>
        </section>

        <section style={{ padding: '48px 0', maxWidth: 'calc(100% - 48px)', margin: '0 24px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 600, marginBottom: '0px' }}>Explore modules</h2>
          <p style={{ color: 'var(--ms-learn-text-subtle)', marginTop: '0', marginBottom: '24px', fontSize: '16px' }}>
            Dive into specific topics and hands-on exercises.
          </p>
          <CardGrid columns={4}>
            {boxCards.map((card) => (
              <BoxCard key={card.title} {...card} />
            ))}
          </CardGrid>
        </section>
      </main>
    </Layout>
  );
}
