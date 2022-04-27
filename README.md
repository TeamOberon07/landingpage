Mock e-commerce per creare ordini

Eseguire:
- npm install
- npm run start

Ora, aprire un altro terminale ed eseguire il comando:
- npm run server

(Quest fara' partire uno script che esegue il comando "npx json-server --watch ./src/e-comm_db.json --port 8000")

Gli ordini sono salvati su un file JSON (src/e-comm_db.json).
L'e-commerce sarà lanciato all'indirizzo "http://localhost:5000" mentre sarà possibile visualizzare il server all' indirizzo "http://localhost:8000/orders".