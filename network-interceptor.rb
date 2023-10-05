class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-x64_8.0.0/network-interceptor.tar.gz"
    sha256 "4b6805e408426182343ef3416c05cf63ea073e7fbe59df7309407f006fd82814"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/macos-arm64_8.0.0/network-interceptor.tar.gz"
    sha256 "c4b3808aba3ff6228ea6aac197faf102e9b3c393e3dba19b1670b37829d6febc"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-x64_8.0.0/network-interceptor.tar.gz"
    sha256 "4b6805e408426182343ef3416c05cf63ea073e7fbe59df7309407f006fd82814"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/linux-arm64_8.0.0/network-interceptor.tar.gz"
    sha256 "00b7423e6c13bdef71f897e3e6fad17ff98f697df719f0ceec671fdb87fc4c5a"
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

