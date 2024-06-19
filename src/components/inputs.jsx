import React, { useState } from "react";

const Inputs = ({ onAdd }) => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (word && translation) {
      await onAdd(word, translation);
      setWord("");
      setTranslation("");
      document.querySelector('.word').focus(); // Установить фокус на инпут с word
    } else {
      console.log("Input is empty");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddClick(e);
    }
  };

  return (
    <div className="wrapper">
      <div className="input-wrapper">
        <input
          placeholder='word'
          className="global-input word"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleEnterPress}
        />
        <div className="some"></div>
        <input
          placeholder='перевод'
          className="global-input translation"
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          onKeyPress={handleEnterPress} 
        />
        <button className="add" onClick={handleAddClick}>
          add
        </button>
      </div>
    </div>
  );
};

export default Inputs;