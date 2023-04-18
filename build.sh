#!/bin/bash

echo "Build Starting"

for f in ./public/simon/*
do
    cp "$f" ./docs/$i
done

# for f in ./public/lily/*
# do
#     cp "$f" ./docs/$i
# done

echo "Build Completed"