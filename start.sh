#!/usr/bin/env bash

# Carrega o NVM e define Node 18
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Iniciando Backend na porta 3333..."
(cd "$DIR/backend" && npm start) &
BACKEND_PID=$!

echo "Iniciando Frontend na porta 3000..."
(cd "$DIR/frontend" && npm start) &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT
wait
