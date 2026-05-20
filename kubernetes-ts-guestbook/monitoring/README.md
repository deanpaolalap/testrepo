# Monitoring Stack – Kubernetes Guestbook (Pulumi)

## Architecture
- Prometheus Operator collects cluster + app metrics
- ServiceMonitor scrapes Guestbook services
- Grafana visualizes metrics dashboards
- Alertmanager handles alerts

## Grafana Access
kubectl get svc | findstr grafana

URL:
http://172.20.0.5

Credentials:
admin / (from Kubernetes secret)

## Prometheus Validation
1. Open /targets → all should be UP
2. Query:
   - up
   - kube_pod_info
   - http_requests_total (guestbook if exposed)

## Guestbook Monitoring
- ServiceMonitor used for scraping
- Prometheus Operator auto-discovers services labeled:
  app: guestbook
