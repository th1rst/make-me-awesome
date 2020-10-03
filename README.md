# Make Me Awesome

A couple of days ago, a friend of mine asked me if I could build a "personal improvement" Webapp for him. It sounded boring at first, but the more I thought about it, the more I liked the idea because it's more "interactive" than the Sites I've built before... and since I was looking for a new project idea anyways, I thought I'd go for it.

Realistically, the App won't have many users, so building a complete Backend for it would be "overkill" - instead, I will be using Google Firebase as a Backend.
Initially, I wanted to use "Directual" but their JSON mapping is completely broken when it comes to nested key-value-pairs. Every JSON Linter on earth approved my JSON string but Directual couldn't handle it. Ever since switching to Firebase, it works as intended. For Firebase auth, I stuck to a Tutorial by Rwieruch which was super helpful and teached my lots of things.

**Frontend:**
- React
- Tailwind CSS / Custom CSS if needed
- React-Bootstrap
- React-Icons
- Windmill UI
- Eventually I'll be using ReCharts for displaying the different data in a more visually appealing way

**Backend:**
- Google Firebase + API

**Misc:**
- Will be working with a user authentication system for the first time.
- Design will probably be "Mobile first".


**Things I've encountered so far:**
- Connecting the Firebase Auth and the corresponding User entry in Firestore (Database) was extremely challenging. In theory, it's just getting the UserID of auth and fetching the Firestore entry with the UserID. In practice, getting the currentUser.uid at all times was super tricky and I ended up storing it in localStorage and retrieving it when needed.