# encoding=utf-8
import json
import os
import re

# BASE_DIR py文件所在绝对位置
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEBUG = False

# 返回 ./data 下的所有 .7z/zip/rar 文件名
def get_file_list():
    file_list = []
    for root, dirs, files in os.walk(os.path.join(BASE_DIR, 'data')):
        for file in files:
            if file.endswith('.7z') or file.endswith('.zip') or file.endswith('.rar'):
                file_list.append(os.path.join(root, file))
    return file_list

# 返回 ./data 下的所有 .json 文件名
def get_json_list():
    json_list = []
    for root, dirs, files in os.walk(os.path.join(BASE_DIR, 'data')):
        for file in files:
            if file.endswith('.json'):
                json_list.append(os.path.join(root, file))
    return json_list


def comp_files(files):
    not_exist = []
    for file in files:
        clean_name = os.path.splitext(os.path.basename(file))[0]
        if not os.path.exists(os.path.join(BASE_DIR, 'data', clean_name + '.json')):
            not_exist.append({"name": clean_name, "extension": os.path.splitext(file)[1]})
    return not_exist

if __name__ == '__main__':
    # 读取 json，删除无效文件
    unexist = []
    for i in get_json_list():
        try:
            with open(i, 'r', encoding="utf-8") as f:
                data = f.read()
                if DEBUG or not json.loads(data)['id']:
                    unexist.append(i)
        except:
            unexist.append(i)
    for i in unexist:
        print(f"重新生成无效文件 {i}")
        os.remove(i)
                
    ne = comp_files(get_file_list())
    for i in ne:
        # try:
            # 在 ./data 下建立 .json 文件
            # 按照正则提取 ^(\d*?)-(.*?)$ 中的 $1 $2
            id, label = re.findall(r'^(\d*?)-(.*?)$', i["name"])[0]
            content = {
                "id": id,
                "label": label,
                "links": [{ "name": "本地下载", "url": f"/data/{i['name']+i['extension']}" }]
            }
            with open(os.path.join(BASE_DIR, 'data', i["name"] + '.json'), 'w', encoding="utf-8") as f:
                f.write(json.dumps(content, ensure_ascii=False, indent=4))

    indexcontent = {
        "list": []
    }
    for i, e in enumerate(get_json_list()):
        # encoding to utf-8
        # clabel = ""
        try:
            with open(e, 'r', encoding="utf-8") as f:
                data = f.read()
                clabel = json.loads(data)['label'] if json.loads(data)['label'] else ""
        except:
            clabel = ""
        name = os.path.splitext(os.path.basename(e))[0]
        id, label = re.findall(r'^(\d*?)-(.*?)$', name)[0]
        indexcontent['list'].append({
            "id": id,
            "label": clabel if clabel else label,
            'config': f"/data/{name}.json"
        })

    with open(os.path.join(BASE_DIR, 'data', 'index.json'), 'w', encoding="utf-8") as f:
        f.write(json.dumps(indexcontent, ensure_ascii=False, indent=4))