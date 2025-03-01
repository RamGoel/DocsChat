# DocsChat - AI-Powered Docs Chatbot

DocsChat is an open-source Retrieval-Augmented Generation (RAG) layer that allows you to turn any company's documentation into an AI-powered chatbot. Simply clone the repo, replace the docs, set up your API key, and start chatting with your documentation!

## 🚀 What DocsChat Does

- Converts your documentation into an AI-powered chatbot
- Uses the Gemini model to provide accurate answers
- Easy to set up—just update a single file and add an environment variable
- Completely open-source and customizable

## 🔥 Use Cases

- **Internal Team Support**: Help your team quickly find answers in your company’s docs
- **Customer Support**: Provide instant responses based on documentation
- **Developer Assistance**: Turn API or technical documentation into a chatbot
- **Knowledge Management**: Make searching through long documents easier

## 🛠️ How to Set Up

1. **Clone the Repository**
   ```sh
   git clone https://github.com/RamGoel/DocsChat.git
   cd DocsChat
   ```
2. **Replace Documentation**
   - Update `public/docs.txt` with your own documentation.
3. **Set Up Environment Variable**
   - Create a `.env` file and add your Google API Key:
     ```sh
     GOOGLE_KEY=your_google_api_key
     ```
4. **Run the App**
   ```sh
   npm install  # Install dependencies
   npm start    # Start the chatbot
   ```

## 🛡️ Built By

Made with ❤️ by [RamGoel](https://github.com/RamGoel).

## ⭐ Star the Repo

If you find this project useful, don’t forget to give it a ⭐ on GitHub!

[GitHub Repo](https://github.com/RamGoel/DocsChat)
