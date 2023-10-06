class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "03cbcd6bb661430e063d028f4eb44bb2d406e5fa137ca59af4071a75ba9911b3"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "178b32890090983140ea3655f0b8d10c3d51c5c763beb4b42a10e1d61479d574"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "03cbcd6bb661430e063d028f4eb44bb2d406e5fa137ca59af4071a75ba9911b3"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/15.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "d647f784563fa081aa2a73af0bac2b59099e1a5548974565eef9c297a648d58e"
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

