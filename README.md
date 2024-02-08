# FileManager CLI Application

## Overview

This FileManager CLI application is built using 20.11.0 version of Node.js.

## Getting Started

Before using the application, make sure to read this:

- To start the project, use: `npm run start -- --username=your_username`. Replace `your_username` with yours. If the nickname isn't provided, default nickname "User" is set.
- To exit the application, use `ctrl+c` or send the `.exit` command.
- **Wrap paths with quotes for directories and files with white spaces.**
- **Compress / decompress path_to_file path_to_directory (where the compressed / decompressed file will be stored)**
- You might need to run code as Administrator so that you can use file-manager in the root of the disk. For example, using add, rm, mv, etc. in C:\\ .

## Available Commands

- **up**: Go up from the current directory. (Doesn't change working directory if you are in the root folder.)
- **cd path_to_directory**: Go to a dedicated folder from the current directory. (Path can be relative or absolute.)
- **ls**: Print a list of all files and folders in the current directory.
- **cat path_to_file**: Read a file and print its content in the console.
- **add new_filename**: Create an empty file in the current working directory.
- **rn path_to_file new_filename**: Rename a file.
- **cp path_to_file path_to_new_directory**: Copy a file.
- **mv path_to_file path_to_new_directory**: Move a file.
- **rm path_to_file**: Remove a file.
- **os --EOL**: Get the default system End-Of-Line and print it to the console.
- **os --cpus**: Get host machine CPU information (overall amount of CPUs, plus model and clock rate in GHz for each) and print it to the console.
- **os --homedir**: Get the home directory and print it to the console.
- **os --username**: Get the current system username (not to be confused with the application's username) and print it to the console.
- **os --architecture**: Get the CPU architecture for which Node.js binary has compiled and print it to the console.
- **hash path_to_file**: Calculate the hash for a file and print it to the console.
- **compress path_to_file path_to_destination**: Compress a file using the Brotli algorithm.
- **decompress path_to_file path_to_destination**: Decompress a file using the Brotli algorithm.
