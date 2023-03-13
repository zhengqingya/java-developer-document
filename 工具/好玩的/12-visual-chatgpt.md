# visual-chatgpt

https://github.com/microsoft/visual-chatgpt

Visual ChatGPT：使用 Visual Foundation Models 进行交谈、绘图和编辑

### 快速开始

```shell
# 拉取
git clone https://github.com/microsoft/visual-chatgpt.git

# create a new environment
conda create -n visgpt python=3.8

# activate the new environment
conda activate visgpt

#  prepare the basic environments
pip install -r requirement.txt

# download the visual foundation models
bash download.sh

# prepare your private openAI private key
export OPENAI_API_KEY={Your_Private_Openai_Key}

# create a folder to save images
mkdir ./image

# Start Visual ChatGPT !
python visual_chatgpt.py
```
