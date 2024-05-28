document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "7959e3fda5db4003b4c7b8b7e5143a7e";
    const blogContainer = document.getElementById("blog-container");
    const searchField = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
  
    async function fetchRandomNews() {
      try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error in fetching news", error);
        return [];
      }
    }
  
    async function fetchNewsQuery(query) {
      try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error in fetching news", error);
        return [];
      }
    }
  
    function displayBlogs(articles) {
      blogContainer.innerHTML = "";
      articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("bolg-car"); // Corrected class name
  
        const img = document.createElement("img");
        img.src = article.urlToImage || "https://placehold.co/600x400";
        img.alt = article.title || "News Image";
  
        const title = document.createElement("h2");
        const truncatedTitle =
          article.title.length > 18
            ? article.title.slice(0, 18) + "..."
            : article.title;
        title.textContent = truncatedTitle;
  
        const description = document.createElement("p");
        const truncatedDes =
          article.description && article.description.length > 50
            ? article.description.slice(0, 50) + "..."
            : article.description || "No description available";
        description.textContent = truncatedDes;
  
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
          window.open(article.url, '_blank');
        });
        blogContainer.appendChild(blogCard);
      });
    }
  
    searchButton.addEventListener('click', async () => {
      const query = searchField.value.trim();
      if (query !== '') {
        try {
          const articles = await fetchNewsQuery(query);
          displayBlogs(articles);
        } catch (error) {
          console.log('Error fetching news by query', error);
        }
      }
    });
  
    (async () => {
      try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
      } catch (error) {
        console.error("Error in fetching and displaying news", error);
      }
    })();
  });
  