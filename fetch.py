import urllib.request, re; 
data=urllib.request.urlopen('https://stock-price-prediction-sage.vercel.app/assets/index-BCIViCPN.js').read().decode()
strings = list(set(re.findall(r'"([^"]{5,40})"', data)))
with open('ref.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(strings))
