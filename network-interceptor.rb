class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "a1ec34ddce4a063ac706cd2ed0d9cd6440b90403c605c0db81d60d36007a5ea3"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "6e420f00640953681d4b9e191f95ee239c9e5743167b57f344ea5a5d55a32b41"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "a1ec34ddce4a063ac706cd2ed0d9cd6440b90403c605c0db81d60d36007a5ea3"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "4f8d7b308640a57f251388172cf976cdf5c79b091e5d3f6779fc90bd6ee0a5d0"
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

