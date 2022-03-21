#!/bin/sh
# 替换数据库
sed -i "s/##DATABASE##/${DATABASE}/" app/server.js
sed -i "s/##USERNAME##/${USERNAME}/" app/server.js
sed -i "s/##PASSWORD##/${PASSWORD}/" app/server.js
sed -i "s/##HOST##/${HOST}/" app/server.js
sed -i "s/##PORT##/${PORT}/" app/server.js
# 启动应用
node app/server.js
