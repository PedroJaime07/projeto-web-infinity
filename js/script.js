async function verificarLogin() {
  const logado = localStorage.getItem('logado');
  
  if (!logado) {
    // Não está logado
    window.location.href = '/login.html';
  }
}

verificarLogin();



const btn_sidebar = document.querySelector('#btn-sidebar')


btn_sidebar.addEventListener('click', () => {
    btn_sidebar.classList.toggle('open')
    document.body.classList.toggle('sidebar-aberta')
    document.querySelectorAll('#descricao').forEach(e => e.classList.toggle('open'))
})

const modal = document.querySelector('#modal-criar-evento')
const btn_criar_evento = document.querySelector('#btn-criar-evento')
const btn_fechar_modal = document.querySelector('#btn-fechar-modal')

btn_criar_evento.addEventListener('click', () => {
    modal.style.display = 'block'
})

btn_fechar_modal.addEventListener('click', () => {
    modal.style.display = 'none'
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})


const btn_excluir_evento = document.querySelector('#btn-excluir-evento')
const modal_excluir_evento = document.querySelector('#modal-excluir-evento')
const btn_fechar_modal_excluir = document.querySelector('#btn-fechar-modal-excluir')

btn_excluir_evento.addEventListener('click', () => {
    modal_excluir_evento.style.display = 'block'
})

btn_fechar_modal_excluir.addEventListener('click', () => {
    modal_excluir_evento.style.display = 'none'
})

window.addEventListener('click', (e) => {
    if (e.target === modal_excluir_evento) {
        modal_excluir_evento.style.display = 'none'
    }
})


const dark_light = document.querySelector('#dark-light')

dark_light.addEventListener('click', () => {
    dark_light.classList.toggle('ativo')

    if (dark_light.classList.contains("ativo")){
            dark_light.src = "https://icones.pro/wp-content/uploads/2021/04/symbole-du-soleil-jaune.png"
            document.body.classList.toggle('ativo')
        } else {
            dark_light.src = "https://icones.pro/wp-content/uploads/2022/08/icone-demi-lune-jaune.png"
            document.body.classList.toggle('ativo')
        }
})


const btn_sair = document.querySelector('#btn-sair')

btn_sair.addEventListener('click', () => {
    localStorage.removeItem('logado');
    localStorage.removeItem('usuario');

      window.location.href = '/login.html';
})