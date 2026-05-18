document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('.search-btn');
  const dropdown = document.getElementById('searchDropdown');
  const searchInput = document.getElementById('searchInput');

  if (!searchBtn || !dropdown || !searchInput) {
    return;
  }

  const dropdownItems = Array.from(dropdown.querySelectorAll('.dropdown-item'));

  searchBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    searchBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      searchInput.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-search-tab')) {
      dropdown.classList.remove('open');
      searchBtn.setAttribute('aria-expanded', 'false');
    }
  });

  searchInput.addEventListener('input', () => {
    const text = searchInput.value.trim().toLowerCase();

    dropdownItems.forEach((item) => {
      const label = item.textContent.trim().toLowerCase();
      item.style.display = label.includes(text) ? 'block' : 'none';
    });

    const anyVisible = dropdownItems.some((item) => item.style.display !== 'none');
    if (text && anyVisible) {
      dropdown.classList.add('open');
      searchBtn.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.classList.remove('open');
      searchBtn.setAttribute('aria-expanded', 'false');
    }
  });

  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      searchInput.value = item.textContent.trim();
      dropdown.classList.remove('open');
      searchBtn.setAttribute('aria-expanded', 'false');
      searchInput.focus();
    });
  });
});
