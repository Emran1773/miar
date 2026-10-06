/* =========================================================
   مِعيار — APP.JS
   متوافق بالكامل مع index.html
   ويقرأ البيانات من data.json
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", async () => {

  /* =======================================================
     STATE
  ======================================================= */

  const STORAGE_KEY = "miyar_state";

  const fallbackData = {
    app: {
      name: "مِعيار",
      name_en: "Miyar",
      version: "1.0.0",
      language: "ar",
      direction: "rtl",
      theme: "light"
    },

    user: {
      name: "عمران",
      level: 4,
      score: 78,
      levelProgress: 68,
      streak: 12,
      totalAchievements: 18,
      unlockedAchievements: 12
    },

    stats: {
      goals: 7,
      completedGoals: 4,
      habits: 7,
      completedHabits: 5,
      skills: 6,
      achievements: 18,
      unlockedAchievements: 12
    },

    goals: [
      {
        id: 1,
        title: "إتقان التصميم",
        description: "تطوير مهارات التصميم والوصول إلى مستوى متقدم.",
        category: "مهارة",
        progress: 82,
        status: "مستمر",
        icon: "✦"
      },
      {
        id: 2,
        title: "إنهاء المشروع",
        description: "إتمام المشروع الشخصي وإخراجه بصورة احترافية.",
        category: "مشروع",
        progress: 64,
        status: "مستمر",
        icon: "◆"
      },
      {
        id: 3,
        title: "بناء معرض الأعمال",
        description: "جمع أفضل الأعمال في ملف شخصي واحد.",
        category: "إنجاز",
        progress: 91,
        status: "قريباً",
        icon: "▣"
      },
      {
        id: 4,
        title: "تعلم البرمجة",
        description: "الاستمرار في تطوير مهارات البرمجة وبناء المشاريع.",
        category: "تعلم",
        progress: 57,
        status: "مستمر",
        icon: "⌘"
      },
      {
        id: 5,
        title: "قراءة 20 كتاباً",
        description: "إتمام مجموعة مختارة من الكتب خلال العام.",
        category: "قراءة",
        progress: 70,
        status: "مستمر",
        icon: "▤"
      },
      {
        id: 6,
        title: "مشروع جديد",
        description: "تحويل فكرة جديدة إلى منتج رقمي متكامل.",
        category: "مشروع",
        progress: 35,
        status: "جديد",
        icon: "＋"
      }
    ],

    skills: [
      { id: 1, name: "التصميم", progress: 88, icon: "✦" },
      { id: 2, name: "البرمجة", progress: 76, icon: "⌘" },
      { id: 3, name: "صناعة المحتوى", progress: 71, icon: "◈" },
      { id: 4, name: "التعليق الصوتي", progress: 62, icon: "◉" },
      { id: 5, name: "تحرير الفيديو", progress: 79, icon: "▶" },
      { id: 6, name: "الذكاء الاصطناعي", progress: 84, icon: "✧" }
    ],

    habits: [
      { id: 1, name: "القراءة", description: "قراءة يومية", completed: true, streak: 12 },
      { id: 2, name: "التعلم", description: "تعلم شيء جديد", completed: true, streak: 8 },
      { id: 3, name: "إنجاز المهام", description: "إنهاء أهم مهمة", completed: true, streak: 15 },
      { id: 4, name: "الرياضة", description: "نشاط يومي", completed: false, streak: 4 },
      { id: 5, name: "التخطيط", description: "مراجعة اليوم", completed: true, streak: 11 },
      { id: 6, name: "المراجعة", description: "مراجعة ما تم إنجازه", completed: false, streak: 3 },
      { id: 7, name: "التطوير", description: "تحسين مشروع", completed: true, streak: 7 }
    ],

    achievements: [
      { id: 1, title: "البداية", description: "أكملت أول إنجاز لك.", icon: "✦", unlocked: true, date: "أكتوبر 2026" },
      { id: 2, title: "أول خطوة", description: "أكملت أول هدف.", icon: "➜", unlocked: true, date: "سبتمبر 2026" },
      { id: 3, title: "المثابرة", description: "حافظت على سلسلة إنجاز متواصلة.", icon: "◆", unlocked: true, date: "سبتمبر 2026" },
      { id: 4, title: "صانع الأثر", description: "أنجزت 10 أعمال مهمة.", icon: "✧", unlocked: true, date: "سبتمبر 2026" },
      { id: 5, title: "المتعلم", description: "أكملت 5 أهداف تعليمية.", icon: "▤", unlocked: true, date: "أغسطس 2026" },
      { id: 6, title: "المبدع", description: "أنشأت أول مشروع إبداعي.", icon: "◈", unlocked: true, date: "أغسطس 2026" },
      { id: 7, title: "المحترف", description: "وصلت إلى مستوى متقدم.", icon: "♢", unlocked: true, date: "أغسطس 2026" },
      { id: 8, title: "الأثر الأول", description: "حققت إنجازاً ترك أثراً واضحاً.", icon: "◎", unlocked: true, date: "يوليو 2026" },
      { id: 9, title: "الاستمرارية", description: "حافظت على تقدمك لمدة شهر.", icon: "∞", unlocked: true, date: "يوليو 2026" },
      { id: 10, title: "جامع الإنجازات", description: "جمعت 15 إنجازاً.", icon: "◇", unlocked: true, date: "يونيو 2026" },
      { id: 11, title: "صاحب الرؤية", description: "أكملت مشروعاً كبيراً.", icon: "◌", unlocked: true, date: "يونيو 2026" },
      { id: 12, title: "نحو القمة", description: "تجاوزت مستوى 70٪.", icon: "▲", unlocked: true, date: "مايو 2026" },
      { id: 13, title: "المئة", description: "أكمل 100 مهمة.", icon: "100", unlocked: false },
      { id: 14, title: "الرحلة", description: "حافظ على سلسلة 30 يوماً.", icon: "↗", unlocked: false },
      { id: 15, title: "الإنجاز الكبير", description: "أكمل هدفاً رئيسياً.", icon: "★", unlocked: false },
      { id: 16, title: "صانع المشاريع", description: "أنشئ 10 مشاريع.", icon: "▦", unlocked: false }
    ],

    progress: {
      weekly: [54, 59, 62, 67, 65, 73, 76, 78],
      monthly: [42, 47, 52, 58, 61, 69, 73, 78],
      yearly: [35, 40, 46, 52, 58, 65, 72, 78]
    },

    activity: [
      { title: "أكملت هدفاً", time: "اليوم · منذ ساعتين", icon: "✓" },
      { title: "سجلت إنجازاً جديداً", time: "اليوم · منذ 4 ساعات", icon: "✦" },
      { title: "طورت مهارة التصميم", time: "أمس", icon: "◆" },
      { title: "حافظت على سلسلة الإنجاز", time: "أمس", icon: "∞" }
    ],

    settings: {
      darkMode: false,
      notifications: true,
      sound: true,
      language: "ar",
      direction: "rtl"
    }
  };

  let data = null;
  let state = null;


  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }


  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function merge(base, source) {

    const output = clone(base);

    Object.keys(source || {}).forEach(key => {

      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        output[key] &&
        typeof output[key] === "object"
      ) {
        output[key] = merge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }

    });

    return output;
  }


  /* =======================================================
     LOAD DATA.JSON
  ======================================================= */

  async function loadData() {

    let fileData = null;

    try {

      const response = await fetch("data.json", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("تعذر تحميل data.json");
      }

      fileData = await response.json();

    } catch (error) {

      console.warn(
        "تعذر تحميل data.json، سيتم استخدام البيانات الافتراضية.",
        error
      );

      fileData = clone(fallbackData);
    }


    data = fileData;


    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

      try {

        const savedState = JSON.parse(saved);

        state = merge(
          normalizeData(data),
          normalizeState(savedState)
        );

      } catch {

        state = normalizeData(data);

      }

    } else {

      state = normalizeData(data);

    }

    saveState();
  }


  function normalizeData(source) {

    return {

      currentPage: "dashboard",

      userName:
        source?.user?.name ||
        "عمران",

      score:
        Number(source?.user?.score ?? 0),

      level:
        Number(source?.user?.level ?? 1),

      levelProgress:
        Number(source?.user?.levelProgress ?? 0),

      streak:
        Number(source?.user?.streak ?? 0),

      totalAchievements:
        Number(source?.stats?.achievements ??
          source?.user?.totalAchievements ??
          source?.achievements?.length ??
          0),

      unlockedAchievements:
        Number(source?.stats?.unlockedAchievements ??
          source?.user?.unlockedAchievements ??
          0),

      completedGoals:
        Number(source?.stats?.completedGoals ?? 0),

      totalGoals:
        Number(source?.stats?.goals ??
          source?.goals?.length ??
          0),

      completedHabits:
        Number(source?.stats?.completedHabits ?? 0),

      totalHabits:
        Number(source?.stats?.habits ??
          source?.habits?.length ??
          0),

      darkMode:
        Boolean(source?.settings?.darkMode),

      notifications:
        source?.settings?.notifications !== false,

      sound:
        source?.settings?.sound !== false,

      goals:
        Array.isArray(source?.goals)
          ? clone(source.goals)
          : [],

      skills:
        Array.isArray(source?.skills)
          ? clone(source.skills)
          : [],

      habits:
        Array.isArray(source?.habits)
          ? clone(source.habits)
          : [],

      achievements:
        Array.isArray(source?.achievements)
          ? clone(source.achievements)
          : [],

      progress:
        source?.progress
          ? clone(source.progress)
          : clone(fallbackData.progress),

      activity:
        Array.isArray(source?.activity)
          ? clone(source.activity)
          : []
    };
  }


  function normalizeState(source) {

    if (!source) {
      return {};
    }

    return clone(source);
  }


  function saveState() {

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch {}
  }


  /* =======================================================
     INIT
  ======================================================= */

  async function init() {

    await loadData();

    applyTheme();

    renderEverything();

    bindNavigation();
    bindGlobalActions();
    bindForms();
    bindChartFilters();
    bindSettings();

    updateDate();

    window.addEventListener(
      "resize",
      handleResize
    );
  }


  /* =======================================================
     THEME
  ======================================================= */

  function applyTheme() {

    document.body.classList.toggle(
      "dark",
      !!state.darkMode
    );

    const themeColor =
      $('meta[name="theme-color"]');

    if (themeColor) {

      themeColor.setAttribute(
        "content",
        state.darkMode
          ? "#081f16"
          : "#fffdf7"
      );
    }

    $$(".theme-option").forEach(option => {

      option.classList.toggle(
        "active",
        option.dataset.theme ===
        (state.darkMode ? "dark" : "light")
      );

    });
  }


  /* =======================================================
     NAVIGATION
  ======================================================= */

  function bindNavigation() {

    $$(".nav-item").forEach(item => {

      item.addEventListener("click", () => {

        const page =
          item.dataset.page;

        if (!page) return;

        navigateTo(page);

        closeSidebar();

        playClick();
      });
    });


    $$("[data-page]").forEach(button => {

      if (
        button.classList.contains("nav-item") ||
        button.tagName === "SECTION"
      ) {
        return;
      }

      button.addEventListener("click", () => {

        const page =
          button.dataset.page;

        if (!page) return;

        navigateTo(page);

        closeAllOverlays();

        playClick();
      });

    });
  }


  function navigateTo(page) {

    const validPages = [
      "dashboard",
      "goals",
      "skills",
      "habits",
      "progress",
      "achievements",
      "reports",
      "settings"
    ];


    if (!validPages.includes(page)) {
      page = "dashboard";
    }


    state.currentPage = page;


    $$(".page").forEach(section => {

      section.classList.toggle(
        "active-page",
        section.id === `${page}Page`
      );

    });


    $$(".nav-item").forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === page
      );

    });


    updatePageHeading(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    saveState();
  }


  function updatePageHeading(page) {

    const heading =
      $("#pageTitle");

    const greeting =
      $("#greeting");

    const titles = {

      dashboard: "لوحة التقدم",

      goals: "الأهداف",

      skills: "المهارات",

      habits: "العادات",

      progress: "التقدم",

      achievements: "الإنجازات",

      reports: "التقارير",

      settings: "الإعدادات"
    };


    if (heading) {
      heading.textContent =
        titles[page] ||
        "لوحة التقدم";
    }


    if (greeting) {

      greeting.textContent =
        page === "dashboard"
          ? `صباح الخير، ${state.userName}`
          : "مساحتك الشخصية";
    }
  }


  /* =======================================================
     SIDEBAR
  ======================================================= */

  function openSidebar() {

    $(".sidebar")?.classList.add("open");
  }


  function closeSidebar() {

    $(".sidebar")?.classList.remove("open");
  }


  function bindSidebar() {

    $("#mobileMenu")?.addEventListener(
      "click",
      () => {

        $(".sidebar")?.classList.toggle("open");

      }
    );


    document.addEventListener(
      "click",
      event => {

        const sidebar =
          $(".sidebar");

        const menu =
          $("#mobileMenu");

        if (!sidebar || !menu) return;

        if (
          window.innerWidth <= 950 &&
          sidebar.classList.contains("open") &&
          !sidebar.contains(event.target) &&
          !menu.contains(event.target)
        ) {
          closeSidebar();
        }
      }
    );
  }


  /* =======================================================
     RENDER EVERYTHING
  ======================================================= */

  function renderEverything() {

    renderUser();

    renderDashboard();

    renderGoals();

    renderSkills();

    renderHabits();

    renderProgress();

    renderAchievements();

    renderReports();

    renderSettings();

    navigateTo(
      state.currentPage || "dashboard"
    );
  }


  /* =======================================================
     USER
  ======================================================= */

  function renderUser() {

    const name =
      state.userName ||
      "عمران";


    $("#sidebarUserName") &&
      ($("#sidebarUserName").textContent = name);


    $(".user-name") &&
      ($(".user-name").textContent = name);


    $(".profile-avatar") &&
      ($(".profile-avatar").textContent =
        name.trim().charAt(0) || "ع");


    $(".user-avatar") &&
      ($(".user-avatar").textContent =
        name.trim().charAt(0) || "ع");


    $("#greeting") &&
      ($("#greeting").textContent =
        `صباح الخير، ${name}`);
  }


  /* =======================================================
     DASHBOARD
  ======================================================= */

  function renderDashboard() {

    const score =
      Math.max(
        0,
        Math.min(100, Number(state.score) || 0)
      );


    $("#mainScore") &&
      ($("#mainScore").textContent = score);


    $("#scoreRing") &&
      $("#scoreRing").style.setProperty(
        "--score",
        `${score}%`
      );


    const levelProgress =
      Math.max(
        0,
        Math.min(
          100,
          Number(state.levelProgress) || 0
        )
      );


    const levelProgressElement =
      $(".level-progress span");

    if (levelProgressElement) {

      levelProgressElement.style.width =
        `${levelProgress}%`;
    }


    const levelRow =
      $(".level-row");

    if (levelRow) {

      const spans =
        $$("span", levelRow);

      if (spans[0]) {
        spans[0].textContent =
          `المستوى ${state.level}`;
      }

      if (spans[1]) {
        spans[1].textContent =
          `المستوى ${Number(state.level) + 1}`;
      }
    }


    const stats =
      $$(".stat-card");


    if (stats[0]) {

      const value =
        $("strong", stats[0]);

      if (value) {
        value.textContent =
          state.goals.filter(
            goal => goal.progress < 100
          ).length;
      }
    }


    if (stats[1]) {

      const value =
        $("strong", stats[1]);

      if (value) {
        value.textContent =
          state.skills.length;
      }
    }


    if (stats[2]) {

      const value =
        $("strong", stats[2]);

      if (value) {
        value.textContent =
          state.streak;
      }
    }


    if (stats[3]) {

      const value =
        $("strong", stats[3]);

      if (value) {
        value.textContent =
          state.achievements.filter(
            achievement => achievement.unlocked
          ).length;
      }
    }


    renderActivity();
    renderDashboardGoals();
    renderDashboardSkills();
    renderDashboardAchievements();
  }


  /* =======================================================
     DASHBOARD ACTIVITY
  ======================================================= */

  function renderActivity() {

    const container =
      $(".activity-list");

    if (!container) return;


    container.innerHTML =
      state.activity
        .slice(0, 5)
        .map(item => `

          <div class="activity-item completed">

            <span class="activity-check">
              ${escapeHTML(item.icon || "✓")}
            </span>

            <div>

              <strong>
                ${escapeHTML(item.title)}
              </strong>

              <small>
                ${escapeHTML(item.time)}
              </small>

            </div>

          </div>

        `)
        .join("");
  }


  /* =======================================================
     DASHBOARD GOALS
  ======================================================= */

  function renderDashboardGoals() {

    const container =
      $(".goal-list");

    if (!container) return;


    container.innerHTML =
      state.goals
        .slice(0, 4)
        .map(goal => `

          <div class="goal-item">

            <div class="goal-icon">
              ${escapeHTML(goal.icon || "✦")}
            </div>

            <div class="goal-content">

              <div class="goal-heading">

                <strong>
                  ${escapeHTML(goal.title)}
                </strong>

                <span>
                  ${Number(goal.progress) || 0}%
                </span>

              </div>

              <div class="goal-track">

                <span
                  style="width:${Math.max(
                    0,
                    Math.min(100, Number(goal.progress) || 0)
                  )}%"
                ></span>

              </div>

              <small>
                ${escapeHTML(goal.category || "عام")}
              </small>

            </div>

          </div>

        `)
        .join("");
  }


  /* =======================================================
     DASHBOARD SKILLS
  ======================================================= */

  function renderDashboardSkills() {

    const container =
      $(".skill-bars");

    if (!container) return;


    container.innerHTML =
      state.skills
        .slice(0, 4)
        .map(skill => {

          const progress =
            Math.max(
              0,
              Math.min(
                100,
                Number(skill.progress) || 0
              )
            );

          return `

            <div class="skill-row">

              <div class="skill-info">

                <span>
                  ${escapeHTML(skill.name)}
                </span>

                <strong>
                  ${progress}%
                </strong>

              </div>

              <div class="skill-track">

                <span
                  style="width:${progress}%"
                ></span>

              </div>

            </div>

          `;

        })
        .join("");
  }


  /* =======================================================
     DASHBOARD ACHIEVEMENTS
  ======================================================= */

  function renderDashboardAchievements() {

    const container =
      $(".achievement-list");

    if (!container) return;


    container.innerHTML =
      state.achievements
        .filter(item => item.unlocked)
        .slice(0, 5)
        .map(item => `

          <div class="achievement-item">

            <div class="achievement-badge">
              ${escapeHTML(item.icon || "✦")}
            </div>

            <div>

              <strong>
                ${escapeHTML(item.title)}
              </strong>

              <small>
                ${escapeHTML(item.description)}
              </small>

            </div>

            <time>
              ${escapeHTML(item.date || "مكتمل")}
            </time>

          </div>

        `)
        .join("");
  }


  /* =======================================================
     GOALS PAGE
  ======================================================= */

  function renderGoals() {

    const container =
      $(".goals-page-grid");

    if (!container) return;


    container.innerHTML =
      state.goals
        .map(goal => {

          const progress =
            Math.max(
              0,
              Math.min(
                100,
                Number(goal.progress) || 0
              )
            );

          return `

            <article
              class="goal-large-card"
              data-goal-id="${goal.id}"
            >

              <div class="goal-large-head">

                <span class="goal-category">
                  ${escapeHTML(goal.category || "عام")}
                </span>

                <button
                  class="more-button goal-menu"
                  data-goal-menu="${goal.id}"
                  aria-label="خيارات الهدف"
                >
                  ⋮
                </button>

              </div>

              <div class="large-goal-icon">
                ${escapeHTML(goal.icon || "✦")}
              </div>

              <h3>
                ${escapeHTML(goal.title)}
              </h3>

              <p>
                ${escapeHTML(goal.description || "")}
              </p>

              <div class="large-progress">

                <div>

                  <span>
                    التقدم
                  </span>

                  <strong>
                    ${progress}%
                  </strong>

                </div>

                <div class="large-progress-track">

                  <span
                    style="width:${progress}%"
                  ></span>

                </div>

              </div>

              <div class="goal-meta">

                <span>
                  ${escapeHTML(goal.status || "مستمر")}
                </span>

                <span>
                  ${
                    progress >= 100
                      ? "مكتمل"
                      : "قيد التنفيذ"
                  }
                </span>

              </div>

            </article>

          `;

        })
        .join("");


    $$("[data-goal-menu]").forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          const id =
            Number(button.dataset.goalMenu);

          const goal =
            state.goals.find(
              item => item.id === id
            );

          if (!goal) return;

          openGoalEditor(goal);

          playClick();
        }
      );

    });


    updateGoalStats();
  }


  function updateGoalStats() {

    const total =
      state.goals.length;


    const completed =
      state.goals.filter(
        goal => Number(goal.progress) >= 100
      ).length;


    const average =
      total
        ? Math.round(
            state.goals.reduce(
              (sum, goal) =>
                sum + Number(goal.progress || 0),
              0
            ) / total
          )
        : 0;


    const goalStats =
      $$(".mini-stat");


    if (goalStats[0]) {
      $("strong", goalStats[0]).textContent =
        state.goals.filter(
          goal => Number(goal.progress) < 100
        ).length;
    }


    if (goalStats[1]) {
      $("strong", goalStats[1]).textContent =
        completed;
    }


    if (goalStats[2]) {
      $("strong", goalStats[2]).textContent =
        0;
    }


    if (goalStats[3]) {
      $("strong", goalStats[3]).textContent =
        `${average}%`;
    }


    state.completedGoals =
      completed;

    state.totalGoals =
      total;
  }


  /* =======================================================
     GOAL MODAL
  ======================================================= */

  function openGoalEditor(goal = null) {

    const modal =
      $("#goalModal");

    const form =
      $("#goalForm");

    if (!modal || !form) return;


    modal.classList.add("open");


    form.dataset.editing =
      goal ? String(goal.id) : "";


    const titleInput =
      $("#goalName", form);

    const descriptionInput =
      $("#goalDescription", form);

    const categoryInput =
      $("#goalCategory", form);

    const dateInput =
      $("#goalDate", form);


    if (goal) {

      if (titleInput) {
        titleInput.value =
          goal.title || "";
      }

      if (descriptionInput) {
        descriptionInput.value =
          goal.description || "";
      }

      if (categoryInput) {
        categoryInput.value =
          goal.category || "مشروع";
      }

      if (dateInput) {
        dateInput.value =
          goal.date || "";
      }

    } else {

      form.reset();

    }


    setTimeout(() => {
      titleInput?.focus();
    }, 100);
  }


  function closeGoalEditor() {

    $("#goalModal")?.classList.remove("open");
  }


  /* =======================================================
     SKILLS
  ======================================================= */

  function renderSkills() {

    const container =
      $(".all-skills");

    if (!container) return;


    container.innerHTML =
      state.skills
        .map(skill => {

          const progress =
            Math.max(
              0,
              Math.min(
                100,
                Number(skill.progress) || 0
              )
            );

          return `

            <article class="skill-detail-card">

              <div class="skill-detail-icon">
                ${escapeHTML(skill.icon || "◇")}
              </div>

              <div class="skill-detail-content">

                <div class="skill-detail-title">

                  <h3>
                    ${escapeHTML(skill.name)}
                  </h3>

                  <strong>
                    ${progress}%
                  </strong>

                </div>

                <p>
                  ${getSkillLabel(progress)}
                </p>

                <div class="detail-track">

                  <span
                    style="width:${progress}%"
                  ></span>

                </div>

                <small>
                  آخر تحديث: اليوم
                </small>

              </div>

            </article>

          `;

        })
        .join("");


    const average =
      state.skills.length
        ? Math.round(
            state.skills.reduce(
              (sum, skill) =>
                sum + Number(skill.progress || 0),
              0
            ) / state.skills.length
          )
        : 0;


    const overview =
      $$(".skill-overview-card");


    if (overview[0]) {
      $("strong", overview[0]).textContent =
        `${average}%`;
    }


    if (overview[1]) {
      $("strong", overview[1]).textContent =
        state.skills.filter(
          skill => Number(skill.progress) >= 80
        ).length;
    }


    if (overview[2]) {
      $("strong", overview[2]).textContent =
        "42";
    }
  }


  function getSkillLabel(progress) {

    if (progress >= 90) {
      return "متميز جداً";
    }

    if (progress >= 80) {
      return "متقدم";
    }

    if (progress >= 70) {
      return "جيد جداً";
    }

    if (progress >= 60) {
      return "جيد";
    }

    return "قيد التطوير";
  }


  /* =======================================================
     HABITS
  ======================================================= */

  function renderHabits() {

    const container =
      $(".habits-list");

    if (!container) return;


    container.innerHTML =
      state.habits
        .map(habit => `

          <div
            class="habit-card"
            data-habit-id="${habit.id}"
          >

            <button
              class="habit-check ${
                habit.completed ? "checked" : ""
              }"
              data-habit-toggle="${habit.id}"
              aria-label="تسجيل العادة"
            >
              ${habit.completed ? "✓" : ""}
            </button>

            <div>

              <strong>
                ${escapeHTML(habit.name)}
              </strong>

              <small>
                ${escapeHTML(habit.description || "")}
              </small>

            </div>

            <span class="habit-streak">
              🔥 ${Number(habit.streak) || 0}
            </span>

            <button
              class="more-button"
              aria-label="خيارات العادة"
            >
              ⋮
            </button>

          </div>

        `)
        .join("");


    bindHabitEvents();


    const completed =
      state.habits.filter(
        habit => habit.completed
      ).length;


    const bestStreak =
      state.habits.length
        ? Math.max(
            ...state.habits.map(
              habit => Number(habit.streak) || 0
            )
          )
        : 0;


    const summary =
      $$(".habit-summary > div");


    if (summary[0]) {
      $("strong", summary[0]).textContent =
        `${Math.round(
          state.habits.length
            ? completed / state.habits.length * 100
            : 0
        )}%`;
    }


    if (summary[1]) {
      $("strong", summary[1]).textContent =
        `${bestStreak} يومًا`;
    }


    if (summary[2]) {
      $("strong", summary[2]).textContent =
        `${completed} / ${state.habits.length}`;
    }


    state.completedHabits =
      completed;

    state.totalHabits =
      state.habits.length;
  }


  function bindHabitEvents() {

    $$("[data-habit-toggle]").forEach(button => {

      button.onclick = () => {

        const id =
          Number(button.dataset.habitToggle);

        const habit =
          state.habits.find(
            item => item.id === id
          );

        if (!habit) return;


        habit.completed =
          !habit.completed;


        if (habit.completed) {

          habit.streak =
            Number(habit.streak || 0) + 1;

          increaseScore(1, false);

          addActivity(
            `أكملت عادة ${habit.name}`,
            "✓"
          );

          toast(
            "أحسنت، تم تسجيل العادة."
          );

        } else {

          toast(
            "تم إلغاء تسجيل العادة.",
            "warning"
          );
        }


        updateHabitState();

        saveState();

        renderEverything();

        playClick();
      };

    });
  }


  function updateHabitState() {

    state.completedHabits =
      state.habits.filter(
        habit => habit.completed
      ).length;

    state.totalHabits =
      state.habits.length;
  }


  /* =======================================================
     PROGRESS
  ======================================================= */

  function renderProgress() {

    const values =
      getProgressValues("week");


    updateProgressMetrics(values);


    drawChart(
      $(".progress-chart"),
      values
    );
  }


  function getProgressValues(period = "week") {

    if (
      period === "month" &&
      state.progress?.monthly
    ) {
      return [...state.progress.monthly];
    }


    if (
      period === "year" &&
      state.progress?.yearly
    ) {
      return [...state.progress.yearly];
    }


    if (
      state.progress?.weekly
    ) {
      return [...state.progress.weekly];
    }


    return [
      54,
      59,
      62,
      67,
      65,
      73,
      76,
      state.score
    ];
  }


  function updateProgressMetrics(values) {

    const average =
      values.length
        ? Math.round(
            values.reduce(
              (sum, value) =>
                sum + Number(value || 0),
              0
            ) / values.length
          )
        : 0;


    const metricCards =
      $$(".metric-card");


    if (metricCards[0]) {
      $("strong", metricCards[0]).textContent =
        state.score;
    }


    if (metricCards[1]) {
      $("strong", metricCards[1]).textContent =
        `${average}%`;
    }


    if (metricCards[2]) {
      $("strong", metricCards[2]).textContent =
        `${state.habits.length
          ? Math.round(
              state.completedHabits /
              state.habits.length * 100
            )
          : 0}%`;
    }


    if (metricCards[3]) {
      $("strong", metricCards[3]).textContent =
        "126";
    }
  }


  function drawChart(svg, values) {

    if (!svg || !values?.length) {
      return;
    }


    const width =
      Number(
        svg.getAttribute("viewBox")
          ?.split(" ")[2]
      ) || 700;


    const height =
      Number(
        svg.getAttribute("viewBox")
          ?.split(" ")[3]
      ) || 250;


    const padding = 15;


    const points =
      values.map((value, index) => {

        const x =
          padding +
          index *
          ((width - padding * 2) /
            Math.max(1, values.length - 1));


        const y =
          height -
          padding -
          (
            Math.max(
              0,
              Math.min(
                100,
                Number(value) || 0
              )
            ) / 100
          ) *
          (height - padding * 2);


        return [x, y];

      });


    const line =
      points
        .map(
          ([x, y], index) =>
            `${index === 0 ? "M" : "L"}${x},${y}`
        )
        .join(" ");


    const area =
      `${line} L ${points.at(-1)[0]} ${height - padding} L ${points[0][0]} ${height - padding} Z`;


    const linePath =
      svg.querySelector(".chart-line");


    const fillPath =
      svg.querySelector(".chart-fill");


    if (linePath) {
      linePath.setAttribute(
        "d",
        line
      );
    }


    if (fillPath) {
      fillPath.setAttribute(
        "d",
        area
      );
    }


    const point =
      svg.querySelector(".chart-point");


    if (point) {

      const last =
        points.at(-1);

      point.setAttribute(
        "cx",
        last[0]
      );

      point.setAttribute(
        "cy",
        last[1]
      );
    }
  }


  /* =======================================================
     CHART FILTERS
  ======================================================= */

  function bindChartFilters() {

    $$(".chart-filter").forEach(button => {

      button.addEventListener(
        "click",
        () => {

          $$(".chart-filter").forEach(
            item =>
              item.classList.remove("active")
          );


          button.classList.add("active");


          const range =
            button.dataset.range ||
            "week";


          drawChart(
            $(".progress-chart"),
            getProgressValues(range)
          );


          playClick();
        }
      );

    });
  }


  /* =======================================================
     ACHIEVEMENTS
  ======================================================= */

  function renderAchievements() {

    const container =
      $(".achievements-grid");

    if (!container) return;


    container.innerHTML =
      state.achievements
        .map(item => `

          <article
            class="achievement-card ${
              item.unlocked
                ? "unlocked"
                : "locked"
            }"
          >

            <div class="achievement-large-icon">
              ${escapeHTML(item.icon || "✦")}
            </div>

            <h3>
              ${escapeHTML(item.title)}
            </h3>

            <p>
              ${escapeHTML(item.description)}
            </p>

            <span>
              ${
                item.unlocked
                  ? escapeHTML(
                      item.date || "مكتمل"
                    )
                  : "قيد الإنجاز"
              }
            </span>

          </article>

        `)
        .join("");


    const unlocked =
      state.achievements.filter(
        item => item.unlocked
      ).length;


    state.unlockedAchievements =
      unlocked;


    state.totalAchievements =
      state.achievements.length;


    const summary =
      $$(".achievement-summary > div");


    if (summary[0]) {
      $("strong", summary[0]).textContent =
        unlocked;
    }


    if (summary[1]) {
      $("strong", summary[1]).textContent =
        state.achievements.filter(
          item =>
            item.unlocked &&
            String(item.date || "").includes("أكتوبر")
        ).length;
    }


    if (summary[2]) {
      $("strong", summary[2]).textContent =
        `${state.streak}`;
    }
  }


  /* =======================================================
     REPORTS
  ======================================================= */

  function renderReports() {

    const completedGoals =
      state.goals.filter(
        goal => Number(goal.progress) >= 100
      ).length;


    const averageSkill =
      state.skills.length
        ? Math.round(
            state.skills.reduce(
              (sum, skill) =>
                sum + Number(skill.progress || 0),
              0
            ) / state.skills.length
          )
        : 0;


    const completedHabits =
      state.habits.filter(
        habit => habit.completed
      ).length;


    const reportCards =
      $$(".report-card");


    if (reportCards[0]) {
      $("strong", reportCards[0]).textContent =
        `${state.score} / 100`;
    }


    if (reportCards[1]) {
      $("strong", reportCards[1]).textContent =
        state.skills
          .slice()
          .sort(
            (a, b) =>
              Number(b.progress) -
              Number(a.progress)
          )[0]?.name || "—";
    }


    if (reportCards[2]) {

      const sorted =
        state.skills
          .slice()
          .sort(
            (a, b) =>
              Number(b.progress) -
              Number(a.progress)
          );


      $("strong", reportCards[2]).textContent =
        sorted[0]?.name || "—";
    }


    if (reportCards[3]) {
      $("strong", reportCards[3]).textContent =
        `${state.habits.length
          ? Math.round(
              completedHabits /
              state.habits.length * 100
            )
          : 0}%`;
    }


    return {
      completedGoals,
      averageSkill
    };
  }


  /* =======================================================
     SETTINGS
  ======================================================= */

  function renderSettings() {

    const nameInput =
      $("#nameInput");


    if (nameInput) {
      nameInput.value =
        state.userName;
    }


    const notificationInputs =
      $$('input[type="checkbox"]');


    notificationInputs.forEach(input => {

      const text =
        input
          .closest(".setting-row")
          ?.querySelector("strong")
          ?.textContent || "";


      if (text.includes("تذكير") ||
          text.includes("ملخص")) {

        input.checked =
          state.notifications;
      }
    });


    $$(".theme-option").forEach(option => {

      option.classList.toggle(
        "active",
        option.dataset.theme ===
        (state.darkMode ? "dark" : "light")
      );

    });
  }


  function bindSettings() {

    $("#saveProfileButton")?.addEventListener(
      "click",
      () => {

        const name =
          $("#nameInput")
            ?.value
            ?.trim();


        if (!name) {

          toast(
            "اكتب الاسم أولاً.",
            "warning"
          );

          return;
        }


        state.userName =
          name;


        saveState();

        renderEverything();

        toast(
          "تم حفظ التغييرات."
        );

        playClick();
      }
    );


    $$(".theme-option").forEach(option => {

      option.addEventListener(
        "click",
        () => {

          const theme =
            option.dataset.theme;


          if (theme === "dark") {
            state.darkMode = true;
          }

          else if (theme === "light") {
            state.darkMode = false;
          }

          else {

            state.darkMode =
              window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
          }


          applyTheme();

          saveState();

          toast(
            state.darkMode
              ? "تم تفعيل الوضع الداكن."
              : "تم تفعيل الوضع الفاتح."
          );

          playClick();
        }
      );

    });


    const switches =
      $$(".setting-row .switch input");


    switches.forEach((input, index) => {

      input.addEventListener(
        "change",
        () => {

          if (index === 0) {

            state.notifications =
              input.checked;

            toast(
              input.checked
                ? "تم تفعيل الإشعارات."
                : "تم إيقاف الإشعارات."
            );

          }

          saveState();

          playClick();
        }
      );

    });
  }


  /* =======================================================
     FORMS
  ======================================================= */

  function bindForms() {

    $("#goalForm")?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const form =
          event.currentTarget;


        const title =
          $("#goalName", form)
            ?.value
            ?.trim();


        const description =
          $("#goalDescription", form)
            ?.value
            ?.trim() ||
          "";


        const category =
          $("#goalCategory", form)
            ?.value
            ?.trim() ||
          "مشروع";


        const date =
          $("#goalDate", form)
            ?.value ||
          "";


        if (!title) {

          toast(
            "اكتب اسم الهدف أولاً.",
            "warning"
          );

          return;
        }


        const editingId =
          Number(
            form.dataset.editing || 0
          );


        if (editingId) {

          const goal =
            state.goals.find(
              item =>
                Number(item.id) ===
                editingId
            );


          if (goal) {

            goal.title =
              title;

            goal.description =
              description;

            goal.category =
              category;

            goal.date =
              date;

            goal.status =
              Number(goal.progress) >= 100
                ? "مكتمل"
                : "مستمر";
          }


          toast(
            "تم تحديث الهدف."
          );

        } else {

          state.goals.push({

            id: Date.now(),

            title,

            description,

            category,

            progress: 0,

            icon: "✦",

            status: "جديد",

            date
          });


          addActivity(
            `أضفت هدفاً جديداً: ${title}`,
            "+"
          );


          toast(
            "تمت إضافة الهدف."
          );
        }


        saveState();

        closeGoalEditor();

        renderEverything();

        playClick();
      }
    );
  }


  /* =======================================================
     GLOBAL ACTIONS
  ======================================================= */

  function bindGlobalActions() {

    bindSidebar();


    $("#quickAddButton")?.addEventListener(
      "click",
      () => {

        $("#quickAddModal")
          ?.classList.add("open");

        playClick();
      }
    );


    $("#addGoalButton")?.addEventListener(
      "click",
      () => {

        openGoalEditor();

        playClick();
      }
    );


    $("#closeGoalModal")?.addEventListener(
      "click",
      closeGoalEditor
    );


    $("#cancelGoal")?.addEventListener(
      "click",
      closeGoalEditor
    );


    $("#closeQuickAdd")?.addEventListener(
      "click",
      () => {

        $("#quickAddModal")
          ?.classList.remove("open");
      }
    );


    $$(".overlay").forEach(
      overlay => {

        overlay.addEventListener(
          "click",
          event => {

            if (
              event.target === overlay
            ) {
              overlay.classList.remove("open");
            }

          }
        );

      }
    );


    $$(".quick-action").forEach(
      action => {

        action.addEventListener(
          "click",
          () => {

            const type =
              action.dataset.action;


            $("#quickAddModal")
              ?.classList.remove("open");


            if (type === "goal") {
              openGoalEditor();
            }

            else if (type === "skill") {

              navigateTo("skills");

              toast(
                "يمكنك متابعة مهاراتك من هنا."
              );
            }

            else if (type === "habit") {

              navigateTo("habits");

              toast(
                "يمكنك تسجيل عاداتك من هنا."
              );
            }

            else if (type === "achievement") {

              navigateTo("achievements");

              toast(
                "هذه إنجازاتك."
              );
            }


            playClick();
          }
        );

      }
    );


    $("#searchButton")?.addEventListener(
      "click",
      openSearch
    );


    $("#closeSearch")?.addEventListener(
      "click",
      closeSearch
    );


    $("#globalSearch")?.addEventListener(
      "input",
      event => {

        performSearch(
          event.target.value
        );
      }
    );


    $("#notificationButton")?.addEventListener(
      "click",
      () => {

        toast(
          state.notifications
            ? "لا توجد إشعارات جديدة."
            : "الإشعارات متوقفة."
        );

        playClick();
      }
    );


    $("#userButton")?.addEventListener(
      "click",
      () => {

        navigateTo("settings");

        playClick();
      }
    );


    $("#exportReportButton")?.addEventListener(
      "click",
      exportData
    );
  }


  /* =======================================================
     SEARCH
  ======================================================= */

  function openSearch() {

    const overlay =
      $("#searchOverlay");

    if (!overlay) return;


    overlay.classList.add("open");


    setTimeout(
      () =>
        $("#globalSearch")?.focus(),
      100
    );


    playClick();
  }


  function closeSearch() {

    $("#searchOverlay")
      ?.classList.remove("open");
  }


  function performSearch(query) {

    const container =
      $("#searchResults");

    if (!container) return;


    const term =
      query
        .trim()
        .toLowerCase();


    if (!term) {

      container.innerHTML = `
        <p class="empty-search">
          ابدأ بكتابة ما تبحث عنه.
        </p>
      `;

      return;
    }


    const results = [];


    state.goals.forEach(goal => {

      if (
        String(goal.title)
          .toLowerCase()
          .includes(term) ||

        String(goal.description)
          .toLowerCase()
          .includes(term)
      ) {

        results.push({
          type: "هدف",
          title: goal.title,
          description: goal.description,
          page: "goals"
        });

      }

    });


    state.skills.forEach(skill => {

      if (
        String(skill.name)
          .toLowerCase()
          .includes(term)
      ) {

        results.push({
          type: "مهارة",
          title: skill.name,
          description:
            `التقدم ${skill.progress}%`,
          page: "skills"
        });

      }

    });


    state.habits.forEach(habit => {

      if (
        String(habit.name)
          .toLowerCase()
          .includes(term) ||

        String(habit.description)
          .toLowerCase()
          .includes(term)
      ) {

        results.push({
          type: "عادة",
          title: habit.name,
          description: habit.description,
          page: "habits"
        });

      }

    });


    state.achievements.forEach(
      achievement => {

        if (
          String(achievement.title)
            .toLowerCase()
            .includes(term) ||

          String(achievement.description)
            .toLowerCase()
            .includes(term)
        ) {

          results.push({
            type: "إنجاز",
            title: achievement.title,
            description:
              achievement.description,
            page: "achievements"
          });

        }

      }
    );


    if (!results.length) {

      container.innerHTML = `
        <p class="empty-search">
          لم نجد نتائج مطابقة.
        </p>
      `;

      return;
    }


    container.innerHTML =
      results
        .slice(0, 12)
        .map(result => `

          <button
            class="search-result"
            data-search-page="${result.page}"
          >

            <span class="search-result-icon">
              ${escapeHTML(
                result.type.charAt(0)
              )}
            </span>

            <span>

              <strong>
                ${escapeHTML(result.title)}
              </strong>

              <small>
                ${escapeHTML(result.description)}
              </small>

            </span>

          </button>

        `)
        .join("");


    $$(".search-result").forEach(
      result => {

        result.addEventListener(
          "click",
          () => {

            navigateTo(
              result.dataset.searchPage
            );

            closeSearch();

            playClick();
          }
        );

      }
    );
  }


  /* =======================================================
     DATA EXPORT
  ======================================================= */

  function exportData() {

    const payload = {

      app: "Miyar",

      version: "1.0",

      exportedAt:
        new Date().toISOString(),

      data: state
    };


    const blob =
      new Blob(
        [
          JSON.stringify(
            payload,
            null,
            2
          )
        ],
        {
          type:
            "application/json"
        }
      );


    const url =
      URL.createObjectURL(blob);


    const anchor =
      document.createElement("a");


    anchor.href =
      url;


    anchor.download =
      `miyar-backup-${
        new Date()
          .toISOString()
          .slice(0, 10)
      }.json`;


    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);


    toast(
      "تم تصدير بيانات مِعيار."
    );

    playClick();
  }


  /* =======================================================
     ACTIVITY
  ======================================================= */

  function addActivity(
    title,
    icon = "✓"
  ) {

    state.activity.unshift({

      title,

      icon,

      time: "الآن"
    });


    state.activity =
      state.activity.slice(0, 10);
  }


  /* =======================================================
     SCORE
  ======================================================= */

  function increaseScore(
    amount = 1,
    shouldRender = true
  ) {

    const previousLevel =
      state.level;


    state.score =
      Math.min(
        100,
        Number(state.score) +
        Number(amount)
      );


    state.levelProgress =
      Math.min(
        100,
        Number(state.levelProgress) +
        Number(amount)
      );


    if (
      state.levelProgress >= 100
    ) {

      state.level += 1;

      state.levelProgress = 0;


      addActivity(
        `وصلت إلى المستوى ${state.level}`,
        "★"
      );


      toast(
        `مبارك! وصلت إلى المستوى ${state.level}.`
      );
    }


    if (
      state.level !== previousLevel
    ) {
      playClick();
    }


    saveState();


    if (shouldRender) {
      renderEverything();
    }
  }


  /* =======================================================
     TOAST
  ======================================================= */

  function toast(
    message,
    type = "success"
  ) {

    const element =
      $("#toast");

    if (!element) return;


    const icon =
      $(".toast-icon", element);


    const messageElement =
      $("#toastMessage", element);


    if (icon) {

      icon.textContent =
        type === "success"
          ? "✓"
          : type === "warning"
            ? "!"
            : "i";
    }


    if (messageElement) {

      messageElement.textContent =
        message;

    } else {

      const textNode =
        [...element.childNodes]
          .find(
            node =>
              node.nodeType ===
              Node.TEXT_NODE
          );


      if (textNode) {
        textNode.textContent =
          message;
      }
    }


    element.classList.add("show");


    clearTimeout(
      window.miyarToastTimer
    );


    window.miyarToastTimer =
      setTimeout(
        () =>
          element.classList.remove("show"),
        2800
      );
  }


  /* =======================================================
     SOUND
  ======================================================= */

  function playClick() {

    if (!state?.sound) return;


    try {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


      if (!AudioContext) return;


      const ctx =
        new AudioContext();


      const oscillator =
        ctx.createOscillator();


      const gain =
        ctx.createGain();


      oscillator.type =
        "sine";


      oscillator.frequency.value =
        650;


      gain.gain.setValueAtTime(
        0.035,
        ctx.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08
      );


      oscillator.connect(gain);

      gain.connect(ctx.destination);


      oscillator.start();

      oscillator.stop(
        ctx.currentTime + 0.08
      );

    } catch {}
  }


  /* =======================================================
     CLOSE OVERLAYS
  ======================================================= */

  function closeAllOverlays() {

    $$(".overlay").forEach(
      overlay =>
        overlay.classList.remove("open")
    );
  }


  /* =======================================================
     DATE
  ======================================================= */

  function updateDate() {

    const date =
      new Intl.DateTimeFormat(
        "ar-EG",
        {
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      ).format(new Date());


    $("#todayDate") &&
      ($("#todayDate").textContent =
        date);


    $$("[data-current-date]").forEach(
      element => {
        element.textContent =
          date;
      }
    );
  }


  /* =======================================================
     RESPONSIVE
  ======================================================= */

  function handleResize() {

    if (window.innerWidth > 950) {
      closeSidebar();
    }
  }


  /* =======================================================
     KEYBOARD
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeAllOverlays();

        closeSidebar();
      }


      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        openSearch();
      }
    }
  );


  /* =======================================================
     SERVICE WORKER
  ======================================================= */

  if (
    "serviceWorker" in navigator &&
    window.location.protocol !== "file:"
  ) {

    window.addEventListener(
      "load",
      () => {

        navigator.serviceWorker
          .register("./sw.js")
          .catch(() => {});

      }
    );
  }


  /* =======================================================
     PWA INSTALL
  ======================================================= */

  let deferredInstallPrompt =
    null;


  window.addEventListener(
    "beforeinstallprompt",
    event => {

      event.preventDefault();

      deferredInstallPrompt =
        event;


      $$("[data-install-app]").forEach(
        button => {

          button.style.display =
            "inline-flex";


          button.onclick =
            async () => {

              if (
                !deferredInstallPrompt
              ) {
                return;
              }


              deferredInstallPrompt.prompt();


              const result =
                await deferredInstallPrompt.userChoice;


              if (
                result.outcome ===
                "accepted"
              ) {

                toast(
                  "تم بدء تثبيت مِعيار."
                );
              }


              deferredInstallPrompt =
                null;


              button.style.display =
                "none";
            };

        }
      );
    }
  );


  /* =======================================================
     START
  ======================================================= */

  await init();

});