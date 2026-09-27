/**
 * UltraWide Video Fill Pro - Official Site Interactions
 * Clean, lightweight, performant JavaScript. No heavy dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 1. Floating Nav on Scroll ───
  const nav = document.querySelector('.site-nav');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── 2. Mobile Nav Toggle ───
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ─── 3. Hero Interactive Extension Popup ───
  const heroMonitor = document.querySelector('.hero-monitor-screen');
  const heroScene = document.querySelector('.hero-video-scene');
  const zoomToggleRow = document.getElementById('heroZoomToggleRow');
  const zoomSwitch = document.getElementById('heroZoomSwitch');
  const zoomStatus = document.getElementById('heroZoomStatus');
  const heroModeBadge = document.getElementById('heroModeBadge');

  const heroCropSlider = document.getElementById('heroCropSlider');
  const heroCropVal = document.getElementById('heroCropVal');

  const heroSharpSlider = document.getElementById('heroSharpSlider');
  const heroSharpVal = document.getElementById('heroSharpVal');

  const heroHdrSlider = document.getElementById('heroHdrSlider');
  const heroHdrVal = document.getElementById('heroHdrVal');

  const heroPresetPill = document.getElementById('heroPresetPill');
  const heroPresetText = document.getElementById('heroPresetText');

  let isFillActive = true;
  let currentCrop = 112; // 112% zoom
  let currentSharp = 35;
  let currentHdr = 60;
  const presets = ['21:9 Ultrawide', '32:9 Superwide', '16:9 Standard', '18:9 Cinema'];
  let presetIndex = 0;

  function updateHeroPreview() {
    if (!heroScene || !heroMonitor) return;

    if (isFillActive) {
      heroMonitor.classList.remove('is-letterboxed');
      const scale = currentCrop / 100;
      heroScene.style.transform = `scale(${scale})`;
      if (heroModeBadge) {
        heroModeBadge.textContent = '21:9 Zoom to Fill Active';
        heroModeBadge.style.color = 'var(--accent-cyan)';
      }
    } else {
      heroMonitor.classList.add('is-letterboxed');
      heroScene.style.transform = 'scale(0.78)';
      if (heroModeBadge) {
        heroModeBadge.textContent = '16:9 Letterboxed (Black Bars)';
        heroModeBadge.style.color = 'var(--text-secondary)';
      }
    }

    // Combine filters for Sharpness & HDR boost simulation
    const contrastVal = 1 + (currentSharp * 0.003) + (currentHdr * 0.002);
    const saturateVal = 1 + (currentHdr * 0.004);
    const brightVal = 1 + (currentHdr * 0.001);
    heroScene.style.filter = `contrast(${contrastVal}) saturate(${saturateVal}) brightness(${brightVal})`;
  }

  if (zoomToggleRow && zoomSwitch) {
    zoomToggleRow.addEventListener('click', () => {
      isFillActive = !isFillActive;
      zoomSwitch.classList.toggle('active', isFillActive);
      if (zoomStatus) zoomStatus.textContent = isFillActive ? 'ON' : 'OFF';
      updateHeroPreview();
    });
  }

  if (heroCropSlider && heroCropVal) {
    heroCropSlider.addEventListener('input', (e) => {
      currentCrop = parseInt(e.target.value, 10);
      heroCropVal.textContent = `${currentCrop}%`;
      isFillActive = true;
      zoomSwitch?.classList.add('active');
      if (zoomStatus) zoomStatus.textContent = 'ON';
      updateHeroPreview();
    });
  }

  if (heroSharpSlider && heroSharpVal) {
    heroSharpSlider.addEventListener('input', (e) => {
      currentSharp = parseInt(e.target.value, 10);
      heroSharpVal.textContent = `${currentSharp}%`;
      updateHeroPreview();
    });
  }

  if (heroHdrSlider && heroHdrVal) {
    heroHdrSlider.addEventListener('input', (e) => {
      currentHdr = parseInt(e.target.value, 10);
      heroHdrVal.textContent = `${currentHdr}%`;
      updateHeroPreview();
    });
  }

  if (heroPresetPill && heroPresetText) {
    heroPresetPill.addEventListener('click', () => {
      presetIndex = (presetIndex + 1) % presets.length;
      heroPresetText.textContent = presets[presetIndex];
      if (presets[presetIndex].startsWith('16:9')) {
        isFillActive = false;
        zoomSwitch?.classList.remove('active');
        if (zoomStatus) zoomStatus.textContent = 'OFF';
      } else {
        isFillActive = true;
        zoomSwitch?.classList.add('active');
        if (zoomStatus) zoomStatus.textContent = 'ON';
        if (presets[presetIndex].startsWith('32:9')) {
          currentCrop = 135;
          if (heroCropSlider) heroCropSlider.value = 135;
          if (heroCropVal) heroCropVal.textContent = '135%';
        } else {
          currentCrop = 112;
          if (heroCropSlider) heroCropSlider.value = 112;
          if (heroCropVal) heroCropVal.textContent = '112%';
        }
      }
      updateHeroPreview();
    });
  }

  // Initial preview update
  updateHeroPreview();

  // ─── 4. "Made for Ultrawide" Aspect Ratio Selector Tabs ───
  const ratioTabs = document.querySelectorAll('.ratio-tab-btn');
  const ratioScreen = document.getElementById('ratioDisplayScreen');
  const ratioBg = document.getElementById('ratioBgVideo');
  const ratioMaskLeft = document.getElementById('ratioMaskLeft');
  const ratioMaskRight = document.getElementById('ratioMaskRight');
  const ratioBanner = document.getElementById('ratioBannerText');

  const ratioConfigs = {
    '16:9': {
      aspectRatio: '16 / 9',
      maskWidth: '0%',
      scale: '1',
      desc: '16:9 Standard Widescreen (Native display or letterboxed inside ultrawides)'
    },
    '18:9': {
      aspectRatio: '18 / 9',
      maskWidth: '0%',
      scale: '1.08',
      desc: '18:9 (2:1) Modern Cinematic & Mobile Format (Expanded field of view)'
    },
    '21:9': {
      aspectRatio: '21 / 9',
      maskWidth: '0%',
      scale: '1.25',
      desc: '21:9 Ultrawide (2560x1080 / 3440x1440) — Black bars completely eliminated'
    },
    '32:9': {
      aspectRatio: '32 / 9',
      maskWidth: '0%',
      scale: '1.65',
      desc: '32:9 Super Ultrawide (5120x1440) — Panoramic immersion across dual-QHD canvas'
    }
  };

  ratioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ratioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const ratio = tab.dataset.ratio;
      const config = ratioConfigs[ratio];
      if (!config || !ratioScreen) return;

      ratioScreen.style.aspectRatio = config.aspectRatio;
      if (ratioBg) ratioBg.style.transform = `scale(${config.scale})`;
      if (ratioMaskLeft) ratioMaskLeft.style.width = config.maskWidth;
      if (ratioMaskRight) ratioMaskRight.style.width = config.maskWidth;
      if (ratioBanner) ratioBanner.textContent = config.desc;
    });
  });

  // ─── 5. Interactive Before / After Draggable Slider ───
  const compContainer = document.getElementById('comparisonContainer');
  const compDivider = document.getElementById('comparisonDivider');

  if (compContainer && compDivider) {
    let isDragging = false;

    function setDividerPosition(clientX) {
      const rect = compContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      let percent = (offsetX / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      compContainer.style.setProperty('--divider-pos', `${percent}%`);
      compDivider.setAttribute('aria-valuenow', Math.round(percent));
    }

    // Mouse events
    compContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setDividerPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setDividerPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    compContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setDividerPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setDividerPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Keyboard support
    compDivider.addEventListener('keydown', (e) => {
      const currentVal = parseInt(compDivider.getAttribute('aria-valuenow') || '50', 10);
      if (e.key === 'ArrowLeft') {
        const nextVal = Math.max(0, currentVal - 5);
        compContainer.style.setProperty('--divider-pos', `${nextVal}%`);
        compDivider.setAttribute('aria-valuenow', nextVal);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        const nextVal = Math.min(100, currentVal + 5);
        compContainer.style.setProperty('--divider-pos', `${nextVal}%`);
        compDivider.setAttribute('aria-valuenow', nextVal);
        e.preventDefault();
      }
    });
  }

  // ─── 6. Enhancement Section Showcase Sliders ───
  const showcaseSharpSlider = document.getElementById('showcaseSharpSlider');
  const showcaseSharpVal = document.getElementById('showcaseSharpVal');
  if (showcaseSharpSlider && showcaseSharpVal) {
    showcaseSharpSlider.addEventListener('input', (e) => {
      showcaseSharpVal.textContent = e.target.value;
    });
  }

  const showcaseHdrSlider = document.getElementById('showcaseHdrSlider');
  const showcaseHdrVal = document.getElementById('showcaseHdrVal');
  if (showcaseHdrSlider && showcaseHdrVal) {
    showcaseHdrSlider.addEventListener('input', (e) => {
      showcaseHdrVal.textContent = e.target.value;
    });
  }
});
