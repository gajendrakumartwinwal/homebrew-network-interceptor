class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "d1ef7c02b375dbec9cbe0803e4046b3f80e922714763d44295c346d3a7dc992c"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "3402c7c3d6144c3d7f777d118b960938415623bb363f4e0754e7db362e5161a0"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "d1ef7c02b375dbec9cbe0803e4046b3f80e922714763d44295c346d3a7dc992c"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "f55d12561aefc97fafd447f74a3d93f016ff2977d76d3b3b8a4a8aff6ba3f369"
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

