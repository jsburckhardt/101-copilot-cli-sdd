import React from 'react';
import {
  GettingStartedIcon,
  CustomizationIcon,
  ExtensibilityIcon,
  AdvancedIcon,
} from '../components/Icons';

export interface IconCardData {
  icon: React.ReactNode;
  supertitle: string;
  title: string;
  href: string;
  description: string;
}

export interface BoxCardData {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  icon?: string;
}

export const iconCards: IconCardData[] = [
  {
    icon: <GettingStartedIcon />,
    supertitle: 'Getting Started',
    title: 'Install and explore',
    href: '/docs/category/getting-started',
    description: 'Install the Copilot CLI, learn modes and commands, and manage sessions',
  },
  {
    icon: <CustomizationIcon />,
    supertitle: 'Customization',
    title: 'Tailor your workflow',
    href: '/docs/category/customization',
    description: 'Custom instructions, prompt files, and agent configuration',
  },
  {
    icon: <ExtensibilityIcon />,
    supertitle: 'Extensibility',
    title: 'Extend capabilities',
    href: '/docs/category/extensibility',
    description: 'Skills, MCP servers, and tool integration patterns',
  },
  {
    icon: <AdvancedIcon />,
    supertitle: 'Advanced',
    title: 'Master the CLI',
    href: '/docs/category/advanced',
    description: 'Memory, vision, notifications, and multi-agent workflows',
  },
];

export const boxCards: BoxCardData[] = [
  {
    icon: '/img/icons/i_quickstart.svg',
    title: 'Quick Start',
    description: 'Get up and running in minutes',
    links: [
      { label: 'Installation guide', href: '/docs/category/getting-started' },
      { label: 'Modes and commands', href: '/docs/category/getting-started' },
      { label: 'Session management', href: '/docs/category/getting-started' },
    ],
  },
  {
    icon: '/img/icons/i_customize.svg',
    title: 'Customize',
    description: 'Make the CLI work your way',
    links: [
      { label: 'Custom instructions', href: '/docs/category/customization' },
      { label: 'Prompt files', href: '/docs/category/customization' },
      { label: 'Agent configuration', href: '/docs/category/customization' },
    ],
  },
  {
    icon: '/img/icons/i_build-ai.svg',
    title: 'Extend',
    description: 'Add capabilities and integrations',
    links: [
      { label: 'Skills and tools', href: '/docs/category/extensibility' },
      { label: 'MCP servers', href: '/docs/category/extensibility' },
      { label: 'Tool patterns', href: '/docs/category/extensibility' },
    ],
  },
  {
    icon: '/img/icons/i_plan-architect.svg',
    title: 'Go Deeper',
    description: 'Advanced patterns and techniques',
    links: [
      { label: 'Memory and context', href: '/docs/category/advanced' },
      { label: 'Multi-agent workflows', href: '/docs/category/advanced' },
      { label: 'Reference material', href: '/docs/category/advanced' },
    ],
  },
];
