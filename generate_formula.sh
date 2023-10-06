#!/bin/sh
current_version=$(node -pe "require('./package.json').version")

# Path to the network-interceptor.tar.gz file
linux_arm64_tarball_path="build/tar/linux-arm64-network-interceptor.tar.gz"
linux_x64_tarball_path="build/tar/linux-x64-network-interceptor.tar.gz"
macos_arm64_tarball_path="build/tar/macos-arm64-network-interceptor.tar.gz"
macos_x64_tarball_path="build/tar/linux-x64-network-interceptor.tar.gz"
# Generate SHA256 checksum using OpenSSL
linux_arm64_sha256_checksum=$(openssl sha256 $linux_arm64_tarball_path | awk '{print $2}')
linux_x64_sha256_checksum=$(openssl sha256 $linux_x64_tarball_path | awk '{print $2}')
macos_arm64_sha256_checksum=$(openssl sha256 $macos_arm64_tarball_path  | awk '{print $2}')
macos_x64_sha256_checksum=$(openssl sha256 $macos_x64_tarball_path | awk '{print $2}')

#echo "GAJENDRA $linux_arm64_sha256_checksum"

# Define the template with placeholders
template='class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/'"$current_version"'/macos-x64-network-interceptor.tar.gz"
    sha256 "'"$macos_x64_sha256_checksum"'"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/'"$current_version"'/macos-arm64-network-interceptor.tar.gz"
    sha256 "'"$macos_arm64_sha256_checksum"'"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/'"$current_version"'/linux-x64-network-interceptor.tar.gz"
    sha256 "'"$linux_x64_sha256_checksum"'"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/'"$current_version"'/linux-arm64-network-interceptor.tar.gz"
    sha256 "'"$linux_arm64_sha256_checksum"'"
  else
    # Code for unsupported platforms or architectures
  end
  license "MIT"

  # depends_on "cmake" => :build
  def caveats
    <<~EOS
    ############################################################
    #####################internet-interceptor###################
    ############################################################
      Thank you for installing internet-interceptor!

      To get started, you need to configure the settings in:
      # Seting up mocking file using below command
      export NETWORK_INTERCEPTOR_MAPPING=<json_file_path_name>.json

      # Optionally you can enable loggine using below
      export NETWORK_INTERCEPTOR_LOGS=info or info,error or error
      Note default value is: error
    ############################################################
    #####################internet-interceptor###################
    ############################################################
    EOS
  end

  def install
    bin.install "network-interceptor"
  end

  test do
    system "#{bin}/network-interceptor"
  end
end
'

# Save the template as a .rb file
echo "$template" > network-interceptor.rb

echo "Generated network-interceptor.rb"
