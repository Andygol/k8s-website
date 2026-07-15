---
title: KubeProxyNFTablesLocalhostNodePorts
content_type: feature_gate
build:
  list: never
  render: false

stages:
  - stage: alpha
    defaultValue: false
    fromVersion: "1.37"

---
Enables localhost NodePort Service proxying with the nftables mode of
kube-proxy.
