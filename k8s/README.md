# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the Idea Board application.

## Prerequisites

- Kubernetes cluster (Minikube, Docker Desktop, GKE, EKS, AKS, etc.)
- `kubectl` CLI installed and configured
- Docker images built and available:
  - `ideaboard-backend:latest`
  - `ideaboard-frontend:latest`

## Architecture

The deployment consists of:

- **Namespace**: `ideaboard` - Isolated namespace for all resources
- **Backend**: 2 replicas of the Fastify API server
- **Frontend**: 2 replicas of the Next.js web server
- **Services**: ClusterIP for backend, LoadBalancer for frontend
- **ConfigMap**: Non-sensitive configuration
- **Secret**: Database credentials
- **HPA**: Horizontal Pod Autoscaler for both services (2-10 replicas)
- **Ingress**: Optional NGINX ingress for routing

## Build Docker Images

Before deploying, build the Docker images:

```bash
# Build backend image
docker build -t ideaboard-backend:latest ./backend

# Build frontend image
docker build -t ideaboard-frontend:latest ./frontend
```

For Minikube, load images into Minikube's Docker daemon:

```bash
eval $(minikube docker-env)
docker build -t ideaboard-backend:latest ./backend
docker build -t ideaboard-frontend:latest ./frontend
```

## Configuration

### 1. Update Database Secret

Edit `k8s/secret.yaml` and replace the `DATABASE_URL` with your actual Neon database connection string:

```yaml
stringData:
  DATABASE_URL: "postgresql://user:password@host/database?sslmode=require"
```

### 2. Update CORS Origin (Optional)

If deploying to a specific domain, update `k8s/configmap.yaml`:

```yaml
data:
  CORS_ORIGIN: "https://your-domain.com"
```

## Deployment Steps

### Quick Deploy (All Resources)

```bash
# Apply all manifests in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/hpa-backend.yaml
kubectl apply -f k8s/hpa-frontend.yaml

# Optional: Apply ingress if NGINX ingress controller is installed
kubectl apply -f k8s/ingress.yaml
```

### Step-by-Step Deploy

1. **Create Namespace**
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. **Create ConfigMap and Secret**
   ```bash
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secret.yaml
   ```

3. **Deploy Backend**
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/backend-service.yaml
   ```

4. **Deploy Frontend**
   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/frontend-service.yaml
   ```

5. **Enable Auto-scaling (Optional)**
   ```bash
   kubectl apply -f k8s/hpa-backend.yaml
   kubectl apply -f k8s/hpa-frontend.yaml
   ```

6. **Configure Ingress (Optional)**
   ```bash
   kubectl apply -f k8s/ingress.yaml
   ```

## Verify Deployment

```bash
# Check all resources in the namespace
kubectl get all -n ideaboard

# Check pods status
kubectl get pods -n ideaboard

# Check services
kubectl get svc -n ideaboard

# Check HPA status
kubectl get hpa -n ideaboard

# View pod logs
kubectl logs -n ideaboard -l app=backend
kubectl logs -n ideaboard -l app=frontend
```

## Access the Application

### Using LoadBalancer Service

```bash
# Get the external IP/port
kubectl get svc frontend -n ideaboard

# Access the application
# If using Minikube:
minikube service frontend -n ideaboard
```

### Using Port Forwarding

```bash
# Forward frontend port
kubectl port-forward -n ideaboard svc/frontend 3000:3000

# Forward backend port
kubectl port-forward -n ideaboard svc/backend 3001:3001

# Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001/api/health
```

### Using Ingress

If you've deployed the ingress:

1. Add to `/etc/hosts` (Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
   ```
   127.0.0.1 ideaboard.local
   ```

2. Get ingress IP:
   ```bash
   kubectl get ingress -n ideaboard
   ```

3. Access at: `http://ideaboard.local`

## Scaling

### Manual Scaling

```bash
# Scale backend
kubectl scale deployment backend -n ideaboard --replicas=3

# Scale frontend
kubectl scale deployment frontend -n ideaboard --replicas=3
```

### Auto-scaling

HPA is configured to automatically scale based on CPU (70%) and Memory (80%) usage:
- Min replicas: 2
- Max replicas: 10

Monitor HPA:
```bash
kubectl get hpa -n ideaboard -w
```

## Monitoring

### View Logs

```bash
# Stream backend logs
kubectl logs -f -n ideaboard -l app=backend

# Stream frontend logs
kubectl logs -f -n ideaboard -l app=frontend

# Logs from specific pod
kubectl logs -n ideaboard <pod-name>
```

### Describe Resources

```bash
# Describe deployment
kubectl describe deployment backend -n ideaboard
kubectl describe deployment frontend -n ideaboard

# Describe pod
kubectl describe pod <pod-name> -n ideaboard

# Describe service
kubectl describe svc backend -n ideaboard
```

### Execute Commands in Pod

```bash
# Get shell access
kubectl exec -it -n ideaboard <pod-name> -- /bin/sh

# Run specific command
kubectl exec -n ideaboard <pod-name> -- env
```

## Health Checks

The deployments include:

- **Liveness Probe**: Restarts pod if unhealthy
- **Readiness Probe**: Removes pod from service if not ready

Check probe status:
```bash
kubectl describe pod <pod-name> -n ideaboard | grep -A 10 "Liveness\|Readiness"
```

## Troubleshooting

### Pods Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n ideaboard

# Check logs
kubectl logs <pod-name> -n ideaboard

# Check if images are available
kubectl get events -n ideaboard --sort-by='.lastTimestamp'
```

### Image Pull Errors

If using local images:
```bash
# For Minikube
eval $(minikube docker-env)
docker images | grep ideaboard

# For Docker Desktop
# Images should be available in Docker Desktop
```

### Service Connection Issues

```bash
# Test backend from within cluster
kubectl run -it --rm debug --image=alpine --restart=Never -n ideaboard -- sh
# Inside pod:
apk add --no-cache curl
curl http://backend:3001/api/health
```

### Database Connection Issues

```bash
# Check if secret is correctly configured
kubectl get secret backend-secret -n ideaboard -o yaml

# View decoded secret
kubectl get secret backend-secret -n ideaboard -o jsonpath='{.data.DATABASE_URL}' | base64 -d
```

## Update Deployment

```bash
# Update image
kubectl set image deployment/backend backend=ideaboard-backend:v2 -n ideaboard

# Or edit deployment directly
kubectl edit deployment backend -n ideaboard

# Rollback if needed
kubectl rollout undo deployment/backend -n ideaboard

# Check rollout status
kubectl rollout status deployment/backend -n ideaboard
```

## Clean Up

### Delete All Resources

```bash
# Delete all resources in namespace
kubectl delete namespace ideaboard
```

### Delete Specific Resources

```bash
# Delete deployments
kubectl delete deployment backend frontend -n ideaboard

# Delete services
kubectl delete svc backend frontend -n ideaboard

# Delete HPA
kubectl delete hpa backend-hpa frontend-hpa -n ideaboard
```

## Production Considerations

1. **Resource Limits**: Adjust CPU/Memory limits based on load testing
2. **Replicas**: Start with 2-3 replicas for high availability
3. **Database**: Use managed PostgreSQL service (AWS RDS, Azure Database, GCP Cloud SQL)
4. **Secrets Management**: Use external secret managers (AWS Secrets Manager, Azure Key Vault, Vault)
5. **TLS/SSL**: Configure ingress with TLS certificates
6. **Monitoring**: Add Prometheus + Grafana for metrics
7. **Logging**: Use ELK stack or managed logging service
8. **CI/CD**: Automate deployment with GitHub Actions, GitLab CI, or ArgoCD
9. **Network Policies**: Add network policies for security
10. **Persistent Storage**: If needed, add PVC for file storage

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
