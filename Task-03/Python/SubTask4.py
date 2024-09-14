f1 = open('input3.txt', 'r')
number = f1.readline()
n = int(number)
f1.close()

f2 = open("output3.txt", 'w')

for i in range(n // 2 + 1):
    f2.write(' ' * (n // 2 - i))
    f2.write('*' * (2 * i + 1))
    f2.write('\n')

for i in range(n // 2 - 1, -1, -1):
    f2.write(' ' * (n // 2 - i))
    f2.write('*' * (2 * i + 1))
    f2.write('\n')
f2.close()
