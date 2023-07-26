import React from 'react'

function ArticleList({title, topic, author}) {
  return (
    <div className="article-card">
        <div>{title}</div>
        <div>{topic}</div>
        <div>by {author}</div>
    </div>
  )
}

export default ArticleList