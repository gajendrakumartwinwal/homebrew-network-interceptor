class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.2/macos-x64-network-interceptor.tar.gz"
    sha256 "cf730d82c66d09f2e86c7bd33c4957269104be6469d2a2536e0fc1c5467bb089"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.2/macos-arm64-network-interceptor.tar.gz"
    sha256 "df98ef94dfb30233f84fc9aee456a9f9598f37552fc313d10aa1938fed20710c"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.2/linux-x64-network-interceptor.tar.gz"
    sha256 "cf730d82c66d09f2e86c7bd33c4957269104be6469d2a2536e0fc1c5467bb089"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.2/linux-arm64-network-interceptor.tar.gz"
    sha256 "bab457f5b6b27f0cda28215e754cbb8e3c225ccef471ec419feeada28aadd847"
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

