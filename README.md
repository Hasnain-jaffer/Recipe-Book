# Paletta — Recipe Book

Paletta is a recipe discovery app built with **React**, **Vite**, and **React Router**, powered by [TheMealDB](https://www.themealdb.com/api.php) public API. Browse meal categories, search for recipes, and view full cooking instructions — all in a fast, responsive single-page app.

## Features

- 🍽️ **Browse categories** — fetches and displays all meal categories from TheMealDB with images and descriptions
- 🔍 **Search meals** — search by name and browse results in a card grid
- 📖 **Recipe details** — view a meal's category, area/cuisine, and full cooking instructions on its own page
- 👤 **Sign up / Login** — client-side account creation and authentication, with a "Remember me" option and a personalized welcome banner
- 🧭 **Client-side routing** — clean URLs for Home, Category, Meal, Recipe (`/recipe/:mealid`), Signup, and Login, with a custom 404 page
- 📱 **Responsive UI** — styled with per-component CSS across hero, category, meal, recipe, and auth pages

## Tech Stack

| Layer      | Technology                |
|------------|-----------------------------|
| Framework  | React 19 + Vite 7            |
| Routing    | React Router 7                |
| Icons      | react-icons                   |
| Data       | [TheMealDB API](https://www.themealdb.com/api.php) |
| Linting    | ESLint                        |

## Project Structure

```
Recipe-Book/
├── src/
│   ├── components/
│   │   ├── Applayout/
│   │   │   └── Applayout.jsx   # Shared layout: Navbar + <Outlet/> + Footer
│   │   ├── Navbar.jsx          # Nav links + auth-aware Sign Up/Logout button
│   │   ├── Footer.jsx
│   │   ├── Herosection.jsx     # Landing hero, shows a welcome banner if logged in
│   │   ├── Category.jsx        # Fetches & renders meal categories
│   │   ├── Login.jsx           # Client-side login against localStorage users
│   │   ├── Signup.jsx          # Client-side account creation
│   │   └── ErrorPage.jsx       # 404 page
│   ├── Home.jsx                # Herosection + Category
│   ├── Meal.jsx                # Search UI + meal results grid
│   ├── Recipe.jsx              # Single recipe detail page
│   ├── App.jsx                 # Router configuration
│   └── main.jsx
├── public/                     # Images (hero, farewell, etc.)
├── index.html
├── package.json
└── vite.config.js
```

## How It Works

1. **Home** renders a hero section and the list of meal categories, pulled from `GET /categories.php`.
2. Clicking a category or navigating to **Meal** lets you search meals by name via `GET /search.php?s=<query>`, rendered as a card grid.
3. Clicking **Read more** on a meal navigates to `/recipe/:mealid`, which fetches full details via `GET /lookup.php?i=<id>` and displays the image, category, area, and instructions.
4. **Signup** stores a new user object (`name`, `email`, `password`) in `localStorage` under a `users` array, with client-side validation. **Login** checks credentials against that array and stores the active session in `localStorage` (if "Remember me" is checked) or `sessionStorage` otherwise. The Navbar and Herosection react to login state and show a personalized greeting and logout option.

## ⚠️ Auth Note

Login/signup is entirely client-side for now — there's no backend or database, so accounts and passwords are stored in plaintext in the browser's `localStorage`/`sessionStorage` rather than a real auth system. It's a solid UX demo but not meant to hold real user credentials.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

```bash
git clone https://github.com/Hasnain-jaffer/Recipe-Book.git
cd Recipe-Book
npm install
```

### Running the App

```bash
npm run dev
```

Open the local URL Vite prints (typically **http://localhost:5173**).

### Building for Production

```bash
npm run build
npm run preview
```

## Roadmap

- [ ] Real backend authentication (replace localStorage-based auth)
- [ ] Save/favorite recipes per user
- [ ] Category page filtering meals by the selected category (currently all category cards link to the general Meal search page)
- [ ] Loading/error states for network failures on the meal search and recipe detail calls
- [ ] Social login (Google/Facebook buttons are present in the UI but not yet functional)

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

## Author

**Hasnain Jaffer**
- GitHub: [@Hasnain-jaffer](https://github.com/Hasnain-jaffer)
