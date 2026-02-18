# Discord Widgets
**Create beautiful, customizable SVG invite cards for your websites, GitHub READMEs, and community forums.**


## ✨ Features
- Supports current & legacy invites
- Supports animated icons & banners
- Optimized caching for performance
- Easy to embed in GitHub READMEs & websites


## 🎮 Playground
**A live playground is available at:**

[**https://discordwidgets.vercel.app/**](https://discordwidgets.vercel.app/)

**Use it to:**
- Preview widgets in real-time
- Toggle animation and layout options
- Generate ready-to-use embed URLs


## 🌐 API Usage
### Base Endpoint
```http
GET https://discordwidgets.vercel.app/widgets/invite/{invite_code|server_id}
```

### Query Parameters

#### Current Widget (`style=current` or default)
| Param     | Values                          | Default   | Description                           |
| --------- | ------------------------------- | --------- | ------------------------------------- |
| `style`   | `current`                       | `current` | The layout style of the widget.       |
| `theme`   | `dark`, `light`, `ash`, `onyx`  | `dark`    | The color theme of the widget.        |
| `animate` | `true` \| `false`               | `true`    | Toggle animated icons & banners.      |
| `hidetag` | `true` \| `false`               | `false`   | Hides the guild tag badge if present. |

```http
GET /widgets/invite/{invite_code|server_id}?theme=dark&hidetag=false
```

#### Legacy Widget (`style=legacy`)
| Param       | Values           | Default | Description                               |
| ----------- | ---------------- | ------- | ----------------------------------------- |
| `style`     | `legacy`         | -       | The layout style of the widget.           |
| `theme`     | `dark`, `light`  | `dark`  | The color theme of the widget.            |
| `animate`   | `true` | `false` | `true`  | Toggle animated icons & banners.          |
| `usebanner` | `true` | `false` | `true`  | Use guild banner instead of guild splash. |

```http
GET /widgets/invite/{invite_code|server_id}?style=legacy&theme=dark&usebanner=true
```


## 🪴 Preview
### Current Widget
| Dark Theme | Light Theme |
| ---------- | ----------- |
| ![Discord Invite](https://discordwidgets.vercel.app/widgets/invite/GaczkwfgV9?theme=dark) | ![Discord Invite](https://discordwidgets.vercel.app/widgets/invite/GaczkwfgV9?theme=light) |

### Legacy Widget
| Dark Theme | Light Theme |
| ---------- | ----------- |
| ![Discord Invite](https://discordwidgets.vercel.app/widgets/invite/GaczkwfgV9?style=legacy&theme=dark) | ![Discord Invite](https://discordwidgets.vercel.app/widgets/invite/GaczkwfgV9?style=legacy&theme=light) |


## 🚀 Local Development
**Follow these steps to run the project locally.**

### Prerequisites
* Node.js 18+
* npm or yarn

### Installation
1. **Clone the Repository**
```bash
git clone https://github.com/aniket091/discordwidgets.git
cd discordwidgets
```

2. **Install Dependencies**
```bash
yarn install
# or
npm install
```

3. **Start Development Server**
```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🤝 Contributing
Contributions, issues and feature requests are welcome! <br>
Check out the contributing guidelines before submitting a PR.