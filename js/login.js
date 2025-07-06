const formulario = document.querySelector('#formulario')

formulario.addEventListener('submit', async (e) => {
   

    const email = document.querySelector('#email').value 
    const senha = document.querySelector('#senha').value

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            localStorage.setItem('logado', 'true');
            localStorage.setItem('usuario', data.usuario);
            window.location.href = '/index.html';
        } else {
            alert(data.message || 'Email ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando.');
    }
})