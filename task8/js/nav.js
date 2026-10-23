const initNav = () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  if (!menuBtn || !mainNav) return;

  const ICONS = {
    open: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  };

  const toggleNav = (forceClose = false) => {
    const isExpanded = forceClose ? false : !mainNav.classList.contains('active-mobile');
    mainNav.classList.toggle('active-mobile', isExpanded);
    menuBtn.setAttribute('aria-expanded', isExpanded);
    menuBtn.innerHTML = isExpanded ? ICONS.close : ICONS.open;
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', () => toggleNav());
  
  // Event Delegation for Nav Links
  mainNav.addEventListener('click', e => {
    if (e.target.tagName === 'A' && mainNav.classList.contains('active-mobile')) {
      toggleNav(true);
    }
  });
};

document.addEventListener('DOMContentLoaded', initNav);
