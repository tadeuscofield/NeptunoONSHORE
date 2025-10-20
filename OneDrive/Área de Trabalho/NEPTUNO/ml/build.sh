#!/usr/bin/env bash
# build.sh - Script de build para Render.com

set -o errexit

pip install --upgrade pip
pip install -r requirements.txt
