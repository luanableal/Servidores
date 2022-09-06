const btnCadastrar = document.querySelector('#btn_cadastrar');
const tabela = document.querySelector('table');

btnCadastrar.addEventListener('click', adicionarUsuario);
window.addEventListener('load', showTable);

function adicionarUsuario() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name":"${name}","email":"${email}"}`
    };

    fetch('http://localhost:8081/usuarios', options)
        .then(response => showTable())
        .catch(err => console.log(err));
        
}

function showTable() {

    tabela.innerHTML = `
    <thead>
        <tr>
            <th>#ID</th>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>EDITAR</th>
            <th>EXCLUIR</th>
        </tr>
    </thead>`;

    const options = { method: 'GET' };
    fetch('http://localhost:8081/usuarios', options)
        .then(response => response.json())
        .then((response) => {
        //console.log(response)
            let color = 'colorGreen';

            for (let i = 0; i < response.usuarios.length; i++) {

                const usuario = response.usuarios[i];
                //console.log(usuario.id)

                let nova_tr = document.createElement('tr');
                nova_tr.classList = `${color}`;

                const tdId = document.createElement('td');
                tdId.textContent = usuario.id;
                const tdName = document.createElement('td');
                tdName.textContent = usuario.nome;
                const tdEmail = document.createElement('td');
                tdEmail.textContent = usuario.email;
                const tdEdit = document.createElement('td');
                tdEdit.innerHTML = `<td><img onclick="editarUsuario(${usuario.id})" class="edit" id="${usuario.id}" src="https://img.icons8.com/ios/50/000000/pencil--v1.png" /></td>`;
                const tdDelet = document.createElement('td');
                tdDelet.innerHTML = `<td><img onclick="deleteUsuario(${usuario.id})" class="delet" id="${usuario.id}" src="https://img.icons8.com/fluency-systems-filled/48/000000/x.png" /></td>`;

                nova_tr.appendChild(tdId);
                nova_tr.appendChild(tdName);
                nova_tr.appendChild(tdEmail);
                nova_tr.appendChild(tdEdit);
                nova_tr.appendChild(tdDelet);

                tabela.appendChild(nova_tr);

                color == 'colorGreen' ? color = 'colorGray' : color = 'colorGreen';
                
            }
        })
        .catch(err => console.error(err));
}

function deleteUsuario(id) {
    //console.log(id)

    const options = { method: 'DELETE' };

    fetch(`http://localhost:8081/usuarios/${id}`, options)
        .then(response => showTable())
        // .then((response) => {
        //     console.log(response);
        //     showTable();
            
        // })
        // .catch(err => console.error(err));
        
}

function editarUsuario(id) {
    

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name":"${name}","email":"${email}"}`
    };

    fetch(`http://localhost:8081/usuarios/${id}`, options)
        .then(response => showTable())
        .catch(err => console.error(err));
}