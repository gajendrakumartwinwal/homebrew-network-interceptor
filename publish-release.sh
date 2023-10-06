#!/bin/bash
# Replace these variables with your own values

FILE_PREFIX="./build/tar/"  # Optional: Attach a file to the release

version_macos_x64=$FILE_PREFIX"macos-x64-network-interceptor.tar.gz"
version_macos_arm64=$FILE_PREFIX"macos-arm64-network-interceptor.tar.gz"
version_linux_x64=$FILE_PREFIX"linux-x64-network-interceptor.tar.gz"
version_linux_arm64=$FILE_PREFIX"linux-arm64-network-interceptor.tar.gz"
version=$(node -pe "require('./package.json').version")
echo $version_macos_x64
GITHUB_OWNER="gajendrakumartwinwal"
GITHUB_REPO="homebrew-tap-network-interceptor"
GITHUB_TOKEN=$1
VERSION="$version"
RELEASE_NOTES="Release notes for version"
# Create a release on GitHub
release_id=$(curl -s -X POST "https://api.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/releases" \
     -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -d "{
         \"tag_name\": \"$VERSION\",
         \"target_commitish\": \"main\",
         \"name\": \"$VERSION\",
         \"body\": \"$RELEASE_NOTES\"
     }" | jq -r .id)

if [ -n "$release_id" ]; then
    echo "Release created with ID: $release_id"
  for file_to_attach in "$version_macos_x64" "$version_macos_arm64" "$version_linux_x64" "$version_linux_arm64"; do
      # Attach a file to the release (optional)
      if [ -n "$file_to_attach" ]; then
          curl -s -X POST "https://uploads.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/releases/$release_id/assets?name=$(basename $file_to_attach)" \
              -H "Authorization: token $GITHUB_TOKEN" \
              -H "Content-Type: $(file -b --mime-type $file_to_attach)" \
              --data-binary @"$file_to_attach"
          echo "File attached to the release."
      fi
  done
else
    echo "Failed to create the release."
fi
