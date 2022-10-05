const { ApolloServer, gql } = require("apollo-server");

const { getAllRoom, getRoomDetail, getRoomByDestination, createRoom, editRoom, deleteRoom } = require("./actions/room");

const { getDestinations, createDestination } = require("./actions/destination");

const typeDefs = gql`
  type Destination {
    id: ID
    name: String
    description: String
    imgUrl: String
  }

  type Room {
    id: ID
    price: Int
    accountNumber: Int
    accountName: String
    maxParticipant: Int
    minParticipant: Int
    schedule: String
    dropPoint: String
    duration: Int
    UserId: ID
    DestinationId: ID
  }

  type RoomDetail {
    id: ID
    price: Int
    accountNumber: Int
    accountName: String
    maxParticipant: Int
    minParticipant: Int
    schedule: String
    dropPoint: String
    duration: Int
    UserId: ID
    DestinationId: ID
    destination: Destination
  }

  type RoomByDestination {
    destination: [Destination]
    room: [Room]
  }

  type FormDestination {
    name: String
    description: String
    imgUrl: String
  }

  type RoomForm {
    price: Int
    accountNumber: Int
    accountName: String
    maxParticipant: Int
    minParticipant: Int
    schedule: String
    dropPoint: String
    duration: Int
    UserId: ID
    DestinationId: ID
  }

  type Query {
    destinations: [Destination]
    rooms: [Room]
    roomById(id: ID!): RoomDetail
    roomByDestination(id: ID!): RoomByDestination
  }

  type Mutation {
    createDestination(name: String, description: String, imgUrl: String): FormDestination

    createRoom(price: Int, accountNumber: Int, accountName: String, maxParticipant: Int, minParticipant: Int, schedule: String, dropPoint: String, duration: Int, UserId: ID, DestinationId: ID): RoomForm

    editRoom(id: ID, price: Int, accountNumber: Int, accountName: String, maxParticipant: Int, minParticipant: Int, schedule: String, dropPoint: String, duration: Int, UserId: ID, DestinationId: ID): RoomForm

    deleteRoom(id: ID): Boolean
  }
`;

const resolvers = {
  Query: {
    rooms: getAllRoom,
    roomById: getRoomDetail,
    destinations: getDestinations,
    roomByDestination: getRoomByDestination,
  },
  Mutation: {
    createRoom: createRoom,
    editRoom: editRoom,
    deleteRoom: deleteRoom,
    createDestination: createDestination,
  },
};

const { ApolloServerPluginLandingPageLocalDefault } = require("apollo-server-core");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
