## myTube youtube clone

From a [tutorial](https://github.com/flaviocopes/bootcamp-2022-week-12-youtube) by [Flavio Copes](https://github.com/flaviocopes)

Video sharing app built in NextJS using ReactPlayer for playback.
Users can

-   set a username and avatar
-   see all videos on the paginated home page
-   visit other users' channel pages to see all their videos
-   subscribe to other users' uploads and see them on their own subscriptions page
-   upload their own videos and see them in their own channel

Uses Next-Auth for login, videos hosted in an AWS S3 Bucket, database hosted on Railway.app

Hosted on Vercel at https://mytube-xi.vercel.app/

### Personal additions

-   allows user to change personal details after sign-up, and prefills user details for existing users
-   return home button on all other pages
-   consistent header rendered once in \_app.js
-   styling with a combination of css and tailwindcss

![image](public/myTube-home.png)
![image](public/myTube-own.png)
![image](public/myTube-single.png)
