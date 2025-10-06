#!/bin/bash
expected_node_version="22.19.0"

nvm_install() {
  if [ -z "$XDG_CONFIG_HOME" ]; then
    export NVM_DIR="$HOME/.nvm"
  else
    export NVM_DIR="$XDG_CONFIG_HOME/nvm"
  fi

  if [ ! -d "$NVM_DIR" ]; then
    echo "NVM Installation Required"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash || {
      echo "nvm yüklenirken hata aldık"
      return 1
    }
  fi

  read -r -d '' NVM_INIT_SCRIPT << 'EOF'
if [ -z "$XDG_CONFIG_HOME" ]; then
  export NVM_DIR="$HOME/.nvm"
else
  export NVM_DIR="$XDG_CONFIG_HOME/nvm"
fi
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
EOF

  CONFIG_FILES=("$HOME/.bashrc" "$HOME/.zshrc")

  for FILE in "${CONFIG_FILES[@]}"; do
    [ -f "$FILE" ] || touch "$FILE"
    grep -q 'nvm.sh' "$FILE" || echo -e "\n$NVM_INIT_SCRIPT" >> "$FILE"
  done

  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
}


switch_expected_node_version()
{
    nvm_install

    node_version=$(node -v)
    node_version=${node_version:1}
    if [[ "$node_version" != "$expected_node_version" ]]
    then
        echo "!!!!! Wrong Node Version !!!!!"
        echo "Your Current Node Version: $node_version"
        echo "This Project Expects Node Version: $expected_node_version"
        echo "Checking Node Version Manager library For Existing Versions..."
        if nvm ls "$expected_node_version" | grep -q "$expected_node_version"; then
            echo "Version Found Switching Version"
            nvm use $expected_node_version
        else
            {
                echo "Version Not Installed. Tryig To Install..."
                nvm install $expected_node_version
                nvm use $expected_node_version
            } || {
                echo "Node version couldn't be fixed. Manual Check Required. Please Contact Your Technical Leader"
                exit 0
            }
        fi
    fi
}

switch_expected_node_version
npm install
npm run start