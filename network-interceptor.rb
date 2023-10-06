class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "87ee9e8887a20fba3dd2cced4622bf1dc3417d81ba9d3e2a2977f3b0ef4cf0c0"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "e100d09b8d727b16850b878ed9e03434232a493947f9f3d7ee34d7db777c1802"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "87ee9e8887a20fba3dd2cced4622bf1dc3417d81ba9d3e2a2977f3b0ef4cf0c0"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "d6bf57329106104fd9742b94226a68e949f4da36a507f9d3f6107ef3ad9f4ff5"
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

