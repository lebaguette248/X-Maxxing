
# X-Maxxing

**X-Maxxing** ist eine App zur Selbstoptimierung ("Maxxen"), die über ein React Native Frontend mit einem Node.js-Backend und einer MySQL-Datenbank kommuniziert. Dieses Projekt besteht aus zwei Hauptkomponenten: dem **Backend-Server**, der API und Datenbankzugriff bereitstellt, und dem **Frontend-Client**, der auf PC oder Mobilgerät verwendet werden kann.


## 📦 Repository

Clonen des Repositories:
```bash
git clone https://github.com/lebaguette248/X-Maxxing.git
````

---

## 🖥️ Backend-Setup (Host-PC)

1. **Voraussetzungen**

   * Installiere Node.js und NPM und stelle sicher, dass beide auf dem neuesten Stand sind.

2. **Backend installieren**

   ```bash
   cd x-maxxing-backend
   npm install
   ```

3. **MySQL-Datenbank einrichten**

   * Erstelle eine Datenbank mit dem Namen `xmaxxing_db`
   * Lege einen exklusiven Benutzer für diese Datenbank an

4. **Umgebungsvariablen setzen**

   * Kopiere `.env-example` zu `.env`
   * Fülle alle Variablen gemäß der *Konfigurations-Dokumentation* aus

5. **Server starten**

   ```bash
   node server.js
   ```

---

## 💻 Frontend-Client Setup (PC)

1. **Voraussetzungen**

   * Installiere Node.js und NPM und stelle sicher, dass beide auf dem neuesten Stand sind.

2. **Frontend installieren**

   ```bash
   cd X-Maxxing
   npm install
   npx install expo
   ```

3. **Umgebungsvariablen setzen**

   * Kopiere `.env-example` zu `.env`
   * Fülle die Variablen gemäß der *Konfigurations-Dokumentation* aus

4. **EXPO\_PUBLIC\_XM\_URL setzen**

   * Verwende:

     * Deine lokale IP-Adresse (z. B. über `ipconfig` auf Windows bzw. `ifconfig` auf Linux) **wenn Backend und Frontend auf demselben PC laufen**
     * Die IP des Hosting-PCs, falls Frontend und Backend auf verschiedenen Geräten laufen

5. **App starten**

   ```bash
   npx expo start
   ```

   * Öffne `http://localhost:8081` im Browser

---

## 📱 Frontend-Client Setup (Mobile)

1. **Stelle sicher, dass das PC-Setup vollständig ist**

2. **Installiere [Expo Go](https://expo.dev/client) auf dem Mobilgerät**

3. **EXPO\_PUBLIC\_XM\_URL korrekt setzen**

   * Diese muss die IP-Adresse des Backend-Host-PCs enthalten (kein `localhost`)

4. **Stelle sicher, dass sich alle Geräte im selben Netzwerk befinden**

5. **QR-Code scannen**

   * **iOS**: Kamera-App
   * **Android**: Expo Go App

---

## 🧩 Konfigurations-Dokumentation

Stelle sicher, dass du alle Variablen in der `.env` gemäß der separaten Konfigurationsdokumentation korrekt ausfüllst (z. B. DB-Zugangsdaten, EXPO\_PUBLIC\_XM\_URL etc.).

---

## 💡 Hinweise

* Nutze bei Problemen mit IP-Adressen `ipconfig` (Windows) oder `ifconfig` (Linux/Mac), um deine IPv4-Adresse zu finden.
* Die `.env`-Dateien dürfen niemals in ein öffentliches Repository hochgeladen werden!

---

## 🐱‍💻 Autor

**GitHub:** [lebaguette248](https://github.com/lebaguette248)

---

## 📜 Lizenz

Dieses Projekt steht unter keiner spezifischen Lizenz (Stand jetzt).

```

Wenn du willst, kann ich dir diese Datei auch direkt im `.md`-Format exportieren oder ein paar Shields hinzufügen (z. B. Node-Version, Plattform, Expo etc.) 😼.
```
