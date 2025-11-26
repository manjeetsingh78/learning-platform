# learning-platform
This is a learning platform developed for learning.
## Backend Setup with Docker

### Prerequisites
- Docker installed

### Build & Run Backend
```bash
docker build -t learning-platform-backend .
docker run -p 5000:5000 learning-platform-backend
