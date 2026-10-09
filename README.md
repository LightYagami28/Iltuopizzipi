# Iltuopizzipi

Una pagina statica personale, senza framework né dipendenze runtime. I messaggi originali sono mantenuti; la presentazione è separata in HTML, CSS e JavaScript, con supporto per tastiera, screen reader e preferenza di movimento ridotto.

## Sviluppo e test

È richiesto Node.js 26. Non servono installazioni di pacchetti.

```sh
node --check app.js
node --test test/*.test.mjs
```

GitHub Actions esegue i controlli prima del deploy su GitHub Pages. Il deploy avviene solo dopo il superamento della validazione e non viene eseguito sulle pull request.

## SonarCloud

Il workflow SonarCloud diventa attivo quando sono configurate le variabili repository `SONAR_ORGANIZATION` e `SONAR_PROJECT_KEY` e il secret `SONAR_TOKEN`. Il job attende il Quality Gate: un gate rosso fallisce la verifica, non viene mascherato come successo.

## Sicurezza

La pagina usa una Content Security Policy restrittiva, nessuna dipendenza esterna e inserisce i messaggi tramite `textContent`. Per segnalazioni riservate consultare [SECURITY.md](SECURITY.md).
