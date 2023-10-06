class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "6e5c7efc4086b8349d329f173fae4b234e3e23b0e72d4999e873f8cb3b692053"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "3bf7422f571c64f33d4a1d8a0c6115237939d98f37df7f13a55138f7918977c1"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "6e5c7efc4086b8349d329f173fae4b234e3e23b0e72d4999e873f8cb3b692053"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "523744e707837565738dda9fe45fca4e73982c3046e1f454d1889a3e1a690932"
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

