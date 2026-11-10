# 数商 · 中小企业数据合规审理服务（官网）

面向中小企业的普惠型数据合规服务品牌站。纯静态页面，无依赖、无构建，可直接由 GitHub Pages 托管。

- 线上地址：<https://hidsong.github.io/shushang/>
- 页面：首页、服务体系、技术方案、合规自测（12 题）、关于我们、联系我们
- 内容来源：《数商——中小企业数据合规审理服务项目计划书》

## 本地预览

```bash
python -m http.server 8000
# 打开 http://127.0.0.1:8000/
```

也可以直接双击 `index.html`（未使用 ES Module，`file://` 可运行）。

## 目录

```
.
├─ index.html          首页
├─ services.html       服务体系（审查 / 脱敏 / 风控 / 报价 / SLA）
├─ technology.html     技术方案（架构 / 算法 / 监测 / 安全 / 路线图）
├─ check.html          合规自测（12 题，本地计算）
├─ about.html          关于我们（团队 / 里程碑 / 社会价值 / 合作生态）
├─ contact.html        联系我们（演示表单 + FAQ）
├─ assets/css/style.css
├─ assets/js/main.js   导航 / 主题 / 动效
├─ assets/js/check.js  自测题库与评分
└─ .nojekyll           关闭 Jekyll 处理
```

## 发布前需替换

团队姓名、指导教师、联系方式、服务报价、备案号均为占位（站内以「待填写」标记），替换后再对外发布。

## 部署

仓库 Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存后即发布到 `https://hidsong.github.io/shushang/`。
