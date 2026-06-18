# 📊 Monitoraggio Segatrici

Dashboard desktop per il monitoraggio in tempo reale di segatrici industriali, costruita con Electron, React, Node.js + Express e altro.

---

## 🚀 Tecnologie

- Frontend: React, TailwindCSS, Lucide React, Recharts
- Desktop Application: Electron
- Backend/API: Node.js + Express
- Database: Microsoft SQL Server
- Build e distribuzione: Vite, Electron Builder

---

## 🧱 Architettura del sistema

L'app è composta da tre livelli:

### 🖥️ Frontend (React + Vite)

- Dashboard KPI
- Grafici produzione (Recharts)
- UI real-time

### ⚙️ Backend (Node.js + Express)

- API REST per accesso ai dati
- Query su SQL Server
- Aggregazione KPI

### 🗄️ Database (SQL Server)

- Tabella principale: DATALOG_TAGLI
- Contiene dati produzione segatrici

---

## ⚙️ Installazione

```
git clone https://github.com/Edoo29/monitoraggio-segatrici.git
cd monitoraggio-segatrici
npm install
npm install --prefix frontend
npm install --prefix backend
npm install --prefix electron
```

---

## 📦 Build applicazione (.exe)

```
npm run dist
```

L'output si troverà in:

```
electron/dist_electron/
```

---

## 🧑‍💻 Autore

Edoardo Zaffaroni

---

## 📌 App info

App ID: it.zaffaroni.monitoraggiosegatrici \
Nome: Monitoraggio Segatrici
