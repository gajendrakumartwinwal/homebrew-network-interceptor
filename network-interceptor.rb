class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "371124d5e1253cd591b9befb0f6df31ef99967b0824ad1eff27d1ad5560f04ff"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "64ae1c07a0ff499411d2c10de7eeab309d34824869af1da7722d6cc1dc4576ae"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "371124d5e1253cd591b9befb0f6df31ef99967b0824ad1eff27d1ad5560f04ff"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/21.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "5a51498d135e494f579d7cd25f3765c4ff02a864b32e845706ea906d5c126fdd"
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

