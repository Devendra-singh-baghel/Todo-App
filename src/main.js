import { loadState } from './storage.js';
import { setupTaskEvents } from './taskManager.js';
import { setupThemeToggle } from './theme.js';
import { handleFilter, updateCounts } from './dom.js';
import '../style.css';

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  setupTaskEvents();
  setupThemeToggle();
  updateCounts();
  handleFilter();
});