#!/bin/bash

echo "Installing Deno Runtime (https://deno.land)"
curl -fsSL https://deno.land/x/install/install.sh | sh

echo "Installing Surf (http://http://surf.suckless.org/)"
sudo apt install surf

echo "Copying pidash.service to /etc/systemd/system/pidash.service"
cp pidash.service /etc/systemd/system/pidash.service
sudo systemctl daemon-reload

echo "Starting PiDash Service to run on Boot"
sudo systemctl start pidash