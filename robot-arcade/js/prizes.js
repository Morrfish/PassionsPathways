/* =====================================================================
   CODE CLAW PRIZE LIST  -  add, remove or change prizes here.

   Each prize is one line:
     { name: 'Rubber Chicken', emoji: '🐔', rarity: 'common', kind: 'funny', note: 'Squeaks when sad.' },

   rarity:  common | uncommon | rare | epic | legendary
            (rarer prizes show up less often and hide in harder spots)
   kind:    funny | brainrot | cool | food | gross  (just a label on the card)
   note:    a short joke shown when a student wins it (optional)
   ===================================================================== */
window.PRIZES = [
  // ---------- COMMON ----------
  { name: 'Rubber Chicken', emoji: '🐔', rarity: 'common', kind: 'funny', note: 'Squeaks when it is sad.' },
  { name: 'Single Lost Sock', emoji: '🧦', rarity: 'common', kind: 'funny', note: 'Its partner is still out there somewhere.' },
  { name: 'Slightly Damp Sandwich', emoji: '🥪', rarity: 'common', kind: 'gross', note: 'Why is it damp? Nobody knows.' },
  { name: 'Expired Coupon', emoji: '🎟️', rarity: 'common', kind: 'funny', note: '10% off one (1) sadness. Expired in 2009.' },
  { name: 'Mystery Rock', emoji: '🪨', rarity: 'common', kind: 'funny', note: 'It is a rock. Or is it?' },
  { name: 'Bouncy Ball', emoji: '🔴', rarity: 'common', kind: 'cool', note: 'Will bounce away the second you drop it.' },
  { name: 'Used Pencil Stub', emoji: '✏️', rarity: 'common', kind: 'funny', note: 'Perfect for one more math test.' },
  { name: 'Plastic Spoon', emoji: '🥄', rarity: 'common', kind: 'funny', note: 'Spoon. Just spoon.' },
  { name: 'Banana', emoji: '🍌', rarity: 'common', kind: 'food', note: 'For scale.' },
  { name: 'Wet Napkin', emoji: '🧻', rarity: 'common', kind: 'gross', note: 'Do not ask where it has been.' },
  { name: 'Mini Rubber Duck', emoji: '🦆', rarity: 'common', kind: 'cool', note: 'A loyal debugging buddy.' },
  { name: 'Dino Nugget', emoji: '🍗', rarity: 'common', kind: 'food', note: 'Shaped like a T-rex. Tastes like victory.' },

  // ---------- UNCOMMON ----------
  { name: 'Fanum Tax Receipt', emoji: '🧾', rarity: 'uncommon', kind: 'brainrot', note: 'Someone took a bite of your fries. It is the law.' },
  { name: 'Mewing Cat', emoji: '😼', rarity: 'uncommon', kind: 'brainrot', note: 'Jawline: unmatched.' },
  { name: '+1000 Aura', emoji: '✨', rarity: 'uncommon', kind: 'brainrot', note: 'Your aura just went up. Do not spend it all at once.' },
  { name: 'Six Seven', emoji: '🤷', rarity: 'uncommon', kind: 'brainrot', note: '6… 7… (do the hands)' },
  { name: 'Rizz Potion', emoji: '🧪', rarity: 'uncommon', kind: 'brainrot', note: 'Side effects include unspoken rizz.' },
  { name: 'Grumpy Cactus', emoji: '🌵', rarity: 'uncommon', kind: 'funny', note: 'Do not hug.' },
  { name: 'Toaster With Feelings', emoji: '🍞', rarity: 'uncommon', kind: 'funny', note: 'It just wants to be loved. And to toast.' },
  { name: 'Party Pickle', emoji: '🥒', rarity: 'uncommon', kind: 'food', note: 'The life of the party.' },
  { name: 'Pet Brick', emoji: '🧱', rarity: 'uncommon', kind: 'funny', note: 'Very low maintenance.' },
  { name: 'Wiggly Worm', emoji: '🪱', rarity: 'uncommon', kind: 'gross', note: 'It wiggles. That is all it does.' },

  // ---------- RARE ----------
  { name: 'Tung Tung Tung Sahur', emoji: '🪵', rarity: 'rare', kind: 'brainrot', note: 'Tung tung tung tung tung tung tung tung tung…' },
  { name: 'Tralalero Tralala', emoji: '🦈', rarity: 'rare', kind: 'brainrot', note: 'A shark. In sneakers. Of course.' },
  { name: 'Ballerina Cappuccina', emoji: '🩰', rarity: 'rare', kind: 'brainrot', note: 'Spins on one toe, smells like coffee.' },
  { name: 'Ohio Final Boss', emoji: '🌽', rarity: 'rare', kind: 'brainrot', note: 'Only in Ohio.' },
  { name: 'Sigma Sunglasses', emoji: '🕶️', rarity: 'rare', kind: 'brainrot', note: 'Grindset activated.' },
  { name: 'Robot Hamster', emoji: '🐹', rarity: 'rare', kind: 'cool', note: 'Runs on a tiny wheel of pure code.' },
  { name: 'Lava Lamp', emoji: '🫧', rarity: 'rare', kind: 'cool', note: 'Groovy.' },
  { name: 'Alien Plushie', emoji: '👽', rarity: 'rare', kind: 'cool', note: 'Came in peace. Stayed for the snacks.' },

  // ---------- EPIC ----------
  { name: 'Bombardiro Crocodilo', emoji: '🐊', rarity: 'epic', kind: 'brainrot', note: 'Half crocodile, half airplane, all chaos.' },
  { name: 'Brr Brr Patapim', emoji: '🌳', rarity: 'epic', kind: 'brainrot', note: 'A tree with feet. Brr brr.' },
  { name: 'Skibidi Plunger', emoji: '🪠', rarity: 'epic', kind: 'brainrot', note: 'Dop dop yes yes.' },
  { name: 'Mini Robot Arm', emoji: '🦾', rarity: 'epic', kind: 'cool', note: 'A claw machine prize that is also a claw. Whoa.' },
  { name: 'Crown of Rizz', emoji: '👑', rarity: 'epic', kind: 'brainrot', note: 'Bow down.' },
  { name: 'Pocket Volcano', emoji: '🌋', rarity: 'epic', kind: 'cool', note: 'Keep away from your backpack.' },

  // ---------- LEGENDARY ----------
  { name: 'Golden Robot', emoji: '🤖', rarity: 'legendary', kind: 'cool', note: 'The rarest bot in the machine. Coders only.' },
  { name: 'Diamond Duck', emoji: '💎', rarity: 'legendary', kind: 'cool', note: 'Worth more than the whole arcade.' },
  { name: 'Unicorn Taco', emoji: '🦄', rarity: 'legendary', kind: 'food', note: 'Sparkly. Crunchy. Legendary.' },
  { name: 'Lirili Larila', emoji: '🐘', rarity: 'legendary', kind: 'brainrot', note: 'An elephant cactus in sandals. The final form.' },
];

/* How often each rarity shows up when the machine is filled (bigger = more often). */
window.PRIZE_WEIGHTS = { common: 50, uncommon: 27, rare: 14, epic: 7, legendary: 2.5 };
window.RARITY_INFO = {
  common: { label: 'Common', color: '#b8c0cc' },
  uncommon: { label: 'Uncommon', color: '#3ddc84' },
  rare: { label: 'Rare', color: '#5b8cff' },
  epic: { label: 'Epic', color: '#c45bff' },
  legendary: { label: 'Legendary', color: '#ffc21a' }
};
