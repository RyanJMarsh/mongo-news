import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import NavBar from "./components/NavBar";
import ArticlePage from "./components/ArticlePage";

function App() {
  const [topic, setTopic] = useState("all")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [articlePage, setArticlePage] = useState(false)
  const [fullArticleId, setFullArticleId] = useState("")

  const getData = async (topic) => {
    try {
      const response = await fetch(`https://mongo-news-7d6c075743aa.herokuapp.com/news/${topic}`);
      const json = await response.json();
      setArticles(json);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getData(topic);
  }, [topic]);

  if (loading) {
    return <div>Loading....</div>
  }
  if (articlePage) {
    return (
      <div className="app">
      <Header/>
      <ArticlePage id={fullArticleId} setArticlePage={setArticlePage} setTopic={setTopic}/>

      </div>
      
    )
  }
  return (
    <div className="app">
      <Header />
      <NavBar setTopic={setTopic}/>
      <ul className="article-list">
        {articles.map((article) => {
          return (
          <li onClick={() => {
            setFullArticleId(article._id);
            setArticlePage(true);
          }} key={article._id}>
            <ArticleList title={article.title} topic={article.topic} author={article.author}/>
          </li>)
        })}
      </ul>
    </div>
  );
}

export default App;


