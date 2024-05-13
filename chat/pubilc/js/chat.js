const socket = io();

const formMessage = document.querySelector("#sendMessage");
const inputFormMessage = formMessage.querySelector("input");
const btnFormMessage = formMessage.querySelector("button");

const btnLocation = document.querySelector("#location");

const messages = document.querySelector("#messages");
const messageTemplate = document.querySelector("#message-template").innerHTML;

const locationTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;

const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

const params = new URLSearchParams(location.search);
const username = params.get("username");
const room = params.get("room");

const autoscroll = () => {
  messages.scrollTop = messages.scrollHeight;
};

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

formMessage.addEventListener("submit", (e) => {
  e.preventDefault();
  btnFormMessage.setAttribute("disabled", "disabled");

  const message = e.target.elements[0].value;

  socket.emit("sendMessage", message, (error) => {
    btnFormMessage.removeAttribute("disabled");
    inputFormMessage.value = "";
    inputFormMessage.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message Delivered");
  });
});

btnLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your brower.");
  }

  btnLocation.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    socket.emit(
      "sendLocation",
      {
        latitude,
        longitude,
      },
      () => {
        btnLocation.removeAttribute("disabled");
      }
    );
  });
});

socket.on("locationMessage", (res) => {
  console.log(res);
  const html = Mustache.render(locationTemplate, {
    username: res.username,
    url: res.text,
    createdAt: moment(res.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});
