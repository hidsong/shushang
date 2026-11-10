/* 数商 · 数据合规自测工具（纯前端，数据不出浏览器） */
(function () {
  "use strict";

  var DIMS = [
    { id: "rights", name: "数据资产与确权" },
    { id: "pi", name: "个人信息处理" },
    { id: "tech", name: "技术防护" },
    { id: "gov", name: "制度与应急" }
  ];

  var OPTIONS = [
    { value: 2, label: "已落实" },
    { value: 1, label: "部分落实" },
    { value: 0, label: "未落实" }
  ];

  var QUESTIONS = [
    {
      id: "q1", dim: "rights",
      title: "是否完成数据资产盘点与分类分级？",
      desc: "知道自己有哪些数据、存在哪里、属于哪一级别。",
      advice: "建议从数据资产盘点入手，形成分类分级清单，明确每类数据的责任人、存储位置与使用范围。"
    },
    {
      id: "q2", dim: "rights",
      title: "是否明确数据来源与权属关系？",
      desc: "区分企业自有数据、用户个人数据、公共数据与第三方数据。",
      advice: "建立数据来源台账，逐项记录采集渠道、授权方式与权属依据；第三方数据须保留合同与授权文件。"
    },
    {
      id: "q3", dim: "rights",
      title: "是否建立敏感数据字段清单与处理台账？",
      desc: "身份证号、手机号、住址、金融账户等字段是否被识别并标记。",
      advice: "编制敏感数据字段清单与处理台账，标记高风险字段，并逐项落实脱敏、加密与访问控制措施。"
    },
    {
      id: "q4", dim: "pi",
      title: "收集个人信息是否做到告知同意与最小必要？",
      desc: "只收集业务必需的信息，并留存用户同意记录。",
      advice: "按「告知—同意—最小必要」原则改造采集流程，取消非必要字段，并留存可追溯的同意记录。"
    },
    {
      id: "q5", dim: "pi",
      title: "隐私政策是否完整、易懂、可撤回？",
      desc: "处理目的、方式、范围、保存期限、共享对象与用户权利是否写清楚。",
      advice: "完善隐私政策：写明处理目的、方式、范围、保存期限、共享对象、用户权利与撤回渠道，避免空泛表述。"
    },
    {
      id: "q6", dim: "pi",
      title: "敏感个人信息是否取得单独同意并开展影响评估？",
      desc: "生物识别、医疗健康、金融账户、行踪轨迹等敏感信息。",
      advice: "对敏感个人信息取得单独同意，并开展个人信息保护影响评估（PIA），留存评估报告与整改记录。"
    },
    {
      id: "q7", dim: "tech",
      title: "敏感字段是否脱敏或加密存储与传输？",
      desc: "存储加密、传输加密，日志与备份同样受保护。",
      advice: "对敏感字段实施脱敏或加密：存储采用 AES-256，传输采用 TLS 1.3，日志与备份同样需要加密。"
    },
    {
      id: "q8", dim: "tech",
      title: "是否实施访问控制与最小权限管理？",
      desc: "基于角色的权限分配、关键操作多因素认证、定期权限复核。",
      advice: "推行基于角色的访问控制与最小权限原则，关键操作启用多因素认证，并定期复核权限与离岗回收。"
    },
    {
      id: "q9", dim: "tech",
      title: "是否有日志审计与异常访问监测？",
      desc: "批量导出、非工作时间访问、越权访问能否被及时发现。",
      advice: "建立访问与操作日志审计，设置异常访问规则（批量导出、非工作时间访问、越权访问等），做到行为可追溯。"
    },
    {
      id: "q10", dim: "gov",
      title: "是否建立数据安全管理制度与责任岗位？",
      desc: "制度、流程、责任人三件事是否都有。",
      advice: "制定数据安全管理制度与个人信息保护制度，明确负责人与各部门职责，并定期检查制度落实情况。"
    },
    {
      id: "q11", dim: "gov",
      title: "是否定期开展员工数据安全培训？",
      desc: "覆盖法务、业务、IT 与管理层，并保留培训记录。",
      advice: "每年至少开展一次全员数据安全培训，覆盖法务、业务、IT 与管理层，并保留签到与考核记录。"
    },
    {
      id: "q12", dim: "gov",
      title: "是否制定应急预案并组织演练？",
      desc: "事件分级、上报路径、处置流程与复盘机制是否明确。",
      advice: "制定数据安全事件应急预案，明确分级、上报与处置流程，每年至少演练一次并复盘改进。"
    }
  ];

  var LEVELS = [
    {
      min: 85, label: "低风险", badge: "badge--teal",
      title: "数据合规基础良好",
      desc: "四个维度整体落实较好。建议保持现有机制，定期复核制度执行与权限配置，并关注法规更新带来的新要求。"
    },
    {
      min: 65, label: "中等风险", badge: "",
      title: "存在明显短板，建议分阶段整改",
      desc: "核心环节已有基础，但仍有环节缺失或执行不到位。建议优先补齐得分最低的维度，再逐步完善制度与工具。"
    },
    {
      min: 45, label: "较高风险", badge: "badge--warn",
      title: "合规基础薄弱，建议尽快系统整改",
      desc: "多个关键环节尚未建立或形同虚设，面对监管检查与数据事件时抗风险能力不足。建议尽快启动合规建设。"
    },
    {
      min: 0, label: "高风险", badge: "badge--danger",
      title: "多个关键环节缺失，建议立即行动",
      desc: "数据确权、个人信息保护、技术防护与制度应急中存在多处空白，一旦发生数据事件，企业将面临较高的法律与经营风险。"
    }
  ];

  var TOTAL = QUESTIONS.length;
  var MAX_SCORE = TOTAL * 2;

  var form = document.getElementById("check-form");
  var list = document.getElementById("question-list");
  var dimList = document.getElementById("dim-list");
  var answeredEl = document.getElementById("answered-count");
  var progressText = document.getElementById("progress-text");
  var progressFill = document.getElementById("progress-fill");
  var progressBar = document.querySelector(".progress-bar");
  var resultSection = document.getElementById("result-section");
  var answers = {};

  if (!form || !list) return;

  /* ---------- 渲染问卷 ---------- */
  var counter = 0;
  var html = DIMS.map(function (dim) {
    var items = QUESTIONS.filter(function (q) { return q.dim === dim.id; });
    var body = items.map(function (q) {
      counter += 1;
      var num = counter < 10 ? "0" + counter : String(counter);
      var opts = OPTIONS.map(function (opt) {
        return (
          '<label class="q-option">' +
            '<input type="radio" name="' + q.id + '" value="' + opt.value + '">' +
            "<span>" + opt.label + "</span>" +
          "</label>"
        );
      }).join("");
      return (
        '<div class="question" id="q-' + q.id + '">' +
          '<div class="q-title"><span class="q-num">' + num + "</span>" + q.title + "</div>" +
          (q.desc ? '<p class="q-desc">' + q.desc + "</p>" : "") +
          '<div class="q-options" role="radiogroup" aria-label="' + q.title + '">' + opts + "</div>" +
        "</div>"
      );
    }).join("");
    return (
      '<div class="q-group">' +
        '<div class="q-group-title">' + dim.name + '<span class="line"></span></div>' +
        body +
      "</div>"
    );
  }).join("");
  list.innerHTML = html;

  /* ---------- 维度栏 ---------- */
  dimList.innerHTML = DIMS.map(function (dim) {
    return (
      '<div class="dim-row" data-dim="' + dim.id + '">' +
        '<div class="dim-row-head"><span>' + dim.name + "</span><b>0%</b></div>" +
        '<div class="dim-bar"><i></i></div>' +
      "</div>"
    );
  }).join("");

  /* ---------- 状态更新 ---------- */
  function answeredCount() {
    return Object.keys(answers).length;
  }

  function dimScore(dimId) {
    var sum = 0;
    QUESTIONS.forEach(function (q) {
      if (q.dim === dimId) sum += answers[q.id] || 0;
    });
    return sum;
  }

  function renderProgress() {
    var done = answeredCount();
    var pct = Math.round((done / TOTAL) * 100);
    answeredEl.textContent = String(done);
    progressText.textContent = pct + "%";
    progressFill.style.width = pct + "%";
    if (progressBar) progressBar.setAttribute("aria-valuenow", String(pct));

    DIMS.forEach(function (dim) {
      var max = QUESTIONS.filter(function (q) { return q.dim === dim.id; }).length * 2;
      var pctDim = max ? Math.round((dimScore(dim.id) / max) * 100) : 0;
      var row = dimList.querySelector('[data-dim="' + dim.id + '"]');
      if (!row) return;
      row.querySelector("b").textContent = pctDim + "%";
      var fill = row.querySelector("i");
      fill.style.width = pctDim + "%";
      fill.className = pctDim < 40 ? "is-low" : pctDim < 70 ? "is-mid" : "is-high";
    });
  }

  form.addEventListener("change", function (event) {
    var input = event.target;
    if (!input.matches('input[type="radio"]')) return;
    answers[input.name] = Number(input.value);
    var stale = document.getElementById("form-msg");
    if (stale) stale.remove();
    var q = input.closest(".question");
    if (q) q.classList.remove("has-error");
    renderProgress();
  });

  /* ---------- 提交 ---------- */
  function clearMessage() {
    var msg = document.getElementById("form-msg");
    if (msg) msg.remove();
    form.querySelectorAll(".has-error").forEach(function (el) {
      el.classList.remove("has-error");
    });
  }

  function showMessage(text) {
    clearMessage();
    var p = document.createElement("p");
    p.id = "form-msg";
    p.className = "notice";
    p.style.marginTop = "4px";
    p.textContent = text;
    form.querySelector(".check-actions").before(p);
  }

  function levelFor(pct) {
    for (var i = 0; i < LEVELS.length; i += 1) {
      if (pct >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[LEVELS.length - 1];
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    var missing = QUESTIONS.filter(function (q) {
      return typeof answers[q.id] === "undefined";
    });

    if (missing.length) {
      var first = document.getElementById("q-" + missing[0].id);
      if (first) {
        first.classList.add("has-error");
        first.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      showMessage("还有 " + missing.length + " 题未作答，请完成后生成报告。");
      return;
    }

    var score = 0;
    QUESTIONS.forEach(function (q) { score += answers[q.id] || 0; });
    var pct = Math.round((score / MAX_SCORE) * 100);
    var level = levelFor(pct);

    document.getElementById("score-num").textContent = String(pct);
    var badge = document.getElementById("level-badge");
    badge.className = "badge " + level.badge;
    badge.textContent = level.label;
    document.getElementById("level-title").textContent = level.title;
    document.getElementById("level-desc").textContent = level.desc;

    document.getElementById("result-levels").innerHTML = DIMS.map(function (dim) {
      var max = QUESTIONS.filter(function (q) { return q.dim === dim.id; }).length * 2;
      var p = Math.round((dimScore(dim.id) / max) * 100);
      return '<span class="badge badge--muted">' + dim.name + " " + p + "%</span>";
    }).join("");

    var weak = QUESTIONS.filter(function (q) { return (answers[q.id] || 0) <= 1; })
      .sort(function (a, b) { return (answers[a.id] || 0) - (answers[b.id] || 0); })
      .slice(0, 4);

    var weakList = document.getElementById("weak-list");
    if (!weak.length) {
      weakList.innerHTML =
        '<p class="text-muted" style="margin:0;">四个维度均已落实，未发现明显短板。建议保持现有机制并定期复核。</p>';
    } else {
      weakList.innerHTML = weak.map(function (q, i) {
        var idx = (i + 1) < 10 ? "0" + (i + 1) : String(i + 1);
        return (
          '<div class="weak-item">' +
            '<span class="idx">' + idx + "</span>" +
            "<div><h4>" + q.title + "</h4><p>" + q.advice + "</p></div>" +
          "</div>"
        );
      }).join("");
    }

    resultSection.hidden = false;
    var circle = document.getElementById("score-circle");
    var circumference = 2 * Math.PI * 54;
    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(circumference);
    requestAnimationFrame(function () {
      window.setTimeout(function () {
        circle.style.strokeDashoffset = String(circumference * (1 - pct / 100));
      }, 60);
    });

    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- 重置 / 重测 / 打印 ---------- */
  function resetAll() {
    answers = {};
    form.reset();
    clearMessage();
    renderProgress();
    resultSection.hidden = true;
    var circle = document.getElementById("score-circle");
    if (circle) circle.style.strokeDashoffset = String(2 * Math.PI * 54);
  }

  var resetBtn = document.getElementById("reset-form");
  if (resetBtn) {
    resetBtn.addEventListener("click", function (event) {
      event.preventDefault();
      resetAll();
      document.getElementById("check-form").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  var restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", function () {
      resetAll();
      document.getElementById("check-form").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  var printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  renderProgress();
})();
