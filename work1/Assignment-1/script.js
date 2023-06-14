const apiKey = 'AIzaSyBtTcrnwx4xoGOrnHCZZKN57mbBWfX4zWM';
const numBooks = 4;
const searchQuery = 'flowers';
const sellContainer = document.querySelector('.sell-contain');


fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&printType=books&maxResults=${numBooks}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.items && Array.isArray(data.items)) {
            data.items.forEach(item => {
                const book = item.volumeInfo;
                const authors = book.authors || [];

                if (authors.length < 5) {
                    const bookCard = document.createElement('div');
                    bookCard.classList.add('book-card');

                    const thumbnail = book.imageLinks?.thumbnail || 'no-image.png';
                    const title = book.title || 'Unknown Title';
                    const author = authors || 'Unknown Author';
                    const price = '$30';

                    bookCard.innerHTML = `
            <img src="${thumbnail}" alt="Book cover">
            <h4>${title}</h4>
            <p>By: ${author}</p>
            <p>Price: ${price}</p>
          `;
                    const button = document.createElement('button');
                    button.textContent = 'Add to Cart';
                    button.classList.add('add-to-cart');

                    bookCard.appendChild(button);
                    
                    sellContainer.appendChild(bookCard);
                }
            });
        } else {
            console.error('No books found in the API response.');
        }
    })
    .catch(error => {
        console.error(error);
    });