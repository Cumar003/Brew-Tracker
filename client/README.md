# 🐳 **Docker Quick Start Guide**  

This document explains how to **run the Vite/React/TypeScript project** using Docker.  

---

## **🚀 Quick Start (For Everyone)**  

### **1️⃣ Start the Development Server**  
Run this command in your project root:  

```bash
docker compose up
```  

✅ **Done!** Your app will be available at:  
👉 [http://localhost:5173](http://localhost:5173)  

- **Hot-reloading** works (changes appear instantly).  
- **Logs** appear in the terminal.  

---

### **2️⃣ Stop the Container**  
Press `Ctrl + C` in the terminal, or run:  

```bash
docker compose down
```  

---

## **⚙️ Advanced Usage**  

### **🔧 Rebuild the Docker Image (if dependencies change)**  
```bash
docker compose up --build
```  

### **📜 View Container Logs**  
```bash
docker compose logs
```  

### **🚪 Enter the Container Shell (for debugging)**  
```bash
docker compose exec frontend sh
```  

---

## **🚨 Troubleshooting**  

### **❌ "Port already in use"**  
Change the port in `docker-compose.yml`:  
```yaml
ports:
  - "3000:5173"  # Now use http://localhost:3000
```  

### **❌ "pnpm not found"**  
Ensure your `Dockerfile` has:  
```dockerfile
RUN corepack enable && corepack prepare pnpm@latest --activate
```  

### **❌ "Changes not updating"**  
Make sure your `docker-compose.yml` has:  
```yaml
volumes:
  - .:/app  # This enables live-reload
```  

---

## **🏁 Summary of Commands**  

| Command | Description |
|---------|-------------|
| `docker compose up` | Start dev server |
| `docker compose down` | Stop containers |
| `docker compose up --build` | Rebuild & start |
| `docker compose logs` | Check logs |
| `docker compose exec frontend sh` | Enter container shell |

---

## **📌 Notes**  
- **First run** may take a few minutes (downloading dependencies).  
- **Docker Desktop must be running** (look for the 🐳 icon).  
- **For production**, use a different `docker-compose.prod.yml`.  

✅ **You’re ready to go!** 🎉