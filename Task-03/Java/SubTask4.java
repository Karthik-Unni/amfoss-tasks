import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

public class SubTask4 {
    public static void main(String[] args) throws Exception {
        String inputFile = "input.txt";
        String outputFile = "output.txt";

        int n = readNumber(inputFile);
        String diamond = generateDiamond(n);
        writeFile(outputFile, diamond);
    }

    private static int readNumber(String filePath) throws Exception {
        File file = new File(filePath);
        Scanner scanner = new Scanner(file);
        int number = 0;

        if (scanner.hasNextInt()) {
            number = scanner.nextInt();
        }

        scanner.close();
        return number;
    }

    private static String generateDiamond(int n) {
        StringBuilder pattern = new StringBuilder();

        for (int i = 1; i <= n; i += 2) {
            pattern.append(" ".repeat((n - i) / 2))
                   .append("*".repeat(i))
                   .append("\n");
        }

        for (int i = n - 2; i >= 1; i -= 2) {
            pattern.append(" ".repeat((n - i) / 2))
                   .append("*".repeat(i))
                   .append("\n");
        }

        return pattern.toString();
    }

    private static void writeFile(String filePath, String content) throws Exception {
        FileWriter writer = new FileWriter(filePath);
        writer.write(content);
        writer.close();
    }
}
