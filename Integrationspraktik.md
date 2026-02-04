# Integrationspraktik Xmaxxing
## Praktik
Wir haben uns bei XMaxxing für die Integrationspraktik **Continuous Integration (CI)** unterstützt durch **Feature-Branches** entschieden.

## CI beschrieben durch KI
Continuous Integration (CI) bedeutet, dass Codeänderungen regelmäßig in ein zentrales Repository integriert und automatisch überprüft werden.
Bei jedem Commit oder Pull Request laufen Prozesse wie Build, Tests und Code-Qualitätschecks automatisch ab. So werden Fehler früh erkannt und sichergestellt, dass die Anwendung jederzeit in einem funktionsfähigen Zustand bleibt.

## Warum diese Praktik
XMaxxing hat eine getrennte Frontend-/Backend-Architektur, programmiert in Javascript und dessen Superset Typescript. Dies eignet sich perfekt für automatisierte Test und Build Vorgänge. Dabei ist eine Integration mit CI optimal, da man besagte Tests jedes mal vor dem Publishing ausführt und so jegliche Felher vermeidet.    


## Konkrete Ausgestaltung der Integrationspraktik
1. Branch-Strategie
    - Main als stabiler, integrierter und funktionsfähiger Branch
    - `feature/*` für die Entwicklung dedizierter Features.
    - Integrationen von feature auf main laufen mit Pull requests

2. Automatisierte Integrationsprozesse
Bei jedem *Push* oder *Pull* Request:

**Frontend**
    - Installieren von Abhängigkeiten
    - Type-Check (Typescript)
    - Linting mithilfe von ESLint
    - Unit Tests mit Jest

**Backend**
    - Installieren der Abhängigkeiten
    - Linting
    - Jest tests

3. Build Qualitätsregel
- Integration gilt nur als erfolgreich wenn:
    - Alle Tests erfolgreich sind
    - Keine Lint Fehler vorliegen
    - Merge in `main` **nur bei grünem CI-Status**

4. Werkzeuge
    - Git für Versionskontrolle
    - Github Actions
    - Jest
    - Eslint

### Warum nicht komplexer?

    - Kein sofortiger Bedarf für Continuous Deployment (CD)
    - Mobile Builds (iOS/Android) sind schwergewichtig
    - Fokus liegt auf Qualitätssicherung vor dem Merge, nicht auf automatischem Release