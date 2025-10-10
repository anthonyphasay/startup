import React from 'react';

export function Asia() {
  return (
    <main class="world-info">
        <h1>Asia</h1>
        <h3>Pho</h3>
            <img src= { "/images/phoRecipe.jpg" } alt="pho recipe" />
            <p style= {{ textAlign: 'center', fontSize: '16px' }}>Pho from Ho Chi Min City</p>
            <h3>Ingredients</h3>
            <td>
                <li>Oxtail</li>
                <li>Onion</li>
                <li>Ginger</li>
                <li>Salt</li>
                <li>Pho Bo cube</li>
                <li>Beef Pho concentrate</li>
                <li>Optional meats: Brisket, Flank, Steak cuts, meatballs</li>
                <li>Optional veggies: Bean sprouts, basil, cilantro, green onion</li>
            </td>
            <h3>Instructions</h3>
            <p>Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger.
                Then add 1-2 cubes pho bo if you're also using the concentrate.
                If you use just the cubes, you can add the whole cube pack.
                Add salt, 2 or 3 tablespoon depending on how big your pot is. You can always add 
                more later if you need to. Then bring the pot to boil.
                <br/>
                <br/>
                While preparing the big pot, in a smaller bot add water and bring it to a boil.
                Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse
                with cold water to get rid of impurities. Add the oxtail to the stock pot. 
                Add pho concentrate (if using cube and concentrate). Boil everything on medium-low 
                heat for a couple of hours before serving.
                <br/>
                <br/>
                Once broth is completed, you can prepare the bowl based on your liking.
                In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending
                on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil,
                green onions, cilantro depending on your liking. 
                <br/>
                <br/>
                Enjoy!
                </p>
    </main>
 
  );
}