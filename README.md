# INTRODUCTION
> This is a Vanilla JS project that uses:
>   - "Lit Element"
>   - "Vaadin Router"
>   - "Redux"

> Additionally, it includes these third-party components:
>   - "Flatpickr"
>   - "Imask"

> Node version for local installation: v22.19.0 (other versions are untested)

# INSTALLATION
> Requires Node v22.19.0. If you don't have it yet, see the Node Version Manager instructions below.

* Step 1: Install project dependencies => `npm install` Run this inside the project folder.
* Step 2: Start the HTTP server => `npm run dev` (Alternatively, you can use a simple Node.js app to serve the project folder and handle URL rewrites.)
* Step 3: Access the local app: Vite will display the local URL in the terminal. Open it in your browser using Command + Click or by copying it manually.

# Node Version Manager Installation

* For macOS with M1 processor: `arch -x86_64 zsh`;
* Install NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`;
* For macOS with M1 processor (ARM): `arch -arm64 zsh`;
* Configure Zsh if you prefer: 
* Open the .zshrc file: `sudo nano ~/.zshrc`
* Add the following lines:
    
`export NVM_DIR="$HOME/.nvm"`

`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`

`[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion`
* Apply changes: `source ~/.zshrc`
* Restart your terminal if needed.
* Install and use the project Node version: `nvm install 22.19.0`
* Check your Node version with: `node -v`
* Switch if its not correct `nvm use 22.19.0`

# Project Structure

* Entry point: `src/app.js`
* Language files: `src/language`
* Global/shared styles: `src/styles`
* State management `src/store`
* Components `src/components` (Components may have parent-child relationships, but for simplicity, they are all on the same level.)

# Development Notes

* I started the project without prior experience with Lit Element, and I fell in love with it after 4 hours of documentation reading.
* Vaadin Router is a perfect match for Lit Element, though I look forward to exploring other routing options.
* Initially, I implemented a custom state solution but later switched to Redux, respecting its widespread use.
* Tests are basic, mostly focusing on event bindings and render checks, with a few additional cases to improve coverage. (I got some help from ChatGPT, but, as usual, it wasn’t a complete solution! :))
* This is a learning project, built with the motto “Learn by Writing”. Practices may not be perfect. One of my mentors once told me:

> "Le mieux est l’ennemi du bien."
> 
> (Trying to be perfect can prevent you from doing good) — Voltaire