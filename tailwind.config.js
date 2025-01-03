module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chalk: ['"Rock Salt"', 'cursive'],
        rubik: ['"Rubik Vinyl"', 'serif']
      },
      backgroundImage: {
        'button': "url('https://static.vecteezy.com/system/resources/previews/002/381/365/non_2x/yellow-wave-background-free-vector.jpg')",
        'home': "url('https://i.pinimg.com/736x/de/ac/eb/deaceb23513ee2e5cec30fab46f9e7c4.jpg')",
        'board': "url('https://i.pinimg.com/474x/d6/16/3f/d6163fef5621ec2545db41e90d766149.jpg')",
        'classroom': "url('https://st2.depositphotos.com/3730721/5461/i/450/depositphotos_54616647-stock-illustration-business-idea-concept-on-black.jpg')"
      }
    },
  },
  plugins: [],
};
