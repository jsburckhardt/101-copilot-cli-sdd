# GitHub Copilot CLI Workshop - Phases Diagram

This diagram visualizes the learning journey through the GitHub Copilot CLI workshop, organized into three main phases.

## Workshop Flow Overview

```mermaid
graph TB
    Start([Start Workshop]) --> Phase1
    
    subgraph Phase1[" Phase 1: Foundation (50 min)"]
        direction TB
        M01[Module 01: Installation<br/>15 min<br/>📦 Install & Setup]
        M02[Module 02: Operating Modes<br/>20 min<br/>💬 Interactive & Programmatic]
        M03[Module 03: Session Management<br/>15 min<br/>🔄 Continue & Resume]
        
        M01 --> M02
        M02 --> M03
    end
    
    Phase1 --> Phase2
    
    subgraph Phase2[" Phase 2: Core Features (70 min)"]
        direction TB
        M04[Module 04: Custom Instructions<br/>25 min<br/>📝 AGENTS.md & llm.txt]
        M05[Module 05: Tools & Permissions<br/>20 min<br/>🔧 Built-in Tools & --yolo]
        M06[Module 06: MCP Servers<br/>25 min<br/>🔌 Remote & Local Servers]
        
        M04 --> M05
        M05 --> M06
    end
    
    Phase2 --> Phase3
    
    subgraph Phase3[" Phase 3: Advanced Capabilities (115 min)"]
        direction TB
        M07[Module 07: Agent Skills<br/>20 min<br/>⚡ Skills & Marketplace]
        M08[Module 08: Plugins<br/>15 min<br/>🧩 Plugin Ecosystem]
        M09[Module 09: Custom Agents<br/>25 min<br/>🤖 Specialized Agents]
        M10[Module 10: Hooks<br/>20 min<br/>🪝 Lifecycle Automation]
        M11[Module 11: Context Management<br/>15 min<br/>📊 Token Optimization]
        M12[Module 12: Advanced Topics<br/>20 min<br/>🚀 CI/CD & Best Practices]
        
        M07 --> M08
        M08 --> M09
        M09 --> M10
        M10 --> M11
        M11 --> M12
    end
    
    Phase3 --> Complete([Workshop Complete!<br/>🎉 4 hours total])
    
    style Phase1 fill:#e1f5ff,stroke:#0366d6,stroke-width:3px
    style Phase2 fill:#fff5e1,stroke:#f9826c,stroke-width:3px
    style Phase3 fill:#e1ffe1,stroke:#28a745,stroke-width:3px
    style Start fill:#f0f0f0,stroke:#666,stroke-width:2px
    style Complete fill:#d4edda,stroke:#28a745,stroke-width:3px
```

## Phase Breakdown

### 📘 Phase 1: Foundation (50 minutes)
**Goal:** Get set up and understand the basics

| Module | Topic | Duration | Key Takeaways |
|--------|-------|----------|---------------|
| 01 | Installation | 15 min | Install via npm/Homebrew, authenticate, verify setup |
| 02 | Operating Modes | 20 min | Interactive chat, programmatic mode, /delegate |
| 03 | Session Management | 15 min | Continue, resume, clear sessions, track history |

**Milestone:** You can install Copilot CLI, start sessions, and run basic commands

---

### 🔶 Phase 2: Core Features (70 minutes)
**Goal:** Master the essential features for productive use

| Module | Topic | Duration | Key Takeaways |
|--------|-------|----------|---------------|
| 04 | Custom Instructions | 25 min | AGENTS.md, llm.txt, copilot-instructions.md |
| 05 | Tools & Permissions | 20 min | Built-in tools, allow/deny lists, --yolo mode |
| 06 | MCP Servers | 25 min | Configure remote and local MCP servers |

**Milestone:** You can customize Copilot behavior, control tool usage, and extend with MCPs

---

### 🟢 Phase 3: Advanced Capabilities (115 minutes)
**Goal:** Unlock advanced automation and customization

| Module | Topic | Duration | Key Takeaways |
|--------|-------|----------|---------------|
| 07 | Agent Skills | 20 min | Create and use skills from agentskills.io |
| 08 | Plugins | 15 min | Discover and use plugins from marketplace |
| 09 | Custom Agents | 25 min | Build specialized agents and subagents |
| 10 | Hooks | 20 min | Lifecycle hooks for automation |
| 11 | Context Management | 15 min | /context, /compact, token optimization |
| 12 | Advanced Topics | 20 min | Environment vars, CI/CD integration, tips |

**Milestone:** You can build custom workflows, automate complex tasks, and optimize for production

---

## Learning Path Visualization

```mermaid
flowchart LR
    A[Beginner] -->|Phase 1| B[Intermediate]
    B -->|Phase 2| C[Advanced]
    C -->|Phase 3| D[Expert]
    
    style A fill:#e1f5ff,stroke:#0366d6
    style B fill:#fff5e1,stroke:#f9826c
    style C fill:#e1ffe1,stroke:#28a745
    style D fill:#d4edda,stroke:#28a745,stroke-width:3px
```

## Skill Progression

```mermaid
graph LR
    subgraph Beginner["🎯 Beginner Skills"]
        B1[Install & Setup]
        B2[Basic Commands]
        B3[Session Control]
    end
    
    subgraph Intermediate["⚙️ Intermediate Skills"]
        I1[Custom Instructions]
        I2[Tool Management]
        I3[MCP Integration]
    end
    
    subgraph Advanced["🚀 Advanced Skills"]
        A1[Skills & Plugins]
        A2[Custom Agents]
        A3[Automation]
        A4[Production Use]
    end
    
    Beginner --> Intermediate
    Intermediate --> Advanced
    
    style Beginner fill:#e1f5ff,stroke:#0366d6
    style Intermediate fill:#fff5e1,stroke:#f9826c
    style Advanced fill:#e1ffe1,stroke:#28a745
```

## Time Investment

```mermaid
pie title Workshop Time Distribution
    "Foundation (Phase 1)" : 50
    "Core Features (Phase 2)" : 70
    "Advanced Capabilities (Phase 3)" : 115
```

## Prerequisites Flow

```mermaid
graph TD
    PRE1[GitHub Account<br/>+ Copilot Subscription]
    PRE2[Node.js v22+<br/>npm v10+]
    PRE3[Command Line<br/>Experience]
    PRE4[Code Editor<br/>VS Code recommended]
    PRE5[Git Installed<br/>& Configured]
    
    PRE1 --> START{Ready to Start}
    PRE2 --> START
    PRE3 --> START
    PRE4 --> START
    PRE5 --> START
    
    START --> P1[Phase 1:<br/>Foundation]
    P1 --> P2[Phase 2:<br/>Core Features]
    P2 --> P3[Phase 3:<br/>Advanced]
    
    style START fill:#f0f0f0,stroke:#666,stroke-width:2px
    style P1 fill:#e1f5ff,stroke:#0366d6
    style P2 fill:#fff5e1,stroke:#f9826c
    style P3 fill:#e1ffe1,stroke:#28a745
```

## Module Dependencies

```mermaid
graph TD
    M01[01: Installation] --> M02[02: Modes]
    M02 --> M03[03: Sessions]
    M03 --> M04[04: Instructions]
    M04 --> M05[05: Tools]
    M05 --> M06[06: MCP Servers]
    M06 --> M07[07: Skills]
    M07 --> M08[08: Plugins]
    M08 --> M09[09: Custom Agents]
    M09 --> M10[10: Hooks]
    M10 --> M11[11: Context]
    M11 --> M12[12: Advanced]
    
    M04 -.->|helpful for| M09
    M05 -.->|helpful for| M09
    M06 -.->|helpful for| M09
    M07 -.->|helpful for| M09
    
    style M01 fill:#e1f5ff
    style M02 fill:#e1f5ff
    style M03 fill:#e1f5ff
    style M04 fill:#fff5e1
    style M05 fill:#fff5e1
    style M06 fill:#fff5e1
    style M07 fill:#e1ffe1
    style M08 fill:#e1ffe1
    style M09 fill:#e1ffe1
    style M10 fill:#e1ffe1
    style M11 fill:#e1ffe1
    style M12 fill:#e1ffe1
```

---

## Quick Navigation

- **Phase 1 (Foundation):** [01-Installation](01-installation.md) → [02-Modes](02-modes.md) → [03-Sessions](03-sessions.md)
- **Phase 2 (Core Features):** [04-Instructions](04-instructions.md) → [05-Tools](05-tools.md) → [06-MCPs](06-mcps.md)
- **Phase 3 (Advanced):** [07-Skills](07-skills.md) → [08-Plugins](08-plugins.md) → [09-Custom-Agents](09-custom-agents.md) → [10-Hooks](10-hooks.md) → [11-Context](11-context.md) → [12-Advanced](12-advanced.md)

---

**Total Workshop Duration:** Approximately 4 hours (235 minutes)

*This diagram provides a visual representation of your learning journey through the GitHub Copilot CLI workshop. Follow the phases sequentially for the best learning experience.*
