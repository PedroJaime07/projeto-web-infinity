document.addEventListener('DOMContentLoaded', function() {
  const divEventos = document.getElementById('eventos');
  // Substitua o src abaixo pelo que você copiou do Google Calendar!
  divEventos.innerHTML = `
    <iframe 
      src="https://calendar.google.com/calendar/embed?src=escolainfinityce%40gmail.com&ctz=America%2FFortaleza"
      style="border: 0" 
      width="800" 
      height="600" 
      frameborder="0" 
      scrolling="no">
    </iframe>
  `;
});