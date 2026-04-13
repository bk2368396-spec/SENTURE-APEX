const perfumes = [
  // Men - 10 products
  { id: 1, name: "Midnight Oud", gender: "male", price: 8500, concentration: "Eau De Parfum (EDP)", notes: "Oud, Leather, Tobacco", description: "A commanding evening fragrance with rich oud, warm leather, and smoky tobacco for confident moments.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Midnight+Oud" },
  { id: 2, name: "Silver Birch", gender: "male", price: 7600, concentration: "Eau De Parfum (EDP)", notes: "Citrus, Birch, Cedar", description: "A refined woody fragrance with bright citrus opening and spicy birch heart, grounded in smooth cedar.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Silver+Birch" },
  { id: 3, name: "Desert Rose", gender: "male", price: 8200, concentration: "Eau De Parfum (EDP)", notes: "Spice, Rose, Amber", description: "A sensual aromatic blend of spicy rose and warm amber, perfect for warm evenings and intimate moments.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Desert+Rose" },
  { id: 4, name: "Iron Steel", gender: "male", price: 7900, concentration: "Body Mist", notes: "Vetiver, Metal, Pepper", description: "A bold modern masculine with crisp pepper, earthy vetiver, and a distinctive metallic accent.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Iron+Steel" },
  { id: 5, name: "Royal Oud", gender: "male", price: 9200, concentration: "Eau De Parfum (EDP)", notes: "Oud, Amber, Smoke", description: "A powerful and luxurious oud fragrance with deep amber and smoky resin for connoisseurs of fine scents.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Royal+Oud" },
  { id: 6, name: "Cedar Pulse", gender: "male", price: 7400, concentration: "Eau De Parfum (EDP)", notes: "Cedar, Orange, Clove", description: "Sharp cedarwood brightened with vibrant orange and warmed by spicy clove for a dynamic masculine scent.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Cedar+Pulse" },
  { id: 7, name: "Urban Musk", gender: "male", price: 8100, concentration: "Body Mist", notes: "Musk, Vetiver, Cinnamon", description: "A refined urban musk with creamy base notes, grounded by earthy vetiver and warm cinnamon spice.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Urban+Musk" },
  { id: 8, name: "Graphite Rush", gender: "male", price: 8800, concentration: "Eau De Parfum (EDP)", notes: "Sandalwood, Amber, Smoke", description: "A sleek woody scent with dark amber and smoky depth, perfect for the modern man who values sophistication.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Graphite+Rush" },
  { id: 9, name: "Musk Voyage", gender: "male", price: 8400, concentration: "Eau De Parfum (EDP)", notes: "Musk, Cardamom, Leather", description: "An earthy musk journey enhanced with spicy cardamom and rich leather for memorable occasions.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Musk+Voyage" },
  { id: 10, name: "Smoked Amber", gender: "male", price: 9000, concentration: "Body Mist", notes: "Amber, Resin, Smoke", description: "Deep amber warmth wrapped in smoldering resin and wood smoke, creating an unforgettable impression.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Smoked+Amber" },

  // Women - 10 products
  { id: 11, name: "Jasmine Blush", gender: "female", price: 7800, concentration: "Eau De Parfum (EDP)", notes: "Jasmine, Vanilla, Pear", description: "A soft and romantic floral fragrance lifted by delicate jasmine and creamy vanilla sweetness.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Jasmine+Blush" },
  { id: 12, name: "Vanilla Bloom", gender: "female", price: 6500, concentration: "Body Mist", notes: "Vanilla, Coconut, Musk", description: "A cozy and inviting gourmand bouquet of creamy vanilla and tropical coconut with soft musk base.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Vanilla+Bloom" },
  { id: 13, name: "Ruby Orchid", gender: "female", price: 9200, concentration: "Eau De Parfum (EDP)", notes: "Orchid, Berry, Amber", description: "A luxurious floral amber scent with bright berry accents and an elegant orchid heart.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Ruby+Orchid" },
  { id: 14, name: "Golden Petal", gender: "female", price: 8500, concentration: "Eau De Parfum (EDP)", notes: "Rose, Tuberose, Amber", description: "A radiant blend of romantic rose and creamy tuberose, warmed by golden amber for timeless elegance.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Golden+Petal" },
  { id: 15, name: "Velvet Nectar", gender: "female", price: 8700, concentration: "Body Mist", notes: "Jasmine, Sugar, Vanilla", description: "A luminous fragrance with creamy jasmine, sugared accords, and smooth vanilla creating pure femininity.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Velvet+Nectar" },
  { id: 16, name: "Moonlit Garden", gender: "female", price: 8100, concentration: "Eau De Parfum (EDP)", notes: "Pear, Gardenia, Musk", description: "Soft florals with sparkling pear and creamy gardenia, creating a dreamy nocturnal garden atmosphere.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Moonlit+Garden" },
  { id: 17, name: "Velvet Rose", gender: "female", price: 7600, concentration: "Body Mist", notes: "Rose, Vanilla, Amber", description: "A feminine floral with velvety rose petals and soft vanilla, finished with warm amber sensuality.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Velvet+Rose" },
  { id: 18, name: "Blush Whisper", gender: "female", price: 8000, concentration: "Eau De Parfum (EDP)", notes: "Rose, Amber, Sandalwood", description: "A romantic floral amber with creamy sandalwood and delicate rose whispers for intimate moments.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Blush+Whisper" },
  { id: 19, name: "Orchid Aura", gender: "female", price: 9000, concentration: "Eau De Parfum (EDP)", notes: "Orchid, Rose, Musk", description: "A lush and exotic floral bouquet accented with creamy musk and modern rose interpretation.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Orchid+Aura" },
  { id: 20, name: "Silk Petals", gender: "female", price: 8200, concentration: "Body Mist", notes: "Peony, Vanilla, Sandalwood", description: "A luxurious blend of silky peony and creamy vanilla, grounded by warm sandalwood for lasting beauty.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ffc0cb?text=Silk+Petals" },

  // Unisex - 5 products
  { id: 21, name: "Amber Gold", gender: "unisex", price: 8800, concentration: "Eau De Parfum (EDP)", notes: "Amber, Tonka, Musk", description: "Gold-hued amber warmed with tonka bean and soft musk, creating an inviting scent for every wearer.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/cccccc?text=Amber+Gold" },
  { id: 22, name: "Ocean Breeze", gender: "unisex", price: 5500, concentration: "Body Mist", notes: "Sea Salt, Sage, Driftwood", description: "A fresh aquatic scent with crisp sea salt, earthy sage, and driftwood clarity for modern unisex appeal.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/cccccc?text=Ocean+Breeze" },
  { id: 23, name: "Musk Signature", gender: "unisex", price: 7200, concentration: "Eau De Parfum (EDP)", notes: "White Musk, Amber, Iris", description: "A modern musk fragrance with creamy iris and amber warmth, versatile for any occasion.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/cccccc?text=Musk+Signature" },
  { id: 24, name: "Balance Mist", gender: "unisex", price: 6400, concentration: "Body Mist", notes: "Bergamot, Sage, Cedar", description: "A balanced modern blend of citrus bergamot, fresh sage, and clean cedar wood for everyday wear.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/cccccc?text=Balance+Mist" },
  { id: 25, name: "Eclipse Calm", gender: "unisex", price: 7000, concentration: "Eau De Parfum (EDP)", notes: "Grapefruit, Cedar, Musk", description: "A soft woody fragrance with luminous grapefruit highlights and creamy musk base for anyone.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/cccccc?text=Eclipse+Calm" },

  // Kids - 5 products
  { id: 26, name: "Sweet Bubble", gender: "kids", price: 4500, concentration: "Body Mist", notes: "Strawberry, Cotton Candy, Vanilla", description: "A playful sweet bubble scent crafted for joyful playtime moments and childhood memories.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ff69b4?text=Sweet+Bubble" },
  { id: 27, name: "Little Star", gender: "kids", price: 4800, concentration: "Body Mist", notes: "Apple, Citrus, Sugar", description: "A sparkling fruity fragrance with bright apple and citrus that feels like a magical bedtime wish.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ff69b4?text=Little+Star" },
  { id: 28, name: "Candy Cloud", gender: "kids", price: 4300, concentration: "Eau De Parfum (EDP)", notes: "Berry, Cotton Candy, Musk", description: "Soft fruity sweetness with gentle cotton candy accord and berry brightness for sweet dreams.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ff69b4?text=Candy+Cloud" },
  { id: 29, name: "Sunny Sprite", gender: "kids", price: 4000, concentration: "Body Mist", notes: "Orange, Lemon, Blossom", description: "A bright and cheerful citrus floral for carefree playtime and warm sunny afternoons.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ff69b4?text=Sunny+Sprite" },
  { id: 30, name: "Sugar Dreams", gender: "kids", price: 4450, concentration: "Eau De Parfum (EDP)", notes: "Caramel, Jasmine, Honey", description: "A dreamy blend of sweet caramel and gentle floral touches, creating comfort and happiness.", imageUrl: "https://via.placeholder.com/300x400/1a1a1a/ff69b4?text=Sugar+Dreams" }
];

function getPerfumeById(id) {
  return perfumes.find(p => String(p.id) === String(id) || String(p.productId) === String(id));
}

function getBottleImage(gender) {
  if (gender === 'male') return 'images/bottle-male.png';
  if (gender === 'female') return 'images/bottle-female.png';
  return 'images/bottle-female.png';
}

function getBoxImage(gender) {
  if (gender === 'male') return 'images/box-male.png';
  if (gender === 'female') return 'images/box-female.png';
  return 'images/box-female.png';
}

function getRelatedPerfumes(current) {
  return perfumes.filter(p => p.gender === current.gender && String(p.id) !== String(current.id)).slice(0, 4);
}
