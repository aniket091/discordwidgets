# Contributing Guide

Thank you for your interest in contributing!

This project provides dynamic SVG Discord invite widgets.  
We welcome bug fixes, performance improvements, and new features.


## Getting Started

### 1. Fork the repository
Click the **Fork** button and clone your fork:
```bash
git clone https://github.com/your-username/discordwidgets.git
cd discordwidgets
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Start development server
```bash
yarn run dev
```


## 🛠 Development Guidelines

### Code
- Use **TypeScript**
- Keep code clean and readable
- Avoid unnecessary dependencies
- Keep functions small and focused
- Prefer pure functions where possible

### SVG Rendering Rules
Since this project generates SVG dynamically:
- Ensure SVG output renders correctly in:
  - Browser
  - GitHub README
  - `<img>` tags
- Avoid inline scripts inside SVG
- Ensure no broken paths
- Maintain consistent spacing/layout

### Caching Guidelines
If your change affects caching:
- Clearly document it in your PR
- Do not reduce cache efficiency without strong reason
- Ensure `Cache-Control` headers remain appropriate

## Reporting Bugs
If you find a bug:
1. Open a new issue
2. Provide:
  - Invite code used
  - Description of issue
  - Expected behavior
  - Screenshot if applicable


## Suggesting Features
When suggesting features:
- Explain the problem it solves
- Keep scope reasonable
- Consider performance impact

## Pull Request Process
1. Create a new branch:
  ```bash
  git checkout -b feature/your-feature-name
  ```
2. Make your changes  
3. Test locally  
4. Open a Pull Request  

Please ensure:
- SVG renders correctly
- No breaking changes (unless documented)
- Related issues are linked

## Code of Conduct
Please be respectful and constructive in discussions.  
We aim to maintain a friendly and professional environment.

## Questions?
If you're unsure about something or need help, please use  
**GitHub Discussions** instead of opening an issue:

https://github.com/aniket091/discordwidgets/discussions

**Thanks for contributing! :)**