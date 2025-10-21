// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
  body.classList.remove('dark', 'light');
  body.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// Scroll Reveal
window.addEventListener('scroll', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) el.classList.add('active');
  });
});

// Cooperative Demo Logic
const nameInput = document.getElementById('nameInput');
const amountInput = document.getElementById('amountInput');
const joinBtn = document.getElementById('joinBtn');
const memberList = document.getElementById('memberList');
const progressFill = document.getElementById('progressFill');
const equityText = document.getElementById('equityText');

const target = 50000;
let members = JSON.parse(localStorage.getItem('members')) || [];

function updateMembers() {
  if (!members.length) {
    memberList.textContent = 'No members yet.';
    progressFill.style.width = '0%';
    equityText.textContent = '0% of $50,000 target raised';
    return;
  }
  const total = members.reduce((sum, m) => sum + m.amount, 0);
  const percent = Math.min(100, (total / target) * 100).toFixed(1);
  progressFill.style.width = `${percent}%`;
  equityText.textContent = `${percent}% of $50,000 target raised`;
  memberList.innerHTML = members.map(m => `<div><strong>${m.name}</strong> — $${m.amount}</div>`).join('');
}

joinBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  if (!name || amount <= 0) return alert('Please enter valid info');
  members.push({ name, amount });
  localStorage.setItem('members', JSON.stringify(members));
  nameInput.value = '';
  amountInput.value = '';
  updateMembers();
});

updateMembers();
