/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Avatar from "react-avatar";

export const Comments = ({ movieId = "" }) => {
  let [commentList, setCommentList] = useState(JSON.parse(localStorage.getItem('comments')) ? JSON.parse(localStorage.getItem('comments')) : []);
  let [commentContent, setCommentContent] = useState('');

  let user = JSON.parse(localStorage.getItem('currentUser'));

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
    let newCommentList = commentList.filter(comment => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(newCommentList));
    setCommentList(JSON.parse(localStorage.getItem('comments')));
  }

  const handlechange = (e) => {
    setCommentContent(e.target.value);
  }

  return (
    <div>
      <div className="comments-container pb-3">
        {commentList.filter(comment => comment.movieId === movieId).map(comment => {
          return (
            <div className="comment" key={comment.id}>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row m-2 justify-content-start align-items-center">
                  <Avatar
                    className="mr-2 user-avatar"
                    name={comment.author}
                    size="40"
                    round={true}
                  />
                  <p className="m-0">{comment.author}</p>
                </div>
                <div className="d-flex align-items-center">
                  {comment.user && user && comment.user === user.email &&
                    <button className="delete-btn" onClick={() => deleteComment(comment.id)} aria-label="Supprimer les commentaire">Supprimer</button>
                  }
                </div>
              </div>
              <p>{comment.content}</p>

            </div>
          )
        })
        }
      </div>
      <form onSubmit={addComment} className="container pt-3 m-0 pb-0 pl-0 pr-0">
        <label htmlFor="newComment" className="white ">Nouveau commentaire : </label>
        <div className="row p-2">
          <textarea className="form-control col-9" id="newComment" rows="3" value={commentContent} onChange={handlechange}></textarea>
          <div className="col-1"></div>
          {user ? <button type="submit" className="btn validBtn col-2" aria-label="Envoyer le commentaire">Envoyer</button> :
            <button type="submit" className="btn validBtn col-2 tooltip-custom" disabled aria-label="Envoyer le commentaire">
              Envoyer
              <span className="tooltiptext ">Connectez-vous pour envoyer un commentaire</span>
            </button>
          }
        </div>
      </form>
    </div>
  );
}