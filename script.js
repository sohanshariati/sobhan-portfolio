const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'باز کردن منو');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const setActive = id => navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

document.querySelectorAll('[data-todo]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.alert(link.dataset.todo);
  });
});
