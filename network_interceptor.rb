class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-x64_4.0.0/network-interceptor.tar.gz"
    sha256 "05a9da0376d06cfa9d007304992c2cdac6d7f0fa42815f56e8d1f216852b8c75"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-arm64_4.0.0/network-interceptor.tar.gz"
    sha256 "b7247333802aaf6895a060ffd2bf706df696c5ddaf5e337fc99c02913bbe6476"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-x64_4.0.0/network-interceptor.tar.gz"
    sha256 "05a9da0376d06cfa9d007304992c2cdac6d7f0fa42815f56e8d1f216852b8c75"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-arm64_4.0.0/network-interceptor.tar.gz"
    sha256 "d843f4061300e9274a96634d7834b6d7a812f98384aa5568dd99074968796289"
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

