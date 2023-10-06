class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/22.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "e3aba6f24f51cc6f4e79eaab25e37c4675f7cfddff04c833ee0962050d7979ef"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/22.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "dde45e524f4da2bd54fd61b8cae0943fdf3d1ada9b8c6350032b20777cb83478"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/22.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "e3aba6f24f51cc6f4e79eaab25e37c4675f7cfddff04c833ee0962050d7979ef"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/22.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "6b2424e9e496a6f7165d8c7514c4894965026e2c065877b1162de80d05e30918"
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

