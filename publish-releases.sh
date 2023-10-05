#!/bin/bash

# Define the version prefixes and version
version_prefixes=("macos-x64" "macos-arm64" "linux-x64" "linux-arm64")
version=$(node -pe "require('./package.json').version")

# Loop through the version prefixes
for prefix in "${version_prefixes[@]}"; do
  # Run script2.sh with arguments
  source publish-release.sh "${prefix}" "${version}"
#  echo "${prefix}" "${version}"
done