const nome_input = document.getElementById('nome');
const senha_input = document.getElementById('senha');
const button = document.getElementById('button');

button.addEventListener('click', async () => {
    const nome = nome_input.value;
    const senha = senha_input.value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha }),
    });

    const data = await response.json();
    console.log(data);
});