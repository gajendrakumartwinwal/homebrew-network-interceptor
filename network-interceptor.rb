class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.1/macos-x64-network-interceptor.tar.gz"
    sha256 "e99530e13102834cdcfe194f3b2064a9221f0674bcd6057b3acb4e3221eefa7c"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.1/macos-arm64-network-interceptor.tar.gz"
    sha256 "66541960c15f5b87ad7900b7803d8be6f69930b7a4149bf1d89e86100ba953ac"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.1/linux-x64-network-interceptor.tar.gz"
    sha256 "e99530e13102834cdcfe194f3b2064a9221f0674bcd6057b3acb4e3221eefa7c"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/20.0.1/linux-arm64-network-interceptor.tar.gz"
    sha256 "5fc16f029314af4e7a6350362df1c9952051e46e5af0585d8b1eeb5011f343ed"
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

