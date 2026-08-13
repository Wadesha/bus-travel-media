/* =====================================================================
   城市公交旅游自媒体创作站 — 共享脚本
   职责：注入导航栏 / 页脚、当前页高亮、移动端菜单、返回顶部、进度条
   ===================================================================== */
(function () {
  "use strict";

  /* 当前页标识由每个页面 <body data-page="xxx"> 提供 */
  var page = document.body.getAttribute("data-page") || "";

  /* 以站点根目录为基准的相对路径 */
  var NAV = [
    { id: "home", label: "首页", href: "index.html" },
    { id: "beginner", label: "入门篇", href: "pages/beginner.html" },
    { id: "intermediate", label: "进阶篇", href: "pages/intermediate.html" },
    { id: "advanced", label: "精通篇", href: "pages/advanced.html" },
    { id: "ideas", label: "选题运营", href: "pages/ideas.html" },
    { id: "routes", label: "线路模板", href: "pages/routes.html" },
    { id: "checklist", label: "拍摄清单", href: "pages/checklist.html" },
    { id: "gear", label: "设备工具", href: "pages/gear.html" },
    { id: "about", label: "关于", href: "pages/about.html" }
  ];

  /* 根据路径判断当前是否在子页（/pages/ 目录下） */
  var isSub = location.pathname.indexOf("/pages/") !== -1;

  /* 子页需在路径前补 "../" 回到根目录 */
  function hrefOf(item) {
    return isSub ? "../" + item.href : item.href;
  }

  /* ---------- 注入导航 ---------- */
  var navLinks = NAV.map(function (n) {
    var cls = (n.id === page) ? ' class="active"' : "";
    return '<a href="' + hrefOf(n) + '"' + cls + ">" + n.label + "</a>";
  }).join("");

  var navHTML =
    '<nav class="site-nav">' +
      '<div class="nav-inner">' +
        '<a class="brand" href="' + (isSub ? "../index.html" : "index.html") + '">' +
          '<span class="logo">公</span>' +
          '<span>公交漫游创作站<small>城市公交旅游 · 拍摄剪辑从入门到精通</small></span>' +
        "</a>" +
        '<button class="nav-toggle" aria-label="菜单">☰</button>' +
        '<div class="nav-links">' + navLinks + "</div>" +
      "</div>" +
    "</nav>";

  /* ---------- 注入页脚 ---------- */
  var footHTML =
    '<footer class="site-foot">' +
      '<div class="container">' +
        '<div class="foot-grid">' +
          "<div>" +
            '<div class="brand-row"><span class="logo">公</span>公交漫游创作站</div>' +
            '<p style="margin:12px 0 0;color:#8b98a8;font-size:13.5px;max-width:300px;">' +
            "一个专注城市公交 / 城市漫游短视频的个人自媒体创作手册。从一部手机、一段窗景开始，到多机位叙事与系统化发布。</p>" +
          "</div>" +
          "<div><h5>学习路线</h5>" +
            '<a href="' + (isSub ? "beginner.html" : "pages/beginner.html") + '">① 入门篇 · 简单</a>' +
            '<a href="' + (isSub ? "intermediate.html" : "pages/intermediate.html") + '">② 进阶篇 · 中等</a>' +
            '<a href="' + (isSub ? "advanced.html" : "pages/advanced.html") + '">③ 精通篇 · 复杂</a>' +
          "</div>" +
          "<div><h5>工具</h5>" +
            '<a href="' + (isSub ? "ideas.html" : "pages/ideas.html") + '">选题与运营</a>' +
            '<a href="' + (isSub ? "routes.html" : "pages/routes.html") + '">分城市线路模板</a>' +
            '<a href="' + (isSub ? "gear.html" : "pages/gear.html") + '">设备与软件对照</a>' +
            '<a href="' + (isSub ? "advanced.html" : "pages/advanced.html") + '#sop">发布 SOP</a>' +
          "</div>" +
          "<div><h5>关于</h5>" +
            '<a href="' + (isSub ? "../index.html" : "index.html") + '#about">站点定位</a>' +
            '<a href="' + (isSub ? "../index.html" : "index.html") + '#roadmap">能力路线图</a>' +
            '<a href="' + (isSub ? "../index.html" : "index.html") + '#update">更新日志</a>' +
          "</div>" +
        "</div>" +
        '<div class="foot-bottom">© 个人自媒体项目 · 公交漫游创作站 · 内容仅供学习交流，拍摄请遵守当地交通与公交运营规定。</div>' +
      "</div>" +
    "</footer>";

  /* 在 <body> 开头插入导航，结尾插入页脚 */
  document.body.insertAdjacentHTML("afterbegin", navHTML);
  document.body.insertAdjacentHTML("beforeend", footHTML);

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- 返回顶部 ---------- */
  var btn = document.createElement("button");
  btn.className = "to-top"; btn.innerHTML = "↑"; btn.setAttribute("aria-label", "返回顶部");
  document.body.appendChild(btn);
  btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  window.addEventListener("scroll", function () {
    if (window.scrollY > 480) btn.classList.add("show"); else btn.classList.remove("show");
  });

  /* ---------- 阅读进度条（子页面） ---------- */
  if (page && page !== "home") {
    var bar = document.createElement("div");
    bar.style.cssText = "position:fixed;top:0;left:0;height:3px;width:0;z-index:60;background:linear-gradient(90deg,#ff6a2b,#e2531a);transition:width .1s;";
    document.body.appendChild(bar);
    window.addEventListener("scroll", function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = p + "%";
    });
  }

  /* ---------- 外部链接新窗口 ---------- */
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    a.target = "_blank"; a.rel = "noopener";
  });
})();
