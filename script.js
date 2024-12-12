document.addEventListener("DOMContentLoaded", () => {
    // Try to load articles data from localStorage
    const storedArticlesData = localStorage.getItem("articlesData");
    const articlesData = storedArticlesData ? JSON.parse(storedArticlesData) : {
    "articles": [
    {
      "id": 1,
      "title": "New Study Reveals Surprising Health Benefits of Coffee",
      "date": "2024-10-15",
      "category": "Health",
      "content": "A new study published this week has found that drinking coffee may have numerous health benefits. The study, conducted over ten years, tracked the health outcomes of 10,000 participants who consumed coffee regularly...",
      "views": 150,
      "wordCount": 500
    },
    {
      "id": 2,
      "title": "Tech Giants Announce Collaboration on AI Safety Standards",
      "date": "2024-11-01",
      "category": "Technology",
      "content": "In a groundbreaking move, several major tech companies have come together to develop common standards for artificial intelligence safety. This collaboration aims to address ethical and security concerns around the rapid development of AI...",
      "views": 300,
      "wordCount": 650
    },
    {
      "id": 3,
      "title": "Local Art Fair Brings Creativity to the Community",
      "date": "2024-09-22",
      "category": "Arts",
      "content": "This year’s local art fair saw a record attendance as artists and creators gathered to display their works. From paintings to sculptures and everything in between, the fair offered a vibrant display of community creativity...",
      "views": 85,
      "wordCount": 400
    },
    {
      "id": 4,
      "title": "Experts Predict Economic Trends for 2025",
      "date": "2024-10-05",
      "category": "Finance",
      "content": "With 2025 on the horizon, financial experts have released their predictions for economic trends that may shape the upcoming year. Topics range from inflation rates and job markets to the potential impact of technological advancements...",
      "views": 220,
      "wordCount": 700
    },
    {
      "id": 5,
      "title": "Climate Change and the Future of Renewable Energy",
      "date": "2024-11-02",
      "category": "Environment",
      "content": "As climate change continues to be a pressing global issue, renewable energy sources are becoming increasingly important. Experts believe that the shift to renewable energy could not only mitigate environmental impacts but also drive economic growth...",
      "views": 400,
      "wordCount": 800
    },
    {
      "id": 6,
      "title": "Breakthroughs in Cancer Research Offer New Hope",
      "date": "2024-08-30",
      "category": "Health",
      "content": "Recent breakthroughs in cancer research have led to promising new treatments that may improve survival rates for several types of cancer. Researchers are optimistic about these advancements, though caution that more studies are needed...",
      "views": 130,
      "wordCount": 550
    },
    {
      "id": 7,
      "title": "Guide to Traveling on a Budget in 2025",
      "date": "2024-10-20",
      "category": "Travel",
      "content": "With travel becoming more accessible post-pandemic, many people are looking for ways to explore the world on a budget. From tips on finding affordable accommodations to advice on saving money on flights, this guide is perfect for travel enthusiasts...",
      "views": 90,
      "wordCount": 450
    },
    {
      "id": 8,
      "title": "The Rise of Electric Vehicles in the Automotive Industry",
      "date": "2024-09-15",
      "category": "Automotive",
      "content": "Electric vehicles are gaining popularity worldwide as consumers seek eco-friendly alternatives to traditional gasoline-powered cars. Automakers are racing to meet this demand by introducing a variety of new electric models to the market...",
      "views": 250,
      "wordCount": 600
    },
    {
      "id": 9,
      "title": "How Meditation Can Improve Mental Health",
      "date": "2024-11-04",
      "category": "Health",
      "content": "In a fast-paced world, meditation is increasingly recognized as a powerful tool for managing stress and improving mental health. Studies suggest that regular meditation can lead to reduced anxiety, better focus, and improved emotional regulation...",
      "views": 175,
      "wordCount": 500
    },
    {
      "id": 10,
      "title": "The Impact of Social Media on Modern Relationships",
      "date": "2024-10-12",
      "category": "Society",
      "content": "Social media has changed the way people connect, but what impact does it have on relationships? Experts say that while social media can strengthen bonds, it can also create misunderstandings and increase anxiety among users...",
      "views": 205,
      "wordCount": 550
    }
  ]
    };

    const articlesContainer = document.getElementById("first-row");
    const popularArticleContainer = document.getElementById("sidebar-row");
    const themeToggleBtn = document.querySelector(".button-theme");

    // init theme
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-theme", currentTheme === "dark");
    themeToggleBtn.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";

	// Theme toggle functionality
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        themeToggleBtn.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
    });

   // read time calculation
    const calculateReadingTime = (wordCount) => Math.ceil(wordCount / 200);

    // Modal initialization
    const myModalElement = document.getElementById('articleModal');
    const myModal = new bootstrap.Modal(myModalElement);

    myModalElement.addEventListener('hidden.bs.modal', () => {
        // Reset the modal content to avoid any residual content after closing
        const modalTitle = document.getElementById("articleModalLabel");
        const modalCategory = document.getElementById("articleCategory");
        const modalContent = document.getElementById("articleContent");

        modalTitle.textContent = "";
        modalCategory.textContent = "";
        modalContent.textContent = "";
    });

    // Function to open the modal and set content
    const openModal = (article) => {
		// Increment views count for the clicked article
		article.views += 1;
	
		// Update the views count on the card (this is for any article, not just the most popular)
		const card = document.querySelector(`[data-article-id="${article.id}"]`);
		card.querySelector(".views-count").textContent = article.views;
	
		// Update views in the localStorage
		localStorage.setItem("articlesData", JSON.stringify(articlesData));
	
		// Find the updated most popular article after the view count change
		displayMostPopular(articlesData.articles);
	
		// Set modal content
		const modalTitle = document.getElementById("articleModalLabel");
		const modalCategory = document.getElementById("articleCategory");
		const modalContent = document.getElementById("articleContent");
	
		modalTitle.textContent = article.title;
		modalCategory.textContent = article.category;
		modalContent.textContent = article.content;
	
		// Show the modal
		myModal.show();
	};

    // Modify the card click listener to use the new openModal function
    const renderArticles = (articles) => {
        articlesContainer.innerHTML = "";
        articles.forEach(article => {
            const card = document.createElement("div");
            card.className = "col-12 col-md-6 col-lg-4 mb-4";
            card.innerHTML = `
                <div class="card" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#articleModal" data-article-id="${article.id}">
                    <img src="article images/${article.id}.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="card-header">${article.title}</div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Date: ${article.date}</li>
                            <li class="list-group-item">Category: ${article.category}</li>
                            <li class="list-group-item">Views: <span class="views-count">${article.views}</span></li>
                            <li class="list-group-item">Estimated Reading Time: ${calculateReadingTime(article.wordCount)} min</li>
                        </ul>
                    </div>
                </div>
            `;

            // Add event listener to update the views and open the modal
            card.addEventListener("click", () => {
                openModal(article);
            });

            articlesContainer.appendChild(card);
        });
    };

    // Отображение самой популярной статьи
    const displayMostPopular = (articles) => {
		const mostPopular = articles.reduce((max, article) => article.views > max.views ? article : max, articles[0]);
		popularArticleContainer.innerHTML = ""; // Clear previous content
	
		const card = document.createElement("div");
		card.className = "col-12 col-lg-4 popular-card"; // Add unique class for popular card
		card.innerHTML = `
			<div class="card" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#articleModal" data-article-id="${mostPopular.id}">
				<img src="article images/${mostPopular.id}.png" class="card-img-top" alt="...">
				<div class="card-body">
					<div class="card-header">${mostPopular.title}</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">Date: ${mostPopular.date}</li>
						<li class="list-group-item">Category: ${mostPopular.category}</li>
						<li class="list-group-item">Views: <span class="views-count">${mostPopular.views}</span></li>
						<li class="list-group-item">Estimated Reading Time: ${calculateReadingTime(mostPopular.wordCount)} min</li>
					</ul>
				</div>
			</div>
		`;
	
		// Add event listener to update the views and open the modal
		card.addEventListener("click", () => {
			openModal(mostPopular);
		});
	
		popularArticleContainer.appendChild(card);
	};

    const applySort = (sortOption) => {
        let sortedArticles;
        if (sortOption === "date") {
            sortedArticles = [...articlesData.articles].sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === "popularity") {
            sortedArticles = [...articlesData.articles].sort((a, b) => b.views - a.views);
        }
        renderArticles(sortedArticles);
    };

    document.querySelector(".dropdown-menu").addEventListener("click", (event) => {
        const sortOption = event.target.textContent.toLowerCase();
        localStorage.setItem("sortPreference", sortOption);
        applySort(sortOption);
    });

    // Initial render of articles with saved sort preference
    const savedSortPreference = localStorage.getItem("sortPreference");
    if (savedSortPreference) {
        applySort(savedSortPreference);
    } else {
        renderArticles(articlesData.articles);
    }
    displayMostPopular(articlesData.articles);
});