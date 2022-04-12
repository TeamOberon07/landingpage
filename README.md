"Baseline" landing page

Eseguire:
- npm install
- npm run start
Ora, aprire un altro terminale ed eseguire il comando:
- npx json-server --watch ./src/e-comm_db.json --port 8000

Gli ordini sono salvati su un file JSON (src/e-comm_db.json), per cambiare l'ordine visualizzato basta cambiare l'id dell'ordine sull'url con l'id di un ordine esistente.
Inizialmente si viene reindirizzati all'ordine con id=1 (solo per testing, DA RIMUOVERE).

Il component ECommerce e' presente soltanto per effettuare test, e andra' rimosso dai componenti della landing page.
(Attenzione a non aggiungere ordini con id gia' presente)