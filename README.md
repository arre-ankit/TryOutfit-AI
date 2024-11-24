
![image](https://github.com/user-attachments/assets/88531ff7-feb1-4bc8-934f-cddd115c2398)



# Try Your Outfit
Passionate about empowering global communication? Help us build the ultimate AI speech coach.

Contributions welcome!✨

## 👀 What is this?
- Amazon Link of the outfit
- Upload your photo

Boom you get the result!💥



## What's under the hood?
#### `src/apps`: The main web UI.

Built with:

- Nextjs 14
- [TailwindCSS](https://tailwindcss.com)
- [shadcn-ui](https://ui.shadcn.com)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)

#### `src/try-clothing-api`: The backend server

Built with:
- Nodejs
- Axios
- Express


## How can I contribute?

1. Fork this repo
2. Clone your forked repo
3. Create a new branch
4. Make your changes
5. Push your changes to your branch
6. Create a pull request

## Setup Instructions

1. Clone the repo

```bash
git clone https://github.com/arre-ankit/try-your-outfit.git
```

2. Set up the Next.js app

```bash
npm install @cloudflare/next-on-pages
npm run dev
```

3. Create `.env` file in the root of the project and add the following:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the server
```bash
cd src/try-clothing-api
npm install
node index.js
```

