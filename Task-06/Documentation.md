# DOCUMENTATION FOR VSCodium:

## Overview

VSCodium is an open source build of Microsoft's VS Code editor but without Microsoft-specific branding. It gives users a free version of Visual studio code.

## Functionality:

•Free Code Editor:

•VSCodium's core function is to offer the exact features of VS Code without any tracking.

•This ensures user privacy and data security, addressing concerns over data collection by Microsoft in the original VS Code editor.

•Cross Platform Support:

•VSCodium provides builds and installation options for all major platforms including Linux, Windows, and macOS.

•This ensures a wide user base can adopt the free version across different devices.

## Build VSCodium:

### Build Scripts:

A build helper script can be found at build/build.sh. Linux: /build/build.sh MacOS: ./build/build.sh Windows: powershell- Execution Policy ByPass-File \build\build.ps1 or "C:\Program Files\Git\bin\bash.exe"/build/build.sh

### Build Snap:

`for the stable version od./stores/snapcraft/stable`

`for the insider version ed/stores/snapcraft/insider`

` create the shap snapcraft-use-1xd`

`#verify the snap review-tools.snap-review-allow-classic codium.snap`

OpenVSX Marketplace explains how to configure VSCodium to use the OpenVSX extension marketplace instead of Microsoft's Visual Studio Marketplace, which is the default for VS Code.

1. Modify the `product.json` file in vscodium

2. Change the marketplace url to `https://open-vsx.org/vscnde`

3. This enables us to fetch and install extensionfrom OpenVSX.



# Open VSCodium from Terminal:

## MacOS and Windows:

Go to the command palette (View | Command Palette...) Choose Shell command: Install 'codius command in PATH. This allows you to open files or directories from the terminal itself

## Linux

When the archive `VSCodium-Linux-<arch> <version>.tar.gz` is extracted, the main entry point for VSCodium is /bin/codium.

# TroubleShoot:

## Linux:

Extensions Failing to Install:

Possible causes include network issues or corrupted cache. Solution: Clear the cache by removing the directory:

Fonts showing up as rectangles:

Try with the following command: `ra -rf /cache/fontconfig rm -rf-/snap/codium/common/.cache fc-cache -r` Remote SSH doesn't work:

Use VSCodium extension Open-Remote SSh On the server, in the `sshd` config, `AllowTopForwarding` need to be set to `yes`

## Macos

"VSCodium.app" is damaged and can't be opened. You should move it to the Bin.: The following command will remove the quarantine attribute; `xattr-r-d com.apple.quarantine/Applications/VSCodiun.app`


## Accounts authentication:

### Github:
The GitHub authentication has been patched to use personal access tokens.

Here is how to create a new personal access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

## How to build VSCodium:

### Dependencies

    node 18.15
    yarn
    jq
    git
    python3 3.11

### Flags:

The script build/build.sh provides several flags:

    -i: build the Insiders version
    -l: build with latest version of Visual Studio Code
    -o: skip the build step
    -p: generate the packages/assets/installers
    -s: do not retrieve the source code of Visual Studio Code, it won't delete the existing build

