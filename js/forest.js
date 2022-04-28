(function () {
  'use strict';

  const user = configs.user;
  const styles = configs.styles;
  const responses = configs.responses;
  const settings = configs.settings;
  const commands = settings.forestCommands.map((command) =>
    command.toLowerCase()
  );
  const channelBots = configs.channelBots.map((bot) => bot.toLowerCase());

  const forestCodeId = 'forest-code';

  const opts = {
    identity: {
      username: user.username,
      password: user.oauth,
    },
    channels: user.channel,
  };

  function customStyles() {
    let backgroundColor = styles.backgroundColor.toString();
    if (backgroundColor.startsWith('#')) {
      backgroundColor = backgroundColor.slice(1);
    }

    document.documentElement.style.setProperty(
      '--text-color',
      styles.textColor
    );

    document.documentElement.style.setProperty(
      '--font-family',
      styles.fontFamily
    );

    document.documentElement.style.setProperty('--font-size', styles.fontSize);

    document.documentElement.style.setProperty(
      '--margin-top',
      styles.marginTop
    );
  }

  const client = new tmi.client(opts);

  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);

  client.connect();

  /**
   * Sets up the browser source on load.
   * @summary Connects it to twitch and loads the browser source elements when the browser source finishes rendering
   * @author Mohamed Tayeh
   */
  window.addEventListener('load', function () {
    forestCodeEl = document.getElementById(forestCodeId);
    customStyles();
  });

  /**
   * Messages from chat pass through this function to detect when the timer command is used.
   * @summary Only executes the given commands if the user is a mod or the broadcaster
   * @param target - unused param
   * @param {JSON} context - Additional information about the message and its sender
   * @param {String} msg - The message sent in chat
   * @param {Boolean} self - whether it was a message from the logged in account itself
   */
  function onMessageHandler(target, context, msg, self) {
    if (self) return;
    const displayName = context['display-name'].toLowerCase();
    if (channelBots.includes(displayName)) return;

    const isMod = context.mod;
    const isBroadCaster =
      context['badges-raw'] != null &&
      context['badges-raw'].startsWith('broadcaster');

    if (settings.modOnly && !(isMod || isBroadCaster)) return;
    if (settings.broadcasterOnly && !isBroadCaster) return;

    const messageContent = msg.trim().split(' ');

    if (messageContent.length > 1) {
      const command = messageContent[0].toLowerCase();

      if (commands.includes(command)) {
        const forestCode = messageContent[1];
        forestCodeEl.textContent = forestCode;

        const botMsg = responses.forestMsg.replace('{forestCode}', forestCode);
        client.say(target, botMsg);
      }
    }
  }

  /**
   * Console logs when the timer connects to the channel
   * @note taken from twitch documentation: https://dev.twitch.tv/docs/irc
   */
  function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }
})();
