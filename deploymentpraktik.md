# Deployment Praktik
## Praktik
Wir haben uns für XMaxxing auf **Manuelle Release** mit **automatisiertem Backend-Deployment** entschieden.

## Begründung
- Mobile Frontends (React Native) können nicht vollständig automatisiert bis zum Enduser deployed werden (App Store / Play Store Review-Prozess).
- Das ExpressJS-Backend eignet sich sehr gut für automatisierte Deployments.
- Diese Kombination bietet Kontrolle, Stabilität und trotzdem Automatisierung, ohne unnötige Komplexität 😼

## Konkrete Umsetzung
1. Backend (ExpressJS)
- Deployment nach erfolgreichem CI-Durchlauf
- Zielumgebung: z. B. Staging oder Produktion
- Deployment ausgelöst:
    - manuell (Button im CI)
    - oder bei Merge in main

**Eigenschaften:**
- Reproduzierbar
- Kein manuelles Server-Setup
- Schnelles Rollback möglich

2. Frontend (React Native)
- Builds werden manuell erstellt
- Veröffentlichung über:
    - Apple App Store
    - Google Play Store

- Optional:
    - Automatisierte Build-Erstellung (z. B. Expo / EAS)
    - Manuelle Freigabe für Store-Upload

**Werkzeuge (Beispiel)**
- CI/CD: GitHub Actions oder GitLab CI
- Backend-Deployment: Docker, PM2 oder Cloud-Service
- Mobile Builds: Expo EAS


## Erklärt durch KI
Deployment-Taktik beschreibt, wie und wann eine Anwendung bereitgestellt wird. Sie legt fest, ob Deployments manuell oder automatisiert, bei jedem erfolgreichen Build oder nur zu Releases erfolgen und in welche Umgebung (z. B. Test, Staging, Produktion). Ziel ist es, neue Versionen kontrolliert, reproduzierbar und mit möglichst geringem Risiko auszuliefern.