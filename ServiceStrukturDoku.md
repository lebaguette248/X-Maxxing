**Hypothetische Service-Struktur (minimal)**

* **Terraform**

  * Provisioniert Cloud-Infrastruktur (VM, Netzwerk, Firewall)
* **Ubuntu Server**

  * Basis-Betriebssystem auf der VM
* **Docker**

  * Laufzeit für alle Services
* **Container**

  * **Node.js** → Applikations-Backend
  * **MySQL** → Datenbank
  * **Apache** → Reverse Proxy / Webserver
* **GitHub Container Registry (GHCR)**

  * Enthält die Docker Images der Services
* **GitHub Actions**

  * Baut Images bei jedem Commit
  * Pusht Images nach GHCR
  * Triggert Update/Deploy auf dem Server
* **Deployment**

  * Server zieht neue Images aus GHCR
  * Container werden neu gestartet
* **Ergebnis**

  * App läuft aktuell, reproduzierbar und automatisiert
