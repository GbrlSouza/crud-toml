const API_URL = '/api/users';
const table = document.getElementById('userTable');
const form = document.getElementById('userForm');

async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  table.innerHTML = '';
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">Excluir</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  form.reset();
  loadUsers();
};

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadUsers();
}

loadUsers();
