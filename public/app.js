const form = document.getElementById('userForm');
const list = document.getElementById('userList');

async function loadUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  
  list.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${u.name} - ${u.email}
      <button class="btn btn-sm btn-danger">Excluir</button>
    `;
    
    li.querySelector('button').onclick = async () => {
      await fetch('/api/users/' + u.id, { method: 'DELETE' });
      loadUsers();
    };
    
    list.appendChild(li);
  });
}

form.onsubmit = async e => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  
  form.reset();
  loadUsers();
};

loadUsers();
