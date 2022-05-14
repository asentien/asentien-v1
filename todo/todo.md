# asentien todo and general information about the codebase. #

**Why doesn’t asentien have …?**

If you go to the file whyDoesntAsentienHave.md, located in the same folder as this one, you’ll receive answers regarding more major features. This text file contains more, at least for the end-user, minor features, as well as general information about asentien’s codebase. 

**Everything wrong with being a beginner self-taught solo dev.**

I’m a beginner self-taught solo dev and asentien’s codebase has all the problems that come with it. Lack of comments, odd variable names, not DRY, problem-creating solutions, strange-ish structure, varying / low code quality, e.t.c. 

**Best practices.**

Most problems haven’t been solved with best practices in mind, because I don’t know what the best practices are, the problems have instead been solved to be solved for the actual users. The lack of knowledge of best practices is probably more evident in some areas than others. 

**Tests.**

All code is manually tested, but not programmatically. I’ve not written tests due to the scope of the entire project and because I’m certain that most, if not all code, can be re-written with better implementations. It seems reasonable to first rewrite better code, then test that. 

**Authentication flow.**

I want multiple parts of asentien to be accessible for people without an account. This ended up creating some issues when it comes to authentication, as a JWT-access-token may only be present at certain times. This is the reason asentien forces a window refresh when you either Sign up or Log in. It solves the problem but in a non-neat way. 

**The Follow button and the Like button are pretty slow.**

Title. 

**Images and videos load slowly from the cloud, at least for me.**

May be due to the region they are located in. The images and videos are located in the US but I’m not. 

**Asentient and Accelerator promotion.**

If you promote a user to Asentient or Accelerator status, you won’t see the change over the entire application until you refresh the page, because it’s not connected to Redux. I’ve failed to fix it because the data alter another user, not the user in the personal store. 

**CSS.**

I don’t know much, or anything, about writing CSS code. I simply had a design in mind and tried to get it on screen. I assume the code reflects that. I also don’t know how to measure the width between certain elements, I mostly used eye measurement. I use classes and IDs exclusively because I heard they’re faster than other selectors. 

**Dev Ops.**

I don’t know who Dev Ops’ers are, I don’t know what you want, but I do know you frighten me. I found the deployment process torturous, I eventually got everything running, but I have zero confidence in the outcome. 

**Watermark.**

The watermark, on videos and pictures, is currently just overlayed on the front end. It needs to be added directly to the media itself on the backend. 

**Video and image compression.**

I have yet to add this, but as asentien’s user base continues to grow, it becomes exponentially more important. 

**Development and Production setup.**

I have two different projects, one that concerns local development and another project that concerns production. It is technically unnecessary but decreases the risk that I mess up and damage production. This means that the codebase right here isn’t perhaps perfect when it comes to immediate usage in both production and development. 

**Comment and Share count.**

When viewing a post individually the comment and share count isn’t added. The same goes for nested comments and shares. Because of it, I’ve modified the front-end code and design to match it. But if it’s solved on the back end, those modifications on the front end can be removed.

**Created days ago.**

I’m currently using relative time from dayjs. It’s a great package that, unfortunately, doesn’t shorten the relative times when they are displayed to the user. It, therefore, looks bloated. A new package needs to be used, or a modification needs to be added, that alters 2 minutes ago to 2m, 14 hours ago to 14h, 5 days ago to 5d, e.t.c. 

**Icons.**

I’m currently, mostly, using MUI Icons, they are great but should in the future be changed for more specific ones that better suit some of the data they represent. The icons would also look better if they were more uniform.

**Content and User recommendations.**

I believe algorithms can enhance the user experience if they serve to promote content that users are better off with and not just content that is clicked the most. I don’t believe I can personally implement this programmatically, but I do have some theoretical ideas that could serve as a foundation. 

**Logo.**

asentien’s logo was literally, and noticeably, created in paint3D. The idea of how it could look is probably better than the actual drawing and current resolution. 

**Accessibility guidelines.**

I don’t know enough about accessible development to say whether asentien is an accessible or not an accessible website. 

**Double-clicking top navbar icons doesn’t close the dropdowns.**

Double-clicking the top navbar icons to close them is an easy problem to solve, it gets harder when you can close dropdowns by clicking anywhere outside of the dropdown. Because as is, the top navbar icons are a part of that anywhere. Therefore when they are clicked, the click outside function closes the dropdown, then the actual click on the top navbar icons re-opens the dropdown. The dropdowns could also be improved if only the content within it changed when navigating between them. That way the flicker that occurs when navigating between dropdowns would be removed.

**Share or comment on a share or a comment.**

If you share or comment on a share or a comment it will display that you shared or commented on a share or a comment, but it won’t display the content of the parent item or the post, the first comment or share was left on. Might be something that should be fixed, but might not be. Since you can share, the share, of a share, of a share, e.t.c. If it’s done through the home feed or by clicking on the post detail button for each nested share or comment. 

**The background moves when a modal is opened on alternative zooms.**

If you open a modal on any site it will usually lock the background, preventing you from scrolling. This generally causes the background to jump to the right, on Windows PCs, because the scrollbar and the pixels it occupies are removed. But if you open a modal at Asentien and look to the right of your screen, you’ll see a fake scrollbar, and you should also see that the background doesn’t move as long as you’re on 100% / standard zoom. But if you zoom in or out on the site, it will, unfortunately, jiggle a bit. I tried fixing it by looking at a user's browser zoom, then updating the values in useLockBodyScroll.js accordingly, but it didn’t work. 

**Open comments and shares lack a loader.**

When you open and load comments or shares on a post, no loader is present. For some reason, it’s not connected to the Redux state keeping track of if it’s loading. Could be solved, by figuring out why it’s not connected, seems reasonable it’s caused by nested data, or by adding a fake loader that is present for a certain amount of seconds, or by measuring the length of the post item, when it expands, stop the loader. 

**The shared or commented-on content sometimes disappears.**

If you click on the shared post of a share from the home screen, then go down to the shares of that post, press post details of the initial share that showed up on your home screen, then go back to the home page, you’ll find that the shared portion is now gone. Don’t know why it occurs, it’s probably not a pressing matter. 
