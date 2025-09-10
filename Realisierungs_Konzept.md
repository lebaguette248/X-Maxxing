# Realisierungs Konzept

## Inhaltsverzeichnis

1. [Zusammenfassung](#1-zusammenfassung)
2. [Systemanforderungen](#2-systemanforderungen)
   - 2.1 [Anforderungen an die Funktionalität](#21-anforderungen-an-die-funktionalität)
   - 2.2 [Anforderungen an die Informationssicherheit und den Datenschutz](#22-anforderungen-an-die-informationssicherheit-und-den-datenschutz)
3. [Systemarchitektur](#3-systemarchitektur)
   - 3.1 [Systemübersicht](#31-systemübersicht)
   - 3.2 [Gliederung der Lösung](#32-gliederung-der-lösung)
   - 3.3 [Technische Schnittstellen](#33-technische-schnittstellen)
     - 3.3.1 [API-Schnittstelle](#331-api-schnittstelle)
   - 3.4 [Benutzerschnittstelle](#34-benutzerschnittstelle)
4. [Testkonzept - (Testen anhand von User Stories)](#4-testkonzept---testen-anhand-von-user-stories)

### Abbildungsverzeichnis

- **Seite 6:** Fachliche Entitätstypen
- **Seite 8:** Systemübersicht
- **Seite 9:** Gliederung der Lösung
- **Seite 10:** Benutzerschnittstelle

## 1. Zusammenfassung

Der Konzeptbericht im HERMES-Vorgehensmodell dient als wichtige Grundlage für die Umsetzung eines Projekts. Er dokumentiert die fachlichen und technischen Anforderungen und stellt sicher, dass alle Beteiligten ein gemeinsames Verständnis über das Projekt haben. Zudem hilft er, potenzielle Risiken frühzeitig zu erkennen und zu minimieren.

Inhaltlich umfasst der Konzeptbericht unter anderem die Projektziele, Rahmenbedingungen, Systemarchitektur sowie Aspekte der Informationssicherheit und des Datenschutzes. Er dient als Entscheidungsgrundlage für die technische Umsetzung und unterstützt eine strukturierte Planung. Durch diese klare Dokumentation können Missverständnisse vermieden und eine effiziente Projektsteuerung gewährleistet werden.

## 2. Systemanforderungen

### 2.1 Anforderungen an die Funktionalität

| Anforderung / Tätigkeit | Story Points |
|------------------------|---------------|
| **Hohe Priorität (Must-have für Basisfunktionalität)** | |
| **User Story:** Als neuer Nutzer kann ich mich registrieren, um die App nutzen zu können.<br>**Akzeptanzkriterium:** Ich kann meine E-Mail-Adresse eingeben, ein Passwort wählen und mein Konto erstellen | **5** |
| **User Story:** Als Nutzer möchte ich Hauptbereiche wie Fitness, Schule oder Business erstellen und verwalten, um meine Organisation zu verbessern.<br>**Akzeptanzkriterium:** Ich kann einen Hauptbereich namens "Fitness" erstellen, ihn in "Training" umbenennen und bei Bedarf wieder löschen. | **3** |
| **User Story:** Als Nutzer möchte ich für jeden Hauptbereich spezifische Unterbereiche erstellen, um meine Ziele gezielter verfolgen zu können.<br>**Akzeptanzkriterium:** Ich kann für den Hauptbereich "Fitness" den Unterbereich "Kraft" erstellen, umbenennen und entfernen. | **3** |
| **User Story:** Als Nutzer möchte ich Aufgaben und Ziele für jeden Unterbereich definieren, um meine Fortschritte aktiv zu gestalten.<br>**Akzeptanzkriterium:** Ich kann im Unterbereich "Kraft" die Aufgabe "Dreimal pro Woche Bankdrücken" festlegen. | **5** |
| **Mittlere Priorität (Wichtige Funktionen für Nutzererfahrung)** | |
| **User Story:** Als Nutzer möchte ich langfristige Ziele festlegen, um meine persönliche Entwicklung zu planen.<br>**Akzeptanzkriterium:** Ich kann das Ziel "10 km in unter 50 Minuten laufen" mit einer Deadline von sechs Monaten setzen. | **5** |
| **User Story:** Als Nutzer möchte ich Erinnerungen für meine Aufgaben erhalten, damit ich sie nicht vergesse.<br>**Akzeptanzkriterium:** Ich erhalte Erinnerungen für meine Aufgabe "Joggen gehen". | **5** |
| **User Story:** Als Nutzer kann ich Notizen hinzufügen, um wichtige Informationen zu speichern.<br>**Akzeptanzkriterium:** Ich kann eine Notiz mit einem Titel und Text erstellen und speichern. | **3** |
| **User Story:** Als Nutzer möchte ich Statistiken über meine Fortschritte einsehen, um meine Leistung zu analysieren.<br>**Akzeptanzkriterium:** Ich kann mir eine Wochenstatistik für "Fitness" anzeigen lassen und die erledigten Aufgaben als Diagramm betrachten. | **8** |
| **Niedrige Priorität (Erweiterte Features, Nice-to-have)** | |
| **User Story:** Als Nutzer möchte ich meinen allgemeinen Fortschritt in allen Bereichen auf einen Blick erfassen.<br>**Akzeptanzkriterium:** Eine Grafik zeigt an, dass ich insgesamt 60% meines globalen Fortschritts erreicht habe. | **5** |
| **User Story:** Als Nutzer möchte ich meinen Fortschritt in Form eines Levelsystems sehen, um meine Entwicklung nachvollziehen zu können.<br>**Akzeptanzkriterium:** Wenn ich in einem Ziel unter der Hauptgruppe «Fitness» 100% Fortschritt erreiche, steige ich von Level 1 auf Level 2 auf. | **8** |
| **User Story:** Als Nutzer möchte ich zwischen hellem und dunklem Modus wechseln, um meine Nutzungserfahrung anzupassen.<br>**Akzeptanzkriterium:** Ich kann in den Einstellungen den "Dark Mode" aktivieren, wodurch sich das Farbschema ändert. | **3** |

### 2.2 Anforderungen an die Informationssicherheit und den Datenschutz

#### Datenschutzanforderungen

- **Datensparsamkeit:** Es werden nur die für die Nutzung der App notwendigen personenbezogenen Daten gespeichert.
- **Zweckbindung:** Nutzerdaten dürfen nur für die in der App vorgesehenen Zwecke verwendet werden.
- **Löschung von Daten:** Nutzer können ihr Konto und alle damit verbundenen Daten jederzeit löschen.
- **Zugriffsrechte:** Sensible Daten (z. B. Fortschritte, Notizen) sind nur für den jeweiligen Nutzer zugänglich.
- **Anonymisierung:** Statistische Auswertungen erfolgen ohne direkte Rückführbarkeit auf einzelne Nutzer.

#### Sicherheitsanforderungen

- **Verschlüsselte Speicherung:** Alle personenbezogenen Daten werden verschlüsselt gespeichert.
- **Verschlüsselte Übertragung:** Die Kommunikation zwischen Client und Server erfolgt über TLS 1.2 oder höher.
- **Sichere Authentifizierung:** Nutzerkonten müssen durch eine starke Passwortpolicy geschützt sein (z. B. Mindestlänge, Sonderzeichen).
- **Sitzungsverwaltung:** Automatische Abmeldung nach einer bestimmten Zeit der Inaktivität.

#### Schutz vor Datenverlust und -veränderung

- **Regelmässige Backups:** Automatische tägliche Backups der Nutzerdaten mit sicherer Speicherung.
- **Versionierung von Notizen:** Änderungen an Notizen werden gespeichert, sodass frühere Versionen wiederhergestellt werden können.

### Fachliche Entitätstypen

![Fachliche Entitätstypen](image3.png)

## 3. Systemarchitektur

### Modulbeschreibung

#### Frontend (React Native Expo)

- Zuständig für die Benutzeroberfläche
- Kommuniziert mit der Backend API über HTTP
- Unterstützt Light-/Dark-Mode
- Stellt Diagramme und Fortschrittsvisualisierungen dar

#### Backend API (Spring Boot)

- Verwaltet Geschäftslogik und Benutzerverwaltung
- Bietet REST-Endpoints für das Frontend
- Kommuniziert mit der MySQL-Datenbank
- Handhabt Authentifizierung und Autorisierung

#### Datenbank (MYSQL SQLite)

- Speichert Benutzer, Ziele, Aufgaben und Fortschritte
- Enthält Tabellen für Transaktionen (Subscription-Zahlungen)

#### Zahlungsmethoden (PayPal, Stripe o.ä.)

- Handhabt In-App-Käufe und Subscription-Zahlungen
- Kommuniziert über eine sichere API mit dem Backend

#### Gemini AI API Calls

- Dient zur Unterstützung der Nutzer beim Erstellen von Zielen
- Wird vom Backend angesteuert

### 3.1 Systemübersicht

![Systemübersicht](image4.png)

### 3.2 Gliederung der Lösung

![Gliederung der Lösung](image5.png)

### 3.3 Technische Schnittstellen

#### 3.3.1 API-Schnittstelle

Wir werden eine Schnittstelle implementieren, welche mit dem User bereitgestellten Gemini Api Key beliebige Querys schicken kann oder vordefinierte Querys wählen kann wie zb. "Fasse meinen Fortschritt zusammen". Es wird per API-Aufruf eine Anfrage an den Gemini-Dienst gesendet. Dieser Aufruf kann zb. JSON Formatierte Informationen zum User Fortschritt haben.

Die Antwort des Dienstes wird anschließend verarbeitet und dem Nutzer in einer strukturierten Form präsentiert.

Zusätzlich wird darauf geachtet, dass Sicherheitsaspekte wie die geschützte Speicherung des API-Keys und die Begrenzung der API-Anfragen berücksichtigt werden, um eine sichere und stabile Nutzung der Schnittstelle zu gewährleisten.

### 3.4 Benutzerschnittstelle

![Benutzerschnittstelle](image6.png)

## 4. Testkonzept - (Testen anhand von User Stories)

| Abgedeckte User Stories | Beschreibung | Testfallbeschreibung |
|------------------------|--------------|---------------------|
| 1. Als Nutzer möchte ich Hauptbereiche wie Fitness, Schule oder Business erstellen und verwalten, um meine Organisation zu verbessern. | Testen der Funktionalität zum Erstellen, Umbenennen und Löschen von Hauptbereichen | Erstellen eines Hauptbereichs "Fitness", Umbenennen in "Training", Löschen des Bereichs |
| 2. Als Nutzer möchte ich für jeden Hauptbereich spezifische Unterbereiche erstellen, um meine Ziele gezielter verfolgen zu können. | Testen der Funktionalität zum Erstellen, Umbenennen und Löschen von Unterbereichen | Erstellen eines Unterbereichs "Kraft" für den Hauptbereich "Fitness", Umbenennen und Löschen |
| 3. Als Nutzer möchte ich Aufgaben und Ziele für jeden Unterbereich definieren, um meine Fortschritte aktiv zu gestalten. | Testen der Funktionalität zum Erstellen und Festlegen von Aufgaben für Unterbereiche | Erstellen der Aufgabe "Dreimal pro Woche Bankdrücken" im Unterbereich "Kraft" |
| 4. Als Nutzer möchte ich meinen Fortschritt in Form eines Levelsystems sehen, um meine Entwicklung nachvollziehen zu können. | Testen der Funktionalität des Levelsystems bei Erreichen von 100% Fortschritt | Erreichen von 100% in einem Ziel unter "Fitness" und Überprüfung des Levelaufstiegs von Level 1 auf Level 2 |
| 5. Als Nutzer möchte ich Statistiken über meine Fortschritte einsehen, um meine Leistung zu analysieren. | Testen der Anzeige von Fortschrittsstatistiken | Anzeige einer Wochenstatistik für den Bereich "Fitness" und Überprüfung der Darstellung der erledigten Aufgaben als Diagramm |
| 6. Als Nutzer möchte ich meinen allgemeinen Fortschritt in allen Bereichen auf einen Blick erfassen. | Testen der Gesamtfortschrittsanzeige | Anzeige einer Grafik, die 60% globalen Fortschritt zeigt, und Überprüfung der Korrektheit der Anzeige |
| 7. Als Nutzer möchte ich Erinnerungen für meine Aufgaben erhalten, damit ich sie nicht vergesse. | Testen der Erinnerungserstellung und -benachrichtigung | Erstellen einer Erinnerung für die Aufgabe "Joggen gehen" und Testen der Benachrichtigung |
| 8. Als Nutzer möchte ich zwischen hellem und dunklem Modus wechseln, um meine Nutzungserfahrung anzupassen. | Testen der Wechselmöglichkeit zwischen hellem und dunklem Modus | Wechseln zwischen hell und dunkel im Einstellungsmenü und Überprüfung der Änderung des Farbschemas |
| 9. Als Nutzer kann ich Notizen hinzufügen, um wichtige Informationen zu speichern. | Testen der Funktionalität zum Erstellen und Speichern von Notizen | Erstellen einer Notiz mit Titel und Text und Überprüfung der korrekten Speicherung und Anzeige der Notiz |
| 10. Als neuer Nutzer kann ich mich registrieren, um die App nutzen zu können. | Testen der Registrierung und Anmeldung eines neuen Nutzers | Eingabe der E-Mail-Adresse und Passwort, Erstellen eines neuen Kontos und Überprüfung der erfolgreichen Anmeldung |
| 11. Als Nutzer möchte ich langfristige Ziele festlegen, um meine persönliche Entwicklung zu planen. | Testen der Erstellung und Verwaltung langfristiger Ziele | Erstellen des Ziels "10 km in unter 50 Minuten laufen" mit einer Deadline von sechs Monaten und Überprüfung der korrekten Zieldefinition |