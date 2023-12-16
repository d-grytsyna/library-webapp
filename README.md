# library-webapp
Efficiently manage your reading resources with this Library Web App, powered by React (v18.2.0) for the front end, Spring Boot (v2.7.3) for the backend, and PostgreSQL (v15.2) as the robust database.

React Frontend: Enjoy a dynamic and user-friendly interface.

Spring Boot Backend: Reliable and scalable architecture for optimal performance.

PostgreSQL Database: Ensures data integrity and reliability.

Okta Authentication: Secure login with Okta services for user and admin roles.

<img width="400" alt="database-library" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/ec102ef0-da92-4052-87c1-7667368ca90c">
<br> <br> <br>

User Roles: Role information is securely passed in JWT tokens for precise access control.

Stripe Integration: Hassle-free payment processing for fees paying.


**Database structure:**

<img width="400" alt="database-library" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/162c2bc1-f0bf-4ef9-8d32-e34bfe042c80">
<br> <br> <br>

**Home page:**

<img width="400" alt="database-library" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/fe694841-2de5-4980-8b73-36fc1be4edf7">
<br> <br> <br>

For users who haven't registered, browsing the library's book collection is open for exploration. However, the functionality to checkout books is restricted to registered users only.



**User Features:**

_Book Discovery:_ Easily find books and filter by category.

<img width="400" alt="book-search" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/bc248c26-8346-4e1b-bb25-f44f0705052d">
<br> <br> <br>

_Book Details:_ Access information about each book and its author.
_Borrowing:_ Check out up to 5 books at once.

<img width="400" alt="book-search" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/12514598-6afd-4f22-bf5c-9ac020fa0820">
<br> <br> <br>

_Reviews:_ Write and read reviews from fellow users.

<img width="400" alt="reviews" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/0b003ff7-5a96-4ece-b9b0-2cce27c7e90b">
<br> <br> <br>

_Bookshelf Management:_ Keep track of borrowed books, and return, or renew them.

<img width="400" alt="reviews" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/9aaee8e7-f45e-40a4-93c5-02351bfa0c09">
<br> <br> <br>

_Late Returns and Fees:_ If a borrowed book is returned after the due date, a late fee is applied. The late fee incurs at a rate of $1 for each late day. Make sure to return books on time to avoid any additional charges.

<img width="400" alt="Late return" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/f9705c7e-5546-4b9f-bdab-cb2c8b43b15a">
<br> <br> <br>

_Checkout History:_ Access a record of past book checkouts.

<img width="400" alt="history" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/fa6ecad6-941e-4f50-86b7-3afc8b4a1664">
<br> <br> <br>

_Fee Overview:_ View and settle any outstanding fees. Securely pay outstanding fees using Stripe.

<img width="400" alt="fees" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/2d300307-44a3-4610-9ca1-c9ff1fc2b32e">
<br> <br> <br>

_Q/A with Admins:_ Ask questions and view responses in the Q/A section.

<img width="400" alt="questions" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/ce665335-bdbf-47ae-a6c2-cc010e572840">
<br> <br> <br>


**Admin Features:**

_Add New Books:_ Admins can easily expand the library collection by adding new books. Provide the necessary information to enrich the catalog.

<img width="400" alt="questions" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/985a75b2-c0b2-447d-b705-301ee096d4e4">
<br> <br> <br>

Manage Book Inventory:
Change the quantity of existing books or remove them from the catalog. Keep the library inventory up-to-date and relevant.

<img width="400" alt="manage library" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/6d19832e-3e6e-4f16-94cd-7dbf3250fdb4">
<br> <br> <br>

Respond to User Messages:
Admins can interact with users by responding to their messages.

<img width="400" alt="manage library" src="https://github.com/d-grytsyna/library-webapp/assets/129409885/60c6de3f-bf44-4806-a1f1-de9c3aff0661">



