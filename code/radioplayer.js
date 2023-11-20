// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

const channelsContainer = document.getElementById("channels-container");

async function fetchData() {
  // Fetch data from Sveriges Radio API
  const response = await fetch(
    "http://api.sr.se/api/v2/channels?format=json&size=100"
  );
  const data = await response.json();

  // lista alla kanaler med namn, tagline, bild och färgkod för varje kanal.
  data.channels.forEach((channel) => {
    const channelDiv = document.createElement("div");
    channelDiv.setAttribute("class", "channel");

    // Display channel name
    const nameElement = document.createElement("h1");
    nameElement.textContent = channel.name;
    channelDiv.appendChild(nameElement);

    // Display channel image

    const imageElement = document.createElement("img");
    imageElement.src = channel.image;
    channelDiv.appendChild(imageElement);

    channelDiv.style.backgroundColor = `#${channel.color}`;

    // Add audio element for live stream
    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    const sourceElement = document.createElement("source");
    sourceElement.src = channel.liveaudio.url;
    sourceElement.type = "audio/mpeg";

    audioElement.appendChild(sourceElement);
    channelDiv.appendChild(audioElement);
    channelsContainer.appendChild(channelDiv);
  });
}

// Call the async function
fetchData();
