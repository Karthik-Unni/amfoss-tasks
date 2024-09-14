def copy_content
  input_file = 'input.txt'
  output_file = 'output.txt'
  content = File.read(input_file)
  File.write(output_file, content)
end

copy_content
