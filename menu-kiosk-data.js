window.STAG_STONE_CATALOG = {
  schemaVersion: 2,
  source: {
    label: "stagandstonecoffee.com",
    url: "https://stagandstonecoffee.com/menu.html"
  },
  currency: "USD",
  serviceModes: [
    { id: "dine-in", label: "Dine In", icon: "⌂" },
    { id: "to-go", label: "To Go", icon: "↗" }
  ],
  categories: [
    { id: "coffee", name: "Coffee & Espresso", shortName: "Coffee", eyebrow: "The morning ritual", note: "Roasted • pulled • poured", accent: "coffee" },
    { id: "house-apothecary", name: "House Drinks & Apothecary", shortName: "Apothecary", eyebrow: "House favorites • herbs • fruit • flowers • spice", note: "Familiar favorites and botanical drinks gathered for the season", accent: "botanical" },
    { id: "breakfast-bakehouse", name: "Breakfast & Bakehouse", shortName: "Breakfast", eyebrow: "From the hearth • Lynn's bakehouse", note: "Warm breakfast • daily staples • rotating bakes", accent: "hearth" },
    { id: "lunch", name: "Lunch", shortName: "Lunch", eyebrow: "Midday at the bakehouse", note: "Toasted • stacked • made to order", accent: "lunch" },
    { id: "sides-addons", name: "Sides & Add-Ons", shortName: "Sides", eyebrow: "A little something extra", note: "Sides • sauces • jams • extras", accent: "pantry" }
  ],
  items: [
    { id:"hot-chocolate", categoryId:"coffee", name:"Hot Chocolate", image:"https://stagandstonecoffee.com/autumn-menu/hot-chocolate.webp" },

    { id:"maple-sage-latte", categoryId:"house-apothecary", name:"Maple Sage Latte", image:"https://stagandstonecoffee.com/autumn-menu/maple-sage-latte.webp", seasonal:true },
    { id:"spiced-chai-latte", categoryId:"house-apothecary", name:"Spiced Chai Latte", image:"https://stagandstonecoffee.com/autumn-menu/chai-latte.webp", seasonal:true },
    { id:"matcha-latte", categoryId:"house-apothecary", name:"Matcha Latte", image:"https://stagandstonecoffee.com/autumn-menu/matcha-latte.webp" },
    { id:"hot-spiced-apple-cider", categoryId:"house-apothecary", name:"Hot Spiced Apple Cider", image:"https://stagandstonecoffee.com/autumn-menu/hot-spiced-cider.webp", seasonal:true },
    { id:"cranberry-hibiscus-refresher", categoryId:"house-apothecary", name:"Cranberry Hibiscus Refresher", image:"https://stagandstonecoffee.com/autumn-menu/cran-hib-refresher.webp", seasonal:true },
    { id:"loose-leaf-tea", categoryId:"house-apothecary", name:"Loose Leaf Tea", image:"https://stagandstonecoffee.com/autumn-menu/loose-leaf-tea.webp" },

    { id:"stone-house-breakfast", categoryId:"breakfast-bakehouse", name:"Stone House Breakfast", image:"https://stagandstonecoffee.com/autumn-menu/stone-house-brekkie.webp" },
    { id:"apple-butter-french-toast", categoryId:"breakfast-bakehouse", name:"Apple Butter French Toast", image:"https://stagandstonecoffee.com/autumn-menu/apple-butter-french-tst.webp", seasonal:true },
    { id:"pumpkin-cream-cheese-loaf", categoryId:"breakfast-bakehouse", name:"Pumpkin Cream Cheese Loaf", image:"https://stagandstonecoffee.com/autumn-menu/pumpkin-cream-chz.webp", seasonal:true },
    { id:"brown-butter-pear-scone", categoryId:"breakfast-bakehouse", name:"Brown Butter Pear Scone", image:"https://stagandstonecoffee.com/autumn-menu/bb-pear-scone.webp", seasonal:true },
    { id:"apple-cider-muffin", categoryId:"breakfast-bakehouse", name:"Apple Cider Muffin", image:"https://stagandstonecoffee.com/autumn-menu/apple-cider-muffin.webp", seasonal:true },
    { id:"molasses-oat-cookie", categoryId:"breakfast-bakehouse", name:"Molasses Oat Cookie", image:"https://stagandstonecoffee.com/autumn-menu/molasses-oat.webp", seasonal:true },

    {
      id:"crafting-table-biscuit",
      categoryId:"breakfast-bakehouse",
      name:"The Crafting Table",
      image:"https://stagandstonecoffee.com/autumn-menu/crafting-table.webp",
      hero:true,
      price:3.50,
      modifierGroups:[
        {
          id:"crafting-table-addons",
          name:"Build Your Biscuit",
          note:"Start with one house buttermilk biscuit and choose your additions.",
          maxSelections:8,
          options:[
            { id:"egg", name:"Egg", price:1.25 },
            { id:"cheddar", name:"Cheddar", price:0.75 },
            { id:"bacon", name:"City Butcher Bacon", price:2.75 },
            { id:"sausage", name:"City Butcher Sausage", price:2.50 },
            { id:"sausage-gravy", name:"Sausage & Pepper Gravy", price:2.25 },
            { id:"autumn-fried-meat", name:"Chicken-Fried Steak", price:5.50, seasonal:true },
            { id:"seasonal-preserve", name:"Spiced Apple Butter", price:1.00, seasonal:true },
            { id:"extra-biscuit", name:"Extra Biscuit", price:2.75 }
          ]
        }
      ]
    },

    { id:"stag-melt", categoryId:"lunch", name:"Stag Melt", image:"https://stagandstonecoffee.com/autumn-menu/stag-melt.webp" },
    { id:"wildwood-melt", categoryId:"lunch", name:"Wildwood Melt", image:"https://stagandstonecoffee.com/autumn-menu/wildwood-melt.webp" },
    { id:"orchard-turkey", categoryId:"lunch", name:"Orchard Turkey", image:"https://stagandstonecoffee.com/autumn-menu/orchard-turkey.webp" },
    { id:"tavern-ham-cheese", categoryId:"lunch", name:"Tavern Ham & Cheese", image:"https://stagandstonecoffee.com/autumn-menu/tavern-ham-cheese.webp" },
    { id:"orchard-smoke-burnt-ends", categoryId:"lunch", name:"Orchard Smoke Burnt Ends", image:"https://stagandstonecoffee.com/autumn-menu/orchard-smoke-burnt-ends.webp", seasonal:true },

    { id:"kettle-chips", categoryId:"sides-addons", name:"Kettle Chips", image:"https://stagandstonecoffee.com/autumn-menu/kettle-chips.webp" },
    { id:"apple-cabbage-slaw", categoryId:"sides-addons", name:"Apple-Cabbage Slaw", image:"https://stagandstonecoffee.com/autumn-menu/apple-cabbage-slaw.webp", seasonal:true },
    { id:"rosemary-roasted-potatoes", categoryId:"sides-addons", name:"Rosemary Roasted Potatoes", image:"https://stagandstonecoffee.com/autumn-menu/rstd-rosemary-potatoes.webp" },
    { id:"roasted-squash-sage", categoryId:"sides-addons", name:"Roasted Squash & Sage", image:"https://stagandstonecoffee.com/autumn-menu/rstd-squash-sage.webp", seasonal:true },
    { id:"roasted-squash-soup", categoryId:"sides-addons", name:"Roasted Squash Soup", image:"https://stagandstonecoffee.com/autumn-menu/rstd-squash-soup.webp", seasonal:true },
    { id:"city-butcher-bacon", categoryId:"sides-addons", name:"City Butcher Bacon", image:"https://stagandstonecoffee.com/autumn-menu/butcher-bacon.webp" },
    { id:"city-butcher-sausage", categoryId:"sides-addons", name:"City Butcher Sausage", image:"https://stagandstonecoffee.com/autumn-menu/butcher-sausage.webp" },
    { id:"sausage-pepper-gravy", categoryId:"sides-addons", name:"Sausage & Pepper Gravy", image:"https://stagandstonecoffee.com/autumn-menu/sausage-pepper-gravy.webp" },
    { id:"spiced-apple-butter", categoryId:"sides-addons", name:"Spiced Apple Butter", image:"https://stagandstonecoffee.com/autumn-menu/apple-butter.webp", seasonal:true },
    { id:"cranberry-preserves", categoryId:"sides-addons", name:"Cranberry Preserves", image:"https://stagandstonecoffee.com/autumn-menu/cranberry-citrus-preserves.webp", seasonal:true },
    { id:"horseradish-mustard", categoryId:"sides-addons", name:"Horseradish Mustard", image:"https://stagandstonecoffee.com/autumn-menu/horseradish-mustard.webp" },
    { id:"smoky-onion-sauce", categoryId:"sides-addons", name:"Smoky Onion Sauce", image:"https://stagandstonecoffee.com/autumn-menu/smoky-onion.webp" },


  ].map(item => ({
    squareCatalogId: null,
    available: true,
    variations: [],
    modifierGroups: [],
    price: null,
    ...item
  }))
};
