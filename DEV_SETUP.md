# Setting up the Development Environment

Tips for setting up the development environment, specifically for Flutter/Dart

(For more detailed documentation on Flutter installations, CocoaPods for macOS Flutter Package integration, or setup troubleshooting, please reference this link for more information: [Flutter Docs](https://docs.flutter.dev/get-started/install))

If running on Windows, we recommend that you use VSCode on Windows for frontend development because it has the highest compatibility with Flutter and Android Studio. For backend development on Windows, developers may work with their preference of Powershell/VSCode on Windows or with a remote connection to WSL.

## Prerequisites:

- Recommended 4-8 CPU cores, 8-16 GB RAM, 1920x1080 display resolution or higher, 10+GB free storage for Windows/Android development and 56+GB free storage for MacOS/iOS development.
- Ensure native git (Windows/Mac) 2.4 or later is installed to maintain source code and Android Studio 2022.3 (Giraffe) or Xcode 15 is installed depending on platform. 

Note: Downloading Flutter may download resources from Google servers, and so by downloading or using the Flutter SDK you agree to the Google Terms of Service. `flutter` uses Google Analytics to report statistics and crash reports and can be disabled using `flutter config --no-analytics`, and the current status can be checked with `flutter config`. Dart tools may also cause usage metric reports, and can be disabled with `dart --disable-analytics` and re-enabled with `dart enable-analytics`

## IDE Setup
We highly recommend using VSCode for frontend development for the highest compatibility and ease of setup

If using VSCode 1.75 or later, it's recommended that you install the [VSCode Flutter Plugin](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter). 

## SDK Installation

### Windows 
1. Open VS Code and then open the Command Palette with <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 
2. Search for "Flutter: New Project" and select it. VS Code will prompt you to find the Flutter SDK. If the SDK hasn't been installed, click <kbd> Download SDK </kbd>
- When prompted with "Which Flutter Template?" just press <kbd>Esc</kbd> (this is for creating a new project)
3. Select a folder (we recommend `%USERPROFILE%` or `C:\dev`. Do not attempt to set up in `C:\Program Files` because you need a directory without higher privileges and one without special characters or spaces.) 
4. Click <kbd>Clone Flutter</kbd>. The output should read `Downloading the Flutter SDK. This may take a few minutes.` If the download hangs, cancel and restart it.
5. After downloading, VS Code will start initializing the Flutter SDK. The output will read `Initializing the Flutter SDK. This may take a few minutes.` After this, the process will also run `flutter doctor -v`. Ignore the result of this output because Doctor might show errors that aren't relevant to the setup process.
6. Click <kbd>Add SDK to PATH</kbd>. The output should read `The Flutter SDK was added to your PATH`.
7. Close, then reopen all PowerShell windows and restart VS Code for Flutter commands to work.

### Linux (WSL recommended because of incompatibility between WSL and Android studio)
1. Use `snapd` to install flutter with `sudo snap install flutter --classic`
2. Run `flutter sdk-path` to display the flutter SDK installation path
3. Run `flutter doctor` to verify the status of the Flutter and Dart installations
4. Run `which flutter`. If this command errors, find the binary for `flutter` by running this command (or similar commands involving `rg` or `fd`): `find / -type d -wholename "flutter/bin" 2>/dev/null` and take the output and run the command `$ echo 'export PATH="$PATH:<path_to_flutter_directory>/flutter/bin"' >> $HOME/.bashrc && source ~/.bashrc && which flutter dart`. This compound command will find the flutter/bin binary directory, add it to the user's .bashrc file, re-source it, and then run the `which` command to output the proper flutter and dart binary paths, which should come from the same `bin` directory. For instance,
```bash
$ which flutter dart
/path-to-flutter-sdk/bin/flutter
/usr/local/bin/dart
``` 
This would be incorrectly set up because the flutter and dart binaries aren't located in the same directory. The proper output should be:
```bash
$ which flutter dart
/path-to-flutter-sdk/bin/flutter
/path-to-flutter-sdk/bin/dart
```
If this output is incorrect, please update the path to use the commands from `/path-to-flutter-sdk` before commands from `/usr/local/bin` (in this case).

### MacOS

## Android Studio Setup
Android Studio is necessary on Windows and Linux for building and testing Flutter mobile code. 

### Windows
1. Install Android Studio's latest version (Hedgehog, at the time of writing this) using this link: [Android Studio Website](https://developer.android.com/studio?authuser=1)
2. Open the `.exe` file and go through the initial installation. 
3. Open Android Studio for the first time and install the following components: 
- Android SDK Platform API v34.0.0
- Android SDK Build Tools
- Android SDK Platform Tools
- Android SDK Command-line Tools
- Android Emulator.
#### If you have already installed Android Studio, follow these steps to ensure all the requisite components have been installed:
- Go to Settings -> SDK Manager (Tools -> SDK Manager if you have a project open)
- Click SDK Platforms and select Android API 34.0.0. If it hasn't been installed, click <kbd>Apply</kbd> and confirm the change when the installation modal pops up.
- Next go to SDK Tools and uncheck "Hide Obsolete Packages". Ensure that all of the requisite packages have been installed. If they haven't (Android SDK Command-line Tools is often not installed) check them and click <kbd>Apply</kbd> and install any missing packages.

#### Once all of these steps have been taken, run `flutter doctor` again and check to see what problems exist (since our app isn't made for Windows or Web, any issues regarding "Chrome - develop for the web" or "Visual Studio - develop Windows apps" aren't a concern). Check to see that all other categories have a green check mark. If any have further steps to take, such as Android toolchain licenses to agree to, run `flutter doctor --android-licenses` and accept them all. Run `flutter doctor` after any fixes to ensure the output is as expected.

## MacOS