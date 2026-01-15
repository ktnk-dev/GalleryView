#!/usr/bin/env python3
with open('result.json', 'r', encoding='utf-8') as file:
    with open('result.js', 'w', encoding='utf-8') as output:
        output.write("const messages = "+file.read())