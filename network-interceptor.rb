class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.3/macos-x64-network-interceptor.tar.gz"
    sha256 "9d458e38d7d3520cd89a2e327b1b2fd1604becf3606ac6342641dae068d9af33"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.3/macos-arm64-network-interceptor.tar.gz"
    sha256 "0a3094f87436746c574eb0138ea9c1ebcf899a4e29cbc3b706b4a54e5a882011"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.3/linux-x64-network-interceptor.tar.gz"
    sha256 "9d458e38d7d3520cd89a2e327b1b2fd1604becf3606ac6342641dae068d9af33"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.3/linux-arm64-network-interceptor.tar.gz"
    sha256 "f844cef8d53bb95c2cdf3c3ca3e24df503c6ef7672e42f80be3f898dac49c90d"
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

