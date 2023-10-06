class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "3739dbfc4dcc804c44a03bd3f787a13d4dfb01c9a4620d3a9a1d8198f3b5d4d7"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "8764e229a61ba9a5ac862933448e24af09785605f80ca2da77490730f607fb97"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "3739dbfc4dcc804c44a03bd3f787a13d4dfb01c9a4620d3a9a1d8198f3b5d4d7"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "8d8fce21ef9b98239085fc7725a797cb308136f616036fa8305f54de8ac0d880"
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

