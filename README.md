<div align="center">

# ⚡ FreelanceOS

**The all-in-one desktop operating system and productivity cockpit designed for modern freelancers and independent creators.**

[![Electron](https://img.shields.io/badge/Electron-44.7.0-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=for-the-badge&logo=windows&logoColor=blue)](https://github.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

<br />

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-keyboard-shortcuts">Shortcuts</a> •
  <a href="#-building--packaging">Packaging</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

## 📖 Overview

**FreelanceOS** is a high-performance cross-platform desktop application built to eliminate tool sprawl. Instead of juggling disjointed apps for task management, invoicing, client notes, file storage, and financial tracking, FreelanceOS provides a unified, distraction-free desktop environment.

Crafted with an ultra-clean, minimalist design aesthetic inspired by Linear and Notion, FreelanceOS empowers freelancers to focus on high-impact work while effortlessly maintaining operational clarity.

---

## ✨ Features

### 📊 1. Command Dashboard & Overview
- **Real-Time Financial Metrics**: Monthly revenue tracking, outstanding receivables, active client counters, and completion velocity.
- **Focus Queues**: "Today's Focus" list and "Needs Attention" urgency signals to prevent missed deadlines.
- **Deadline Radar**: Visual status cards for near-term milestones and invoice due dates.

### 💼 2. Project & Milestone Management
- **Multi-View Project Hub**: Instant filtering by `Active`, `Completed`, and `Overdue` statuses with fuzzy search.
- **Deep-Dive Project Workspace**: Dedicated tabs for **Overview**, **Tasks**, **Milestones**, **Files**, **Time Tracking**, **Invoices**, and **Activity Logs**.
- **Interactive Milestone Roadmap**: Real-time progress bars, deliverable checklists, and status transitions.

### 📝 3. Project Notes (Split-View Rich Editor)
- **Notion-Style Document Editor**: Built-in rich text formatting (Headings, bold, italics, code blocks, quotes, checklists).
- **Collapsible Notes Tree**: Organize client meetings, discovery sessions, and design briefs directly within the project context.
- **Auto-Save & Status Indicators**: Real-time save status with instant search across all project documentation.

### ✅ 4. Task Center & Recurring Engine
- **List & Kanban Board Views**: Drag-and-drop workflow visualization across `To Do`, `In Progress`, and `Completed`.
- **Side Detail Drawer**: Granular subtasks, tags, priority levels, estimated hours, and client linkage.
- **Recurring Tasks Automation**: Manage scheduled retainers, weekly maintenance, and automated repeating task routines.

### 👥 5. Client Relationship Management (CRM)
- **Comprehensive Client Profiles**: Contact cards, portal links, lifetime value, and active contract summaries.
- **Interactive Relationship Timeline**: Chronological log of discovery calls, feedback rounds, and invoice events.
- **Client Document & Project Vault**: Instant access to all projects, milestones, and deliverables tied to each client.

### 🧾 6. Invoices & Live A4 Document Generator
- **Multi-Status Invoice Tracker**: Filter by `Draft`, `Pending`, `Paid`, and `Overdue`.
- **Dynamic Invoice Builder**: Itemized billing with tax calculation, discount adjustments, payment notes, and currency support.
- **Pixel-Perfect A4 Sheet Preview**: Print-ready, executive-quality invoice view ready for immediate PDF export or sharing.

### 📁 7. File & Document Storage
- **Structured File Directory**: Organize assets, design deliverables, signed contracts, and payment proofs.
- **Quick File Inspector**: Side panel displaying metadata, size, upload history, and mini-contract viewers.
- **Drag-and-Drop Staging**: Rapid drop area for new project attachments.

### 🔍 8. Command Palette (`⌘ K` / `Ctrl + K`)
- **System-Wide Spotlight Search**: Instant search across projects, tasks, invoices, documents, and clients from anywhere in the app.
- **Quick Actions**: One-click shortcuts to spawn projects, tasks, invoices, or expense records.
- **Keyboard-First Workflow**: Seamless navigation with arrow keys and `Escape` dismissals.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Electron 44** | Secure, cross-platform native runtime for Windows, macOS, and Linux |
| **Electron Forge** | Enterprise-grade packaging, building, and publishing pipeline |
| **Vanilla JavaScript (ES6+)** | Fast, zero-overhead DOM rendering and SPA navigation |
| **Modular CSS3** | Custom design system with clean CSS variables and responsive flex/grid layouts |
| **SVG Micro-Icons** | Crisp, scalable iconography optimized for high-DPI retina displays |

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed:
```bash
node -v
npm -v


Installation
1. Clone the repository:
git clone https://github.com/doniwah/FreelanceOS.git
cd FreelanceOS/FreelanceOS

2. Install dependencies:
npm install

3. Start the application in development mode:
npm start

📦 Building & Packaging
To compile standalone native executables and installers for your operating system:

1. Package Standalone Binary
npm run package
Outputs compiled binaries to the out/ directory.

2. Generate Installers (EXE, DMG, DEB, RPM, ZIP)
npm run make

📂 Project Structure
FreelanceOS/
├── src/
│   ├── index.js          # Electron main process (Window lifecycle, IPC handlers)
│   ├── index.html        # Main desktop UI (SPA view layouts & component templates)
│   ├── index.css         # Design system, layout rules, and component styling
│   └── renderer.js       # Renderer logic (State management, SPA router, modals)
├── forge.config.js       # Electron Forge build & maker configuration
├── package.json          # Manifest, scripts, and dependencies
├── .gitignore            # Git exclusion rules
└── README.md             # Project documentation

