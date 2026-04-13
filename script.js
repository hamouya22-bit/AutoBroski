// Registrazione Service Worker per poter far scaricare/installare l'app
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registrato con successo: ', registration.scope);
      })
      .catch(err => {
        console.log('Registrazione ServiceWorker fallita: ', err);
      });
  });
}

// Gestione prompt di installazione PWA (Aggiungi a Schermata Home)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Non mostrare il prompt automaticamente
  e.preventDefault();
  // Salva l'evento per usarlo per l'installazione
  deferredPrompt = e;
  console.log('App pronta per il download/installazione!');
});

// Funzione richiamabile per forzare il prompt (es: button onclick="installaApp()")
window.installaApp = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Download/Installazione accettata dall\\'utente');
      } else {
        console.log('Download/Installazione annullata');
      }
      deferredPrompt = null;
    });
  } else {
    alert("L'app è già installata o il browser non supporta l'installazione diretta.");
  }
};
