from bs4 import BeautifulSoup
import requests
import regex

url = "https://kaskapa.github.io/Help_me_latvia/"

requst = requests.get(url)

soup = BeautifulSoup(requst.text, "html.parser")

p_tags = [p.text.strip() for p in soup.find_all("p")]

text_Be_like = " ".join(p_tags)

sentences = regex.split(r'(?<=[^\p{Lu}].[.?!]) +(?=[\p{Lu}])', text_Be_like)

file = open("wrong.txt", "a", encoding="utf-8")
for sentence in sentences:
    print(sentence)
    sentence = sentence.replace(",", "")
    sentence = sentence.replace("-", "")
    sentence = sentence.replace("— ", "")
    sentence = sentence.replace(";", "")
    sentence = sentence.replace(":", "")
    file.write(sentence + "\n")
