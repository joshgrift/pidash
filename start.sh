git pull

nohup deno run --allow-net --allow-read mod.ts > output.log & sleep 5

DISPLAY=:0 surf -F 127.0.0.1:3000