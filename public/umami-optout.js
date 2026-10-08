// Excluir as visitas de um dispositivo das estatísticas: abrir o site com ?umami=off
// (e ?umami=on para voltar a contar). Fica guardado no browser desse dispositivo.
// Ficheiro à parte (e não dentro do index.html) para a Content-Security-Policy não precisar de permitir scripts inline.
(function () {
  try {
    var params = new URLSearchParams(location.search);
    var value = params.get('umami');
    if (value !== 'off' && value !== 'on') return;

    if (value === 'off') localStorage.setItem('umami.disabled', '1');
    else localStorage.removeItem('umami.disabled');

    // Tira o parâmetro do endereço para não ficar no histórico nem ser partilhado
    params.delete('umami');
    var query = params.toString();
    history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);

    alert(value === 'off'
      ? 'As visitas deste dispositivo deixaram de ser contadas nas estatísticas.'
      : 'As visitas deste dispositivo voltaram a ser contadas nas estatísticas.');
  } catch {
    // armazenamento bloqueado (ex.: navegação privada): o site funciona normalmente
  }
})();
