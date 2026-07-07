/**
 * ZCUS Shared Framework
 * ──────────────────────
 * Dark mode • localStorage helpers • Toast notifications
 * Clipboard copy • Recently-used tracker • Favorites system
 *
 * Usage: <script src="shared/theme.js"></script>
 * All exports live under window.ZCUS
 */
(function () {
  'use strict';

  const NS = 'zcus';
  const KEY = (k) => `${NS}:${k}`;

  /* ═══════════════════════════════════════════════════════
     localStorage Helpers
     ═══════════════════════════════════════════════════════ */
  const store = {
    get(key, fallback = null) {
      try { const v = localStorage.getItem(KEY(key)); return v !== null ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(KEY(key), JSON.stringify(val)); } catch {}
    },
    remove(key) {
      try { localStorage.removeItem(KEY(key)); } catch {}
    },
    clear() {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && k.startsWith(NS + ':')) localStorage.removeItem(k);
        }
      } catch {}
    }
  };

  /* ═══════════════════════════════════════════════════════
     Dark Mode Toggle
     ═══════════════════════════════════════════════════════ */
  const THEMES = ['light', 'dark', 'auto'];

  const theme = {
    /** Apply theme: 'light' | 'dark' | 'auto' */
    set(mode) {
      if (!THEMES.includes(mode)) mode = 'auto';
      store.set('theme', mode);
      applyTheme(mode);
    },
    get() { return store.get('theme', 'auto'); },
    /** Convenience toggle: cycles light → dark → auto */
    toggle() {
      const cur = this.get();
      const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'auto' : 'light';
      this.set(next);
    }
  };

  function applyTheme(mode) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'auto' && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  }

  // Initial apply
  applyTheme(theme.get());
  // React to OS preference when on auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.get() === 'auto') applyTheme('auto');
  });

  /* ═══════════════════════════════════════════════════════
     Toast Notifications
     ═══════════════════════════════════════════════════════ */
  function ensureContainer() {
    let c = document.getElementById('zcus-toast-container');
    if (!c) { c = document.createElement('div'); c.id = 'zcus-toast-container'; document.body.appendChild(c); }
    return c;
  }

  /**
   * @param {string} msg
   * @param {'success'|'warning'|'danger'|'info'} [type='info']
   * @param {number} [duration=3000] ms
   */
  function toast(msg, type = 'info', duration = 3000) {
    const container = ensureContainer();
    const el = document.createElement('div');
    el.className = `zcus-toast zcus-${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.classList.add('zcus-exit'); el.addEventListener('animationend', () => el.remove()); }, duration);
  }

  /* ═══════════════════════════════════════════════════════
     Clipboard Copy
     ═══════════════════════════════════════════════════════ */
  /**
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied!', 'success', 1500);
      return true;
    } catch {
      // Fallback for older browsers / insecure contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      if (ok) toast('Copied!', 'success', 1500);
      else toast('Copy failed', 'danger', 2000);
      return ok;
    }
  }

  /* ═══════════════════════════════════════════════════════
     Recently Used Tracker
     ═══════════════════════════════════════════════════════ */
  const MAX_RECENT = 20;

  const recent = {
    /** @returns {Array<{id:string, label:string, ts:number}>} */
    list() { return store.get('recent', []); },
    /** @param {string} id @param {string} [label] */
    track(id, label) {
      const items = this.list().filter(r => r.id !== id);
      items.unshift({ id, label: label || id, ts: Date.now() });
      store.set('recent', items.slice(0, MAX_RECENT));
    },
    /** @param {string} id */
    remove(id) {
      store.set('recent', this.list().filter(r => r.id !== id));
    },
    clear() { store.set('recent', []); }
  };

  /* ═══════════════════════════════════════════════════════
     Favorites System
     ═══════════════════════════════════════════════════════ */
  const favs = {
    /** @returns {Array<{id:string, label:string, ts:number}>} */
    list() { return store.get('favs', []); },
    /** @returns {Set<string>} */
    ids() { return new Set(this.list().map(f => f.id)); },
    /** @param {string} id @param {string} [label] */
    add(id, label) {
      if (this.ids().has(id)) return;
      const items = this.list();
      items.unshift({ id, label: label || id, ts: Date.now() });
      store.set('favs', items);
    },
    /** @param {string} id */
    remove(id) {
      store.set('favs', this.list().filter(f => f.id !== id));
    },
    /** @param {string} id @returns {boolean} */
    has(id) { return this.ids().has(id); },
    /** @param {string} id @param {string} [label] — toggle on/off */
    toggle(id, label) {
      if (this.has(id)) { this.remove(id); return false; }
      this.add(id, label); return true;
    },
    clear() { store.set('favs', []); }
  };

  /* ═══════════════════════════════════════════════════════
     Export to window.ZCUS
     ═══════════════════════════════════════════════════════ */
  window.ZCUS = { store, theme, toast, copy, recent, favs };

})();
