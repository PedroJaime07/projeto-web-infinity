const btn_sidebar = document.querySelector('#btn-sidebar')

btn_sidebar.addEventListener('click', () => {
    btn_sidebar.classList.toggle('open')
    document.querySelectorAll('#descricao').forEach(e => e.classList.toggle('open'))
})