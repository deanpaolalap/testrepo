import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const provider = new k8s.Provider("k8s", {
    kubeconfig: process.env.KUBECONFIG!,
});

// Stable monitoring stack
const monitoring = new k8s.helm.v3.Release("monitoring", {
    chart: "kube-prometheus-stack",
    repositoryOpts: {
        repo: "https://prometheus-community.github.io/helm-charts",
    },

    values: {
        fullnameOverride: "monitoring",

        grafana: {
            service: {
                type: "LoadBalancer",
            },
            adminPassword: "admin123",
        },

        prometheus: {
            service: {
                type: "ClusterIP",
            },
        },
    },
}, { provider });

export const grafanaPassword = "admin123";
