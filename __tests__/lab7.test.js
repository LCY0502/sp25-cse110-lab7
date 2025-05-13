describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  //DONE
  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    console.log(`Checking product item 1/${prodItemsData.length}`);

    // Make sure the title, price, and image are populated in the JSON
    firstValue = prodItemsData[0];
    if (firstValue.title.length == 0) { allArePopulated = false; }
    if (firstValue.price.length == 0) { allArePopulated = false; }
    if (firstValue.image.length == 0) { allArePopulated = false; }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    // check all items are populated
    for(const i in prodItemsData){
      // console.log(`Checking product item ${i+1}/${prodItemsData.length}`);
      const prod = prodItemsData[i];
      if (prod.title.length == 0) { allArePopulated = false; }
      if (prod.price.length == 0) { allArePopulated = false; }
      if (prod.image.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);


  }, 10000);

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', prodItems => {
      return prodItems.every(item => {
        const data = item.data;
        return data && data.title && data.title.length > 0 && 
               data.price && data.price > 0 && 
               data.image && data.image.length > 0;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  //DONE
  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    /**
     **** TODO - STEP 2 **** 
     * Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
     * Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
     * Once you have the button, you can click it and check the innerText property of the button.
     * Once you have the innerText property, use innerText.jsonValue() to get the text value of it
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    //Get the button needed
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty("shadowRoot"); 
    const button = await shadowRoot.$("button");

    const innerText_b4 = await (await button.getProperty("innerText")).jsonValue();
    console.log(`\tText B4ore: ${innerText_b4}`);

    await button.click(); // CLICK

    const innerText_af = await (await button.getProperty("innerText")).jsonValue();
    console.log(`\tText After: ${innerText_af}`);
    await button.click(); // CLICK Again to unactivate it 

    expect(innerText_af).toBe("Remove from Cart");
  }, 2500);

  //DONE
  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    //Start
    await page.$$eval("product-item", items=>{
      items.map(item=>{
        item.shadowRoot.querySelector("button").click();
      })
    });
    const cartcountHandle = await page.$("#cart-count");
    const cartcount = await (await cartcountHandle.getProperty("innerText")).jsonValue();

    console.log(`\tcartCount ${cartcount}`);
    expect(cartcount).toBe("20");
  }, 10000);

  // DONE
  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    // Start
    await page.reload(); // Reload page
    const results = await page.$$eval("product-item", item=>{
      return item.map(item=>{ 
        return item.shadowRoot.querySelector("button").innerText == "Remove from Cart";
      })
    });
    //check each text to be remove from cart
    for(const result of results){
      expect(result).toBe(true);
    }
    const cartcountHandle = await page.$("#cart-count");
    const cartcount = await (await cartcountHandle.getProperty("innerText")).jsonValue();
    expect(cartcount).toBe("20");    
  }, 10000);

  // DONE
  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {


    cart = await page.evaluate(()=>{
      return JSON.parse(localStorage.getItem("cart"));
    })

    for(let i = 0; i < 20; i++){
      expect(cart[i]).toBe(i+1); 
    }

  });

  // DONE
  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    // click the button
    await page.$$eval("product-item", item=>{
      return item.map(item=>{ 
        return item.shadowRoot.querySelector("button").click();
      })
    });

    const cartcountHandle = await page.$("#cart-count");
    const cartcount = await (await cartcountHandle.getProperty("innerText")).jsonValue();
    expect(cartcount).toBe("0");    
  }, 10000);

  //DONE
  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    // Start
    await page.reload(); // Reload page
    const results = await page.$$eval("product-item", item=>{
      return item.map(item=>{ 
        return item.shadowRoot.querySelector("button").innerText == "Add to Cart";
      })
    });
    //check each text to be remove from cart
    for(const result of results){
      expect(result).toBe(true);
    }
    const cartcountHandle = await page.$("#cart-count");
    const cartcount = await (await cartcountHandle.getProperty("innerText")).jsonValue();
    expect(cartcount).toBe("0");    

  }, 10000);

  //DONE
  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    cart = await page.evaluate(()=>{
      return localStorage.getItem("cart");
    });

    expect(cart).toBe('[]');
  });

});
