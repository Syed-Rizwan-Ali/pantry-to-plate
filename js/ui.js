// Navigation, theme preference and toast notifications.
// --- TAB NAVIGATION ---
        function switchTab(tabId) {
            ['inventory', 'recipes', 'planner', 'shopping'].forEach(t => {
                const view = document.getElementById(`view-${t}`);
                const btn = document.getElementById(`tab-${t}`);
                const mobBtn = document.getElementById(`mob-tab-${t}`);

                if (t === tabId) {
                    view.classList.remove('hidden');
                    if (btn) {
                        btn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white";
                    }
                    if (mobBtn) {
                        mobBtn.className = "mobile-tab-btn flex flex-col items-center text-brand-600 dark:text-brand-400 text-xs gap-1";
                    }
                } else {
                    view.classList.add('hidden');
                    if (btn) {
                        btn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
                    }
                    if (mobBtn) {
                        mobBtn.className = "mobile-tab-btn flex flex-col items-center text-slate-500 text-xs gap-1";
                    }
                }
            });
            lucide.createIcons();
        }


// Restore the saved theme before the user interacts with the app.
function applySavedTheme() {
    const savedTheme = localStorage.getItem('pantry_theme');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}
applySavedTheme();

        // --- DARK MODE TOGGLE ---
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('pantry_theme', isDark ? 'dark' : 'light');
        });

        // --- TOAST NOTIFICATIONS ---
        function showToast(msg) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0";
            toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-brand-400 dark:text-brand-600"></i> ${msg}`;
            
            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 10);

            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
