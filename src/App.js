import React, { useState, useEffect } from "react";
import PostItem from "./components/PostItem";
import Inputs from "./components/inputs";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllWords().then((words) => {
      setPosts(words);
    });
  }, []);

  async function fetchAllWords() {
    try {
      const response = await fetch("http://localhost:3001/api/translator/get");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let arrayOfWords = [];
      for (const word of data) {
        arrayOfWords.unshift({
          id: word.id,
          word: word.en,
          translation: word.ru,
        });
      }
      return arrayOfWords;
    } catch (error) {
      console.error("Failed to fetch words:", error);
      return [];
    }
  }

  async function sendWords(en, ru) {
    let data = { en, ru };
    const response = await fetch("http://localhost:3001/api/translator/write", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }

    const responseData = await response.json(); 
    return responseData; 
  }

  const addNewPost = async (word, translation) => {
    const newWordData = await sendWords(word, translation);
    const newPost = {
      id: newWordData.id,
      word,
      translation,
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="App">
      <Inputs onAdd={addNewPost} />

      {posts.map((post) => (
        <PostItem post={post} key={post.id} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default App;
