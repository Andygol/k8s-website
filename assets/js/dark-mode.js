/*!
 * This is a Docsy-adapted version of https://github.com/twbs/examples/blob/main/color-modes/js/color-modes.js.
 *
 * Original header:
 *
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const themeKey = 'td-color-theme'
  const getStoredTheme = () => localStorage.getItem(themeKey)
  const setStoredTheme = theme => localStorage.setItem(themeKey, theme)

  // Mermaid dark mode support
  const initMermaidDarkMode = () => {
    // Check if mermaid is available
    if (typeof mermaid === 'undefined') {
      return;
    }
    
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      themeVariables: isDark ? {
        darkMode: true,
        background: '#0d1117',
        primaryColor: '#161b22',
        primaryTextColor: '#e6e6e6',
        primaryBorderColor: '#30363d',
        lineColor: '#8b949e',
        secondaryColor: '#161b22',
        tertiaryColor: '#21262d',
        mainBkg: '#161b22',
        secondBkg: '#21262d',
        border1: '#30363d',
        border2: '#21262d',
        arrowheadColor: '#8b949e',
        fontFamily: 'inherit',
        fontSize: '14px',
        textColor: '#e6e6e6',
        nodeTextColor: '#e6e6e6',
        actorBorder: '#30363d',
        actorBkg: '#161b22',
        actorTextColor: '#e6e6e6',
        actorLineColor: '#8b949e',
        signalColor: '#8b949e',
        signalTextColor: '#e6e6e6'
      } : {}
    });
    
    // Re-render all mermaid diagrams - use the correct method for mermaid version
    if (typeof mermaid.run === 'function') {
      mermaid.run();
    } else if (typeof mermaid.init === 'function') {
      mermaid.init();
    }
    mermaid.run();
  };

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
    
    // Update mermaid diagrams when theme changes
    if (typeof mermaid !== 'undefined') {
      setTimeout(() => {
        initMermaidDarkMode();
      }, 100);
    }
  }

  setTheme(getPreferredTheme())

  document.documentElement.removeAttribute('data-theme-init')

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    if (themeSwitcherText) {
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
    }

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())
    
    // Initialize mermaid with current theme
    if (typeof mermaid !== 'undefined') {
      setTimeout(() => {
        initMermaidDarkMode();
      }, 500);
    }

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
