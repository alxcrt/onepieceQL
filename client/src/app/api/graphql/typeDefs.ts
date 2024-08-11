const typeDefs = `#graphql
  input CharacterFilter{
    search: String!
  }

  type Character{
    name: String!
    description: String!
    image: String!
    devilFruits: [DevilFruit!]
    origin: String
    birthday: String
    bloodType: String
  }

  type DevilFruit{
    name: String!
    description: String!
    image: String!
    types: [DevilFruitType!]
  }

  type DevilFruitType{
    type: String!
    subType: String
  }

  type Query {
    me: String!
    # characters: [Character]
    characters(filter: CharacterFilter): [Character]
    devilFruits: [DevilFruit]
  }

`;

export default typeDefs;
