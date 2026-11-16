import './index.css';

interface SessionDetail {
  dayLabel: string;
  date: string;
  time: string;
  theme: string;
  summary: string;
  flow: string[];
}

const SESSIONS: Record<string, SessionDetail> = {
  day1: {
    dayLabel: 'Day 01',
    date: 'November 23rd',
    time: '8:00 PM – 9:00 PM',
    // theme: 'Grounding Breath, Gentle Release & Vocal Calm',
    // summary:
    //   'Settle out of daily responsibilities with resonant evening chanting and gentle joint mobilization to release neck, shoulder, and jaw tension.',
    theme: '',
    summary:
      '',
    flow: [
      '08:00 PM – 08:10 PM · Chanting of Gayathri Mantra & its significance',
      '08:10 PM – 08:20 PM · Sukshmavyayama',
      '08:20 PM – 08:50 PM · Guided Face Yoga Exercises & Massages for the upper face',
      '08:50 PM – 09:00 PM · Guided Prana Awareness- Nadi Shodana Pranayama',
    ],
  },
  day2: {
    dayLabel: 'Day 02',
    date: 'November 25th',
    time: '8:00 PM – 9:00 PM',
    // theme: 'Facial Vitality, Circulation & Energetic Flow',
    // summary:
    //   'Build natural facial tone and lymphatic clarity with upward Face Yoga massages paired with rhythmic Sukshma Vyayama and soothing breathwork.',
    theme: '',
    summary:
      '',
    flow: [
      '08:00 PM – 08:10 PM · Chanting of Shanthi Prayer & its significance',
      '08:10 PM – 08:20 PM · Sukshmavyayama',
      '08:20 PM – 08:50 PM · Guided Face Yoga Exercises & Massages for the Mid face',
      '08:50 PM – 09:00 PM · Guided Prana Awareness- Wim Hof Breathing method',
    ],
  },
  day3: {
    dayLabel: 'Day 03',
    date: 'November 27th',
    time: '8:00 PM – 9:00 PM',
    // theme: 'Prana Awakening & Sustainable Home Practice',
    // summary:
    //   'Integrate all four pillars into a serene, repeatable evening ritual you can sustain effortlessly for ongoing physical vitality, mental clarity, and inner peace.',
    theme: '',
    summary:
      '',
    flow: [
      '08:00 PM – 08:10 PM · Chanting of Mrithyunjaya Mantra & its significance',
      '08:10 PM – 08:20 PM · Sukshmavyayama',
      '08:20 PM – 08:50 PM · Guided Face Yoga Exercises & Massages for the lower face',
      '08:50 PM – 09:00 PM · Guided Prana Awareness- Bhramari Pranayama',
    ],
  },
};

function initMobileMenu(): void {
  const menuBtn = document.getElementById('mobile-menu-btn') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (!menuBtn || !mobileMenu) return;

  const setOpen = (isOpen: boolean): void => {
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('hidden', !isOpen);
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
    }
  };

  menuBtn.addEventListener('click', () => {
    const currentlyOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!currentlyOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menuBtn.focus();
    }
  });
}

function initBeforeAfterComparison(): void {
  const btnSideBySide = document.getElementById('mode-side-by-side') as HTMLButtonElement | null;
  const btnSlider = document.getElementById('mode-slider') as HTMLButtonElement | null;
  const viewSideBySide = document.getElementById('view-side-by-side');
  const viewSlider = document.getElementById('view-slider');

  const rangeInput = document.getElementById('compare-slider') as HTMLInputElement | null;
  const afterLayer = document.getElementById('after-clip-layer');
  const dividerLine = document.getElementById('slider-divider');
  const percentReadout = document.getElementById('compare-percent');

  if (btnSideBySide && btnSlider && viewSideBySide && viewSlider) {
    const setMode = (mode: 'side' | 'slider'): void => {
      const isSide = mode === 'side';
      viewSideBySide.classList.toggle('hidden', !isSide);
      viewSlider.classList.toggle('hidden', isSide);

      btnSideBySide.setAttribute('aria-pressed', String(isSide));
      btnSlider.setAttribute('aria-pressed', String(!isSide));

      btnSideBySide.className = isSide
        ? 'px-4 py-2 text-sm font-medium rounded-md bg-white text-[#2A2226] shadow-xs transition-colors whitespace-nowrap shrink-0 min-h-[40px]'
        : 'px-4 py-2 text-sm font-medium rounded-md text-[#5A4E53] hover:text-[#2A2226] transition-colors whitespace-nowrap shrink-0 min-h-[40px]';

      btnSlider.className = !isSide
        ? 'px-4 py-2 text-sm font-medium rounded-md bg-white text-[#2A2226] shadow-xs transition-colors whitespace-nowrap shrink-0 min-h-[40px]'
        : 'px-4 py-2 text-sm font-medium rounded-md text-[#5A4E53] hover:text-[#2A2226] transition-colors whitespace-nowrap shrink-0 min-h-[40px]';
    };

    btnSideBySide.addEventListener('click', () => setMode('side'));
    btnSlider.addEventListener('click', () => setMode('slider'));
  }

  if (rangeInput && afterLayer && dividerLine) {
    const updateSlider = (value: string): void => {
      const pct = Math.min(100, Math.max(0, Number(value)));
      afterLayer.style.clipPath = `inset(0 0 0 ${pct}%)`;
      dividerLine.style.left = `${pct}%`;
      if (percentReadout) {
        percentReadout.textContent = `${Math.round(pct)}%`;
      }
    };

    rangeInput.addEventListener('input', () => updateSlider(rangeInput.value));
    updateSlider(rangeInput.value || '50');
  }
}

function initSessionTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-session-tab]');
  const dayDateEl = document.getElementById('session-date');
  const dayTimeEl = document.getElementById('session-time');
  const dayThemeEl = document.getElementById('session-theme');
  const daySummaryEl = document.getElementById('session-summary');
  const dayFlowEl = document.getElementById('session-flow');

  if (!tabs.length || !dayDateEl || !dayTimeEl || !dayThemeEl || !daySummaryEl || !dayFlowEl) {
    return;
  }

  const renderSession = (key: string): void => {
    const data = SESSIONS[key];
    if (!data) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.sessionTab === key;
      tab.setAttribute('aria-selected', String(active));
      tab.className = active
        ? 'px-4 py-2.5 text-sm font-medium rounded-lg bg-[#8E4A5C] text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px]'
        : 'px-4 py-2.5 text-sm font-medium rounded-lg bg-[#F3ECEA] text-[#5A4E53] hover:text-[#2A2226] hover:bg-[#EAE0DD] transition-colors whitespace-nowrap shrink-0 min-h-[44px]';
    });

    dayDateEl.textContent = data.date;
    dayTimeEl.textContent = data.time;
    dayThemeEl.textContent = data.theme;
    daySummaryEl.textContent = data.summary;

    dayFlowEl.innerHTML = '';
    data.flow.forEach((item) => {
      const li = document.createElement('li');
      li.className =
        'py-2.5 border-b border-[#E6DCDA] last:border-b-0 text-sm text-[#3F353A] tabular-nums';
      li.textContent = item;
      dayFlowEl.appendChild(li);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.sessionTab;
      if (key) renderSession(key);
    });
  });

  renderSession('day1');
}

function initRegistrationForm(): void {
  const form = document.getElementById('registration-form') as HTMLFormElement | null;
  const nameInput = document.getElementById('participant-name') as HTMLInputElement | null;
  const phoneInput = document.getElementById('participant-phone') as HTMLInputElement | null;
  const emailInput = document.getElementById('participant-email') as HTMLInputElement | null;
  const focusSelect = document.getElementById('participant-focus') as HTMLSelectElement | null;
  const ladiesCheck = document.getElementById('ladies-only-confirm') as HTMLInputElement | null;

  const errorBox = document.getElementById('form-error');
  const successBox = document.getElementById('form-success');
  const summaryText = document.getElementById('confirmation-summary');
  const mailtoLink = document.getElementById('confirmation-mailto') as HTMLAnchorElement | null;
  const resetBtn = document.getElementById('reset-form-btn') as HTMLButtonElement | null;

  if (!form || !nameInput || !phoneInput || !emailInput || !ladiesCheck || !errorBox || !successBox) {
    return;
  }

  const showError = (msg: string): void => {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
  };

  const clearError = (): void => {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const name = nameInput.value.trim();
    const rawPhone = phoneInput.value.replace(/\D/g, '');
    const email = emailInput.value.trim();
    const focus = focusSelect ? focusSelect.value : 'Complete 3-Day Holistic Program';

    if (name.length < 2) {
      showError('Please enter your full name.');
      nameInput.focus();
      return;
    }

    if (rawPhone.length < 10) {
      showError('Please enter a valid 10-digit mobile number.');
      phoneInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!ladiesCheck.checked) {
      showError('Please confirm that this registration is for a lady participant.');
      ladiesCheck.focus();
      return;
    }

    if (summaryText) {
      summaryText.textContent = `${name} (${rawPhone} · ${email}) — ${focus}. Program: Nov 23, 25 & 27 · 8:00 PM – 9:00 PM · Rs 299/-.`;
    }

    if (mailtoLink) {
      const subject = encodeURIComponent(`Registration Inquiry: Blissful Holistic Hub (${name})`);
      const body = encodeURIComponent(
        `Namaste Dr. K Rekha Rani,\n\nI would like to participate in the Three Day Ladies-Only Holistic Program (Nov 23, 25 & 27, 8:00 PM - 9:00 PM, Fee: Rs 299/-).\n\nParticipant Details:\nName: ${name}\nMobile: ${rawPhone}\nEmail: ${email}\nPrimary Interest: ${focus}\n\nPlease share the joining and payment details.\n\nWarm regards,\n${name}`
      );
      mailtoLink.href = `mailto:rekhasarat2304@gmail.com?subject=${subject}&body=${body}`;
    }

    form.classList.add('hidden');
    successBox.classList.remove('hidden');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      clearError();
      successBox.classList.add('hidden');
      form.classList.remove('hidden');
    });
  }
}

function initImageFallbacks(): void {
  document.querySelectorAll<HTMLImageElement>('img[data-fallback-id]').forEach((img) => {
    const showFallback = (): void => {
      const fallbackId = img.dataset.fallbackId;
      if (!fallbackId) return;
      const fallbackEl = document.getElementById(fallbackId);
      if (fallbackEl) {
        img.classList.add('hidden');
        fallbackEl.classList.remove('hidden');
        fallbackEl.classList.add('flex');
      }
    };

    img.addEventListener('error', showFallback);
    if (img.complete && img.naturalWidth === 0) {
      showFallback();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBeforeAfterComparison();
  initSessionTabs();
  initRegistrationForm();
  initImageFallbacks();
});
