#!/usr/bin/env bash
# exit on error
set -o errexit

SERVER_URL=https://reviewton.onrender.com CLIENT_URL=https://reviewton-li40.onrender.com node sitemap.js

yarn build