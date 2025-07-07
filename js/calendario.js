document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#form-criar-evento");
  const categoriaSelect = document.querySelector("#categoria");
  const subcategoriaLabel = document.querySelector("#label-subcategoria");
  const subcategoriaSelect = document.querySelector("#subcategoria");

  categoriaSelect.addEventListener("change", function() {
    if (this.value === "AULAS") {
      subcategoriaLabel.style.display = "block";
      subcategoriaSelect.style.display = "block";
      subcategoriaSelect.required = true;
    } else {
      subcategoriaLabel.style.display = "none";
      subcategoriaSelect.style.display = "none";
      subcategoriaSelect.required = false;
      subcategoriaSelect.value = "";
    }
  });

  formulario.addEventListener("submit", async (e) => {

    const titulo = document.querySelector("#summary").value;
    const descricao = document.querySelector("#description").value;
    const local = document.querySelector("#local").value;
    const categoria = document.querySelector("#categoria").value;
    const subcategoria = document.querySelector("#subcategoria").value;
    const hora_inicio = document.querySelector("#hora-start").value;
    const hora_fim = document.querySelector("#hora-end").value;

    if (categoria === "AULAS" && !subcategoria) {
      alert("Por favor, selecione o tipo de aula.");
      return;
    }

    try {
      const resposta = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: titulo,
          description: descricao,
          local: local,
          categoria: categoria,
          subcategoria: subcategoria,
          start: hora_inicio,
          end: hora_fim,
        }),
      });

      const data = await resposta.json();
      console.log("Evento criado:", data);
      
      formulario.reset();
      
      // document.querySelector('#modal-criar-evento').style.display = 'none';
      
      // const iframe = document.querySelector('#calendario iframe');
      // iframe.src = iframe.src;
      
      alert("Evento criado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert(
        "Erro ao conectar com o servidor. Verifique se o servidor está rodando."
      );
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#btn-excluir-evento').addEventListener('click', async (e) => {
    await listarEventos();
  });
});

async function listarEventos() {
  try {
    const response = await fetch("/api/events", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    const lista_eventos = document.querySelector('#lista-eventos');
    
    lista_eventos.innerHTML = '';
    
    if (data.length === 0) {
      lista_eventos.innerHTML = '<li>Nenhum evento encontrado</li>';
      return;
    }
    
    data.forEach(evento => {
      const evento_id = evento.id;
      const titulo = evento.summary || 'Sem título';
      const inicio = evento.start?.dateTime ? new Date(evento.start.dateTime).toLocaleString('pt-BR') : 'Data não definida';
      const local = evento.location || 'Local não definido';
      
      // Extrair categoria da descrição
      let categoria = 'Categoria não definida';
      let subcategoria = '';
      if (evento.description) {
        const descricao = evento.description;
        const categoriaMatch = descricao.match(/Categoria: (.+)/);
        const tipoMatch = descricao.match(/Tipo: (.+)/);
        
        if (categoriaMatch) {
          categoria = categoriaMatch[1];
        }
        if (tipoMatch) {
          subcategoria = tipoMatch[1];
        }
      }
      
      // Determinar classe de cor baseada no local
      let localClass = '';
      if (local.includes('BERLIN')) {
        localClass = 'local-berlin';
      } else if (local.includes('LONDRES')) {
        localClass = 'local-londres';
      } else if (local.includes('STUDIO')) {
        localClass = 'local-studio';
      } else if (local.includes('INFINITY SCHOOL')) {
        localClass = 'local-infinity';
      }
      
      const resultado_eventos = document.createElement('li');
      resultado_eventos.innerHTML = `
        <div class="evento-item ${localClass}">
          <div class="evento-info">
            <strong>${titulo}</strong><br>
            <small>Local: ${local}</small><br>
            <small>Categoria: ${categoria}${subcategoria ? ` - ${subcategoria}` : ''}</small><br>
            <small>Início: ${inicio}</small>
          </div>
          <button class="btn-excluir" onclick="excluirEvento('${evento_id}')">Excluir</button>
        </div>
      `;
      
      lista_eventos.appendChild(resultado_eventos);
    });
  } catch (err) {
    console.log(err);
    document.querySelector('#lista-eventos').innerHTML = '<li>Erro ao carregar eventos</li>';
  }
}

async function excluirEvento(eventoId) {
  if (!confirm('Tem certeza que deseja excluir este evento?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/events/${eventoId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      alert('Evento excluído com sucesso!');
      // Recarregar lista de eventos
      await listarEventos();
      // Recarregar iframe do calendário
      const iframe = document.querySelector('#calendario iframe');
      iframe.src = iframe.src;
    } else {
      alert('Erro ao excluir evento');
    }
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
    alert('Erro ao excluir evento');
  }
}