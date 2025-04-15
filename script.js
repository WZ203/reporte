function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      document.getElementById("location").value = position.coords.latitude + ", " + position.coords.longitude;
    }, () => alert("No se pudo obtener la ubicación."));
  } else {
    alert("Tu navegador no soporta GPS.");
  }
}

function updateDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString();
  document.getElementById("datetime").textContent = formatted;
}

function enviarReporte() {
  const ubicacion = document.getElementById("location").value;
  const delito = document.getElementById("tipoDelito").value;
  const fechaHora = document.getElementById("datetime").textContent;

  if (!ubicacion || !delito) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert("Reporte enviado:\n" + delito + "\nUbicación: " + ubicacion + "\n" + fechaHora);
}

updateDateTime();
setInterval(updateDateTime, 1000);