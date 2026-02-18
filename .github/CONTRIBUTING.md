# Contributing Guide
Thank you for your interest in contributing to **Discord Widgets**!
We welcome bug fixes, performance improvements, documentation updates, and new widget features.


## 🚀 Getting Started

### 1. Fork & Clone the Repository
```bash
git clone https://github.com/your-username/discordwidgets.git
cd discordwidgets
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Start the Development Server
```bash
yarn dev
# or
npm run dev
```
Then open:
[http://localhost:3000](http://localhost:3000)


## 🧩 Project Structure Overview
```
/app/api/invite/[code]       → API route for invite widgets
/lib/guildInvite             → Current widget renderer
/lib/legacyInvite            → Legacy widget renderer
/lib/services                → Invite resolving logic
```


## 🛠 Development Guidelines

### Code Style
* Use **TypeScript**
* Keep code clean, typed, and readable
* Avoid unnecessary dependencies
* Prefer small, focused, pure functions
* Reuse utilities instead of duplicating logic

### Naming Conventions
* Query params should be **lowercase** (e.g. `hidetag`, `usebanner`)
* Theme keys should match URL params exactly


## 🎨 SVG Rendering Rules
Since this project dynamically generates SVG:

* Ensure SVG renders correctly in:
  * Browsers
  * GitHub READMEs
  * `<img>` embeds
* Avoid broken image paths
* Maintain consistent layout & spacing
* Verify both `current` and `legacy` styles render properly


## 🧪 Testing Your Changes
Before opening a PR, test using:
```
/widgets/invite/{code}?theme=dark
/widgets/invite/{code}?style=legacy&theme=light
```
Also verify:
* All themes render correctly
* All settings work correctly


## 🐛 Reporting Bugs
When reporting a bug, include:
* Invite code used
* Full widget URL
* Expected vs actual behavior
* Screenshot (if applicable)


## 💡 Suggesting Features
When proposing a feature:
* Explain the problem it solves
* Keep scope focused and reasonable
* Consider performance + caching impact
* Mention whether it affects current, legacy, or both widgets


## 🔀 Pull Request Process
1. Create a new branch:
  ```bash
  git checkout -b feature/your-feature-name
  ```

2. Make your changes
3. Test locally using the playground + API routes
4. Open a Pull Request


## 🤝 Code of Conduct
Please be respectful and constructive in discussions. <br>
We aim to maintain a friendly and professional environment for all contributors.


## ❓ Questions
If you're unsure about something or need guidance, <br>
use **GitHub Discussions** instead of opening an issue: <br>
[https://github.com/aniket091/discordwidgets/discussions](https://github.com/aniket091/discordwidgets/discussions)

**Thanks for contributing! :)**