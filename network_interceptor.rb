class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/network-interceptor/releases/download/macos-x64_2.0.0/network-interceptor.tar.gz"
    sha256 "7217f86d4f280b350edb8cd30af364d7ec8fd07fc9fd59e5d1ae388239be626a"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/network-interceptor/releases/download/macos-arm64_2.0.0/network-interceptor.tar.gz"
    sha256 "805d4f53722445458ba32e9c3e5ce3c288963c94d42ca21355ed90662de68950"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/network-interceptor/releases/download/linux-x64_2.0.0/network-interceptor.tar.gz"
    sha256 "7217f86d4f280b350edb8cd30af364d7ec8fd07fc9fd59e5d1ae388239be626a"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/network-interceptor/releases/download/linux-arm64_2.0.0/network-interceptor.tar.gz"
    sha256 "0fcb4c6f1fa8485947c63ae810feecc39472e60744d7b841288f6c82b0d221f9"
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

