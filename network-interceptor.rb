class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/13.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "659c1195976163fdb321cea31cc012bc69cbb10077a50d93aa2c0fa55538eb90"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/13.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "52d86fb8bce9cd63c2d5dab259b49a86c424dcdfc9d44792a386105cdc127a06"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/13.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "659c1195976163fdb321cea31cc012bc69cbb10077a50d93aa2c0fa55538eb90"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/13.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "43eb120daad9920a7834279d1e40fadd04433418c49eafe24f6c81a7c295bb8a"
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

