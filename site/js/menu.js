// Mobile menu: the <details> element opens and closes on its own.
// This only closes it after a link is tapped, or when Escape is pressed.
document.querySelectorAll('.menu').forEach(function (menu) {
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { menu.open = false; });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') menu.open = false;
  });
});
