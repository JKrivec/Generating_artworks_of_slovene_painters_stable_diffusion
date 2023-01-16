import os
import json
from operator import itemgetter, attrgetter

def get_name_only(path):
    filename = path.split("/")[-1]
    return filename.split(".")[0]

""" folders = ["./assets/images/ivan_grohar_ai",
           "./assets/images/matej_sternen_ai",
           "./assets/images/jozef_tominc_ai"] """
folders = ["./assets/images/matej_sternen_ai",
           "./assets/images/jozef_tominc_ai"]
data = {}

for ix, folder in enumerate(folders):
    folder_name = folder.split("/")[-1]
    prompt = "-".join(folder_name.split("_")[:2])
    key = folder_name
    list = []
    for count, filename in enumerate(os.listdir(folder)):
        extension = filename.split(".")[-1]
        name = filename.split(".")[0]
        name = name.zfill(3)
        filename = name + "." + extension

        list.append({
            "src": f"{folder}/{filename}",
            "title": f"Painting in the style of <{prompt}>",
        })
    list = sorted(list, key=lambda k: get_name_only(k["src"]))
    data[key] = list

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
