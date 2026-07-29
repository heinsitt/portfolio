## 🐳 Docker + CI/CD

This portfolio is containerized with Docker and auto-deployed via GitHub Actions.

### Tech Stack
- **Docker** — Containerization
- **Nginx** — Web server
- **GitHub Actions** — CI/CD pipeline
- **Docker Hub** — Image registry

### CI/CD Pipeline
Every push to `main` branch triggers:
1. Code checkout
2. Docker image build
3. Auto-push to Docker Hub

### Pull & Run
```bash
docker pull heinsitt/portfolio:latest
docker run -d -p 8080:80 heinsitt/portfolio:latest