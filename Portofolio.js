const items = [...document.querySelectorAll('.item')];
const screens = [...document.querySelectorAll('.screen')];
const menu = document.getElementById('menu');
const wipe = document.querySelector('.wipe');
let idx = 0, busy = false;

// Bungkus tiap huruf judul dengan <span> untuk efek ransom note
document.querySelectorAll('.ransom,.name,.item').forEach(h => {
  h.innerHTML = [...h.textContent].map(c => c === '.' ? '<span class="dot"></span>' : `<span>${c}</span>`).join('');
});

// Tombol kembali di setiap layar selain menu
screens.filter(s => s !== menu).forEach(s => {
  const b = document.createElement('div');
  b.className = 'back';
  b.textContent = '‹ ESC BACK';
  b.addEventListener('click', () => show('menu'));
  s.prepend(b);
});

function select(i) {
  items[idx].classList.remove('selected');
  idx = (i + items.length) % items.length;
  items[idx].classList.add('selected');
}

function show(id) {
  if (busy) return;
  busy = true;
  wipe.classList.remove('go'); void wipe.offsetWidth; wipe.classList.add('go');
  setTimeout(() => {   // ganti layar saat wipe menutupi layar
    screens.forEach(s => s.classList.toggle('active', s.id === id));
    document.getElementById(id).scrollTop = 0;
  }, 250);
  setTimeout(() => { busy = false; }, 500);
}

document.addEventListener('keydown', e => {
  if (menu.classList.contains('active')) {
    if (e.key === 'ArrowDown') select(idx + 1);
    if (e.key === 'ArrowUp')   select(idx - 1);
    if (e.key === 'Enter')     show(items[idx].dataset.go);
  } else if (e.key === 'Escape' || e.key === 'Backspace') {
    show('menu');
  }
});

items.forEach((el, i) => {
  el.addEventListener('mouseenter', () => select(i));
  el.addEventListener('click', () => show(el.dataset.go));
});