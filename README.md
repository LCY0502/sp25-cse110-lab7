Chung Yin Lee
### 1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

  1. Within a Github action that runs whenever code is pushed 
  2. Manually run them locally before pushing code
  3. Run them all after all development is completed

  3, Run the test after the developement is completed because the form of creating recipe-card is dependent on the recipe-card to be finished, and therefore it is better to run test after both features are done.

### 2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)
  NO


### 3) What is the difference between navigation and snapshot mode?
  Navaigation analyse the page after it immediately loaded and snapshot analyse a particular state of the page. Navagation cannot analysze content that is not avaliable on page load such as: button or menus interaction, but snapshot mode can. And similarly, snapshot does not provide the overall metric of the page but navagation mode can. 

### 4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.
  1. Page does not have `<meta name="viewpoint">` tag with width or initial-scale. Adding this tag removes the 300ms delay to user input.
  2. Page does not have the meta lang tag. It should add a lang tag to increase accessbility
  3. Page should cache the static assets such as: shop-icon.png, main.js, main.css, storage.js, etc. It can speedup repeat visits to the page. 
  