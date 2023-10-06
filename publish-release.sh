#!/bin/bash
# Replace these variables with your own values
GITHUB_OWNER="gajendrakumartwinwal"
GITHUB_REPO="homebrew-tap-network-interceptor"
GITHUB_TOKEN="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"
VERSION="$1_$2"
RELEASE_NOTES="Release notes for $2"
FILE_TO_ATTACH="./build/$1/network-interceptor.tar.gz"  # Optional: Attach a file to the release
echo $FILE_TO_ATTACH
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

    # Attach a file to the release (optional)
    if [ -n "$FILE_TO_ATTACH" ]; then
        curl -s -X POST "https://uploads.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/releases/$release_id/assets?name=$(basename $FILE_TO_ATTACH)" \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Content-Type: $(file -b --mime-type $FILE_TO_ATTACH)" \
            --data-binary @"$FILE_TO_ATTACH"
        echo "File attached to the release."
    fi
else
    echo "Failed to create the release."
fi
