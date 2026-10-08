// FreelanceOS Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // TOP LEVEL MAIN VIEWS & NAVIGATION
  // ============================================================
  const views = {
    overview: document.getElementById('view-overview'),
    projects: document.getElementById('view-projects'),
    projectDetail: document.getElementById('view-project-detail'),
    tasks: document.getElementById('view-tasks'),
    calendar: document.getElementById('view-calendar'),
    clients: document.getElementById('view-clients'),
    clientDetail: document.getElementById('view-client-detail'),
    invoices: document.getElementById('view-invoices'),
    invoiceCreate: document.getElementById('view-invoice-create'),
    invoicePreview: document.getElementById('view-invoice-preview'),
    documents: document.getElementById('view-documents'),
    settings: document.getElementById('view-settings'),
  };

  const navElements = {
    overview: document.getElementById('nav-overview'),
    projects: document.getElementById('nav-projects'),
    tasks: document.getElementById('nav-tasks'),
    calendar: document.getElementById('nav-calendar'),
    clients: document.getElementById('nav-clients'),
    invoices: document.getElementById('nav-invoices'),
    documents: document.getElementById('nav-documents'),
    settings: document.getElementById('nav-settings'),
  };

  const topTitle = document.getElementById('top-title');
  const brandLogo = document.getElementById('brand-logo');

  const titleMap = {
    overview: 'Overview',
    projects: 'Projects',
    projectDetail: 'Projects',
    tasks: 'Tasks',
    calendar: 'Calendar',
    clients: 'Clients',
    clientDetail: 'Clients',
    invoices: 'Invoices',
    invoiceCreate: 'Invoices',
    invoicePreview: 'Invoices',
    documents: 'Documents',
    settings: 'Settings',
  };

  function switchMainView(targetViewKey) {
    Object.keys(views).forEach((key) => {
      if (views[key]) {
        if (key === targetViewKey) {
          views[key].classList.remove('view-hidden');
        } else {
          views[key].classList.add('view-hidden');
        }
      }
    });

    if (topTitle && titleMap[targetViewKey]) {
      topTitle.textContent = titleMap[targetViewKey];
    }

    // Active Sidebar Highlight
    Object.keys(navElements).forEach((key) => {
      const navItem = navElements[key];
      if (navItem) {
        const isMatch =
          key === targetViewKey ||
          (key === 'projects' && targetViewKey === 'projectDetail') ||
          (key === 'clients' && targetViewKey === 'clientDetail') ||
          (key === 'invoices' && (targetViewKey === 'invoiceCreate' || targetViewKey === 'invoicePreview'));

        if (isMatch) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });

    const scrollContainer = document.querySelector('.content-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }

  // Sidebar Clicks
  navElements.overview?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('overview');
  });

  navElements.projects?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('projects');
  });

  navElements.tasks?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('tasks');
  });

  navElements.calendar?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('calendar');
  });

  navElements.clients?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('clients');
  });

  navElements.invoices?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('invoices');
  });

  navElements.documents?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('documents');
  });

  navElements.settings?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('settings');
  });

  brandLogo?.addEventListener('click', () => {
    switchMainView('overview');
  });

  // Overview Links
  document.getElementById('link-view-all-tasks')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchMainView('tasks');
  });

  document.getElementById('link-review-project')?.addEventListener('click', (e) => {
    e.preventDefault();
    openProjectDetail('Neosava Affiliate Dashboard', 'Patricia · Affiliate portal & reporting', 'overview');
  });

  // ============================================================
  // PROJECT DETAIL FUNCTIONALITY
  // ============================================================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.project-card-dots')) return;
      const title = card.querySelector('.project-card-title')?.textContent.trim() || 'Neosava Shopify';
      const client = card.querySelector('.project-card-client')?.textContent.trim() || 'Patricia';
      const desc = card.querySelector('.project-card-desc')?.textContent.trim() || 'Shopify storefront & integrations';
      openProjectDetail(title, `${client} · ${desc}`, 'overview');
    });
  });

  document.getElementById('breadcrumb-projects')?.addEventListener('click', () => {
    switchMainView('projects');
  });

  function openProjectDetail(title, subtitle, defaultTab = 'overview') {
    const titleEl = document.getElementById('detail-project-title');
    const crumbEl = document.getElementById('detail-project-crumb');
    const subEl = document.getElementById('detail-project-subtitle');

    if (titleEl) titleEl.textContent = title;
    if (crumbEl) crumbEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;

    switchMainView('projectDetail');
    switchProjectSubtab(defaultTab);
  }

  const subtabButtons = document.querySelectorAll('#project-subtabs .subtab-item');
  const subtabPanels = {
    overview: document.getElementById('subtab-content-overview'),
    tasks: document.getElementById('subtab-content-tasks'),
    milestones: document.getElementById('subtab-content-milestones'),
    files: document.getElementById('subtab-content-files'),
    time: document.getElementById('subtab-content-time'),
    invoices: document.getElementById('subtab-content-invoices'),
    activity: document.getElementById('subtab-content-activity'),
    notes: document.getElementById('subtab-content-notes'),
  };

  const actionBtn = document.getElementById('btn-detail-action');
  const actionButtonLabels = {
    overview: 'Edit Project',
    tasks: '+ Add Task',
    milestones: '+ Add Milestone',
    files: '+ Upload File',
    time: '+ Log Time',
    invoices: '+ Create Invoice',
    activity: 'Export Activity',
    notes: '+ New Note',
  };

  function switchProjectSubtab(targetTab) {
    subtabButtons.forEach((btn) => {
      if (btn.getAttribute('data-subtab') === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    Object.keys(subtabPanels).forEach((key) => {
      const panel = subtabPanels[key];
      if (panel) {
        if (key === targetTab) {
          panel.classList.remove('view-hidden');
        } else {
          panel.classList.add('view-hidden');
        }
      }
    });

    if (actionBtn && actionButtonLabels[targetTab]) {
      actionBtn.innerHTML = actionButtonLabels[targetTab];
    }

    const subEl = document.getElementById('detail-project-subtitle');
    if (subEl) {
      if (targetTab === 'milestones') {
        subEl.textContent = 'Patricia · Rp 3.100.000';
      } else if (targetTab === 'notes') {
        subEl.textContent = 'Patricia · A quiet space for the details worth remembering.';
      } else {
        subEl.textContent = 'Patricia · Shopify storefront & integrations';
      }
    }
  }

  subtabButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute('data-subtab');
      if (tabName) {
        switchProjectSubtab(tabName);
      }
    });
  });

  document.getElementById('link-overview-to-tasks')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchProjectSubtab('tasks');
  });

  document.getElementById('link-overview-to-activity')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchProjectSubtab('activity');
  });

  // ============================================================
  // PROJECTS FILTER TABS (All, Active, Completed, Overdue)
  // ============================================================
  const filterTabs = document.querySelectorAll('.filter-tab[data-filter]');
  const summaryFooter = document.getElementById('projects-summary-text');
  const searchInput = document.getElementById('projects-search-input');
  let currentFilter = 'active';

  function applyProjectFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const cardStatusAttr = card.getAttribute('data-status') || '';
      const statuses = cardStatusAttr.split(' ');
      const title = card.querySelector('.project-card-title')?.textContent.toLowerCase() || '';
      const client = card.querySelector('.project-card-client')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-card-desc')?.textContent.toLowerCase() || '';

      const matchesSearch = !query || title.includes(query) || client.includes(query) || desc.includes(query);
      let matchesFilter = false;

      if (currentFilter === 'all') {
        matchesFilter = true;
      } else if (currentFilter === 'active') {
        matchesFilter = statuses.includes('active');
      } else if (currentFilter === 'completed') {
        matchesFilter = statuses.includes('completed');
      } else if (currentFilter === 'overdue') {
        matchesFilter = statuses.includes('overdue');
      }

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (summaryFooter) {
      if (currentFilter === 'active') {
        summaryFooter.textContent = `${visibleCount} active projects · Sorted by last updated`;
      } else if (currentFilter === 'completed') {
        summaryFooter.textContent = `${visibleCount} completed projects · Sorted by completion date`;
      } else if (currentFilter === 'overdue') {
        summaryFooter.textContent = `${visibleCount} overdue & at-risk projects · Sorted by urgency`;
      } else {
        summaryFooter.textContent = `${visibleCount} total projects · Sorted by last updated`;
      }
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter') || 'all';
      applyProjectFilters();
    });
  });

  searchInput?.addEventListener('input', () => {
    applyProjectFilters();
  });

  applyProjectFilters();

  // ============================================================
  // TASKS PAGE: LIST vs BOARD vs RECURRING VIEW TOGGLE
  // ============================================================
  const tabTasksList = document.getElementById('tab-tasks-list');
  const tabTasksBoard = document.getElementById('tab-tasks-board');
  const tabTasksRecurring = document.getElementById('tab-tasks-recurring');
  const toggleListBoardBtn = document.getElementById('toggle-list-board-btn');
  const tasksViewList = document.getElementById('tasks-view-list');
  const tasksViewBoard = document.getElementById('tasks-view-board');
  const tasksViewRecurring = document.getElementById('tasks-view-recurring');
  const tasksHeaderSubtitle = document.getElementById('tasks-header-subtitle');

  function setTaskViewMode(mode) {
    tasksViewList?.classList.add('view-hidden');
    tasksViewBoard?.classList.add('view-hidden');
    tasksViewRecurring?.classList.add('view-hidden');

    if (tabTasksList) {
      tabTasksList.style.fontWeight = '500';
      tabTasksList.style.color = 'var(--text-muted)';
    }
    if (tabTasksBoard) {
      tabTasksBoard.style.fontWeight = '500';
      tabTasksBoard.style.color = 'var(--text-muted)';
    }
    if (tabTasksRecurring) {
      tabTasksRecurring.style.fontWeight = '500';
      tabTasksRecurring.style.color = 'var(--text-muted)';
    }

    if (mode === 'board') {
      tasksViewBoard?.classList.remove('view-hidden');
      if (tabTasksBoard) {
        tabTasksBoard.style.fontWeight = '700';
        tabTasksBoard.style.color = 'var(--text-main)';
      }
      if (tasksHeaderSubtitle) {
        tasksHeaderSubtitle.textContent = 'The shape of your work, at a glance.';
      }
    } else if (mode === 'recurring') {
      tasksViewRecurring?.classList.remove('view-hidden');
      if (tabTasksRecurring) {
        tabTasksRecurring.style.fontWeight = '700';
        tabTasksRecurring.style.color = 'var(--text-main)';
      }
      if (tasksHeaderSubtitle) {
        tasksHeaderSubtitle.textContent = 'Set the rhythm. Let the routine take care of itself.';
      }
    } else {
      tasksViewList?.classList.remove('view-hidden');
      if (tabTasksList) {
        tabTasksList.style.fontWeight = '700';
        tabTasksList.style.color = 'var(--text-main)';
      }
      if (tasksHeaderSubtitle) {
        tasksHeaderSubtitle.textContent = 'Make room for the work that matters.';
      }
    }
  }

  tabTasksList?.addEventListener('click', () => setTaskViewMode('list'));
  tabTasksBoard?.addEventListener('click', () => setTaskViewMode('board'));
  tabTasksRecurring?.addEventListener('click', () => setTaskViewMode('recurring'));
  toggleListBoardBtn?.addEventListener('click', () => {
    const isCurrentlyList = !tasksViewList?.classList.contains('view-hidden');
    setTaskViewMode(isCurrentlyList ? 'board' : 'list');
  });

  const taskDetailData = {
    1: {
      title: 'Finish Shopify webhook',
      status: 'In Progress',
      client: 'Neosava Shopify / Patricia',
      deadline: 'Oct 8, 2026',
      priority: 'High',
      est: '2h',
      act: '1h 15m',
      notes: 'Verify the order-paid callback, retry failed deliveries and log the response. Use the staging store before production.',
      attachment: 'Webhook-spec.pdf · 184 KB',
      updated: 'Updated today at 14:20 · Doni',
    },
    2: {
      title: 'Send invoice',
      status: 'In Progress',
      client: 'Client Website / Client A',
      deadline: 'Oct 9, 2026',
      priority: 'Medium',
      est: '30m',
      act: '—',
      notes: 'Prepare milestone 2 breakdown, verify tax identification numbers, and submit via automated PDF generator.',
      attachment: 'Invoice-draft-002.pdf · 92 KB',
      updated: 'Updated yesterday · Doni',
    },
    3: {
      title: 'Complete mobile UI',
      status: 'In Progress',
      client: 'SafeZone Mobile App / Client B',
      deadline: 'Oct 11, 2026',
      priority: 'High',
      est: '2h 30m',
      act: '1h',
      notes: 'Refine the biometric prompt and bottom navigation sheet for iOS Safari & Android WebView consistency.',
      attachment: 'SafeZone-Figma-v2.fig · 12 MB',
      updated: 'Updated today at 11:00 · Doni',
    },
  };

  const taskRows = document.querySelectorAll('.task-list-row');
  const taskDetailSidebar = document.getElementById('task-detail-sidebar');

  taskRows.forEach((row) => {
    row.addEventListener('click', () => {
      taskRows.forEach((r) => r.classList.remove('selected'));
      row.classList.add('selected');

      const id = row.getAttribute('data-task-id');
      const data = taskDetailData[id];
      if (data && taskDetailSidebar) {
        taskDetailSidebar.innerHTML = `
          <div class="task-detail-header-row">
            <div>
              <h3 class="task-detail-title">${data.title}</h3>
              <span class="project-status-dot" style="margin-top: 6px; font-size: 12px;">${data.status}</span>
            </div>
            <span style="font-size: 18px; color: var(--text-dim); cursor: pointer;">&hellip;</span>
          </div>

          <div>
            <div class="form-label">Project / Client</div>
            <input type="text" class="form-input-display" value="${data.client}" readonly />
          </div>

          <div class="two-col-grid">
            <div>
              <div class="form-label">Deadline</div>
              <input type="text" class="form-input-display" value="${data.deadline}" readonly />
            </div>
            <div>
              <div class="form-label">Priority</div>
              <input type="text" class="form-input-display" value="${data.priority}" readonly />
            </div>
          </div>

          <div class="two-col-grid">
            <div>
              <div class="form-label">Estimated</div>
              <input type="text" class="form-input-display" value="${data.est}" readonly />
            </div>
            <div>
              <div class="form-label">Actual</div>
              <input type="text" class="form-input-display" value="${data.act}" readonly />
            </div>
          </div>

          <div>
            <div class="form-label">Notes</div>
            <p class="task-detail-notes">${data.notes}</p>
          </div>

          <div>
            <div class="form-label">Checklist</div>
            <div class="checklist-box">
              <label class="checklist-item">
                <input type="checkbox" checked style="accent-color: #10b981;" />
                <span>Confirm callback signature</span>
              </label>
              <label class="checklist-item">
                <input type="checkbox" style="accent-color: #10b981;" />
                <span>Test failed delivery retry</span>
              </label>
            </div>
          </div>

          <div>
            <div class="form-label">Attachments</div>
            <a class="attachment-link-row">
              <span>&#128206;</span>
              <span>${data.attachment}</span>
            </a>
          </div>

          <div style="font-size: 11.5px; color: var(--text-dim); margin-top: 4px;">
            ${data.updated}
          </div>
        `;
      }
    });
  });

  const taskFilterTabs = document.querySelectorAll('#tasks-status-filters .filter-tab');
  taskFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      taskFilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ============================================================
  // CALENDAR INTERACTIVITY
  // ============================================================
  const calSegmentedBtns = document.querySelectorAll('.view-segmented-pill .segmented-btn');
  calSegmentedBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      calSegmentedBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ============================================================
  // CLIENTS & CLIENT DETAIL INTERACTION
  // ============================================================
  const clientFilterTabs = document.querySelectorAll('[data-client-filter]');
  const clientSearchInput = document.getElementById('clients-search-input');
  const clientCards = document.querySelectorAll('.client-card');

  clientFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      clientFilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  clientSearchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    clientCards.forEach((c) => {
      const name = c.querySelector('.client-card-title')?.textContent.toLowerCase() || '';
      const sub = c.querySelector('.client-card-sub')?.textContent.toLowerCase() || '';
      if (!q || name.includes(q) || sub.includes(q)) {
        c.style.display = 'flex';
      } else {
        c.style.display = 'none';
      }
    });
  });

  clientCards.forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.client-card-title')?.textContent.trim() || 'Patricia';
      const company = card.querySelector('.client-card-sub')?.textContent.trim() || 'Neosava';

      const detailName = document.getElementById('client-detail-name');
      const detailCrumb = document.getElementById('client-crumb-name');
      const detailSub = document.getElementById('client-detail-sub');

      if (detailName) detailName.textContent = name;
      if (detailCrumb) detailCrumb.textContent = name;
      if (detailSub) detailSub.textContent = `${company} · Client since March 2026`;

      switchMainView('clientDetail');
    });
  });

  document.getElementById('breadcrumb-clients')?.addEventListener('click', () => {
    switchMainView('clients');
  });

  // ============================================================
  // INVOICES LIST, CREATE & PREVIEW INTERACTION (IMAGES 2, 3, 4)
  // ============================================================
  document.getElementById('btn-create-invoice-main')?.addEventListener('click', () => {
    switchMainView('invoiceCreate');
  });

  const invoiceRows = document.querySelectorAll('.invoice-table-row');
  invoiceRows.forEach((row) => {
    row.addEventListener('click', () => {
      switchMainView('invoicePreview');
    });
  });

  document.getElementById('breadcrumb-invoices-1')?.addEventListener('click', () => {
    switchMainView('invoices');
  });

  document.getElementById('btn-save-draft')?.addEventListener('click', () => {
    switchMainView('invoices');
  });

  document.getElementById('btn-preview-invoice')?.addEventListener('click', () => {
    switchMainView('invoicePreview');
  });

  document.getElementById('btn-export-pdf-create')?.addEventListener('click', () => {
    switchMainView('invoicePreview');
  });

  document.getElementById('btn-back-to-editor')?.addEventListener('click', () => {
    switchMainView('invoiceCreate');
  });

  document.getElementById('breadcrumb-invoices-2')?.addEventListener('click', () => {
    switchMainView('invoices');
  });

  document.getElementById('btn-export-pdf-preview')?.addEventListener('click', () => {
    alert('Invoice INV-2026-004 exported as PDF successfully.');
  });

  const invoiceFilterTabs = document.querySelectorAll('[data-invoice-filter]');
  const invoiceSearchInput = document.getElementById('invoices-search-input');

  invoiceFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      invoiceFilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-invoice-filter');
      invoiceRows.forEach((row) => {
        const statusEl = row.querySelector('.status-badge');
        const statusClass = statusEl ? statusEl.classList[1] : '';

        if (filterVal === 'all' || statusClass === filterVal) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  invoiceSearchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    invoiceRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  });

  // ============================================================
  // DOCUMENTS INTERACTION (IMAGE 1)
  // ============================================================
  const docRows = document.querySelectorAll('.doc-row-item');
  const docInfoTitle = document.getElementById('doc-info-title');
  const docInfoMeta = document.getElementById('doc-info-meta');
  const docInfoAttached = document.getElementById('doc-info-attached');

  docRows.forEach((row) => {
    row.addEventListener('click', () => {
      docRows.forEach((r) => r.classList.remove('selected'));
      row.classList.add('selected');

      const name = row.getAttribute('data-doc-name');
      const size = row.getAttribute('data-doc-size');
      const attached = row.getAttribute('data-doc-attached');

      if (docInfoTitle && name) docInfoTitle.textContent = name;
      if (docInfoMeta && size) docInfoMeta.textContent = `PDF document · ${size}`;
      if (docInfoAttached && attached) docInfoAttached.textContent = attached;
    });
  });

  const docFilterTabs = document.querySelectorAll('[data-doc-filter]');
  docFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      docFilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ============================================================
  // SETTINGS PAGE INTERACTION (IMAGE 4)
  // ============================================================
  const settingsNavBtns = document.querySelectorAll('.settings-nav-btn');
  settingsNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      settingsNavBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const themeCards = document.querySelectorAll('.theme-card-preview');
  themeCards.forEach((tc) => {
    tc.addEventListener('click', () => {
      themeCards.forEach((c) => c.classList.remove('selected'));
      tc.classList.add('selected');
    });
  });

  // ============================================================
  // COMMAND PALETTE MODAL INTERACTION (IMAGE 5)
  // ============================================================
  const searchModalOverlay = document.getElementById('search-modal-overlay');
  const topSearchBtn = document.getElementById('top-search-btn');
  const paletteSearchInput = document.getElementById('palette-search-input');
  const paletteItems = document.querySelectorAll('.palette-item-row');
  const paletteQuickActions = document.querySelectorAll('.palette-quick-action');

  function openSearchModal() {
    searchModalOverlay?.classList.remove('view-hidden');
    if (paletteSearchInput) {
      paletteSearchInput.value = '';
      setTimeout(() => paletteSearchInput.focus(), 50);
    }
  }

  function closeSearchModal() {
    searchModalOverlay?.classList.add('view-hidden');
  }

  topSearchBtn?.addEventListener('click', openSearchModal);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K to open, Esc to close
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const isHidden = searchModalOverlay?.classList.contains('view-hidden');
      if (isHidden) {
        openSearchModal();
      } else {
        closeSearchModal();
      }
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  searchModalOverlay?.addEventListener('click', (e) => {
    if (e.target === searchModalOverlay) {
      closeSearchModal();
    }
  });

  // Palette Item Navigation
  paletteItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-nav-target');
      closeSearchModal();

      if (target === 'project-neosava') {
        openProjectDetail('Neosava Shopify', 'Patricia · Shopify storefront & integrations', 'overview');
      } else if (target === 'client-patricia') {
        switchMainView('clientDetail');
      } else if (target === 'invoice-preview') {
        switchMainView('invoicePreview');
      } else if (target === 'tasks') {
        switchMainView('tasks');
      }
    });
  });

  // Palette Quick Actions
  paletteQuickActions.forEach((qa) => {
    qa.addEventListener('click', () => {
      const action = qa.getAttribute('data-action');
      closeSearchModal();

      if (action === 'create-project') {
        switchMainView('projects');
      } else if (action === 'create-invoice') {
        switchMainView('invoiceCreate');
      } else if (action === 'create-task') {
        switchMainView('tasks');
      }
    });
  });

  // Palette Live Filter
  paletteSearchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    paletteItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // ============================================================
  // CHECKBOX TOGGLE ACROSS APP
  // ============================================================
  document.addEventListener('click', (e) => {
    const cb = e.target.closest('.custom-checkbox');
    if (cb) {
      cb.classList.toggle('checked');
      const taskItem = cb.closest('.task-item') || cb.closest('.task-list-row') || cb.closest('.kanban-card');
      if (taskItem) {
        const taskTitle = taskItem.querySelector('.task-title') || taskItem.querySelector('.kanban-card-title');
        if (taskTitle) {
          taskTitle.classList.toggle('completed', cb.classList.contains('checked'));
        }
      }
    }
  });

  // ============================================================
  // MILESTONES DYNAMIC SELECTION
  // ============================================================
  const milestoneData = {
    1: {
      title: 'Shopify Setup',
      status: 'Completed',
      statusClass: 'completed',
      desc: 'Initial store configuration, DNS setup, theme foundation, and shipping rates configuration.',
      deadline: 'October 04, 2026',
      amount: 'Rp 500.000',
      progress: '100%',
      progressText: '4 of 4 tasks complete',
      subtasks: [
        { done: true, text: 'Store DNS connected' },
        { done: true, text: 'Theme installed and baseline CSS configured' },
        { done: true, text: 'Shipping zones and rates mapped' },
        { done: true, text: 'Admin staff accounts invited' },
      ],
    },
    2: {
      title: 'Product Configuration',
      status: 'Completed',
      statusClass: 'completed',
      desc: 'Import catalog data, establish product collections, inventory rules, and custom variant options.',
      deadline: 'October 05, 2026',
      amount: 'Rp 500.000',
      progress: '100%',
      progressText: '3 of 3 tasks complete',
      subtasks: [
        { done: true, text: 'Import CSV product catalogue' },
        { done: true, text: 'Create smart collections' },
        { done: true, text: 'Set inventory tracking limits' },
      ],
    },
    3: {
      title: 'Affiliate System',
      status: 'Completed',
      statusClass: 'completed',
      desc: 'Set up affiliate registration portal, commission tier calculation, and referral link tracking.',
      deadline: 'October 07, 2026',
      amount: 'Rp 800.000',
      progress: '100%',
      progressText: '5 of 5 tasks complete',
      subtasks: [
        { done: true, text: 'Affiliate portal signup page' },
        { done: true, text: 'Commission tiered rules defined' },
        { done: true, text: 'Referral tracking script integration' },
        { done: true, text: 'Automated payout trigger test' },
        { done: true, text: 'Affiliate dashboard UI polish' },
      ],
    },
    4: {
      title: 'Payment Integration',
      status: 'Pending',
      statusClass: 'pending',
      desc: 'Connect the payment gateway and confirm that successful purchases trigger the correct Shopify webhooks.',
      deadline: 'October 12, 2026',
      amount: 'Rp 600.000',
      progress: '25%',
      progressText: '1 of 4 tasks complete',
      subtasks: [
        { done: true, text: 'Gateway credentials received' },
        { done: false, text: 'Fix webhook' },
        { done: false, text: 'Test payment callback' },
        { done: false, text: 'Client checkout review' },
      ],
    },
    5: {
      title: 'Final Testing',
      status: 'Pending',
      statusClass: 'pending',
      desc: 'Cross-device and responsive QA, simulated real user purchases, and error boundary tests.',
      deadline: 'October 16, 2026',
      amount: 'Rp 400.000',
      progress: '0%',
      progressText: '0 of 3 tasks complete',
      subtasks: [
        { done: false, text: 'Mobile device responsive check' },
        { done: false, text: 'Cart edge-case test suite' },
        { done: false, text: 'Load time and image optimization' },
      ],
    },
    6: {
      title: 'Deployment',
      status: 'Pending',
      statusClass: 'pending',
      desc: 'Client final sign-off, domain point to live environment, and formal handover documentation.',
      deadline: 'October 20, 2026',
      amount: 'Rp 300.000',
      progress: '0%',
      progressText: '0 of 2 tasks complete',
      subtasks: [
        { done: false, text: 'Final client walkthrough approval' },
        { done: false, text: 'Store handover & admin credential transfer' },
      ],
    },
  };

  const milestoneRows = document.querySelectorAll('.milestone-row');
  const milestoneDetailPanel = document.getElementById('milestone-detail-panel');

  milestoneRows.forEach((row) => {
    row.addEventListener('click', () => {
      milestoneRows.forEach((r) => r.classList.remove('selected'));
      row.classList.add('selected');

      const id = row.getAttribute('data-milestone');
      const data = milestoneData[id];
      if (data && milestoneDetailPanel) {
        milestoneDetailPanel.innerHTML = `
          <div class="milestone-detail-header">
            <h3 class="milestone-detail-title">${data.title}</h3>
            <span class="milestone-status ${data.statusClass}" style="align-self: flex-start; margin-top: 4px;">${data.status}</span>
          </div>

          <p class="milestone-detail-desc">${data.desc}</p>

          <div class="detail-section-block">
            <span class="detail-section-label">Deadline</span>
            <span class="detail-section-val">${data.deadline}</span>
          </div>

          <div class="detail-section-block">
            <span class="detail-section-label">Milestone amount</span>
            <span class="detail-amount-val">${data.amount}</span>
          </div>

          <div>
            <div class="project-progress-bar" style="height: 5px; margin-bottom: 8px;">
              <div class="project-progress-fill" style="width: ${data.progress};"></div>
            </div>
            <span class="detail-section-label">${data.progressText}</span>
          </div>

          <div class="subtasks-list">
            ${data.subtasks
              .map(
                (st) => `
              <div class="subtask-item">
                <span class="subtask-icon ${st.done ? 'checked' : ''}">${st.done ? '✓' : '○'}</span>
                <span>${st.text}</span>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }
    });
  });
});
