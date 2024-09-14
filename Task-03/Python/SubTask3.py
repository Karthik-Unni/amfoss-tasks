n=int(input("input a number"))
for i in range(n//2 + 1):
    print(' ' * (n//2 - i), end='')
    print('*' * (2 * i + 1))
for i in range(n//2 - 1, -1, -1):
    print(' ' * (n//2 - i), end='')
    print('*' * (2 * i + 1))
