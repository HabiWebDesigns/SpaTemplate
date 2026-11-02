/* ===== SERENÉ — edit business details, rates, images, gallery and FAQ here ===== */
(function () {
  const u = (id) => `assets/images/${id}.jpg`;
  window.SERENE = {
    contact: {
      address: '',
      phone: '', email: '', whatsapp: '', // WhatsApp number uses digits only, e.g. 639000000000
      mapEmbed: 'https://www.google.com/maps?q=SM%20City%20Batangas&output=embed'
    },
    social: { facebook: '', instagram: '' }, // add full URLs to activate icons
    hours: [['Monday – Friday', '10:00 AM – 9:00 PM'], ['Saturday – Sunday', '9:00 AM – 10:00 PM']],
    times: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'],
    /* Image pool — swap any URL for your own file, e.g. 'assets/images/hero.jpg' */
    img: {
      candle: u('1540555700478-4be289fbecef'), massage: u('1544161515-4ab6ce6db874'), interior: u('1600334089648-b0d9d3028eb2'),
      stones: u('1519823551278-64ac92734fb1'), facial: u('1570172619644-dfd03ed5d881'), oils: u('1556228720-195a672e8a03'),
      flowers: u('1515377905703-c4788e51af15'), towel: u('1507652313519-d4e9174996dd'), massage2: u('1596178060671-7a80dc8059ea'),
      lounge: u('1591343395082-e120087004b4')
    },
    categories: [
      { id: 'massage', name: 'Massage Therapy', blurb: 'Hands-on bodywork tailored to your pace, pressure and preferences.' },
      { id: 'facial', name: 'Facial Treatments', blurb: 'Gentle, skin-first care using calming botanical products.' },
      { id: 'body', name: 'Body Treatments', blurb: 'Exfoliating and nourishing rituals for soft, renewed skin.' },
      { id: 'packages', name: 'Wellness Packages', blurb: 'Curated multi-step journeys at a considered saving.' },
      { id: 'couples', name: 'Couples Treatments', blurb: 'Side-by-side relaxation in a private shared suite.' }
    ],
    /* price = rate in Philippine pesos; dur = minutes; img = key from the pool above */
    services: [
      { id: 'swedish', cat: 'massage', name: 'Swedish Massage', dur: 60, price: 800, img: 'massage', desc: 'Long, flowing strokes with light-to-medium pressure to ease tension and calm the mind.' },
      { id: 'deep', cat: 'massage', name: 'Deep Tissue Massage', dur: 60, price: 1000, img: 'massage2', desc: 'Slow, focused pressure that targets stubborn knots in the back, neck and shoulders.' },
      { id: 'hotstone', cat: 'massage', name: 'Hot Stone Massage', dur: 90, price: 1500, img: 'stones', desc: 'Warm basalt stones melt away muscle tension while a gentle massage restores balance.', note: 'Add-on: aromatherapy upgrade +₱150' },
      { id: 'aroma', cat: 'massage', name: 'Aromatherapy Massage', dur: 60, price: 1100, img: 'oils', desc: 'A custom essential-oil blend chosen for your mood, applied with soothing, rhythmic strokes.' },
      { id: 'facial', cat: 'facial', name: 'Signature Facial', dur: 60, price: 950, img: 'facial', desc: 'Cleansing, exfoliation, a mild mask and facial massage for a fresh, even-toned glow.' },
      { id: 'glow', cat: 'facial', name: 'Hydrating Glow Facial', dur: 75, price: 1200, img: 'flowers', desc: 'Deep hydration with a plumping serum mask, ideal after sun exposure or travel.' },
      { id: 'scrub', cat: 'body', name: 'Body Scrub & Renewal', dur: 45, price: 850, img: 'towel', desc: 'A sea-salt and botanical oil scrub that polishes skin, finished with a moisturizing massage.' },
      { id: 'wrap', cat: 'body', name: 'Herbal Body Wrap', dur: 75, price: 1400, img: 'candle', desc: 'A warm herbal wrap that detoxifies and softens, followed by a light scalp massage.' },
      { id: 'essential', cat: 'packages', name: 'Essential Relaxation', dur: 120, price: 1600, img: 'lounge', desc: 'A gentle introduction to the spa for first-time guests.', incl: ['Swedish Massage (60 min)', 'Mini Facial (30 min)', 'Herbal tea & cool towel'] },
      { id: 'renewal', cat: 'packages', name: 'Full Body Renewal', dur: 180, price: 3200, img: 'interior', desc: 'Our most complete reset, from exfoliation to deep relaxation.', incl: ['Body Scrub (45 min)', 'Aromatherapy Massage (60 min)', 'Signature Facial (60 min)', 'Light refreshment'] },
      { id: 'couplesmassage', cat: 'couples', name: 'Couples Massage', dur: 60, price: 2000, img: 'massage2', desc: 'Two therapists, one private suite. Price shown is per couple.', note: 'Per couple (2 guests)' },
      { id: 'couplesretreat', cat: 'couples', name: 'Couples Retreat', dur: 150, price: 4800, img: 'candle', desc: 'A shared ritual of scrub, massage and quiet time together.', incl: ['Body Scrub for two', 'Hot Stone Massage for two', 'Private suite & tea service'], note: 'Per couple (2 guests)' }
    ],
    addons: [['Aromatherapy oil upgrade', 150], ['Extended time (+30 min)', 450], ['Hot stone upgrade', 300], ['Scalp & shoulder massage (15 min)', 200]],
    therapists: [
      { name: 'Lia Santos', role: 'Senior Therapist', bio: 'Specializes in Swedish and aromatherapy, with a calm, unhurried approach.', photo: u('1534528741775-53994a69daeb') },
      { name: 'Marco Dela Cruz', role: 'Deep Tissue Specialist', bio: 'Focuses on posture, recovery and tension relief for active guests.', photo: u('1500648767791-00dcc994a43e') },
      { name: 'Ines Alvarez', role: 'Facial & Skin Therapist', bio: 'Believes great skin starts with gentle products and patient hands.', photo: u('1531123897727-8f129e1688ce') }
    ],
    /* cat: interiors | treatments | wellness. r = aspect ratio */
    gallery: [
      { img: 'interior', cat: 'interiors', cap: 'Spa interior — warm neutral tones', r: '4/5' },
      { img: 'massage', cat: 'treatments', cap: 'Massage treatment', r: '1/1' },
      { img: 'candle', cat: 'wellness', cap: 'Candles and natural stones', r: '3/4' },
      { img: 'lounge', cat: 'interiors', cap: 'Relaxation lounge', r: '4/3' },
      { img: 'facial', cat: 'treatments', cap: 'Facial treatment', r: '4/5' },
      { img: 'oils', cat: 'wellness', cap: 'Essential oils and wellness products', r: '1/1' },
      { img: 'massage2', cat: 'treatments', cap: 'Couples treatment space', r: '3/4' },
      { img: 'towel', cat: 'wellness', cap: 'Fresh towels and spa details', r: '4/3' },
      { img: 'flowers', cat: 'interiors', cap: 'Treatment room details', r: '4/5' },
      { img: 'stones', cat: 'treatments', cap: 'Hot stone therapy', r: '1/1' }
    ],
    faq: [
      ['What should I expect on my first visit?', 'Arrive 10 minutes early to relax with tea and share your preferences with your therapist. Your comfort comes first: pressure, music and temperature can all be adjusted.'],
      ['How long do treatments take?', 'Most treatments run 45 to 90 minutes, while packages take 2 to 3 hours. Durations are listed on every card.'],
      ['What should I wear?', 'Wear something comfortable. You will be draped with towels throughout, and disposable undergarments are available if you prefer.'],
      ['What is the cancellation policy?', 'Please contact the spa before your appointment if you need to make a change.'],
      ['Do I need an appointment?', 'Appointments are recommended so we can reserve your preferred therapist and time. Walk-ins are welcome when space allows.'],
      ['How do I choose the right treatment?', 'Tension and stiffness suit Deep Tissue; stress and sleep suit Swedish or Aromatherapy; dull skin suits a facial. Add a note to your inquiry and we will recommend one.']
    ],
    faqContact: [
      ['Where can I find the spa?', 'Location details and a map will be added here.'],
      ['Where can I park?', 'Parking information will be shared when your appointment is confirmed.'],
      ['Does the contact form send my message?', 'Messaging is not connected yet, so your message will not be sent or saved.']
    ]
  };
})();
