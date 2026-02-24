// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Copilot CLI Workshop',
  tagline: 'A hands-on guide to mastering the GitHub Copilot CLI',
  favicon: 'img/favicon.ico',

  // DYK-02: Toggle this off first if mysterious build failures occur
  future: {
    v4: true,
  },

  url: 'https://jakkaj.github.io',
  baseUrl: '/101-copilot-cli-sdd/',

  organizationName: 'jakkaj',
  projectName: '101-copilot-cli-sdd',

  // DYK-01: Using 'warn' until Phase 8 when all pages exist; then upgrade to 'throw'
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true, // PL-01: First mermaid config (BOTH required)
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          editUrl:
            'https://github.com/jakkaj/101-copilot-cli-sdd/tree/main/docs/docusaurus/',
        },
        blog: false, // PL-05: No blog needed
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'], // PL-01: Second mermaid config (BOTH required)

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Copilot CLI Workshop',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Workshop',
          },
          // DYK-01: Sections dropdown deferred to Phase 8 when all category pages exist
          {
            href: 'https://github.com/jakkaj/101-copilot-cli-sdd',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Workshop',
            items: [
              { label: 'Introduction', to: '/docs/intro' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'GitHub', href: 'https://github.com/jakkaj/101-copilot-cli-sdd' },
            ],
          },
          // DYK-01: Additional footer links deferred to Phase 8
        ],
        copyright: `© Microsoft ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
