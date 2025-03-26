# 🚀 Kafka App

Welcome to the Kafka App repository! This project demonstrates the use of Kafka for producing and consuming messages, along with admin functionalities for managing Kafka topics.

## 📁 Project Structure

- **`producer.js`**: Contains the Kafka producer logic, which sends messages to a Kafka topic.
- **`consumer.js`**: Contains the Kafka consumer logic, which reads messages from a Kafka topic.
- **`admin.js`**: Contains the Kafka admin logic, which manages Kafka topics.
- **`client.js`**: Initializes the Kafka client with the necessary configurations.
- **`Dockerfile`**: Docker configuration to containerize the application.
- **`package.json`**: Project dependencies and scripts.
- **`pnpm-lock.yaml`**: Lockfile for the project's dependencies managed by pnpm.
- **`.gitignore`**: Specifies the files and directories to be ignored by Git.
- **`temp.jsx`**: React component for a product list with search functionality.
- **`temp.js`**: Next.js middleware for rate limiting based on Redis.

## 📦 Dependencies

The project relies on the following dependencies:

- `@faker-js/faker`: Used to generate fake data.
- `faker`: Another library used to generate fake data.
- `kafkajs`: A modern Apache Kafka client for Node.js.

## 🛠️ Usage

### Producer

The producer sends random messages to the `rider-updates` topic with a 2-second delay between each message. It also allows manual input of messages via the command line.

### Consumer

The consumer reads messages from the `rider-updates` topic and logs them to the console. It also fetches data from an external API and logs it at regular intervals.

### Admin

The admin script creates a Kafka topic named `rider-updates` with 2 partitions.

### Docker

The Dockerfile sets up a Node.js environment, installs dependencies using pnpm, and runs the producer script.

## 🚀 Running the Application

1. **Install Dependencies**: Ensure you have pnpm installed. Run `pnpm install` to install the project dependencies.
2. **Start Kafka**: Ensure you have a running Kafka instance.
3. **Run Admin Script**: Run `node admin.js` to create the Kafka topic.
4. **Run Producer**: Run `node producer.js` to start the producer.
5. **Run Consumer**: Run `node consumer.js <group-id>` to start the consumer, where `<group-id>` is the consumer group ID.

## 📋 Notes

- Ensure the Kafka broker address in `client.js` is correctly configured.
- The `temp.jsx` and `temp.js` files are additional components that are not directly related to the Kafka functionality but provide examples of a React component and a Next.js middleware, respectively.

## 📜 License

This project is licensed under the ISC License.
