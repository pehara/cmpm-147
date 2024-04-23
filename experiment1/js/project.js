const fillers = {
  dateDescriptor: ["disastrous", "awkward", "cringeworthy", "embarrassing", "disappointing", "uncomfortable", "horrendous", "nightmarish", "humiliating", "regrettable", "brutal", "miserable"],
  dateLocation: ["their moms house", " Ethan Millers CSE13s class", "a haunted house", "a fast-food restaurant", "a crowded subway", "a poorly lit alley", "a candlit dinner with a dumpster on fire next to it", "a run-down amusement park with only kids rides", "a bingo night at a retirement home", "a petting zoo", "a traffic jam", "a taxidermy convention", "a cemetary", "their exes workplace", "a family function", "their house", "a fancy restaraunt"],
  dateActivity: ["spilled hot coffee on you", "fell into a fountain", "tried to impress with magic tricks but set the tablecloth on fire", "got into an argument with a street vendor", "didnt let you speak at all", "sneezed into your face, more than once", "insulted your appearance", "brought their mom along without telling you", "started crying uncontrollably over a minor inconvenience", "got lost and ended up in a sketchy neighborhood", " tried to sell you on a mlm", " asked for your hand in marriage", " sobbed uncontrollably about their childhood crush", "wanted to roleplay being an ant.", "excused themselevs to take the largest shit of their life and made the building shake", "recieted the entire script of the bee movie", "sat in silence and stared at you", "bragged about how much bitcoin they had saved"],
  dateOutcome: ["pretennded like it never happened", "went on another date and ended up in a murder documentury", "never called back", "blocked them on all social media", " ran away from them", "received a strongly worded email the next day", "had laxitaves put in your food and had to shit like crazy", "vowed to never date again", "ran away screaming", "recieved an apology gift basket", "promptly exited via the bathroom window and a 10/10 backflip where you fell on your head and died", "went home and cried yourself to sleep", "you died after sneezing too hard"]
};

const template = `Your date last night was $dateDescriptor. You both decided to meet at $dateLocation. Things took a turn for the worse when your date $dateActivity. Needless to say, you $dateOutcome.

Next time, you'll meet someone less strange...`;

// Function to replace placeholders with random words from fillers object
function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

// Function to generate a bad date scenario
function generateBadDate() {
  let story = template;
  const slotPattern = /\$(\w+)/;
  
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }
  
  return story;
}

// Function to display generated bad date scenario
function displayBadDate() {
  const box = $("#box");
  const badDateMessage = generateBadDate();
  box.text(badDateMessage);
}

// Event listener for button click to generate and display bad date scenario
const clicker = $("#clicker");
clicker.click(displayBadDate);

// Initial generation and display of bad date scenario
displayBadDate();
