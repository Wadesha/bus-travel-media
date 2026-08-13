# 公交漫游创作站

城市公交旅游个人自媒体子网站：拍摄剪辑从简单到复杂。

纯静态站点（HTML / CSS / JS，无构建步骤），可直接部署到 Vercel / GitHub Pages / Netlify。

## 内容结构

- `index.html` — 首页：站点定位、能力路线图、三阶段概览
- `pages/`
  - `beginner.html` — 入门篇 · 手机固定窗景（简单）
  - `intermediate.html` — 进阶篇 · 多景别 + 运镜（中等）
  - `advanced.html` — 精通篇 · 多机位叙事（复杂）
  - `ideas.html` — 选题与运营：爆款选题库、标题公式、平台差异
  - `routes.html` — 分城市线路拍摄模板
  - `checklist.html` — 三档可打印拍摄清单
  - `gear.html` — 设备与软件对照
  - `about.html` — 关于与主理人
- `assets/css/style.css` — 设计系统
- `assets/js/site.js` — 共享导航/页脚与交互

## 本地预览

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署

将整个目录作为静态站点发布即可，无需任何编译。

---

内容仅供学习交流；拍摄请遵守当地公交运营与交通规定。
