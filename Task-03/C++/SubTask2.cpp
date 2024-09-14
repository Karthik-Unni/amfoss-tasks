#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
    ifstream inputFile("input.txt");
    ofstream outputFile("output.txt");

    if (inputFile && outputFile) {
        string line;
        while (getline(inputFile, line)) {
            outputFile << line << endl;
        }
    }

    inputFile.close();
    outputFile.close();

    return 0;
}
