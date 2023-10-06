class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "1516c9121fe5094269dbf064d2b94c3ba9971f50d341dba2d7073157dc1848ee"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "4cc34fd7d293469a865faaec6a566f5860bb19b063ecbed9eb3ca8675022a91f"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "1516c9121fe5094269dbf064d2b94c3ba9971f50d341dba2d7073157dc1848ee"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "7858d82be47b418065bfdfe957c1769c55d0476e990757c080fd8ca1ded7c39d"
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

