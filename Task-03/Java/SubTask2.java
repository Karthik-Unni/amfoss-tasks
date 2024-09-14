import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

public class SubTask2 {
    public static void main(String[] args) throws Exception {
        String inputFilePath = "input.txt";
        String outputFilePath = "output.txt";

        String inputString = readFromFile(inputFilePath);
        writeToFile(outputFilePath, inputString);
    }

    private static String readFromFile(String filePath) throws Exception {
        StringBuilder content = new StringBuilder();
        File inputFile = new File(filePath);
        Scanner scanner = new Scanner(inputFile);

        while (scanner.hasNextLine()) {
            content.append(scanner.nextLine());
        }
        scanner.close();

        return content.toString();
    }

    private static void writeToFile(String filePath, String content) throws Exception {
        FileWriter writer = new FileWriter(filePath);
        writer.write(content);
        writer.close();
    }
}
