# X-Maxxing Testprozedur

## 1. Anmeldung mit gültigen Zugangsdaten

| **Beschreibung** | Der Benutzer meldet sich mit korrekten Zugangsdaten am System an |
|------------------|-------------------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Benutzeranmeldung |
| **Ausgangssituation** | Benutzer ist bereits registriert |
| **Vorbereitungsschritte** | 1. Datenbank zurücksetzen<br>2. Chrome auf dem Testclient starten |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. URL im Browser aufrufen | Startseite wird angezeigt |
| 2. Login-Formular mit Benutzername und Passwort ausfüllen | Startseite nach Login wird angezeigt |

---

## 2. Fehlermeldung bei falschem Passwort

| **Beschreibung** | Ein registrierter Benutzer gibt ein falsches Passwort ein |
|------------------|-----------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Fehlerbehandlung bei Login |
| **Ausgangssituation** | Benutzerkonto existiert |
| **Vorbereitungsschritte** | 1. Datenbank zurücksetzen<br>2. Chrome auf dem Testclient starten |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. URL im Browser aufrufen | Startseite erscheint |
| 2. Login-Formular mit gültigem Benutzername, aber falschem Passwort ausfüllen | Fehlermeldung erscheint |

---

## 3. Registrierung mit bereits existierender E-Mail-Adresse

| **Beschreibung** | Benutzer versucht sich mit bereits verwendeter E-Mail-Adresse zu registrieren |
|------------------|-------------------------------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Fehlerbehandlung bei Registrierung |
| **Ausgangssituation** | Benutzer mit entsprechender E-Mail-Adresse existiert bereits |
| **Vorbereitungsschritte** | Benutzer in Datenbank mit bekannter E-Mail |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Registrierungsformular ausfüllen und abschicken | Fehlermeldung zur E-Mail-Adresse erscheint |

---

## 4. Neuer Hauptbereich wird erfolgreich erstellt

| **Beschreibung** | Benutzer erstellt einen neuen Hauptbereich |
|------------------|---------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Erstellung von Hauptbereichen |
| **Ausgangssituation** | Benutzer ist eingeloggt |
| **Vorbereitungsschritte** | Login durchführen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Hauptbereichsformular öffnen, Namen eingeben, speichern | Neuer Hauptbereich erscheint in Liste |

---

## 5. Bereich mit leerem Namen kann nicht erstellt werden

| **Beschreibung** | Benutzer versucht einen Hauptbereich ohne Namen zu speichern |
|------------------|---------------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Validierung von Eingaben |
| **Ausgangssituation** | Benutzer ist eingeloggt |
| **Vorbereitungsschritte** | Login durchführen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Formular mit leerem Namen absenden | Fehlermeldung erscheint, kein Eintrag gespeichert |

---

## 6. Bestehender Bereich wird bearbeitet (Name geändert)

| **Beschreibung** | Benutzer ändert den Namen eines Hauptbereichs |
|------------------|------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Bearbeitung von Bereichen |
| **Ausgangssituation** | Hauptbereich ist vorhanden |
| **Vorbereitungsschritte** | Hauptbereich anlegen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Bearbeitungsansicht aufrufen, Namen ändern | Neuer Name wird gespeichert und angezeigt |

---

## 7. Ziel wird mit Titel und Beschreibung erstellt

| **Beschreibung** | Benutzer erstellt ein Ziel mit Titel und Beschreibung |
|------------------|--------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Zielerstellung |
| **Ausgangssituation** | Benutzer ist eingeloggt |
| **Vorbereitungsschritte** | Hauptbereich vorhanden |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Zielformular ausfüllen und absenden | Ziel erscheint in Liste |

---

## 8. Ziel wird ohne Beschreibung gespeichert

| **Beschreibung** | Benutzer speichert ein Ziel nur mit Titel |
|------------------|-------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Optionale Beschreibungen |
| **Ausgangssituation** | Benutzer eingeloggt |
| **Vorbereitungsschritte** | Hauptbereich vorhanden |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Ziel ohne Beschreibung absenden | Ziel erscheint, Beschreibung leer |

---

## 9. Ziel mit falschem Datumsformat erzeugt Fehlermeldung

| **Beschreibung** | Eingabe eines ungültigen Datumsformats |
|------------------|------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Validierung von Eingaben |
| **Ausgangssituation** | Benutzer eingeloggt |
| **Vorbereitungsschritte** | Zielerstellungsmaske öffnen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Falsches Datum eingeben | Fehlermeldung erscheint, kein Ziel gespeichert |

---

## 10. Unterbereich wird erfolgreich hinzugefügt

| **Beschreibung** | Unterbereich wird zu einem Hauptbereich hinzugefügt |
|------------------|------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Hinzufügen von Unterbereichen |
| **Ausgangssituation** | Hauptbereich vorhanden |
| **Vorbereitungsschritte** | Login und Hauptbereich auswählen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Unterbereichsnamen eingeben und speichern | Unterbereich erscheint unter Hauptbereich |

---

## 11. Unterbereich lässt sich umbenennen

| **Beschreibung** | Der Name eines Unterbereichs wird geändert |
|------------------|----------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Bearbeiten von Unterbereichen |
| **Ausgangssituation** | Unterbereich existiert |
| **Vorbereitungsschritte** | Erstellen eines Unterbereichs |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Bearbeitungsmaske öffnen, neuen Namen eingeben | Neuer Name wird gespeichert und angezeigt |

---

## 12. Aufgabe wird einem Unterbereich zugewiesen

| **Beschreibung** | Aufgabe wird einem bestimmten Unterbereich zugeordnet |
|------------------|--------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Zuweisung von Aufgaben |
| **Ausgangssituation** | Unterbereich existiert |
| **Vorbereitungsschritte** | Unterbereich vorhanden, Aufgabenmaske öffnen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Aufgabe erstellen und Unterbereich wählen | Aufgabe erscheint unter dem Unterbereich |

---

## 13. Zielerreichung wird im Fortschritt korrekt angezeigt

| **Beschreibung** | Ein erreichtes Ziel beeinflusst die Fortschrittsanzeige |
|------------------|-----------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Fortschrittsanzeige |
| **Ausgangssituation** | Ziele vorhanden |
| **Vorbereitungsschritte** | Zielstatus auf "erreicht" setzen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Seite mit Fortschritt öffnen | Fortschrittsbalken zeigt erhöhten Fortschritt |

---

## 14. Nutzer steigt nach Erreichen von Zielen im Levelsystem auf

| **Beschreibung** | Beim Erreichen einer Zielanzahl erfolgt ein Levelaufstieg |
|------------------|-------------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Levelsystem |
| **Ausgangssituation** | Benutzer mit mehreren erreichten Zielen |
| **Vorbereitungsschritte** | Fortschritt prüfen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Ziel erreichen, Fortschritt aktualisieren | Level steigt auf |

---

## 15. Dark Mode wird korrekt aktiviert

| **Beschreibung** | Benutzer aktiviert Dark Mode |
|------------------|-------------------------------|
| **Abgedeckte Anwendungsfälle** | UI-Funktionalität |
| **Ausgangssituation** | Standardmodus aktiv |
| **Vorbereitungsschritte** | Einstellungen öffnen |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Dark Mode aktivieren | Oberfläche wechselt auf dunkles Design |

---

## 16. Sehr lange Notiz (10.000 Zeichen) wird erfolgreich gespeichert oder korrekt validiert

| **Beschreibung** | System validiert oder speichert sehr lange Texteingaben |
|------------------|-----------------------------------------------------------|
| **Abgedeckte Anwendungsfälle** | Notizfunktionalität |
| **Ausgangssituation** | Benutzer eingeloggt, Notizmaske geöffnet |
| **Vorbereitungsschritte** | Text vorbereiten |

| **Testschritte** | **Erwartetes Resultat** |
|------------------|-------------------------|
| 1. Notiz mit 10.000 Zeichen eingeben und speichern | Entweder Speicherung erfolgreich oder Validierungsfehler mit Hinweis |

---

## Allgemeine Hinweise

- Alle Tests sollten in der definierten Reihenfolge durchgeführt werden
- Bei Fehlschlägen sind Screenshots zu erstellen und Fehlerdetails zu dokumentieren
- Nach jedem Testfall ist der Systemzustand zu überprüfen
- Testdaten sollten nach jedem Testlauf zurückgesetzt werden

# X-Maxxing Testprotokoll

## Systemtest 1

**Getestete Version:** Iteration 1  
**Tester:** Ivo Baumann, Nicky Lopez, Gaetano Salonia  
**Datum, Zeit:** 21.05.2025, 15:30 – 16:15

---

## Testfall 1: Anmeldung mit gültigen Zugangsdaten

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. URL im Browser aufrufen | ✅ | Startseite wird angezeigt |
| 2. Login mit gültigen Daten | ✅ | Weiterleitung zur Dashboard-Übersicht |

---

## Testfall 2: Fehlermeldung bei falschem Passwort

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. URL im Browser aufrufen | ✅ | Startseite erscheint korrekt |
| 2. Login mit falschem Passwort | ✅ | Fehlermeldung erscheint, Login bleibt aus |

---

## Testfall 3: Registrierung mit bestehender E-Mail

**Status:** ✅ **Vollständig erfüllt**

Ganzer Testfall erfüllt. Fehlermeldung zur doppelten E-Mail erscheint korrekt. Registrierung wird verhindert.

---

## Testfall 4: Neuer Hauptbereich wird erstellt

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Hauptbereich anlegen | ✅ | Neuer Bereich wird gespeichert und angezeigt |

---

## Testfall 5: Bereich mit leerem Namen kann nicht erstellt werden

*Dieser Testfall wurde übersprungen*

---

## Testfall 6: Bereich umbenennen

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Leeres Eingabefeld speichern | ❌ | Wurde noch nicht umgesetzt |

---

## Testfall 7: Ziel mit Titel und Beschreibung

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Ziel anlegen | ✅ | Ziel erscheint in der Liste mit vollständigen Angaben |

---

## Testfall 8: Ziel ohne Beschreibung

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Nur Titel eintragen, speichern | ✅ | Ziel wird akzeptiert, Beschreibung bleibt leer |

---

## Testfall 9: Ziel mit falschem Datumsformat

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Ungültiges Datum eingeben | ❌ | Wurde noch nicht umgesetzt |

---

## Testfall 10: Unterbereich hinzufügen

**Status:** ✅ **Vollständig erfüllt**

Ganzer Testfall erfüllt. Unterbereich wird unter korrektem Hauptbereich angezeigt.

---

## Testfall 11: Unterbereich umbenennen

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. [Testschritt 10] | ✅ | |
| 2. [Testschritt 11] | ✅ | |
| 3. Namen ändern, speichern | ✅ | Änderung wird übernommen |

---

## Testfall 12: Aufgabe einem Unterbereich zuweisen

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Aufgabe zuweisen | ✅ | Aufgabe wird korrekt einsortiert |

---

## Testfall 13: Fortschrittsanzeige

**Status:** ✅ **Vollständig erfüllt**

Ganzer Testfall erfüllt. Fortschritt erhöht sich sichtbar beim Abhaken eines Ziels.

---

## Testfall 14: Levelaufstieg bei Zielerreichung

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Ziel abschließen | ❌ | Wurde noch nicht umgesetzt |

---

## Testfall 15: Dark Mode

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Modus aktivieren | ❌ | Wurde noch nicht umgesetzt |

---

## Testfall 16: Sehr lange Notiz (10.000 Zeichen)

| **Testschritt** | **Erfüllt** | **Bemerkung** |
|-----------------|-------------|---------------|
| 1. Lange Notiz speichern | ✅ | Speicherung erfolgreich, keine Performanceprobleme |

---

## Zusammenfassung der Testergebnisse

### Erfolgreich implementierte Features
- ✅ Benutzeranmeldung und -registrierung
- ✅ Hauptbereich erstellen
- ✅ Ziele mit und ohne Beschreibung erstellen
- ✅ Unterbereiche hinzufügen und umbenennen
- ✅ Aufgaben Unterbereichen zuweisen
- ✅ Fortschrittsanzeige funktional
- ✅ Verarbeitung sehr langer Texteingaben

### Noch nicht implementierte Features
- ❌ Bereichsvalidierung (leere Namen)
- ❌ Datumsvalidierung bei Zielen
- ❌ Levelsystem bei Zielerreichung
- ❌ Dark Mode Funktionalität

### Teststatistik
- **Getestete Testfälle:** 16
- **Vollständig erfüllt:** 10 (62,5%)
- **Teilweise erfüllt:** 2 (12,5%)
- **Nicht erfüllt:** 4 (25%)

---

## Fazit

Alles in allem konnten wir nicht alles umsetzen, was wir uns vorgenommen haben. Wir haben uns alles in allem überschätzt. Wir dachten, dass wir alles schaffen. Da wir aber alle die Technologien noch nicht wirklich kannten, sind wir nicht so gut vorangekommen wie erhofft.

### Erkenntnisse
- Die Kernfunktionalitäten (Anmeldung, Ziele erstellen, Bereiche verwalten) funktionieren stabil
- Erweiterte Features wie Levelsystem und Dark Mode konnten zeitlich nicht realisiert werden
- Die gewählte Technologie-Stack (React Native, Node.js, MySQL) hat sich bewährt
- Validierungen und Fehlerbehandlung benötigen noch Verbesserungen

### Empfehlungen für nächste Iteration
1. Fokus auf Implementierung der fehlenden Validierungen
2. Levelsystem als prioritäres Feature für User Experience
3. Dark Mode als "Nice-to-have" Feature
4. Verbesserung der Fehlerbehandlung und Benutzererfahrung
