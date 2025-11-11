// rsvp.js
// IMPORTANT: Set APPS_SCRIPT_WEB_APP_URL to the web app URL you deploy from the provided Code.gs.
// Example: const APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
const APPS_SCRIPT_WEB_APP_URL = ""; // <-- PASTE YOUR DEPLOYED WEB APP URL HERE

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");
  const statusEl = document.getElementById("rsvp-status");

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    statusEl.textContent = "";
    if (!APPS_SCRIPT_WEB_APP_URL) {
      statusEl.textContent = "No se ha configurado la URL del web app. Consulta rsvp-README.md";
      statusEl.style.color = "red";
      return;
    }

    const formData = new FormData(form);
    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      attending: formData.get("attending") || "",
      guests: formData.get("guests") || "0",
      meal: formData.get("meal") || "",
      dietary: formData.get("dietary") || "",
      song: formData.get("song") || "",
      message: formData.get("message") || ""
    };

    try {
      const resp = await fetch(APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const text = await resp.text();
      statusEl.textContent = "Gracias — tu respuesta fue enviada.";
      statusEl.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("RSVP submit error:", err);
      statusEl.textContent = "Ocurrió un error al enviar. Intenta de nuevo más tarde.";
      statusEl.style.color = "red";
    }
  });
});
