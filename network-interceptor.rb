class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "cf8097800b764a8185f24ea36ec4109f77666e386958795e89e5fa2a46914af2"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "a72f22cbe8718952bb36836e8632fc268469d538d8805a228b5a970e84b24e6d"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "cf8097800b764a8185f24ea36ec4109f77666e386958795e89e5fa2a46914af2"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "73e1195a5afe47a59d193bfb2bbfcd830ae8dd298ac9fa154fea9d4765d093eb"
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

