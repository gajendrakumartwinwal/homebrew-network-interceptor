class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-x64_9.0.0/network-interceptor.tar.gz"
    sha256 "623ac34e159bb657eb5c0aae3e895d78ba6f5c9abd326092c5791e8e771979d1"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-arm64_9.0.0/network-interceptor.tar.gz"
    sha256 "92a48d6e1bcd81a0aa1aade473f3f4ae9acc7e4ea07da9ec485f72525bf320b7"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-x64_9.0.0/network-interceptor.tar.gz"
    sha256 "623ac34e159bb657eb5c0aae3e895d78ba6f5c9abd326092c5791e8e771979d1"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-arm64_9.0.0/network-interceptor.tar.gz"
    sha256 "a7f5324f2430124e437de662ae5c0a07d1f5390889a74e690c30c5ab3e1a0fb8"
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

