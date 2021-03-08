#!/bin/bash

echo "Installing Surf (http://http://surf.suckless.org/)"
sudo apt install surf

echo "Copying pidash.service to /etc/systemd/system/pidash.service"
cp pidash.service /etc/systemd/system/pidash.service
sudo systemctl daemon-reload

echo "Starting PiDash Service to run on Boot"
sudo systemctl enable pidash


DISPLAY=:0 surf -F 127.0.0.1:3000

[Unit]
Description=PiDash Service

[Service]
ExecStart=bash -c '~/pidash/start.sh'

[Install]
WantedBy=multi-user.target