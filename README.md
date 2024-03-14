# Progettino stage

L'obiettivo dell'esercizio è creare un server di storage con API CRUD e un sistema di login utilizzando Node.js e il framework Fastify.

Il server deve essere in grado di salvare i dati in un file JSON sul file system e autenticare gli utenti attraverso un token JWT.
Gli utenti si possono registrare con email e password, quest'ultima dev'essere salvata nel json dopo essere stata hashata con l’algoritmo SHA256. In fase di login vanno confrontati gli hash della password passata dal client e l’hash salvato in modo da verificare la correttezza della password.
I dati che vogliamo salvare sono stringhe codificate in base64 alla quale viene associata una chiave, per esempio il body della chiamata POST /data sarà:
{ key: “joseph.txt”, data: “SXMgdGhpcyBhIEpvSm8gcmVmZXJlbmNlPw==” }
**spoiler: è una JoJo's reference (d'altronde sono ovunque)**
Gli errori vanno gestiti in maniera adeguata, se chiamo una API protetta senza essere loggato devo ricevere un errore 403, mentre se provo a fare una GET di una chiave che non esiste devo ricevere un 404.
Deve esistere un utente con poteri di superuser, in grado di poter accedere e modificare i dati di tutti gli altri utenti. Per gestire questa casistica ti consigliamo di utilizzare il JWT per includere dei dati aggiuntivi, come in questo caso un “ruolo” (vedi i link per la documentazione sotto).

In particolare, i passi sono :
1.	Creare un progetto Node.js
2.	Installare Fastify e jsonwebtoken e altri packages che potrebbero servirti
3.	Definire gli endpoint API utilizzando i metodi appropriati di Fastify
4.	Utilizzare il modulo "fs" di Node.js per scrivere e leggere dati dal file JSON
5.	Implementare la logica di autenticazione e generazione del token JWT nell’endpoint di login
6.	Implementare la logica di validazione del token JWT negli endpoint protetti
7.	Implementare la logica di validazione per i dati
8.	Testare il server con un client HTTP come Postman o curl

Il server deve avere i seguenti endpoint principali:
•	User
o	POST /register - Registra un nuovo utente
o	POST /login - Effettua login e riceve in risposta il JWT
o	*DELETE /delete - Elimina l’utente attualmente loggato
•	Data
o	*POST /data - Carica dei dati nuovi
o	*GET /data/:key - Ritorna i dati corrispondenti alla chiave
o	*PATCH /data/:key - Aggiorna i dati corrispondenti alla chiave
o	*DELETE /data/:key - Elimina i dati corrispondenti alla chiave	
Il simbolo * indica che l’API è protetta.

IMPORTANTE:
Questo codice richiede l’utilizzo di programmazione asincrona, il paradigma da utilizzare è quello async/await ovvero il più recente (e non .then).
Per validare il body di una chiamata puoi usare la validazione attraverso JSON schema offerta da Fastify.

Inoltre prima di iniziare ti consigliamo di dare una lettura a queste risorse molto utili:
https://eloquentjavascript.net/
https://nodejs.dev/en/learn/introduction-to-nodejs/
https://www.fastify.io/docs/latest/Guides/Getting-Started/
https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
https://blog.stoplight.io/crud-api-design
https://jwt.io/introduction
