#!/usr/bin/env bash
# exit on error
set -o errexit

SERVER_URL=https://reviewton.onrender.com CLIENT_URL=https://www.reviewton.net node sitemap.js

yarn build