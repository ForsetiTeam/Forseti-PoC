export function getMessages(dialogId) {
  return safeStorageAccess(() => {
    return localStorage.getItem(messageKey)
      && JSON.parse(localStorage.getItem(messageKey))[dialogId] || [];
  });
}


export function saveMessage(message) {
  safeStorageAccess(() => {
    let currentMessages = localStorage.getItem(messageKey);

    if (notExist(currentMessages)) {
      currentMessages = {};
    } else {
      currentMessages = JSON.parse(currentMessages);
    }

    if (notExist(currentMessages[message.dialog])) {
      currentMessages[message.dialog] = [];
    }

    const messageIndex = currentMessages[message.dialog]
      .findIndex(value => value._id === message._id);

    if (messageIndex !== -1) {
      currentMessages[message.dialog][messageIndex] = message;
    } else {
      currentMessages[message.dialog].push(message);
    }

    localStorage.setItem(messageKey, JSON.stringify(currentMessages));
  });
}

export function deleteMessage(message) {
  safeStorageAccess(() => {
    let currentMessages = localStorage.getItem(messageKey);

    if (notExist(currentMessages)) {
      return;
    }

    currentMessages = JSON.parse(currentMessages);

    if (notExist(currentMessages[message.dialog])) {
      return;
    }

    currentMessages[message.dialog] = currentMessages[message.dialog].filter(value => value._id !== message._id);

    localStorage.setItem(messageKey, JSON.stringify(currentMessages));
  });
}

// Удалить все сообщения из local storage, т.к. оставались "неотправленные"
export function deleteAllMessages(dialogId) {
  safeStorageAccess(() => {
    let currentMessages = localStorage.getItem(messageKey);

    if (notExist(currentMessages)) {
      return;
    }

    currentMessages = JSON.parse(currentMessages);

    if (notExist(currentMessages[dialogId])) {
      return;
    }

    currentMessages[dialogId] = [];

    localStorage.setItem(messageKey, JSON.stringify(currentMessages));
  });
}

function safeStorageAccess(action) {
  if (typeof localStorage !== 'undefined') {
    return action();
  }
}

function notExist(object) {
  return typeof object === 'undefined' || object === null;
}


const messageKey = 'queue_messages';
