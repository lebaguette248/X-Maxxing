# Docker Images zu GitHub Container Registry (GHCR) pushen

Diese Anleitung zeigt Schritt für Schritt, wie du Docker Images **einfach** zur **GitHub Container Registry (ghcr.io)** pushen kannst.

---

## Voraussetzungen

- GitHub Account
- Ein GitHub Repository
- Docker installiert
- Ein **GitHub Personal Access Token (PAT)** mit folgenden Rechten:
  - `write:packages`
  - `read:packages`
  - `repo` (nur nötig bei privaten Repositories)

### Token erstellen

1. GitHub → **Settings**
2. **Developer settings**
3. **Personal access tokens**
4. Neuen Token erstellen und sicher speichern

---

## 1. Login bei der GitHub Container Registry

```bash
echo DEIN_GITHUB_TOKEN | docker login ghcr.io -u DEIN_GITHUB_USERNAME --password-stdin
```

Beispiel:
```bash
echo ghp_xxx | docker login ghcr.io -u lebaguette248 --password-stdin
```

Erfolgreich, wenn:
```
Login Succeeded
```

---

## 2. Docker Image bauen

### Variante A: Direkt mit GHCR-Tag

```bash
docker build -t ghcr.io/USERNAME/IMAGE_NAME:latest .
```

Beispiel:
```bash
docker build -t ghcr.io/lebaguette248/my-app:latest .
```

### Variante B: Erst lokal, dann taggen

```bash
docker build -t my-app .
```

---

## 3. Image taggen (falls nötig)

```bash
docker tag my-app ghcr.io/USERNAME/IMAGE_NAME:latest
```

---

## 4. Image pushen

```bash
docker push ghcr.io/USERNAME/IMAGE_NAME:latest
```

Beispiel:
```bash
docker push ghcr.io/lebaguette248/my-app:latest
```

---

## 5. Image öffentlich machen (wichtig!)

Standardmäßig sind Images **privat**.

1. GitHub → **Profil**
2. **Packages**
3. Image auswählen
4. **Settings** → **Change visibility** → **Public**

---

## 6. Image pullen

### Öffentliches Image

```bash
docker pull ghcr.io/USERNAME/IMAGE_NAME:latest
```

### Privates Image

```bash
docker login ghcr.io
docker pull ghcr.io/USERNAME/IMAGE_NAME:latest
```

---

## Häufige Fehler

- `ghcr.io/` Prefix vergessen
- Token ohne `write:packages`
- Image nicht öffentlich gemacht
- Falscher Image-Name

---

## Optional: Automatisches Pushen mit GitHub Actions

Docker Images können automatisch bei jedem Commit gebaut und gepusht werden (CI/CD).

👉 Auf Wunsch kann eine **fertige GitHub Actions Pipeline** erstellt werden.

---

**Fertig 🎉**

Damit ist dein Docker Image sauber in der GitHub Container Registry veröffentlicht.

