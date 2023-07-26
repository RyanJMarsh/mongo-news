import React, { useState, useEffect } from 'react'

function ArticlePage({ id, setArticlePage, setTopic}) {
  const [commentBody, setCommentBody] = useState("")
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState({})

  const getArticleData = async (id) => {
    try {
      const response = await fetch(`/article/${id}`)
      const json = await response.json()
      setArticle(json)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const upVote = async (id) => {
    try {
      const response = await fetch(`/article/${id}/upvote`, {
        method: "PATCH"
      })
      getArticleData(id);
    }
    catch(err) {
      console.log(err)
    }
  }

  const downVote = async (id) => {
    try {
      const response = await fetch(`/article/${id}/downvote`, {
        method: "PATCH"
      })
      getArticleData(id);
    }
    catch(err) {
      console.log(err)
    }
  }

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/article/${id}/comments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({comment: {
          body: commentBody
        }})
      })
      getArticleData(id);
      setCommentBody("")
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`/article/${id}/removecomment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: commentId })
      })
      getArticleData(id);
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getArticleData(id);
  }, []);

  if (loading) {
    return <div>Loading....</div>
  }
  return (
    <div className="full-article-page">
        <div>
          <button onClick={() => {
            setArticlePage(false)
            setTopic("all")
            }}>Back</button>
        <h3 className="article-title">{article.title}</h3>
        <h4>Topic: {article.topic}</h4>
        <h4>Written by {article.author} on {(new Date(article.created_at)).toLocaleDateString()}</h4>
        <h4>{article.body}</h4>
        <div className="votes">
          <h4>Votes: {article.votes}</h4>
          <button onClick={() => upVote(article._id)}>+</button>
          <button onClick={() => downVote(article._id)}>-</button>
        </div>
        
        </div>
        
        <div className="comments">
          <form onSubmit={e => postComment(e)}>
            <label>Insert Comment:
              <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)}/>
            </label>
            <input type="submit"/>
          </form>
        </div>
        <div className="article-comments">
          <ul className="comment-list">
            {article.comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <p>{comment.body}</p>
                  <button onClick={() => deleteComment(comment._id)}>X</button>
                </li>
              )
            })}
          </ul>
        </div>   
    </div>
  )
}

export default ArticlePage