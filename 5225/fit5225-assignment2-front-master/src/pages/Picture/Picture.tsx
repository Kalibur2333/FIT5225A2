import React from 'react';
import articleContent from './article-content';

function Picture({ match }: any) {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  return (
    <>
      <div>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}

export default Picture;
