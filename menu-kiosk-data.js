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
    { id: "sides-addons", name: "Sides & Add-Ons", shortName: "Sides", eyebrow: "A little something extra", note: "Sides • sauces • jams • extras", accent: "pantry" },
    { id: "crafting-table", name: "The Crafting Table", shortName: "Crafting Table", eyebrow: "Build it your way", note: "Start with a house buttermilk biscuit • choose your additions • seasonal feature available", accent: "hearth" }
  ],
  items: [
    { id:"house-latte", categoryId:"coffee", name:"House Latte", image:"https://stagandstonecoffee.com/stag-drinks/house-latte.webp" },
    { id:"honey-oat-latte", categoryId:"coffee", name:"Honey Oat Latte", image:"https://stagandstonecoffee.com/stag-drinks/honey-oat-latte.webp" },
    { id:"maple-sage-latte", categoryId:"coffee", name:"Maple Sage Latte", image:"https://stagandstonecoffee.com/stag-drinks/maple-sage-latte.webp" },
    { id:"cold-brew", categoryId:"coffee", name:"Cold Brew", image:"https://stagandstonecoffee.com/stag-drinks/cold-brew.webp" },
    { id:"stone-frappe", categoryId:"coffee", name:"Stone Frappe", image:"https://stagandstonecoffee.com/stag-drinks/stone-frappe.webp" },
    { id:"hot-chocolate", categoryId:"coffee", name:"Hot Chocolate", image:"https://stagandstonecoffee.com/stag-drinks/hot-chocolate.webp" },

    { id:"lavender-haze-latte", categoryId:"house-apothecary", name:"Lavender Haze Latte", image:"https://stagandstonecoffee.com/stag-drinks/lavender-haze-latte.webp" },
    { id:"matcha-latte", categoryId:"house-apothecary", name:"Matcha Latte", image:"https://stagandstonecoffee.com/stag-drinks/matcha-latte.webp" },
    { id:"spiced-chai", categoryId:"house-apothecary", name:"Spiced Chai", image:"https://stagandstonecoffee.com/stag-drinks/spiced-chai.webp" },
    { id:"hibiscus-berry-refresher", categoryId:"house-apothecary", name:"Hibiscus Berry Refresher", image:"https://stagandstonecoffee.com/stag-drinks/hib-berry-refresher.webp" },
    { id:"seasonal-lemonade", categoryId:"house-apothecary", name:"Seasonal Lemonade", image:"https://stagandstonecoffee.com/stag-drinks/seasonal-lemonade.webp", seasonal:true },
    { id:"loose-leaf-tea", categoryId:"house-apothecary", name:"Loose Leaf Tea", image:"https://stagandstonecoffee.com/stag-drinks/loose-leaf-tea.webp" },

    { id:"stone-house-breakfast", categoryId:"breakfast-bakehouse", name:"Stone House Breakfast", image:"https://stagandstonecoffee.com/stag-food/stone-house-breakfast.webp" },
    { id:"bramble-french-toast", categoryId:"breakfast-bakehouse", name:"Bramble French Toast", image:"https://stagandstonecoffee.com/stag-food/bramble-french-toast.webp" },
    { id:"house-biscuit", categoryId:"breakfast-bakehouse", name:"House Biscuit", image:"https://stagandstonecoffee.com/stag-food/house-biscuit.webp", price:3.50 },
    { id:"elderberry-cream-cheese-loaf", categoryId:"breakfast-bakehouse", name:"Elderberry Cream Cheese Loaf", image:"https://stagandstonecoffee.com/stag-food/eb-cream-chz-loaf.webp" },
    { id:"lemon-blueberry-scone", categoryId:"breakfast-bakehouse", name:"Lemon Blueberry Scone", image:"https://stagandstonecoffee.com/stag-food/lem-bb-scone.webp" },
    { id:"seasonal-cookie", categoryId:"breakfast-bakehouse", name:"Seasonal Cookie", image:"https://stagandstonecoffee.com/stag-food/seasonal-cookie.webp", seasonal:true },

    { id:"stag-melt", categoryId:"lunch", name:"Stag Melt", image:"https://stagandstonecoffee.com/stag-food/stag-melt.webp" },
    { id:"wildwood-melt", categoryId:"lunch", name:"Wildwood Melt", image:"https://stagandstonecoffee.com/stag-food/wildwood-melt.webp" },
    { id:"orchard-turkey", categoryId:"lunch", name:"Orchard Turkey", image:"https://stagandstonecoffee.com/stag-food/orchard-turkey.webp" },
    { id:"tavern-ham-cheese", categoryId:"lunch", name:"Tavern Ham & Cheese", image:"https://stagandstonecoffee.com/stag-food/tav-ham-chz.webp" },

    { id:"kettle-chips", categoryId:"sides-addons", name:"Kettle Chips", image:"https://stagandstonecoffee.com/kettle-chips.webp" },
    { id:"house-slaw", categoryId:"sides-addons", name:"House Slaw", image:"https://stagandstonecoffee.com/house-slaw.webp" },
    { id:"herb-roasted-potatoes", categoryId:"sides-addons", name:"Herb Roasted Potatoes", image:"https://stagandstonecoffee.com/herb-rstd-potato.webp" },
    { id:"herb-potato-salad", categoryId:"sides-addons", name:"Herb Potato Salad", image:"https://stagandstonecoffee.com/herb-pot-salad.webp" },
    { id:"seasonal-side", categoryId:"sides-addons", name:"Seasonal Side", image:"https://stagandstonecoffee.com/seasonal-side.webp", seasonal:true },
    { id:"blackberry-jam", categoryId:"sides-addons", name:"Blackberry Jam", image:"https://stagandstonecoffee.com/blackberry-jam.webp" },
    { id:"seasonal-jam", categoryId:"sides-addons", name:"Seasonal Jam", image:"https://stagandstonecoffee.com/seasonal-jam.webp", seasonal:true },
    { id:"sausage-pepper-gravy", categoryId:"sides-addons", name:"Sausage & Pepper Gravy", image:"https://stagandstonecoffee.com/sausage-gravy.webp" },
    { id:"sriracha-aioli", categoryId:"sides-addons", name:"Sriracha Aioli", image:"https://stagandstonecoffee.com/sriracha-aioli.webp" },
    { id:"horseradish-mustard", categoryId:"sides-addons", name:"Horseradish Mustard", image:"https://stagandstonecoffee.com/horseradish-mustard.webp" },
    { id:"smoky-onion-sauce", categoryId:"sides-addons", name:"Smoky Onion Sauce", image:"https://stagandstonecoffee.com/onion-sauce.webp" },

    {
      id:"crafting-table-biscuit",
      categoryId:"crafting-table",
      name:"Build Your Biscuit",
      image:"https://stagandstonecoffee.com/stag-food/house-biscuit.webp",
      price:3.50,
      modifierGroups:[
        {
          id:"crafting-table-addons",
          name:"Choose Your Additions",
          note:"Your build starts with one house buttermilk biscuit.",
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
    }
  ].map(item => ({
    squareCatalogId: null,
    available: true,
    variations: [],
    modifierGroups: [],
    price: null,
    ...item
  }))
};
