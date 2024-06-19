import React from "react";

const PostItem = ({ post, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Вы действительно хотите удалить это слово?");
    if (confirmDelete) {
      const id = post.id;
      try {
        const response = await fetch(`http://localhost:3001/api/translator/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Ошибка при удалении слова с сервера");
        }

        console.log(`Word with id ${id} has been deleted.`);
        onDelete(id); 
        
      } catch (error) {
        console.error(`Error deleting word with id ${id}:`, error);
      }
    }
  };

  return (
    <div className="post">
      <div className="post__content">
        <strong>{post.word} - {post.translation}</strong>
      </div>
      <div className="post__btns">
        <button className="image-button" onClick={handleDelete}></button>
      </div>
    </div>
  );
};

export default PostItem;