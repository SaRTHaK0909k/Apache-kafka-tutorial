const { kafka } = require("./client"); // Ensure this file exists and exports a Kafka instance
const readline = require("readline");
const { faker } = require("@faker-js/faker"); // Corrected faker import

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Sleep function to introduce a delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  const producer = kafka.producer();

  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected");

    // Function to send random messages with 2-second delay
    async function sendRandomMessages(producer) {
      for (let i = 1; i <= 200; i++) {
        const rider = faker.person.firstName();
        const branch = faker.helpers.arrayElement(["EAST", "WEST"]);

        await producer.send({
          topic: "rider-updates",
          messages: [
            {
              partition: branch.toUpperCase() === "EAST" ? 0 : 1,
              key: "location-update",
              value: JSON.stringify({ name: rider, branch: branch }),
            },
          ],
        });

        console.log(`Sent message ${i}: ${rider} - ${branch}`);
        await sleep(2000); // Wait for 2 seconds between each message
      }
    }

    await sendRandomMessages(producer);
    console.log("Finished sending random messages.");

    rl.setPrompt("Enter Message (format: name branch): ");
    rl.prompt();

    rl.on("line", async (line) => {
      const [rider, branch] = line.split(" ");
      if (!rider || !branch || !["EAST", "WEST"].includes(branch.toUpperCase())) {
        console.log("Invalid format! Use: name branch (e.g., John EAST)");
        return rl.prompt();
      }

      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: branch.toUpperCase() === "EAST" ? 0 : 1,
            key: "location-update",
            value: JSON.stringify({ name: rider, branch: branch }),
          },
        ],
      });

      console.log(`Message Sent: ${rider} - ${branch}`);
      await sleep(2000); // Delay between manual input messages
      rl.prompt();
    });

    rl.on("close", async () => {
      console.log("Disconnecting Producer...");
      await producer.disconnect();
      console.log("Producer Disconnected");
    });
  } catch (error) {
    console.error("Error in Kafka Producer:", error);
  }
}

init();
