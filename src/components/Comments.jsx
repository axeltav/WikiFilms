/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

export const Comments = ({movieId = ""}) => {
    let [commentList, setCommentList] = useState(JSON.parse(localStorage.getItem('comments'))?JSON.parse(localStorage.getItem('comments')):[]);
    let [commentContent, setCommentContent] = useState('');

    const addComment = (e) => {
        e.preventDefault();
        let comment = {
            id: Math.max(...commentList.map(comment => comment.id)) + 1,
            content: commentContent,
            author: JSON.parse(localStorage.getItem('currentUser')).userName,
            user: JSON.parse(localStorage.getItem('currentUser')).email,
            movieId: movieId
        }
        commentList.push(comment);
        localStorage.setItem('comments', JSON.stringify(commentList));
        setCommentList(JSON.parse(localStorage.getItem('comments')));
        setCommentContent('');
    }

    const deleteComment = (id) => {
        let newCommentList = commentList.filter(comment => comment.id!==id);
        localStorage.setItem('comments', JSON.stringify(newCommentList));
        setCommentList(JSON.parse(localStorage.getItem('comments')));
    }

    const handlechange = (e) => {
        setCommentContent(e.target.value);
    }

  return (
    <div>
      <div className="comments-container pb-3">
        {commentList.filter(comment=> comment.movieId === movieId).map(comment => {
            return (
              <div className="comment" key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.author}</p>
                <button onClick={() => deleteComment(comment.id)}>Supprimer</button>
              </div>
            )
          })
        }
      </div>
      <form onSubmit={addComment} className="container pt-3 m-0 pb-0 pl-0 pr-0">
        <label htmlFor="newComment" className="white ">Nouveau commentaire : </label>
        <div className="row p-2">
            <textarea className="form-control col-10" id="newComment" rows="3" value={commentContent} onChange={handlechange}></textarea>
            <button type="submit" className="btn validBtn col-2">Envoyer</button>
        </div>
      </form>
    </div>
  );
}