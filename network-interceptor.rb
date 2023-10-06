class NetworkInterceptor < Formula
  desc "This is an interceptor library you can use to intercept the request using a single json file."
  homepage ""
  # Conditionally select the URL based on the architecture
  if OS.mac? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/12.0.0/macos-x64-network-interceptor.tar.gz"
    sha256 "42403be37876f05eddac2f2ee2c1c5683cb1ce59fb98811ef9950866f274c5b7"
  elsif OS.mac? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/12.0.0/macos-arm64-network-interceptor.tar.gz"
    sha256 "4e2e8a95c13901e559a137dd1e8e0ad0a2f1532a427f99fdd49ef28372cc97fe"
  elsif OS.linux? && Hardware::CPU.intel?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/12.0.0/linux-x64-network-interceptor.tar.gz"
    sha256 "42403be37876f05eddac2f2ee2c1c5683cb1ce59fb98811ef9950866f274c5b7"
  elsif OS.linux? && Hardware::CPU.arm?
    url "https://github.com/gajendrakumartwinwal/homebrew-tap-network-interceptor/releases/download/12.0.0/linux-arm64-network-interceptor.tar.gz"
    sha256 "6d893ca3c2ee9cddee0d13b6b82b5f048b306489af2a254d4d2e662e3ba51268"
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

