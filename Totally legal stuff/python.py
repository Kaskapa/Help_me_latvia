from bs4 import BeautifulSoup
import requests
import regex

url = "https://kaskapa.github.io/Help_me_latvia/Totally%20legal%20stuff/"

requst = requests.get(url)

soup = BeautifulSoup(requst.text, "html.parser")

p_tags = [p.text.strip() for p in soup.find_all("p")]

text_Be_like = " ".join(p_tags)

#sentences = regex.split(r'(?<=[^\p{Lu}].[.?!]) +(?=[\p{Lu}«])', text_Be_like)
sentences = regex.split(r'(?<=[^\p{Lu}].[.?!»])(?<!,»)(?<![!]»)(?<![?]») +(?=[\p{Lu}«\p{Lu}])', text_Be_like)

temp = ""

file = open("wrong.txt", "a", encoding="utf-8")
for sentence in sentences:
    if(len(sentence) > 400):
        continue
    if(sentence.find("«") != -1 and sentence.find("»") != -1):
        print(sentence)
    elif(sentence.find("«") != -1):
        temp += sentence + " "
        continue
    elif(temp != "" and sentence.find("»") == -1):
        temp += sentence + " "
        continue
    elif(sentence.find("»") != -1 and temp != ""):
        temp += sentence
        sentence = temp
        temp = ""
    print(sentence)
    sentence = regex.sub(r'\. (?=[\p{Ll}])', ' ', sentence)
    sentence = sentence.replace(",", "")
    sentence = sentence.replace("- ", "")
    sentence = sentence.replace("— ", "")
    sentence = sentence.replace(";", "")
    sentence = sentence.replace(":", "")
    file.write(sentence + "\n")
