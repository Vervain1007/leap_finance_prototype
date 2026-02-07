# IELTS Prep Prototype – Leap Scholar

An interactive prototype for Leap Scholar's gamified IELTS Prep product, focused on daily engagement and habit building.

## Quick Start

Open `index.html` in a modern browser. No build step required.

```bash
# Optional: serve locally
npx serve . -l 3000
```

**Use on your phone?** See [DEPLOY.md](DEPLOY.md) for WiFi, ngrok, or deploy options.

## Flow Overview

```
Onboarding → App (Home | Tasks | Progress | Leaderboard | Review)
                     ↓
            Daily Task (Quiz) → Reward
```

## Screens

| Screen | Description |
|--------|-------------|
| **Onboarding** | Target score (6.0–8.0+), daily study time (5–20 min) |
| **Home** | Greeting, progress bar, quick-start task, skills overview |
| **Tasks** | Gamified tasks: Reading Quiz, Flashcards, Listening, Writing (some locked) |
| **Progress** | Step-by-step preparation roadmap |
| **Leaderboard** | Weekly ranking |
| **Review** | Strengths, focus areas, weekly comparison |
| **Quiz** | 8-question MCQs with timer and instant feedback |
| **Reward** | Points, streak update, celebration, unlock notification |

## Design

- **Colors:** White, purple, and blue tones
- **Tone:** Student-friendly, motivating, minimal text
- **Elements:** Icons, emojis, progress indicators

## File Structure

```
ielts-prep-prototype/
├── index.html   # App shell, tabs, screens
├── styles.css   # Design system and layout
├── DEPLOY.md    # How to use on phone (WiFi, ngrok, deploy)
└── README.md    # This file
```
