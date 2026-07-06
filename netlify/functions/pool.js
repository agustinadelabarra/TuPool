const SUPABASE_URL = 'https://zvvcodeqfscqvunogppg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dmNvZGVxZnNjcXZ1bm9ncHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTgxMTksImV4cCI6MjA5NjEzNDExOX0.CrmSFILnBGoLcpzMW9QeAI_QUqbxwRWB-CTdB4Au11Y';

exports.handler = async (event) => {
  const token = event.path.replace('/pool/', '').replace('/pool', '');

  let titulo = 'CPool';

  if (token) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/evento_eventos?link_token=eq.${token}&select=nombre`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (data?.length && data[0].nombre) {
        titulo = `CPool — ${data[0].nombre}`;
      }
    } catch (e) {
      // Si falla, usamos el título genérico
    }
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo}</title>
  <meta property="og:title" content="${titulo}">
  <meta property="og:description" content="Comunidad en movimiento">
  <meta property="og:image" content="https://vertexsur.com/og-image.png">
  <meta property="og:image:width" content="200">
  <meta property="og:image:height" content="200">
  <meta property="og:image:type" content="image/png">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta http-equiv="refresh" content="0; url=/cpool.html?token=${token}">
</head>
<body>
  <p>Redirigiendo...</p>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: html,
  };
};
