if(localStorage.getItem('id') === null) {
    window.location.href = './login.html';
}

const delete_button = document.getElementById('delete');

delete_button.addEventListener('click', async () => {
    const senha = prompt('Digite sua senha para confirmar a exclusão da conta');

    const response = await fetch('http://localhost:3000/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: localStorage.getItem('id'),
            senha: senha,
        }),
    });

    const data = await response.json();
    console.log(data);

    if(data.ok) {
        localStorage.removeItem('id');
        window.location.href = './login.html';
    }
});