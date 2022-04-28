let configs = (function () {
  'use strict';

  // Authentication and channels - required
  const channel = '';
  const username = '';
  const oauth = '';
  const channelBots = ['streamelements', 'nightbot', 'streamlabs'];

  // Styling - required
  const textColor = 'black'; //  hex or name
  const fontFamily = 'Roboto';
  const fontSize = '120px';
  const fontWeight = '400'; // 100, 200, 300, 400, 500, 600, 700, 800, 900
  const marginTop = '140px';

  // Responses - required
  // Use {forestCode} where you want the code to be inserted
  const forestMsg = 'Our new forest code is: {forestCode} 🌲'; // works with emojis

  // Settings - required
  const forestCommands = ['!f']; // add more like this ['!f', '!forest']
  const modOnly = false; // false or true
  const broadcasterOnly = false; // false or true

  // Don't touch this
  const user = {
    channel,
    username,
    oauth,
  };

  const styles = {
    textColor,
    fontFamily,
    fontSize,
    fontWeight,
    marginTop,
  };

  const responses = {
    forestMsg,
  };

  const settings = {
    forestCommands,
    modOnly,
    broadcasterOnly,
  };

  let module = {};

  module.user = user;
  module.styles = styles;
  module.responses = responses;
  module.settings = settings;
  module.channelBots = channelBots;

  return module;
})();
