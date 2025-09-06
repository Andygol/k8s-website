---
title: WinDSR
content_type: feature_gate
_build:
  list: never
  render: false

stages:
  - stage: alpha
    defaultValue: false
    fromVersion: "1.14"
    toVersion: "1.32"
  - stage: beta
    defaultValue: true
    fromVersion: "1.33"
    toVersion: "1.33"
  - stage: stable
    defaultValue: true
    fromVersion: "1.34"
    locked: true
---

Дозволяє `kube-proxy` створювати DSR-балансувальники навантаження для Windows.
