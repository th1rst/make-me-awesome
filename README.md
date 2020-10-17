# Make Me Awesome

[Project Demo Here](https://kochannek.com/portfolio/make-me-awesome/)

**Login Credentials:**
*john@doe.com*, *asdf1234*

A while ago, a friend of mine asked me if I could build a "personal improvement" Webapp for him where he could track his activities and see where he spends his time on (productive tasks vs. unproductive tasks) so he could improve himself and his time management. It sounded boring at first, but the more I thought about it, the more I liked the idea because it's more "interactive" than the Sites I've built before... and since I was looking for a new project idea anyways, I thought I'd go for it.

Realistically, the App won't have many users, so learning to build a complete Backend for it would be too much - instead, I used Google Firebase Auth and Firestore as a Backend, which, in retrospect, were more than enough new technologies to learn at once. For Firebase auth, I stuck to a Tutorial by Rwieruch which was super helpful and teached me lots of things.
While this project took me significantly longer than anticipated (because after Covid Lockdowns I started working full time again), it was SO much fun and although this wasn't my first React project, it finally "clicked" to the point where I could work my way through the different Documentations to finish this project and had to google a lot less. 


## Technologies used

**Frontend / UI:**
- React
- Tailwind CSS
- Rainbow UI + Windmill UI Components
- React-Icons

**Data Display:**
- ApexCharts (Bar Chart, Donut Chart)
- MUIDatatables

**Backend:**
- Google Firebase Auth
- Google Firestore


## Roadblocks I've hit
Whenever I touch a new Project, I try to challenge myself and use at least one technology I want to learn that I don't know already. In this case, I picked Auth (Firebase), Cloud Storage (Firestore) and a CSS Framework (Tailwind) - so three new technologies at once. And oh boy, it was tough. So what roadblocks did I hit?

**User Authentication**

Working with User Authentication for the first time was very time-consuming. In the end, I went with a solution of moving it to a Higher-Order-Component and storing authToken in LocalStorage as authUser.

**Formatting Data**

MUIDatatables and Apexcharts are amazing Projects but formatting the data so they display the desired outcome was much harder than anticipated. 

**ApexCharts:** Since I wanted to write only one algorithm and only pass it props to sort, it was challenging. It gets passed two props: days (how many days to filter, i.e *last 7 days* or *last 30 days*) and category (i.e. *productive*, *neutral*, *unproductive*).
But after a full day of figuring out the correct way to map, filter and sort the data, I got the desired result - and hopefully in an elegant and well-documented way.

**MUIDataTable:** I had to figure out a way to use MUIDT's "customBodyRender" Method to delete the specific activity a) in Google Firestore and b) the specific table row. I moved the customBodyRender options to state and went with a solution of passing the customBodyRender the inner value (in this case: firestore ID) as parameter which then passes it on to "deleteActivity" which deletes it from Firestore and re-renders the table. It was hard since I had to work within certain boundaries (customBodyRender) but it works flawlessly.


### Room for improvement (aka "things I'd like to improve") - PR's welcome
- I feel like I am making too many calls to the server. This could probably be improved by creating a context + consumer.
- Code could be destructured into Components further
- Tailwind CSS classNames can get a bit overwhelming so I'm sure I've made some unneccessary classes here and there.
- I am using the "old" Class Components instead of React Hooks but I will take on Hooks in my next project. I felt like three new technologies were enough.


Other than that, I am extremely happy with the result!

Also: thank goodness for whoever made the TailwindCSS Cheat Sheet.