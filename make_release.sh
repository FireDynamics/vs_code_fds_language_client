#!/bin/bash

path="vs_code_fds_language_client" 
files=($path/"README.md" $path/"package.json" $path/"fds/" $path/"client/node_modules" $path/"client/out/" $path/"server/release/")

cd ..
zip -r $path/release.zip ${files[@]}
echo "End"
cd ../path
