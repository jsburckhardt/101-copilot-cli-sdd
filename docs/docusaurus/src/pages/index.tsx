import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={`hero hero--primary ${styles.heroBanner}`}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start the workshop →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout title="Copilot CLI Workshop" description="A hands-on guide to mastering the GitHub Copilot CLI">
      <HomepageHeader />
    </Layout>
  );
}
